"use client";

import React from "react";
import AnimatedButton from "./AnimatedButton";
import Link from "next/link";

interface Metric {
  value: string;
  label: string;
}

interface HeroSectionProps {
  badgeText?: string;
  heroTitlePrefix?: string;
  heroTitleAccent?: string;
  subtitle?: string;
  ctaPrimaryText?: string;
  ctaSecondaryText?: string;
  metrics?: Metric[];
}

export default function HeroSection({
  badgeText = "✨ World Architecture Award 2026 Winner",
  heroTitlePrefix = "Transforming Spaces into",
  heroTitleAccent = "Timeless Masterpieces",
  subtitle = "We blend bespoke architectural engineering, organic materials, and sensory ambient design to craft spaces that inspire and endure.",
  ctaPrimaryText = "Explore Our Works",
  ctaSecondaryText = "Request Consultation",
  metrics = [
    { value: "140+", label: "Landmark Projects" },
    { value: "18", label: "Design Awards" },
    { value: "99.4%", label: "Client Satisfaction" },
    { value: "12 yrs", label: "Studio Excellence" },
  ],
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Dynamic ambient glow orbs */}
      <div className="glow-orb-purple -top-20 -left-20 animate-pulse opacity-60" />
      <div className="glow-orb-blue top-1/3 -right-20 opacity-50" />
      <div className="glow-orb-pink bottom-0 left-1/3 opacity-40" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Release / Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-purple-500/30 text-xs sm:text-sm font-medium text-purple-300 mb-8 shadow-inner shadow-purple-500/10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-white">{badgeText}</span>
          <span className="text-purple-400 font-bold">•</span>
          <span className="text-purple-300">Studio Portfolio</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
          <span className="text-gradient">{heroTitlePrefix} </span>
          <span className="text-gradient-accent">{heroTitleAccent}</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-300/90 leading-relaxed mb-10 font-normal">
          {subtitle}
        </p>

        {/* Interactive CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16">
          <AnimatedButton href="/projects" className="w-full sm:w-auto">
            {ctaPrimaryText}
          </AnimatedButton>

          <Link
            href="/contact"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full glass-panel glass-panel-hover text-slate-200 hover:text-white font-medium text-sm flex items-center justify-center gap-2 group transition-all"
          >
            {ctaSecondaryText}
            <svg
              className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Key Metrics / Highlights Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-white/10">
          {metrics.map((m, idx) => (
            <div key={idx} className="glass-panel p-4 rounded-2xl">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">{m.value}</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
