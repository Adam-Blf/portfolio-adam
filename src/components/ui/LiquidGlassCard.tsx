"use client";
import React, { ReactNode } from "react";

// SVG filter for glass distortion
function LiquidGlassSVGFilter() {
  return (
    <svg style={{ position: "absolute", width: 0, height: 0 }}>
      <filter id="liquid-glass-distort">
        <feTurbulence type="turbulence" baseFrequency="0.9" numOctaves="2" seed="2" result="turb" />
        <feDisplacementMap in2="turb" in="SourceGraphic" scale="6" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}

// Card component with Liquid Glass effect
export function LiquidGlassCard({
  children,
  className = "",
  ...props
}: {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}) {
  return (
    <div
      className={`glass-liquid glass-liquid-svg relative overflow-hidden rounded-2xl shadow-glow ${className}`}
      style={{ WebkitBackdropFilter: "blur(16px) saturate(180%)", backdropFilter: "blur(16px) saturate(180%)" }}
      {...props}
    >
      {/* SVG filter injected once globally (can be moved to _app/layout) */}
      <LiquidGlassSVGFilter />
      {/* Subtle noise overlay */}
      <div className="ambient-noise-overlay pointer-events-none" />
      {children}
    </div>
  );
}
