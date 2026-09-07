"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { apiClient } from "@/lib/api-client";

export default function EditNewsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    category: "Yangilik",
    isActive: true,
  });

  useEffect(() => {
    async function loadNews() {
      try {
        const res = await apiClient.get<any>(`/news/${id}`);
        const n = res.data;
        setFormData({
          title: n.title || "",
          description: n.description || "",
          image: n.image || "",
          category: n.category || "Yangilik",
          isActive: n.isActive ?? true,
        });
      } catch (err: any) {
        setError(err.message || "Yangilikni yuklashda xatolik yuz berdi");
      } finally {
        setIsLoading(false);
      }
    }
    loadNews();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError("Sarlavha kiritilishi shart");
      return;
    }
    if (!formData.description.trim()) {
      setError("Tavsif kiritilishi shart");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await apiClient.put(`/news/${id}`, {
        title: formData.title.trim(),
        description: formData.description.trim(),
        image: formData.image,
        category: formData.category,
        isActive: formData.isActive,
      });
      router.push("/admin/news");
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
        <p className="text-xs font-semibold">Maqola ma&apos;lumotlari yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/admin/news"
          className="w-9 h-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] tracking-tight">
            Maqolani Tahrirlash
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Yangilik matni, sarlavhasi yoki rasmini yangilash
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
              Sarlavha (Title) <span className="text-[#dc2626]">*</span>
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

          {/* Category */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Kategoriya
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626] transition-all"
            >
              <option value="Yangilik">Yangilik</option>
              <option value="Texnologiya">Texnologiya</option>
              <option value="Salomatlik">Salomatlik</option>
              <option value="Aksiya">Aksiya</option>
            </select>
          </div>

          {/* Universal Image Upload */}
          <div>
            <ImageUpload
              label="Maqola rasmi"
              helperText="Tavsiya etiladi: 16:9 yoki sifatli gorizontal fotosurat (maks. 5MB)"
              value={formData.image}
              onChange={(url) => setFormData({ ...formData, image: url })}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Batafsil Matn / Tavsif <span className="text-[#dc2626]">*</span>
            </label>
            <textarea
              rows={6}
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
                Faol (Saytda e&apos;lon qilinsin)
              </span>
            </label>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <Link
              href="/admin/news"
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
