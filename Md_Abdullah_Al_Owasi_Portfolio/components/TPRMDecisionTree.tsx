"use client";

/**
 * TPRM DECISION TREE
 * ==================
 * Step-through portfolio model showing how vendor criticality and data exposure
 * change evidence depth and approval path. It is an interactive demonstration,
 * not a claim that these decisions were made for a client or employer.
 */

import { useMemo, useState } from "react";
import { ArrowRight, Database, FileCheck2, Scale, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

type Criticality = "Tier 1" | "Tier 2";
type Exposure = "Sensitive / regulated" | "Operational / limited";
type Evidence = "Complete" | "Partial";

export default function TPRMDecisionTree() {
  const [criticality, setCriticality] = useState<Criticality>("Tier 1");
  const [exposure, setExposure] = useState<Exposure>("Sensitive / regulated");
  const [evidence, setEvidence] = useState<Evidence>("Partial");
  const reduceMotion = useReducedMotion();

  const result = useMemo(() => {
    const elevated = criticality === "Tier 1" || exposure === "Sensitive / regulated";
    if (elevated && evidence === "Partial") {
      return { decision: "Remediate before approval", depth: "Full evidence set + accountable sign-off", risk: "Elevated" };
    }
    if (elevated) {
      return { decision: "Approve with controls", depth: "Full evidence set + recurring review", risk: "Managed" };
    }
    if (evidence === "Partial") {
      return { decision: "Conditional approval", depth: "Focused evidence + due-date remediation", risk: "Moderate" };
    }
    return { decision: "Approve", depth: "Focused evidence + standard review cadence", risk: "Lower" };
  }, [criticality, exposure, evidence]);

  const stages = [
    { icon: ShieldCheck, label: "Criticality", value: criticality },
    { icon: Database, label: "Data exposure", value: exposure },
    { icon: FileCheck2, label: "Evidence state", value: evidence },
    { icon: Scale, label: "Decision", value: result.decision },
  ];

  return (
    <div className="rounded-[1.9rem] border border-white/[0.08] bg-black/25 p-5 sm:p-7">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="type-label text-[10px] text-emerald-300">TPRM decision tree</p>
          <h3 className="mt-3 text-2xl font-semibold text-white">Scrutiny changes with criticality, exposure and evidence.</h3>
        </div>
        <span className="type-label text-[9px] text-slate-500">Portfolio decision logic</span>
      </div>

      <div className="mt-6 grid gap-3 lg:grid-cols-4">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          return (
            <div key={stage.label} className="relative rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
              <div className="flex items-center gap-2 text-slate-400"><Icon size={15} /><span className="type-label text-[9px]">{stage.label}</span></div>
              <p className="mt-3 min-h-10 text-sm font-semibold text-white">{stage.value}</p>
              {index < stages.length - 1 ? <ArrowRight size={14} className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 text-slate-600 lg:block" /> : null}
            </div>
          );
        })}
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <Choice label="Vendor criticality" options={["Tier 1", "Tier 2"]} value={criticality} onChange={(value) => setCriticality(value as Criticality)} />
        <Choice label="Data exposure" options={["Sensitive / regulated", "Operational / limited"]} value={exposure} onChange={(value) => setExposure(value as Exposure)} />
        <Choice label="Evidence state" options={["Complete", "Partial"]} value={evidence} onChange={(value) => setEvidence(value as Evidence)} />
      </div>

      <motion.div
        key={`${criticality}-${exposure}-${evidence}`}
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-5 grid gap-4 rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.04] p-4 sm:grid-cols-3"
      >
        <DecisionMetric label="Recommended path" value={result.decision} />
        <DecisionMetric label="Evidence depth" value={result.depth} />
        <DecisionMetric label="Residual posture" value={result.risk} />
      </motion.div>
    </div>
  );
}

function Choice({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (value: string) => void }) {
  return (
    <fieldset className="rounded-2xl border border-white/[0.07] bg-slate-950/55 p-4">
      <legend className="px-1 type-label text-[9px] text-slate-500">{label}</legend>
      <div className="mt-1 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={value === option}
            onClick={() => onChange(option)}
            className={`rounded-xl border px-3 py-2 text-left text-xs transition-colors ${value === option ? "border-emerald-300/35 bg-emerald-300/10 text-white" : "border-white/[0.08] bg-white/[0.02] text-slate-400 hover:text-white"}`}
          >
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function DecisionMetric({ label, value }: { label: string; value: string }) {
  return <div><p className="type-label text-[9px] text-emerald-300">{label}</p><p className="mt-1 text-sm font-medium leading-5 text-slate-200">{value}</p></div>;
}
