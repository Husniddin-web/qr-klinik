"use client";

import React from "react";
import { Phone, AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "../common/Container";
import { CLINIC_CONTACT } from "@/data/navigation";

export function UrgentCareStrip() {
  const t = useTranslations("urgent");

  return (
    <div className="bg-slate-50 border-b border-slate-200 py-3.5 text-xs">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-600">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
            <span className="font-bold text-ink tracking-wide">{t("badge")}:</span>
            <span className="text-slate-600 font-normal">{t("subtitle")}</span>
          </div>

          <a
            href={`tel:${CLINIC_CONTACT.emergencyPhone.replace(/\s+/g, "")}`}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/10 text-accent hover:bg-accent hover:text-white font-bold text-xs transition-colors shrink-0"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{CLINIC_CONTACT.emergencyPhone}</span>
          </a>
        </div>
      </Container>
    </div>
  );
}
