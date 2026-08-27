import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/ui/Navbar";
import {
  getHomepageSettings,
  getProjects,
  getServices,
  getTestimonials,
} from "../../cms/client";
import type { MetricItem } from "../../cms/types";

export const metadata = {
  title: "AURATECH Studio — Visionary Architecture & Interior Design",
  description: "Bespoke residential, commercial, and hospitality architecture landmarks.",
};

export default async function HomePage() {
  const [homepageSettings, projectsRes, servicesRes, testimonialsRes] =
    await Promise.all([
      getHomepageSettings(),
      getProjects(),
      getServices(),
      getTestimonials(),
    ]);

  const allProjects = projectsRes?.data || [];
  const featuredId = homepageSettings?.featuredProjectId || 1;
  const featuredProject =
    allProjects.find((p) => p.id === featuredId)?.attributes ||
    allProjects[0]?.attributes;

  const services = servicesRes?.data?.slice(0, 3) || [];
  const topTestimonial = testimonialsRes?.data?.[0]?.attributes;

  return (
    <div className="relative min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-300">
      <Navbar />

      {/* Ambient background glow orbs */}
      <div className="glow-orb-purple -top-10 left-1/4" />
      <div className="glow-orb-blue top-1/3 right-10" />

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        {/* Dynamic Status Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-xs sm:text-sm font-medium text-purple-600 dark:text-purple-300 mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold">{homepageSettings.badgeText}</span>
        </div>

        {/* Dynamic Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 text-slate-900 dark:text-white">
          <span>{homepageSettings.heroTitlePrefix} </span>
          <span className="text-gradient-accent">{homepageSettings.heroTitleAccent}</span>
        </h1>

        {/* Dynamic Subtitle */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-10">
          {homepageSettings.heroSubtitle}
        </p>

        {/* Dynamic Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/projects"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-semibold text-sm shadow-lg shadow-purple-500/25 transition-all hover:scale-105"
          >
            {homepageSettings.ctaPrimaryText || "Explore Portfolio"}
          </Link>
          <Link
            href="/services"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full glass-panel glass-panel-hover text-slate-800 dark:text-slate-200 font-semibold text-sm transition-all"
          >
            {homepageSettings.ctaSecondaryText || "Capabilities & Process"}
          </Link>
        </div>

        {/* Dynamic Studio Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-200 dark:border-white/10">
          {homepageSettings.metrics?.map((m: MetricItem, idx: number) => (
            <div key={idx} className="glass-panel p-4 rounded-2xl">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {m.value}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 3 CLEAN SECTION GATEWAYS ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pb-24">
        {/* Gateway 1: Spotlight Project with Hover Image Crossfade */}
        {featuredProject && (
          <section className="glass-panel rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 group grid grid-cols-1 lg:grid-cols-12 gap-0 shadow-lg">
            {/* Image Container with Smooth Dual-Image Hover Crossfade */}
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto min-h-[340px] overflow-hidden bg-slate-900">
              {/* Base Image (Exterior / Main View) */}
              <div className="absolute inset-0 w-full h-full transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-0">
                <Image
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                  priority
                />
              </div>
              {/* Alternate Hover Image (Interior Perspective) */}
              <div className="absolute inset-0 w-full h-full transition-all duration-700 ease-out scale-105 opacity-0 group-hover:opacity-100 group-hover:scale-100">
                <Image
                  src={
                    featuredProject.hoverImage ||
                    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
                  }
                  alt={`${featuredProject.title} Interior View`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-purple-600 text-white shadow-md">
                  Featured Case Study
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-black/60 backdrop-blur-md text-slate-200 border border-white/10 opacity-80 group-hover:opacity-100 transition-opacity">
                  ✨ Hover for Interior View
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                  {featuredProject.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2 mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                  {featuredProject.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                  {featuredProject.description}
                </p>
                {featuredProject.stats && (
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    📍 {featuredProject.stats}
                  </p>
                )}
              </div>

              <div className="pt-6 border-t border-slate-200 dark:border-white/10 mt-6 flex items-center justify-between">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-500"
                >
                  View All Projects in Portfolio →
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Gateway 2: Capabilities Overview */}
        <section className="py-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-purple-600 dark:text-purple-400">
                Core Disciplines
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
                Architectural Capabilities
              </h2>
            </div>
            <Link
              href="/services"
              className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
            >
              Explore Full 4-Phase Methodology →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s) => (
              <div
                key={s.id}
                className="glass-panel glass-panel-hover rounded-2xl p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl mb-3">{s.attributes.icon || "🏛️"}</div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {s.attributes.title}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {s.attributes.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10">
                  <Link
                    href="/services"
                    className="text-xs font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-1"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Gateway 3: Client Endorsement */}
        {topTestimonial && (
          <section className="glass-panel rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto border border-purple-500/20 shadow-xl">
            <div className="flex justify-center text-amber-400 text-lg mb-4">★★★★★</div>
            <blockquote className="text-lg sm:text-xl text-slate-800 dark:text-slate-200 italic font-medium leading-relaxed mb-6">
              &ldquo;{topTestimonial.content}&rdquo;
            </blockquote>
            <div className="font-bold text-slate-900 dark:text-white">{topTestimonial.author}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{topTestimonial.role}</div>
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10">
              <Link
                href="/testimonials"
                className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline"
              >
                Read All Verified Client Reviews & Press Mentions →
              </Link>
            </div>
          </section>
        )}

        {/* Final CTA Strip */}
        <section className="rounded-3xl glass-panel p-8 sm:p-12 text-center border border-purple-500/30">
          <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
            Ready to Begin Your Project?
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Schedule a confidential architectural discovery session with our founding principals.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold shadow-lg shadow-purple-500/25 hover:scale-105 transition-transform"
          >
            Book Discovery Session →
          </Link>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-slate-950/80 pt-12 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-xs">
              A
            </div>
            <span className="font-bold text-slate-900 dark:text-white text-sm">
              AURATECH Studio
            </span>
          </div>

          <div className="flex flex-wrap gap-6 font-medium">
            <Link href="/services" className="hover:text-purple-600 dark:hover:text-white">Services</Link>
            <Link href="/projects" className="hover:text-purple-600 dark:hover:text-white">Portfolio</Link>
            <Link href="/about" className="hover:text-purple-600 dark:hover:text-white">Studio</Link>
            <Link href="/blog" className="hover:text-purple-600 dark:hover:text-white">Insights</Link>
            <Link href="/testimonials" className="hover:text-purple-600 dark:hover:text-white">Reviews</Link>
            <Link href="/contact" className="hover:text-purple-600 dark:hover:text-white">Contact</Link>
          </div>

          <p>© {new Date().getFullYear()} AURATECH Studio LLC.</p>
        </div>
      </footer>
    </div>
  );
}
