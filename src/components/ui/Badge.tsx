import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "accent" | "success" | "neutral";
}

export function Badge({
  className,
  variant = "neutral",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    neutral: "bg-slate-100 text-slate-700 border-slate-200",
    primary: "bg-blue-50 text-blue-800 border-blue-200/60",
    accent: "bg-red-50 text-red-700 border-red-200/60",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
