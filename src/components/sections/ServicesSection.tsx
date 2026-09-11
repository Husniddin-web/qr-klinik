"use client";

import React, { useState, useMemo } from "react";
import { Search, ArrowRight, ChevronDown, X } from "lucide-react";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SERVICES_DATA } from "@/data/services";
import type { IService } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Container } from "../common/Container";
import { AnimatedDivider } from "../common/AnimatedDivider";
import { Reveal } from "../common/Reveal";
import { EASE, DUR, SPRING } from "@/lib/animations";

interface ServicesSectionProps {
  onOpenAppointment: (serviceTitle?: string) => void;
  selectedDept?: string;
  services?: IService[];
}

export function ServicesSection({ onOpenAppointment, selectedDept, services = SERVICES_DATA }: ServicesSectionProps) {
  const t = useTranslations("services");
  const shouldReduceMotion = useReducedMotion();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filteredServices = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return services.filter((item) => {
      // Bo'lim kartochkasidan kelingan bo'lsa — faqat o'sha bo'lim xizmatlari
      if (selectedDept && !query && item.departmentId !== selectedDept) return false;
      return (
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, services, selectedDept]);

  const displayedServices = useMemo(() => {
    if (searchQuery.trim()) return filteredServices;
    return showAll ? filteredServices : filteredServices.slice(0, 6);
  }, [filteredServices, searchQuery, showAll]);

  return (
    <section
      id="services"
      className="relative py-20 sm:py-28 bg-[#0f172a] select-none border-y border-slate-800"
    >
      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 px-4">
          <Reveal as="h2" delay={0.1} className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.2] text-white uppercase">
            {t("title")}
          </Reveal>
          <AnimatedDivider />
        </div>

        {/* Qidiruv */}
        <Reveal delay={0.15} className="max-w-2xl mx-auto mb-10 sm:mb-12 px-4 relative">
          <div className="relative flex items-center bg-[#1e293b] border border-slate-700 hover:border-slate-600 focus-within:border-[#dc2626] focus-within:ring-4 focus-within:ring-red-500/10 rounded-xl shadow-sm transition-all duration-200">
            <Search className="w-5 h-5 text-slate-400 ml-4 shrink-0 pointer-events-none" />
            <input
              type="search"
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-3 pr-12 py-3 sm:py-3.5 bg-transparent text-white placeholder:text-slate-400 text-sm font-medium focus:outline-none [&::-webkit-search-cancel-button]:hidden"
            />
            <AnimatePresence>
              {searchQuery && (
                <m.button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Tozalash"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={SPRING.snappy}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-slate-700"
                >
                  <X className="w-3.5 h-3.5" />
                </m.button>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        {/* Kartochkalar — `layout` bilan qidiruvda silliq qayta joylashadi */}
        <m.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          <AnimatePresence mode="popLayout" initial={false}>
            {displayedServices.length === 0 ? (
              <m.div
                key="empty"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="col-span-full text-center py-16 bg-[#1e293b] border border-slate-800 rounded-xl text-slate-400 text-sm"
              >
                Hech qanday xizmat topilmadi. Qidiruv so&apos;rovini o&apos;zgartirib ko&apos;ring.
              </m.div>
            ) : (
              displayedServices.map((service, idx) => (
                <m.div
                  key={service.id}
                  layout
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                  transition={{
                    layout: SPRING.soft,
                    duration: DUR.base,
                    delay: Math.min(idx, 5) * 0.06,
                    ease: EASE,
                  }}
                  whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                  className="group relative rounded-xl p-5 sm:p-6 flex flex-col justify-between bg-[#1e293b] border border-slate-800 hover:border-slate-600 shadow-sm hover:shadow-[0_18px_40px_-14px_rgba(220,38,38,0.35)] transition-[border-color,box-shadow] duration-300"
                >
                  {/* Hover'da yuqori chetdan qizil chiziq */}
                  <span className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-[#dc2626] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug tracking-tight">
                      {service.title}
                    </h3>
                    {service.description && (
                      <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed mt-2 line-clamp-2 font-normal">
                        {service.description}
                      </p>
                    )}
                  </div>

                  <div className="pt-3.5 mt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium block">
                        Narxi
                      </span>
                      <div className="text-lg sm:text-xl font-black text-white tracking-tight">
                        {formatPrice(service.price)}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onOpenAppointment(service.title)}
                      aria-label={`${service.title} uchun qabulga yozilish`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white text-xs font-bold transition-all duration-150 shadow-xs cursor-pointer shrink-0"
                    >
                      <span>{t("book")}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </m.div>
              ))
            )}
          </AnimatePresence>
        </m.div>

        {!searchQuery.trim() && filteredServices.length > 6 && (
          <Reveal className="text-center mt-10">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1e293b] hover:bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm font-semibold transition-all duration-150 active:scale-95 cursor-pointer shadow-xs"
            >
              <span>
                {showAll ? "Kamroq ko'rsatish (6 ta)" : `Barcha xizmatlarni ko'rish (${filteredServices.length})`}
              </span>
              <m.span animate={{ rotate: showAll ? 180 : 0 }} transition={{ duration: DUR.fast, ease: EASE }} className="inline-flex">
                <ChevronDown className="w-4 h-4" />
              </m.span>
            </button>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
