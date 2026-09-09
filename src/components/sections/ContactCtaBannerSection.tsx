"use client";

import React from "react";
import Image from "next/image";
import { Phone, Mail, Clock, Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "../common/Container";

interface ContactCtaBannerSectionProps {
  onOpenAppointment: () => void;
}

export function ContactCtaBannerSection({
  onOpenAppointment,
}: ContactCtaBannerSectionProps) {
  const t = useTranslations("contactBanner");

  return (
    <section className="py-14 sm:py-20 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden bg-[#0f172a] text-white shadow-2xl border border-slate-800"
        >
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[350px] h-[250px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Half: Doctors Cutout + CTA Callout */}
          <div className="px-6 sm:px-12 pt-10 sm:pt-14 pb-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left: Doctors Cutout Photo with Circular Backdrop */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start">
              <div className="relative">
                {/* Circular Graphic Backdrop */}
                <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-gradient-to-tr from-[#dc2626]/20 to-slate-800 border border-white/10 flex items-center justify-center shadow-inner overflow-hidden p-1">
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
                    <Image
                      src="/images/contact/doctor-duo.jpg"
                      alt="Klinika mutaxassislari"
                      fill
                      sizes="256px"
                      className="object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Decorative Pill Badge */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#dc2626] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md whitespace-nowrap">
                  Oliy Toifali Shifokorlar
                </div>
              </div>
            </div>

            {/* Right: Pitch & Booking Action */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
                {t("title")}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {t("subtitle")}
              </p>

              <div className="mt-6 flex justify-center lg:justify-start">
                <button
                  type="button"
                  onClick={onOpenAppointment}
                  className="px-7 sm:px-8 py-3.5 rounded-full bg-[#dc2626] hover:bg-[#b91c1c] text-white text-sm sm:text-base font-bold transition-all duration-200 shadow-lg shadow-red-600/30 flex items-center gap-2.5 active:scale-95 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t("btnBook")}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Strip: 3 Contact Outlined Cards */}
          <div className="px-6 sm:px-12 pb-10 sm:pb-12 pt-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-800/80">
              {/* Card 1: Phone */}
              <a
                href="tel:+998712004545"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-red-500/10 text-[#dc2626] group-hover:bg-[#dc2626] group-hover:text-white transition-colors flex items-center justify-center shrink-0 border border-red-500/20">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="min-w-0 text-left">
                  <div className="text-sm font-bold text-white group-hover:text-red-400 transition-colors truncate">
                    +998 71 200 45 45
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    {t("callUs")}
                  </div>
                </div>
              </a>

              {/* Card 2: Email */}
              <a
                href="mailto:info@qr-klinik.uz"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-red-500/10 text-[#dc2626] group-hover:bg-[#dc2626] group-hover:text-white transition-colors flex items-center justify-center shrink-0 border border-red-500/20">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0 text-left">
                  <div className="text-sm font-bold text-white group-hover:text-red-400 transition-colors truncate">
                    info@qr-klinik.uz
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    {t("emailUs")}
                  </div>
                </div>
              </a>

              {/* Card 3: 24/7 Hours */}
              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="min-w-0 text-left">
                  <div className="text-sm font-bold text-white truncate">
                    {t("supportHours")}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    {t("openDaily")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
