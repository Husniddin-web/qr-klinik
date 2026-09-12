"use client";

import React, { useId, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown, ArrowRight, Phone, Plus, Minus } from "lucide-react";
import { m, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FAQS_DATA } from "@/data/faqs";
import { CLINIC_CONTACT } from "@/data/navigation";
import { Reveal, RevealGroup, RevealItem } from "../common/Reveal";
import { AnimatedDivider } from "../common/AnimatedDivider";
import { EASE, DUR, SPRING } from "@/lib/animations";

interface FaqSectionProps {
  onOpenAppointment?: () => void;
}

const INITIAL_COUNT = 4;

export function FaqSection({ onOpenAppointment }: FaqSectionProps) {
  const t = useTranslations("faq");
  const shouldReduceMotion = useReducedMotion();
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(FAQS_DATA[0]?.id ?? null);
  const [showAll, setShowAll] = useState(false);

  // Chap rasm: sekin scroll-parallax (About bo'limidagi kabi bir tilda)
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const toggleItem = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  const handleAskQuestion = () => {
    if (onOpenAppointment) return onOpenAppointment();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const visibleFaqs = showAll ? FAQS_DATA : FAQS_DATA.slice(0, INITIAL_COUNT);
  const hiddenCount = FAQS_DATA.length - INITIAL_COUNT;

  return (
    <section id="faq" className="w-full bg-[#fafbfc] border-y border-slate-200/80 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-stretch w-full">
        {/* ---------- Chap: rasm + parallax + pastki aloqa kartasi ---------- */}
        <div
          ref={imageRef}
          className="w-full lg:w-1/2 relative min-h-[380px] sm:min-h-[460px] lg:min-h-0 lg:self-stretch overflow-hidden bg-slate-200 shrink-0"
        >
          <m.div
            style={shouldReduceMotion ? {} : { y: imageY }}
            className="absolute inset-[-8%_0] will-change-transform"
          >
            <Image
              src="/images/faq-nurse-patient.jpg"
              alt="Bemorlar bilan samimiy g'amxo'rlik"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </m.div>

          {/* Pastki gradient — karta o'qilishi uchun */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/45 to-transparent pointer-events-none" />

          {/* Aloqa kartasi — flat, soyasiz */}
          <Reveal variant="up" delay={0.2} className="absolute left-5 right-5 bottom-5 sm:left-8 sm:bottom-8 sm:right-auto sm:max-w-sm">
            <div className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 flex items-center gap-4">
              <span className="w-11 h-11 rounded-xl bg-[#dc2626] text-white flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Javob topolmadingizmi? 24/7
                </p>
                <a
                  href={`tel:${CLINIC_CONTACT.phones[0].replace(/\s+/g, "")}`}
                  className="text-base sm:text-lg font-black text-[#0f172a] hover:text-[#dc2626] transition-colors tracking-tight"
                >
                  {CLINIC_CONTACT.phones[0]}
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ---------- O'ng: akkordeon ---------- */}
        <div className="w-full lg:w-1/2 px-6 sm:px-12 lg:px-16 xl:px-20 py-14 sm:py-20 flex flex-col justify-center bg-[#fafbfc]">
          <div className="max-w-xl w-full mx-auto lg:mx-0 text-left">
            <Reveal variant="down" className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#dc2626] mb-3">
              {t("badge")}
            </Reveal>
            <Reveal as="h2" delay={0.1} className="text-2xl sm:text-3xl lg:text-[36px] font-black text-[#0f172a] tracking-tight leading-tight">
              {t("title")}
            </Reveal>
            <AnimatedDivider className="mx-0 mb-8" />

            <RevealGroup stagger={0.08} className="space-y-3">
              <AnimatePresence initial={false}>
                {visibleFaqs.map((item, idx) => {
                  const isOpen = openId === item.id;
                  const panelId = `${baseId}-panel-${item.id}`;
                  const buttonId = `${baseId}-btn-${item.id}`;

                  return (
                    <RevealItem key={item.id} as="div">
                      <m.div
                        layout
                        initial={idx >= INITIAL_COUNT ? { opacity: 0, y: 12 } : false}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ layout: SPRING.soft, duration: DUR.fast, ease: EASE }}
                        className={`relative rounded-xl sm:rounded-2xl border overflow-hidden bg-white transition-colors duration-300 ${
                          isOpen ? "border-slate-300" : "border-slate-200/80 hover:border-slate-300"
                        }`}
                      >
                        {/* Faol karta: chap qizil chiziq yuqoridan pastga chiziladi */}
                        <m.span
                          aria-hidden
                          initial={false}
                          animate={{ scaleY: isOpen ? 1 : 0 }}
                          transition={{ duration: DUR.base, ease: EASE }}
                          style={{ originY: 0 }}
                          className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#dc2626]"
                        />

                        <button
                          id={buttonId}
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() => toggleItem(item.id)}
                          className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer group"
                        >
                          <span className="flex items-start gap-3 text-xs sm:text-[15px] font-bold text-[#0f172a] leading-snug">
                            {/* Raqam: ochiqda qizil to'ldirilgan badge'ga aylanadi */}
                            <m.span
                              initial={false}
                              animate={{
                                backgroundColor: isOpen ? "#dc2626" : "rgba(220,38,38,0)",
                                color: isOpen ? "#ffffff" : "#dc2626",
                              }}
                              transition={{ duration: DUR.fast }}
                              className="w-6 h-6 rounded-md text-[11px] font-black flex items-center justify-center shrink-0 tabular-nums"
                            >
                              {idx + 1}
                            </m.span>
                            <span className={`transition-colors ${isOpen ? "" : "group-hover:text-[#dc2626]"}`}>
                              {item.question}
                            </span>
                          </span>

                          <m.span
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={SPRING.snappy}
                            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                              isOpen ? "bg-red-50 text-[#dc2626]" : "bg-slate-100 text-slate-500 group-hover:bg-red-50 group-hover:text-[#dc2626]"
                            }`}
                          >
                            <ChevronDown className="w-4 h-4" />
                          </m.span>
                        </button>

                        {/* Javob: balandlik 0 → auto, matn biroz kechikib ko'tariladi */}
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <m.div
                              id={panelId}
                              role="region"
                              aria-labelledby={buttonId}
                              key="panel"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{
                                height: { duration: DUR.base, ease: EASE },
                                opacity: { duration: DUR.fast, delay: 0.08 },
                              }}
                              className="overflow-hidden"
                            >
                              <m.p
                                initial={{ y: -6 }}
                                animate={{ y: 0 }}
                                exit={{ y: -6 }}
                                transition={{ duration: DUR.base, ease: EASE }}
                                className="px-5 pb-5 pl-[52px] sm:pl-[56px] text-xs sm:text-[13px] text-slate-600 leading-relaxed"
                              >
                                {item.answer}
                              </m.p>
                            </m.div>
                          )}
                        </AnimatePresence>
                      </m.div>
                    </RevealItem>
                  );
                })}
              </AnimatePresence>
            </RevealGroup>

            {/* Pastki amallar */}
            <Reveal delay={0.2} className="pt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleAskQuestion}
                className="px-7 py-3 rounded-full bg-[#dc2626] hover:bg-[#b91c1c] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors duration-200 inline-flex items-center gap-2 cursor-pointer active:scale-95 group"
              >
                <span>{t("askBtn")}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              {hiddenCount > 0 && (
                <button
                  type="button"
                  onClick={() => setShowAll((v) => !v)}
                  aria-expanded={showAll}
                  className="px-5 py-3 rounded-full border border-slate-300 hover:border-[#dc2626] text-slate-700 hover:text-[#dc2626] text-xs sm:text-sm font-bold transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  {showAll ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  <span>{showAll ? "Kamroq ko'rsatish" : `Barcha savollar (${FAQS_DATA.length})`}</span>
                </button>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
