"use client";

/**
 * ============================================================================
 * COMPONENT: Modal.tsx
 * PURPOSE: Renders an accessible overlay dialog with backdrop blur, focus trapping,
 *          keyboard control (Escape to close), and body scroll locks.
 * 
 * HOW IT WORKS:
 * 1. Body Scroll Lock: Temporarily sets `document.body.style.overflow = "hidden"` 
 *    on mount so background content cannot scroll while the modal is open, and restores 
 *    the previous overflow style when unmounted.
 * 2. Focus Management & Focus Trap: Automatically focuses the close button upon 
 *    opening (`closeRef.current?.focus()`) and intercepts the `Tab` key to constrain 
 *    keyboard focus strictly within focusable elements in the modal dialog.
 * 3. Escape Key Handler: Listens for `keydown` events to close the modal when `Escape` is pressed.
 * 4. Backdrop Dismissal: Clicking the outer semi-transparent backdrop triggers `onClose()`.
 * 
 * FUTURE MAINTENANCE GUIDE:
 * 1. Z-Index Layering: Ensure `z-50` or higher is preserved on the fixed container so it 
 *    renders above navigation bars and ambient overlays.
 * 2. Focusable Query Selector: If custom interactive components are added inside the modal 
 *    that aren't standard tags, update the `querySelectorAll` string inside `useEffect`.
 * 3. Max Width Sizing: Modify `max-w-2xl` on the modal container to make it wider or narrower.
 * ============================================================================
 */

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { motion } from "motion/react";

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ title, children, onClose }: ModalProps) {
  // Reference to the main close button for initial focus and boundary calculations
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // 1. Store original body overflow setting & lock scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // 2. Focus the close button immediately on modal open
    closeRef.current?.focus();

    // 3. Keydown Listener: Handles Escape key and Focus Trap logic
    const handleKeyDown = (event: KeyboardEvent) => {
      // Close on Escape key
      if (event.key === "Escape") {
        onClose();
        return;
      }

      // Trap Tab key navigation within the modal dialog
      if (event.key === "Tab") {
        const dialog = closeRef.current?.closest('[role="dialog"]');
        if (!dialog) return;

        // Query all focusable HTML elements within the dialog container
        const focusableElements = Array.from(
          dialog.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
          )
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        // Shift + Tab: Cycle backward from first element to last
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } 
        // Tab: Cycle forward from last element to first
        else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Clean up event listener and restore original body scroll behavior on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Darkened Backdrop with Blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Modal Dialog Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-950 p-6 sm:p-8 shadow-2xl"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h2 id="modal-title" className="text-lg sm:text-xl font-bold tracking-tight text-white">
            {title}
          </h2>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-full p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="mt-5 text-sm leading-relaxed text-slate-300 max-h-[70vh] overflow-y-auto pr-1">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
