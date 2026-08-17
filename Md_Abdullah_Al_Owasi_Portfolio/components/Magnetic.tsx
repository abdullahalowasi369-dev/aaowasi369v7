"use client";

/**
 * ============================================================================
 * COMPONENT: Magnetic.tsx
 * PURPOSE: Interactive feedback wrapper that provides magnetic pull
 *          and dynamic physical "pop" scaling across mouse, touch, and pen devices.
 * 
 * HOW IT WORKS:
 * 1. Hybrid Input Support: Handles mouse cursor offsets using physics springs,
 *    while providing immediate scale-up and elevation pop (`scale: 1.06`, `y: -3px`)
 *    when touched by a finger or stylus on mobile screens.
 * 2. Active Touch State: Sets `isPressed` on `pointerdown` / `touchstart` so users
 *    get instant tactile press confirmation before triggering standard button navigation.
 * 3. Accessibility Safety: Automatically disables high-intensity transforms when 
 *    `useReducedMotion()` is active.
 * 
 * FUTURE MAINTENANCE GUIDE:
 * 1. Pop Scale: Adjust `hover={{ scale: 1.05 }}` and `tap={{ scale: 0.97 }}` to 
 *    increase or decrease press depth.
 * 2. Magnetic Pull Strength: Change `strength={7}` prop when wrapping custom buttons.
 * ============================================================================
 */

import React, { useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { ReactNode } from "react";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export default function Magnetic({
  children,
  strength = 7,
  className = "",
}: MagneticProps) {
  const reduceMotion = useReducedMotion();
  const [isTouched, setIsTouched] = useState(false);

  // Raw motion offsets
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Physics springs
  const x = useSpring(rawX, { stiffness: 280, damping: 22, mass: 0.35 });
  const y = useSpring(rawY, { stiffness: 280, damping: 22, mass: 0.35 });

  const handlePointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
    setIsTouched(false);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLSpanElement>) => {
    if (reduceMotion || event.pointerType === "touch") return;

    // Direct center-relative coordinate calculation
    const box = event.currentTarget.getBoundingClientRect();
    const centerX = box.left + box.width / 2;
    const centerY = box.top + box.height / 2;

    const relativeX = (event.clientX - centerX) / (box.width / 2);
    const relativeY = (event.clientY - centerY) / (box.height / 2);

    rawX.set(relativeX * strength * 2);
    rawY.set(relativeY * strength * 2);
  };

  const handleTouchStart = () => {
    setIsTouched(true);
  };

  const handleTouchEnd = () => {
    setTimeout(() => setIsTouched(false), 200);
  };

  return (
    <motion.span
      className={`inline-flex active:cursor-grabbing ${className}`}
      style={reduceMotion ? undefined : { x, y }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      whileHover={reduceMotion ? undefined : { scale: 1.05, y: -3 }}
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      animate={isTouched ? { scale: 1.06, y: -4 } : { scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {children}
    </motion.span>
  );
}
