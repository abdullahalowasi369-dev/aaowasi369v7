"use client";

import { ArrowUpRight, CheckCircle2, FileCheck, Shield } from "lucide-react";
import siteCopy from "@/data/site-copy.json";
import { ScrollFocusSection, SideSlideCard } from "./ScrollFocusSection";

/**
 * FRAMEWORK DEPTH
 * ===============
 * Each card links to a primary source and explains how that source changes the
 * operating architecture. Framework familiarity is never presented as a
 * certification, audit opinion or employer/client delivery claim.
 */
const frameworksData = [
  {
    name: "NIST AI RMF 1.0",
    category: "AI risk management",
    status: "Core operating lens",
    description: "Govern, Map, Measure and Manage provide the primary risk lifecycle used across the AI inventory, oversight, evaluation and monitoring architecture.",
    href: "https://www.nist.gov/itl/ai-risk-management-framework",
    controls: ["Govern", "Map", "Measure", "Manage"],
  },
  {
    name: "ISO/IEC 27001:2022",
    category: "Information security",
    status: "Control architecture",
    description: "ISMS requirements inform risk treatment, accountable control ownership, evidence structure and the relationship between governance intent and operating proof.",
    href: "https://www.iso.org/standard/27001",
    controls: ["ISMS context", "Risk treatment", "Annex A"],
  },
  {
    name: "AICPA Trust Services Criteria",
    category: "SOC 2 assurance",
    status: "Assurance criteria",
    description: "Security, availability, processing integrity, confidentiality and privacy criteria inform control-and-evidence structures used in customer assurance and audit operations.",
    href: "https://www.aicpa-cima.com/resources/download/2017-trust-services-criteria-with-revised-points-of-focus-2022",
    controls: ["Common criteria", "Logical access", "Change management"],
  },
  {
    name: "EU AI Act · Article 50",
    category: "AI transparency",
    status: "Applicable from 2 Aug 2026",
    description: "Provider and deployer transparency obligations are translated into applicability, interaction disclosure, synthetic-content marking and communication decisions for relevant AI use cases.",
    href: "https://digital-strategy.ec.europa.eu/en/library/guidelines-transparency-obligations-providers-and-deployers-ai-systems",
    controls: ["Interaction disclosure", "Content marking", "Deployer notice"],
  },
  {
    name: "GDPR · Article 28",
    category: "Processor governance",
    status: "Third-party control lens",
    description: "Processor and subprocessor obligations drive DPA evidence requests, assistance duties, deletion/return controls, audit rights and vendor-governance decision points.",
    href: "https://eur-lex.europa.eu/eli/reg/2016/679/oj",
    controls: ["Documented instructions", "Subprocessors", "Audit & deletion"],
  },
  {
    name: "ISO/IEC 42001:2023",
    category: "AI management system",
    status: "AI management lens",
    description: "AI management-system requirements inform accountability, risk/opportunity management, governance structure and continual-improvement patterns across the AI operating model.",
    href: "https://www.iso.org/standard/42001",
    controls: ["AI policy", "Accountability", "Continual improvement"],
  },
] as const;

export default function Frameworks() {
  return (
    <ScrollFocusSection id="frameworks" eyebrow={siteCopy.frameworks.eyebrow} title={siteCopy.frameworks.title} copy={siteCopy.frameworks.body} contentClassName="space-y-7">
      <SideSlideCard index={0} side="left">
        <div className="flex flex-col justify-between gap-3 rounded-2xl border border-white/10 bg-slate-950 p-4 text-xs sm:flex-row sm:items-center sm:p-5">
          <div className="flex items-start gap-2 text-slate-300 sm:items-center"><FileCheck size={16} className="mt-0.5 shrink-0 text-emerald-400 sm:mt-0" /><span className="font-medium leading-relaxed">{siteCopy.frameworks.sourceNote}</span></div>
          <span className="w-fit rounded-full border border-emerald-500/20 bg-emerald-950/50 px-3 py-1 type-label text-[10px] text-emerald-400">Source-linked</span>
        </div>
      </SideSlideCard>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
        {frameworksData.map((framework, index) => (
          <SideSlideCard key={framework.name} index={index + 1} className="h-full">
            <a href={framework.href} target="_blank" rel="noopener noreferrer" className="group relative flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-slate-950 p-5 transition-all duration-300 hover:border-emerald-400/40 hover:bg-white/[0.02] hover:shadow-[0_0_25px_rgba(52,211,153,0.12)] sm:rounded-3xl sm:p-7">
              <div>
                <div className="flex items-center justify-between gap-2 border-b border-white/[0.08] pb-4">
                  <div className="flex items-center gap-2"><Shield size={16} className="shrink-0 text-emerald-400" /><span className="type-label text-[10px] font-semibold text-slate-400">{framework.category}</span></div>
                  <div className="rounded-lg bg-white/[0.04] p-1.5 text-slate-400 transition-colors group-hover:bg-emerald-400/10 group-hover:text-emerald-400"><ArrowUpRight size={16} /></div>
                </div>
                <div className="mt-4">
                  <div className="mb-2 inline-block rounded-md bg-emerald-400/10 px-2.5 py-1 type-label text-[10px] font-semibold text-emerald-400">{framework.status}</div>
                  <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-emerald-300 sm:text-xl">{framework.name}</h3>
                  <p className="mt-2 break-words text-xs leading-relaxed text-slate-400 sm:text-sm">{framework.description}</p>
                </div>
              </div>
              <div className="mt-6 border-t border-white/[0.08] pt-4">
                <p className="mb-2.5 type-label text-[9px] font-semibold text-slate-500">Applied in the architecture</p>
                <div className="flex flex-wrap gap-1.5">{framework.controls.map((control) => <span key={control} className="inline-flex items-center gap-1 rounded-md border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-[10px] text-slate-300"><CheckCircle2 size={10} className="shrink-0 text-emerald-400" /><span>{control}</span></span>)}</div>
              </div>
            </a>
          </SideSlideCard>
        ))}
      </div>
    </ScrollFocusSection>
  );
}
