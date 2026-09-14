"use client";

import React, { useEffect, useRef, useState } from "react";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, User, Phone, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { DEPARTMENTS_DATA } from "@/data/departments";
import { DOCTORS_DATA } from "@/data/doctors";
import { FloatingInput } from "../ui/FloatingInput";
import { MorphButton, MorphState } from "../ui/MorphButton";
import { EASE, DUR, SPRING } from "@/lib/animations";
import { submitAppointment } from "@/lib/public-api";
import type { IDepartment, IDoctor } from "@/types";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Har ochilishda o'zgaradi — forma holati `key` orqali noldan boshlanadi */
  sessionKey?: number;
  preselectedDoctorId?: string;
  preselectedDepartmentId?: string;
  preselectedServiceTitle?: string;
  /** Backend'dan (layout orqali). Berilmasa static fallback. */
  departments?: IDepartment[];
  doctors?: IDoctor[];
}

type FormProps = Omit<AppointmentModalProps, "isOpen" | "sessionKey">;

/**
 * Qabulga yozilish — bitta qisqa forma: ism, familiya, telefon.
 * Xizmat / shifokor / bo'lim foydalanuvchi qayerdan bosgan bo'lsa, o'sha yerdan
 * props orqali keladi va ko'rinmas holda yuboriladi. Forma ichida tanlov yo'q.
 */
export function AppointmentModal({
  isOpen,
  onClose,
  sessionKey = 0,
  preselectedDoctorId,
  preselectedDepartmentId,
  preselectedServiceTitle,
  departments = DEPARTMENTS_DATA,
  doctors = DOCTORS_DATA,
}: AppointmentModalProps) {
  const shouldReduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);

  // Body scroll qulfi + ESC + boshlang'ich fokus
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const focusTimer = setTimeout(() => dialogRef.current?.focus(), 50);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      clearTimeout(focusTimer);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          key="appointment-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: DUR.fast, ease: EASE }}
          onClick={onClose}
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-ink/70"
          role="presentation"
        >
          <m.div
            ref={dialogRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="appointment-title"
            onClick={(e) => e.stopPropagation()}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={SPRING.heavy}
            className="bg-white rounded-t-card sm:rounded-card w-full max-w-md shadow-float relative text-left outline-none max-h-[94dvh] overflow-y-auto"
          >
            {/* `key` — har ochilishda forma holati tozalanadi */}
            <AppointmentForm
              key={sessionKey}
              onClose={onClose}
              preselectedDoctorId={preselectedDoctorId}
              preselectedDepartmentId={preselectedDepartmentId}
              preselectedServiceTitle={preselectedServiceTitle}
              departments={departments}
              doctors={doctors}
            />
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

function AppointmentForm({
  onClose,
  preselectedDoctorId,
  preselectedDepartmentId,
  preselectedServiceTitle,
  departments = DEPARTMENTS_DATA,
  doctors = DOCTORS_DATA,
}: FormProps) {
  const t = useTranslations("modal");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("+998 ");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [shake, setShake] = useState(0);
  const [submitState, setSubmitState] = useState<MorphState>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Kontekst: shifokor kartasidan kelgan bo'lsa — uning bo'limi, xizmatdan kelsa — nomi
  const doctor = preselectedDoctorId ? doctors.find((d) => d.id === preselectedDoctorId) : undefined;
  const departmentId = preselectedDepartmentId || doctor?.departmentId;
  const department = departmentId ? departments.find((d) => d.id === departmentId) : undefined;
  const contextLabel = preselectedServiceTitle || doctor?.name || department?.name;

  const clearError = (key: string) => {
    if (errors[key]) setErrors((p) => ({ ...p, [key]: "" }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value;
    if (!v.startsWith("+998")) v = "+998 ";
    setPhone(v);
    clearError("phone");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (firstName.trim().length < 2) next.firstName = t("errFirstName");
    if (lastName.trim().length < 2) next.lastName = t("errLastName");
    if (phone.replace(/\D/g, "").length < 12) next.phone = t("errPhone");
    setErrors(next);
    if (Object.keys(next).length) {
      setShake((k) => k + 1);
      return;
    }

    setSubmitState("loading");
    setSubmitError(null);
    try {
      await submitAppointment({
        name: `${firstName.trim()} ${lastName.trim()}`,
        phone: phone.trim(),
        departmentId: department?.dbId,
        doctorId: preselectedDoctorId,
        serviceTitle: preselectedServiceTitle,
        source: "website:appointment-modal",
      });
      setSubmitState("success");
      await new Promise((r) => setTimeout(r, 650));
      setIsSubmitted(true);
    } catch (err) {
      setSubmitState("idle");
      setSubmitError((err as Error).message || "Yuborishda xatolik. Qayta urinib ko'ring");
      setShake((k) => k + 1);
    }
  };

  return (
    <div className="p-6 sm:p-8">
      <button
        type="button"
        onClick={onClose}
        aria-label={t("btnClose")}
        className="absolute top-4 right-4 w-9 h-9 rounded-full text-slate-400 hover:text-ink hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
      >
        <X className="w-5 h-5" />
      </button>

      {isSubmitted ? (
        <SuccessState title={t("successTitle")} desc={t("successDesc")} btnLabel={t("btnClose")} onClose={onClose} />
      ) : (
        <>
          <div className="pr-10">
            <h3 id="appointment-title" className="font-display text-2xl font-bold text-ink tracking-tight">
              {t("title")}
            </h3>
            <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">
              {contextLabel ? (
                <>
                  <span className="text-ink font-semibold">{contextLabel}</span>
                  {" · "}
                  {t("subtitleShort")}
                </>
              ) : (
                t("subtitle")
              )}
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FloatingInput
                label={t("firstNameLabel")}
                icon={User}
                type="text"
                autoComplete="given-name"
                value={firstName}
                error={errors.firstName}
                shakeKey={shake}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  clearError("firstName");
                }}
              />
              <FloatingInput
                label={t("lastNameLabel")}
                type="text"
                autoComplete="family-name"
                value={lastName}
                error={errors.lastName}
                shakeKey={shake}
                onChange={(e) => {
                  setLastName(e.target.value);
                  clearError("lastName");
                }}
              />
            </div>
            <FloatingInput
              label={t("phoneLabel")}
              icon={Phone}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={phone}
              error={errors.phone}
              shakeKey={shake}
              onChange={handlePhoneChange}
            />

            {submitError && (
              <p role="alert" className="text-xs font-semibold text-red-600 bg-red-50 rounded-xl px-4 py-2.5">
                {submitError}
              </p>
            )}

            <MorphButton
              type="submit"
              state={submitState}
              loadingLabel={t("submitting")}
              successLabel={t("submitted")}
              className="w-full py-3.5 mt-2"
            >
              {t("btnSubmit")}
              <ArrowRight className="w-4 h-4" />
            </MorphButton>

            <p className="text-center text-xs text-slate-400 leading-relaxed">{t("hint")}</p>
          </form>
        </>
      )}
    </div>
  );
}

/** Muvaffaqiyat: doira chiziladi → checkmark chiziladi → matn ko'tariladi */
function SuccessState({
  title,
  desc,
  btnLabel,
  onClose,
}: {
  title: string;
  desc: string;
  btnLabel: string;
  onClose: () => void;
}) {
  return (
    <div className="text-center py-4 space-y-4">
      <svg viewBox="0 0 80 80" className="w-20 h-20 mx-auto">
        <m.circle
          cx="40"
          cy="40"
          r="34"
          fill="none"
          stroke="#10b981"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: EASE }}
        />
        <m.path
          d="M26 41 L36 51 L55 30"
          fill="none"
          stroke="#10b981"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, ease: EASE, delay: 0.55 }}
        />
      </svg>

      <m.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DUR.base, ease: EASE, delay: 0.7 }}
        className="space-y-2"
      >
        <h4 className="font-display text-xl font-bold text-ink">{title}</h4>
        <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">{desc}</p>
      </m.div>

      <m.button
        type="button"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-2 px-6 py-2.5 rounded-full bg-ink hover:bg-ink-soft text-white text-xs font-bold transition-colors cursor-pointer"
      >
        {btnLabel}
      </m.button>
    </div>
  );
}
