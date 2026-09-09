"use client";

import React from "react";
import Image from "next/image";
import { Clock, ArrowRight, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { NEWS_DATA } from "@/data/news";
import { Container } from "../common/Container";

export function NewsSection() {
  const t = useTranslations("news");

  const featured = NEWS_DATA[0];
  const sideArticles = NEWS_DATA.slice(1, 3);

  return (
    <section id="news" className="py-20 lg:py-28 bg-white text-slate-900 border-b border-slate-200/80 relative">
      <Container size="wide">
        {/* Top Header Row (Matching Reference Image 2) */}
        <div
          data-aos="fade-down"
          data-aos-duration="750"
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-[#0f172a] font-sans">
              {t("title")}
            </h2>
          </div>

          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#dc2626] hover:bg-[#b91c1c] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 self-start md:self-auto shrink-0 shadow-lg shadow-red-600/25 active:scale-95 rounded-lg"
          >
            <span>{t("allArticles")}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Editorial News Grid (1 Featured Lead + 2 Stacked Secondary) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mt-10">
          
          {/* Left Column: Big Featured Lead Article (lg:col-span-7) */}
          {featured && (
            <Link
              href="/news"
              data-aos="fade-right"
              data-aos-delay="200"
              data-aos-duration="850"
              className="lg:col-span-7 flex flex-col justify-between group cursor-pointer text-left"
            >
              {/* Image Container with Dark Minimal Date Overlay */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-slate-100 rounded-xl shadow-xs">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Minimalist Date Tag (Exact Style from Image 2) */}
                <div className="absolute top-3.5 left-3.5 z-10 inline-flex items-center gap-2 px-2.5 py-1 bg-black/80 backdrop-blur-md text-slate-200 font-mono text-[11px] border border-white/15 rounded-md shadow-xs">
                  <span className="w-1.5 h-1.5 bg-[#dc2626] rounded-full" />
                  <Clock className="w-3 h-3 text-slate-300" />
                  <span>{featured.publishDate}</span>
                </div>
              </div>

              {/* Text Block */}
              <div className="pt-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0f172a] tracking-tight leading-snug group-hover:text-[#dc2626] transition-colors">
                    {featured.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 sm:line-clamp-3">
                    {featured.summary}
                  </p>
                </div>

                {/* Author & Read Full Story Footer */}
                <div className="pt-5 mt-6 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-600 font-medium">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>{featured.author || "Klinika Mutaxassisi"}</span>
                  </div>

                  <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[#0f172a] group-hover:text-[#dc2626] transition-colors">
                    <span>{t("readFull")}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Right Column: 2 Stacked Secondary Articles (lg:col-span-5) */}
          <div
            data-aos="fade-left"
            data-aos-delay="300"
            data-aos-duration="850"
            className="lg:col-span-5 flex flex-col justify-between gap-7 sm:gap-8"
          >
            {sideArticles.map((article) => (
              <Link
                key={article.id}
                href="/news"
                className="group flex flex-col cursor-pointer text-left"
              >
                {/* Image Container with Date Tag */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 rounded-xl shadow-xs">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Minimalist Date Tag */}
                  <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-2 py-0.5 bg-black/80 backdrop-blur-md text-slate-200 font-mono text-[11px] border border-white/15 rounded-md shadow-xs">
                    <span className="w-1.5 h-1.5 bg-[#dc2626] rounded-full" />
                    <Clock className="w-3 h-3 text-slate-300" />
                    <span>{article.publishDate}</span>
                  </div>
                </div>

                {/* Title and Read Link */}
                <div className="pt-3.5">
                  <h4 className="text-base sm:text-lg font-bold text-[#0f172a] tracking-tight leading-snug group-hover:text-[#dc2626] transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                  <div className="mt-2.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 group-hover:text-[#dc2626] transition-colors">
                    <span>{t("readFull")}</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}

