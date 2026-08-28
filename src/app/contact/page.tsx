"use client";

import React, { useState } from "react";
import Navbar from "../../components/ui/Navbar";

interface OfficeItem {
  city: string;
  address: string;
  postal: string;
  phone: string;
  email: string;
}

const OFFICES: OfficeItem[] = [
  {
    city: "New York",
    address: "548 W 22nd Street, Chelsea Arts District",
    postal: "New York, NY 10011",
    phone: "+1 (212) 555-0198",
    email: "ny@auratech-studio.design"
  },
  {
    city: "Kyoto",
    address: "Higashiyama-ku, Sanjo-dori 12",
    postal: "Kyoto 605-0001, Japan",
    phone: "+81 75 555 0142",
    email: "kyoto@auratech-studio.design"
  },
  {
    city: "London",
    address: "18 Berkeley Square, Mayfair",
    postal: "London W1J 6BQ, UK",
    phone: "+44 20 7946 0912",
    email: "london@auratech-studio.design"
  },
  {
    city: "Zurich",
    address: "Bahnhofstrasse 45",
    postal: "8001 Zürich, Switzerland",
    phone: "+41 44 211 8840",
    email: "zurich@auratech-studio.design"
  }
];

export default function ContactPage() {
  const [projectType, setProjectType] = useState("Private Residence");
  const [budget, setBudget] = useState("$500k - $1M");
  const [submitted, setSubmitted] = useState(false);
  const [company, setCompany] = useState({
    companyName: "AURATECH Studio LLC",
    phone: "+1 (212) 555-0198",
    email: "concierge@auratech-studio.design",
    address: "548 W 22nd Street, Chelsea Arts District",
    city: "New York",
    postal: "New York, NY 10011",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    facebook: "https://facebook.com",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    message: ""
  });

  React.useEffect(() => {
    fetch("/api/cms")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.company) {
          setCompany(data.company);
        }
      })
      .catch(() => {});
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-300">
      <Navbar />

      {/* Header */}
      <section className="relative pt-36 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="glow-orb-purple -top-10 right-1/3" />
        <div className="glow-orb-pink top-40 left-1/4" />

        <div className="relative z-10">
          <span className="text-xs uppercase tracking-widest font-semibold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-3.5 py-1.5 rounded-full border border-purple-500/20">
            Private Commissions
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold mt-5 mb-6 text-slate-900 dark:text-white">
            Studio <span className="text-gradient-accent">Concierge</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Begin your architectural collaboration. Every inquiry is reviewed directly
            by our founding partners under strict confidentiality.
          </p>
        </div>
      </section>

      {/* Main Grid: Form + Office Locations */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Booking Form */}
          <div className="lg:col-span-7 glass-panel border border-slate-200 dark:border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl">
            {submitted ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-3xl mx-auto mb-6">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  Discovery Request Received
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-slate-900 dark:text-white font-semibold">{formData.name || "Client"}</span>. Our principal partner will review your project parameters and contact you within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-8 px-6 py-2.5 rounded-full glass-panel text-xs text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Project Classification Pills */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-3">
                    1. Project Scope & Classification
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Private Residence",
                      "Commercial & Office",
                      "Hospitality & Spa",
                      "Custom Penthouse",
                      "Sustainable Architecture"
                    ].map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setProjectType(type)}
                        className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                          projectType === type
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md scale-105"
                            : "glass-panel text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Investment Range */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-3">
                    2. Planned Investment Bracket
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {["$250k - $500k", "$500k - $1M", "$1M - $3M", "$3M+"].map((b) => (
                      <button
                        type="button"
                        key={b}
                        onClick={() => setBudget(b)}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold text-center transition-all cursor-pointer ${
                          budget === b
                            ? "bg-purple-600 text-white shadow-md"
                            : "glass-panel text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="space-y-4">
                  <label className="block text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                    3. Contact Details
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name *"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        placeholder="Email Address *"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="tel"
                        placeholder="Phone Number (Optional)"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Project Site City / Country *"
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your spatial vision, timeline goals, and special architectural requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 text-white font-bold text-sm shadow-xl shadow-purple-500/25 hover:scale-[1.01] transition-transform cursor-pointer"
                >
                  Submit Confidential Discovery Request
                </button>
              </form>
            )}
          </div>

          {/* Global Studio Directory */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel border border-slate-200 dark:border-white/10 rounded-3xl p-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Direct Studio Dispatch</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs mb-6 leading-relaxed">
                For urgent editorial, press, or partner commissions:
              </p>
              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">Direct Line:</span>
                  <span className="text-slate-900 dark:text-white font-mono">{company.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">Studio Desk:</span>
                  <span className="text-slate-900 dark:text-white">{company.email}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">Encrypted Line:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono">Signal / Wire Available</span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-3">
                  Follow & Connect
                </span>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <a
                    href={company.instagram || "https://instagram.com"}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-purple-600/15 hover:text-purple-600 dark:hover:text-purple-300 text-center font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span>Instagram</span>
                  </a>
                  <a
                    href={company.linkedin || "https://linkedin.com"}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-purple-600/15 hover:text-purple-600 dark:hover:text-purple-300 text-center font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={company.facebook || "https://facebook.com"}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-purple-600/15 hover:text-purple-600 dark:hover:text-purple-300 text-center font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                    </svg>
                    <span>Facebook</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Offices List */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-2">
                Global Studio Ateliers
              </h4>
              {OFFICES.map((office: OfficeItem) => (
                <div
                  key={office.city}
                  className="glass-panel glass-panel-hover rounded-2xl p-5 border border-slate-200 dark:border-white/10"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900 dark:text-white text-base">{office.city}</span>
                    <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                      Atelier
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-xs">{office.address}</p>
                  <p className="text-slate-500 text-xs">{office.postal}</p>
                  <div className="mt-3 pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span>{office.phone}</span>
                    <span className="text-purple-600 dark:text-purple-400 font-medium">{office.email}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
