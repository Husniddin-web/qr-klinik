"use client";

import React from "react";
import { Check, ShieldCheck, Activity } from "lucide-react";
import { useTranslations } from "next-intl";
import { EQUIPMENT_DATA } from "@/data/equipment";
import { formatPrice } from "@/lib/utils";
import { Container } from "../common/Container";
import { SectionHeading } from "../common/SectionHeading";

interface EquipmentSectionProps {
  onOpenAppointment: () => void;
}

export function EquipmentSection({ onOpenAppointment }: EquipmentSectionProps) {
  const t = useTranslations("equipment");

  return (
    <section id="equipment" className="py-24 bg-white border-b border-slate-100">
      <Container>
        <SectionHeading
          eyebrow="Ilg'or Diagnostika Uskunalari"
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {EQUIPMENT_DATA.map((eq) => (
            <div
              key={eq.id}
              className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 hover:border-[#0f172a] hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#dc2626]">
                    {eq.originCountry} • {eq.model}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    100% Xalqaro Sertifikat
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#0f172a] mb-3">
                  {eq.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {eq.shortDescription}
                </p>

                <div className="space-y-2.5 mb-8 pt-4 border-t border-slate-100">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0f172a] mb-1">
                    {t("specs")}
                  </div>
                  {eq.fullSpecs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                      <Check className="w-4 h-4 text-[#dc2626] shrink-0 mt-0.5" />
                      <span className="leading-snug">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 border-t border-slate-100 flex items-center justify-between gap-4">
                {eq.price ? (
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">
                      {t("priceLabel")}
                    </span>
                    <span className="text-lg font-extrabold text-[#0f172a] tracking-tight">
                      {formatPrice(eq.price)}
                    </span>
                  </div>
                ) : (
                  <div className="text-xs text-slate-400 font-medium">
                    Klinika bazasida to&apos;liq
                  </div>
                )}

                <button
                  type="button"
                  onClick={onOpenAppointment}
                  className="px-5 py-2.5 rounded-full bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold text-xs transition-all duration-200 cursor-pointer active:scale-95 shrink-0"
                >
                  {t("bookTest")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
