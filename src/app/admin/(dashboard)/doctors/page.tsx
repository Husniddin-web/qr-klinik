"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, Users, Loader2 } from "lucide-react";
import { SearchInput } from "@/components/admin/SearchInput";
import { Pagination } from "@/components/admin/Pagination";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { apiClient, API_BASE_URL } from "@/lib/api-client";

interface Doctor {
  _id: string;
  name: string;
  role: string;
  image: string;
  experience?: string;
  bio?: string;
  departmentId?: {
    _id: string;
    title: string;
  };
  order: number;
  isActive: boolean;
  createdAt: string;
}

export default function DoctorsListPage() {
  const [items, setItems] = useState<Doctor[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [departments, setDepartments] = useState<any[]>([]);
  const [deptFilter, setDeptFilter] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    async function loadDepts() {
      try {
        const res = await apiClient.get<any[]>("/departments", { limit: 100 });
        setDepartments(res.data || []);
      } catch (err) {
        console.error("Error loading departments", err);
      }
    }
    loadDepts();
  }, []);

  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.get<Doctor[]>("/doctors", {
        page,
        limit: 10,
        search,
        isActive: statusFilter,
        departmentId: deptFilter,
      });
      setItems(res.data || []);
      setTotal(res.pagination?.total || 0);
    } catch (err) {
      console.error("Error fetching doctors", err);
    } finally {
      setIsLoading(false);
    }
  }, [page, search, statusFilter, deptFilter]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await apiClient.delete(`/doctors/${deleteId}`);
      fetchItems();
    } catch (err: any) {
      alert(err.message || "O'chirishda xatolik yuz berdi");
    } finally {
      setDeleteId(null);
    }
  };

  const getFullImageUrl = (url: string) => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    if (url.startsWith("/uploads")) {
      const origin = API_BASE_URL.replace("/api", "");
      return `${origin}${url}`;
    }
    return url;
  };

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] tracking-tight">
            Klinika Shifokorlari
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Yetakchi mutaxassislar, professorlar va tibbiy jamoa tarkibi
          </p>
        </div>

        <Link
          href="/admin/doctors/create"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#dc2626] hover:bg-red-700 text-white text-xs font-bold transition-colors shadow-xs shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Yangi shifokor qo&apos;shish
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-xs">
        <SearchInput
          value={search}
          onChange={(val) => {
            setSearch(val);
            setPage(1);
          }}
          placeholder="Ism yoki mutaxassislik bo'yicha qidirish..."
        />

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={deptFilter}
            onChange={(e) => {
              setDeptFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#dc2626]"
          >
            <option value="">Barcha bo&apos;limlar</option>
            {departments.map((d) => (
              <option key={d._id} value={d._id}>
                {d.title}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#dc2626]"
          >
            <option value="">Barcha statuslar</option>
            <option value="true">Faqat Faol</option>
            <option value="false">Faqat Nofaol</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="py-16 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="w-7 h-7 text-[#dc2626] animate-spin mb-2" />
            <p className="text-xs">Yuklanmoqda...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Users className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-slate-700">Shifokorlar topilmadi</p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Qidiruv so&apos;zini tekshiring yoki yangi shifokor qo&apos;shing.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 font-bold uppercase tracking-wider text-[10px] sm:text-xs">
                  <th className="py-3.5 px-4 sm:px-6">Fotosurat</th>
                  <th className="py-3.5 px-4">F.I.Sh (Ismi)</th>
                  <th className="py-3.5 px-4">Mutaxassisligi (Role)</th>
                  <th className="py-3.5 px-4">Bo&apos;limi</th>
                  <th className="py-3.5 px-4 hidden sm:table-cell">Tajribasi</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    <td className="py-3 px-4 sm:px-6">
                      <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={getFullImageUrl(item.image)}
                          alt={item.name}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-bold text-slate-900 block truncate max-w-[180px]">
                        {item.name}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span className="text-xs text-slate-700 font-medium block truncate max-w-[200px]">
                        {item.role}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                        {item.departmentId?.title || "Umumiy"}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-slate-500 hidden sm:table-cell text-xs">
                      {item.experience || "—"}
                    </td>

                    <td className="py-3 px-4">
                      <StatusBadge isActive={item.isActive} />
                    </td>

                    <td className="py-3 px-4 sm:px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/admin/doctors/${item._id}/edit`}
                          className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors"
                          title="Tahrirlash"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setDeleteId(item._id)}
                          className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-red-50 hover:border-red-200 flex items-center justify-center text-slate-400 hover:text-[#dc2626] transition-colors"
                          title="O'chirish"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="px-6 py-2">
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(total / 10) || 1}
            totalItems={total}
            pageSize={10}
            onPageChange={(p) => setPage(p)}
          />
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Shifokorni o'chirish"
        message="Haqiqatan ham ushbu shifokorni o'chirmoqchimisiz? O'chirilgach, shifokor saytdagi jamoa ro'yxatidan olinadi."
      />
    </div>
  );
}
