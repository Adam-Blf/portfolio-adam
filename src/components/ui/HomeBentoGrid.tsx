import React from "react";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";

// Placeholder components for each block (replace with real ones as needed)
function BentoHero() {
  return (
    <LiquidGlassCard className="col-span-2 row-span-2 flex items-center justify-center min-h-[320px]">
      {/* TODO: Replace with interactive 3D/Video EPSM project */}
      <span className="text-2xl font-bold">EPSM Project (3D/Video)</span>
    </LiquidGlassCard>
  );
}

function BentoProfile() {
  return (
    <LiquidGlassCard className="flex flex-col items-center justify-center min-h-[160px]">
      {/* TODO: Add memoji/avatar and magnetic button */}
      <span className="text-lg font-semibold">About Me</span>
      <button className="mt-4 px-6 py-2 rounded-full bg-glass-bg glass-liquid font-medium transition-transform hover:scale-105">Magnetic Button</button>
    </LiquidGlassCard>
  );
}

function BentoStack() {
  return (
    <LiquidGlassCard className="flex items-center justify-center min-h-[80px]">
      {/* TODO: Add scrolling ticker of tech stack icons */}
      <span className="text-base">Tech Stack Ticker</span>
    </LiquidGlassCard>
  );
}

function BentoBusiness() {
  return (
    <LiquidGlassCard className="flex flex-col items-center justify-center min-h-[160px]">
      {/* TODO: Link to Douille project, entrepreneurial framing */}
      <span className="text-lg font-semibold">Douille Project</span>
      <a href="/projects/douille" className="mt-2 underline text-accent">Entrepreneurial Foundation</a>
    </LiquidGlassCard>
  );
}

export default function HomeBentoGrid() {
  return (
    <section className="w-full max-w-5xl mx-auto py-12 px-4 grid grid-cols-2 grid-rows-3 gap-6 auto-rows-fr">
      {/* Block A: Hero (large, 2x2) */}
      <BentoHero />
      {/* Block B: Profile (medium) */}
      <BentoProfile />
      {/* Block C: Stack (small) */}
      <BentoStack />
      {/* Block D: Business (medium) */}
      <BentoBusiness />
    </section>
  );
}
