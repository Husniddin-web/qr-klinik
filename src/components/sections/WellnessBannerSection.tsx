"use client";

import React, { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { m, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Container } from "../common/Container";
import { Reveal } from "../common/Reveal";

interface WellnessBannerSectionProps {
  onOpenAppointment?: () => void;
}

export function WellnessBannerSection({ onOpenAppointment }: WellnessBannerSectionProps) {
  const t = useTranslations("wellnessBanner");
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // `background-attachment: fixed` iOS'da ishlamaydi va jank beradi —
  // o'rniga haqiqiy scroll-linked parallax (transform, GPU'da).
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section
      ref={ref}
      className="relative w-full h-[42vh] sm:h-[48vh] min-h-[380px] max-h-[500px] overflow-hidden select-none"
    >
      <m.div
        style={shouldReduceMotion ? {} : { y }}
        className="absolute inset-[-14%_0] bg-cover bg-center sm:bg-[center_30%] bg-no-repeat will-change-transform"
        role="img"
        aria-label="QAXRAMON-RAXIMJON tibbiyot jamoasi"
      >
        <div
          className="absolute inset-0 bg-cover bg-center sm:bg-[center_30%]"
          style={{ backgroundImage: "url('/on-section.jpg')" }}
        />
      </m.div>

      <div className="absolute inset-y-0 left-0 w-full sm:w-[50%] lg:w-[42%] backdrop-blur-sm z-10 [mask-image:linear-gradient(to_right,black_35%,transparent)] [-webkit-mask-image:linear-gradient(to_right,black_35%,transparent)]" />

      <div className="relative z-20 h-full flex items-center">
        <Container size="wide">
          <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl text-left py-6">
            <Reveal variant="left" duration={0.7}>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[40px] font-extrabold text-white tracking-tight leading-snug drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
                {t("title")}
              </h2>
            </Reveal>

            <Reveal delay={0.25} className="mt-6 sm:mt-8">
              <button
                type="button"
                onClick={onOpenAppointment}
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#dc2626] hover:bg-[#b91c1c] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-200 shadow-xl shadow-black/30 active:scale-95 cursor-pointer group"
              >
                <span>{t("cta")}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Reveal>
          </div>
        </Container>
      </div>
    </section>
  );
}
