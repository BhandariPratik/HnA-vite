import { useEffect, useRef } from "react";

export default function DotField({ dotRadius=2, dotSpacing=14, cursorRadius=500, bulgeStrength=67, waveAmplitude=0, gradientFrom="rgba(251,251,248,0.28)", gradientTo="rgba(251,251,248,0.14)" }) {
  const wrap = useRef(null);
  const cvs = useRef(null);

  useEffect(() => {
    const field = wrap.current, canvas = cvs.current;
    if (!field||!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    const TAU = Math.PI*2;
    const dots=[], mouse={x:-9999,y:-9999,px:-9999,py:-9999,speed:0};
    const sz={w:0,h:0,ox:0,oy:0};
    let frame=0, engagement=0, raf, rTimer;

    const build = () => {
      dots.length=0;
      const step = dotRadius+dotSpacing;
      const cols=Math.floor(sz.w/step), rows=Math.floor(sz.h/step);
      const px=(sz.w%step)/2, py=(sz.h%step)/2;
      for(let r=0;r<rows;r++) for(let c=0;c<cols;c++){
        const ax=px+c*step+step/2, ay=py+r*step+step/2;
        dots.push({ax,ay,sx:ax,sy:ay});
      }
    };

    const resize = () => {
      const rect=field.getBoundingClientRect();
      const dpr=Math.min(devicePixelRatio||1,2);
      sz.w=rect.width; sz.h=rect.height;
      sz.ox=rect.left+scrollX; sz.oy=rect.top+scrollY;
      canvas.width=sz.w*dpr; canvas.height=sz.h*dpr;
      ctx.setTransform(dpr,0,0,dpr,0,0);
      build();
    };

    const tick = () => {
      frame++;
      const t=frame*0.02;
      engagement += (Math.min(mouse.speed/5,1)-engagement)*0.06;
      if(engagement<0.001) engagement=0;
      ctx.clearRect(0,0,sz.w,sz.h);
      const g=ctx.createLinearGradient(0,0,sz.w,sz.h);
      g.addColorStop(0,gradientFrom); g.addColorStop(1,gradientTo);
      ctx.fillStyle=g;
      const crSq=cursorRadius*cursorRadius, dr=dotRadius/2;
      ctx.beginPath();
      dots.forEach(d => {
        const dx=mouse.x-d.ax, dy=mouse.y-d.ay, dSq=dx*dx+dy*dy;
        if(dSq<crSq && engagement>0.01){
          const dist=Math.sqrt(dSq), s=1-dist/cursorRadius;
          const push=s*s*bulgeStrength*engagement, ang=Math.atan2(dy,dx);
          d.sx += (d.ax-Math.cos(ang)*push-d.sx)*0.15;
          d.sy += (d.ay-Math.sin(ang)*push-d.sy)*0.15;
        } else {
          d.sx += (d.ax-d.sx)*0.1;
          d.sy += (d.ay-d.sy)*0.1;
        }
        let wx=d.sx, wy=d.sy;
        if(waveAmplitude>0){ wy+=Math.sin(d.ax*0.03+t)*waveAmplitude; wx+=Math.cos(d.ay*0.03+t*0.7)*waveAmplitude*0.5; }
        ctx.moveTo(wx+dr,wy); ctx.arc(wx,wy,dr,0,TAU);
      });
      ctx.fill();
      raf=requestAnimationFrame(tick);
    };

    const onMove = e => { mouse.x=e.pageX-sz.ox; mouse.y=e.pageY-sz.oy; };
    const spd = setInterval(()=>{
      const d=Math.hypot(mouse.px-mouse.x, mouse.py-mouse.y);
      mouse.speed+=(d-mouse.speed)*0.5;
      if(mouse.speed<0.001) mouse.speed=0;
      mouse.px=mouse.x; mouse.py=mouse.y;
    }, 20);

    resize();
    const onResize=()=>{ clearTimeout(rTimer); rTimer=setTimeout(resize,100); };
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove, { passive:true });
    raf=requestAnimationFrame(tick);

    return ()=>{
      cancelAnimationFrame(raf); clearInterval(spd); clearTimeout(rTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div ref={wrap} aria-hidden="true" style={{position:"absolute",inset:0,zIndex:1,pointerEvents:"none",mixBlendMode:"screen"}}>
      <canvas ref={cvs} style={{position:"absolute",inset:0,width:"100%",height:"100%"}}/>
    </div>
  );
}
