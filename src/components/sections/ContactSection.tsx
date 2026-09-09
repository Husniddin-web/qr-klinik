"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Phone,
  Mail,
  Clock,
  ArrowRight,
  User,
  MessageSquare,
  CheckCircle2,
  Lock,
  RotateCcw,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { CLINIC_CONTACT } from "@/data/navigation";
import { Container } from "../common/Container";

interface ContactSectionProps {
  onOpenAppointment?: () => void;
}

export function ContactSection({ onOpenAppointment }: ContactSectionProps) {
  const t = useTranslations("contact");

  const [formData, setFormData] = useState({
    name: "",
    phone: "+998 ",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith("+998")) {
      val = "+998 ";
    }
    setFormData({ ...formData, phone: val });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || formData.phone.trim().length < 9) {
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({ name: "", phone: "+998 ", message: "" });
    setIsSuccess(false);
  };

  return (
    <section id="contact" className="pt-20 sm:pt-28 pb-16 sm:pb-24 bg-[#fafbfc] relative overflow-visible">
      <Container className="relative overflow-visible">
        {/* Master Dark Navy Card with 3D Pop-out Cutout Doctor Visual */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl bg-[#0f172a] text-white shadow-[0_25px_60px_-15px_rgba(15,23,42,0.35)] border border-slate-800/90 pt-10 sm:pt-12 pb-8 sm:pb-10 px-6 sm:px-10 lg:px-12 overflow-visible"
        >
          {/* Main Grid: Left Cutout Doctors (Overflown) + Right Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
            
            {/* Left Column: Transparent Cutout Doctors Overflowing Top Edge (Screenshot 3 Style) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start items-end order-1 lg:order-1">
              <div className="relative -mt-20 sm:-mt-28 lg:-mt-36 xl:-mt-40 w-full max-w-[320px] sm:max-w-[390px] lg:max-w-[460px] xl:max-w-[500px] select-none pointer-events-none z-20">
                <Image
                  src="/contact-person.png"
                  alt="QAXRAMON-RAXIMJON Klinikasi Malakali Shifokorlari"
                  width={654}
                  height={504}
                  priority
                  className="w-full h-auto object-contain object-bottom drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)]"
                />
              </div>
            </div>

            {/* Right Column: Senior-Level Interactive Appointment Form */}
            <div className="lg:col-span-7 relative z-20 order-2 lg:order-2">
              <div className="max-w-xl">
                {/* Form Header */}
                <div className="mb-6 text-left">
                  <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-white tracking-tight leading-snug">
                    {t("formTitle")}
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                    {t("subtitle")}
                  </p>
                </div>

                {isSuccess ? (
                  /* Success Feedback State */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 rounded-2xl bg-slate-900/90 border border-emerald-500/30 text-center space-y-4 shadow-xl"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg sm:text-xl font-bold text-white">
                        {t("successTitle")}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
                        {t("successDesc")}
                      </p>
                    </div>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors border border-slate-700 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>{t("newRequest")}</span>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* Form Fields */
                  <form onSubmit={handleSubmit} className="space-y-4 text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name Input */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          {t("nameLabel")}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <User className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            required
                            placeholder="Masalan: Abdulla Qodiriy"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 font-medium transition-all"
                          />
                        </div>
                      </div>

                      {/* Phone Input */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          {t("phoneLabel")}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <Phone className="w-4 h-4" />
                          </div>
                          <input
                            type="tel"
                            required
                            placeholder="+998 90 123 45 67"
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            className="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 font-medium transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Message / Complaint Input */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        {t("msgLabel")}
                      </label>
                      <div className="relative">
                        <div className="absolute top-3 left-3.5 pointer-events-none text-slate-400">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <textarea
                          rows={2}
                          placeholder="Qisqacha shikoyat yoki ma'lumot (ixtiyoriy)..."
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 font-medium transition-all resize-none"
                        />
                      </div>
                    </div>

                    {/* Submit Button & Privacy Note */}
                    <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3.5 rounded-full bg-[#dc2626] hover:bg-[#b91c1c] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                      >
                        <span>
                          {isSubmitting ? t("submitting") : t("submitBtn")}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 justify-center sm:justify-start">
                        <Lock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{t("privacyNote")}</span>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>

          {/* Bottom Strip: 3 Sleek Interactive Contact Cards */}
          <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-slate-800/80 relative z-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Card 1: Phone */}
              <a
                href={`tel:${CLINIC_CONTACT.phones[0].replace(/\s+/g, "")}`}
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-red-500/50 transition-all duration-200 group"
              >
                <div className="w-11 h-11 rounded-xl bg-red-500/10 text-[#dc2626] group-hover:bg-[#dc2626] group-hover:text-white transition-all flex items-center justify-center shrink-0 border border-red-500/20">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="min-w-0 text-left">
                  <div className="text-sm sm:text-[15px] font-bold text-white group-hover:text-red-400 transition-colors truncate">
                    {CLINIC_CONTACT.phones[0]}
                  </div>
                  <div className="text-xs text-slate-400 truncate">
                    {t("callUs")}
                  </div>
                </div>
              </a>

              {/* Card 2: Email */}
              <a
                href={`mailto:${CLINIC_CONTACT.email}`}
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-red-500/50 transition-all duration-200 group"
              >
                <div className="w-11 h-11 rounded-xl bg-red-500/10 text-[#dc2626] group-hover:bg-[#dc2626] group-hover:text-white transition-all flex items-center justify-center shrink-0 border border-red-500/20">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0 text-left">
                  <div className="text-sm sm:text-[15px] font-bold text-white group-hover:text-red-400 transition-colors truncate">
                    {CLINIC_CONTACT.email}
                  </div>
                  <div className="text-xs text-slate-400 truncate">
                    {t("emailUs")}
                  </div>
                </div>
              </a>

              {/* Card 3: Working Hours */}
              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-red-500/50 transition-all duration-200 group">
                <div className="w-11 h-11 rounded-xl bg-red-500/10 text-[#dc2626] group-hover:bg-[#dc2626] group-hover:text-white transition-all flex items-center justify-center shrink-0 border border-red-500/20">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="min-w-0 text-left">
                  <div className="text-sm sm:text-[15px] font-bold text-white group-hover:text-red-400 transition-colors truncate">
                    {t("workingHours")}
                  </div>
                  <div className="text-xs text-slate-400 truncate">
                    {t("sundayHours")}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </motion.div>
      </Container>
    </section>
  );
}
