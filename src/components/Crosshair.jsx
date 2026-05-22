import { useEffect, useRef } from "react";

export default function Crosshair() {
  const el = useRef(null);
  const lx = useRef(null);
  const ly = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer:coarse)").matches) return;
    const cross = el.current, lineX = lx.current, lineY = ly.current;
    if (!cross||!lineX||!lineY) return;

    const t = { x: innerWidth/2, y: innerHeight/2 };
    const r = { x: t.x, y: t.y };
    let raf;

    const lerp = (a, b, n) => (1-n)*a + n*b;
    const tick = () => {
      r.x = lerp(r.x, t.x, 0.15);
      r.y = lerp(r.y, t.y, 0.15);
      lineY.style.transform = `translateX(${r.x}px)`;
      lineX.style.transform = `translateY(${r.y}px)`;
      raf = requestAnimationFrame(tick);
    };

    const show = e => { t.x=e.clientX; t.y=e.clientY; cross.classList.add("is-visible"); };
    const hide = () => cross.classList.remove("is-visible");
    window.addEventListener("mousemove", show);
    window.addEventListener("mouseleave", hide);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", show);
      window.removeEventListener("mouseleave", hide);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="crosshair" ref={el} aria-hidden="true">
      <div className="crosshair-line crosshair-line-x" ref={lx} />
      <div className="crosshair-line crosshair-line-y" ref={ly} />
    </div>
  );
}
