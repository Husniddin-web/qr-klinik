"use client";

import React, { useId, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE, DUR } from "@/lib/animations";

type BaseProps = {
  label: string;
  icon?: LucideIcon;
  error?: string;
  /** Qorong'i fon (navy) ustida ishlatilganda */
  tone?: "light" | "dark";
  className?: string;
  /** Xatolik har o'zgarganda shake qayta ishga tushishi uchun */
  shakeKey?: number;
};

type InputProps = BaseProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> & {
    multiline?: false;
  };

type TextareaProps = BaseProps &
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> & {
    multiline: true;
  };

export type FloatingInputProps = InputProps | TextareaProps;

/**
 * "Suzuvchi yorliq"li input.
 *
 * Mikro-interaksiyalar:
 *  - yorliq fokus/qiymat bo'lganda yuqoriga suzadi (CSS `peer`, JSsiz),
 *  - ostki qizil chiziq fokusda markazdan ikki tomonga ochiladi,
 *  - xatolikda maydon qisqa "shake" qiladi va xabar balandlik bilan chiqadi.
 */
export function FloatingInput(props: FloatingInputProps) {
  const {
    label,
    icon: Icon,
    error,
    tone = "light",
    className,
    shakeKey = 0,
    ...rest
  } = props as FloatingInputProps & { multiline?: boolean };

  const id = useId();
  const [focused, setFocused] = useState(false);
  const isDark = tone === "dark";
  const hasError = Boolean(error);

  const fieldBase = cn(
    "peer w-full rounded-xl border bg-transparent font-medium outline-none transition-colors duration-200",
    "pt-5 pb-2 text-[15px] sm:text-sm",
    Icon ? "pl-11 pr-4" : "px-4",
    isDark
      ? "text-white border-slate-700/80 bg-slate-900/80 placeholder-transparent"
      : "text-[#0f172a] border-slate-200 bg-slate-50 placeholder-transparent",
    hasError
      ? isDark
        ? "border-red-400/80"
        : "border-red-400"
      : focused
        ? isDark
          ? "border-red-400/70"
          : "border-[#0f172a]"
        : ""
  );

  const labelBase = cn(
    "pointer-events-none absolute transition-all duration-200 ease-out font-semibold",
    Icon ? "left-11" : "left-4",
    // Standart holat: input ichida, oddiy o'lcham
    "top-1/2 -translate-y-1/2 text-sm",
    isDark ? "text-slate-400" : "text-slate-500",
    // Fokus yoki qiymat bo'lganda: yuqoriga, kichrayadi
    "peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-wider",
    "peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-wider",
    hasError
      ? "text-red-500 peer-focus:text-red-500"
      : isDark
        ? "peer-focus:text-red-300"
        : "peer-focus:text-[#dc2626]"
  );

  return (
    <div className={cn("w-full", className)}>
      {/* Shake — `key` o'zgarganda qayta mount → animatsiya qayta o'ynaydi */}
      <div
        key={shakeKey}
        className={cn("relative", hasError && shakeKey > 0 && "animate-field-shake")}
      >
        {Icon && (
          <Icon
            className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 pointer-events-none",
              hasError
                ? "text-red-500"
                : focused
                  ? isDark
                    ? "text-red-300"
                    : "text-[#dc2626]"
                  : "text-slate-400"
            )}
          />
        )}

        {"multiline" in rest && rest.multiline ? (
          <textarea
            id={id}
            placeholder={label}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${id}-error` : undefined}
            {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            onFocus={(e) => {
              setFocused(true);
              (rest as TextareaProps).onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              (rest as TextareaProps).onBlur?.(e);
            }}
            className={cn(fieldBase, "resize-none min-h-[92px] pt-6")}
          />
        ) : (
          <input
            id={id}
            placeholder={label}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${id}-error` : undefined}
            {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
            onFocus={(e) => {
              setFocused(true);
              (rest as InputProps).onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              (rest as InputProps).onBlur?.(e);
            }}
            className={fieldBase}
          />
        )}

        <label htmlFor={id} className={labelBase}>
          {label}
        </label>

        {/* Fokus chizig'i: markazdan ikki tomonga */}
        <m.span
          aria-hidden
          initial={false}
          animate={{ scaleX: focused ? 1 : 0, opacity: focused ? 1 : 0 }}
          transition={{ duration: DUR.fast, ease: EASE }}
          className={cn(
            "absolute bottom-0 left-3 right-3 h-[2px] rounded-full origin-center pointer-events-none",
            hasError ? "bg-red-500" : "bg-[#dc2626]"
          )}
        />
      </div>

      {/* Xato xabari — balandligi bilan ochiladi/yopiladi */}
      <AnimatePresence initial={false}>
        {hasError && (
          <m.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 6 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: DUR.fast, ease: EASE }}
            className="flex items-center gap-1.5 text-[11px] font-semibold text-red-500 overflow-hidden"
          >
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </m.p>
        )}
      </AnimatePresence>
    </div>
  );
}
