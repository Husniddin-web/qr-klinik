"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Clock,
  ChevronRight,
  ShieldCheck,
  Award,
  Sparkles,
  CheckCircle2,
  Calendar,
  X,
  Stethoscope,
} from "lucide-react";
import { Footer } from "@/components/common/Footer";
import { PageHero } from "@/components/common/PageHero";
import { useAppointment } from "@/components/providers/AppointmentProvider";
import type { IService } from "@/types";
import { formatPrice } from "@/lib/utils";

export function ServicesClient({ services }: { services: IService[] }) {
  const { open: openAppointment } = useAppointment();
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpenAppointment = (serviceTitle?: string) =>
    openAppointment({ serviceTitle });

  // Filter services by search keyword
  const filteredServices = useMemo(() => {
    return services.filter((srv) => {
      if (searchQuery.trim() === "") return true;
      const query = searchQuery.toLowerCase();
      return (
        srv.title.toLowerCase().includes(query) ||
        srv.description.toLowerCase().includes(query) ||
        srv.departmentName.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, services]);

  return (
    <main id="main-content" className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 selection:bg-[#dc2626] selection:text-white">

      {/* Page Hero with dark clinic atmosphere */}
      <PageHero
        title="Bizning Xizmatlarimiz va Narxlar"
        description="Markazimizda 40+ turdagi zamonaviy diagnostika, konsultatsiya va davolash xizmatlari xalqaro tibbiyot standartlari asosida taqdim etiladi."
        bgImage="/images/heroes/hero-services.jpg"
        breadcrumbs={[{ label: "Xizmatlar" }]}
      />

      {/* Main Content Area */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Clean Focused Search Input */}
          <div className="max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Xizmat yoki kasallik bo'yicha qidiring (MRT, Kardiolog, EKG)..."
                className="w-full pl-10 sm:pl-13 pr-10 sm:pr-12 py-3.5 sm:py-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm text-base sm:text-sm md:text-base font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Services Cards Grid */}
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="group bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Department Tag & Duration */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-lg bg-red-50 text-[#dc2626]">
                        {service.departmentName}
                      </span>
                      {service.duration && (
                        <span className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {service.duration}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#dc2626] transition-colors leading-snug mb-2">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal mb-5 line-clamp-3">
                      {service.description}
                    </p>
                  </div>

                  {/* Price & Action Button */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 mt-auto">
                    <div>
                      <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                        Xizmat narxi
                      </div>
                      <div className="text-base sm:text-lg font-black text-slate-900">
                        {formatPrice(service.price)}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenAppointment(service.title)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#dc2626] hover:bg-[#b91c1c] text-white text-xs sm:text-sm font-bold shadow-md shadow-red-500/20 active:scale-95 transition-all cursor-pointer shrink-0"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Yozilish</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 max-w-md mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#dc2626] flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-1">
                Hech qanday xizmat topilmadi
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 mb-6">
                Qidiruv so&apos;zini o&apos;zgartirib ko&apos;ring yoki barcha bo&apos;limlarni tanlang.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="px-5 py-2.5 rounded-full bg-[#dc2626] text-white text-xs font-bold shadow-md hover:bg-[#b91c1c] transition-all cursor-pointer"
              >
                Qidiruvni tozalash
              </button>
            </div>
          )}

          {/* Advantages / Why Choose Us Grid */}
          <div className="mt-16 sm:mt-24 pt-12 border-t border-slate-200">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#dc2626] mb-2">
                AFZALLIKLARIMIZ
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Nima Uchun Aynan Qaxramon-Raximjon?
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: ShieldCheck,
                  title: "100% Shaffof Narxlar",
                  desc: "Hech qanday yashirin qo'shimcha to'lovlarsiz, barcha muolajalar qat'iy belgilangan narxda.",
                },
                {
                  icon: Award,
                  title: "Oliy Toifali Shifokorlar",
                  desc: "Xalqaro klinikalarda tajriba orttirgan 45+ nafar yetakchi professor va vrachlar.",
                },
                {
                  icon: Sparkles,
                  title: "3.0 Tesla MRT & KT",
                  desc: "Germaniyaning eng so'nggi Siemens apparatlari orqali 0.1 mm aniqlikdagi tashxis.",
                },
                {
                  icon: CheckCircle2,
                  title: "Tezkor Natijalar",
                  desc: "Laborator tahlil va diagnostika xulosalarini o'sha kunning o'zida onlayn oling.",
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:border-red-200 transition-all"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-red-50 text-[#dc2626] flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Appointment Call-To-Action Banner */}
          <div className="mt-12 sm:mt-16 rounded-2xl bg-[#0f172a] border border-slate-800 p-6 sm:p-10 lg:p-12 text-white relative overflow-hidden shadow-sm">
            <div className="relative z-10 max-w-2xl">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight mb-2 sm:mb-3">
                O&apos;zingizga qulay vaqtda shifokor qabuliga yoziling
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mb-6 leading-relaxed">
                Formani to&apos;ldiring, 15 daqiqa ichida klinik koordinatorimiz siz bilan bog&apos;lanib, qulay qabul vaqtini tasdiqlaydi.
              </p>
              <button
                type="button"
                onClick={() => handleOpenAppointment()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold text-sm shadow-lg shadow-red-600/30 active:scale-95 transition-all cursor-pointer"
              >
                <span>Hozir qabulga yozilish</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Global Footer */}
      <Footer />

    </main>
  );
}
