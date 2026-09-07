"use client";

import React, { useState } from "react";
import { Search, Download, FileText, Lock, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "../common/Container";
import { SectionHeading } from "../common/SectionHeading";

export function LabResultsSection() {
  const t = useTranslations("lab");
  const [testCode, setTestCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+998 ");
  const [isSearching, setIsSearching] = useState(false);
  const [resultFound, setResultFound] = useState<boolean | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testCode.trim()) return;

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setResultFound(true);
    }, 500);
  };

  return (
    <section id="lab-results" className="py-24 bg-white border-b border-slate-100">
      <Container>
        <SectionHeading
          eyebrow="Avtomatlashtirilgan Laboratoriya"
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="max-w-xl mx-auto bg-[#f8fafc] rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6 pb-4 border-b border-slate-200">
            <Lock className="w-3.5 h-3.5 text-[#dc2626]" />
            <span>256-bit shifrlangan xavfsiz bemor ma&apos;lumotlari portali</span>
          </div>

          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#0f172a] mb-2 uppercase tracking-wider">
                {t("codeLabel")}
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="Masalan: QR-849204"
                  value={testCode}
                  onChange={(e) => {
                    setTestCode(e.target.value);
                    setResultFound(null);
                  }}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0f172a] font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0f172a] mb-2 uppercase tracking-wider">
                {t("phoneLabel")}
              </label>
              <input
                type="tel"
                placeholder="+998 90 123 45 67"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0f172a] font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={isSearching}
              className="w-full py-3.5 rounded-xl bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer disabled:opacity-50 active:scale-98 shadow-md"
            >
              {isSearching ? t("btnSearching") : t("btnSearch")}
            </button>
          </form>

          {resultFound && (
            <div className="mt-6 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm animate-fadeIn">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[#0f172a] shrink-0">
                    <FileText className="w-5 h-5 text-[#0f172a]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0f172a]">
                      Natija tayyor (ID: {testCode})
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Umumiy qon tahlili • PDF hujjat
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => alert("Yuklab olinmoqda...")}
                  className="px-4 py-2 rounded-xl bg-[#dc2626] hover:bg-[#b91c1c] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t("btnDownload")}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
