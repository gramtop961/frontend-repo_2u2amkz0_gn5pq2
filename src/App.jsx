import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import MagneticCursor from "./components/MagneticCursor";
import SplineShowcase from "./components/SplineShowcase";

export default function App() {
  const [active, setActive] = useState("hero");
  const sectionsRef = useRef({});

  useEffect(() => {
    const ids = ["hero", "showcase", "gallery", "info", "contact"];
    const options = { root: null, rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    }, options);

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        sectionsRef.current[id] = el;
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar active={active} />
      <MagneticCursor />

      {/* Hero */}
      <section id="hero" className="relative flex items-center justify-center h-[88vh] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute -inset-40 bg-[radial-gradient(ellipse_at_top_right,rgba(184,115,51,0.15),transparent_60%)]" />
          <div className="absolute -inset-40 bg-[radial-gradient(ellipse_at_bottom_left,rgba(217,119,6,0.12),transparent_60%)]" />
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70"
          >
            Zürich Estates
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
            className="mt-4 text-lg md:text-xl text-white/70 max-w-2xl mx-auto"
          >
            Ultra-modern living with a cinematic, black & copper aesthetic. Scroll for an immersive 3D showcase tailored for Zürich.
          </motion.p>
          <div className="mt-8 flex justify-center gap-4">
            <a data-magnetic href="#gallery" className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-black font-medium hover:brightness-110 transition">
              View Listings
            </a>
            <a data-magnetic href="#contact" className="px-6 py-3 rounded-full bg-white/5 text-white ring-1 ring-white/15 hover:bg-white/10 transition">
              Book a Tour
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 text-white/60 animate-bounce">Scroll ↓</div>
      </section>

      {/* High-fidelity 3D Showcase (Spline) */}
      <SplineShowcase />

      {/* Gallery */}
      <section id="gallery" className="py-24 bg-gradient-to-b from-[#0a0a0a] to-[#0c0c0c]">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              data-magnetic
              className="group rounded-2xl overflow-hidden bg-white/5 backdrop-blur ring-1 ring-white/10 transition-all hover:ring-white/20 hover:shadow-[0_10px_60px_rgba(184,115,51,0.18)] hover:-translate-y-1 hover:[transform:perspective(800px)_rotateX(2deg)]"
            >
              <div className="h-48 bg-gradient-to-br from-amber-400/25 via-orange-500/20 to-amber-600/25" />
              <div className="p-5">
                <div className="font-semibold">Lakeview Residence {i}</div>
                <div className="text-white/70 text-sm mt-1">Kreis 7, Zürich</div>
                <div className="mt-3 text-white/90">From CHF {(2.2 + i * 0.3).toFixed(1)}M</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Info */}
      <section id="info" className="py-24">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Swiss precision, copper warmth</h2>
            <p className="text-white/70">
              Architecture that balances lake serenity with bold, crafted materials. Minimal lines,
              maximal experience.
            </p>
            <ul className="text-white/80 list-disc pl-5 space-y-2">
              <li>Panoramic terraces and lake vistas</li>
              <li>Energy-efficient architecture</li>
              <li>Curated interiors with precision craftsmanship</li>
            </ul>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl ring-1 ring-white/10">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/25 via-orange-500/20 to-amber-600/25" />
            <div className="absolute inset-6 rounded-xl bg-white/5 backdrop-blur" />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 bg-[#0b0b0b]">
        <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Schedule a private viewing</h2>
            <p className="mt-3 text-white/70">
              Tell us what you’re looking for and our Zürich team will curate a bespoke tour.
            </p>
          </div>
          <form className="bg-white/5 rounded-2xl p-6 space-y-4 ring-1 ring-white/10">
            <div>
              <label className="text-sm text-white/70">Name</label>
              <input
                className="mt-1 w-full px-3 py-2 rounded-md bg-white/85 text-black placeholder-black/60"
                placeholder="Alex Müller"
              />
            </div>
            <div>
              <label className="text-sm text-white/70">Email</label>
              <input
                type="email"
                className="mt-1 w-full px-3 py-2 rounded-md bg-white/85 text-black placeholder-black/60"
                placeholder="alex@example.com"
              />
            </div>
            <div>
              <label className="text-sm text-white/70">Message</label>
              <textarea
                className="mt-1 w-full px-3 py-2 rounded-md bg-white/85 text-black placeholder-black/60"
                rows="3"
                placeholder="I’m interested in lakefront properties…"
              />
            </div>
            <button data-magnetic className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-gradient-to-r from-amber-400 to-orange-500 text-black font-medium hover:brightness-110 transition">
              Send
            </button>
          </form>
        </div>
      </section>

      {/* Zürich skyline silhouette */}
      <section aria-hidden className="relative">
        <svg viewBox="0 0 1200 120" className="w-full h-24" preserveAspectRatio="none">
          <path
            d="M0,80 L60,80 L80,60 L110,60 L120,40 L150,40 L160,50 L200,50 L210,30 L230,30 L240,55 L260,55 L280,42 L310,42 L320,70 L350,70 L360,48 L380,48 L400,62 L440,62 L450,38 L470,38 L480,60 L520,60 L540,45 L560,45 L580,65 L620,65 L640,35 L660,35 L680,55 L720,55 L740,41 L760,41 L780,63 L820,63 L840,47 L860,47 L880,58 L920,58 L940,44 L960,44 L980,66 L1020,66 L1040,52 L1060,52 L1080,60 L1120,60 L1140,48 L1160,48 L1180,58 L1200,58"
            fill="none"
            stroke="#b87333"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.7"
          />
        </svg>
      </section>

      <footer className="py-10 text-center text-white/50 text-sm">
        © {new Date().getFullYear()} Zürich Estates
      </footer>
    </div>
  );
}
