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
import { SectionHeading } from "../common/SectionHeading";
import { RevealGroup, RevealItem } from "../common/Reveal";
import { SPRING } from "@/lib/animations";

interface DepartmentsSectionProps {
  onSelectDepartment?: (deptId: string) => void;
  /** Backend'dan (server component orqali). Berilmasa static fallback. */
  departments?: IDepartment[];
}

/**
 * Klinika bo'limlari — bir xil o'lchamdagi 3 ustunli kartalar (TiltCard).
 * Hover'da kartochka chegarasi bo'ylab qizil chiziq chiziladi (`.trace-rect`, CSS).
 */
export function DepartmentsSection({ onSelectDepartment, departments = DEPARTMENTS_DATA }: DepartmentsSectionProps) {
  const t = useTranslations("departments");
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="departments"
      className="relative section-pad bg-canvas-soft overflow-hidden select-none border-b border-slate-100"
    >
      <Container className="relative z-10">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
          action={
            <a
              href="#services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-accent transition-colors"
            >
              {t("viewServices")}
              <ArrowRight className="w-4 h-4" />
            </a>
          }
        />

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
                    className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-red-50/80 border border-slate-100 flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.03)] mb-4 transition-shadow duration-300 group-hover:shadow-md"
                  >
                    <Department3DIcon id={dept.id} image={dept.image} className="w-9 h-9 sm:w-10 sm:h-10" />
                  </m.div>

                  <h3 className="text-lg sm:text-xl font-bold text-ink group-hover:text-accent transition-colors leading-snug tracking-tight">
                    {dept.name}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed mt-2 line-clamp-2 font-normal">
                    {dept.shortDescription}
                  </p>
                </div>

                <div className="pt-3.5 mt-4 border-t border-slate-100 flex items-center justify-between">
                  {/* Hover'da chapdan chiqadigan "Xizmatlar" yorlig'i */}
                  <span className="text-[11px] font-bold uppercase tracking-wider text-accent opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    Xizmatlar
                  </span>
                  <div
                    role="button"
                    aria-label={`${dept.name} xizmatlari`}
                    className="w-9 h-9 rounded-full bg-accent group-hover:bg-accent-hover text-white flex items-center justify-center shadow-md shadow-red-600/25 group-hover:scale-105 active:scale-95 transition-all duration-200"
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
