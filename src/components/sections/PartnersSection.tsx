"use client";

import React from "react";
import { PARTNERS_DATA } from "@/data/partners";
import { Container } from "../common/Container";

export function PartnersSection() {
  return (
    <section className="py-20 bg-slate-50/80 border-b border-slate-200">
      <Container>
        <div
          data-aos="fade-down"
          data-aos-duration="700"
          className="text-center mb-10"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#dc2626]">
            Xalqaro Tibbiy Standartlar
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#0f172a] tracking-tight mt-1.5">
            Jahonning Yetakchi Texnologik Hamkorlari
          </h3>
        </div>

        {/* Partners Grid / Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 items-center justify-center">
          {PARTNERS_DATA.map((partner, idx) => (
            <div
              key={partner.id}
              data-aos="zoom-in"
              data-aos-delay={(idx + 1) * 70}
              data-aos-duration="600"
              className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-[#0f172a] hover:shadow-xs transition-all duration-200 flex flex-col items-center justify-center text-center h-24 group col-span-1 last:col-span-2 sm:last:col-span-1"
            >
              <div className="text-xs font-extrabold text-[#0f172a] group-hover:text-[#dc2626] transition-colors leading-tight tracking-wide">
                {partner.logoText}
              </div>
              <div className="text-[10px] text-slate-400 font-medium mt-1">
                {partner.type}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
