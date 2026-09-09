"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "../common/Container";

export function AboutSection() {
  const t = useTranslations("about");

  return (
    <section
      id="about"
      className="relative bg-[#fafbfd] border-b border-slate-200/70 py-16 sm:py-24 lg:py-28 overflow-hidden"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-20 items-center">
          
          {/* Left Column: Pure Editorial Typography (Zero generic badges, concise narrative) */}
          <div
            data-aos="fade-right"
            data-aos-duration="850"
            className="lg:col-span-5 flex flex-col justify-center text-left"
          >
            {/* Title: Big, Bold, Clean */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight leading-[1.15]">
              {t("title")}
            </h2>

            {/* Subheading: Powerful one-sentence philosophy */}
            <p className="mt-5 sm:mt-6 text-lg sm:text-xl font-bold text-slate-800 leading-snug">
              {t("subheading")}
            </p>

            {/* Body Description: Concise and human */}
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {t("desc")}
            </p>
          </div>

          {/* Right Column: Handcrafted Asymmetric Multi-Photo Layered Composition */}
          <div
            data-aos="fade-left"
            data-aos-duration="850"
            className="lg:col-span-7 relative w-full"
          >
            <div className="relative w-full max-w-[620px] mx-auto lg:ml-auto h-[420px] sm:h-[500px] lg:h-[540px]">
              
              {/* Layer 1 (Anchor): Doctors & Modern Clinic Courtyard */}
              <div
                data-aos="fade-up"
                data-aos-delay="100"
                data-aos-duration="850"
                className="absolute top-0 right-0 w-[86%] sm:w-[82%] h-[68%] sm:h-[72%] rounded-3xl sm:rounded-[32px] overflow-hidden shadow-[0_20px_45px_rgba(15,23,42,0.12)] border border-slate-200/60 group"
              >
                <Image
                  src="/on-section.jpg"
                  alt="QAXRAMON-RAXIMJON Klinikasi shifokorlar jamoasi"
                  fill
                  priority
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Layer 2 (High-Tech Diagnostic Insight - Overlapping bottom-left): Siemens 3.0T MRT scan room */}
              <div
                data-aos="fade-up"
                data-aos-delay="250"
                data-aos-duration="850"
                className="absolute bottom-0 left-0 w-[64%] sm:w-[58%] h-[48%] sm:h-[52%] rounded-2xl sm:rounded-[26px] overflow-hidden shadow-[0_25px_50px_rgba(15,23,42,0.22)] border-[5px] sm:border-[6px] border-white z-20 group"
              >
                <Image
                  src="/images/heroes/hero-services.jpg"
                  alt="Siemens 3.0 Tesla MRT diagnostika xonasi"
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Layer 3 (Empathetic Patient Care - Overlapping top-left vertical accent): Caring pediatrician & child */}
              <div
                data-aos="fade-right"
                data-aos-delay="350"
                data-aos-duration="850"
                className="hidden sm:block absolute top-8 sm:top-10 -left-4 sm:-left-6 w-[34%] h-[44%] rounded-2xl sm:rounded-[24px] overflow-hidden shadow-[0_20px_40px_rgba(15,23,42,0.18)] border-[5px] sm:border-[6px] border-white z-10 group"
              >
                <Image
                  src="/images/showcase/pediatrics.jpg"
                  alt="Bemorlarga mehrli g'amxo'rlik"
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
