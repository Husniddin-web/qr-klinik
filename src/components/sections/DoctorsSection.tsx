"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { DOCTORS_DATA } from "@/data/doctors";
import { Container } from "../common/Container";

interface DoctorsSectionProps {
  onSelectDoctor: (doctorId: string) => void;
}

export function DoctorsSection({ onSelectDoctor }: DoctorsSectionProps) {
  const t = useTranslations("doctors");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const totalDoctors = DOCTORS_DATA.length;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalDoctors);
  }, [totalDoctors]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalDoctors) % totalDoctors);
  }, [totalDoctors]);

  // Autoplay with pause on hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevSlide, nextSlide]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      id="doctors"
      className="relative py-20 sm:py-24 bg-white overflow-hidden select-none border-b border-slate-100"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Container className="relative z-10">
        {/* Section Heading matching reference mockup */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 px-4">
          <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
            <span
              data-aos="fade-down"
              data-aos-delay="100"
              className="text-[11px] sm:text-xs font-bold tracking-[0.22em] text-blue-600 uppercase"
            >
              {t("badge")}
            </span>
          </div>

          <h2
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0b1b36] tracking-tight leading-[1.2] mb-3 sm:mb-4 uppercase"
          >
            {t("title")}
          </h2>

          <p
            data-aos="fade-up"
            data-aos-delay="300"
            className="text-slate-600 text-xs sm:text-sm md:text-base font-normal max-w-2xl mx-auto leading-relaxed"
          >
            {t("subtitle")}
          </p>
        </div>

        {/* 3D Fan Carousel Container */}
        <div
          data-aos="zoom-in"
          data-aos-delay="250"
          data-aos-duration="850"
          className="relative w-full max-w-5xl mx-auto flex items-center justify-center py-2"
        >
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Oldingi mutaxassis"
            className="absolute left-1 sm:left-2 md:-left-4 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-slate-800 hover:text-blue-600 shadow-md hover:shadow-xl border border-slate-200/80 flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer backdrop-blur-sm group"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-0.5" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Keyingi mutaxassis"
            className="absolute right-1 sm:right-2 md:-right-4 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-slate-800 hover:text-blue-600 shadow-md hover:shadow-xl border border-slate-200/80 flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer backdrop-blur-sm group"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* Cards Stage with 3D Perspective */}
          <div
            className="relative w-full h-[400px] xs:h-[440px] sm:h-[480px] md:h-[520px] flex items-center justify-center"
            style={{ perspective: "1200px" }}
          >
            {DOCTORS_DATA.map((doctor, index) => {
              // Circular offset calculation
              let offset = (index - currentIndex) % totalDoctors;
              if (offset > totalDoctors / 2) offset -= totalDoctors;
              if (offset < -totalDoctors / 2) offset += totalDoctors;

              const isActive = offset === 0;
              const isLeft = offset === -1;
              const isRight = offset === 1;
              const isVisible = Math.abs(offset) <= 1;

              // Responsive distance between cards: gives more breathing space so side cards aren't crammed
              const txDistance = isMobile ? 60 : 74;

              // Compute transforms for 3D Fan presentation with clear, natural lighting
              let translateX = 0;
              let rotateZ = 0;
              let scale = 0.8;
              let opacity = 0;
              let zIndex = 10;

              if (isActive) {
                translateX = 0;
                rotateZ = 0;
                scale = isMobile ? 1.03 : 1.06;
                opacity = 1;
                zIndex = 30;
              } else if (isLeft) {
                translateX = -txDistance;
                rotateZ = -7.5;
                scale = isMobile ? 0.90 : 0.92;
                opacity = 0.95;
                zIndex = 20;
              } else if (isRight) {
                translateX = txDistance;
                rotateZ = 7.5;
                scale = isMobile ? 0.90 : 0.92;
                opacity = 0.95;
                zIndex = 20;
              } else if (offset === -2) {
                translateX = -110;
                rotateZ = -14;
                scale = 0.75;
                opacity = 0;
                zIndex = 10;
              } else if (offset === 2) {
                translateX = 110;
                rotateZ = 14;
                scale = 0.75;
                opacity = 0;
                zIndex = 10;
              }

              return (
                <div
                  key={doctor.id}
                  onClick={() => {
                    if (isLeft) prevSlide();
                    if (isRight) nextSlide();
                    if (isActive) onSelectDoctor(doctor.id);
                  }}
                  className={`absolute top-0 w-[250px] xs:w-[280px] sm:w-[315px] md:w-[345px] h-[380px] xs:h-[420px] sm:h-[460px] md:h-[490px] rounded-[26px] sm:rounded-[30px] overflow-hidden cursor-pointer select-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isActive
                      ? "shadow-[0_25px_60px_-15px_rgba(15,23,42,0.35)] ring-1 ring-white/60"
                      : "shadow-xl hover:opacity-100"
                  }`}
                  style={{
                    transform: `translateX(${translateX}%) rotate(${rotateZ}deg) scale(${scale})`,
                    opacity: isVisible ? opacity : 0,
                    zIndex,
                    pointerEvents: isVisible ? "auto" : "none",
                  }}
                >
                  {/* Doctor Portrait Image */}
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    sizes="(max-width: 640px) 280px, (max-width: 768px) 315px, 345px"
                    priority={isActive || isVisible}
                    className="object-cover object-top"
                  />

                  {/* Dark Vignette Overlay from Bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />

                  {/* Clean Content Overlay at Bottom: Only Name and Role/Specialty */}
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white z-10 flex flex-col justify-end">
                    <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight leading-snug drop-shadow-md">
                      {doctor.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-200/90 font-medium mt-1 drop-shadow-sm line-clamp-1">
                      {doctor.specialty}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8 relative z-20">
          {DOCTORS_DATA.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex
                  ? "w-8 bg-blue-600"
                  : "w-2 bg-slate-300/80 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
