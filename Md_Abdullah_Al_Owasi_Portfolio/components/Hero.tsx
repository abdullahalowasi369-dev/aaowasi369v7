"use client";

import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Download, Mail, Sparkles } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { heroMetrics, heroWords, siteConfig } from "@/data/portfolio";
import siteCopy from "@/data/site-copy.json";
import Magnetic from "./Magnetic";

/*
 * HERO EDITING GUIDE
 * ==================
 * Purpose: answer the recruiter's first five questions in seconds:
 * 1) Who is this? 2) What domain? 3) What can he do? 4) Where is the proof? 5) How do I contact him?
 *
 * Most identity strings and verified counts are stored in data/portfolio.ts.
 * The visible headline and value proposition live here because they are intentionally unique to the hero.
 * Do not insert unverified revenue, time-saving percentages, years of experience, or certification claims here.
 */
export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  // Motion is decorative only. Reduced-motion users receive a stable first term.
  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      setWordIndex((prev) => (prev + 1) % heroWords.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  return (
    <section
      id="top"
      className="relative flex min-h-screen min-h-[100svh] w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 sm:pt-36 lg:pt-40 items-center justify-center scroll-mt-28"
    >
      <div className="hero-orbit pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

      <div className="grid w-full gap-10 lg:gap-12 xl:grid-cols-[1.25fr_.75fr] xl:items-end">
        <div className="relative z-10 flex flex-col justify-center">
          {/* Domain signal: short and role-relevant; avoids location-first framing. */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 sm:mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3.5 py-1.5 text-xs text-emerald-300 w-fit"
          >
            <Sparkles size={14} className="shrink-0 text-emerald-400" />
            <span className="type-label text-[10px] sm:text-xs text-slate-400">Focused on</span>
            <div className="relative h-5 overflow-hidden font-semibold text-emerald-300 min-w-[140px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={heroWords[wordIndex]}
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -16, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="absolute left-0 top-0 whitespace-nowrap"
                >
                  {heroWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Identity line: deliberately avoids an employer-issued senior title. */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="mb-4 type-label text-[11px] sm:text-xs text-slate-500"
          >
            {siteConfig.name} · {siteCopy.hero.identity}
          </motion.p>

          {/* Primary positioning: senior-caliber operating judgment without a false tenure claim. */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-[2.55rem] sm:text-5xl lg:text-6xl xl:text-[4.75rem] text-white leading-[0.99]"
          >
            {siteCopy.hero.headlinePrefix}{" "}
            <span className="premium-text-gradient">{siteCopy.hero.headlineAccent}</span>
          </motion.h1>

          {/* Business-value paragraph: uses outcomes that the architecture enables, not fake realized client metrics. */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-5 sm:mt-7 text-[15px] sm:text-[17px] lg:text-[19px] text-slate-300 leading-[1.68] max-w-[68ch]"
          >
            {siteCopy.hero.body}
          </motion.p>

          {/* Recruiter scan terms: frameworks supported by actual portfolio artifacts. */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.27 }}
            className="mt-5 flex flex-wrap gap-2"
          >
            {["NIST AI RMF", "ISO/IEC 27001", "SOC 2 TSC", "ISO/IEC 42001", "EU AI Act", "TPRM"].map((item) => (
              <span key={item} className="rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 type-label text-[10px] text-slate-400">
                {item}
              </span>
            ))}
          </motion.div>

          {/* Primary actions: proof first, editable portfolio second. */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4"
          >
            <Magnetic>
              <a
                href="#proof"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 py-3.5 text-xs sm:text-sm font-semibold text-slate-950 hover:bg-emerald-300 hover:shadow-[0_0_25px_rgba(52,211,153,0.34)] transition-all duration-200"
              >
                <span>{siteCopy.hero.primaryCta}</span>
                <ArrowDownRight size={16} />
              </a>
            </Magnetic>

            <Magnetic>
              <a
                href="/career-assets/Md_Abdullah_Al_Owasi_Portfolio.docx"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3.5 text-xs sm:text-sm font-semibold text-white hover:bg-white/[0.08] hover:border-white/20 transition-all duration-200"
              >
                <Download size={16} className="text-emerald-400" />
                <span>{siteCopy.hero.secondaryCta}</span>
                <ArrowUpRight size={14} className="text-slate-400" />
              </a>
            </Magnetic>
          </motion.div>

          {/* Availability: broad recruiting orientation; no unsupported jurisdiction-specific work-authorization claim. */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.42 }}
            className="mt-7 flex flex-col gap-2 border-t border-white/[0.07] pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:gap-5"
          >
            <span className="type-label text-emerald-300">{siteCopy.hero.availability}</span>
            <span>{siteCopy.hero.roleLine}</span>
            <a href={`mailto:${siteConfig.email}?subject=Technology%20Risk%20%2F%20GRC%20opportunity`} className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white">
              <Mail size={13} /> {siteConfig.email}
            </a>
          </motion.div>
        </div>

        {/* Verified portfolio metrics: these are scope counts, not invented business-impact percentages. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-6 xl:mt-0"
        >
          <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-950/80 p-5 sm:p-7 backdrop-blur-md shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
              <span className="type-label text-[10px] sm:text-xs text-slate-400">{siteCopy.hero.portfolioLabel}</span>
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 type-label text-[10px] text-emerald-300 border border-emerald-400/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {siteCopy.hero.portfolioStatus}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {heroMetrics.map((metric, index) => (
                <div key={metric.label || index} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 hover:border-white/15 transition-colors">
                  <p className="type-data font-display text-2xl sm:text-3xl font-semibold tracking-[-0.04em] text-white">{metric.value}</p>
                  <p className="mt-1.5 text-xs text-slate-400 leading-5">{metric.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-white/[0.06] bg-black/20 p-4">
              <p className="type-label text-[10px] text-slate-500">{siteCopy.hero.modelLabel}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{siteCopy.hero.modelText}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
