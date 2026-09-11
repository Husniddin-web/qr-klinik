"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  X,
  Calendar,
  User,
  Phone,
  MessageSquare,
  ArrowLeft,
  ArrowRight,
  Check,
  Sun,
  Sunset,
  Moon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { DEPARTMENTS_DATA } from "@/data/departments";
import { DOCTORS_DATA } from "@/data/doctors";
import { FloatingInput } from "../ui/FloatingInput";
import { MorphButton, MorphState } from "../ui/MorphButton";
import { EASE, DUR, SPRING } from "@/lib/animations";
import { cn } from "@/lib/utils";
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

type WizardProps = Omit<AppointmentModalProps, "isOpen" | "sessionKey">;

type TimeSlot = "morning" | "afternoon" | "evening";
const TIME_SLOTS: { id: TimeSlot; icon: typeof Sun; range: string }[] = [
  { id: "morning", icon: Sun, range: "08:00–12:00" },
  { id: "afternoon", icon: Sunset, range: "12:00–17:00" },
  { id: "evening", icon: Moon, range: "17:00–20:00" },
];

const TOTAL_STEPS = 3;

/** Qadamlar yo'nalishga qarab suriladi (oldinga: o'ngdan, orqaga: chapdan) */
const stepVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: DUR.base, ease: EASE } },
  exit: (dir: number) => ({
    x: dir > 0 ? -48 : 48,
    opacity: 0,
    transition: { duration: DUR.fast, ease: EASE },
  }),
};

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

  // Body scroll qulfi + ESC + boshlang'ich fokus (tashqi tizim bilan sinxronizatsiya — setState yo'q)
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
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          transition={{ duration: DUR.fast, ease: EASE }}
          onClick={onClose}
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#0f172a]/70"
          role="presentation"
        >
          <m.div
            ref={dialogRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="appointment-title"
            onClick={(e) => e.stopPropagation()}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
            transition={SPRING.heavy}
            className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-lg shadow-2xl border border-slate-100 overflow-hidden relative text-left outline-none max-h-[94dvh] flex flex-col"
          >
            {/* `key` — har ochilishda forma holati tozalanadi (effect'siz, React tavsiyasi) */}
            <AppointmentWizard
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

function AppointmentWizard({
  onClose,
  preselectedDoctorId,
  preselectedDepartmentId,
  preselectedServiceTitle,
  departments = DEPARTMENTS_DATA,
  doctors = DOCTORS_DATA,
}: WizardProps) {
  const t = useTranslations("modal");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  // Boshlang'ich qiymatlar props'dan — useState initializer, effect emas
  const [departmentId, setDepartmentId] = useState(() => {
    const doc = preselectedDoctorId ? doctors.find((d) => d.id === preselectedDoctorId) : undefined;
    return preselectedDepartmentId || doc?.departmentId || departments[0]?.id || "";
  });
  const [doctorId, setDoctorId] = useState(preselectedDoctorId || "");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState<TimeSlot>("morning");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998 ");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [shake, setShake] = useState(0);
  const [submitState, setSubmitState] = useState<MorphState>("idle");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const filteredDoctors = useMemo(
    () => doctors.filter((d) => !departmentId || d.departmentId === departmentId),
    [departmentId, doctors]
  );
  const selectedDept = departments.find((d) => d.id === departmentId);
  const selectedDoctor = doctors.find((d) => d.id === doctorId);

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  const validate = (s: number) => {
    const next: Record<string, string> = {};
    if (s === 2 && !date) next.date = t("errDate");
    if (s === 3) {
      if (name.trim().length < 3) next.name = t("errName");
      if (phone.replace(/\D/g, "").length < 12) next.phone = t("errPhone");
    }
    setErrors(next);
    if (Object.keys(next).length) setShake((k) => k + 1);
    return Object.keys(next).length === 0;
  };

  const goNext = () => {
    if (!validate(step)) return;
    setDirection(1);
    setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  };

  const goBack = () => {
    setErrors({});
    setDirection(-1);
    setStep((s) => Math.max(1, s - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate(3)) return;
    setSubmitState("loading");
    setSubmitError(null);
    try {
      await submitAppointment({
        name: name.trim(),
        phone: phone.trim(),
        departmentId: selectedDept?.dbId,
        doctorId,
        serviceTitle: preselectedServiceTitle,
        preferredDate: date,
        timeSlot,
        message: note.trim(),
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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value;
    if (!v.startsWith("+998")) v = "+998 ";
    setPhone(v);
    if (errors.phone) setErrors((p) => ({ ...p, phone: "" }));
  };

  return (
    <>
            {/* ---------- Sarlavha ---------- */}
            <div className="bg-[#0f172a] text-white px-6 sm:px-7 pt-6 pb-5 relative shrink-0">
              <button
                type="button"
                onClick={onClose}
                aria-label={t("btnClose")}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-[#dc2626]" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#dc2626]">
                  QAXRAMON-RAXIMJON KLINIKASI
                </span>
              </div>
              <h3 id="appointment-title" className="text-xl sm:text-2xl font-bold tracking-tight">
                {t("title")}
              </h3>

              {/* Qadam ko'rsatkichi */}
              {!isSubmitted && (
                <div className="mt-4">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-2">
                    <span>{t(`step${step}` as "step1")}</span>
                    <span>{t("stepOf", { current: step, total: TOTAL_STEPS })}</span>
                  </div>
                  <div className="flex gap-1.5">
                    {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                      <div key={i} className="h-1 flex-1 rounded-full bg-white/10 overflow-hidden">
                        <m.div
                          initial={false}
                          animate={{ scaleX: i < step ? 1 : 0 }}
                          transition={{ duration: DUR.base, ease: EASE }}
                          style={{ originX: 0 }}
                          className="h-full w-full bg-[#dc2626] rounded-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ---------- Tana ---------- */}
            <div className="p-6 sm:p-7 overflow-y-auto">
              {isSubmitted ? (
                <SuccessState
                  title={t("successTitle")}
                  desc={t("successDesc")}
                  btnLabel={t("btnClose")}
                  onClose={onClose}
                />
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="relative overflow-hidden">
                    <AnimatePresence mode="wait" custom={direction} initial={false}>
                      {/* ===== 1-qadam: Bo'lim + Shifokor ===== */}
                      {step === 1 && (
                        <m.div
                          key="step-1"
                          custom={direction}
                          variants={stepVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          className="space-y-5"
                        >
                          {preselectedServiceTitle && (
                            <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-2.5 text-xs">
                              <span className="font-bold text-[#dc2626] uppercase tracking-wider text-[10px]">
                                {t("serviceLabel")}:
                              </span>{" "}
                              <span className="font-semibold text-slate-800">
                                {preselectedServiceTitle}
                              </span>
                            </div>
                          )}

                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                              {t("deptLabel")}
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                              {departments.map((dept) => {
                                const active = dept.id === departmentId;
                                return (
                                  <button
                                    key={dept.id}
                                    type="button"
                                    onClick={() => {
                                      setDepartmentId(dept.id);
                                      setDoctorId("");
                                    }}
                                    className={cn(
                                      "relative text-left px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer",
                                      active
                                        ? "border-[#0f172a] text-[#0f172a]"
                                        : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                                    )}
                                  >
                                    {active && (
                                      <m.span
                                        layoutId="dept-active-bg"
                                        transition={SPRING.soft}
                                        className="absolute inset-0 rounded-xl bg-slate-100"
                                      />
                                    )}
                                    <span className="relative z-10 flex items-center justify-between gap-2">
                                      <span className="truncate">{dept.name}</span>
                                      {active && <Check className="w-3.5 h-3.5 text-[#dc2626] shrink-0" />}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                              {t("doctorLabel")}
                            </p>
                            <div className="relative">
                              <User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                              <select
                                value={doctorId}
                                onChange={(e) => setDoctorId(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0f172a] font-medium cursor-pointer appearance-none"
                              >
                                <option value="">{t("anyDoctor")}</option>
                                {filteredDoctors.map((doc) => (
                                  <option key={doc.id} value={doc.id}>
                                    {doc.name} — {doc.specialty}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </m.div>
                      )}

                      {/* ===== 2-qadam: Sana + Vaqt ===== */}
                      {step === 2 && (
                        <m.div
                          key="step-2"
                          custom={direction}
                          variants={stepVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          className="space-y-5"
                        >
                          <FloatingInput
                            label={t("dateLabel")}
                            icon={Calendar}
                            type="date"
                            min={today}
                            value={date}
                            error={errors.date}
                            shakeKey={shake}
                            onChange={(e) => {
                              setDate(e.target.value);
                              if (errors.date) setErrors((p) => ({ ...p, date: "" }));
                            }}
                          />

                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                              {t("timeLabel")}
                            </p>
                            <div className="grid grid-cols-3 gap-2">
                              {TIME_SLOTS.map(({ id, icon: Icon, range }) => {
                                const active = timeSlot === id;
                                return (
                                  <button
                                    key={id}
                                    type="button"
                                    onClick={() => setTimeSlot(id)}
                                    className={cn(
                                      "relative flex flex-col items-center gap-1 px-2 py-3 rounded-xl border text-xs font-semibold transition-colors cursor-pointer",
                                      active
                                        ? "border-[#0f172a] text-white"
                                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                                    )}
                                  >
                                    {active && (
                                      <m.span
                                        layoutId="time-active-bg"
                                        transition={SPRING.soft}
                                        className="absolute inset-0 rounded-xl bg-[#0f172a]"
                                      />
                                    )}
                                    <Icon className="w-4 h-4 relative z-10" />
                                    <span className="relative z-10">{t(id)}</span>
                                    <span
                                      className={cn(
                                        "relative z-10 text-[10px] font-medium",
                                        active ? "text-slate-300" : "text-slate-400"
                                      )}
                                    >
                                      {range}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </m.div>
                      )}

                      {/* ===== 3-qadam: Kontakt ===== */}
                      {step === 3 && (
                        <m.div
                          key="step-3"
                          custom={direction}
                          variants={stepVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          className="space-y-4"
                        >
                          {/* Tanlovlar xulosasi */}
                          <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-xs space-y-1">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                              {t("summary")}
                            </p>
                            <p className="font-semibold text-slate-800">
                              {selectedDept?.name}
                              {selectedDoctor ? ` · ${selectedDoctor.name}` : ""}
                            </p>
                            <p className="text-slate-500">
                              {date} · {t(timeSlot)}
                            </p>
                          </div>

                          <FloatingInput
                            label={t("nameLabel")}
                            icon={User}
                            type="text"
                            autoComplete="name"
                            value={name}
                            error={errors.name}
                            shakeKey={shake}
                            onChange={(e) => {
                              setName(e.target.value);
                              if (errors.name) setErrors((p) => ({ ...p, name: "" }));
                            }}
                          />
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
                          <FloatingInput
                            label={t("noteLabel")}
                            icon={MessageSquare}
                            multiline
                            rows={2}
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                          />
                        </m.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {submitError && (
                    <p role="alert" className="mt-4 text-xs font-semibold text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
                      {submitError}
                    </p>
                  )}

                  {/* ---------- Navigatsiya tugmalari ---------- */}
                  <div className="mt-6 flex items-center gap-3">
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={goBack}
                        className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        {t("btnBack")}
                      </button>
                    )}

                    {step < TOTAL_STEPS ? (
                      <button
                        type="button"
                        onClick={goNext}
                        className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer active:scale-[0.98]"
                      >
                        {t("btnNext")}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <MorphButton
                        type="submit"
                        state={submitState}
                        loadingLabel={t("submitting")}
                        successLabel={t("submitted")}
                        className="flex-1 py-3.5"
                      >
                        <Calendar className="w-4 h-4" />
                        {t("btnSubmit")}
                      </MorphButton>
                    )}
                  </div>
                </form>
              )}
            </div>
    </>
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
    <div className="text-center py-6 space-y-4">
      <div className="relative w-20 h-20 mx-auto">
        {/* Yengil halqa to'lqini */}
        <m.span
          initial={{ scale: 0.6, opacity: 0.6 }}
          animate={{ scale: 1.9, opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.5 }}
          className="absolute inset-0 rounded-full bg-emerald-400/30"
        />
        <svg viewBox="0 0 80 80" className="w-20 h-20 relative">
          <m.circle
            cx="40"
            cy="40"
            r="34"
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            initial={{ pathLength: 0, rotate: -90 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{ transformOrigin: "40px 40px" }}
          />
          <m.circle
            cx="40"
            cy="40"
            r="34"
            fill="#10b981"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{ duration: 0.4, ease: EASE, delay: 0.5 }}
            style={{ transformOrigin: "40px 40px" }}
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
      </div>

      <m.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DUR.base, ease: EASE, delay: 0.75 }}
        className="space-y-2"
      >
        <h4 className="text-xl font-bold text-[#0f172a]">{title}</h4>
        <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">{desc}</p>
      </m.div>

      <m.button
        type="button"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-2 px-6 py-2.5 rounded-full bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-bold transition-colors cursor-pointer"
      >
        {btnLabel}
      </m.button>
    </div>
  );
}
