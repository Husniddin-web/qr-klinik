"use client";

import React, { useState, useMemo } from "react";
import { Search, ArrowRight, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { SERVICES_DATA } from "@/data/services";
import { formatPrice } from "@/lib/utils";
import { Container } from "../common/Container";

interface ServicesSectionProps {
  onOpenAppointment: () => void;
  selectedDept?: string;
}

export function ServicesSection({ onOpenAppointment }: ServicesSectionProps) {
  const t = useTranslations("services");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filteredServices = useMemo(() => {
    return SERVICES_DATA.filter((item) => {
      const query = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  const displayedServices = useMemo(() => {
    if (searchQuery.trim()) {
      return filteredServices;
    }
    return showAll ? filteredServices : filteredServices.slice(0, 6);
  }, [filteredServices, searchQuery, showAll]);

  return (
    <section
      id="services"
      className="relative py-20 sm:py-28 bg-[#090e1f] overflow-hidden select-none border-t border-b border-white/5"
    >
      {/* Ambient Lighting & Atmosphere (Non-white rich dark aesthetic) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Soft center red radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-red-600/15 via-red-950/10 to-transparent blur-3xl" />
        {/* Left ambient blue glow */}
        <div className="absolute -left-28 top-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl" />
        {/* Right ambient red glow */}
        <div className="absolute -right-28 bottom-24 w-[550px] h-[550px] bg-red-800/15 rounded-full blur-3xl" />
        {/* Subtle Tech Dot Matrix Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      {/* Background Floating Medical Watermark Icons & Pulse Graph */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        {/* Glowing Heartbeat / EKG Pulse Wave across top */}
        <div className="absolute top-16 left-0 right-0 w-full opacity-20">
          <svg className="w-full h-24 text-red-500" viewBox="0 0 1200 100" fill="none" preserveAspectRatio="none">
            <path
              d="M0,50 L200,50 L220,50 L235,10 L250,90 L265,30 L275,60 L285,50 L500,50 L520,50 L535,10 L550,90 L565,30 L575,60 L585,50 L800,50 L820,50 L835,10 L850,90 L865,30 L875,60 L885,50 L1200,50"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Large Watermark Medical Cross (Upper Left) */}
        <div className="hidden lg:block absolute -left-14 top-36 w-72 h-72 opacity-[0.03] text-red-500">
          <svg viewBox="0 0 200 200" fill="currentColor">
            <path d="M80 20h40v60h60v40h-60v60H80v-60H20V80h60V20z" />
          </svg>
        </div>

        {/* Large Watermark Stethoscope (Upper Right) */}
        <div className="hidden xl:block absolute -right-14 top-40 w-96 h-96 opacity-[0.035] text-slate-300">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
            <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
            <circle cx="20" cy="10" r="2" />
          </svg>
        </div>

        {/* Large Watermark DNA Helix (Bottom Left) */}
        <div className="hidden lg:block absolute left-10 bottom-12 w-64 h-64 opacity-[0.03] text-blue-400">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 15c6.667-6 13.333 0 20-6" />
            <path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993" />
            <path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993" />
            <path d="m17 6-2.5-2.5" />
            <path d="m14 8-1-1" />
            <path d="m7 18 2.5 2.5" />
            <path d="m3.5 14.5.5.5" />
            <path d="m20 9 .5.5" />
            <path d="m6.5 12.5 1 1" />
            <path d="m16.5 10.5 1 1" />
            <path d="m10 16 1 1" />
          </svg>
        </div>
      </div>

      {/* Right Vertical Decorative Label */}
      <div className="hidden xl:flex flex-col items-center gap-3 absolute right-6 bottom-24 text-slate-500 pointer-events-none select-none z-10">
        <span className="[writing-mode:vertical-lr] rotate-180 text-[10px] font-bold tracking-[0.25em] text-slate-500 uppercase">
          Shaffof Tariflar • 2026
        </span>
        <div className="w-px h-14 bg-gradient-to-b from-slate-600 to-transparent" />
      </div>

      <Container className="relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 px-4">
          <h2
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.2] text-white uppercase"
          >
            <span className="block">{t("title")}</span>
          </h2>

          <div
            data-aos="zoom-in"
            data-aos-delay="180"
            className="w-12 h-1 bg-[#dc2626] mx-auto rounded-full mt-4 mb-4"
          />

          <p
            data-aos="fade-up"
            data-aos-delay="240"
            className="text-slate-400 text-xs sm:text-sm md:text-base font-normal max-w-2xl mx-auto leading-relaxed"
          >
            {t("subtitle")}
          </p>
        </div>

        {/* High-Visibility Minimalist Search Bar */}
        <div
          data-aos="fade-up"
          data-aos-delay="150"
          className="max-w-2xl mx-auto mb-10 sm:mb-12 px-4 relative"
        >
          <div className="relative flex items-center bg-[#111a36] hover:bg-[#142042] focus-within:bg-[#142042] border-2 border-slate-700/80 hover:border-slate-500 focus-within:border-[#dc2626] rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.45)] transition-all duration-200">
            <Search className="w-5 h-5 text-slate-300 ml-4 shrink-0 pointer-events-none" />
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-3 pr-24 py-3 sm:py-3.5 bg-transparent text-white placeholder:text-slate-400 text-sm font-medium focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-200 hover:text-white text-xs px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer border border-slate-600/50"
              >
                Tozalash
              </button>
            )}
          </div>
        </div>

        {/* Compact 3-Column Card Grid (Reduced Padding) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {displayedServices.length === 0 ? (
            <div className="col-span-full text-center py-16 bg-white/[0.02] border border-white/10 rounded-2xl text-slate-400 text-sm">
              Hech qanday xizmat topilmadi. Qidiruv so&apos;rovini o&apos;zgartirib ko&apos;ring.
            </div>
          ) : (
            displayedServices.map((service, idx) => {
              return (
                <div
                  key={service.id}
                  data-aos="fade-up"
                  data-aos-delay={((idx % 3) + 1) * 70}
                  data-aos-duration="600"
                  className="group relative rounded-2xl p-5 sm:p-5.5 flex flex-col justify-between transition-all duration-300 ease-out hover:scale-[1.02] hover:-translate-y-1 bg-white/[0.035] hover:bg-white/[0.07] border border-white/10 hover:border-white/25 shadow-md hover:shadow-xl backdrop-blur-md will-change-transform"
                >
                  <div>
                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug tracking-tight">
                      {service.title}
                    </h3>

                    {/* Description (agar bo'lsa) */}
                    {service.description && (
                      <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed mt-2 line-clamp-2 font-normal">
                        {service.description}
                      </p>
                    )}
                  </div>

                  {/* Bottom Row: Direct Price + Red Booking Action */}
                  <div className="pt-3.5 mt-4 border-t border-white/10 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium block">
                        Narxi
                      </span>
                      <div className="text-lg sm:text-xl font-black text-white tracking-tight">
                        {formatPrice(service.price)}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={onOpenAppointment}
                      aria-label={`${service.title} uchun qabulga yozilish`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#dc2626] hover:bg-[#b91c1c] active:scale-95 text-white text-xs font-bold transition-all duration-200 shadow-md shadow-red-600/30 hover:shadow-lg hover:shadow-red-600/40 cursor-pointer shrink-0"
                    >
                      <span>{t("book")}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Show More / Show Less Toggle (When > 6 and not searching) */}
        {!searchQuery.trim() && filteredServices.length > 6 && (
          <div className="text-center mt-10" data-aos="fade-up">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-95 cursor-pointer shadow-sm"
            >
              <span>{showAll ? "Kamroq ko'rsatish (6 ta)" : `Barcha xizmatlarni ko'rish (${filteredServices.length})`}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showAll ? "rotate-180" : ""}`} />
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
