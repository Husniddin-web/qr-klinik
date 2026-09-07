"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { UploadCloud, X, Loader2, Image as ImageIcon } from "lucide-react";
import { apiClient, API_BASE_URL } from "@/lib/api-client";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  helperText?: string;
}

export function ImageUpload({
  value,
  onChange,
  label = "Rasm yuklash",
  helperText = "PNG, JPG, WEBP yoki SVG (maks. 5MB)",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Faqat rasm fayllari qabul qilinadi");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Rasm hajmi 5MB dan oshmasligi kerak");
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      const data = await apiClient.uploadFile(file);
      onChange(data.url);
    } catch (err: any) {
      setError(err.message || "Fayl yuklashda xatolik yuz berdi");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  // Resolve preview image URL: if relative path like /uploads/..., prepend API origin if needed
  const getFullImageUrl = (url: string) => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    if (url.startsWith("/uploads")) {
      // Backend static URL
      const origin = API_BASE_URL.replace("/api", "");
      return `${origin}${url}`;
    }
    return url; // Next.js public image
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          {label}
        </label>
      )}

      {value ? (
        <div className="relative group w-full max-w-sm rounded-xl overflow-hidden border border-slate-200 bg-slate-50 p-2 flex items-center gap-3">
          <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-white border border-slate-200 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getFullImageUrl(value)}
              alt="Uploaded"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-700 truncate">
              Rasm yuklangan
            </p>
            <p className="text-[11px] text-slate-400 truncate mt-0.5">
              {value}
            </p>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="text-xs text-[#dc2626] font-medium hover:underline mt-1 inline-block"
            >
              Almashtirish
            </button>
          </div>

          <button
            type="button"
            onClick={() => onChange("")}
            className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-[#dc2626] hover:border-red-200 hover:bg-red-50 flex items-center justify-center transition-colors"
            title="O'chirish"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => inputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
            dragActive
              ? "border-[#dc2626] bg-red-50/50"
              : "border-slate-200 hover:border-slate-300 bg-slate-50/60 hover:bg-slate-50"
          }`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center justify-center py-3">
              <Loader2 className="w-8 h-8 text-[#dc2626] animate-spin mb-2" />
              <p className="text-xs font-medium text-slate-600">
                Serverga yuklanmoqda...
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center mb-2 shadow-xs">
                <UploadCloud className="w-5 h-5 text-slate-500" />
              </div>
              <p className="text-xs font-semibold text-slate-700">
                Rasmni bu yerga tashlang yoki{" "}
                <span className="text-[#dc2626] hover:underline">tanlang</span>
              </p>
              <p className="text-[11px] text-slate-400 mt-1">{helperText}</p>
            </div>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp, image/svg+xml"
        onChange={handleFileChange}
        className="hidden"
      />

      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
    </div>
  );
}
