"use client";

/**
 * GOVERNANCE LINEAGE DIAGRAM
 * ==========================
 * Interactive visualization of the portfolio's signature operating model:
 * Requirement -> Control -> Evidence -> Exception -> Residual Risk -> Decision.
 *
 * Interaction
 * - Scroll through the diagram: the active node advances with section progress.
 * - Hover/focus/click a node: that node becomes the active inspection point.
 * - Upstream nodes remain visible, the selected node is emphasized, and
 *   downstream nodes show the path to the final decision.
 *
 * Accessibility
 * - Every node is a real button with aria-pressed state.
 * - The explanatory panel is plain HTML text; the SVG connector is decorative.
 */

import { useRef, useState } from "react";
import { ArrowRight, CheckCircle2, GitBranch } from "lucide-react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { governanceLineage } from "@/data/portfolio";

export default function GovernanceLineageDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [scrollIndex, setScrollIndex] = useState(0);
  const [manualIndex, setManualIndex] = useState<number | null>(null);
  const activeIndex = manualIndex ?? scrollIndex;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 78%", "end 36%"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (manualIndex !== null || reduceMotion) return;
    const next = Math.min(governanceLineage.length - 1, Math.max(0, Math.floor(latest * governanceLineage.length)));
    setScrollIndex(next);
  });

  const active = governanceLineage[activeIndex];

  return (
    <div ref={ref} className="luxury-glass relative overflow-hidden rounded-[1.9rem] p-5 sm:p-7 lg:p-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/50 to-transparent" aria-hidden="true" />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-2 text-emerald-300">
            <GitBranch size={16} />
            <span className="type-label text-[10px] tracking-[0.14em]">Interactive evidence lineage</span>
          </div>
          <h3 className="mt-3 max-w-2xl text-2xl font-semibold text-white sm:text-3xl">Follow a requirement until someone owns the decision.</h3>
        </div>
        <p className="max-w-md text-sm leading-6 text-slate-400">Select any stage to inspect what changes upstream and what it enables downstream.</p>
      </div>

      <div className="relative mt-8">
        <div className="absolute left-[7%] right-[7%] top-6 hidden h-px bg-white/10 lg:block" aria-hidden="true" />
        <div
          className="absolute left-[7%] top-6 hidden h-px bg-gradient-to-r from-emerald-400 to-cyan-300 lg:block"
          style={{ width: `${(activeIndex / (governanceLineage.length - 1)) * 86}%` }}
          aria-hidden="true"
        />

        <div className="grid gap-2.5 lg:grid-cols-6">
          {governanceLineage.map((node, index) => {
            const isActive = index === activeIndex;
            const isUpstream = index < activeIndex;
            return (
              <button
                key={node.key}
                type="button"
                onMouseEnter={() => setManualIndex(index)}
                onMouseLeave={() => setManualIndex(null)}
                onFocus={() => setManualIndex(index)}
                onBlur={() => setManualIndex(null)}
                onClick={() => setManualIndex(index)}
                aria-pressed={isActive}
                className={`group relative rounded-2xl border px-3 py-4 text-left transition-colors ${
                  isActive
                    ? "border-emerald-300/45 bg-emerald-300/[0.10]"
                    : isUpstream
                      ? "border-white/12 bg-white/[0.045]"
                      : "border-white/[0.07] bg-black/20 hover:border-white/15"
                }`}
              >
                <span
                  className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl border text-sm font-semibold type-data ${
                    isActive
                      ? "border-emerald-300/50 bg-emerald-300 text-slate-950 shadow-[0_0_35px_rgba(110,231,183,.22)]"
                      : isUpstream
                        ? "border-emerald-300/25 bg-emerald-300/10 text-emerald-200"
                        : "border-white/10 bg-slate-950 text-slate-400"
                  }`}
                >
                  {isUpstream ? <CheckCircle2 size={18} /> : String(index + 1).padStart(2, "0")}
                </span>
                <span className={`mt-3 block text-xs font-semibold ${isActive ? "text-white" : "text-slate-300"}`}>{node.label}</span>
                {index < governanceLineage.length - 1 ? <ArrowRight size={13} className="absolute right-2 top-[1.45rem] hidden translate-x-[65%] text-slate-700 lg:block" /> : null}
              </button>
            );
          })}
        </div>
      </div>

      <motion.div
        key={active.key}
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-5 grid gap-3 rounded-2xl border border-white/[0.08] bg-black/25 p-4 sm:grid-cols-[auto_1fr] sm:items-start"
      >
        <span className="type-label text-[10px] text-emerald-300">{String(activeIndex + 1).padStart(2, "0")} / 06</span>
        <div>
          <p className="font-semibold text-white">{active.label}</p>
          <p className="mt-1 text-sm leading-6 text-slate-400">{active.detail}</p>
        </div>
      </motion.div>
    </div>
  );
}
