import React from "react";
import ThreeDHouse from "./components/ThreeDHouse";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="relative flex items-center justify-center h-[90vh] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute -inset-40 bg-[radial-gradient(ellipse_at_top_right,rgba(14,165,233,0.25),transparent_60%)]" />
          <div className="absolute -inset-40 bg-[radial-gradient(ellipse_at_bottom_left,rgba(244,63,94,0.2),transparent_60%)]" />
        </div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Zürich Luxury Estates
          </h1>
          <p className="mt-4 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Experience architecture in motion. Scroll to explore a living showcase of Swiss precision and modern comfort.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a href="#gallery" className="px-6 py-3 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition">View Listings</a>
            <a href="#contact" className="px-6 py-3 rounded-full bg-white text-slate-900 ring-1 ring-slate-300 hover:bg-slate-50 transition">Book a Tour</a>
          </div>
        </div>
        <div className="absolute bottom-8 text-slate-600 animate-bounce">Scroll ↓</div>
      </section>

      {/* 3D House Scene */}
      <section className="relative">
        <ThreeDHouse />
      </section>

      {/* Content Sections */}
      <section id="gallery" className="py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="group rounded-2xl overflow-hidden bg-white shadow-sm ring-1 ring-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="h-48 bg-gradient-to-br from-slate-200 to-slate-300" />
              <div className="p-5">
                <div className="font-semibold">Lakeview Residence {i}</div>
                <div className="text-slate-600 text-sm mt-1">Kreis 7, Zürich</div>
                <div className="mt-3 text-slate-700">From CHF {(2.2 + i * 0.3).toFixed(1)}M</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Designed for life in Zürich</h2>
            <p className="text-slate-600">Our properties embody elegant European design, sustainable materials, and breathtaking alpine views. Step inside and feel the harmony of nature and city living.</p>
            <ul className="text-slate-700 list-disc pl-5 space-y-2">
              <li>Panoramic terraces and lake vistas</li>
              <li>Energy-efficient architecture</li>
              <li>Crafted interiors with Swiss precision</li>
            </ul>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl ring-1 ring-slate-200">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-300/30 to-rose-300/30" />
            <div className="absolute inset-6 rounded-xl bg-white/50 backdrop-blur" />
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Schedule a private viewing</h2>
            <p className="mt-3 text-slate-300">Tell us what you’re looking for and our Zürich team will curate a bespoke tour.</p>
          </div>
          <form className="bg-white/10 rounded-2xl p-6 space-y-4">
            <div>
              <label className="text-sm text-slate-300">Name</label>
              <input className="mt-1 w-full px-3 py-2 rounded-md bg-white/80 text-slate-900" placeholder="Alex Müller"/>
            </div>
            <div>
              <label className="text-sm text-slate-300">Email</label>
              <input type="email" className="mt-1 w-full px-3 py-2 rounded-md bg-white/80 text-slate-900" placeholder="alex@example.com"/>
            </div>
            <div>
              <label className="text-sm text-slate-300">Message</label>
              <textarea className="mt-1 w-full px-3 py-2 rounded-md bg-white/80 text-slate-900" rows="3" placeholder="I’m interested in lakefront properties…"/>
            </div>
            <button className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-white text-slate-900 font-medium hover:bg-slate-100 transition">Send</button>
          </form>
        </div>
      </section>

      <footer className="py-10 text-center text-slate-500 text-sm">© {new Date().getFullYear()} Zürich Luxury Estates</footer>
    </div>
  );
}
