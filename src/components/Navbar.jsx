import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";

export default function Navbar({ active }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setOpen(false);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const LinkItem = ({ id, label }) => (
    <a
      href={`#${id}`}
      data-magnetic
      className={`px-3 py-1.5 rounded-full transition-colors ${
        active === id
          ? "bg-amber-400/20 text-amber-300 ring-1 ring-amber-300/30"
          : "text-white/70 hover:text-white"
      }`}
    >
      {label}
    </a>
  );

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-auto">
      <div className="mx-auto flex items-center gap-3 rounded-full bg-white/5 backdrop-blur-xl ring-1 ring-white/10 px-4 py-2 shadow-[0_10px_50px_rgba(0,0,0,0.35)]">
        <a href="#hero" className="font-semibold tracking-tight" aria-label="Zürich Estates">
          <span className="text-white">Zürich</span>
          <span className="text-amber-400">Estates</span>
        </a>
        <div className="ml-auto hidden md:flex items-center gap-1.5">
          <LinkItem id="hero" label="Home" />
          <LinkItem id="showcase" label="Showcase" />
          <LinkItem id="gallery" label="Gallery" />
          <LinkItem id="info" label="About" />
          <LinkItem id="contact" label="Contact" />
          <a
            href="#contact"
            data-magnetic
            className="ml-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-black font-medium hover:brightness-110"
          >
            Book a Tour
          </a>
        </div>
        <button
          aria-label="Toggle menu"
          className="md:hidden ml-auto text-white/80"
          onClick={() => setOpen((v) => !v)}
        >
          <Menu size={22} />
        </button>
      </div>
      {open && (
        <div className="md:hidden mt-2 rounded-2xl bg-white/5 backdrop-blur-xl ring-1 ring-white/10 p-3 flex flex-col gap-2">
          <LinkItem id="hero" label="Home" />
          <LinkItem id="showcase" label="Showcase" />
          <LinkItem id="gallery" label="Gallery" />
          <LinkItem id="info" label="About" />
          <LinkItem id="contact" label="Contact" />
        </div>
      )}
    </div>
  );
}
