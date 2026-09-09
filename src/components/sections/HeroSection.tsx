"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Calendar,
  ArrowRight,
  ShieldCheck,
  Clock,
  Activity,
  Users,
  Star,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "../common/Container";

interface HeroSectionProps {
  onOpenAppointment: () => void;
}

export function HeroSection({ onOpenAppointment }: HeroSectionProps) {
  const t = useTranslations("hero");

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center bg-white overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 border-b border-slate-100"
    >
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-bl from-red-50/70 via-slate-50/40 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-gradient-to-tr from-slate-100/50 via-transparent to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <Container className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-16 items-center">
          {/* ================= LEFT COLUMN: Value Proposition ================= */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#dc2626] text-xs font-bold tracking-wide uppercase mb-4 sm:mb-5 shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-[#dc2626] animate-pulse" />
              <span>{t("badge")}</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-3xl xs:text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight leading-[1.14] text-[#0f172a]"
            >
              <span className="block">{t("title")}</span>
              <span className="text-[#dc2626] block mt-1">
                {t("titleHighlight")}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-xl font-normal"
            >
              {t("subtitle")}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="mt-7 sm:mt-9 flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto"
            >
              <button
                type="button"
                onClick={onOpenAppointment}
                className="w-full sm:w-auto px-7 sm:px-8 py-3.5 rounded-full bg-[#dc2626] hover:bg-[#b91c1c] text-white text-sm sm:text-base font-bold transition-all duration-200 shadow-lg shadow-red-600/25 flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer"
              >
                <Calendar className="w-4 h-4 shrink-0" />
                <span>{t("btnAppointment")}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <a
                href="#services"
                className="w-full sm:w-auto px-6 sm:px-7 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm sm:text-base font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t("btnServices")}</span>
              </a>
            </motion.div>

            {/* Trust Proof Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="mt-8 sm:mt-10 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-5 sm:gap-7 text-xs sm:text-sm text-slate-600 w-full"
            >
              {/* Rating */}
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
                <span className="font-extrabold text-slate-900">
                  {t("reviewsRating")}
                </span>
                <span className="text-slate-400 text-xs">
                  {t("reviewsCount")}
                </span>
              </div>

              <div className="w-px h-3.5 bg-slate-200 hidden sm:block" />

              {/* Experience */}
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#dc2626] shrink-0" />
                <span className="font-semibold text-slate-700">
                  {t("trustExperience")}
                </span>
              </div>

              <div className="w-px h-3.5 bg-slate-200 hidden sm:block" />

              {/* 24/7 */}
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-semibold text-slate-700">
                  {t("trustEmergency")}
                </span>
              </div>
            </motion.div>
          </div>

          {/* ================= RIGHT COLUMN: Aesthetic Single Photo Frame ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 relative w-full max-w-[500px] lg:max-w-none mx-auto"
          >
            {/* Atmospheric Outer Glow */}
            <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-tr from-red-100/60 via-slate-100/40 to-transparent rounded-[32px] blur-2xl -z-10" />

            {/* Standalone Master Image Frame */}
            <div className="relative aspect-[4/3] sm:aspect-[14/11] lg:aspect-[1/1.05] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.12)] border-4 border-white bg-slate-100">
              <Image
                src="/images/main-hero.jpeg"
                alt="QAXRAMON-RAXIMJON Klinikasi shifokorlari"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-[center_22%] hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Subtle gradient vignette at the bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Glass Badge 1: 3.0T MRT */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              className="absolute -top-3 -left-3 sm:-left-6 bg-white/95 backdrop-blur-md px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 z-10 hover:shadow-2xl transition-shadow"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Activity className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs sm:text-[13px] font-bold text-slate-900 leading-tight">
                  {t("badgeMrtTitle")}
                </p>
                <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">
                  {t("badgeMrtSubtitle")}
                </p>
              </div>
            </motion.div>

            {/* Floating Glass Badge 2: Experienced Doctors */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: -10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65, ease: "easeOut" }}
              className="absolute -bottom-3 -right-3 sm:-right-6 bg-white/95 backdrop-blur-md px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 z-10 hover:shadow-2xl transition-shadow"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-red-50 text-[#dc2626] flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs sm:text-[13px] font-bold text-slate-900 leading-tight">
                  {t("badgeDoctorTitle")}
                </p>
                <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">
                  {t("badgeDoctorSubtitle")}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
