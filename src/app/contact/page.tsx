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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    message: ""
  });

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
                  <span className="text-slate-900 dark:text-white font-mono">+1 (212) 555-0198</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">Studio Desk:</span>
                  <span className="text-slate-900 dark:text-white">concierge@auratech-studio.design</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">Encrypted Line:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono">Signal / Wire Available</span>
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
