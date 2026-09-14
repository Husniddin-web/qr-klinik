"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { m, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "../common/Container";
import { Reveal } from "../common/Reveal";
import { SectionHeading } from "../common/SectionHeading";
import { SCROLL_SPRING } from "@/lib/animations";

export function AboutSection() {
  const t = useTranslations("about");
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, SCROLL_SPRING);

  // Uch qatlam turli chuqurlikda siljiydi
  const yLayer1 = useTransform(smooth, [0, 1], [-25, 25]);
  const yLayer2 = useTransform(smooth, [0, 1], [40, -40]);
  const yLayer3 = useTransform(smooth, [0, 1], [-18, 28]);

  const layer = (y: typeof yLayer1) => (shouldReduceMotion ? {} : { y });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-canvas-soft border-b border-slate-200/70 section-pad overflow-hidden"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-20 items-center">
          {/* Chap ustun: matn */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            <SectionHeading eyebrow={t("eyebrow")} title={t("title")} className="mb-0" />
            <Reveal variant="up" delay={0.15} duration={0.7}>
              <p className="mt-6 font-display text-lg sm:text-xl font-bold text-ink leading-snug">
                {t("subheading")}
              </p>
              <p className="mt-4 text-[15px] sm:text-base text-slate-600 leading-relaxed">
                {t("desc")}
              </p>
            </Reveal>
          </div>

          {/* O'ng ustun: qatlamli foto kompozitsiya + parallax */}
          <div className="lg:col-span-7 relative w-full">
            <div className="relative w-full max-w-[620px] mx-auto lg:ml-auto h-[420px] sm:h-[500px] lg:h-[540px]">
              <m.div
                style={layer(yLayer1)}
                className="photo-tone absolute top-0 right-0 w-[86%] sm:w-[82%] h-[68%] sm:h-[72%] rounded-card-lg overflow-hidden shadow-[0_20px_45px_rgba(15,23,42,0.12)] border border-slate-200/60 group"
              >
                <Reveal variant="zoom" delay={0.1} duration={0.7} className="relative w-full h-full">
                  <Image
                    src="/on-section.jpg"
                    alt="QAXRAMON-RAXIMJON Klinikasi shifokorlar jamoasi"
                    fill
                    sizes="(max-width: 1024px) 90vw, 520px"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </Reveal>
              </m.div>

              <m.div
                style={layer(yLayer2)}
                className="photo-tone absolute bottom-0 left-0 w-[64%] sm:w-[58%] h-[48%] sm:h-[52%] rounded-card overflow-hidden shadow-[0_25px_50px_rgba(15,23,42,0.22)] border-[5px] sm:border-[6px] border-white z-20 group"
              >
                <Reveal variant="up" delay={0.25} duration={0.7} className="relative w-full h-full">
                  <Image
                    src="/images/heroes/hero-services.jpg"
                    alt="Siemens 3.0 Tesla MRT diagnostika xonasi"
                    fill
                    sizes="(max-width: 1024px) 60vw, 360px"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </Reveal>
              </m.div>

              <m.div
                style={layer(yLayer3)}
                className="photo-tone hidden sm:block absolute top-8 sm:top-10 -left-4 sm:-left-6 w-[34%] h-[44%] rounded-card overflow-hidden shadow-[0_20px_40px_rgba(15,23,42,0.18)] border-[5px] sm:border-[6px] border-white z-10 group"
              >
                <Reveal variant="left" delay={0.35} duration={0.7} className="relative w-full h-full">
                  <Image
                    src="/images/showcase/pediatrics.jpg"
                    alt="Bemorlarga mehrli g'amxo'rlik"
                    fill
                    sizes="220px"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </Reveal>
              </m.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
