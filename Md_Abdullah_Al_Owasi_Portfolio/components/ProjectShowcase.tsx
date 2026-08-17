"use client";

import { ArrowUpRight, Download, Filter, ShieldCheck } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { projects, type Project } from "@/data/portfolio";
import siteCopy from "@/data/site-copy.json";
import Modal from "./Modal";
import TiltCard from "./TiltCard";
import { ScrollFocusSection, SideSlideCard } from "./ScrollFocusSection";

const filters = ["All", "GRC & Compliance", "AI Governance", "TPRM & Risk"] as const;

/**
 * PROJECT SYSTEMS
 * ===============
 * The filtering logic is unchanged, but the cards now use the shared scroll-focus
 * system. Because transforms do not affect layout, filtering can still use Motion's
 * layout animation without causing page-width overflow or CLS.
 */
export default function ProjectShowcase() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const visible = useMemo(() => filter === "All" ? projects : projects.filter((project) => project.category === filter), [filter]);

  return (
    <ScrollFocusSection id="projects" eyebrow={siteCopy.projects.eyebrow} title={siteCopy.projects.title} copy={siteCopy.projects.body} contentClassName="space-y-7">
      <SideSlideCard index={0} side="left">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 inline-flex items-center gap-2 text-xs text-slate-600"><Filter size={13} /> Filter</span>
          {filters.map((item) => (
            <button key={item} type="button" onClick={() => setFilter(item)} aria-pressed={filter === item} className={`rounded-full border px-3.5 py-2 text-xs transition ${filter === item ? "border-emerald-300/20 bg-emerald-300/[0.07] text-emerald-100" : "border-white/[0.08] bg-white/[0.025] text-slate-500 hover:text-white"}`}>{item}</button>
          ))}
        </div>
      </SideSlideCard>

      <motion.div layout className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project, index) => (
            <SideSlideCard key={project.id} index={index + 1} side="alternate" className="h-full">
              <motion.div layout className="h-full">
                <TiltCard className="h-full">
                  <button type="button" onClick={() => setSelected(project)} className="project-card group relative flex h-full min-h-[350px] w-full flex-col overflow-hidden rounded-[1.8rem] p-6 text-left sm:p-7">
                    <div className="project-card-glow" aria-hidden="true" />
                    <div className="relative flex items-start justify-between gap-5">
                      <div><p className="type-label text-[9px] text-emerald-300">{project.eyebrow}</p><p className="mt-2 text-xs text-slate-600">{project.category}</p></div>
                      <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/[0.09] bg-black/15 text-slate-400 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:bg-white group-hover:text-black"><ArrowUpRight size={16} /></span>
                    </div>
                    <div className="relative mt-auto pt-16">
                      {project.featured ? <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-300/15 bg-emerald-300/[0.045] px-2.5 py-1 type-label text-[9px] text-emerald-200"><ShieldCheck size={11} /> Executive evidence</span> : null}
                      <h3 className="text-2xl font-semibold text-white sm:text-[1.72rem]">{project.shortTitle}</h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">{project.outcome}</p>
                      <div className="mt-6 flex flex-wrap gap-1.5">{project.frameworks.slice(0, 3).map((framework) => <span key={framework} className="rounded-full border border-white/[0.075] bg-white/[0.025] px-2.5 py-1 text-[9px] text-slate-500">{framework}</span>)}</div>
                    </div>
                  </button>
                </TiltCard>
              </motion.div>
            </SideSlideCard>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>{selected ? (
        <Modal title={selected.title} onClose={() => setSelected(null)}>
          <p className="mt-5 type-label text-[10px] text-emerald-300">{selected.category} · {selected.eyebrow}</p>
          <p className="mt-5 text-lg leading-8 text-slate-300">{selected.detail}</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">{selected.metrics.map((metric) => <div key={metric.label} className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4"><p className="type-data text-2xl font-semibold text-white">{metric.value}</p><p className="mt-1 text-[10px] text-slate-600">{metric.label}</p></div>)}</div>
          <div className="mt-6 flex flex-wrap gap-2">{selected.frameworks.map((framework) => <span key={framework} className="rounded-full border border-white/[0.09] bg-white/[0.035] px-3 py-1.5 text-xs text-slate-300">{framework}</span>)}</div>
          <div className="mt-8 flex flex-wrap gap-3">
            {selected.artifact ? <a href={selected.artifact} target="_blank" rel="noopener noreferrer" className="magnetic-button inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-bold text-[#07110f]"><Download size={14} /> {selected.artifactLabel ?? "Open artifact"}</a> : null}
            {selected.source ? <a href={selected.source} target="_blank" rel="noreferrer" className="magnetic-button inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2.5 text-xs font-medium text-white">Primary source <ArrowUpRight size={14} /></a> : null}
          </div>
        </Modal>
      ) : null}</AnimatePresence>
    </ScrollFocusSection>
  );
}
