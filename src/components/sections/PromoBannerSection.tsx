"use client";

import React from "react";
import { Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "../common/Container";
import { Reveal } from "../common/Reveal";

interface PromoBannerSectionProps {
  onOpenAppointment: () => void;
}

export function PromoBannerSection({ onOpenAppointment }: PromoBannerSectionProps) {
  const t = useTranslations("promo");

  return (
    <section className="py-14 bg-white border-b border-slate-100">
      <Container>
        <Reveal
          variant="zoom"
          duration={0.7}
          className="rounded-3xl bg-[#0f172a] text-white p-8 sm:p-12 lg:p-14 border border-slate-800 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative overflow-hidden"
        >
          <Reveal variant="left" delay={0.2} className="space-y-3 max-w-2xl text-left z-10">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#dc2626]">
              {t("badge")}
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
              {t("title")}
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              {t("subtitle")}
            </p>
          </Reveal>

          <Reveal
            variant="right"
            delay={0.3}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6 shrink-0 z-10 pt-2 lg:pt-0"
          >
            <div className="text-left sm:text-right">
              <span className="text-xs text-slate-400 block line-through font-medium">
                {t("oldPrice")}
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {t("newPrice")}
              </span>
            </div>

            <button
              type="button"
              onClick={onOpenAppointment}
              className="px-7 py-3.5 rounded-full bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold text-sm transition-all duration-200 shadow-lg shadow-[#dc2626]/30 active:scale-95 cursor-pointer flex items-center gap-2 shrink-0"
            >
              <Calendar className="w-4 h-4" />
              <span>{t("btn")}</span>
            </button>
          </Reveal>
        </Reveal>
      </Container>
    </section>
  );
}
