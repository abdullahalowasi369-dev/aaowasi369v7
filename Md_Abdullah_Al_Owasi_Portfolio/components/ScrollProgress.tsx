"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * SCROLL PROGRESS EDITING GUIDE
 * Purpose: purely decorative reading-progress feedback. It carries no hiring-critical content.
 * Change the spring values to alter responsiveness; change the Tailwind gradient classes to alter appearance.
 * Safe removal: yes. Removing this component does not change page semantics, copy, SEO or evidence links.
 */

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 26, mass: 0.2 });
  return <motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-[80] h-[2px] origin-left bg-gradient-to-r from-emerald-300 via-cyan-300 to-slate-200" style={{ scaleX }} />;
}
