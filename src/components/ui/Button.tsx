import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "accent" | "outline" | "ghost" | "secondary";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-xl active:scale-[0.98]";

    const sizeStyles = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5",
      md: "text-sm px-5 py-2.5 gap-2",
      lg: "text-base px-6 py-3.5 gap-2.5 font-semibold",
    };

    const variantStyles = {
      // Primary: Deep Navy Blue
      primary:
        "bg-[#0f172a] text-white hover:bg-[#1e293b] shadow-sm hover:shadow-md",
      // Accent: Crimson Red (Plan.txt talabi: faqat muhim CTA lar uchun)
      accent:
        "bg-[#dc2626] text-white hover:bg-[#b91c1c] shadow-sm hover:shadow-md hover:shadow-red-500/20",
      // Outline
      outline:
        "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-300 shadow-sm",
      // Ghost
      ghost:
        "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
      // Secondary: Soft Navy Tint
      secondary:
        "bg-slate-100 text-slate-800 hover:bg-slate-200",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
