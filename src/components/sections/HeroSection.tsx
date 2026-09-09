"use client";

import React from "react";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface HeroSectionProps {
  onOpenAppointment: () => void;
}

export function HeroSection({ onOpenAppointment }: HeroSectionProps) {
  const t = useTranslations("hero");

  return (
    <section
      id="hero"
      className="relative h-screen min-h-[100dvh] w-full max-w-full flex items-center overflow-hidden bg-white pt-20 sm:pt-24"
    >
      {/* Background Graphic & Doctors Photo (Eski Original Style) */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="/main-hero.png"
          alt="QAXRAMON-RAXIMJON tibbiyot markazi shifokorlar jamoasi"
          fill
          priority
          unoptimized
          className="object-cover object-[75%_center] sm:object-right lg:object-center"
        />

        {/* Soft gradient mask for mobile to keep text 100% readable over background */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent lg:hidden" />
      </div>

      {/* Top-Right Handwritten Script Note */}
      <div
        data-aos="fade-left"
        data-aos-delay="400"
        data-aos-duration="850"
        className="hidden lg:block absolute top-28 sm:top-32 right-10 lg:right-20 xl:right-28 text-right pointer-events-none select-none z-10"
      >
        <div className="font-serif italic text-[#0f172a] text-lg sm:text-xl xl:text-2xl font-bold leading-snug tracking-wide">
          <span>{t("note1")}</span><br />
          <span>{t("note2")}</span><br />
          <span className="text-[#dc2626]">{t("note3")}</span>
        </div>
        <svg
          className="w-28 h-5 ml-auto text-[#0f172a] mt-1 opacity-85"
          viewBox="0 0 100 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M5 12 Q 50 18, 95 8" strokeLinecap="round" strokeDasharray="3 3" />
        </svg>
      </div>

      {/* Main Content Area: Shifted to the left */}
      <div className="relative z-10 w-full max-w-full px-4 sm:px-10 md:px-14 lg:px-16 xl:px-24 2xl:px-32 overflow-hidden">
        <div className="max-w-xl lg:max-w-2xl xl:max-w-[700px] flex flex-col items-start w-full">

          {/* Headline: Concise 2 lines */}
          <h1
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="850"
            className="text-[24px] xs:text-[28px] sm:text-4xl md:text-5xl lg:text-[50px] xl:text-[56px] font-extrabold tracking-tight leading-[1.2] sm:leading-[1.14] text-[#0f172a] max-w-full"
          >
            <span className="block whitespace-normal sm:whitespace-nowrap">
              {t("title")}
            </span>
            <span className="block text-[#dc2626] mt-1 sm:mt-2">
              {t("titleHighlight")}
            </span>
          </h1>

          {/* Subtitle: Shortened and clean */}
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="850"
            className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed font-normal max-w-md"
          >
            {t("subtitle")}
          </p>

          {/* Action Button: Single Solid Red CTA */}
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            data-aos-duration="850"
            className="mt-6 sm:mt-8"
          >
            <button
              type="button"
              onClick={onOpenAppointment}
              className="px-7 sm:px-8 py-3.5 rounded-full bg-[#dc2626] hover:bg-[#b91c1c] text-white text-sm sm:text-base font-bold transition-all duration-200 shadow-lg shadow-red-500/25 flex items-center gap-2.5 active:scale-95 cursor-pointer"
            >
              <Calendar className="w-4 h-4 shrink-0" />
              <span>{t("btnAppointment")}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
