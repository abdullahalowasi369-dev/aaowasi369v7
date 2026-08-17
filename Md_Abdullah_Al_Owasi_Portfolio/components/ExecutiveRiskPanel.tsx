"use client";

/**
 * EXECUTIVE RISK MODEL
 * ====================
 * Visualizes the 15-row sample executive risk register included in the workbook.
 * The totals (208 inherent / 127 residual) are sums of the sample scores, not
 * a claim about a real company's risk reduction or control effectiveness.
 */

import { AlertTriangle, Gauge } from "lucide-react";
import { executiveRiskModel } from "@/data/portfolio";

export default function ExecutiveRiskPanel() {
  const residualRatio = executiveRiskModel.residualTotal / executiveRiskModel.inherentTotal;
  return (
    <div className="rounded-[1.75rem] border border-white/[0.08] bg-black/25 p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-emerald-300"><Gauge size={16} /><span className="type-label text-[10px]">Executive risk model</span></div>
        <span className="type-label text-[9px] text-slate-500">15 sample risks</span>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4"><p className="type-label text-[9px] text-slate-500">Inherent score total</p><p className="mt-2 type-data text-3xl font-semibold text-white">{executiveRiskModel.inherentTotal}</p></div>
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4"><p className="type-label text-[9px] text-slate-500">Residual score total</p><p className="mt-2 type-data text-3xl font-semibold text-emerald-200">{executiveRiskModel.residualTotal}</p></div>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.06]"><div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300" style={{ width: `${residualRatio * 100}%` }} /></div>
      <div className="mt-4 flex items-center justify-between gap-3 text-xs text-slate-400"><span>Open: <strong className="text-white">{executiveRiskModel.open}</strong></span><span>Monitor: <strong className="text-white">{executiveRiskModel.monitor}</strong></span></div>
      <p className="mt-4 flex gap-2 text-[11px] leading-5 text-slate-500"><AlertTriangle size={13} className="mt-1 shrink-0 text-amber-300" />{executiveRiskModel.note}</p>
    </div>
  );
}
