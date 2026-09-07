"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { DEPARTMENTS_DATA } from "@/data/departments";
import { Department3DIcon } from "../common/Department3DIcon";
import { Container } from "../common/Container";

interface DepartmentsSectionProps {
  onSelectDepartment?: (deptId: string) => void;
}

export function DepartmentsSection({ onSelectDepartment }: DepartmentsSectionProps) {
  const t = useTranslations("departments");

  return (
    <section
      id="departments"
      className="relative py-24 sm:py-32 bg-[#fafbfc] overflow-hidden select-none border-b border-slate-100"
    >
      {/* Ambient Lighting & Glow Gradients to prevent flat white look */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Soft center-top rose glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-b from-red-100/40 via-red-50/15 to-transparent blur-3xl" />
        {/* Left ambient glow */}
        <div className="absolute -left-20 top-28 w-[420px] h-[420px] bg-red-100/30 rounded-full blur-3xl" />
        {/* Right ambient slate glow */}
        <div className="absolute -right-20 top-60 w-[500px] h-[500px] bg-slate-200/40 rounded-full blur-3xl" />
      </div>

      {/* Decorative 3D Spheres & Orbital Ring Graphic on Left (matching reference design) */}
      <div className="hidden lg:block absolute -left-12 top-24 pointer-events-none select-none z-0">
        <svg className="w-[360px] h-[360px] opacity-35" viewBox="0 0 320 320" fill="none">
          <ellipse
            cx="160"
            cy="160"
            rx="145"
            ry="65"
            stroke="#dc2626"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            transform="rotate(-28 160 160)"
          />
          <ellipse cx="160" cy="160" rx="155" ry="95" stroke="#cbd5e1" strokeWidth="1" />
        </svg>

        {/* 3D Glossy Floating Red Sphere */}
        <div className="absolute left-24 top-20 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-red-400 via-[#dc2626] to-[#7f1d1d] shadow-[0_20px_45px_-5px_rgba(220,38,38,0.45)]">
          {/* Specular gloss reflection highlight */}
          <div className="absolute top-2.5 left-3.5 w-6 h-4 rounded-full bg-white/60 blur-[1px] transform -rotate-45" />
        </div>

        {/* Small satellite pearl orb */}
        <div className="absolute left-48 top-44 w-6 h-6 rounded-full bg-gradient-to-br from-red-300 to-red-700 shadow-md shadow-red-500/30" />
      </div>

      {/* Right Vertical Decorative Label (matching reference design) */}
      <div className="hidden xl:flex flex-col items-center gap-3 absolute right-6 bottom-20 text-slate-400 pointer-events-none select-none z-10">
        <span className="[writing-mode:vertical-lr] rotate-180 text-[11px] font-semibold tracking-[0.2em] text-slate-400/85 uppercase">
          Sog&apos;lom kelajak uchun
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-slate-300 to-transparent" />
      </div>

      <Container className="relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 px-4">
          <h2
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.2] text-[#0f172a] uppercase"
          >
            <span className="block">{t("title")}</span>
            <span className="block text-[#dc2626] mt-1 sm:mt-1.5">{t("titleHighlight")}</span>
          </h2>

          <div
            data-aos="zoom-in"
            data-aos-delay="240"
            className="w-12 h-1 bg-[#dc2626] mx-auto rounded-full mt-4 mb-4"
          />

          <p
            data-aos="fade-up"
            data-aos-delay="300"
            className="text-slate-600 text-xs sm:text-sm md:text-base font-normal max-w-2xl mx-auto leading-relaxed"
          >
            {t("subtitle")}
          </p>
        </div>

        {/* 3-Column Luxury Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {DEPARTMENTS_DATA.map((dept, idx) => {
            return (
              <div
                key={dept.id}
                onClick={() => onSelectDepartment?.(dept.id)}
                data-aos="fade-up"
                data-aos-delay={((idx % 3) + 1) * 80}
                data-aos-duration="650"
                className="group cursor-pointer rounded-2xl sm:rounded-[22px] p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between relative bg-white/95 border border-slate-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.03)] hover:shadow-[0_16px_35px_rgba(220,38,38,0.1)] hover:border-red-200 hover:-translate-y-1 backdrop-blur-md"
              >
                <div>
                  {/* 3D Glossy Icon Container */}
                  <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-red-50/90 via-white to-slate-50 border border-slate-100 flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.03)] mb-4 group-hover:scale-105 group-hover:shadow-md transition-all duration-300">
                    <Department3DIcon id={dept.id} image={dept.image} className="w-9 h-9 sm:w-10 sm:h-10" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-[#0f172a] group-hover:text-[#dc2626] transition-colors leading-snug tracking-tight">
                    {dept.name}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed mt-2 line-clamp-2 font-normal">
                    {dept.shortDescription}
                  </p>
                </div>

                {/* Bottom Row with Circular Red Action Button */}
                <div className="pt-3.5 mt-4 border-t border-slate-100 flex items-center justify-end">
                  <div
                    role="button"
                    aria-label={`${dept.name} xizmatlari`}
                    className="w-9 h-9 rounded-full bg-[#dc2626] group-hover:bg-[#b91c1c] text-white flex items-center justify-center shadow-md shadow-red-600/25 group-hover:scale-105 active:scale-95 transition-all duration-200"
                  >
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

