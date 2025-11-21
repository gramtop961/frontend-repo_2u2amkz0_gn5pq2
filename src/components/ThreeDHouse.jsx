import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Modern, epic CSS-3D showcase with scroll + mouse parallax adapted to Black + Copper palette
export default function ThreeDShowcase() {
  const containerRef = useRef(null);
  const houseRef = useRef(null);
  const auraRef = useRef(null);

  // Framer scroll progress tied to the entire page
  const { scrollYProgress } = useScroll();
  const rotateY = useTransform(scrollYProgress, [0, 1], [-18, 18]);
  const translateY = useTransform(scrollYProgress, [0, 1], [0, 260]);
  const sunY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const cloudsX = useTransform(scrollYProgress, [0, 1], [-120, 220]);
  const hue = useTransform(scrollYProgress, [0, 1], [20, 45]); // warm range

  // Mouse parallax for extra depth
  useEffect(() => {
    const el = containerRef.current;
    const house = houseRef.current;
    const aura = auraRef.current;
    if (!el || !house) return;

    let raf = 0;
    let mx = 0, my = 0;
    let tx = 0, ty = 0;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      mx = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
      my = (e.clientY - rect.top) / rect.height - 0.5;
      if (!raf) raf = requestAnimationFrame(update);
    };

    const onLeave = () => {
      mx = 0; my = 0;
      if (!raf) raf = requestAnimationFrame(update);
    };

    const update = () => {
      // ease towards mouse
      tx += (mx - tx) * 0.08;
      ty += (my - ty) * 0.08;
      const rx = ty * -10; // tilt up/down
      const ry = tx * 16; // rotate side
      house.style.transform = `translateY(var(--ty)) rotateX(${rx}deg) rotateY(calc(var(--ry) + ${ry}deg))`;
      if (aura) aura.style.transform = `translate(-50%, -50%) scale(${1 + Math.max(Math.abs(tx), Math.abs(ty)) * 0.15})`;
      raf = 0;
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[80vh] md:h-[100vh] overflow-hidden bg-gradient-to-b from-[#0a0a0a] via-[#0b0b0b] to-[#0a0a0a]">
      {/* Background aurora + grid */}
      <motion.div
        className="absolute inset-0"
        style={{ filter: "saturate(1.1)" }}
      >
        <motion.div
          className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[120vw] h-[120vw] rounded-full opacity-40 blur-[90px]"
          style={{
            background:
              "conic-gradient(from 180deg, #7c3f0033, #b8733344, #f59e0b44, #d9770644, #a1620733, #7c3f0033)",
            rotate: hue,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 20%, #fff 0.5px, transparent 0.5px)",
            backgroundSize: "14px 14px",
          }}
        />
      </motion.div>

      {/* Sun / glow */}
      <motion.div
        className="absolute left-10 top-10 md:left-20 md:top-16 w-40 h-40 md:w-56 md:h-56 rounded-full"
        style={{
          y: sunY,
          background:
            "radial-gradient(circle at 30% 30%, #fff8, #ffd7a3, #d97706)",
          filter: "blur(1px)",
          boxShadow: "0 0 120px 40px #b8733340",
        }}
      />

      {/* Clouds */}
      <Cloud style={{ x: cloudsX, y: 100, scale: 1.1 }} />
      <Cloud style={{ x: useTransform(cloudsX, (v) => v * 0.6 + 180), y: 160, scale: 0.9 }} />
      <Cloud style={{ x: useTransform(cloudsX, (v) => v * 0.4 - 180), y: 220, scale: 1.25 }} />

      {/* Ground line */}
      <div className="absolute bottom-0 left-0 right-0 h-40">
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-amber-400/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-8 h-[2px] bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />
      </div>

      {/* 3D Scene */}
      <div className="absolute inset-0 flex items-center justify-center perspective">
        <motion.div
          ref={houseRef}
          className="preserve-3d relative"
          style={{
            // custom CSS vars used by mouse parallax hook
            "--ty": translateY,
            "--ry": rotateY,
          }}
        >
          <House />
          <div
            ref={auraRef}
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full bg-[#b8733333] blur-[110px]"
          />
        </motion.div>
      </div>
    </section>
  );
}

function Cloud({ style }) {
  return (
    <motion.div className="absolute" style={style}>
      <div className="w-36 h-12 bg-white/85 rounded-full shadow-[0_10px_30px_rgba(255,255,255,0.14)]" />
      <div className="w-16 h-16 bg-white/85 rounded-full -mt-10 ml-6" />
      <div className="w-20 h-20 bg-white/85 rounded-full -mt-14 ml-16" />
    </motion.div>
  );
}

function House() {
  // Sleek minimal villa with metallic panels and copper accents
  return (
    <div className="relative w-[520px] max-w-[78vw] h-[360px] mx-auto">
      {/* Base shadow */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[520px] h-12 bg-amber-900/30 blur-2xl rounded-full" />

      {/* Body */}
      <div className="relative w-full h-[260px] mx-auto" style={{ transformStyle: "preserve-3d" }}>
        {/* Front */}
        <Panel className="from-zinc-200/90 to-zinc-300/60" style={{ transform: "translateZ(70px)" }}>
          <div className="absolute inset-x-8 top-8 h-1.5 bg-gradient-to-r from-amber-300 via-orange-300 to-amber-400 opacity-70 rounded-full" />
          <div className="absolute left-8 bottom-8"><Door /></div>
          <div className="absolute right-10 top-10 flex gap-6">
            <Window />
            <Window />
          </div>
        </Panel>
        {/* Back */}
        <Panel className="from-zinc-200/50 to-zinc-400/40" style={{ transform: "translateZ(-70px)" }} />
        {/* Left */}
        <Panel className="from-zinc-100/70 to-zinc-300/50" style={{ transform: "rotateY(90deg) translateZ(260px)" }} />
        {/* Right */}
        <Panel className="from-zinc-100/70 to-zinc-300/50" style={{ transform: "rotateY(-90deg) translateZ(260px)" }} />
        {/* Floor */}
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            transform: "rotateX(90deg) translateZ(130px)",
            background: "linear-gradient(135deg,#b87333,#d97706)",
          }}
        />
        {/* Ceiling */}
        <div
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/40 to-white/10"
          style={{ transform: "rotateX(-90deg) translateZ(130px)" }}
        />
      </div>

      {/* Roof */}
      <div className="relative w-full h-[170px] mx-auto -mt-4" style={{ transformStyle: "preserve-3d" }}>
        <div
          className="absolute left-1/2 -translate-x-1/2 w-0 h-0 border-l-[260px] border-l-transparent border-r-[260px] border-r-transparent border-b-[120px] border-b-amber-500/90"
          style={{ transform: "translateZ(70px)" }}
        />
        <div
          className="absolute left-1/2 -translate-x-1/2 w-0 h-0 border-l-[260px] border-l-transparent border-r-[260px] border-r-transparent border-b-[120px] border-b-orange-400/70"
          style={{ transform: "translateZ(-70px)" }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-amber-500/90 to-orange-600/80"
          style={{ transform: "rotateX(58deg) translateZ(120px)" }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-amber-500/90 to-orange-600/80"
          style={{ transform: "rotateX(-58deg) translateZ(120px)" }}
        />
        {/* Chimney */}
        <div
          className="absolute right-16 -top-8 w-12 h-28 bg-orange-500/80 rounded-sm shadow-[0_10px_30px_rgba(245,158,11,0.45)]"
          style={{ transform: "translateZ(70px)" }}
        >
          <div className="w-14 h-3 bg-amber-200/80 -mt-2 -ml-1 rounded-sm" />
        </div>
      </div>

      {/* LED ground markers */}
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-4 flex gap-3 opacity-70">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-8 h-[2px] bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
        ))}
      </div>
    </div>
  );
}

function Panel({ className = "", style, children }) {
  return (
    <div
      className={`absolute inset-0 rounded-xl border border-white/20 shadow-[0_20px_80px_rgba(0,0,0,0.45)] bg-gradient-to-br ${className}`}
      style={style}
    >
      <div className="absolute inset-0 rounded-xl ring-1 ring-white/10" />
      {children}
    </div>
  );
}

function Door() {
  return (
    <div className="w-24 h-40 bg-black/80 rounded-md border border-white/10 shadow-inner relative overflow-hidden">
      <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-amber-300 rounded-full" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
  );
}

function Window() {
  return (
    <div className="w-28 h-24 rounded-md border border-white/15 shadow-inner relative overflow-hidden bg-amber-100/10 backdrop-blur">
      <div className="absolute inset-0 bg-gradient-to-b from-white/25 to-transparent" />
      <div className="absolute inset-2 grid grid-cols-2 gap-2">
        <div className="bg-white/15 rounded-sm" />
        <div className="bg-white/15 rounded-sm" />
        <div className="bg-white/15 rounded-sm" />
        <div className="bg-white/15 rounded-sm" />
      </div>
    </div>
  );
}
