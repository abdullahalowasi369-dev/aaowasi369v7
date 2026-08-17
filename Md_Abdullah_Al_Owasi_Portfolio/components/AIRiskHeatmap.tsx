"use client";

/**
 * AI RISK & OVERSIGHT MATRIX
 * ==========================
 * Interactive matrix based on selected rows from the included AI Governance
 * workbook. Risk scores are the workbook's inherent-risk scores. Oversight is
 * an ordinal portfolio visualization of the documented human-review mechanism;
 * NIST AI RMF does not prescribe these numeric coordinates.
 *
 * The card uses a small 3D hover tilt on pointer-precise devices. On touch and
 * reduced-motion environments it behaves as a flat, tap-first interface.
 */

import { useMemo, useState } from "react";
import { Eye, ShieldAlert, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { aiRiskHeatmapUseCases } from "@/data/portfolio";

type AIRiskUseCaseId = (typeof aiRiskHeatmapUseCases)[number]["id"];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export default function AIRiskHeatmap() {
  const [selected, setSelected] = useState<AIRiskUseCaseId>(aiRiskHeatmapUseCases[0].id);
  const reduceMotion = useReducedMotion();
  const active = useMemo(
    () => aiRiskHeatmapUseCases.find((item) => item.id === selected) ?? aiRiskHeatmapUseCases[0],
    [selected],
  );

  return (
    <motion.div
      className="risk-3d-shell rounded-[1.9rem] border border-white/[0.08] bg-black/25 p-5 sm:p-7"
      whileHover={reduceMotion ? undefined : { rotateX: 0.7, rotateY: -0.7 }}
      transition={{ type: "spring", stiffness: 180, damping: 22 }}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-emerald-300">
            <Sparkles size={15} />
            <span className="type-label text-[10px] tracking-[0.14em]">AI risk & oversight matrix</span>
          </div>
          <h3 className="mt-3 text-2xl font-semibold text-white">Risk exposure against human oversight.</h3>
        </div>
        <p className="max-w-md text-xs leading-5 text-slate-500">Selected use cases from the 15-row portfolio register. NIST AI RMF provides the governance lens; the numeric placement is this portfolio’s visualization model.</p>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.25fr_.75fr]">
        <div className="relative min-h-[360px] overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-950/70 p-5">
          <div className="absolute inset-5 grid grid-cols-2 grid-rows-2 overflow-hidden rounded-xl border border-white/[0.05]" aria-hidden="true">
            <div className="border-b border-r border-white/[0.05] bg-emerald-400/[0.025]" />
            <div className="border-b border-white/[0.05] bg-cyan-400/[0.02]" />
            <div className="border-r border-white/[0.05] bg-white/[0.015]" />
            <div className="bg-amber-400/[0.02]" />
          </div>

          <span className="absolute left-1 top-1/2 -translate-y-1/2 -rotate-90 type-label text-[9px] text-slate-600">Human oversight</span>
          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 type-label text-[9px] text-slate-600">Inherent risk score</span>
          <span className="absolute left-7 top-7 type-label text-[8px] text-slate-600">Higher oversight</span>
          <span className="absolute bottom-7 right-7 type-label text-[8px] text-slate-600">Higher risk</span>

          {aiRiskHeatmapUseCases.map((item, index) => {
            const x = 14 + ((item.riskScore - 8) / 7) * 72;
            const y = 82 - ((item.oversight - 1) / 4) * 68;
            const isActive = item.id === active.id;
            return (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => setSelected(item.id)}
                aria-label={`${item.name}: inherent risk ${item.riskScore}, oversight ${item.oversightLabel}`}
                className={`absolute z-10 flex h-9 w-9 items-center justify-center rounded-xl border text-[9px] font-semibold shadow-xl transition-colors ${
                  isActive
                    ? "border-emerald-200/70 bg-emerald-300 text-slate-950 shadow-emerald-400/20"
                    : "border-white/15 bg-slate-900 text-slate-300 hover:border-emerald-300/45 hover:text-white"
                }`}
                style={{ left: `${clamp(x, 10, 88)}%`, top: `${clamp(y, 10, 84)}%`, transform: "translate(-50%, -50%)" }}
                whileHover={reduceMotion ? undefined : { scale: 1.13, rotateZ: index % 2 === 0 ? -2 : 2 }}
                whileTap={{ scale: 0.96 }}
              >
                {item.id.replace("AI-", "")}
              </motion.button>
            );
          })}
        </div>

        <motion.div key={active.id} initial={reduceMotion ? false : { opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="type-label text-[9px] text-emerald-300">{active.id}</span>
            <span className="rounded-full border border-white/10 px-2.5 py-1 type-label text-[9px] text-slate-400">Residual: {active.residualRisk}</span>
          </div>
          <h4 className="mt-4 text-xl font-semibold text-white">{active.name}</h4>

          <div className="mt-5 space-y-4 text-sm">
            <div className="flex gap-3">
              <ShieldAlert size={16} className="mt-0.5 shrink-0 text-amber-300" />
              <div><p className="type-label text-[9px] text-slate-500">Inherent risk</p><p className="mt-1 text-slate-300">{active.riskScore}/25 portfolio score</p></div>
            </div>
            <div className="flex gap-3">
              <Eye size={16} className="mt-0.5 shrink-0 text-emerald-300" />
              <div><p className="type-label text-[9px] text-slate-500">Human oversight</p><p className="mt-1 text-slate-300">{active.oversightLabel}</p></div>
            </div>
            <div>
              <p className="type-label text-[9px] text-slate-500">NIST AI RMF lens</p>
              <p className="mt-1 text-slate-300">{active.rmf}</p>
            </div>
            <div>
              <p className="type-label text-[9px] text-slate-500">Transparency / assurance action</p>
              <p className="mt-1 text-slate-300">{active.transparency}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
