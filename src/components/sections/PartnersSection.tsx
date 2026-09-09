"use client";

import React from "react";
import { PARTNERS_DATA } from "@/data/partners";
import { Container } from "../common/Container";

export function PartnersSection() {
  // Duplicate partners array to ensure seamless infinite looping track
  const marqueePartners = [...PARTNERS_DATA, ...PARTNERS_DATA, ...PARTNERS_DATA];

  return (
    <section className="py-16 sm:py-20 bg-slate-50/90 border-b border-slate-200/80 overflow-hidden select-none">
      <Container>
        <div
          data-aos="fade-down"
          data-aos-duration="700"
          className="text-center mb-10"
        >
          <h3 className="text-xl sm:text-2xl font-black text-[#0f172a] tracking-tight uppercase">
            Hamkorlarimiz
          </h3>
          <div className="w-12 h-1 bg-[#dc2626] mx-auto rounded-full mt-3" />
        </div>
      </Container>

      {/* Infinite Horizontal Marquee Track with Edge Fade Masks */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_12%,black_88%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_12%,black_88%,transparent_100%)]">
        <div className="flex items-center gap-5 w-max animate-marquee-horizontal hover:[animation-play-state:paused] py-3 px-4">
          {marqueePartners.map((partner, idx) => (
            <div
              key={`${partner.id}-${idx}`}
              className="w-[210px] sm:w-[230px] shrink-0 h-24 px-5 py-4 rounded-2xl bg-white border border-slate-200/90 hover:border-red-200/90 hover:shadow-lg hover:shadow-red-500/5 transition-all duration-300 flex flex-col items-center justify-center text-center group cursor-pointer"
            >
              <span className="text-xs sm:text-[13px] font-extrabold text-[#0f172a] group-hover:text-[#dc2626] transition-colors leading-tight tracking-wide">
                {partner.logoText}
              </span>
              <span className="text-[11px] text-slate-400 font-medium mt-1.5 line-clamp-1">
                {partner.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

