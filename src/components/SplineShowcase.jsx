import React from "react";
import Spline from "@splinetool/react-spline";

// High-fidelity WebGL scene powered by Spline
export default function SplineShowcase() {
  // Replace "sceneUrl" with a project scene when provided
  const sceneUrl = "https://prod.spline.design/placeholder/scene.splinecode";
  return (
    <section id="showcase" className="relative w-full h-[80vh] md:h-[100vh] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0b0b0b] to-[#0a0a0a]" />
      <div className="relative z-10 w-full h-full">
        <Spline scene={sceneUrl} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(184,115,51,0.12),transparent_60%)]" />
    </section>
  );
}
