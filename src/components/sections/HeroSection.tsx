"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Calendar, ArrowRight, ChevronDown, Star, PhoneCall } from "lucide-react";
import { useTranslations } from "next-intl";
import { m, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { CLINIC_CONTACT } from "@/data/navigation";
import { MagneticButton } from "../common/MagneticButton";
import { Container } from "../common/Container";
import { SCROLL_SPRING } from "@/lib/animations";

/**
 * Sarlavha so'zlari niqob ortidan ko'tariladi (mask reveal), CTA/karta pastdan suzadi.
 * Sof CSS (`.hero-word` / `.hero-rise`, globals.css): hero — LCP zonasi, u
 * LazyMotion'ning async chunk'ini kutmasligi kerak.
 */
const WORD_STAGGER_MS = 55;
const WORD_BASE_DELAY_MS = 120;

/** EkgDivider bilan bir xil P–QRS–T shakli — sarlavha ostidagi "imzo" */
const EKG_UNDERLINE = "M2 12 H70 q6 -5 12 0 H100 l5 6 l6 -16 l6 14 l4 -4 H140 q10 -8 20 0 H298";

interface HeroSectionProps {
  onOpenAppointment: () => void;
}

export function HeroSection({ onOpenAppointment }: HeroSectionProps) {
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll bilan bog'langan yengil parallax: rasm matndan sekinroq ketadi
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const smooth = useSpring(scrollYProgress, SCROLL_SPRING);
  const artY = useTransform(smooth, [0, 1], [0, 90]);
  const artOpacity = useTransform(smooth, [0, 0.7], [1, 0.35]);
  const artParallax = shouldReduceMotion ? {} : { y: artY, opacity: artOpacity };

  /** "—" kabi yolg'iz tinish belgisi oldingi so'zga NBSP bilan yopishtiriladi — qatorda yetim qolmasin */
  const splitWords = (text: string) =>
    text.split(" ").reduce<string[]>((acc, w) => {
      if (/^[—–-]$/.test(w) && acc.length) acc[acc.length - 1] += "\u00A0" + w;
      else acc.push(w);
      return acc;
    }, []);

  const renderWords = (text: string, offset = 0, accent = false) =>
    splitWords(text).map((word, i) => (
      // Bo'shliq TASHQI span'da — ichki span yagona bola, `last:` unda doim ishlaydi
      <span
        key={`${word}-${i}`}
        className="inline-block overflow-hidden align-bottom pb-[0.24em] -mb-[0.24em] pr-[0.12em] mr-[0.14em] last:mr-0"
      >
        <span
          className={
            accent
              ? "hero-word inline-block font-serif-accent italic font-medium text-accent"
              : "hero-word inline-block"
          }
          style={{ animationDelay: `${WORD_BASE_DELAY_MS + (offset + i) * WORD_STAGGER_MS}ms` }}
        >
          {word}
        </span>
      </span>
    ));

  const titleWords = splitWords(t("title")).length;
  const accentWords = splitWords(t("titleHighlight")).length;
  const afterTitleMs = WORD_BASE_DELAY_MS + (titleWords + accentWords) * WORD_STAGGER_MS;
  const rise = (extraMs: number) => ({ animationDelay: `${afterTitleMs + extraMs}ms` });

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full max-w-full overflow-hidden bg-canvas pt-24 sm:pt-28 lg:pt-28 pb-14 lg:pb-16 lg:min-h-[100svh] flex items-center"
    >
      {/* ---------- Fon: faqat nozik nuqtali to'r ---------- */}
      <div aria-hidden className="absolute inset-0 pointer-events-none select-none bg-dot-grid opacity-60" />

      <Container size="wide" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 xl:gap-12 items-center">
          {/* ================= Chap: matn + CTA + tezkor qabul ================= */}
          <div className="lg:col-span-6 xl:col-span-6 max-w-2xl">
            {/* Sarlavha */}
            <h1 className="font-display font-extrabold text-ink tracking-[-0.03em] leading-[1.04] text-[2.4rem] xs:text-[2.7rem] sm:text-[3.2rem] lg:text-[3.1rem] xl:text-[3.7rem]">
              <span className="block">{renderWords(t("title"))}</span>
              <span className="block mt-1">
                {renderWords(t("titleHighlight"), titleWords, true)}
              </span>
            </h1>

            {/* EKG imzo-chizig'i */}
            <svg
              aria-hidden
              viewBox="0 0 300 24"
              fill="none"
              className="ekg-underline mt-2 w-[220px] sm:w-[300px] h-5 text-accent"
              preserveAspectRatio="none"
            >
              <path
                d={EKG_UNDERLINE}
                pathLength={1}
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <p className="hero-rise mt-5 text-[15px] sm:text-[17px] leading-relaxed text-slate-600 max-w-xl text-pretty" style={rise(60)}>
              {t("subtitle")}
            </p>

            {/* CTA qatori */}
            <div className="hero-rise mt-7 flex flex-wrap items-center gap-3 sm:gap-4" style={rise(160)}>
              <MagneticButton
                onClick={() => onOpenAppointment()}
                strength={12}
                glow
                className="btn-ekg inline-flex items-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-accent hover:bg-accent-hover text-white text-sm sm:text-[15px] font-bold transition-colors duration-200 shadow-accent active:scale-95 cursor-pointer"
              >
                <Calendar className="w-4 h-4 shrink-0" />
                <span>{t("btnAppointment")}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </MagneticButton>

              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-6 py-3.5 sm:py-4 rounded-full border border-ink/15 bg-white/70 backdrop-blur text-ink text-sm sm:text-[15px] font-semibold hover:border-ink/40 hover:bg-white transition-colors"
              >
                {t("btnServices")}
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>

            {/* Ishonch qatori */}
            <div className="hero-rise mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs sm:text-[13px] text-slate-500" style={rise(340)}>
              <div className="flex items-center gap-2.5">
                <div className="flex -space-x-2">
                  {["/images/doctor-1.jpg", "/images/doctor-2.jpg", "/images/doctor-3.jpg"].map((src) => (
                    <span key={src} className="relative w-7 h-7 rounded-full ring-2 ring-white overflow-hidden bg-slate-200">
                      <Image src={src} alt="" fill sizes="28px" className="object-cover" />
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 font-semibold text-ink">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {t("reviewsRating")}
                </span>
                <span>{t("trustReviews")}</span>
              </div>
              <span className="hidden sm:block w-px h-4 bg-line" />
              <a
                href={`tel:${CLINIC_CONTACT.emergencyPhone.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-1.5 font-semibold text-ink hover:text-accent transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-accent" />
                {CLINIC_CONTACT.emergencyPhone}
              </a>
            </div>
          </div>

          {/* ================= O'ng: blob ustidagi shifokor =================
               Sahna 4:5 (rasm nisbati). Rasm ikki qatlamda:
                 1) pastki — blob ichida (overflow-hidden), blob chizig'i tanani kesadi;
                 2) yuqori — clip-path bilan faqat blob eng keng joyidan YUQORISI ochiq,
                    shunda bosh va yelkalar blobdan tashqariga chiqib turadi.
               Contact section'dagi doira bilan bir xil texnika. */}
          <m.div style={artParallax} className="lg:col-span-6 relative will-change-transform">
            <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[470px] xl:max-w-[520px] aspect-[4/5]">
              {/* To'lqinli blob shakli — objectBoundingBox koordinatalarda, o'lchamga bog'liq emas */}
              <svg aria-hidden className="absolute w-0 h-0">
                <defs>
                  <clipPath id="hero-blob" clipPathUnits="objectBoundingBox">
                    <path d="M0.500,0.000 C0.606,0.014 0.735,0.134 0.817,0.203 C0.900,0.272 0.987,0.320 0.992,0.413 C0.997,0.506 0.902,0.668 0.848,0.761 C0.794,0.854 0.762,0.949 0.671,0.970 C0.580,0.991 0.404,0.925 0.303,0.888 C0.203,0.851 0.104,0.836 0.067,0.750 C0.030,0.664 0.065,0.479 0.084,0.374 C0.102,0.268 0.109,0.179 0.179,0.117 C0.248,0.055 0.394,-0.014 0.500,0.000 Z" />
                  </clipPath>
                </defs>
              </svg>

              {/* Navy blob (yaxlit rang) — rasmning pastki qismi shu ichida */}
              <div className="absolute inset-x-0 top-[22%] bottom-0 bg-ink" style={{ clipPath: "url(#hero-blob)" }}>
                <div aria-hidden className="absolute inset-0 bg-dot-grid-light opacity-50" />
                {/* Blob balandligi = sahnaning 78% i → rasm sahna o'lchamida bo'lishi uchun 128.2% */}
                <div className="absolute left-0 w-full" style={{ top: "-28.2%", height: "128.2%" }}>
                  <Image
                    src="/hero-doctor-cutout.png"
                    alt=""
                    fill
                    priority
                    sizes="(max-width: 640px) 340px, (max-width: 1024px) 420px, 520px"
                    quality={85}
                    className="object-contain object-bottom saturate-[0.92]"
                  />
                </div>
              </div>

              {/* Yuqori qatlam: blobning eng keng chizig'idan (61%) yuqorisi kesilmasdan ko'rinadi */}
              <div className="absolute inset-0 z-[2] pointer-events-none" style={{ clipPath: "inset(0 0 39% 0)" }}>
                <Image
                  src="/hero-doctor-cutout.png"
                  alt="QAXRAMON-RAXIMJON klinikasi shifokori"
                  fill
                  priority
                  sizes="(max-width: 640px) 340px, (max-width: 1024px) 420px, 520px"
                  quality={85}
                  className="object-contain object-bottom saturate-[0.92] drop-shadow-[0_24px_40px_rgba(15,23,42,0.28)]"
                />
              </div>

            </div>
          </m.div>
        </div>
      </Container>

      {/* Pastga scroll ishorasi */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 hidden lg:flex flex-col items-center gap-1.5 pointer-events-none">
        <span className="text-[10px] uppercase tracking-[0.25em] text-slate-400 font-semibold">Pastga</span>
        <span className="w-7 h-7 rounded-full border border-slate-300 bg-white/70 backdrop-blur-sm flex items-center justify-center text-slate-500 animate-bounce">
          <ChevronDown className="w-3.5 h-3.5" />
        </span>
      </div>
    </section>
  );
}
