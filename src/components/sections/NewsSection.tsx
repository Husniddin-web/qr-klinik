"use client";

import React from "react";
import Image from "next/image";
import { Clock, ArrowRight, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { NEWS_DATA } from "@/data/news";
import type { INews } from "@/types";
import { Container } from "../common/Container";
import { SectionHeading } from "../common/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "../common/Reveal";

export function NewsSection({ news = NEWS_DATA }: { news?: INews[] }) {
  const t = useTranslations("news");

  const featured = news[0];
  const sideArticles = news.slice(1, 3);

  return (
    <section id="news" className="section-pad bg-white text-slate-900 border-b border-slate-200/80 relative">
      <Container size="wide">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
          className="pb-8 border-b border-line mb-10"
          action={
            <Link
              href="/news"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-ink/15 text-ink text-sm font-semibold hover:bg-ink hover:text-white hover:border-ink transition-colors group"
            >
              <span>{t("allArticles")}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Asosiy maqola */}
          {featured && (
            <Reveal variant="left" delay={0.1} duration={0.7} className="lg:col-span-7">
              <Link href="/news" className="flex flex-col justify-between h-full group cursor-pointer text-left">
                <div className="photo-tone relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-slate-100 rounded-card shadow-card">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3.5 left-3.5 z-10 inline-flex items-center gap-2 px-2.5 py-1 bg-black/80 backdrop-blur-md text-slate-200 font-mono text-[11px] border border-white/15 rounded-md shadow-xs">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                    <Clock className="w-3 h-3 text-slate-300" />
                    <span>{featured.publishDate}</span>
                  </div>
                </div>

                <div className="pt-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-ink tracking-tight leading-snug group-hover:text-accent transition-colors">
                      {featured.title}
                    </h3>
                    <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 sm:line-clamp-3">
                      {featured.summary}
                    </p>
                  </div>

                  <div className="pt-5 mt-6 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-600 font-medium">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{featured.author || "Klinika Mutaxassisi"}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-ink group-hover:text-accent transition-colors">
                      <span>{t("readFull")}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          )}

          {/* Yon maqolalar — ketma-ket */}
          <RevealGroup
            delay={0.2}
            className="lg:col-span-5 flex flex-col justify-between gap-7 sm:gap-8"
          >
            {sideArticles.map((article) => (
              <RevealItem key={article.id} variant="right">
                <Link href="/news" className="group flex flex-col cursor-pointer text-left">
                  <div className="photo-tone relative aspect-[16/9] w-full overflow-hidden bg-slate-100 rounded-card shadow-card">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-2 py-0.5 bg-black/80 backdrop-blur-md text-slate-200 font-mono text-[11px] border border-white/15 rounded-md shadow-xs">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                      <Clock className="w-3 h-3 text-slate-300" />
                      <span>{article.publishDate}</span>
                    </div>
                  </div>

                  <div className="pt-3.5">
                    <h4 className="font-display text-base sm:text-lg font-bold text-ink tracking-tight leading-snug group-hover:text-accent transition-colors line-clamp-2">
                      {article.title}
                    </h4>
                    <div className="mt-2.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 group-hover:text-accent transition-colors">
                      <span>{t("readFull")}</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}
