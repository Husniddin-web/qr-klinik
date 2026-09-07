"use client";

import React from "react";
import Image from "next/image";
import { ChevronRight, Home } from "lucide-react";
import { Link } from "@/i18n/routing";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  bgImage: string;
  breadcrumbs: BreadcrumbItem[];
}

export function PageHero({
  title,
  description,
  bgImage,
  breadcrumbs,
}: PageHeroProps) {
  return (
    <section className="relative w-full min-h-[300px] sm:min-h-[380px] lg:min-h-[440px] flex items-center justify-center overflow-hidden bg-[#070e1e] pt-24 sm:pt-28 pb-14 sm:pb-20">
      {/* Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt={title}
          fill
          priority
          className="object-cover object-center scale-105 transform motion-safe:animate-subtle-zoom"
          sizes="100vw"
        />
        {/* Layer 1: Atmospheric Navy Gradient allowing background image to be clearly seen */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#060b18]/70 via-[#0a1224]/45 to-[#060b18]/70" />
        {/* Layer 2: Vertical Vignette for legibility and bottom wave transition */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060b18]/65 via-black/15 to-[#070e1e]/95" />
        {/* Layer 3: Subtle Red & Cyan ambient medical glow */}
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Decorative Grid Pattern Overlay */}
      <div
        className="absolute inset-0 z-[1] opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">

        {/* Main Headline */}
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight max-w-4xl leading-[1.18] sm:leading-[1.15] mb-3 sm:mb-5 drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]">
          {title}
        </h1>

        {/* Optional Description */}
        {description && (
          <p className="text-xs sm:text-base md:text-lg text-slate-200 max-w-2xl font-normal leading-relaxed mb-5 sm:mb-7 text-balance drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            {description}
          </p>
        )}

        {/* Clean Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/10 text-[11px] sm:text-sm text-slate-300 max-w-full text-center"
        >
          <Link
            href="/"
            className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
          >
            <Home className="w-3.5 h-3.5 text-red-400" />
            <span className="font-medium">Bosh sahifa</span>
          </Link>

          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <React.Fragment key={crumb.label}>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                {crumb.href && !isLast ? (
                  <Link
                    href={crumb.href}
                    className="text-slate-300 hover:text-white transition-colors font-medium"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-bold text-red-400">
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </div>

      {/* Modern Wave Divider at Bottom */}
      <div className="absolute bottom-0 inset-x-0 z-10 pointer-events-none leading-none overflow-hidden">
        <svg
          viewBox="0 0 1200 40"
          preserveAspectRatio="none"
          className="w-full h-5 sm:h-8 text-[#f8fafc] fill-current"
        >
          <path d="M0,0 C300,35 900,35 1200,0 L1200,40 L0,40 Z" />
        </svg>
      </div>
    </section>
  );
}
