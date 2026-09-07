"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Stethoscope,
  Network,
  Newspaper,
  Plus,
  ArrowRight,
  TrendingUp,
  Activity,
  CheckCircle,
  Clock,
} from "lucide-react";
import { KpiCard } from "@/components/admin/KpiCard";
import { apiClient } from "@/lib/api-client";
import { useAuth } from "@/lib/auth-context";

interface SummaryData {
  doctors: { total: number; active: number };
  services: { total: number; active: number };
  departments: { total: number; active: number };
  news: { total: number; active: number };
}

export default function AdminDashboardPage() {
  const { admin } = useAuth();
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSummary() {
      try {
        const res = await apiClient.get<SummaryData>("/stats/summary");
        setSummary(res.data);
      } catch (err) {
        console.error("Failed to load summary", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadSummary();
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-xs">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#dc2626] uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5" />
            Klinika Boshqaruv Markazi
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] tracking-tight">
            Xush kelibsiz, {admin?.fullName || "Administrator"}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
            Bu yerdan shifokorlar ro&apos;yxati, tibbiy xizmatlar, bo&apos;limlar va
            yangiliklarni boshqarishingiz mumkin.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/doctors/create"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#dc2626] hover:bg-red-700 text-white text-xs font-bold transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            Shifokor qo&apos;shish
          </Link>
          <Link
            href="/admin/services/create"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            Xizmat qo&apos;shish
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KpiCard
          title="Shifokorlar"
          value={isLoading ? "..." : summary?.doctors.total || 0}
          subValue={`${summary?.doctors.active || 0} ta faol mutaxassis`}
          icon={Users}
          color="red"
        />
        <KpiCard
          title="Xizmatlar"
          value={isLoading ? "..." : summary?.services.total || 0}
          subValue={`${summary?.services.active || 0} ta faol xizmat turi`}
          icon={Stethoscope}
          color="blue"
        />
        <KpiCard
          title="Bo'limlar"
          value={isLoading ? "..." : summary?.departments.total || 0}
          subValue={`${summary?.departments.active || 0} ta faol bo'lim`}
          icon={Network}
          color="purple"
        />
        <KpiCard
          title="Yangiliklar"
          value={isLoading ? "..." : summary?.news.total || 0}
          subValue={`${summary?.news.active || 0} ta e'lon qilingan`}
          icon={Newspaper}
          color="emerald"
        />
      </div>

      {/* Quick Action Navigation Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Module 1: Shifokorlar & Xizmatlar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-50 text-[#dc2626] flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Shifokorlar va Mutaxassislar
              </h3>
            </div>
            <Link
              href="/admin/doctors"
              className="text-xs font-semibold text-[#dc2626] hover:underline flex items-center gap-1"
            >
              Barchasini ko&apos;rish
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Shifokorlar fotosurati, ismi, mutaxassislik yo&apos;nalishi, ish
            tajribasi va tegishli bo&apos;limini boshqarish.
          </p>

          <div className="pt-2 flex items-center gap-3">
            <Link
              href="/admin/doctors/create"
              className="flex-1 py-2 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 text-center transition-colors flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5 text-[#dc2626]" />
              Yangi shifokor
            </Link>
            <Link
              href="/admin/doctors"
              className="flex-1 py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 text-center transition-colors"
            >
              Ro&apos;yxatni ochish
            </Link>
          </div>
        </div>

        {/* Module 2: Xizmatlar & Bo'limlar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Stethoscope className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Xizmatlar va Narxlar
              </h3>
            </div>
            <Link
              href="/admin/services"
              className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
            >
              Barchasini ko&apos;rish
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Tibbiy diagnostika, konsultatsiya, muolajalar va laboratoriya
            xizmatlarining narxlari hamda davomiyligi.
          </p>

          <div className="pt-2 flex items-center gap-3">
            <Link
              href="/admin/services/create"
              className="flex-1 py-2 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 text-center transition-colors flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5 text-blue-600" />
              Yangi xizmat
            </Link>
            <Link
              href="/admin/services"
              className="flex-1 py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 text-center transition-colors"
            >
              Ro&apos;yxatni ochish
            </Link>
          </div>
        </div>

        {/* Module 3: Bo'limlar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <Network className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Klinika Bo&apos;limlari
              </h3>
            </div>
            <Link
              href="/admin/departments"
              className="text-xs font-semibold text-purple-600 hover:underline flex items-center gap-1"
            >
              Barchasini ko&apos;rish
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Kardiologiya, Nevrologiya, MRT diagnostika, Pediatriya kabi
            yo&apos;nalishlar, ularning ikonkasi va tavsiflari.
          </p>

          <div className="pt-2 flex items-center gap-3">
            <Link
              href="/admin/departments/create"
              className="flex-1 py-2 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 text-center transition-colors flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5 text-purple-600" />
              Yangi bo&apos;lim
            </Link>
            <Link
              href="/admin/departments"
              className="flex-1 py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 text-center transition-colors"
            >
              Ro&apos;yxatni ochish
            </Link>
          </div>
        </div>

        {/* Module 4: Yangiliklar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Newspaper className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Yangiliklar va Aksiya
              </h3>
            </div>
            <Link
              href="/admin/news"
              className="text-xs font-semibold text-emerald-600 hover:underline flex items-center gap-1"
            >
              Barchasini ko&apos;rish
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Klinikada o&apos;tkazilayotgan aksiyalar, yangi tibbiy uskunalar
            haqidagi xabarlar va shifokor maslahatlari maqolalari.
          </p>

          <div className="pt-2 flex items-center gap-3">
            <Link
              href="/admin/news/create"
              className="flex-1 py-2 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 text-center transition-colors flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-600" />
              Yangi maqola
            </Link>
            <Link
              href="/admin/news"
              className="flex-1 py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 text-center transition-colors"
            >
              Ro&apos;yxatni ochish
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
