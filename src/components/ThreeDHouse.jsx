import React, { useEffect, useRef, useState } from "react";

// CSS-3D House built with divs. No external deps. Smoothly responds to scroll.
export default function ThreeDHouse() {
  const wrapperRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      const p = total > 0 ? window.scrollY / total : 0;
      setProgress(Math.min(1, Math.max(0, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Map scroll progress to transforms
  const translateY = progress * 200; // house moves down as you scroll
  const rotateY = (progress - 0.5) * 30; // slight rotation for parallax
  const sunY = -progress * 120;
  const cloudsX = progress * 200;

  return (
    <div ref={wrapperRef} className="relative w-full h-[70vh] md:h-screen overflow-visible select-none">
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-sky-200 to-sky-100" />

      {/* Sun */}
      <div
        className="absolute left-10 top-10 rounded-full shadow-2xl"
        style={{
          width: 140,
          height: 140,
          background: "radial-gradient(circle at 30% 30%, #fff8, #ffd27d, #ffb84d)",
          transform: `translateY(${sunY}px)`,
          transition: "transform 0.2s ease-out",
          filter: "blur(0.2px)",
        }}
      />

      {/* Clouds */}
      <Cloud x={-60 + cloudsX * 0.6} y={80} scale={1.1} />
      <Cloud x={160 + cloudsX * 0.4} y={140} scale={0.9} />
      <Cloud x={-180 + cloudsX * 0.3} y={200} scale={1.2} />

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-emerald-300 to-emerald-500" />
      <div className="absolute bottom-36 left-0 right-0 h-24 bg-gradient-to-t from-emerald-400/60 to-transparent blur-xl" />

      {/* 3D Scene container */}
      <div className="absolute inset-0 flex items-end justify-center perspective">
        <div
          className="preserve-3d"
          style={{
            transformStyle: "preserve-3d",
            transform: `translateY(${translateY}px) rotateY(${rotateY}deg)`,
            transition: "transform 0.2s ease-out",
          }}
        >
          <House />
        </div>
      </div>

      {/* Mountains for depth */}
      <Mountains />
    </div>
  );
}

function Cloud({ x = 0, y = 0, scale = 1 }) {
  return (
    <div
      className="absolute"
      style={{ transform: `translate(${x}px, ${y}px) scale(${scale})` }}
    >
      <div className="w-36 h-12 bg-white/90 rounded-full shadow-sm" />
      <div className="w-16 h-16 bg-white/90 rounded-full -mt-10 ml-6" />
      <div className="w-20 h-20 bg-white/90 rounded-full -mt-14 ml-16" />
    </div>
  );
}

function Mountains() {
  return (
    <div className="absolute bottom-32 left-0 right-0 pointer-events-none">
      <div className="mx-auto max-w-6xl flex items-end justify-between px-6 opacity-80">
        {[1, 2, 3].map((i) => (
          <div key={i} className="relative w-56 h-40">
            <div
              className="absolute bottom-0 left-0 right-0 mx-auto w-0 h-0 border-l-[120px] border-l-transparent border-r-[120px] border-r-transparent border-b-[180px] border-b-slate-300"
            />
            <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[24px] border-l-transparent border-r-[24px] border-r-transparent border-b-[36px] border-b-white" />
          </div>
        ))}
      </div>
    </div>
  );
}

function House() {
  return (
    <div className="relative w-[420px] h-[300px]">
      {/* Base shadow */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[460px] h-12 bg-emerald-900/20 blur-2xl rounded-full" />

      {/* House body (cube) */}
      <div className="relative w-[420px] h-[220px] mx-auto" style={{ transformStyle: "preserve-3d" }}>
        {/* Front wall */}
        <div className="absolute inset-0 bg-white rounded-xl shadow-xl border border-slate-200" style={{ transform: "translateZ(60px)" }}>
          <div className="absolute left-6 bottom-0 top-0 flex items-end pb-6">
            <Door />
          </div>
          <div className="absolute right-8 top-10">
            <Window />
          </div>
          <div className="absolute right-44 top-10">
            <Window />
          </div>
          <div className="absolute left-8 top-6 text-slate-400 text-xs tracking-widest uppercase">Zürich Residence</div>
        </div>
        {/* Back wall */}
        <div className="absolute inset-0 bg-slate-100 rounded-xl border border-slate-200" style={{ transform: "translateZ(-60px)" }} />
        {/* Left wall */}
        <div className="absolute inset-0 bg-slate-50 rounded-xl border border-slate-200" style={{ transform: "rotateY(90deg) translateZ(210px)" }} />
        {/* Right wall */}
        <div className="absolute inset-0 bg-slate-50 rounded-xl border border-slate-200" style={{ transform: "rotateY(-90deg) translateZ(210px)" }} />
        {/* Floor */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl" style={{ transform: "rotateX(90deg) translateZ(110px)" }} />
        {/* Ceiling */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl" style={{ transform: "rotateX(-90deg) translateZ(110px)" }} />
      </div>

      {/* Roof */}
      <div className="relative w-[420px] h-[160px] mx-auto -mt-6" style={{ transformStyle: "preserve-3d" }}>
        {/* Front triangle */}
        <div className="absolute left-1/2 -translate-x-1/2 w-0 h-0 border-l-[210px] border-l-transparent border-r-[210px] border-r-transparent border-b-[120px] border-b-rose-400" style={{ transform: "translateZ(60px)" }} />
        {/* Back triangle */}
        <div className="absolute left-1/2 -translate-x-1/2 w-0 h-0 border-l-[210px] border-l-transparent border-r-[210px] border-r-transparent border-b-[120px] border-b-rose-300" style={{ transform: "translateZ(-60px)" }} />
        {/* Roof planes */}
        <div className="absolute inset-0 bg-rose-500/90" style={{ transform: "rotateX(60deg) translateZ(100px)" }} />
        <div className="absolute inset-0 bg-rose-500/80" style={{ transform: "rotateX(-60deg) translateZ(100px)" }} />
        {/* Chimney */}
        <div className="absolute right-16 -top-6 w-10 h-24 bg-rose-300 rounded-sm shadow" style={{ transform: "translateZ(60px)" }}>
          <div className="w-12 h-3 bg-rose-200 -mt-2 -ml-1 rounded-sm" />
        </div>
      </div>

      {/* Garden details */}
      <div className="absolute left-0 right-0 -bottom-1 mx-auto flex items-center justify-center gap-4">
        {[...Array(6)].map((_, i) => (
          <Bush key={i} />
        ))}
      </div>
    </div>
  );
}

function Door() {
  return (
    <div className="w-20 h-36 bg-amber-700 rounded-sm shadow-inner border-4 border-amber-800 relative">
      <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-amber-300 rounded-full" />
      <div className="absolute inset-0 border-2 border-amber-900/20 rounded-sm" />
    </div>
  );
}

function Window() {
  return (
    <div className="w-24 h-20 bg-sky-200/60 backdrop-blur border-4 border-slate-300 rounded-md shadow-inner relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent" />
      <div className="absolute inset-2 grid grid-cols-2 gap-2">
        <div className="bg-sky-100/70 rounded-sm" />
        <div className="bg-sky-100/70 rounded-sm" />
        <div className="bg-sky-100/70 rounded-sm" />
        <div className="bg-sky-100/70 rounded-sm" />
      </div>
    </div>
  );
}

function Bush() {
  return (
    <div className="relative">
      <div className="w-6 h-6 bg-emerald-600 rounded-full -mb-3 ml-2" />
      <div className="w-9 h-9 bg-emerald-500 rounded-full -mb-4" />
      <div className="w-7 h-7 bg-emerald-700 rounded-full -ml-3" />
    </div>
  );
}
