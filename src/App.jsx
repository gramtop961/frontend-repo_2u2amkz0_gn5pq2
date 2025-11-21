import React from "react";
import ThreeDShowcase from "./components/ThreeDHouse";
import { motion } from "framer-motion";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero */}
      <section className="relative flex items-center justify-center h-[88vh] overflow-hidden">
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
            <a href="#gallery" className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-black font-medium hover:brightness-110 transition">
              View Listings
            </a>
            <a href="#contact" className="px-6 py-3 rounded-full bg-white/5 text-white ring-1 ring-white/15 hover:bg-white/10 transition">
              Book a Tour
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 text-white/60 animate-bounce">Scroll ↓</div>
      </section>

      {/* 3D Showcase */}
      <section className="relative">
        <ThreeDShowcase />
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-24 bg-gradient-to-b from-[#0a0a0a] to-[#0c0c0c]">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="group rounded-2xl overflow-hidden bg-white/5 backdrop-blur ring-1 ring-white/10 hover:ring-white/20 hover:shadow-[0_10px_60px_rgba(184,115,51,0.18)] hover:-translate-y-1 transition-all"
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
      <section className="py-24">
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
            <button className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-gradient-to-r from-amber-400 to-orange-500 text-black font-medium hover:brightness-110 transition">
              Send
            </button>
          </form>
        </div>
      </section>

      <footer className="py-10 text-center text-white/50 text-sm">
        © {new Date().getFullYear()} Zürich Estates
      </footer>
    </div>
  );
}
