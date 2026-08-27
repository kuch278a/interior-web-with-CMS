import React from "react";
import Image from "next/image";
import Navbar from "../../components/ui/Navbar";
import Link from "next/link";
import { getBlogPosts } from "../../../cms/client";
import type { BlogPost } from "../../../cms/types";

export const metadata = {
  title: "Insights & Editorial — AURATECH Studio",
  description: "Architectural treatises, materiality essays, and vanguard design perspectives.",
};

export default async function BlogPage() {
  const postsRes = await getBlogPosts();
  const posts = postsRes?.data || [];
  const featured = posts[0];
  const restPosts = posts.slice(1);

  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-300">
      <Navbar />

      {/* Header */}
      <section className="relative pt-36 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="glow-orb-purple -top-10 left-1/4" />

        <div className="relative z-10">
          <span className="text-xs uppercase tracking-widest font-semibold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-3.5 py-1.5 rounded-full border border-purple-500/20">
            Editorial & Journal
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold mt-5 mb-6 text-slate-900 dark:text-white">
            Architectural <span className="text-gradient-accent">Perspectives</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Curated essays on spatial psychology, materiality innovation, circadian
            illumination, and the evolution of sustainable luxury.
          </p>
        </div>
      </section>

      {/* Main Magazine Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        {/* Featured Cover Story */}
        {featured && (
          <div className="mb-16 rounded-3xl glass-panel glass-panel-hover overflow-hidden border border-white/10 group grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto min-h-[320px] overflow-hidden bg-slate-900">
              <Image
                src={featured.attributes.coverImage}
                alt={featured.attributes.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-pink-600 text-white shadow-md">
                  Featured Cover Story
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-xs text-purple-600 dark:text-purple-400 font-semibold mb-3">
                  <span>{featured.attributes.publishedAt}</span>
                  <span>•</span>
                  <span>{featured.attributes.readTime}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors mb-4">
                  {featured.attributes.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  {featured.attributes.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">By Sebastian Croft, Principal</span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-600 dark:text-purple-400 group-hover:text-purple-500">
                  Read Essay →
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restPosts.map((post: { id: number; attributes: BlogPost }) => (
            <article
              key={post.id}
              className="glass-panel glass-panel-hover rounded-3xl overflow-hidden flex flex-col border border-slate-200 dark:border-white/10 group"
            >
              <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                <Image
                  src={post.attributes.coverImage}
                  alt={post.attributes.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 z-10">
                  <span className="px-2.5 py-1 text-xs font-semibold rounded bg-black/60 backdrop-blur-md text-purple-300 border border-white/10">
                    {post.attributes.readTime}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{post.attributes.publishedAt}</span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors mt-2 mb-3">
                    {post.attributes.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-3 mb-6">
                    {post.attributes.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Editorial Staff</span>
                  <span className="font-semibold text-purple-600 dark:text-purple-400 group-hover:text-purple-500 flex items-center gap-1">
                    Read Article →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Dispatch Box */}
        <div className="mt-20 glass-panel border border-purple-500/30 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">
              The Architectural Dispatch
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2 mb-4">
              Receive Our Quarterly Spatial Journal
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm mb-8">
              A private digest of unreleased studio case studies, material catalogs, and design treatises.
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address..."
                  className="w-full px-5 py-3 rounded-full bg-black/5 dark:bg-slate-900 border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-purple-500 shadow-inner"
                />
                <Link
                  href="/contact"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold shrink-0 text-center"
                >
                  Subscribe
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
