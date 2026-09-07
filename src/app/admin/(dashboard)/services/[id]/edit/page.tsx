"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { apiClient } from "@/lib/api-client";

export default function EditServicePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [departments, setDepartments] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    priceFormatted: "",
    departmentId: "",
    duration: "",
    isActive: true,
  });

  useEffect(() => {
    async function loadData() {
      try {
        const [serviceRes, deptRes] = await Promise.all([
          apiClient.get<any>(`/services/${id}`),
          apiClient.get<any[]>("/departments", { limit: 100 }),
        ]);

        const s = serviceRes.data;
        setDepartments(deptRes.data || []);
        setFormData({
          title: s.title || "",
          description: s.description || "",
          price: s.price ? String(s.price) : "",
          priceFormatted: s.priceFormatted || "",
          departmentId: s.departmentId?._id || s.departmentId || "",
          duration: s.duration || "",
          isActive: s.isActive ?? true,
        });
      } catch (err: any) {
        setError(err.message || "Xizmatni yuklashda xatolik yuz berdi");
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [id]);

  const handlePriceChange = (val: string) => {
    const numeric = val.replace(/\D/g, "");
    const formatted = numeric
      ? parseInt(numeric, 10).toLocaleString("uz-UZ") + " so'm"
      : "";

    setFormData({
      ...formData,
      price: numeric,
      priceFormatted: formatted,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError("Xizmat nomi kiritilishi shart");
      return;
    }
    if (!formData.description.trim()) {
      setError("Tavsif kiritilishi shart");
      return;
    }
    if (!formData.price || isNaN(Number(formData.price))) {
      setError("Narx to'g'ri kiritilishi shart");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await apiClient.put(`/services/${id}`, {
        title: formData.title.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        priceFormatted: formData.priceFormatted,
        departmentId: formData.departmentId || null,
        duration: formData.duration.trim(),
        isActive: formData.isActive,
      });
      router.push("/admin/services");
    } catch (err: any) {
      setError(err.message || "O'zgarishlarni saqlashda xatolik yuz berdi");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-slate-400">
        <Loader2 className="w-8 h-8 text-[#dc2626] animate-spin mb-3" />
        <p className="text-xs font-semibold">Xizmat ma&apos;lumotlari yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/admin/services"
          className="w-9 h-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] tracking-tight">
            Xizmatni Tahrirlash
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Xizmat narxi yoki tavsifini yangilash
          </p>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        {error && (
          <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium leading-relaxed">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Xizmat nomi <span className="text-[#dc2626]">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626] transition-all"
            />
          </div>

          {/* Department Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Tegishli Bo&apos;lim (Department)
            </label>
            <select
              value={formData.departmentId}
              onChange={(e) =>
                setFormData({ ...formData, departmentId: e.target.value })
              }
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626] transition-all"
            >
              <option value="">Bo&apos;limga bog&apos;lamaslik (Umumiy)</option>
              {departments.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.title}
                </option>
              ))}
            </select>
          </div>

          {/* Price & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Narxi (so&apos;mda) <span className="text-[#dc2626]">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.price}
                onChange={(e) => handlePriceChange(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626] transition-all font-mono"
              />
              {formData.priceFormatted && (
                <p className="text-xs text-emerald-600 font-bold mt-1">
                  Saytdagi ko&apos;rinishi: {formData.priceFormatted}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Davomiyligi (Duration)
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626] transition-all"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Batafsil Tavsif <span className="text-[#dc2626]">*</span>
            </label>
            <textarea
              rows={4}
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626] transition-all resize-none"
            />
          </div>

          {/* Status */}
          <div>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
                className="w-4 h-4 text-[#dc2626] rounded border-slate-300 focus:ring-[#dc2626]"
              />
              <span className="text-xs font-semibold text-slate-700">
                Faol (Saytda narxlar jadvalida ko&apos;rinsin)
              </span>
            </label>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <Link
              href="/admin/services"
              className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-600 transition-colors"
            >
              Bekor qilish
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-[#dc2626] hover:bg-red-700 text-white text-xs font-bold flex items-center gap-2 transition-colors shadow-xs disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saqlanmoqda...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  O&apos;zgarishlarni saqlash
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
