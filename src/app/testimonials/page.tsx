import React from "react";
import Navbar from "../../components/ui/Navbar";
import TestimonialCard from "../../components/ui/TestimonialCard";
import Link from "next/link";
import { getTestimonials } from "../../../cms/client";
import type { Testimonial } from "../../../cms/types";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Client Endorsements & Reviews — AURATECH Studio",
  description: "Read verified reviews and experiences from private homeowners and corporate enterprise leaders.",
};

interface PressQuote {
  publication: string;
  quote: string;
  year: string;
}

const PRESS_QUOTES: PressQuote[] = [
  {
    publication: "Architectural Digest",
    quote: "AURATECH sets a new benchmark for warm brutalism and sensory modernism in private residences.",
    year: "2026",
  },
  {
    publication: "Dezeen",
    quote: "One of the world's most disciplined and boundary-pushing interior architecture studios today.",
    year: "2025",
  },
  {
    publication: "Wallpaper* Magazine",
    quote: "Masterful integration of circadian illumination and raw, enduring materiality.",
    year: "2025",
  },
];

export default async function TestimonialsPage() {
  const data = await getTestimonials();
  const testimonials = data?.data || [];

  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-300">
      <Navbar />

      {/* Header */}
      <section className="relative pt-36 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="glow-orb-purple -top-10 left-1/3" />

        <div className="relative z-10">
          <span className="text-xs uppercase tracking-widest font-semibold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-3.5 py-1.5 rounded-full border border-purple-500/20">
            Endorsements & Trust
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold mt-5 mb-6 text-slate-900 dark:text-white">
            Client <span className="text-gradient-accent">Wall of Love</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Read verified testimonials and reviews from private collectors, executives, and
            luxury property developers who entrusted us with their physical environments.
          </p>

          {/* Rating Summary Bar */}
          <div className="inline-flex items-center gap-6 mt-8 p-4 px-8 rounded-full glass-panel border border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white">4.98</span>
              <div className="flex text-amber-400 text-sm">★★★★★</div>
            </div>
            <div className="h-4 w-[1px] bg-slate-300 dark:bg-white/20" />
            <div className="text-xs text-slate-500 dark:text-slate-400 text-left">
              <span className="font-semibold text-slate-900 dark:text-white">100% Verified</span>
              <br />
              Client Satisfaction
            </div>
          </div>
        </div>
      </section>

      {/* Press Quotes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRESS_QUOTES.map((pq: PressQuote, i: number) => (
            <div
              key={i}
              className="glass-panel border border-purple-500/20 rounded-2xl p-6 flex flex-col justify-between"
            >
              <p className="text-slate-700 dark:text-slate-200 text-sm italic mb-4">&ldquo;{pq.quote}&rdquo;</p>
              <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-200 dark:border-white/10">
                <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  {pq.publication}
                </span>
                <span className="text-purple-600 dark:text-purple-400 font-mono">{pq.year}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t: { id: number; attributes: Testimonial }) => (
            <TestimonialCard
              key={t.id}
              author={t.attributes.author}
              role={t.attributes.role}
              content={t.attributes.content}
              rating={t.attributes.rating}
              avatar={t.attributes.avatar}
            />
          ))}
        </div>

        {/* CTA Card */}
        <div className="mt-20 glass-panel border border-purple-500/30 rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
            Experience the Transformation
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 max-w-xl mx-auto">
            Join our portfolio of visionary clients and create an architectural landmark.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold shadow-lg shadow-purple-500/25 hover:scale-105 transition-transform"
          >
            Schedule Discovery Session
          </Link>
        </div>
      </main>
    </div>
  );
}
