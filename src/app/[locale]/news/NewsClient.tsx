"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  Send,
  CheckCircle2,
  X,
} from "lucide-react";
import { Footer } from "@/components/common/Footer";
import { PageHero } from "@/components/common/PageHero";
import { useAppointment } from "@/components/providers/AppointmentProvider";
import { INews } from "@/types";

export function NewsClient({ news }: { news: INews[] }) {
  const { open: openAppointment } = useAppointment();
  const [activeArticle, setActiveArticle] = useState<INews | null>(null);

  const featuredArticle = news[1] || news[0];

  return (
    <main id="main-content" className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 selection:bg-[#dc2626] selection:text-white">

      {/* Page Hero without eyebrow badge */}
      <PageHero
        title="Salomatlik Ilmi, Tavsiyalar va So'nggi Yangiliklar"
        description="Klinikamiz mutaxassislari tomonidan tayyorlangan ilmiy tahlillar, amaliy salomatlik qo'llanmalari va klinika yangiliklari."
        bgImage="/images/heroes/hero-news.jpg"
        breadcrumbs={[{ label: "Yangiliklar" }]}
      />

      {/* Main Content Area */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Article Banner */}
          {featuredArticle && (
            <div className="mb-12 sm:mb-16 rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                <div className="lg:col-span-7 relative min-h-[220px] sm:min-h-[360px] lg:min-h-[420px]">
                  <Image
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
                </div>

                <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-xs text-slate-400 font-medium">
                        {featuredArticle.publishDate}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 leading-tight mb-4 hover:text-[#dc2626] transition-colors">
                      {featuredArticle.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                      {featuredArticle.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{featuredArticle.author}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveArticle(featuredArticle)}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#dc2626] hover:text-[#b91c1c] transition-colors cursor-pointer"
                    >
                      <span>Batafsil o&apos;qish</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Articles Grid (Without any badges on images or search section) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {news.map((article) => (
              <article
                key={article.id}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Clean Image Header (No badges) */}
                  <div className="relative w-full aspect-[16/10] bg-slate-100 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium mb-2.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {article.publishDate}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#dc2626] transition-colors leading-snug mb-3 line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed line-clamp-3 mb-4">
                      {article.summary}
                    </p>
                  </div>
                </div>

                {/* Footer Author & Read Action */}
                <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate max-w-[140px] font-medium">
                      {article.author}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveArticle(article)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#dc2626] hover:text-[#b91c1c] transition-colors cursor-pointer"
                  >
                    <span>O&apos;qish</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Telegram Newsletter Channel Banner */}
          <div className="mt-16 sm:mt-24 rounded-3xl bg-gradient-to-r from-[#0b1328] via-[#101c3d] to-[#0b1328] p-7 sm:p-10 lg:p-12 text-white relative overflow-hidden shadow-xl">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">
                <Send className="w-3.5 h-3.5" />
                Telegram Salomatlik Kanali
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-3">
                Foydali Tibbiy Maslahatlar va Yangiliklarni Telegramda Kuzating
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mb-6 leading-relaxed">
                Shifokorlarimiz tomonidan tayyorlanadigan har haftalik tavsiyalar, tekshiruvlarga tayyorgarlik qo&apos;llanmalari va aksiyalardan birinchi bo&apos;lib xabardor bo&apos;ling.
              </p>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#229ED9] hover:bg-[#1e8bc0] text-white font-bold text-sm shadow-lg shadow-blue-600/30 active:scale-95 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Telegram kanalga a&apos;zo bo&apos;lish</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Article Modal Reader */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 animate-scaleUp max-h-[90vh] flex flex-col">
            {/* Header image */}
            <div className="relative w-full h-48 sm:h-64 bg-slate-100 shrink-0">
              <Image
                src={activeArticle.image}
                alt={activeArticle.title}
                fill
                className="object-cover object-center"
              />
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-black/80 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content body */}
            <div className="p-5 sm:p-8 overflow-y-auto space-y-4">
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span>{activeArticle.publishDate}</span>
                <span>•</span>
                <span>{activeArticle.readTime}</span>
                <span>•</span>
                <span className="font-semibold text-slate-700">{activeArticle.author}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                {activeArticle.title}
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                {activeArticle.summary}
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700 space-y-2">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Shifokor tavsiyasi:
                </div>
                <p>
                  Salomatligingizda biron bir noqulaylik yoki xavotirli alomat sezsangiz, o&apos;z-o&apos;zini davolash bilan shug&apos;ullanmang. Klinikamizning ixtisoslashgan mutaxassisiga murojaat qiling va o&apos;z vaqtida aniq tashxisdan o&apos;ting.
                </p>
              </div>

              <div className="pt-4 flex flex-col-reverse sm:flex-row gap-2.5 sm:gap-0 items-stretch sm:items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setActiveArticle(null);
                    openAppointment();
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#dc2626] hover:bg-[#b91c1c] text-white text-xs sm:text-sm font-bold shadow-md shadow-red-500/20 active:scale-95 transition-all cursor-pointer text-center"
                >
                  Shifokor ko&apos;rigiga yozilish
                </button>
                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer text-center py-1 sm:py-0"
                >
                  Yopish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Footer */}
      <Footer />

    </main>
  );
}
