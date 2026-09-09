"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  CheckCircle2,
  Microscope,
  HeartHandshake,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
} from "lucide-react";
import { Container } from "../common/Container";

interface StepData {
  id: number;
  number: string;
  tabKey: "step1Tab" | "step2Tab" | "step3Tab";
  subKey: "step1Sub" | "step2Sub" | "step3Sub";
  badgeKey: "step1Badge" | "step2Badge" | "step3Badge";
  titleKey: "step1Title" | "step2Title" | "step3Title";
  descKey: "step1Desc" | "step2Desc" | "step3Desc";
  highlightKey: "step1Highlight" | "step2Highlight" | "step3Highlight";
  image: string;
  icon: React.ElementType;
}

const STEPS: StepData[] = [
  {
    id: 0,
    number: "01",
    tabKey: "step1Tab",
    subKey: "step1Sub",
    badgeKey: "step1Badge",
    titleKey: "step1Title",
    descKey: "step1Desc",
    highlightKey: "step1Highlight",
    image: "/images/doctor-consultation.jpg",
    icon: HeartHandshake,
  },
  {
    id: 1,
    number: "02",
    tabKey: "step2Tab",
    subKey: "step2Sub",
    badgeKey: "step2Badge",
    titleKey: "step2Title",
    descKey: "step2Desc",
    highlightKey: "step2Highlight",
    image: "/images/clinic-hero.jpg",
    icon: Microscope,
  },
  {
    id: 2,
    number: "03",
    tabKey: "step3Tab",
    subKey: "step3Sub",
    badgeKey: "step3Badge",
    titleKey: "step3Title",
    descKey: "step3Desc",
    highlightKey: "step3Highlight",
    image: "/images/main-hero-1.jpg",
    icon: Stethoscope,
  },
];

export function AboutSection() {
  const t = useTranslations("about");
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleStepClick = (stepIndex: number) => {
    setActiveStep(stepIndex);
  };

  return (
    <section
      id="about"
      className="relative bg-white border-b border-slate-200/70 py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center">
          
          {/* Left Column: Minimal Vertical Stepper & Editorial Narrative */}
          <div
            data-aos="fade-right"
            data-aos-duration="850"
            className="lg:col-span-5 flex flex-col justify-center space-y-6 sm:space-y-8"
          >
            {/* Minimal Eyebrow */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2">
                <span className="w-5 h-0.5 bg-[#dc2626] rounded-full" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#dc2626]">
                  {t("badge")}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-[#0f172a] tracking-tight leading-[1.2]">
                {t("title")}
              </h2>
            </div>

              {/* Sleek Vertical Stepper / Chapters */}
              <div
                data-aos="fade-up"
                data-aos-delay="250"
                className="space-y-2 pt-1"
              >
                {STEPS.map((step, idx) => {
                  const isActive = activeStep === idx;
                  const Icon = step.icon;

                  return (
                    <button
                      key={step.id}
                      onClick={() => handleStepClick(idx)}
                      type="button"
                      className={`w-full text-left p-3 sm:p-3.5 rounded-xl transition-all duration-200 relative group flex items-start gap-3.5 border ${
                        isActive
                          ? "bg-white shadow-sm border-slate-200"
                          : "bg-slate-50/60 border-transparent hover:bg-slate-100/70 hover:border-slate-200/60"
                      }`}
                    >
                      {/* Active Indicator Line on the left edge */}
                      <div
                        className={`absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-full transition-all duration-200 ${
                          isActive
                            ? "bg-[#dc2626]"
                            : "bg-transparent group-hover:bg-slate-300"
                        }`}
                      />

                      {/* Number Badge */}
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-mono font-bold text-xs transition-all duration-200 ${
                          isActive
                            ? "bg-[#dc2626] text-white"
                            : "bg-white text-slate-500 border border-slate-200 group-hover:border-slate-300 group-hover:text-[#0f172a]"
                        }`}
                      >
                        {step.number}
                      </div>

                      {/* Tab Text Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4
                            className={`text-sm font-bold transition-colors truncate ${
                              isActive ? "text-[#0f172a]" : "text-slate-700"
                            }`}
                          >
                            {t(step.tabKey)}
                          </h4>
                          <Icon
                            className={`w-4 h-4 shrink-0 transition-colors ${
                              isActive ? "text-[#dc2626]" : "text-slate-400 opacity-60"
                            }`}
                          />
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                          {t(step.subKey)}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Clean "Kitob Varoqlash" (Scroll-Driven 3D Page Turn Deck) */}
            <div
              data-aos="fade-left"
              data-aos-delay="200"
              data-aos-duration="850"
              className="lg:col-span-7 flex items-center justify-center"
            >
              <div
                className="relative w-full max-w-xl lg:max-w-none h-[490px] xs:h-[520px] sm:h-[560px] xl:h-[590px]"
                style={{ perspective: "1200px" }}
              >
                {STEPS.map((step, idx) => {
                  const isActive = activeStep === idx;
                  const isPast = idx < activeStep;
                  const isFuture = idx > activeStep;

                  // 3D transform styles to mimic turning a book's pages
                  let transformClass = "translate-y-0 scale-100 rotate-0 opacity-100 blur-0 z-20 pointer-events-auto";

                  if (isPast) {
                    // Previous page: lifts up, tilts back like a turned page, blurs and fades out
                    transformClass =
                      "-translate-y-10 scale-[0.95] -rotate-1 -rotate-x-12 opacity-0 blur-sm z-10 pointer-events-none";
                  } else if (isFuture) {
                    // Upcoming page: resting below, ready to slide and unfold
                    transformClass =
                      "translate-y-12 scale-[0.96] rotate-1 rotate-x-6 opacity-0 blur-md z-0 pointer-events-none";
                  }

                  return (
                    <div
                      key={step.id}
                      className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${transformClass}`}
                      style={{
                        transformOrigin: "center top",
                      }}
                    >
                      <div className="w-full h-full bg-white rounded-xl border border-slate-200/90 shadow-[0_12px_32px_-8px_rgba(15,23,42,0.12)] flex flex-col overflow-hidden">
                        
                        {/* Top: Clean Full Editorial Image (No badges, no dark overlays) */}
                        <div className="relative h-[220px] xs:h-[260px] sm:h-[330px] xl:h-[350px] w-full bg-slate-100 overflow-hidden shrink-0">
                          <Image
                            src={step.image}
                            alt={t(step.titleKey)}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover object-center transition-transform duration-700 ease-out"
                            priority={idx === 0}
                          />
                        </div>

                        {/* Bottom: Minimalist Editorial Content Block */}
                        <div className="p-4 xs:p-5 sm:p-7 xl:p-8 flex-1 flex flex-col justify-between bg-white text-left">
                          <div>
                            <h3 className="text-lg sm:text-xl xl:text-2xl font-bold text-[#0f172a] tracking-tight leading-snug">
                              {t(step.titleKey)}
                            </h3>
                            <p className="text-xs sm:text-sm xl:text-base text-slate-600 leading-relaxed mt-2.5 line-clamp-3 sm:line-clamp-none">
                              {t(step.descKey)}
                            </p>
                          </div>

                          {/* Clean Highlight Row */}
                          <div className="pt-4 mt-auto border-t border-slate-100 flex items-center justify-between gap-4">
                            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0f172a]">
                              <CheckCircle2 className="w-4 h-4 text-[#dc2626] shrink-0" />
                              <span className="truncate">{t(step.highlightKey)}</span>
                            </div>

                            {/* Step Navigation Arrows */}
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                aria-label="Oldingi sahifa"
                                disabled={activeStep === 0}
                                onClick={() => handleStepClick(Math.max(0, activeStep - 1))}
                                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                              >
                                <ChevronLeft className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                aria-label="Keyingi sahifa"
                                disabled={activeStep === STEPS.length - 1}
                                onClick={() => handleStepClick(Math.min(STEPS.length - 1, activeStep + 1))}
                                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                              >
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </Container>
    </section>
  );
}


