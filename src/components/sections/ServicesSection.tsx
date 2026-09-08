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
      className="relative py-20 sm:py-28 bg-[#0f172a] select-none border-y border-slate-800"
    >
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
          <div className="relative flex items-center bg-[#1e293b] border border-slate-700 hover:border-slate-600 focus-within:border-[#dc2626] rounded-xl shadow-sm transition-all duration-200">
            <Search className="w-5 h-5 text-slate-400 ml-4 shrink-0 pointer-events-none" />
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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-white text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer border border-slate-700"
              >
                Tozalash
              </button>
            )}
          </div>
        </div>

        {/* Compact 3-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {displayedServices.length === 0 ? (
            <div className="col-span-full text-center py-16 bg-[#1e293b] border border-slate-800 rounded-xl text-slate-400 text-sm">
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
                  className="group relative rounded-xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 bg-[#1e293b] hover:bg-[#1e293b]/90 border border-slate-800 hover:border-slate-700 shadow-sm hover:shadow-md"
                >
                  <div>
                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug tracking-tight">
                      {service.title}
                    </h3>

                    {/* Description */}
                    {service.description && (
                      <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed mt-2 line-clamp-2 font-normal">
                        {service.description}
                      </p>
                    )}
                  </div>

                  {/* Bottom Row: Direct Price + Red Booking Action */}
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
                      onClick={onOpenAppointment}
                      aria-label={`${service.title} uchun qabulga yozilish`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#dc2626] hover:bg-red-700 active:scale-95 text-white text-xs font-bold transition-all duration-150 shadow-xs cursor-pointer shrink-0"
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
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1e293b] hover:bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm font-semibold transition-all duration-150 active:scale-95 cursor-pointer shadow-xs"
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
