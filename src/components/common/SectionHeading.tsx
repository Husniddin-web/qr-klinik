import React from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export interface SectionHeadingProps {
  eyebrow?: string;
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  badge,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  const label = eyebrow || badge;

  return (
    <div
      className={cn(
        "max-w-3xl mb-12 sm:mb-16",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {label && (
        <Reveal
          as="span"
          variant="down"
          delay={0.1}
          className="inline-block text-xs font-bold uppercase tracking-widest text-[#dc2626] mb-2.5"
        >
          {label}
        </Reveal>
      )}
      <Reveal
        as="h2"
        delay={0.2}
        className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0f172a] tracking-tight leading-tight"
      >
        {title}
      </Reveal>
      {subtitle && (
        <Reveal
          as="p"
          delay={0.3}
          className={cn(
            "mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl",
            align === "center" ? "mx-auto" : ""
          )}
        >
          {subtitle}
        </Reveal>
      )}
    </div>
  );
}
