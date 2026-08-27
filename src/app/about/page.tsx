import React from "react";
import Image from "next/image";
import Navbar from "../../components/ui/Navbar";
import { getTeamMembers } from "../../../cms/client";
import type { TeamMember } from "../../../cms/types";

export const metadata = {
  title: "Studio & Philosophy — AURATECH",
  description: "Learn about the ethos, architectural pedigree, and visionaries behind AURATECH Studio.",
};

interface AwardItem {
  year: string;
  title: string;
  category: string;
}

interface ValueItem {
  title: string;
  desc: string;
  icon: string;
}

const AWARDS: AwardItem[] = [
  { year: "2026", title: "World Architecture Festival Winner", category: "Global Residential Landmark" },
  { year: "2025", title: "Architectural Digest AD100", category: "Excellence in Interior Architecture" },
  { year: "2025", title: "Dezeen Award for Sustainability", category: "Eco-Luxury & Net-Zero Design" },
  { year: "2024", title: "Wallpaper* Design Awards", category: "Best Private Residence Global" },
];

const VALUES: ValueItem[] = [
  {
    title: "Material Honesty",
    desc: "We never fake materiality. Concrete is poured raw, stone is quarried authentic, and timber retains its grain, ageing gracefully across decades.",
    icon: "🪨"
  },
  {
    title: "Sculptural Illumination",
    desc: "Light is treated as a physical building material. We carve lightwells and sculpt shadow to guide mood and biological rhythm.",
    icon: "✨"
  },
  {
    title: "Quiet Monumentality",
    desc: "True luxury is quiet. We favor clean geometry, concealed mechanics, and uninterrupted vistas over superficial ornamentation.",
    icon: "🏛️"
  }
];

export default async function AboutPage() {
  const teamRes = await getTeamMembers();
  const team = teamRes?.data || [];

  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-300">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="glow-orb-purple -top-10 left-1/3" />
        <div className="glow-orb-blue bottom-10 right-1/4" />

        <div className="relative z-10">
          <span className="text-xs uppercase tracking-widest font-semibold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-3.5 py-1.5 rounded-full border border-purple-500/20">
            Ethos & Legacy
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold mt-5 mb-6 text-slate-900 dark:text-white">
            Architecture for the <span className="text-gradient-accent">Discerning</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Founded on the belief that physical spaces directly elevate human consciousness,
            our studio merges monumental form with bespoke tactile intimacy.
          </p>
        </div>
      </section>

      {/* Manifesto / Story */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="glass-panel border border-slate-200 dark:border-white/10 rounded-3xl p-8 sm:p-14 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-pink-600 dark:text-pink-400">
                Our Manifesto
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2 mb-6">
                Where Brutalism Meets Organic Sanctuary
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                We reject ephemeral trends in favor of timeless endurance. Every project
                embarks from an obsessive study of natural light, surrounding geography, and
                bespoke artisanal materiality.
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                By integrating structural engineering with custom furniture crafting, we
                eliminate the friction between exterior envelope and interior soul.
              </p>
            </div>
            <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                alt="Studio interior"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest font-semibold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
            Principles
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
            Our Architectural Pillars
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VALUES.map((v: ValueItem, i: number) => (
            <div
              key={i}
              className="glass-panel glass-panel-hover rounded-2xl p-8 border border-slate-200 dark:border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{v.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest font-semibold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
            Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
            Principals & Studio Partners
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member: { id: number; attributes: TeamMember }) => (
            <div
              key={member.id}
              className="glass-panel glass-panel-hover rounded-3xl p-8 text-center flex flex-col items-center border border-slate-200 dark:border-white/10"
            >
              <div className="relative w-36 h-36 mb-6 rounded-full overflow-hidden border-2 border-purple-500/40 shadow-xl">
                <Image
                  src={member.attributes.photo}
                  alt={member.attributes.name}
                  fill
                  sizes="144px"
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{member.attributes.name}</h3>
              <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-4">
                {member.attributes.role}
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{member.attributes.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Awards & Honors */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mb-24">
        <div className="glass-panel border border-slate-200 dark:border-white/10 rounded-3xl p-8 sm:p-12">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest font-semibold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
              Recognition
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-3">
              Awards & Global Accolades
            </h2>
          </div>

          <div className="divide-y divide-slate-200 dark:divide-white/10">
            {AWARDS.map((a: AwardItem, i: number) => (
              <div key={i} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold font-mono text-purple-600 dark:text-purple-400">{a.year}</span>
                  <span className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">{a.title}</span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">{a.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
