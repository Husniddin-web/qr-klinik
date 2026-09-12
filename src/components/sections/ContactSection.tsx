"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Phone, ArrowRight, User, MessageSquare, RotateCcw } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "../common/Container";
import { Reveal } from "../common/Reveal";
import { FloatingInput } from "../ui/FloatingInput";
import { MorphButton, MorphState } from "../ui/MorphButton";
import { EASE, DUR } from "@/lib/animations";
import { submitContact } from "@/lib/public-api";

interface ContactSectionProps {
  onOpenAppointment?: () => void;
}

export function ContactSection({ onOpenAppointment }: ContactSectionProps) {
  const t = useTranslations("contact");

  const [formData, setFormData] = useState({ name: "", phone: "+998 ", message: "" });
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [shake, setShake] = useState(0);
  const [state, setState] = useState<MorphState>("idle");
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith("+998")) val = "+998 ";
    setFormData({ ...formData, phone: val });
    if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (formData.name.trim().length < 3) next.name = "Ismingizni kiriting (kamida 3 ta harf)";
    if (formData.phone.replace(/\D/g, "").length < 12) next.phone = "To'liq telefon raqam kiriting";
    setErrors(next);
    if (Object.keys(next).length) {
      setShake((k) => k + 1);
      return;
    }

    setState("loading");
    setSubmitError(null);
    try {
      await submitContact({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim(),
        source: "website:home-contact",
      });
      setState("success");
      await new Promise((r) => setTimeout(r, 600));
      setIsSuccess(true);
    } catch (err) {
      setState("idle");
      setSubmitError((err as Error).message || "Yuborishda xatolik. Qayta urinib ko'ring");
      setShake((k) => k + 1);
    }
  };

  const handleReset = () => {
    setFormData({ name: "", phone: "+998 ", message: "" });
    setErrors({});
    setState("idle");
    setIsSuccess(false);
    setSubmitError(null);
  };

  return (
    <section
      id="contact"
      className="w-full bg-[#0f172a] text-white mt-24 sm:mt-32 lg:mt-40 pt-4 sm:pt-6 lg:pt-8 pb-8 sm:pb-12 relative overflow-visible border-t border-slate-800"
    >
      <Container className="relative overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          {/* Chap: shifokorlar kesmasi banner ustidan chiqib turadi */}
          <Reveal className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-start items-end order-1 lg:order-1">
            {/* O'ram nisbati = rasm nisbati (654×504), shunda ikkala qatlam pikselma-piksel ustma-ust tushadi */}
            <div className="relative -mt-24 sm:-mt-32 lg:-mt-44 xl:-mt-52 w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[520px] xl:max-w-[580px] aspect-[654/504] select-none pointer-events-none z-20">
              {/* ---------- 1. Doira foni: toza qizil, hech qanday soya/halqa/animatsiya yo'q ---------- */}
              <div
                aria-hidden
                className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[84%] aspect-square rounded-full bg-[#dc2626]"
              />

              {/* ---------- 2. Pastki qism: rasm DOIRA ICHIDA (rounded-full + overflow-hidden) ----------
                   Rasm kengligi = o'ram kengligi (doiradan 100/84 ≈ 119% katta), pastga tekislangan —
                   shunda doira chetlari tanani yumaloq kesadi. */}
              <div
                aria-hidden
                className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[84%] aspect-square rounded-full overflow-hidden z-10"
              >
                <Image
                  src="/contact-person.png"
                  alt=""
                  width={654}
                  height={504}
                  sizes="(max-width: 640px) 340px, (max-width: 1024px) 420px, 580px"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[119.05%] max-w-none h-auto object-contain"
                />
              </div>

              {/* ---------- 3. Yuqori qism: doira markazidan YUQORISI kesilmasdan ko'rinadi ----------
                   Doira radiusi = 42% (o'ram kengligi), o'ram balandligi = 77% → markaz chizig'i pastdan ≈54.5%.
                   Shu chiziqdan pastini clip-path yashiradi (u qism 2-qatlamda doira ichida ko'rinadi). */}
              <div
                className="absolute inset-0 z-20"
                style={{ clipPath: "inset(0 0 54.5% 0)" }}
              >
                <Image
                  src="/contact-person.png"
                  alt="QAXRAMON-RAXIMJON Klinikasi Malakali Shifokorlari"
                  width={654}
                  height={504}
                  priority={false}
                  sizes="(max-width: 640px) 340px, (max-width: 1024px) 420px, 580px"
                  className="absolute bottom-0 left-0 w-full h-auto object-contain"
                />
              </div>
            </div>
          </Reveal>

          {/* O'ng: forma */}
          <Reveal delay={0.1} className="lg:col-span-7 xl:col-span-7 relative z-20 order-2 lg:order-2 pt-6 lg:pt-8">
            <div className="max-w-xl">
              <div className="mb-6 text-left">
                <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-black text-white tracking-tight leading-snug">
                  {t("title")}
                </h2>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                {isSuccess ? (
                  <m.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: DUR.base, ease: EASE }}
                    className="p-8 rounded-2xl bg-slate-900/90 border border-emerald-500/30 text-center space-y-4 shadow-xl"
                  >
                    <div className="relative w-16 h-16 mx-auto">
                      <svg viewBox="0 0 64 64" className="w-16 h-16">
                        <m.circle
                          cx="32" cy="32" r="27" fill="none" stroke="#10b981" strokeWidth="2.5"
                          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                          transition={{ duration: 0.55, ease: EASE }}
                        />
                        <m.path
                          d="M21 33 L29 41 L44 25" fill="none" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
                          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                          transition={{ duration: 0.35, ease: EASE, delay: 0.45 }}
                        />
                      </svg>
                    </div>
                    <m.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: DUR.base, ease: EASE }}
                      className="space-y-1"
                    >
                      <h3 className="text-lg sm:text-xl font-bold text-white">{t("successTitle")}</h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
                        {t("successDesc")}
                      </p>
                    </m.div>
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
                  </m.div>
                ) : (
                  <m.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: DUR.fast }}
                    className="space-y-4 text-left"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FloatingInput
                        tone="dark"
                        label={t("nameLabel").replace(" *", "")}
                        icon={User}
                        type="text"
                        autoComplete="name"
                        value={formData.name}
                        error={errors.name}
                        shakeKey={shake}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
                        }}
                      />
                      <FloatingInput
                        tone="dark"
                        label={t("phoneLabel").replace(" *", "")}
                        icon={Phone}
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        value={formData.phone}
                        error={errors.phone}
                        shakeKey={shake}
                        onChange={handlePhoneChange}
                      />
                    </div>

                    <FloatingInput
                      tone="dark"
                      label={t("msgLabel")}
                      icon={MessageSquare}
                      multiline
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />

                    {submitError && (
                      <p role="alert" className="text-xs font-semibold text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5">
                        {submitError}
                      </p>
                    )}

                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3">
                      <MorphButton
                        type="submit"
                        state={state}
                        loadingLabel={t("submitting")}
                        successLabel="Yuborildi"
                        className="px-9 py-3.5 text-xs sm:text-sm shadow-lg shadow-red-600/30"
                      >
                        <span>{t("submitBtn")}</span>
                        <ArrowRight className="w-4 h-4" />
                      </MorphButton>
                      {onOpenAppointment && (
                        <button
                          type="button"
                          onClick={onOpenAppointment}
                          className="text-xs font-semibold text-slate-400 hover:text-white underline-offset-4 hover:underline transition-colors cursor-pointer text-left"
                        >
                          yoki qabulga yozilish →
                        </button>
                      )}
                    </div>
                  </m.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
