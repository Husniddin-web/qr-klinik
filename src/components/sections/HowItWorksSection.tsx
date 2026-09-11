"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { m, AnimatePresence, useScroll, useMotionValueEvent, useTransform, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "../common/Container";
import { Reveal, RevealGroup, RevealItem } from "../common/Reveal";
import { AnimatedDivider } from "../common/AnimatedDivider";
import { EASE, DUR, SPRING } from "@/lib/animations";

const STEPS = [
  { step: "01", image: "/images/steps/step1-app.jpg", titleKey: "step1Title", descKey: "step1Desc" },
  { step: "02", image: "/images/steps/step2-doctor.jpg", titleKey: "step2Title", descKey: "step2Desc" },
  { step: "03", image: "/images/steps/step3-consult.jpg", titleKey: "step3Title", descKey: "step3Desc" },
  { step: "04", image: "/images/steps/step4-care.jpg", titleKey: "step4Title", descKey: "step4Desc" },
] as const;

type StepKey = (typeof STEPS)[number]["titleKey"] | (typeof STEPS)[number]["descKey"];

/**
 * "Qabul jarayoni" — sticky scroll storytelling.
 *
 * Desktop (lg+): section balandligi = 4 × 100vh. Ichki blok `sticky top-0` bo'lib
 * ekranda qoladi; foydalanuvchi scroll qilganda qadamlar almashadi:
 *   chapda — raqam + matn cross-fade, o'ngda — rasm cross-fade + engil zoom,
 *   chetda — vertikal progress rail.
 * Mobil: sticky'siz, oddiy vertikal ro'yxat (barmoq bilan scroll storytelling noqulay).
 *
 * Ishlash sababi: bitta `useScroll` → 0..1 progress → floor(progress * 4) = faol qadam.
 */
export function HowItWorksSection() {
  const t = useTranslations("howItWorks");
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(STEPS.length - 1, Math.floor(v * STEPS.length));
    if (idx !== active) setActive(idx);
  });

  // Progress rail: 0 → 100%
  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const heading = (
    <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-0">
      <Reveal as="h2" delay={0.1} className="text-2xl sm:text-4xl lg:text-[40px] font-black text-[#0f172a] tracking-tight leading-snug uppercase">
        {t("title")}
      </Reveal>
      <AnimatedDivider />
    </div>
  );

  return (
    <section className="relative bg-[#fafbfc] border-b border-slate-100">
      {/* ============ MOBIL / PLANSHET: oddiy ro'yxat ============ */}
      <div className="lg:hidden py-20 sm:py-24">
        <Container>
          {heading}
          <RevealGroup stagger={0.12} className="relative mt-4 space-y-8 pl-10">
            {/* Chap vertikal chiziq */}
            <span aria-hidden className="absolute left-[15px] top-2 bottom-2 w-px bg-slate-200" />
            {STEPS.map((s, i) => (
              <RevealItem key={s.step} variant="left" className="relative">
                <span className="absolute -left-10 top-0 w-8 h-8 rounded-full bg-[#dc2626] text-white text-[11px] font-black flex items-center justify-center ring-4 ring-[#fafbfc] shadow-md">
                  {i + 1}
                </span>
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-3 bg-slate-100 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
                  <Image src={s.image} alt={t(s.titleKey)} fill sizes="90vw" className="object-cover" />
                </div>
                <h3 className="text-lg font-bold text-[#0f172a] tracking-tight">{t(s.titleKey)}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mt-1.5">{t(s.descKey)}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </div>

      {/* ============ DESKTOP: sticky storytelling ============ */}
      <div
        ref={ref}
        className="hidden lg:block"
        style={{ height: shouldReduceMotion ? "auto" : `${STEPS.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen flex flex-col justify-center">
          <Container className="w-full">
            {heading}

            <div className="mt-10 grid grid-cols-12 gap-10 items-center">
              {/* Progress rail + raqamlar */}
              <div className="col-span-1 flex flex-col items-center gap-0 self-stretch relative">
                <div className="absolute inset-y-2 left-1/2 -translate-x-1/2 w-px bg-slate-200 overflow-hidden">
                  <m.div style={{ scaleY: railScale, originY: 0 }} className="w-full h-full bg-[#dc2626]" />
                </div>
                <div className="relative flex flex-col justify-between h-full py-2">
                  {STEPS.map((s, i) => {
                    const isActive = i === active;
                    const isPast = i < active;
                    return (
                      <m.button
                        key={s.step}
                        type="button"
                        aria-label={`${i + 1}-qadam`}
                        onClick={() => {
                          // Rail'dagi raqamga bosilsa — o'sha qadam pozitsiyasiga scroll
                          const el = ref.current;
                          if (!el) return;
                          const top = el.offsetTop + (el.offsetHeight - window.innerHeight) * (i / (STEPS.length - 1));
                          window.scrollTo({ top, behavior: shouldReduceMotion ? "auto" : "smooth" });
                        }}
                        animate={{ scale: isActive ? 1.15 : 1 }}
                        transition={SPRING.snappy}
                        className={`relative z-10 w-9 h-9 rounded-full text-[11px] font-black flex items-center justify-center ring-4 ring-[#fafbfc] transition-colors duration-300 cursor-pointer ${
                          isActive
                            ? "bg-[#dc2626] text-white shadow-lg shadow-red-600/30"
                            : isPast
                              ? "bg-[#0f172a] text-white"
                              : "bg-white text-slate-400 border border-slate-200"
                        }`}
                      >
                        {s.step}
                      </m.button>
                    );
                  })}
                </div>
              </div>

              {/* Matn */}
              <div className="col-span-5 relative min-h-[240px] flex items-center">
                <AnimatePresence mode="wait">
                  <m.div
                    key={active}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -28 }}
                    transition={{ duration: DUR.base, ease: EASE }}
                    className="text-left"
                  >
                    <span className="text-[80px] leading-none font-black text-slate-200/80 tabular-nums select-none">
                      {STEPS[active].step}
                    </span>
                    <h3 className="text-3xl xl:text-4xl font-black text-[#0f172a] tracking-tight leading-tight -mt-6">
                      {t(STEPS[active].titleKey as StepKey)}
                    </h3>
                    <p className="mt-4 text-base text-slate-600 leading-relaxed max-w-md">
                      {t(STEPS[active].descKey as StepKey)}
                    </p>
                  </m.div>
                </AnimatePresence>
              </div>

              {/* Rasm — cross-fade + engil zoom */}
              <div className="col-span-6 relative aspect-[4/3] rounded-[28px] overflow-hidden bg-slate-100 shadow-[0_30px_60px_-20px_rgba(15,23,42,0.35)] border border-slate-200/60">
                <AnimatePresence initial={false}>
                  <m.div
                    key={active}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: DUR.slow, ease: EASE }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={STEPS[active].image}
                      alt={t(STEPS[active].titleKey as StepKey)}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      priority={active === 0}
                      className="object-cover"
                    />
                  </m.div>
                </AnimatePresence>
                {/* Pastki gradient + qadam yorlig'i */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                <div className="absolute bottom-5 left-5 flex items-center gap-2">
                  {STEPS.map((_, i) => (
                    <m.span
                      key={i}
                      animate={{ width: i === active ? 28 : 8, opacity: i === active ? 1 : 0.5 }}
                      transition={SPRING.soft}
                      className="h-2 rounded-full bg-white"
                    />
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
