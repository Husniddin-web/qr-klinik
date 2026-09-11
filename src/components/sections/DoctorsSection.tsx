"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Calendar, Award, Star } from "lucide-react";
import { m, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { DOCTORS_DATA } from "@/data/doctors";
import type { IDoctor } from "@/types";
import { Container } from "../common/Container";
import { Reveal } from "../common/Reveal";
import { AnimatedDivider } from "../common/AnimatedDivider";
import { EASE, DUR, SPRING } from "@/lib/animations";

interface DoctorsSectionProps {
  onSelectDoctor: (doctorId: string) => void;
  doctors?: IDoctor[];
}

export function DoctorsSection({ onSelectDoctor, doctors = DOCTORS_DATA }: DoctorsSectionProps) {
  const t = useTranslations("doctors");
  const shouldReduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const totalDoctors = doctors.length;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const nextSlide = useCallback(() => setCurrentIndex((p) => (p + 1) % totalDoctors), [totalDoctors]);
  const prevSlide = useCallback(() => setCurrentIndex((p) => (p - 1 + totalDoctors) % totalDoctors), [totalDoctors]);

  useEffect(() => {
    if (isPaused || shouldReduceMotion) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide, shouldReduceMotion]);

  // Klaviatura — faqat section ko'rinib turganda ishlaydi (butun sahifani "o'g'irlamaslik" uchun)
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect || rect.bottom < 0 || rect.top > window.innerHeight) return;
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prevSlide, nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.targetTouches[0].clientX; };
  const handleTouchMove = (e: React.TouchEvent) => { touchEndX.current = e.targetTouches[0].clientX; };
  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) nextSlide();
    else if (diff < -45) prevSlide();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      ref={sectionRef}
      id="doctors"
      className="relative py-20 sm:py-24 bg-white overflow-hidden select-none border-b border-slate-100"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 px-4">
          <Reveal as="h2" delay={0.1} className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0b1b36] tracking-tight leading-[1.2] uppercase">
            {t("title")}
          </Reveal>
          <AnimatedDivider />
        </div>

        <Reveal variant="zoom" delay={0.2} duration={0.7} className="relative w-full max-w-5xl mx-auto flex items-center justify-center py-2">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Oldingi mutaxassis"
            className="absolute left-1 sm:left-2 md:-left-4 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-slate-800 hover:text-[#dc2626] shadow-md hover:shadow-xl border border-slate-200/80 flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer backdrop-blur-sm group"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-0.5" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Keyingi mutaxassis"
            className="absolute right-1 sm:right-2 md:-right-4 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-slate-800 hover:text-[#dc2626] shadow-md hover:shadow-xl border border-slate-200/80 flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer backdrop-blur-sm group"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* 3D "yelpig'ich" sahnasi */}
          <div
            className="relative w-full h-[400px] xs:h-[440px] sm:h-[480px] md:h-[520px] flex items-center justify-center"
            style={{ perspective: "1200px" }}
          >
            {doctors.map((doctor, index) => {
              let offset = (index - currentIndex) % totalDoctors;
              if (offset > totalDoctors / 2) offset -= totalDoctors;
              if (offset < -totalDoctors / 2) offset += totalDoctors;

              const isActive = offset === 0;
              const isLeft = offset === -1;
              const isRight = offset === 1;
              const isVisible = Math.abs(offset) <= 1;
              const txDistance = isMobile ? 60 : 74;

              let x = 0, rotate = 0, scale = 0.75, opacity = 0, zIndex = 10;
              if (isActive) { scale = isMobile ? 1.03 : 1.06; opacity = 1; zIndex = 30; }
              else if (isLeft) { x = -txDistance; rotate = -7.5; scale = isMobile ? 0.9 : 0.92; opacity = 0.95; zIndex = 20; }
              else if (isRight) { x = txDistance; rotate = 7.5; scale = isMobile ? 0.9 : 0.92; opacity = 0.95; zIndex = 20; }
              else if (offset === -2) { x = -110; rotate = -14; }
              else if (offset === 2) { x = 110; rotate = 14; }

              return (
                <m.div
                  key={doctor.id}
                  onClick={() => {
                    if (isLeft) prevSlide();
                    else if (isRight) nextSlide();
                    // Faol kartaga bosish (ayniqsa touch qurilmalarda, hover yo'q) — modalni ochadi
                    else if (isActive) onSelectDoctor(doctor.id);
                  }}
                  animate={{ x: `${x}%`, rotate, scale, opacity: isVisible ? opacity : 0 }}
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: DUR.slow, ease: EASE }}
                  style={{ zIndex, pointerEvents: isVisible ? "auto" : "none" }}
                  className={`group absolute top-0 w-[250px] xs:w-[280px] sm:w-[315px] md:w-[345px] h-[380px] xs:h-[420px] sm:h-[460px] md:h-[490px] rounded-[26px] sm:rounded-[30px] overflow-hidden select-none ${
                    isActive
                      ? "shadow-[0_25px_60px_-15px_rgba(15,23,42,0.35)] ring-1 ring-white/60"
                      : "shadow-xl"
                  } cursor-pointer ${""
                  }`}
                >
                  {/* Rasm: yon kartalar oq-qora, faol — rangli; hover'da engil zoom */}
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    sizes="(max-width: 640px) 280px, (max-width: 768px) 315px, 345px"
                    priority={isVisible}
                    className={`object-cover object-top transition-[filter,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive
                        ? "grayscale-0 group-hover:scale-[1.04]"
                        : "grayscale-[0.7] group-hover:grayscale-0"
                    }`}
                  />

                  {/* Vinyetka — hover'da kuchayadi (matn o'qilishi uchun) */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none transition-opacity duration-500 ${isActive ? "group-hover:from-black/95 group-hover:via-black/50" : ""}`} />

                  {/* Faol kartada yuqori o'ngda reyting */}
                  {isActive && (
                    <m.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: DUR.base, ease: EASE }}
                      className="absolute top-4 right-4 z-20 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-[#0f172a] shadow-sm"
                    >
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {doctor.rating.toFixed(1)}
                    </m.div>
                  )}

                  {/* Pastki kontent: hover'da tajriba + CTA ko'tariladi */}
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white z-10 flex flex-col justify-end">
                    <h3 className={`text-lg sm:text-2xl font-bold tracking-tight leading-snug drop-shadow-md transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isActive ? "group-hover:-translate-y-1" : ""}`}>
                      {doctor.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-200/90 font-medium mt-1 drop-shadow-sm line-clamp-1">
                      {doctor.specialty}
                    </p>

                    {isActive && (
                      <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                        <div className="overflow-hidden">
                          <div className="pt-3 flex items-center gap-1.5 text-[11px] text-slate-300 font-medium">
                            <Award className="w-3.5 h-3.5 text-red-400" />
                            {t("experience")} {doctor.experienceYears}+ yil
                          </div>
                          <m.button
                            type="button"
                            whileTap={{ scale: 0.96 }}
                            transition={SPRING.snappy}
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectDoctor(doctor.id);
                            }}
                            className="mt-3 w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#dc2626] hover:bg-[#b91c1c] text-white text-xs font-bold transition-colors cursor-pointer shadow-lg shadow-red-600/30"
                          >
                            <Calendar className="w-3.5 h-3.5" />
                            {t("btn")}
                          </m.button>
                        </div>
                      </div>
                    )}
                  </div>
                </m.div>
              );
            })}
          </div>
        </Reveal>

        {/* Nuqtalar — faol nuqta layoutId bilan suzadi */}
        <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8 relative z-20">
          {doctors.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Slide ${idx + 1}`}
              className="relative h-2 rounded-full cursor-pointer w-2 bg-slate-300/80 hover:bg-slate-400 transition-colors"
            >
              {idx === currentIndex && (
                <m.span
                  layoutId="doctor-dot"
                  transition={SPRING.soft}
                  className="absolute -inset-y-0 -left-3 -right-3 rounded-full bg-[#dc2626]"
                />
              )}
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
}
