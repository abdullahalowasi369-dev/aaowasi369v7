"use client";

/**
 * SCROLL-FOCUS SPATIAL SYSTEM
 * ===========================
 * Purpose
 * - Keeps each section heading visually anchored while its evidence cards move
 *   from the viewport margins into a centered reading zone and back out again.
 * - Uses transforms/opacity only, so the motion never changes document layout
 *   and therefore does not introduce cumulative layout shift (CLS).
 * - One useScroll observer is shared by every SideSlideCard in the section.
 *
 * Motion model
 * - Motion's useScroll accepts a start/end offset pair. We track the complete
 *   section journey with ["start end", "end start"].
 * - useTransform then creates four phases from that 0..1 progress:
 *   off-stage -> centered -> centered/locked -> off-stage.
 * - Desktop: ±120 px horizontal travel.
 * - Tablet/foldable: ±40 px horizontal travel.
 * - Mobile: 30 px vertical micro-travel plus a subtle scale fade.
 * - Reduced motion: translation and scale collapse to neutral; opacity remains.
 *
 * Edit safely
 * - Change breakpoint movement in RESPONSIVE_MOTION below.
 * - Change the reading-zone timing in the four useTransform input points.
 * - Keep transform and opacity as the animated properties for performance.
 */

import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useRef,
  useSyncExternalStore,
} from "react";
import {
  motion,
  type MotionValue,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import SectionHeading from "./SectionHeading";

type ViewportMode = "desktop" | "tablet" | "mobile";
type SlideSide = "left" | "right" | "alternate";

const RESPONSIVE_MOTION = {
  desktop: { x: 120, y: 0, scale: 1 },
  tablet: { x: 40, y: 0, scale: 1 },
  mobile: { x: 0, y: 30, scale: 0.965 },
} as const;

type ScrollFocusContextValue = {
  progress: MotionValue<number>;
  viewport: ViewportMode;
  reducedMotion: boolean;
};

const ScrollFocusContext = createContext<ScrollFocusContextValue | null>(null);

function getViewportMode(): ViewportMode {
  if (typeof window === "undefined") return "mobile";
  if (window.matchMedia("(max-width: 767px)").matches) return "mobile";
  if (window.matchMedia("(max-width: 1039px)").matches) return "tablet";
  return "desktop";
}

function subscribeViewportMode(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => undefined;
  const mobile = window.matchMedia("(max-width: 767px)");
  const tablet = window.matchMedia("(min-width: 768px) and (max-width: 1039px)");
  const add = (query: MediaQueryList) => {
    if (typeof query.addEventListener === "function") query.addEventListener("change", onStoreChange);
    else query.addListener(onStoreChange);
  };
  const remove = (query: MediaQueryList) => {
    if (typeof query.removeEventListener === "function") query.removeEventListener("change", onStoreChange);
    else query.removeListener(onStoreChange);
  };
  add(mobile);
  add(tablet);
  return () => { remove(mobile); remove(tablet); };
}

function useViewportMode(): ViewportMode {
  // Server snapshot intentionally starts in the mobile-safe mode so SSR/hydration
  // never emits large horizontal transforms before the real viewport is known.
  return useSyncExternalStore(subscribeViewportMode, getViewportMode, () => "mobile");
}

export function ScrollFocusSection({
  id,
  eyebrow,
  title,
  copy,
  children,
  className = "",
  contentClassName = "",
}: {
  id: string;
  eyebrow: string;
  title: string;
  copy?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewport = useViewportMode();
  const reducedMotion = Boolean(useReducedMotion());
  // useInView provides a cheap semantic activity signal for QA/debugging and
  // future section-level effects without changing the scroll-linked math.
  const isInView = useInView(sectionRef, { amount: 0.08 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // The heading remains fully readable through the central reading zone and
  // softens only near the section boundaries. Its position is handled by CSS sticky.
  const headingOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.84, 1],
    [0.42, 1, 1, 0.42],
  );

  const contextValue = useMemo(
    () => ({ progress: scrollYProgress, viewport, reducedMotion }),
    [scrollYProgress, viewport, reducedMotion],
  );

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`scroll-focus-section section-pad scroll-mt-28 overflow-x-clip touch-pan-y ${className}`}
      data-focus-active={isInView ? "true" : "false"}
    >
      <div className="container-shell">
        <motion.div style={{ opacity: headingOpacity }} className="section-heading-lock">
          <SectionHeading eyebrow={eyebrow} title={title} copy={copy} />
        </motion.div>

        <ScrollFocusContext.Provider value={contextValue}>
          <motion.div
            className={contentClassName}
            initial="idle"
            whileInView="active"
            viewport={{ amount: 0.08 }}
            variants={{
              idle: {},
              active: { transition: { staggerChildren: 0.12 } },
            }}
          >
            {children}
          </motion.div>
        </ScrollFocusContext.Provider>
      </div>
    </section>
  );
}

export function SideSlideCard({
  children,
  side = "alternate",
  index = 0,
  className = "",
}: {
  children: ReactNode;
  side?: SlideSide;
  index?: number;
  className?: string;
}) {
  const context = useContext(ScrollFocusContext);
  if (!context) {
    throw new Error("SideSlideCard must be rendered inside ScrollFocusSection.");
  }

  const { progress, viewport, reducedMotion } = context;
  const resolvedSide = side === "alternate" ? (index % 2 === 0 ? "left" : "right") : side;
  const direction = resolvedSide === "left" ? -1 : 1;
  const vector = RESPONSIVE_MOTION[viewport];

  // Index-based phase offset creates a scroll-linked stagger. The section also
  // applies a 0.12 s in-view stagger to the final polish state.
  const entryStart = Math.min(0.02 + index * 0.018, 0.18);
  const entryEnd = Math.min(0.33 + index * 0.008, 0.43);
  const exitStart = Math.max(0.67 - index * 0.004, 0.60);
  const ranges: [number, number, number, number] = [entryStart, entryEnd, exitStart, 0.98];

  const x = useTransform(
    progress,
    ranges,
    reducedMotion || viewport === "mobile"
      ? [0, 0, 0, 0]
      : [direction * vector.x, 0, 0, direction * vector.x],
  );
  const y = useTransform(
    progress,
    ranges,
    reducedMotion || viewport !== "mobile" ? [0, 0, 0, 0] : [vector.y, 0, 0, -vector.y],
  );
  const opacity = useTransform(progress, ranges, [0, 1, 1, 0]);
  const scale = useTransform(
    progress,
    ranges,
    reducedMotion || viewport !== "mobile"
      ? [1, 1, 1, 1]
      : [vector.scale, 1, 1, vector.scale],
  );

  return (
    <motion.div
      style={{ x, y, opacity, scale, willChange: "transform, opacity" }}
      className={`gpu-layer ${className}`}
      variants={{
        idle: { filter: "saturate(0.92)" },
        active: { filter: "saturate(1)" },
      }}
      transition={{ duration: 0.28 }}
    >
      {children}
    </motion.div>
  );
}
