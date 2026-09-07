"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "../common/Container";

interface WellnessBannerSectionProps {
  onOpenAppointment?: () => void;
}

export function WellnessBannerSection({ onOpenAppointment }: WellnessBannerSectionProps) {
  const t = useTranslations("wellnessBanner");

  return (
    <section className="relative w-full h-[42vh] sm:h-[48vh] min-h-[380px] max-h-[500px] overflow-hidden select-none">
      {/* Fixed / Sticky Parallax Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center sm:bg-[center_30%] bg-no-repeat bg-fixed"
        style={{ backgroundImage: "url('/on-section.jpg')" }}
        role="img"
        aria-label="QAXRAMON-RAXIMJON tibbiyot jamoasi"
      />

      {/* Left side subtle blur (Strictly on the left, soft and minimal) */}
      <div className="absolute inset-y-0 left-0 w-full sm:w-[50%] lg:w-[42%] backdrop-blur-sm z-10 [mask-image:linear-gradient(to_right,black_35%,transparent)] [-webkit-mask-image:linear-gradient(to_right,black_35%,transparent)]" />

      {/* Content Container */}
      <div className="relative z-20 h-full flex items-center">
        <Container size="wide">
          <div
            data-aos="fade-right"
            data-aos-duration="850"
            className="max-w-xl sm:max-w-2xl lg:max-w-3xl text-left py-6"
          >
            <h2
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="800"
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-[40px] font-extrabold text-white tracking-tight leading-snug font-sans drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]"
            >
              {t("title")}
            </h2>
            <p
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="800"
              className="mt-3 sm:mt-4 text-xs sm:text-sm lg:text-base text-white/95 max-w-xl leading-relaxed font-medium drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]"
            >
              {t("subtitle")}
            </p>

            <div
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="800"
              className="mt-6 sm:mt-8"
            >
              <button
                type="button"
                onClick={onOpenAppointment}
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#dc2626] hover:bg-[#b91c1c] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-200 shadow-xl shadow-black/30 active:scale-95 cursor-pointer group"
              >
                <span>{t("cta")}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
