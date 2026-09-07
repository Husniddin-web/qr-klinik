"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  Send,
  CheckCircle2,
  Calendar,
  Compass,
  Car,
  Train,
  ChevronDown,
} from "lucide-react";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { PageHero } from "@/components/common/PageHero";
import { AppointmentModal } from "@/components/modals/AppointmentModal";
import { DEPARTMENTS_DATA } from "@/data/departments";

export default function ContactPage() {
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    department: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: "", phone: "", department: "", message: "" });
    }, 900);
  };

  const contactCards = [
    {
      icon: MapPin,
      title: "Manzilimiz",
      line1: "Toshkent shahri, Yunusobod tumani",
      line2: "Amir Temur ko'chasi, 108-uy",
      highlight: "Mo'ljal: Shahriston metro bekati",
    },
    {
      icon: Phone,
      title: "Telefon Raqamlar",
      line1: "+998 71 200 45 45 (Qabulxona)",
      line2: "+998 71 200 45 46 (24/7 Shoshilinch)",
      highlight: "Kechayu-kunduz tezkor aloqa",
    },
    {
      icon: Clock,
      title: "Ish Vaqti",
      line1: "Dush - Shanba: 08:00 - 20:00",
      line2: "Yakshanba: 09:00 - 15:00",
      highlight: "Shoshilinch yordam: 24/7 navbatchi",
    },
    {
      icon: Mail,
      title: "Elektron Pochta",
      line1: "info@qaxramon-raximjon.uz",
      line2: "qabul@qaxramon-raximjon.uz",
      highlight: "Hamkorlik va takliflar uchun",
    },
  ];

  const contactFaqs = [
    {
      q: "Klinikaga jamoat transportida qanday yetib borish mumkin?",
      a: "Klinikamiz Toshkent metrosining 'Shahriston' (Yunusobod yo'nalishi) bekatidan 3 daqiqalik piyoda masofada joylashgan. Shuningdek, Amir Temur ko'chasidan 14, 24, 72, 97-sonli avtobuslar qatnaydi.",
    },
    {
      q: "Klinika hududida bemorlar uchun avtoturargoh (parking) mavjudmi?",
      a: "Ha, klinikamiz hududida bemorlar va ularning yaqinlari uchun bepul, 24 soat videokuzatuv ostidagi qulay avtoturargoh tashkil etilgan.",
    },
    {
      q: "Shifokor ko'rigi uchun oldindan yozilish majburiymi?",
      a: "Navbatsiz va o'zingizga qulay vaqtda qabulga kirish uchun oldindan yozilish tavsiya etiladi. Biroq, shoshilinch holatlarda va qon tahlillarini topshirishda bemorlar navbatsiz qabul qilinadi.",
    },
    {
      q: "Dam olish (yakshanba) kunlari klinika ishlaydimi?",
      a: "Ha, klinikamiz yakshanba kunlari 09:00 dan 15:00 gacha faoliyat ko'rsatadi. 24/7 shoshilinch tezkor yordam bo'limimiz esa uzluksiz ishlaydi.",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 selection:bg-[#dc2626] selection:text-white">
      {/* Floating Navbar */}
      <Navbar onOpenAppointment={() => setIsAppointmentOpen(true)} />

      {/* Page Hero matching user uploaded reference media_1788754097253.png */}
      <PageHero
        title="Biz Bilan Bog'laning"
        description="Savollaringiz bormi yoki ko'rikka yozilmoqchimisiz? Bizning mutaxassislarimiz va qabulxona jamoamiz sizga yordam berishga doimo tayyor."
        bgImage="/images/heroes/hero-contact.jpg"
        breadcrumbs={[{ label: "Aloqa" }]}
      />

      {/* Main Content Area */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 4 Contact Information Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-12 sm:mb-16">
            {contactCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#dc2626] flex items-center justify-center mb-4 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-snug">
                      {card.line1}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-500 leading-snug mt-0.5">
                      {card.line2}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-[#dc2626]">
                      {card.highlight}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Form and Map Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16 sm:mb-20">
            {/* Interactive Contact & Appointment Form */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-sm">
              <div className="mb-6">
                <div className="text-xs font-bold uppercase tracking-wider text-[#dc2626] mb-1.5">
                  XABAR YUBORISH
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Kutishlarsiz Mutaxassis Qabuliga Yoziling
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-normal mt-2">
                  Ma&apos;lumotlaringizni qoldiring, operatorimiz 15 daqiqada siz bilan bog&apos;lanadi.
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-200 text-center animate-fadeIn">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-emerald-950 mb-2">
                    Arizangiz Muvaffaqiyatli Qabul Qilindi!
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-700 leading-relaxed mb-6">
                    Mutaxassisimiz tez orada siz ko&apos;rsatgan telefon raqamiga qo&apos;ng&apos;iroq qilib, qabul vaqtini tasdiqlaydi.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2.5 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-md hover:bg-emerald-700 transition-all cursor-pointer"
                  >
                    Yangi xabar yuborish
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Ismingiz *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      placeholder="Masalan: Sardor Rustamov"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200/90 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Telefon raqamingiz *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formState.phone}
                      onChange={(e) =>
                        setFormState({ ...formState, phone: e.target.value })
                      }
                      placeholder="+998 90 123 45 67"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200/90 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Qiziqtirayotgan tibbiy bo&apos;lim
                    </label>
                    <select
                      value={formState.department}
                      onChange={(e) =>
                        setFormState({ ...formState, department: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200/90 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition-all"
                    >
                      <option value="">Bo&apos;limni tanlang (ixtiyoriy)</option>
                      {DEPARTMENTS_DATA.map((dept) => (
                        <option key={dept.id} value={dept.name}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Shikoyatingiz yoki xabar (ixtiyoriy)
                    </label>
                    <textarea
                      rows={3}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      placeholder="Qisqacha shikoyat yoki sizga qulay vaqt..."
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200/90 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-2xl bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold text-sm shadow-lg shadow-red-500/25 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span>Yuborilmoqda...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Xabarni yuborish</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Map and Transit Directions */}
            <div className="lg:col-span-6 space-y-6">
              {/* Embedded Map Frame */}
              <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm">
                <div className="relative w-full h-[320px] sm:h-[360px] bg-slate-100">
                  <iframe
                    title="Klinika Joylashuvi"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.8821035624795!2d69.28483837654394!3d41.33314899933391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b4e1f76d499%3A0x6b80e8e4a9e88d8b!2sAmir%20Temur%20Avenue%2C%20Tashkent!5e0!3m2!1sen!2s!4v1710000000000!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full grayscale-[20%] contrast-[105%]"
                  />
                </div>
              </div>

              {/* Transit & Parking Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2.5">
                    <Train className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">Metro</h4>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Shahriston bekati (3 daqiqa piyoda)
                  </p>
                </div>

                <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2.5">
                    <Car className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">Avtoturargoh</h4>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Bemorlar uchun bepul qo&apos;riqlanadigan parking
                  </p>
                </div>

                <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-red-50 text-[#dc2626] flex items-center justify-center mb-2.5">
                    <Compass className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">Avtobuslar</h4>
                  <p className="text-[11px] text-slate-500 mt-1">
                    № 14, 24, 72, 97-avtobuslar bekati
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick FAQ Section */}
          <div className="max-w-3xl mx-auto pt-8 border-t border-slate-200">
            <div className="text-center mb-8">
              <div className="text-xs font-bold uppercase tracking-wider text-[#dc2626] mb-1.5">
                SAVOLLAR VA JAVOBLAR
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                Tashrif Buyurish Bo&apos;yicha Ko&apos;p Beriladigan Savollar
              </h3>
            </div>

            <div className="space-y-3">
              {contactFaqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-800 hover:text-[#dc2626] transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-red-500" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 text-xs sm:text-sm text-slate-500 font-normal leading-relaxed border-t border-slate-100 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Global Footer */}
      <Footer />

      {/* Direct Appointment Modal */}
      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
      />
    </main>
  );
}
