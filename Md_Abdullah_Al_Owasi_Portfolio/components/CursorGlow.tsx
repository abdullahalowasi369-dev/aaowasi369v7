"use client";

/**
 * CURSOR GLOW — DECORATIVE, DESKTOP/PRECISE-POINTER ONLY
 * =====================================================
 * This effect never carries content or navigation. It runs only when the device
 * reports hover + a fine pointer and reduced motion is not requested. Phones,
 * tablets, foldables, touchscreens and low-power/coarse-pointer devices therefore
 * avoid the extra listeners, GPU work and accidental touch-scroll interference.
 */

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

export default function CursorGlow() {
  const reduceMotion = Boolean(useReducedMotion());
  const [enabled, setEnabled] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 768px)").matches,
  );
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const smoothX = useSpring(mouseX, { damping: 24, stiffness: 280, mass: 0.4 });
  const smoothY = useSpring(mouseY, { damping: 24, stiffness: 280, mass: 0.4 });

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 768px)");
    const update = () => setEnabled(query.matches);
    if (typeof query.addEventListener === "function") query.addEventListener("change", update);
    else query.addListener(update);
    return () => {
      if (typeof query.removeEventListener === "function") query.removeEventListener("change", update);
      else query.removeListener(update);
    };
  }, []);

  useEffect(() => {
    if (!enabled || reduceMotion) return;
    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      setIsVisible(true);
      mouseX.set(event.clientX - 200);
      mouseY.set(event.clientY - 200);
      const target = event.target instanceof Element ? event.target : null;
      setIsHovered(Boolean(target?.closest("a,button,input,textarea,[role='button'],[data-cursor-hover]")));
    };
    const handleLeave = () => {
      setIsVisible(false);
      setIsHovered(false);
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, [enabled, reduceMotion, mouseX, mouseY]);

  if (reduceMotion || !enabled || !isVisible) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-40 rounded-full"
      style={{ x: smoothX, y: smoothY }}
      animate={{ scale: isHovered ? 1.28 : 1, opacity: isHovered ? 0.78 : 0.52 }}
      transition={{ scale: { type: "spring", stiffness: 300, damping: 24 }, opacity: { duration: 0.14 } }}
    >
      <div
        className="h-[400px] w-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle at center, rgba(52,211,153,.18) 0%, rgba(20,184,166,.09) 35%, rgba(15,23,42,0) 70%)",
          filter: "blur(22px)",
        }}
      />
    </motion.div>
  );
}
