"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Calendar, ArrowRight, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  m,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { MagneticButton } from "../common/MagneticButton";
import { EASE, DUR, STAGGER, SCROLL_SPRING } from "@/lib/animations";

/** Sarlavha so'zlari niqob ortidan ko'tariladi (mask reveal). */
const wordContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: STAGGER.tight, delayChildren: 0.2 },
  },
};

const wordMask = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: DUR.slow, ease: EASE },
  },
};

interface HeroSectionProps {
  onOpenAppointment: () => void;
}

export function HeroSection({ onOpenAppointment }: HeroSectionProps) {
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll bilan bog'langan parallax: hero ichida 0 → 1
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const smooth = useSpring(scrollYProgress, SCROLL_SPRING);

  // Fon rasm matndan sekinroq siljiydi → chuqurlik illyuziyasi
  const bgY = useTransform(smooth, [0, 1], ["0%", "18%"]);
  const bgScale = useTransform(smooth, [0, 1], [1, 1.12]);
  // Matn tezroq chiqib ketadi va so'nadi
  const contentY = useTransform(smooth, [0, 1], [0, -70]);
  const contentOpacity = useTransform(smooth, [0, 0.55], [1, 0]);

  const parallax = shouldReduceMotion ? {} : { y: bgY, scale: bgScale };
  const contentParallax = shouldReduceMotion
    ? {}
    : { y: contentY, opacity: contentOpacity };

  const renderWords = (text: string, accent = false) =>
    text.split(" ").map((word, i) => (
      // Har bir so'z uchun overflow-hidden "niqob"
      <span key={i} className="inline-block overflow-hidden align-bottom">
        <m.span
          variants={wordMask}
          className={`inline-block mr-[0.25em] last:mr-0 ${accent ? "text-[#dc2626]" : ""}`}
        >
          {word}
        </m.span>
      </span>
    ));

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen min-h-[100dvh] w-full max-w-full flex items-center overflow-hidden bg-white pt-20 sm:pt-24"
    >
      {/* ---------- Fon: parallax + sekin Ken Burns zoom ---------- */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <m.div style={parallax} className="absolute inset-[-8%] will-change-transform">
          {/* Ken Burns: 24 soniyada 1 → 1.06, sezilmaydi lekin kadr "tirik" bo'ladi */}
          <m.div
            animate={shouldReduceMotion ? undefined : { scale: [1, 1.06, 1] }}
            transition={{ duration: 24, ease: "easeInOut", repeat: Infinity }}
            className="relative w-full h-full"
          >
            <Image
              src="/main-hero.png"
              alt="QAXRAMON-RAXIMJON tibbiyot markazi shifokorlar jamoasi"
              fill
              priority
              sizes="100vw"
              quality={85}
              className="object-cover object-[75%_center] sm:object-right lg:object-center"
            />
          </m.div>
        </m.div>

        {/* Mobil uchun yumshoq gradient niqob — matn o'qilishi 100% saqlanadi */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent lg:hidden" />
      </div>

      {/* ---------- O'ng yuqoridagi qo'lyozma izoh ---------- */}
      <m.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.75, duration: DUR.slow, ease: EASE }}
        className="hidden lg:block absolute top-28 sm:top-32 right-10 lg:right-20 xl:right-28 text-right pointer-events-none select-none z-10"
      >
        <div className="font-serif italic text-[#0f172a] text-lg sm:text-xl xl:text-2xl font-bold leading-snug tracking-wide">
          <span>{t("note1")}</span>
          <br />
          <span>{t("note2")}</span>
          <br />
          <span className="text-[#dc2626]">{t("note3")}</span>
        </div>
        {/* Ostidagi chiziq qo'lda chizilgandek paydo bo'ladi */}
        <svg
          className="w-28 h-5 ml-auto text-[#0f172a] mt-1 opacity-85"
          viewBox="0 0 100 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <m.path
            d="M5 12 Q 50 18, 95 8"
            strokeLinecap="round"
            strokeDasharray="3 3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.1, duration: 0.8, ease: EASE }}
          />
        </svg>
      </m.div>

      {/* ---------- Asosiy kontent ---------- */}
      <m.div
        style={contentParallax}
        className="relative z-10 w-full max-w-full px-4 sm:px-10 md:px-14 lg:px-16 xl:px-24 2xl:px-32 pb-6 will-change-transform"
      >
        <div className="max-w-xl lg:max-w-2xl xl:max-w-[700px] flex flex-col items-start w-full">
          <m.h1
            variants={wordContainer}
            initial="hidden"
            animate="visible"
            className="text-[24px] xs:text-[28px] sm:text-4xl md:text-5xl lg:text-[50px] xl:text-[56px] font-extrabold tracking-tight leading-[1.2] sm:leading-[1.14] text-[#0f172a] max-w-full"
          >
            <span className="block">{renderWords(t("title"))}</span>
            <span className="block mt-1 sm:mt-2">{renderWords(t("titleHighlight"), true)}</span>
          </m.h1>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: DUR.base, ease: EASE }}
            className="mt-6 sm:mt-8"
          >
            <MagneticButton
              onClick={onOpenAppointment}
              strength={14}
              glow
              className="px-7 sm:px-8 py-3.5 rounded-full bg-[#dc2626] hover:bg-[#b91c1c] text-white text-sm sm:text-base font-bold transition-colors duration-200 shadow-xl shadow-red-600/30 flex items-center gap-2.5 active:scale-95 cursor-pointer"
            >
              <Calendar className="w-4 h-4 shrink-0" />
              <span>{t("btnAppointment")}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </MagneticButton>
          </m.div>
        </div>
      </m.div>

      {/* ---------- Pastga scroll ishorasi ---------- */}
      <m.div
        style={shouldReduceMotion ? {} : { opacity: contentOpacity }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-1.5 pointer-events-none"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-slate-400 font-semibold">
          Pastga
        </span>
        <m.span
          animate={shouldReduceMotion ? undefined : { y: [0, 7, 0] }}
          transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
          className="w-7 h-7 rounded-full border border-slate-300 bg-white/70 backdrop-blur-sm flex items-center justify-center text-slate-500"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </m.span>
      </m.div>
    </section>
  );
}
