"use client";

/**
 * ============================================================================
 * COMPONENT: MotionProvider.tsx
 * PURPOSE: Global wrapper component that standardizes Motion for React animation
 *          settings, easing curves, and reduced-motion behavior across all pages.
 * 
 * HOW IT WORKS:
 * 1. MotionConfig Context: Wraps the application layout tree to inject universal
 *    animation defaults so individual motion elements inherit consistent timing.
 * 2. Reduced Motion Safety: Uses `reducedMotion="user"` so that any user with
 *    "Reduce Motion" enabled in OS settings will automatically have transform/opacity 
 *    animations scaled down or disabled globally.
 * 3. Consistent Easing: Defines a custom cubic-bezier curve `[0.2, 0.8, 0.2, 1]` 
 *    for uniform, modern UI entry/exit feel across all sub-components.
 * 
 * FUTURE MAINTENANCE GUIDE:
 * 1. Global Duration: Change `duration: 0.45` to alter default animation speed site-wide.
 * 2. Easing Curve: Modify `ease: [0.2, 0.8, 0.2, 1]` to tweak global physics feel.
 * 3. Package Compatibility: Keep imports on `motion/react`, which matches package.json.
 * ============================================================================
 */

import React from "react";
import { MotionConfig } from "motion/react";

interface MotionProviderProps {
  children: React.ReactNode;
}

export default function MotionProvider({ children }: MotionProviderProps) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{
        duration: 0.45,
        ease: [0.2, 0.8, 0.2, 1],
      }}
    >
      {children}
    </MotionConfig>
  );
}
