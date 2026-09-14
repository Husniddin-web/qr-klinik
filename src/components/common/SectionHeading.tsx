import React from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { EkgMark } from "./EkgMark";

export interface SectionHeadingProps {
  /** Kichik qizil yorliq (sarlavha ustida). */
  eyebrow?: string;
  /** Eski nom — `eyebrow` bilan bir xil. */
  badge?: string;
  title: string;
  /** Sarlavhadagi urg'uli so'z(lar) — serif italic, qizil. `title` ichida bo'lishi shart emas. */
  accent?: string;
  subtitle?: string;
  align?: "left" | "center";
  /** Qorong'i fon ustida (Services, Contact). */
  tone?: "light" | "dark";
  /** O'ng tomonda amal (havola/tugma) — faqat `align="left"` bilan. */
  action?: React.ReactNode;
  /** h2 o'rniga boshqa daraja kerak bo'lsa. */
  as?: "h1" | "h2" | "h3";
  size?: "md" | "lg";
  className?: string;
}

/**
 * Yagona section sarlavha tizimi.
 *
 *   ┌ EKG belgisi + EYEBROW (kichik, qizil, kerning)
 *   ├ Sarlavha — Manrope display, title-case, ixtiyoriy serif-italic aksent so'z
 *   └ Subtitle — muted, max 2 qator
 *
 * Bitta section = bitta shu komponent. UPPERCASE + qizil chiziq patterni yo'q.
 */
export function SectionHeading({
  eyebrow,
  badge,
  title,
  accent,
  subtitle,
  align = "left",
  tone = "light",
  action,
  as: Tag = "h2",
  size = "md",
  className,
}: SectionHeadingProps) {
  const label = eyebrow || badge;
  const dark = tone === "dark";
  const centered = align === "center";

  return (
    <div
      className={cn(
        "mb-12 sm:mb-14 lg:mb-16",
        centered
          ? "mx-auto text-center max-w-3xl"
          : "flex flex-col md:flex-row md:items-end md:justify-between gap-6",
        className
      )}
    >
      <div className={cn(centered ? "" : "max-w-2xl")}>
        {label && (
          <Reveal
            as="span"
            variant="fade"
            className={cn(
              "inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] mb-4",
              dark ? "text-red-400" : "text-accent"
            )}
          >
            <EkgMark className={dark ? "text-red-400/80" : "text-accent/80"} />
            {label}
          </Reveal>
        )}

        <Reveal
          as={Tag}
          delay={0.05}
          className={cn(
            "font-display font-bold tracking-[-0.02em] leading-[1.08] text-balance",
            size === "lg"
              ? "text-[2.25rem] sm:text-5xl lg:text-[3.5rem]"
              : "text-[2rem] sm:text-4xl lg:text-[2.75rem]",
            dark ? "text-white" : "text-ink"
          )}
        >
          {title}
          {accent && (
            <>
              {" "}
              <span
                className={cn(
                  "font-serif-accent italic font-medium",
                  dark ? "text-red-400" : "text-accent"
                )}
              >
                {accent}
              </span>
            </>
          )}
        </Reveal>

        {subtitle && (
          <Reveal
            as="p"
            delay={0.12}
            className={cn(
              "mt-4 sm:mt-5 text-[15px] sm:text-base leading-relaxed max-w-xl text-pretty",
              centered && "mx-auto",
              dark ? "text-slate-400" : "text-slate-600"
            )}
          >
            {subtitle}
          </Reveal>
        )}
      </div>

      {action && !centered && (
        <Reveal delay={0.15} className="shrink-0 md:pb-1">
          {action}
        </Reveal>
      )}
    </div>
  );
}
