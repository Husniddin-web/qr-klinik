"use client";

import React, { useState, useEffect } from "react";
import {
  Trash2,
  Loader2,
  Inbox,
  Phone,
  Calendar,
  Clock,
  Send,
  MessageSquare,
  Stethoscope,
} from "lucide-react";
import { SearchInput } from "@/components/admin/SearchInput";
import { Pagination } from "@/components/admin/Pagination";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { apiClient } from "@/lib/api-client";

type LeadType = "appointment" | "contact";
type LeadStatus = "new" | "contacted" | "confirmed" | "cancelled";

interface Lead {
  _id: string;
  type: LeadType;
  name: string;
  phone: string;
  departmentId?: { _id: string; title: string } | null;
  doctorId?: { _id: string; name: string } | null;
  serviceTitle?: string;
  preferredDate?: string;
  timeSlot?: string;
  message?: string;
  status: LeadStatus;
  source?: string;
  telegramSent: boolean;
  createdAt: string;
}

const STATUS_META: Record<LeadStatus, { label: string; cls: string; dot: string }> = {
  new: { label: "Yangi", cls: "bg-red-50 text-[#dc2626] border-red-200", dot: "bg-[#dc2626]" },
  contacted: { label: "Bog'lanildi", cls: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-500" },
  confirmed: { label: "Tasdiqlandi", cls: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
  cancelled: { label: "Bekor qilindi", cls: "bg-slate-100 text-slate-600 border-slate-200", dot: "bg-slate-400" },
};

const TIME_SLOT_LABEL: Record<string, string> = {
  morning: "Ertalab",
  afternoon: "Kunduzi",
  evening: "Kechqurun",
};

const PAGE_SIZE = 10;

export default function AppointmentsPage() {
  const [items, setItems] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [refreshKey, setRefreshKey] = useState(0);

  // Ma'lumot yuklash — bekor qilinadigan (cancel) effect; setState faqat callback'larda
  useEffect(() => {
    let active = true;
    apiClient
      .get<Lead[]>("/appointments", { page, limit: PAGE_SIZE, search, status: statusFilter, type: typeFilter })
      .then((res) => {
        if (!active) return;
        setItems(res.data || []);
        setTotal(res.pagination?.total || 0);
      })
      .catch((err) => console.error("Error fetching appointments", err))
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => {
      active = false;
    };
  }, [page, search, statusFilter, typeFilter, refreshKey]);

  const handleStatusChange = async (id: string, status: LeadStatus) => {
    setUpdatingId(id);
    try {
      const res = await apiClient.patch<Lead>(`/appointments/${id}/status`, { status });
      setItems((prev) => prev.map((it) => (it._id === id ? { ...it, status: res.data.status } : it)));
    } catch (err: unknown) {
      alert((err as Error).message || "Holatni yangilashda xatolik");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await apiClient.delete(`/appointments/${deleteId}`);
      setIsLoading(true);
      setRefreshKey((k) => k + 1);
    } catch (err: unknown) {
      alert((err as Error).message || "O'chirishda xatolik yuz berdi");
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] tracking-tight">
            Arizalar va Murojaatlar
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Saytdagi &quot;Qabulga yozilish&quot; va aloqa formalaridan kelgan so&apos;rovlar. Har biri Telegram guruhiga ham yuboriladi.
          </p>
        </div>
      </div>

      {/* Filtrlar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-xs">
        <SearchInput
          value={search}
          onChange={(val) => {
            setSearch(val);
            setPage(1);
            setIsLoading(true);
          }}
          placeholder="Ism, telefon yoki izoh bo'yicha qidirish..."
        />

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
              setPage(1);
              setIsLoading(true);
            }}
            className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#dc2626]"
          >
            <option value="">Barcha turlar</option>
            <option value="appointment">Qabulga yozilish</option>
            <option value="contact">Murojaat</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
              setIsLoading(true);
            }}
            className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#dc2626]"
          >
            <option value="">Barcha holatlar</option>
            {(Object.keys(STATUS_META) as LeadStatus[]).map((s) => (
              <option key={s} value={s}>
                {STATUS_META[s].label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Ro'yxat */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="py-16 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="w-7 h-7 text-[#dc2626] animate-spin mb-2" />
            <p className="text-xs">Yuklanmoqda...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Inbox className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-slate-700">Arizalar topilmadi</p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Saytdan yangi so&apos;rov kelganda shu yerda paydo bo&apos;ladi.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 font-bold uppercase tracking-wider text-[10px] sm:text-xs">
                  <th className="py-3.5 px-4 sm:px-6">Bemor</th>
                  <th className="py-3.5 px-4">Tur</th>
                  <th className="py-3.5 px-4 hidden lg:table-cell">Tafsilot</th>
                  <th className="py-3.5 px-4 hidden md:table-cell">Vaqt</th>
                  <th className="py-3.5 px-4">Holat</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((item) => {
                  const meta = STATUS_META[item.status] || STATUS_META.new;
                  return (
                    <tr key={item._id} className="hover:bg-slate-50/80 transition-colors align-top">
                      <td className="py-3 px-4 sm:px-6">
                        <div className="font-bold text-slate-900">{item.name}</div>
                        <a
                          href={`tel:${item.phone.replace(/\s+/g, "")}`}
                          className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-500 hover:text-[#dc2626] mt-0.5"
                        >
                          <Phone className="w-3 h-3" />
                          {item.phone}
                        </a>
                        {item.message && (
                          <p className="mt-1.5 text-[11px] text-slate-500 max-w-xs line-clamp-2 lg:hidden">
                            {item.message}
                          </p>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        {item.type === "appointment" ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[11px] font-semibold border border-blue-100">
                            <Stethoscope className="w-3 h-3" /> Qabul
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 text-[11px] font-semibold border border-purple-100">
                            <MessageSquare className="w-3 h-3" /> Murojaat
                          </span>
                        )}
                        <div className="mt-1.5 flex items-center gap-1 text-[10px] text-slate-400">
                          <Send className={`w-3 h-3 ${item.telegramSent ? "text-emerald-500" : "text-slate-300"}`} />
                          {item.telegramSent ? "Telegram'ga yuborildi" : "Telegram yo'q"}
                        </div>
                      </td>

                      <td className="py-3 px-4 hidden lg:table-cell text-xs text-slate-600 space-y-0.5 max-w-xs">
                        {item.departmentId?.title && <div>🏥 {item.departmentId.title}</div>}
                        {item.doctorId?.name && <div>👨‍⚕️ {item.doctorId.name}</div>}
                        {item.serviceTitle && <div>💊 {item.serviceTitle}</div>}
                        {(item.preferredDate || item.timeSlot) && (
                          <div className="inline-flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            {item.preferredDate}
                            {item.timeSlot ? ` · ${TIME_SLOT_LABEL[item.timeSlot] || item.timeSlot}` : ""}
                          </div>
                        )}
                        {item.message && <p className="text-slate-500 italic line-clamp-2">&ldquo;{item.message}&rdquo;</p>}
                      </td>

                      <td className="py-3 px-4 hidden md:table-cell text-xs font-mono text-slate-500 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {new Date(item.createdAt).toLocaleString("uz-UZ", {
                            day: "2-digit",
                            month: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <div className="relative inline-flex items-center">
                          <span className={`absolute left-2.5 w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                          <select
                            value={item.status}
                            disabled={updatingId === item._id}
                            onChange={(e) => handleStatusChange(item._id, e.target.value as LeadStatus)}
                            className={`pl-6 pr-7 py-1 rounded-full text-xs font-semibold border cursor-pointer focus:outline-none appearance-none disabled:opacity-60 ${meta.cls}`}
                          >
                            {(Object.keys(STATUS_META) as LeadStatus[]).map((s) => (
                              <option key={s} value={s}>
                                {STATUS_META[s].label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>

                      <td className="py-3 px-4 sm:px-6 text-right">
                        <button
                          type="button"
                          onClick={() => setDeleteId(item._id)}
                          className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-red-50 hover:border-red-200 inline-flex items-center justify-center text-slate-400 hover:text-[#dc2626] transition-colors"
                          title="O'chirish"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="px-6 py-2">
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(total / PAGE_SIZE) || 1}
            totalItems={total}
            pageSize={PAGE_SIZE}
            onPageChange={(p) => {
              setPage(p);
              setIsLoading(true);
            }}
          />
        </div>
      </div>

      <ConfirmModal
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Arizani o'chirish"
        message="Haqiqatan ham ushbu arizani o'chirmoqchimisiz? Bu amalni qaytarib bo'lmaydi."
      />
    </div>
  );
}
