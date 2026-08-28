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

export const dynamic = "force-dynamic";

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

  // Multi-project featured showcase (set from admin)
  const featuredIds =
    homepageSettings?.featuredProjectIds && homepageSettings.featuredProjectIds.length > 0
      ? homepageSettings.featuredProjectIds
      : [featuredId, 2, 3];
  const featuredLandmarks = allProjects.filter((p) => featuredIds.includes(p.id));
  const displayLandmarkProjects =
    featuredLandmarks.length > 0 ? featuredLandmarks : allProjects.slice(0, 3);

  const services = servicesRes?.data?.slice(0, 3) || [];
  const topTestimonial = testimonialsRes?.data?.[0]?.attributes;

  return (
    <div className="relative min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-300">
      <Navbar />

      {/* Ambient background glow orbs */}
      <div className="glow-orb-purple -top-10 left-1/4" />
      <div className="glow-orb-blue top-1/3 right-10" />

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-36 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
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
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
      </section>

      {/* ================= MAIN CONTENT GATEWAYS ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pb-24">
        {/* Gateway 1: Spotlight Project with Hover Image Crossfade */}
        {featuredProject && (
          <section className="glass-panel rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 group grid grid-cols-1 lg:grid-cols-12 gap-0 shadow-lg">
            {/* Image Container with Smooth Dual-Image Hover Crossfade - Clickable Link to /projects */}
            <Link
              href="/projects"
              className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto min-h-[340px] overflow-hidden bg-slate-900 block cursor-pointer"
            >
              {/* Base Image (Exterior / Main View) */}
              <div className="absolute inset-0 w-full h-full transition-all duration-200 ease-out group-hover:scale-105 group-hover:opacity-0">
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
              <div className="absolute inset-0 w-full h-full transition-all duration-200 ease-out scale-105 opacity-0 group-hover:opacity-100 group-hover:scale-100">
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
            </Link>

            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                  {featuredProject.category}
                </span>
                <Link href="/projects" className="block">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2 mb-4 hover:text-purple-600 dark:hover:text-purple-300 transition-colors">
                    {featuredProject.title}
                  </h3>
                </Link>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                  {featuredProject.description}
                </p>
                {featuredProject.stats && (
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    📍 {featuredProject.stats}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Gateway 2: Featured Landmark Works Showcase */}
        {allProjects.length > 0 && (
          <section className="py-4">
            <div className="mb-8">
              <span className="text-xs uppercase tracking-widest font-bold text-purple-600 dark:text-purple-400">
                Curated Portfolio
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
                Featured Landmark Works
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayLandmarkProjects.map((p) => (
                <div
                  key={p.id}
                  className="glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col group border border-slate-200 dark:border-white/10"
                >
                  <Link href="/projects" className="relative h-56 w-full overflow-hidden bg-slate-900 block cursor-pointer">
                    <Image
                      src={p.attributes.image}
                      alt={p.attributes.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 backdrop-blur-md text-purple-300 border border-white/10">
                        {p.attributes.category}
                      </span>
                    </div>
                    {p.attributes.location && (
                      <div className="absolute bottom-3 right-3 z-10">
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-black/70 backdrop-blur-md text-slate-200 border border-white/10">
                          {p.attributes.location}
                        </span>
                      </div>
                    )}
                  </Link>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <Link href="/projects" className="block">
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-300 transition-colors mb-2">
                          {p.attributes.title}
                        </h4>
                      </Link>
                      <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed line-clamp-2 mb-4">
                        {p.attributes.description}
                      </p>
                    </div>

                    {p.attributes.stats && (
                      <div className="pt-3 border-t border-slate-200 dark:border-white/10 text-xs">
                        <span className="text-slate-500 dark:text-slate-400 font-medium">
                          {p.attributes.stats}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Gateway 3: Capabilities Overview */}
        <section className="py-6">
          <div className="mb-8">
            <span className="text-xs uppercase tracking-widest font-bold text-purple-600 dark:text-purple-400">
              Core Disciplines
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
              Architectural Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link
                key={s.id}
                href="/services"
                className="glass-panel glass-panel-hover rounded-2xl p-7 flex flex-col justify-between block cursor-pointer group transition-all"
              >
                <div>
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{s.attributes.icon || "🏛️"}</div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors mb-2">
                    {s.attributes.title}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {s.attributes.description}
                  </p>
                </div>
              </Link>
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
            <Link href="/blog" className="hover:text-purple-600 dark:hover:text-white">Blogs</Link>
            <Link href="/testimonials" className="hover:text-purple-600 dark:hover:text-white">Reviews</Link>
            <Link href="/contact" className="hover:text-purple-600 dark:hover:text-white">Contact</Link>
          </div>

          <div className="flex items-center gap-5 text-xs font-semibold">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>Instagram</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <span>LinkedIn</span>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
              <span>Facebook</span>
            </a>
          </div>

          <p>© {new Date().getFullYear()} AURATECH Studio LLC.</p>
        </div>
      </footer>
    </div>
  );
}
