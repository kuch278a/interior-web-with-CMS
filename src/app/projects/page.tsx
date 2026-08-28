"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../../components/ui/Navbar";
import Link from "next/link";
import type { Project, CMSStore } from "../../../cms/types";

const INITIAL_PROJECTS: Project[] = [
  {
    id: 1,
    title: "Aura Luxury Penthouse",
    category: "Residential",
    location: "Tribeca, New York",
    year: "2026",
    area: "4,200 sq ft",
    timeline: "9 Months",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    description: "A complete structural reimagination of a duplex penthouse overlooking the Hudson River. Custom Calacatta marble hearth, hidden acoustic wood paneling, and a private glass conservatory.",
    highlights: ["Custom Italian Calacatta Marble", "Circadian Architectural Lighting", "Invisible B&O Acoustic Engineering", "Private Rooftop Zen Garden"],
    tag: "Residential Landmark",
    status: "Published"
  },
  {
    id: 2,
    title: "Nexus Quantum Headquarters",
    category: "Commercial",
    location: "Palo Alto, California",
    year: "2025",
    area: "32,000 sq ft",
    timeline: "14 Months",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    description: "Designed for a frontier AI research institute. Modular collaboration pods, living moss acoustic baffles, and dynamic circadian lighting tuned for deep cognitive focus.",
    highlights: ["Biophilic Living Wall System", "Modular Kinetic Workspaces", "Sound-Isolated Quantum Lab Pods", "Zero-VOC Air Purification Flow"],
    tag: "Commercial Innovation",
    status: "Published"
  },
  {
    id: 3,
    title: "Elysian Onsen Retreat",
    category: "Hospitality",
    location: "Kyoto, Japan",
    year: "2026",
    area: "16,500 sq ft",
    timeline: "18 Months",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    description: "A harmonious synthesis of traditional Sukiya-zukuri wooden carpentry and contemporary minimalist hospitality. Natural thermal spring baths carved from single granite monoliths.",
    highlights: ["Hand-Carved Hinoki Wood", "Monolithic Basalt Baths", "Passive Geothermal Microclimate", "Tea Master Ceremony Pavilion"],
    tag: "Hospitality Sanctuary",
    status: "Published"
  },
  {
    id: 4,
    title: "Solaris Cliffside Pavilion",
    category: "Sustainable",
    location: "Big Sur, California",
    year: "2025",
    area: "5,800 sq ft",
    timeline: "12 Months",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    description: "Cantilevered over the Pacific ocean cliffs, this net-zero glass residence generates 140% of its energy needs through integrated photovoltaic roof shingles and coastal air capture.",
    highlights: ["Triple-Glazed Electrochromic Glass", "Tesla Powerwall 3 Microgrid", "Zero-Carbon Concrete Foundation", "Rainwater Recycling Cascade"],
    tag: "Sustainable Vision",
    status: "Published"
  },
  {
    id: 5,
    title: "The Alabaster Villa",
    category: "Residential",
    location: "Lake Como, Italy",
    year: "2025",
    area: "7,400 sq ft",
    timeline: "16 Months",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    description: "Restoration and ultra-modern extension of a 19th-century lakefront villa. Features a subterranean glass wine cellar and an infinity reflection pool mirroring the Alpine foothills.",
    highlights: ["Historic Fresco Preservation", "Subterranean Tasting Vault", "Infinity Edge Water Terrace", "Custom Bronze Framing"],
    tag: "Private Estate",
    status: "Published"
  },
  {
    id: 6,
    title: "Verve Flagship Gallery",
    category: "Commercial",
    location: "Mayfair, London",
    year: "2026",
    area: "8,200 sq ft",
    timeline: "8 Months",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    description: "An haute horlogerie and contemporary art gallery featuring seamless terrazzo flooring, custom brass display vitrines, and museum-grade optic lighting.",
    highlights: ["Museum-Grade Optic Lenses", "Seamless Cast Terrazzo", "Climate-Controlled Vaults", "VIP Private Viewing Lounge"],
    tag: "Haute Retail",
    status: "Published"
  }
];

const CATEGORIES = ["All", "Residential", "Commercial", "Hospitality", "Sustainable"];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);

  useEffect(() => {
    fetch("/api/cms")
      .then((res) => res.json())
      .then((data: CMSStore) => {
        if (data && data.projects && data.projects.length > 0) {
          // Merge CMS projects with default rich metadata
          const merged = data.projects.map((p) => {
            const match = INITIAL_PROJECTS.find((ip) => ip.id === p.id);
            return {
              ...p,
              year: p.year || match?.year || "2026",
              area: p.area || match?.area || p.stats || "Bespoke Size",
              timeline: p.timeline || match?.timeline || "Custom Schedule",
              highlights: p.highlights || match?.highlights || [
                "Bespoke Materiality",
                "Circadian Lighting Engineering",
                "Custom Millwork Fabrication",
              ],
              tag: p.tag || match?.tag || `${p.category} Landmark`,
            };
          });
          setProjects(merged);
        }
      })
      .catch(() => {
        // Fallback to initial projects
      });
  }, []);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-300">
      <Navbar />

      {/* Header */}
      <section className="relative pt-36 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="glow-orb-purple -top-10 left-1/4" />

        <div className="relative z-10">
          <span className="text-xs uppercase tracking-widest font-semibold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-3.5 py-1.5 rounded-full border border-purple-500/20">
            Selected Works
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold mt-5 mb-6 text-slate-900 dark:text-white">
            Architectural <span className="text-gradient-accent">Portfolio</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Explore our global commission archive spanning luxury penthouses, brutalist villas,
            biophilic corporate headquarters, and high-end hospitality sanctuaries.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25 scale-105"
                    : "glass-panel text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer rounded-3xl glass-panel glass-panel-hover overflow-hidden flex flex-col border border-slate-200 dark:border-white/10"
            >
              {/* Project Image */}
              <div className="relative h-72 w-full overflow-hidden bg-slate-900">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-100 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md text-purple-300 border border-white/10">
                    {project.tag || `${project.category} Commission`}
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 z-10">
                  <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-black/70 backdrop-blur-md text-slate-200 border border-white/10">
                    {project.location}
                  </span>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-3 mb-6">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>{project.area || project.stats}</span>
                  <span>{project.year || "2026"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Case Study Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel border border-white/20 rounded-3xl p-6 sm:p-10 shadow-2xl bg-[#0e1424]">
            <button
              onClick={() => setSelectedProject(null)}
              type="button"
              className="absolute top-6 right-6 p-2 rounded-full glass-panel text-slate-300 hover:text-white"
            >
              ✕
            </button>

            <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden mb-8">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 z-10">
                <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-purple-600 text-white shadow-lg">
                  {selectedProject.category}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl glass-panel mb-8 text-center text-xs">
              <div>
                <span className="text-slate-400">Location</span>
                <p className="font-bold text-white text-sm mt-1">{selectedProject.location}</p>
              </div>
              <div>
                <span className="text-slate-400">Total Area</span>
                <p className="font-bold text-white text-sm mt-1">{selectedProject.area}</p>
              </div>
              <div>
                <span className="text-slate-400">Timeline</span>
                <p className="font-bold text-white text-sm mt-1">{selectedProject.timeline}</p>
              </div>
              <div>
                <span className="text-slate-400">Year Completed</span>
                <p className="font-bold text-white text-sm mt-1">{selectedProject.year}</p>
              </div>
            </div>

            <h2 className="text-3xl font-extrabold text-white mb-4">{selectedProject.title}</h2>
            <p className="text-slate-300 text-base leading-relaxed mb-8">{selectedProject.description}</p>

            {selectedProject.highlights && selectedProject.highlights.length > 0 && (
              <>
                <h4 className="text-sm font-bold uppercase tracking-wider text-purple-400 mb-4">
                  Key Engineering & Architectural Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                  {selectedProject.highlights.map((h: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-200">
                      <span className="text-purple-400 font-bold">✓</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-6 border-t border-white/10">
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="w-full sm:w-auto px-6 py-3 rounded-full glass-panel text-slate-300 hover:text-white text-sm font-medium"
              >
                Close Case Study
              </button>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold shadow-lg shadow-purple-500/25 text-center"
              >
                Commission Similar Project
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
