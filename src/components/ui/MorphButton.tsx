"use client";

import React from "react";
import { m, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE, DUR, SPRING } from "@/lib/animations";

export type MorphState = "idle" | "loading" | "success";

type NativeButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag"
>;

interface MorphButtonProps extends NativeButtonProps {
  state?: MorphState;
  children: React.ReactNode;
  loadingLabel?: string;
  successLabel?: string;
  fullWidth?: boolean;
}

/**
 * Holatiga qarab shakl o'zgartiruvchi (morph) tugma:
 *   idle → loading (spinner, kengligi saqlanadi) → success (chizilgan checkmark)
 *
 * `layout` — kenglik o'zgarsa sakramaydi, silliq o'sadi/kichrayadi.
 */
export function MorphButton({
  state = "idle",
  children,
  loadingLabel = "Yuborilmoqda...",
  successLabel = "Yuborildi",
  fullWidth = false,
  className,
  disabled,
  ...rest
}: MorphButtonProps) {
  const isBusy = state !== "idle";

  return (
    <m.button
      layout
      transition={SPRING.soft}
      disabled={disabled || isBusy}
      aria-live="polite"
      aria-busy={state === "loading"}
      {...rest}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-full font-bold text-xs uppercase tracking-wider text-white cursor-pointer",
        "shadow-md transition-colors duration-200 active:scale-[0.98] disabled:cursor-default overflow-hidden",
        state === "success"
          ? "bg-emerald-500 shadow-emerald-500/25"
          : "bg-[#dc2626] hover:bg-[#b91c1c] shadow-[#dc2626]/25",
        fullWidth && "w-full",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {state === "idle" && (
          <m.span
            key="idle"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: DUR.instant, ease: EASE }}
            className="inline-flex items-center gap-2"
          >
            {children}
          </m.span>
        )}

        {state === "loading" && (
          <m.span
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: DUR.instant, ease: EASE }}
            className="inline-flex items-center gap-2"
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>{loadingLabel}</span>
          </m.span>
        )}

        {state === "success" && (
          <m.span
            key="success"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={SPRING.snappy}
            className="inline-flex items-center gap-2"
          >
            {/* Checkmark chizilib chiqadi */}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <m.path
                d="M5 12.5 L10 17.5 L19 7"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.35, ease: EASE, delay: 0.08 }}
              />
            </svg>
            <span>{successLabel}</span>
          </m.span>
        )}
      </AnimatePresence>
    </m.button>
  );
}
