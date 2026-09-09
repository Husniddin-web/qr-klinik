"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "../common/Container";

export function HowItWorksSection() {
  const t = useTranslations("howItWorks");

  const steps = [
    {
      step: "01",
      image: "/images/steps/step1-app.jpg",
      titleKey: "step1Title",
      descKey: "step1Desc",
    },
    {
      step: "02",
      image: "/images/steps/step2-doctor.jpg",
      titleKey: "step2Title",
      descKey: "step2Desc",
    },
    {
      step: "03",
      image: "/images/steps/step3-consult.jpg",
      titleKey: "step3Title",
      descKey: "step3Desc",
    },
    {
      step: "04",
      image: "/images/steps/step4-care.jpg",
      titleKey: "step4Title",
      descKey: "step4Desc",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#fafbfc] relative overflow-hidden border-b border-slate-100">
      {/* Background ambient circular rings */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-slate-200/60 pointer-events-none -z-0" />
      <div className="absolute right-12 top-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-slate-200/40 pointer-events-none -z-0" />

      <Container className="relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl lg:text-[40px] font-black text-[#0f172a] tracking-tight leading-snug uppercase">
            {t("title")}
          </h2>
          <div className="w-12 h-1 bg-[#dc2626] mx-auto rounded-full mt-4" />
        </div>

        {/* 4 Connected Circular Steps */}
        <div className="relative">
          {/* Connecting Dashed Line on Desktop */}
          <div className="hidden lg:block absolute top-[68px] left-[14%] right-[14%] h-0.5 border-t-2 border-dashed border-red-200 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 lg:gap-6 relative z-10">
            {steps.map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="flex flex-col items-center text-center group"
              >
                {/* Circular Photo with Number Pill */}
                <div className="relative mb-6">
                  <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-white shadow-[0_10px_30px_rgba(15,23,42,0.08)] group-hover:shadow-[0_15px_35px_rgba(220,38,38,0.18)] group-hover:border-red-100 transition-all duration-300 relative bg-slate-100">
                    <Image
                      src={item.image}
                      alt={t(item.titleKey as any)}
                      fill
                      sizes="144px"
                      className="object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
                    />
                  </div>

                  {/* Step Number Badge */}
                  <div className="absolute top-1 -right-1 w-8 h-8 rounded-full bg-[#dc2626] text-white font-black text-xs flex items-center justify-center shadow-md ring-2 ring-white">
                    {item.step}
                  </div>
                </div>

                {/* Step Title */}
                <h3 className="text-base sm:text-lg font-bold text-[#0f172a] group-hover:text-[#dc2626] transition-colors leading-snug tracking-tight mb-2">
                  {t(item.titleKey as any)}
                </h3>

                {/* Step Description */}
                <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed max-w-[220px]">
                  {t(item.descKey as any)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
