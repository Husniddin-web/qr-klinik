"use client";

import React, { useState } from "react";
import { X, CheckCircle2, Calendar, User, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { DEPARTMENTS_DATA } from "@/data/departments";
import { DOCTORS_DATA } from "@/data/doctors";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDoctorId?: string;
  preselectedDepartmentId?: string;
}

export function AppointmentModal({
  isOpen,
  onClose,
  preselectedDoctorId,
  preselectedDepartmentId,
}: AppointmentModalProps) {
  const t = useTranslations("modal");
  const [patientName, setPatientName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+998 ");
  const [departmentId, setDepartmentId] = useState(preselectedDepartmentId || "cardiology");
  const [doctorId, setDoctorId] = useState(preselectedDoctorId || "");
  const [preferredDate, setPreferredDate] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const filteredDoctors = departmentId
    ? DOCTORS_DATA.filter((doc) => doc.departmentId === departmentId)
    : DOCTORS_DATA;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 500);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setPatientName("");
    setPhoneNumber("+998 ");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0f172a]/75 backdrop-blur-xs animate-fadeIn">
      <div
        className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-slate-100 overflow-hidden relative text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header: Solid Navy #0f172a */}
        <div className="bg-[#0f172a] text-white p-6 sm:p-7 relative border-b border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-[#dc2626]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#dc2626]">
              QAXRAMON-RAXIMJON KLINIKASI
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {t("title")}
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            {t("subtitle")}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-[#0f172a]">
                {t("successTitle")}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                {t("successDesc")}
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-4 px-6 py-2.5 rounded-full bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                {t("btnClose")}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Ismingiz va Familiyangiz *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="Masalan: Alisher Vohidov"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0f172a] font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Telefon Raqamingiz *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                  <input
                    type="tel"
                    required
                    placeholder="+998 90 123 45 67"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0f172a] font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Bo&apos;limni tanlang
                  </label>
                  <select
                    value={departmentId}
                    onChange={(e) => {
                      setDepartmentId(e.target.value);
                      setDoctorId("");
                    }}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0f172a] font-medium cursor-pointer"
                  >
                    {DEPARTMENTS_DATA.map((dep) => (
                      <option key={dep.id} value={dep.id}>
                        {dep.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Shifokor (ixtiyoriy)
                  </label>
                  <select
                    value={doctorId}
                    onChange={(e) => setDoctorId(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0f172a] font-medium cursor-pointer"
                  >
                    <option value="">Ixtiyoriy shifokor</option>
                    {filteredDoctors.map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        {doc.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Qulay sana
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-4 top-3" />
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full pl-11 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0f172a] font-medium"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-[#dc2626]/25 transition-all cursor-pointer active:scale-98 disabled:opacity-50"
                >
                  {isSubmitting ? "Yuborilmoqda..." : "Qabulga Yozilishni Tasdiqlash"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
