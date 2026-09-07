"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  CheckCircle2,
  ArrowRight,
  Send,
  Globe,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { CLINIC_CONTACT } from "@/data/navigation";
import { Container } from "../common/Container";

export function ContactMapSection() {
  const t = useTranslations("contact");
  const [formData, setFormData] = useState({
    name: "",
    phone: "+998 ",
    message: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 500);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#f8fafc] border-b border-slate-200/80 relative overflow-hidden">
      {/* Subtle Stylized Map Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-40 select-none overflow-hidden">
        <svg
          className="w-full h-full text-slate-300/50"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="none"
        >
          <defs>
            <pattern
              id="map-roads"
              x="0"
              y="0"
              width="180"
              height="180"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 45 Q 90 20, 180 60 M0 120 Q 70 140, 180 110 M60 0 Q 75 90, 45 180 M130 0 Q 115 80, 145 180"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeDasharray="4 6"
              />
              <circle cx="60" cy="45" r="2.5" fill="currentColor" opacity="0.6" />
              <circle cx="130" cy="115" r="2" fill="currentColor" opacity="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#map-roads)" />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8fafc] via-transparent to-[#f8fafc]" />
      </div>

      <Container className="relative z-10">
        {/* Clean, Minimalist Section Heading (No Badges) */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <h2
            data-aos="fade-down"
            data-aos-duration="700"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0f172a] tracking-tight leading-tight"
          >
            {t("title")}
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="700"
            className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed"
          >
            {t("subtitle")}
          </p>
        </div>

        {/* Master Overlapping Elevated Card Layout (Figma Reference Image 2) */}
        <div className="relative max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* 1. Left Elevated Deep Navy Card (Overlaps the white form card) */}
            <div
              data-aos="fade-right"
              data-aos-delay="200"
              data-aos-duration="850"
              className="lg:col-span-5 relative z-20"
            >
              <div className="bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white rounded-2xl p-7 sm:p-9 lg:p-10 shadow-[0_20px_50px_-10px_rgba(15,23,42,0.35)] border border-slate-800 flex flex-col justify-between min-h-[440px] lg:-mr-8">
                
                {/* Header */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    Bog&apos;lanish
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                    Klinikamiz Toshkent shahrining markazida qulay joylashgan.
                  </p>
                </div>

                {/* Contact Items with Minimalist Icons */}
                <div className="space-y-5 my-7 text-xs sm:text-sm">
                  {/* Address */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-[#dc2626]">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="leading-snug">
                      <div className="text-slate-200 font-medium">
                        {CLINIC_CONTACT.address}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Mo&apos;ljal: Yunusobod metro bekati yaqinida
                      </div>
                    </div>
                  </div>

                  {/* Phones */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-white">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="leading-snug space-y-1">
                      <div>
                        <a
                          href={`tel:${CLINIC_CONTACT.phones[0].replace(/\s+/g, "")}`}
                          className="text-slate-200 font-medium hover:text-white transition-colors"
                        >
                          {CLINIC_CONTACT.phones[0]}
                        </a>
                        <span className="text-[11px] text-slate-400 ml-1.5">(Qabulxona)</span>
                      </div>
                      <div>
                        <a
                          href={`tel:${CLINIC_CONTACT.emergencyPhone.replace(/\s+/g, "")}`}
                          className="text-[#ef4444] font-semibold hover:underline"
                        >
                          {CLINIC_CONTACT.emergencyPhone}
                        </a>
                        <span className="text-[11px] text-red-400/80 ml-1.5">(24/7 Shoshilinch)</span>
                      </div>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-slate-300">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="leading-snug text-slate-200">
                      <div>{CLINIC_CONTACT.workingHours.split("|")[0]?.trim()}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {CLINIC_CONTACT.workingHours.split("|")[1]?.trim()}
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-slate-300">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="leading-snug">
                      <a
                        href={`mailto:${CLINIC_CONTACT.email}`}
                        className="text-slate-200 hover:text-white transition-colors"
                      >
                        {CLINIC_CONTACT.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Bottom Social / Quick Links */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                  <a
                    href="https://t.me"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Telegram"
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={`tel:${CLINIC_CONTACT.phones[0].replace(/\s+/g, "")}`}
                    aria-label="Telefon qo'ng'iroq"
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="#hero"
                    aria-label="Veb-sayt"
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5" />
                  </a>
                  <span className="text-[11px] text-slate-400 ml-auto font-medium">
                    24/7 Qabul Markazi
                  </span>
                </div>

              </div>
            </div>

            {/* 2. Right Base White Card (Form) */}
            <div
              data-aos="fade-left"
              data-aos-delay="300"
              data-aos-duration="850"
              className="lg:col-span-7 relative z-10 mt-6 lg:mt-0"
            >
              <div className="bg-white rounded-2xl border border-slate-200/90 p-7 sm:p-9 lg:p-12 lg:pl-14 shadow-[0_15px_40px_-12px_rgba(15,23,42,0.07)] text-left">
                {isSuccess ? (
                  <div className="text-center py-10 space-y-3">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-bold text-[#0f172a]">
                      Murojaatingiz qabul qilindi!
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                      Operatorimiz 15 daqiqa ichida siz bilan bog&apos;lanib, qabul vaqtini tasdiqlaydi.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsSuccess(false)}
                      className="mt-4 px-6 py-2.5 rounded-full bg-[#0f172a] text-white text-xs font-bold transition-colors cursor-pointer hover:bg-slate-800"
                    >
                      Yangi murojaat
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-5">
                      <h3 className="text-xl sm:text-2xl font-bold text-[#0f172a] tracking-tight">
                        {t("formTitle")}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Ma&apos;lumotlaringizni qoldiring, tez orada mutaxassisimiz siz bilan bog&apos;lanadi.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          {t("nameLabel")}
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ismingizni kiriting"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0f172a] focus:bg-white focus:ring-2 focus:ring-[#0f172a]/10 font-medium transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          {t("phoneLabel")}
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+998 90 123 45 67"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0f172a] focus:bg-white focus:ring-2 focus:ring-[#0f172a]/10 font-medium transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        {t("msgLabel")}
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Qo'shimcha shikoyat yoki ma'lumot (ixtiyoriy)..."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0f172a] focus:bg-white focus:ring-2 focus:ring-[#0f172a]/10 font-medium transition-all resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer disabled:opacity-50 shadow-md shadow-[#dc2626]/25 hover:shadow-lg hover:shadow-[#dc2626]/35 active:scale-95 flex items-center justify-center gap-2"
                      >
                        <span>{isSubmitting ? t("submitting") : t("submitBtn")}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}

