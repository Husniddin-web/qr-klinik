"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { FAQS_DATA } from "@/data/faqs";

interface FaqSectionProps {
  onOpenAppointment?: () => void;
}

export function FaqSection({ onOpenAppointment }: FaqSectionProps) {
  const t = useTranslations("faq");
  const [openId, setOpenId] = useState<string | null>("faq-1");
  const [activeTab, setActiveTab] = useState<"all" | "urgent" | "diagnostic">("all");

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  // Filter questions based on active tab
  const filteredFaqs = FAQS_DATA.filter((item) => {
    if (activeTab === "urgent") {
      return item.id === "faq-2" || item.id === "faq-5";
    }
    if (activeTab === "diagnostic") {
      return item.id === "faq-1" || item.id === "faq-3";
    }
    return true; // "all"
  });

  const handleAskQuestion = () => {
    if (onOpenAppointment) {
      onOpenAppointment();
    } else {
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="faq"
      className="w-full bg-[#fafbfc] border-y border-slate-200/80 overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row items-stretch w-full min-h-[600px] lg:min-h-[680px]">
        {/* Left Side: Full Rectangular Photo (Edge-to-Edge) */}
        <div className="w-full lg:w-1/2 relative min-h-[380px] sm:min-h-[460px] lg:min-h-full overflow-hidden bg-slate-200">
          <Image
            src="/images/faq-nurse-patient.jpg"
            alt="Bemorlar bilan samimiy g'amxo'rlik"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            className="object-cover object-center"
          />
          {/* Subtle natural vignette overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/10 lg:to-black/20 pointer-events-none" />
        </div>

        {/* Right Side: Patient Information FAQ Accordions */}
        <div className="w-full lg:w-1/2 px-6 sm:px-12 lg:px-16 xl:px-20 py-12 sm:py-16 lg:py-20 flex flex-col justify-center bg-[#fafbfc]">
          <div className="max-w-xl w-full mx-auto lg:mx-0 text-left">
            {/* Main Section Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-black text-[#0f172a] tracking-tight leading-tight">
              {t("title")}
            </h2>

            {/* Sub-Category Filter Tabs (Matching Screenshot: General | Urgent) */}
            <div className="flex items-center gap-3 text-xs sm:text-sm font-bold mt-3 mb-7">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={`transition-colors cursor-pointer ${
                  activeTab === "all"
                    ? "text-[#dc2626]"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {t("tabGeneral")}
              </button>
              <span className="text-slate-300">|</span>
              <button
                type="button"
                onClick={() => setActiveTab("urgent")}
                className={`transition-colors cursor-pointer ${
                  activeTab === "urgent"
                    ? "text-[#dc2626]"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {t("tabUrgent")}
              </button>
              <span className="text-slate-300">|</span>
              <button
                type="button"
                onClick={() => setActiveTab("diagnostic")}
                className={`transition-colors cursor-pointer ${
                  activeTab === "diagnostic"
                    ? "text-[#dc2626]"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {t("tabDiagnostic")}
              </button>
            </div>

            {/* Accordion Cards (Screenshot Style: Numbered, White Cards, Crisp Borders) */}
            <div className="space-y-3">
              {filteredFaqs.slice(0, 4).map((item, idx) => {
                const isOpen = openId === item.id;

                return (
                  <div
                    key={item.id}
                    className={`rounded-xl sm:rounded-2xl transition-all duration-200 border overflow-hidden ${
                      isOpen
                        ? "bg-white border-slate-200 shadow-sm"
                        : "bg-white border-slate-200/70 hover:border-slate-300 shadow-xs"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span className="text-xs sm:text-[15px] font-bold text-[#0f172a] leading-snug flex items-start">
                        <span className="text-[#dc2626] mr-2.5 font-bold shrink-0">
                          {idx + 1}.
                        </span>
                        <span>{item.question}</span>
                      </span>
                      <div className="text-[#dc2626] shrink-0 ml-2">
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-0 text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal animate-fadeIn pl-9 sm:pl-10">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Action Pill Button (Matching Screenshot: Ask Question ->) */}
            <div className="pt-6">
              <button
                type="button"
                onClick={handleAskQuestion}
                className="px-7 py-3 rounded-full border-2 border-[#dc2626] text-[#dc2626] hover:bg-[#dc2626] hover:text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 inline-flex items-center gap-2 cursor-pointer shadow-xs active:scale-95"
              >
                <span>{t("askBtn")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
