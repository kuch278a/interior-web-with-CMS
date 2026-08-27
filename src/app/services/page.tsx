"use client";

import React, { useState } from "react";
import Navbar from "../../components/ui/Navbar";
import Link from "next/link";

interface ServiceDetail {
  id: number;
  icon: string;
  title: string;
  description: string;
  deliverables: string[];
}

interface ProcessStep {
  step: string;
  phase: string;
  duration: string;
  description: string;
}

const SERVICES_DETAIL: ServiceDetail[] = [
  {
    id: 1,
    icon: "📐",
    title: "Architectural Space Planning & Structural Design",
    description: "Reconfiguring structural layouts to maximize natural daylighting, fluid circulation, and monumental volume. We handle load-bearing calculations, seismic bracing, and architectural submissions.",
    deliverables: ["2D Cad Layouts & Elevations", "Full 3D BIM Modeling", "Permit & Authority Approvals", "Structural Engineering Specs"]
  },
  {
    id: 2,
    icon: "🛋️",
    title: "Bespoke Millwork & Curated Materiality",
    description: "Tailor-made joinery crafted in our Northern Italian and Japanese artisan partner ateliers. Rare marble bookmatching, wire-brushed French oak, and hand-rubbed patinated bronzes.",
    deliverables: ["Custom Furniture Crafting", "Artisan Wood & Metalwork", "Rare Stone Sourcing & Quarry Selection", "Exclusive Textile Curation"]
  },
  {
    id: 3,
    icon: "💡",
    title: "Circadian Lighting & Sensory Acoustics",
    description: "Light transforms emotion. We design micro-recessed museum lighting that adapts automatically to natural sun cycles, paired with invisible behind-plaster acoustic dampening.",
    deliverables: ["Circadian Lighting Schedules", "Acoustic Reflection Simulation", "Invisible Multi-Room Hi-Fi", "Lutron HomeWorks Integration"]
  },
  {
    id: 4,
    icon: "🌿",
    title: "Biophilic Wellness & Eco-Engineering",
    description: "Healthy spaces nourish body and mind. Integrating indoor living botanical walls, multi-stage HEPA air scrubbers, and carbon-negative sustainable construction techniques.",
    deliverables: ["LEED / WELL Platinum Certification", "Automated Living Walls", "Zero-VOC Non-Toxic Finishes", "Geothermal Microclimates"]
  }
];

const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    phase: "Discovery & Spatial Vision",
    duration: "2 - 3 Weeks",
    description: "We conduct in-depth interviews to understand your lifestyle or organizational culture, analyze site topography, light angles, and establish project parameters."
  },
  {
    step: "02",
    phase: "3D Photorealistic Visualization & VR",
    duration: "4 - 6 Weeks",
    description: "Experience your future environment before a single wall is touched. We provide hyper-realistic 4K renders and immersive VR walk-throughs with actual material textures."
  },
  {
    step: "03",
    phase: "Artisan Material Procurement",
    duration: "6 - 8 Weeks",
    description: "We travel directly to quarries and ateliers across Tuscany, Kyoto, and Scandinavia to hand-select marble slabs, rare timbers, and custom architectural hardware."
  },
  {
    step: "04",
    phase: "White-Glove Turnkey Build & Styling",
    duration: "Variable",
    description: "Our master site managers oversee construction down to millimeter tolerances. We deliver the space fully furnished, styled with curated art, and ready for living."
  }
];

export default function ServicesPage() {
  // Interactive Spatial Estimator State
  const [projectType, setProjectType] = useState<"Residential" | "Commercial">("Residential");
  const [sqft, setSqft] = useState(3500);
  const [finishTier, setFinishTier] = useState<"Premium" | "Haute Luxury">("Haute Luxury");

  // Calculate estimated investment range
  const ratePerSqft =
    projectType === "Residential"
      ? finishTier === "Haute Luxury" ? 320 : 220
      : finishTier === "Haute Luxury" ? 280 : 180;

  const estimatedCost = (sqft * ratePerSqft).toLocaleString();
  const estimatedMonths = Math.round(6 + (sqft / 1000) * 1.5);

  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-300">
      <Navbar />

      {/* Header */}
      <section className="relative pt-36 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="glow-orb-purple -top-10 right-1/4" />
        <div className="glow-orb-pink top-32 left-1/4" />

        <div className="relative z-10">
          <span className="text-xs uppercase tracking-widest font-semibold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-3.5 py-1.5 rounded-full border border-purple-500/20">
            Capabilities & Methodology
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold mt-5 mb-6 text-slate-900 dark:text-white">
            Architecture Without <span className="text-gradient-accent">Compromise</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            From visionary master-planning to bespoke interior execution, explore our
            comprehensive architectural services and four-phase methodology.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES_DETAIL.map((service: ServiceDetail) => (
            <div
              key={service.id}
              className="glass-panel glass-panel-hover rounded-3xl p-8 sm:p-10 flex flex-col justify-between border border-slate-200 dark:border-white/10"
            >
              <div>
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{service.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-200 dark:border-white/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-3">
                  Core Deliverables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {service.deliverables.map((d: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Four-Phase Process Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
            Our Methodology
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-4 mb-4">
            The 4-Phase Journey
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            A transparent, highly disciplined architectural roadmap from inception to handover.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((step: ProcessStep) => (
            <div
              key={step.step}
              className="relative glass-panel rounded-2xl p-6 sm:p-7 border border-slate-200 dark:border-white/10 flex flex-col justify-between group hover:border-purple-500/40 transition-all duration-300"
            >
              <div>
                <div className="text-4xl font-extrabold text-purple-600/40 dark:text-purple-500/40 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-2 font-mono">
                  {step.step}
                </div>
                <div className="text-xs font-semibold text-pink-600 dark:text-pink-400 uppercase tracking-wider mb-2">
                  {step.duration}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{step.phase}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Spatial Estimator Widget */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="glass-panel border border-purple-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" />

          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest font-semibold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
              Interactive Tool
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
              Spatial Investment Estimator
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm mt-2">
              Estimate timeline and baseline turnkey investment parameters for your project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Project Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                Project Classification
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(["Residential", "Commercial"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setProjectType(t)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      projectType === t
                        ? "bg-purple-600 text-white shadow-md"
                        : "glass-panel text-slate-700 dark:text-slate-400 hover:text-black dark:hover:text-white"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Total Area Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Target Area
                </label>
                <span className="text-xs font-bold text-purple-600 dark:text-purple-300 font-mono">
                  {sqft.toLocaleString()} sq ft
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="20000"
                step="500"
                value={sqft}
                onChange={(e) => setSqft(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>

            {/* Finish Tier */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                Specification Tier
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(["Premium", "Haute Luxury"] as const).map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setFinishTier(tier)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      finishTier === tier
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md"
                        : "glass-panel text-slate-700 dark:text-slate-400 hover:text-black dark:hover:text-white"
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Output Display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 rounded-2xl bg-black/5 dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 text-center">
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Estimated Turnkey Investment
              </span>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1 text-gradient-accent">
                ${estimatedCost}
              </div>
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Projected Duration
              </span>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                ~{estimatedMonths} Months
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/contact"
              className="inline-block px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold shadow-lg shadow-purple-500/25 hover:scale-105 transition-transform"
            >
              Request Scoping Workshop →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
