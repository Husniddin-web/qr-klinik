"use client";

import React from "react";
import { PARTNERS_DATA } from "@/data/partners";
import { Container } from "../common/Container";
import { useTranslations } from "next-intl";
import { Reveal } from "../common/Reveal";
import { SectionHeading } from "../common/SectionHeading";

export function PartnersSection() {
  const t = useTranslations("partners");
  const marqueePartners = [...PARTNERS_DATA, ...PARTNERS_DATA, ...PARTNERS_DATA];

  return (
    <section className="py-16 sm:py-20 bg-slate-50/90 border-b border-slate-200/80 overflow-hidden select-none">
      <Container>
        <SectionHeading align="center" as="h3" eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} className="mb-8 sm:mb-10" />
      </Container>

      <Reveal
        variant="fade"
        className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_12%,black_88%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_12%,black_88%,transparent_100%)]"
      >
        <div className="flex items-center gap-5 w-max animate-marquee-horizontal py-3 px-4 hover:[will-change:transform]">
          {marqueePartners.map((partner, idx) => (
            <div
              key={`${partner.id}-${idx}`}
              className="w-[210px] sm:w-[230px] shrink-0 h-24 px-5 py-4 rounded-2xl bg-white border border-slate-200/90 hover:border-red-200/90 hover:shadow-lg hover:shadow-red-500/5 hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-center justify-center text-center group cursor-pointer"
            >
              <span className="font-display text-xs sm:text-[13px] font-extrabold text-ink group-hover:text-accent transition-colors leading-tight tracking-wide">
                {partner.logoText}
              </span>
              <span className="text-[11px] text-slate-400 font-medium mt-1.5 line-clamp-1">
                {partner.type}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
