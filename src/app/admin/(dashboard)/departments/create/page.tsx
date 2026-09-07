"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { apiClient } from "@/lib/api-client";

export default function CreateDepartmentPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "",
    order: 0,
    isActive: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError("Bo'lim nomi kiritilishi shart");
      return;
    }
    if (!formData.description.trim()) {
      setError("Tavsif kiritilishi shart");
      return;
    }
    if (!formData.icon) {
      setError("Iltimos, bo'lim uchun rasm yoki ikona yuklang");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await apiClient.post("/departments", formData);
      router.push("/admin/departments");
    } catch (err: any) {
      setError(err.message || "Bo'lim qo'shishda xatolik yuz berdi");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/admin/departments"
          className="w-9 h-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] tracking-tight">
            Yangi Bo&apos;lim Qo&apos;shish
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Klinikaning yangi tibbiy yo&apos;nalishi yoki bo&apos;limini ro&apos;yxatga olish
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
              Bo&apos;lim nomi <span className="text-[#dc2626]">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Masalan: Kardiologiya yoki MRT Diagnostika"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626] transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Bo&apos;lim tavsifi <span className="text-[#dc2626]">*</span>
            </label>
            <textarea
              rows={4}
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Bo'lim nima bilan shug'ullanishi, qanday kasalliklar tashxislanishi haqida qisqacha ma'lumot..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626] transition-all resize-none"
            />
          </div>

          {/* Universal Image Upload */}
          <div>
            <ImageUpload
              label="Bo'lim rasmi / ikonkasi *"
              helperText="Tavsiya etiladi: toza SVG ikona yoki sifatli JPG/PNG/WEBP rasm (maks. 5MB)"
              value={formData.icon}
              onChange={(url) => setFormData({ ...formData, icon: url })}
            />
          </div>

          {/* Order & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Tartib raqami (Order)
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    order: parseInt(e.target.value, 10) || 0,
                  })
                }
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626] transition-all"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Saytda ko&apos;rinish ketma-ketligi (kichik sonlar avval chiqadi)
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Status
              </label>
              <div className="pt-2">
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
                    Faol (Saytda ko&apos;rinsin)
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <Link
              href="/admin/departments"
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
                  Saqlash
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
