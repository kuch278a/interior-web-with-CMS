"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../../components/ui/Navbar";
import Link from "next/link";
import Image from "next/image";
import type {
  Project,
  BlogPost,
  Testimonial,
  HomepageSettings,
  MetricItem,
  CMSStore,
} from "../../../cms/types";

export default function CMSAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [activeTab, setActiveTab] = useState("homepage");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // Store state
  const [homepage, setHomepage] = useState<HomepageSettings>({
    badgeText: "World Architecture Award Winner 2026",
    heroTitlePrefix: "Transforming Spaces into",
    heroTitleAccent: "Timeless Masterpieces",
    heroSubtitle:
      "We combine structural architectural precision, organic materiality, and circadian ambient illumination to craft bespoke physical sanctuaries.",
    ctaPrimaryText: "Explore Portfolio",
    ctaSecondaryText: "Capabilities & Process",
    metrics: [
      { value: "140+", label: "Landmarks Built" },
      { value: "18", label: "Design Awards" },
      { value: "99.4%", label: "Satisfaction" },
      { value: "12 yrs", label: "Studio Excellence" },
    ],
    featuredProjectId: 1,
  });

  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  // New item modal form state
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Residential");
  const [newLocation, setNewLocation] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // Check auth & fetch live store on mount
  useEffect(() => {
    const isAuth = localStorage.getItem("auratech_cms_auth") === "true";
    setIsAuthenticated(isAuth);
    setUserEmail(localStorage.getItem("auratech_cms_user") || "admin@auratech.design");

    fetchStore();
  }, []);

  const fetchStore = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/cms");
      if (res.ok) {
        const data = (await res.json()) as CMSStore;
        if (data.homepage) setHomepage(data.homepage);
        if (data.projects) setProjects(data.projects);
        if (data.blogPosts) setBlogs(data.blogPosts);
        if (data.testimonials) setTestimonials(data.testimonials);
      }
    } catch (e) {
      console.error("Failed to load store", e);
    } finally {
      setLoading(false);
    }
  };

  const persistUpdate = async (updates: Partial<CMSStore>, successMsg = "Changes saved to live main page!") => {
    setSaving(true);
    setSaveMessage("");
    try {
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        setSaveMessage(`✓ ${successMsg}`);
        setTimeout(() => setSaveMessage(""), 4000);
      }
    } catch {
      setSaveMessage("Error saving changes.");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveHomepage = (e: React.FormEvent) => {
    e.preventDefault();
    persistUpdate({ homepage }, "Main page settings updated successfully!");
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle) {
      const newItem: Project = {
        id: Date.now(),
        title: newTitle,
        category: newCategory,
        location: newLocation || "Global Commission",
        status: "Published",
        stats: "Bespoke Specification",
        description:
          newDescription ||
          "Custom architectural execution featuring bespoke materiality and circadian lighting design.",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        hoverImage:
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        tags: [newCategory, "Custom Design"],
      };
      const updatedProjects = [newItem, ...projects];
      setProjects(updatedProjects);
      persistUpdate({ projects: updatedProjects }, "New project created and published!");
      setNewTitle("");
      setNewLocation("");
      setNewDescription("");
      setShowModal(false);
    }
  };

  const handleDeleteProject = (id: number) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    persistUpdate({ projects: updated }, "Project removed from store.");
  };

  const toggleStatus = (id: number) => {
    const updated = projects.map((p) =>
      p.id === id
        ? { ...p, status: p.status === "Published" ? "Draft" : "Published" }
        : p
    );
    setProjects(updated);
    persistUpdate({ projects: updated }, "Project status updated.");
  };

  const handleSignOut = () => {
    localStorage.removeItem("auratech_cms_auth");
    localStorage.removeItem("auratech_cms_user");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated && !loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] flex flex-col justify-between">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 pt-32 pb-16">
          <div className="max-w-md w-full glass-panel border border-slate-200 dark:border-white/10 rounded-3xl p-8 text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Access Restricted</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
              Please authenticate to access the CMS Control Plane.
            </p>
            <Link
              href="/admin/login"
              className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm shadow-md"
            >
              Go to Login →
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-300">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                Headless CMS Control Plane
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
              Studio Content Manager
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Edit the live main page, manage portfolio projects, articles, and reviews.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="px-3.5 py-2 rounded-xl glass-panel text-xs text-purple-600 dark:text-purple-400 font-semibold hover:underline flex items-center gap-1.5"
            >
              <span>View Live Main Page</span>
              <span>↗</span>
            </Link>
            <div className="px-3.5 py-2 rounded-xl glass-panel text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{userEmail}</span>
            </div>
            <button
              onClick={() => setShowModal(true)}
              type="button"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold shadow-md hover:scale-105 transition-transform cursor-pointer"
            >
              + Create Entry
            </button>
            <Link
              href="/admin/login"
              onClick={handleSignOut}
              className="px-3.5 py-2 rounded-xl glass-panel text-xs text-slate-700 dark:text-slate-300 hover:text-rose-500 font-medium"
            >
              Sign Out
            </Link>
          </div>
        </div>

        {/* Global Save Feedback Alert */}
        {saveMessage && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center justify-between animate-fadeIn">
            <span>{saveMessage}</span>
            <Link href="/" target="_blank" className="underline hover:opacity-80">
              Open Main Page to Verify ↗
            </Link>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mt-6">
          {[
            { id: "homepage", label: "🏠 Main Page Editor" },
            { id: "projects", label: "📁 Projects", count: projects.length },
            { id: "blogs", label: "📝 Blog Posts", count: blogs.length },
            { id: "testimonials", label: "⭐ Testimonials", count: testimonials.length },
            { id: "schemas", label: "⚙️ Content Models & API" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-purple-600 text-white shadow-md"
                  : "glass-panel text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white"
              }`}
            >
              {tab.label}{" "}
              {tab.count !== undefined && (
                <span className="opacity-70 ml-1">({tab.count})</span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        {/* ================= HOMEPAGE SETTINGS TAB ================= */}
        {activeTab === "homepage" && (
          <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-white/10 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-200 dark:border-white/10 gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Main Page Content & Hero Controls
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                  Changes made here update the live headline, copy, metrics, and featured project on the main page.
                </p>
              </div>
              <button
                onClick={handleSaveHomepage}
                disabled={saving}
                type="button"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold shadow-lg shadow-purple-500/25 hover:scale-105 transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2"
              >
                {saving ? "Saving..." : "💾 Publish to Live Main Page"}
              </button>
            </div>

            <form onSubmit={handleSaveHomepage} className="space-y-6">
              {/* Badge & Featured Project Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                    Hero Status Pill / Award Badge
                  </label>
                  <input
                    type="text"
                    value={homepage.badgeText}
                    onChange={(e) =>
                      setHomepage({ ...homepage, badgeText: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                    Featured Spotlight Project on Main Page
                  </label>
                  <select
                    value={homepage.featuredProjectId}
                    onChange={(e) =>
                      setHomepage({
                        ...homepage,
                        featuredProjectId: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-slate-800 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-purple-500"
                  >
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title} ({p.category} - {p.location})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Hero Headline Parts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                    Hero Headline Prefix
                  </label>
                  <input
                    type="text"
                    value={homepage.heroTitlePrefix}
                    onChange={(e) =>
                      setHomepage({
                        ...homepage,
                        heroTitlePrefix: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                    Hero Headline Accent (Gradient Text)
                  </label>
                  <input
                    type="text"
                    value={homepage.heroTitleAccent}
                    onChange={(e) =>
                      setHomepage({
                        ...homepage,
                        heroTitleAccent: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                  Hero Paragraph / Subtitle
                </label>
                <textarea
                  rows={3}
                  value={homepage.heroSubtitle}
                  onChange={(e) =>
                    setHomepage({ ...homepage, heroSubtitle: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Metric Counters */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wider">
                  Main Page Key Studio Metrics (4 Highlights)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {homepage.metrics?.map((m: MetricItem, idx: number) => (
                    <div key={idx} className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                      <input
                        type="text"
                        value={m.value}
                        onChange={(e) => {
                          const copy = [...homepage.metrics];
                          copy[idx] = { ...copy[idx], value: e.target.value };
                          setHomepage({ ...homepage, metrics: copy });
                        }}
                        className="w-full font-bold text-lg text-purple-600 dark:text-purple-400 bg-transparent border-b border-purple-500/30 pb-1 mb-1 focus:outline-none"
                      />
                      <input
                        type="text"
                        value={m.label}
                        onChange={(e) => {
                          const copy = [...homepage.metrics];
                          copy[idx] = { ...copy[idx], label: e.target.value };
                          setHomepage({ ...homepage, metrics: copy });
                        }}
                        className="w-full text-xs text-slate-600 dark:text-slate-400 bg-transparent focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 text-white text-sm font-bold shadow-xl shadow-purple-500/25 hover:scale-[1.01] transition-transform cursor-pointer"
                >
                  {saving ? "Publishing Updates..." : "Save & Update Live Main Page"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ================= PROJECTS TAB ================= */}
        {activeTab === "projects" && (
          <div className="glass-panel rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg">
            <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Portfolio Projects ({projects.length} Total)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Projects saved here reflect immediately on both the main page and the /projects portfolio page.
                </p>
              </div>
              <button
                onClick={() => setShowModal(true)}
                type="button"
                className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold"
              >
                + New Project
              </button>
            </div>

            <div className="divide-y divide-slate-200 dark:divide-white/10">
              {projects.map((p) => (
                <div
                  key={p.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 shrink-0">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                          {p.title}
                        </h4>
                        {homepage.featuredProjectId === p.id && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/30">
                            ★ Main Page Featured
                          </span>
                        )}
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            p.status === "Published"
                              ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                              : "bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                          }`}
                        >
                          {p.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {p.category} • {p.location} • {p.stats}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <button
                      onClick={() => {
                        setHomepage({ ...homepage, featuredProjectId: p.id });
                        persistUpdate(
                          { homepage: { ...homepage, featuredProjectId: p.id } },
                          `"${p.title}" set as Main Page Featured Project!`
                        );
                      }}
                      type="button"
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                        homepage.featuredProjectId === p.id
                          ? "bg-purple-600 text-white"
                          : "glass-panel text-slate-700 dark:text-slate-300 hover:text-purple-600"
                      }`}
                    >
                      {homepage.featuredProjectId === p.id ? "Featured ★" : "Set as Featured"}
                    </button>
                    <button
                      onClick={() => toggleStatus(p.id)}
                      type="button"
                      className="px-3 py-1.5 rounded-lg glass-panel text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white font-medium cursor-pointer"
                    >
                      {p.status === "Published" ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      onClick={() => handleDeleteProject(p.id)}
                      type="button"
                      className="px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 font-medium cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= BLOGS TAB ================= */}
        {activeTab === "blogs" && (
          <div className="glass-panel rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg">
            <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Editorial Articles (`/api/blog-posts`)
              </h3>
              <Link
                href="/blog"
                target="_blank"
                className="text-xs text-purple-600 dark:text-purple-400 font-semibold hover:underline"
              >
                View Live Blog ↗
              </Link>
            </div>

            <div className="divide-y divide-slate-200 dark:divide-white/10">
              {blogs.map((b) => (
                <div
                  key={b.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                      {b.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Slug: <span className="font-mono">{b.slug}</span> • Author: {b.author} • {b.publishedAt}
                    </p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 w-fit">
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TESTIMONIALS TAB ================= */}
        {activeTab === "testimonials" && (
          <div className="glass-panel rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg">
            <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Client Reviews (`/api/testimonials`)
              </h3>
              <Link
                href="/testimonials"
                target="_blank"
                className="text-xs text-purple-600 dark:text-purple-400 font-semibold hover:underline"
              >
                View Wall of Love ↗
              </Link>
            </div>

            <div className="divide-y divide-slate-200 dark:divide-white/10">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                        {t.author}
                      </h4>
                      <div className="text-amber-400 text-xs">{"★".repeat(t.rating)}</div>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {t.role}
                    </p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/30 w-fit">
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= SCHEMAS & API TAB ================= */}
        {activeTab === "schemas" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel rounded-2xl p-6 border border-slate-200 dark:border-white/10">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider mb-4 text-purple-600 dark:text-purple-400">
                Defined Strapi Schema Models
              </h3>
              <ul className="space-y-3 text-xs">
                <li className="p-3 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-between font-mono">
                  <span>cms/models/project.json</span>
                  <span className="text-emerald-500 font-bold">✓ Ready</span>
                </li>
                <li className="p-3 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-between font-mono">
                  <span>cms/models/services.json</span>
                  <span className="text-emerald-500 font-bold">✓ Ready</span>
                </li>
                <li className="p-3 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-between font-mono">
                  <span>cms/models/blog-post.json</span>
                  <span className="text-emerald-500 font-bold">✓ Ready</span>
                </li>
                <li className="p-3 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-between font-mono">
                  <span>cms/models/team-member.json</span>
                  <span className="text-emerald-500 font-bold">✓ Ready</span>
                </li>
                <li className="p-3 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-between font-mono">
                  <span>cms/models/testimonial.json</span>
                  <span className="text-emerald-500 font-bold">✓ Ready</span>
                </li>
              </ul>
            </div>

            <div className="glass-panel rounded-2xl p-6 border border-slate-200 dark:border-white/10">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider mb-4 text-purple-600 dark:text-purple-400">
                API & Live Data Synchronization
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5">
                  <span className="text-slate-400">API Endpoint:</span>
                  <p className="font-mono text-slate-900 dark:text-white font-bold mt-1">
                    /api/cms (Persistent JSON Store & Live Next.js Route)
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5">
                  <span className="text-slate-400">Main Page Sync:</span>
                  <p className="text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                    Direct real-time binding between Admin & Homepage
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5">
                  <span className="text-slate-400">Local Store File:</span>
                  <p className="font-mono text-slate-900 dark:text-white mt-1">
                    cms/data/store.json
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* CREATE NEW PROJECT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg glass-panel rounded-3xl p-8 border border-white/20 shadow-2xl bg-[var(--bg-color)]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Create New Project Entry
              </h3>
              <button
                onClick={() => setShowModal(false)}
                type="button"
                className="text-slate-400 hover:text-black dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Lumina Sky Villa"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-slate-800 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Hospitality">Hospitality</option>
                    <option value="Sustainable">Sustainable</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Location / City
                  </label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="e.g. Zurich, Switzerland"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Brief architectural highlights..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl glass-panel text-slate-700 dark:text-slate-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold cursor-pointer"
                >
                  Save & Publish Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
