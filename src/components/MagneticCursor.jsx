import React, { useEffect } from "react";

// Lightweight magnetic cursor + micro-interactions
export default function MagneticCursor() {
  useEffect(() => {
    const MAGNETIC_ATTR = "data-magnetic";
    const strength = 22; // px pull
    let raf = 0;

    const handleMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      const items = document.querySelectorAll(`[${MAGNETIC_ATTR}]`);
      items.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = x - cx;
        const dy = y - cy;
        const dist = Math.hypot(dx, dy);
        const pull = Math.max(0, 1 - dist / 180);
        const tx = (dx / dist || 0) * pull * strength;
        const ty = (dy / dist || 0) * pull * strength;
        el.style.transform = `translate(${tx}px, ${ty}px)`;
      });
      if (!raf) raf = requestAnimationFrame(() => (raf = 0));
    };

    const reset = () => {
      const items = document.querySelectorAll(`[${MAGNETIC_ATTR}]`);
      items.forEach((el) => (el.style.transform = ""));
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", reset);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", reset);
      reset();
    };
  }, []);

  return null;
}
