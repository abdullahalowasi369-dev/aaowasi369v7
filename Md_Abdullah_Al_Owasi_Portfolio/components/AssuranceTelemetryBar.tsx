"use client";

/**
 * ASSURANCE TELEMETRY
 * ===================
 * Displays only portfolio-scope counts that can be verified in the workbook.
 * The status words "Mapped", "Traceable" and "Structured" intentionally avoid
 * audit/certification language such as "Audited" or "Verified".
 */

import { useEffect, useRef } from "react";
import { Activity, CheckCircle2 } from "lucide-react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { assuranceTelemetry } from "@/data/portfolio";

function AnimatedCount({ value }: { value: number }) {
  const raw = useMotionValue(0);
  const spring = useSpring(raw, { stiffness: 120, damping: 24, mass: 0.7 });
  const display = useTransform(spring, (latest: number) => Math.round(latest).toString());
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });

  useEffect(() => {
    if (!inView) return;
    raw.set(reduceMotion ? value : value);
  }, [inView, raw, reduceMotion, value]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

export default function AssuranceTelemetryBar() {
  return (
    <div className="rounded-[1.75rem] border border-white/[0.08] bg-black/25 p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-emerald-300">
          <Activity size={16} />
          <span className="type-label text-[10px] tracking-[0.14em]">Portfolio telemetry</span>
        </div>
        <span className="type-label text-[9px] text-slate-500">Inspectable scope, not client performance</span>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {assuranceTelemetry.map((metric) => {
          const pct = Math.round((metric.current / metric.total) * 100);
          return (
            <div key={metric.label} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-200">{metric.label}</p>
                  <p className="mt-1 type-data text-2xl font-semibold tracking-[-0.04em] text-white">
                    <AnimatedCount value={metric.current} />
                    <span className="text-slate-500">/{metric.total}</span>
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/20 bg-emerald-300/[0.07] px-2.5 py-1 type-label text-[9px] text-emerald-200">
                  <CheckCircle2 size={11} /> {metric.state}
                </span>
              </div>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.06]" aria-label={`${metric.label}: ${metric.current} of ${metric.total}`}>
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: pct / 100 }}
                  viewport={{ once: true, amount: 0.7 }}
                  style={{ transformOrigin: "left center" }}
                  transition={{ duration: 0.75 }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
