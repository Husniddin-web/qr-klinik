"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { EQUIPMENT_DATA } from "@/data/equipment";
import { formatPrice, cn } from "@/lib/utils";
import { Container } from "../common/Container";
import { SectionHeading } from "../common/SectionHeading";
import { Reveal } from "../common/Reveal";
import { EquipmentStage } from "./EquipmentStage";

interface EquipmentSectionProps {
  onOpenAppointment: (serviceTitle?: string) => void;
}

/**
 * Uskunalar: chapda "sahna" (render + parallax), o'ngda uskunalar ro'yxati.
 * Ro'yxatdan tanlanganda sahna almashadi, ostida tanlangan uskuna tavsifi.
 */
export function EquipmentSection({ onOpenAppointment }: EquipmentSectionProps) {
  const t = useTranslations("equipment");
  const [activeId, setActiveId] = useState(EQUIPMENT_DATA[0]?.id ?? "");
  const active = EQUIPMENT_DATA.find((e) => e.id === activeId) ?? EQUIPMENT_DATA[0];

  return (
    <section id="equipment" className="section-pad bg-canvas-soft border-b border-line">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Sahna */}
          <Reveal className="lg:col-span-7">
            <EquipmentStage image={active.image} alt={active.name} itemKey={active.id} />
          </Reveal>

          {/* Tanlov: nom, model, narx — bitta ro'yxat, ortiqcha karta yo'q */}
          <Reveal delay={0.1} className="lg:col-span-5">
            <ul role="tablist" className="rounded-xl bg-white border border-line divide-y divide-line overflow-hidden">
              {EQUIPMENT_DATA.map((eq) => {
                const isActive = eq.id === activeId;
                return (
                  <li key={eq.id}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveId(eq.id)}
                      className={cn(
                        "w-full text-left px-5 py-4 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 transition-colors cursor-pointer",
                        isActive ? "bg-ink text-white" : "text-ink hover:bg-canvas-soft"
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn("w-1 h-9 rounded-full transition-colors", isActive ? "bg-accent" : "bg-line")}
                      />
                      <span className="min-w-0 font-display font-semibold text-[15px] leading-snug">{eq.name}</span>
                      {eq.price && (
                        <span className={cn("font-display font-semibold text-sm tabular-nums whitespace-nowrap", isActive ? "text-white" : "text-ink")}>
                          {formatPrice(eq.price)}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            <button
              type="button"
              onClick={() => onOpenAppointment(active.name)}
              className="group mt-5 inline-flex items-center gap-1.5 h-10 px-5 rounded-lg bg-ink text-white text-[13px] font-semibold hover:bg-accent transition-colors cursor-pointer"
            >
              {t("bookTest")}
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
