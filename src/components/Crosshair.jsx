// import { useEffect, useRef } from "react";

// export default function Crosshair() {
//   const el = useRef(null);
//   const lx = useRef(null);
//   const ly = useRef(null);

//   useEffect(() => {
//     if (window.matchMedia("(pointer:coarse)").matches) return;
//     const cross = el.current, lineX = lx.current, lineY = ly.current;
//     if (!cross||!lineX||!lineY) return;

//     const t = { x: innerWidth/2, y: innerHeight/2 };
//     const r = { x: t.x, y: t.y };
//     let raf;

//     const lerp = (a, b, n) => (1-n)*a + n*b;
//     const tick = () => {
//       r.x = lerp(r.x, t.x, 0.15);
//       r.y = lerp(r.y, t.y, 0.15);
//       lineY.style.transform = `translateX(${r.x}px)`;
//       lineX.style.transform = `translateY(${r.y}px)`;
//       raf = requestAnimationFrame(tick);
//     };

//     const show = e => { t.x=e.clientX; t.y=e.clientY; cross.classList.add("is-visible"); };
//     const hide = () => cross.classList.remove("is-visible");
//     window.addEventListener("mousemove", show);
//     window.addEventListener("mouseleave", hide);
//     raf = requestAnimationFrame(tick);

//     return () => {
//       window.removeEventListener("mousemove", show);
//       window.removeEventListener("mouseleave", hide);
//       cancelAnimationFrame(raf);
//     };
//   }, []);

//   return (
//     <div className="crosshair" ref={el} aria-hidden="true">
//       <div className="crosshair-line crosshair-line-x" ref={lx} />
//       <div className="crosshair-line crosshair-line-y" ref={ly} />
//     </div>
//   );
// }

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const lerp = (a, b, n) => (1 - n) * a + n * b;

const Crosshair = ({ color = 'white', containerRef = null }) => {
  const lineHorizontalRef = useRef(null);
  const lineVerticalRef = useRef(null);
  const filterXRef = useRef(null);
  const filterYRef = useRef(null);

  useEffect(() => {
    const lineH = lineHorizontalRef.current;
    const lineV = lineVerticalRef.current;
    if (!lineH || !lineV) return;

    let mouse = { x: 0, y: 0 };
    let rafId = null;
    let isHovering = false; // ✅ track state to avoid redundant gsap calls

    const renderedStyles = {
      tx: { previous: 0, current: 0, amt: 0.15 },
      ty: { previous: 0, current: 0, amt: 0.15 },
    };

    gsap.set([lineH, lineV], { opacity: 0 });

    // ── Glitch timeline ──────────────────────────────────────────
    const primitiveValues = { turbulence: 0 };
    const tl = gsap.timeline({
      paused: true,
      onStart: () => {
        lineH.style.filter = 'url(#filter-noise-x)';
        lineV.style.filter = 'url(#filter-noise-y)';
      },
      onUpdate: () => {
        filterXRef.current?.setAttribute('baseFrequency', primitiveValues.turbulence);
        filterYRef.current?.setAttribute('baseFrequency', primitiveValues.turbulence);
      },
      onComplete: () => {
        lineH.style.filter = 'none';
        lineV.style.filter = 'none';
      },
    }).to(primitiveValues, {
      duration: 0.5,
      ease: 'power1',
      startAt: { turbulence: 1 },
      turbulence: 0,
    });

    const enter = () => { if (!isHovering) { isHovering = true;  tl.restart(); } };
    const leave = () => { if (isHovering)  { isHovering = false; tl.progress(1).kill(); } };

    // ── RAF loop — only math, no DOM reads ──────────────────────
    const render = () => {
      renderedStyles.tx.current = mouse.x;
      renderedStyles.ty.current = mouse.y;
      renderedStyles.tx.previous = lerp(renderedStyles.tx.previous, renderedStyles.tx.current, renderedStyles.tx.amt);
      renderedStyles.ty.previous = lerp(renderedStyles.ty.previous, renderedStyles.ty.current, renderedStyles.ty.amt);
      gsap.set(lineV, { x: renderedStyles.tx.previous });
      gsap.set(lineH, { y: renderedStyles.ty.previous });
      rafId = requestAnimationFrame(render);
    };

    // ── Mouse move — only update coordinates, NO DOM queries ────
    const handleMouseMove = (ev) => {
      mouse.x = ev.clientX; // ✅ clientX not pageX
      mouse.y = ev.clientY;

      if (containerRef?.current) {
        const bounds = containerRef.current.getBoundingClientRect();
        const inside =
          ev.clientX >= bounds.left && ev.clientX <= bounds.right &&
          ev.clientY >= bounds.top  && ev.clientY <= bounds.bottom;
        gsap.to([lineH, lineV], { opacity: inside ? 1 : 0, duration: 0.3 });
      }
    };

    // ── First move: start render loop ───────────────────────────
    const onFirstMove = (ev) => {
      mouse.x = ev.clientX;
      mouse.y = ev.clientY;
      renderedStyles.tx.previous = renderedStyles.tx.current = mouse.x;
      renderedStyles.ty.previous = renderedStyles.ty.current = mouse.y;
      gsap.to([lineH, lineV], { duration: 0.9, ease: 'Power3.easeOut', opacity: 1 });
      rafId = requestAnimationFrame(render);
      window.removeEventListener('mousemove', onFirstMove);
    };

    // ── Attach pointer targets via event delegation ──────────────
    // ✅ ONE listener on document instead of N listeners on N elements
    const handlePointerDetection = (ev) => {
      const tag = ev.target?.tagName;
      const role = ev.target?.getAttribute('role');
      const isClickable =
        tag === 'A' || tag === 'BUTTON' ||
        role === 'button' || role === 'link' ||
        ev.target?.closest('a, button');

      if (isClickable) enter();
      else leave();
    };

    const onMouseLeave = () => gsap.to([lineH, lineV], { opacity: 0, duration: 0.3 });
    const onMouseEnter = () => gsap.to([lineH, lineV], { opacity: 1, duration: 0.3 });

    window.addEventListener('mousemove', onFirstMove);
    window.addEventListener('mousemove', handleMouseMove);  // coords only
    window.addEventListener('mouseover', handlePointerDetection); // ✅ mouseover = only fires on element change, not every frame
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onFirstMove);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handlePointerDetection);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mouseenter', onMouseEnter);
      if (rafId) cancelAnimationFrame(rafId);
      tl.kill();
    };
  }, [containerRef, color]);

  return (
    <div className='crosshair' style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 10000 }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <filter id="filter-noise-x">
            <feTurbulence type="fractalNoise" baseFrequency="0.000001" numOctaves="1" ref={filterXRef} />
            <feDisplacementMap in="SourceGraphic" scale="40" />
          </filter>
          <filter id="filter-noise-y">
            <feTurbulence type="fractalNoise" baseFrequency="0.000001" numOctaves="1" ref={filterYRef} />
            <feDisplacementMap in="SourceGraphic" scale="40" />
          </filter>
        </defs>
      </svg>
      <div ref={lineHorizontalRef} style={{ position: 'absolute', width: '100%', height: '1px', background: color, top: 0, left: 0, opacity: 0, pointerEvents: 'none' }} />
      <div ref={lineVerticalRef}   style={{ position: 'absolute', height: '100%', width: '1px',  background: color, top: 0, left: 0, opacity: 0, pointerEvents: 'none' }} />
    </div>
  );
};

export default Crosshair;