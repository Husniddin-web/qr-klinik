"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS_DATA } from "@/data/faqs";
import { Container } from "../common/Container";
import { SectionHeading } from "../common/SectionHeading";

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-24 bg-white border-b border-slate-100">
      <Container>
        <SectionHeading
          eyebrow="Ko'p Beriladigan Savollar"
          title="Tez-Tez Qiziqadigan Savollarga Javoblar"
          subtitle="Klinikamiz ish tartibi, tekshiruvlarga tayyorgarlik, tahlillar va to'lov shartlari haqida muhim ma'lumotlar."
        />

        <div
          data-aos="fade-up"
          data-aos-duration="750"
          className="max-w-3xl mx-auto space-y-3"
        >
          {FAQS_DATA.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-[#0f172a] bg-slate-50/70"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-[#0f172a] leading-snug">
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-[#0f172a] text-white border-[#0f172a]" : "text-slate-500 bg-white"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 animate-fadeIn">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
