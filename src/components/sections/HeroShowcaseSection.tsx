"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Quote } from "lucide-react";
import { m as motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "../common/Container";
import { TiltCard } from "../common/TiltCard";

interface HeroShowcaseSectionProps {
  onOpenAppointment?: () => void;
}

export function HeroShowcaseSection({ onOpenAppointment }: HeroShowcaseSectionProps) {
  const t = useTranslations("showcase");

  return (
    <section className="py-6 sm:py-10 bg-white relative z-20">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Card 1: Compassionate Care for Seniors */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="h-full"
          >
            <TiltCard
              onClick={onOpenAppointment}
              maxTilt={6}
              glare={true}
              className="group relative h-[360px] sm:h-[400px] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
            <Image
              src="/images/showcase/elderly-care.jpg"
              alt="Kattalar va reabilitatsiya parvarishi"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white">
              <h3 className="text-base sm:text-lg font-bold leading-snug tracking-tight text-white drop-shadow-sm">
                {t("card1Title")}
              </h3>
            </div>
            </TiltCard>
          </motion.div>

          {/* Card 2: Pediatrics with Arrow */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="h-full"
          >
            <TiltCard
              onClick={onOpenAppointment}
              maxTilt={6}
              glare={true}
              className="group relative h-[360px] sm:h-[400px] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <Image
                src="/images/showcase/pediatrics.jpg"
                alt="Pediatriya va bolalar salomatligi"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Top-left rounded action pill */}
              <div className="absolute top-4 left-4 z-10">
                <div className="w-10 h-10 rounded-full bg-white/95 text-slate-800 flex items-center justify-center shadow-md group-hover:bg-[#dc2626] group-hover:text-white transition-all duration-200">
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:scale-110" />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white">
                <h3 className="text-base sm:text-lg font-bold leading-snug tracking-tight text-white drop-shadow-sm">
                  {t("card2Title")}
                </h3>
              </div>
            </TiltCard>
          </motion.div>

          {/* Card 3: Patient Testimonial Glass Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="h-full"
          >
            <TiltCard
              maxTilt={6}
              glare={true}
              className="group relative h-[360px] sm:h-[400px] rounded-3xl p-6 flex flex-col justify-between bg-gradient-to-br from-[#fff7ed]/80 via-[#fef2f2]/60 to-[#f1f5f9] border border-red-100/80 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Top Row */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {t("card3Badge")}
                </span>
                <div className="w-10 h-10 rounded-full bg-white text-slate-700 flex items-center justify-center shadow-xs border border-slate-100">
                  <ArrowUpRight className="w-5 h-5 text-[#dc2626]" />
                </div>
              </div>

              {/* Middle Quote */}
              <div className="my-auto py-4">
                <p className="text-sm sm:text-[15px] font-medium text-slate-700 leading-relaxed italic">
                  &ldquo;{t("card3Quote")}&rdquo;
                </p>
              </div>

              {/* Bottom Row */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200/60">
                <div className="flex items-center gap-2.5">
                  {/* Avatars Stack */}
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-slate-300 border-2 border-white overflow-hidden relative">
                      <Image
                        src="/images/doctor-1.jpg"
                        alt="Avatar"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-300 border-2 border-white overflow-hidden relative">
                      <Image
                        src="/images/doctor-2.jpg"
                        alt="Avatar"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-300 border-2 border-white overflow-hidden relative">
                      <Image
                        src="/images/doctor-3.jpg"
                        alt="Avatar"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-800">
                    {t("card3Reviews")}
                  </span>
                </div>

                <Quote className="w-6 h-6 text-[#dc2626]/30" />
              </div>
            </TiltCard>
          </motion.div>

          {/* Card 4: Doctors Who Truly Care for You */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="h-full"
          >
            <TiltCard
              onClick={onOpenAppointment}
              maxTilt={6}
              glare={true}
              className="group relative h-[360px] sm:h-[400px] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <Image
                src="/images/showcase/doctors-team.jpg"
                alt="Malakali shifokorlar jamoasi"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white">
                <h3 className="text-base sm:text-lg font-bold leading-snug tracking-tight text-white drop-shadow-sm">
                  {t("card4Title")}
                </h3>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
