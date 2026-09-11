"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { m, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { DEPARTMENTS_DATA } from "@/data/departments";
import type { IDepartment } from "@/types";
import { Department3DIcon } from "../common/Department3DIcon";
import { Container } from "../common/Container";
import { TiltCard } from "../common/TiltCard";
import { AnimatedDivider } from "../common/AnimatedDivider";
import { Reveal, RevealGroup, RevealItem } from "../common/Reveal";
import { SPRING } from "@/lib/animations";

interface DepartmentsSectionProps {
  onSelectDepartment?: (deptId: string) => void;
  /** Backend'dan (server component orqali). Berilmasa static fallback. */
  departments?: IDepartment[];
}

export function DepartmentsSection({ onSelectDepartment, departments = DEPARTMENTS_DATA }: DepartmentsSectionProps) {
  const t = useTranslations("departments");
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="departments"
      className="relative py-24 sm:py-32 bg-[#fafbfc] overflow-hidden select-none border-b border-slate-100"
    >
      {/* Ambient yorug'lik */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-b from-red-100/40 via-red-50/15 to-transparent blur-3xl" />
        <div className="absolute -left-20 top-28 w-[420px] h-[420px] bg-red-100/30 rounded-full blur-3xl" />
        <div className="absolute -right-20 top-60 w-[500px] h-[500px] bg-slate-200/40 rounded-full blur-3xl" />
      </div>

      {/* Dekorativ orbital sfera — sekin suzadi */}
      <div className="hidden lg:block absolute -left-12 top-24 pointer-events-none select-none z-0">
        <m.svg
          animate={shouldReduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 90, ease: "linear", repeat: Infinity }}
          className="w-[360px] h-[360px] opacity-35"
          viewBox="0 0 320 320"
          fill="none"
        >
          <ellipse cx="160" cy="160" rx="145" ry="65" stroke="#dc2626" strokeWidth="1.2" strokeDasharray="4 4" transform="rotate(-28 160 160)" />
          <ellipse cx="160" cy="160" rx="155" ry="95" stroke="#cbd5e1" strokeWidth="1" />
        </m.svg>

        <m.div
          animate={shouldReduceMotion ? undefined : { y: [0, -12, 0] }}
          transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
          className="absolute left-24 top-20 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-red-400 via-[#dc2626] to-[#7f1d1d] shadow-[0_20px_45px_-5px_rgba(220,38,38,0.45)]"
        >
          <div className="absolute top-2.5 left-3.5 w-6 h-4 rounded-full bg-white/60 blur-[1px] transform -rotate-45" />
        </m.div>

        <m.div
          animate={shouldReduceMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, delay: 1 }}
          className="absolute left-48 top-44 w-6 h-6 rounded-full bg-gradient-to-br from-red-300 to-red-700 shadow-md shadow-red-500/30"
        />
      </div>

      <div className="hidden xl:flex flex-col items-center gap-3 absolute right-6 bottom-20 text-slate-400 pointer-events-none select-none z-10">
        <span className="[writing-mode:vertical-lr] rotate-180 text-[11px] font-semibold tracking-[0.2em] text-slate-400/85 uppercase">
          Sog&apos;lom kelajak uchun
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-slate-300 to-transparent" />
      </div>

      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 px-4">
          <Reveal as="h2" delay={0.1} className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.2] text-[#0f172a] uppercase">
            {t("title")}
          </Reveal>
          <AnimatedDivider />
        </div>

        <RevealGroup stagger={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {departments.map((dept) => (
            <RevealItem key={dept.id} variant="zoom" className="h-full">
              <TiltCard
                onClick={() => onSelectDepartment?.(dept.id)}
                maxTilt={6}
                glare
                className="group cursor-pointer rounded-2xl sm:rounded-[22px] p-5 sm:p-6 transition-colors duration-200 flex flex-col justify-between h-full bg-white/95 border border-slate-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.03)] hover:shadow-[0_20px_40px_rgba(220,38,38,0.12)] backdrop-blur-md overflow-hidden"
              >
                {/* ---- Border trace: hover'da qizil chiziq kartochka atrofini aylanib chiqadi ----
                     `pathLength="1"` → dasharray/dashoffset 0–1 normallashgan, kartochka o'lchamiga bog'liq emas.
                     Animatsiya globals.css'dagi `.trace-rect` orqali (CSS, GPU, JSsiz). */}
                <svg
                  aria-hidden
                  className="pointer-events-none absolute inset-0 w-full h-full z-20"
                  fill="none"
                >
                  <rect
                    x="1"
                    y="1"
                    style={{ width: "calc(100% - 2px)", height: "calc(100% - 2px)" }}
                    rx="21"
                    ry="21"
                    pathLength={1}
                    stroke="#dc2626"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="trace-rect"
                  />
                </svg>

                <div>
                  <m.div
                    whileHover={shouldReduceMotion ? undefined : { rotate: 12, scale: 1.12 }}
                    transition={SPRING.snappy}
                    className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-red-50/90 via-white to-slate-50 border border-slate-100 flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.03)] mb-4 transition-shadow duration-300 group-hover:shadow-md"
                  >
                    <Department3DIcon id={dept.id} image={dept.image} className="w-9 h-9 sm:w-10 sm:h-10" />
                  </m.div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#0f172a] group-hover:text-[#dc2626] transition-colors leading-snug tracking-tight">
                    {dept.name}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed mt-2 line-clamp-2 font-normal">
                    {dept.shortDescription}
                  </p>
                </div>

                <div className="pt-3.5 mt-4 border-t border-slate-100 flex items-center justify-between">
                  {/* Hover'da chapdan chiqadigan "Batafsil" yorlig'i */}
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#dc2626] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    Xizmatlar
                  </span>
                  <div
                    role="button"
                    aria-label={`${dept.name} xizmatlari`}
                    className="w-9 h-9 rounded-full bg-[#dc2626] group-hover:bg-[#b91c1c] text-white flex items-center justify-center shadow-md shadow-red-600/25 group-hover:scale-105 active:scale-95 transition-all duration-200"
                  >
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </TiltCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
