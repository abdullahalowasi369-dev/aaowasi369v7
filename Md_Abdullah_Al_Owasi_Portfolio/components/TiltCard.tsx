"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import type { PointerEvent, ReactNode } from "react";

/**
 * TILT CARD EDITING GUIDE
 * Purpose: optional pointer-depth effect for premium cards; no content or business logic lives here.
 * Edit the [3.2,-3.2] / [-4,4] ranges for tilt strength and transformPerspective for depth.
 * Reduced-motion users receive a static card automatically. Safe removal: yes, if you prefer a calmer site.
 */

export default function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rawX = useTransform(my, [0, 1], [3.2, -3.2]);
  const rawY = useTransform(mx, [0, 1], [-4, 4]);
  const rotateX = useSpring(rawX, { stiffness: 180, damping: 24 });
  const rotateY = useSpring(rawY, { stiffness: 180, damping: 24 });

  return (
    <motion.div className={className} style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 1100 }} onPointerMove={(event: PointerEvent<HTMLDivElement>) => {
      if (reduceMotion || event.pointerType === "touch") return;
      const box = event.currentTarget.getBoundingClientRect();
      mx.set((event.clientX - box.left) / box.width);
      my.set((event.clientY - box.top) / box.height);
    }} onPointerLeave={() => { mx.set(0.5); my.set(0.5); }}>
      {children}
    </motion.div>
  );
}
