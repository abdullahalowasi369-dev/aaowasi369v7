"use client";

/**
 * FLAGSHIP ARCHITECTURE
 * =====================
 * Three risk surfaces share one operating discipline. The section preserves the
 * original evidence-table depth but adds an interactive visualization specific
 * to the active module: telemetry for assurance, a decision tree for TPRM, and
 * an AI risk/oversight matrix for AI governance.
 */

import { useState } from "react";
import { ArrowUpRight, CheckCircle2, Download, FileSpreadsheet, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { flagshipModules } from "@/data/portfolio";
import AIRiskHeatmap from "./AIRiskHeatmap";
import AssuranceTelemetryBar from "./AssuranceTelemetryBar";
import TPRMDecisionTree from "./TPRMDecisionTree";
import { ScrollFocusSection, SideSlideCard } from "./ScrollFocusSection";

export default function Flagship() {
  const [active, setActive] = useState(flagshipModules[0].id);
  const reduceMotion = useReducedMotion();
  const module = flagshipModules.find((item) => item.id === active) ?? flagshipModules[0];

  return (
    <ScrollFocusSection
      id="proof"
      eyebrow="Architecture"
      title="One evidence architecture. Three enterprise risk surfaces."
      copy="Customer assurance, third-party risk and AI governance are treated as connected operating problems. Each layer follows the same discipline: requirement → control → evidence → exception → residual risk → decision."
      contentClassName="space-y-5"
    >
      <SideSlideCard index={0} side="left">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 shadow-2xl">
          <div className="grid border-b border-white/[0.08] lg:grid-cols-[300px_1fr]">
            <div className="border-b border-white/[0.08] p-4 lg:border-b-0 lg:border-r lg:p-5">
              <p className="px-2 pb-3 type-label text-[9px] text-slate-500 sm:text-[10px]">Integrated modules</p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-1">
                {flagshipModules.map((item, index) => {
                  const isActive = active === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActive(item.id)}
                      aria-pressed={isActive}
                      className={`group flex items-center justify-between rounded-xl border px-3.5 py-3 text-left transition-all sm:rounded-2xl sm:px-4 sm:py-4 ${
                        isActive
                          ? "border-emerald-400/30 bg-emerald-400/[0.08] text-white shadow-[0_0_15px_rgba(52,211,153,0.15)]"
                          : "border-transparent bg-white/[0.02] text-slate-400 hover:border-white/10 hover:bg-white/[0.05] hover:text-white"
                      }`}
                    >
                      <div>
                        <span className="block type-label text-[9px] text-slate-500">0{index + 1}</span>
                        <span className="mt-1 block text-xs font-semibold sm:text-sm">{item.label}</span>
                      </div>
                      <ArrowUpRight size={16} className={isActive ? "text-emerald-400" : "text-slate-600 group-hover:text-slate-300"} />
                    </button>
                  );
                })}
              </div>
            </div>

            <motion.div
              key={module.id}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="p-4 sm:p-8 lg:p-10"
            >
              <p className="type-label text-[10px] text-emerald-400">{module.eyebrow}</p>
              <div className="mt-4 grid gap-6 xl:grid-cols-[1fr_auto] xl:items-start">
                <div>
                  <h3 className="text-2xl font-semibold leading-tight text-white sm:text-4xl">{module.title}</h3>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">{module.summary}</p>
                </div>
                <div className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10">
                  {module.metrics.map((metric) => (
                    <div key={metric.label} className="min-w-20 bg-slate-950 p-2.5 text-center sm:min-w-28 sm:p-4">
                      <p className="type-data text-sm font-semibold text-white sm:text-xl">{metric.value}</p>
                      <p className="mt-1 text-[9px] text-slate-400 sm:text-[10px]">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 overflow-hidden rounded-xl border border-white/10 bg-black/40">
                <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-4 py-3">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-200"><FileSpreadsheet size={15} className="text-emerald-400" /><span>Evidence preview</span></div>
                  <span className="type-label text-[9px] text-slate-400">Illustrative architecture view</span>
                </div>
                <div className="overflow-x-auto touch-pan-x">
                  <table className="w-full min-w-[600px] text-left text-xs">
                    <thead className="bg-white/[0.03] text-[10px] text-slate-400">
                      <tr>{module.columns.map((column) => <th key={column} className="px-4 py-3 font-semibold">{column}</th>)}</tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.06]">
                      {module.rows.map((row) => (
                        <tr key={row.join("-")} className="text-slate-300 transition-colors hover:bg-white/[0.02]">
                          {row.map((value, cellIndex) => <td key={`${value}-${cellIndex}`} className={`px-4 py-3.5 ${cellIndex === 0 ? "font-semibold text-white" : ""}`}>{value}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
                {module.controls.map((control) => (
                  <div key={control} className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-[11px] text-slate-300"><CheckCircle2 size={13} className="shrink-0 text-emerald-400" /><span>{control}</span></div>
                ))}
              </div>

              <div className="mt-8 flex flex-col flex-wrap items-stretch gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
                <a href="/career-assets/Md_Abdullah_Al_Owasi_Portfolio.docx" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-xs font-bold text-slate-950 transition-all hover:bg-emerald-300"><ShieldCheck size={16} /><span>Open portfolio</span></a>
                <a href="/artifacts/Governance_Evidence_Workbook.xlsx" download className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-medium text-white transition-colors hover:bg-white/10"><Download size={15} /><span>Download evidence workbook</span></a>
              </div>
            </motion.div>
          </div>
        </div>
      </SideSlideCard>

      <SideSlideCard index={1} side="right">
        {module.id === "ai" ? <AIRiskHeatmap /> : module.id === "tprm" ? <TPRMDecisionTree /> : <AssuranceTelemetryBar />}
      </SideSlideCard>
    </ScrollFocusSection>
  );
}
