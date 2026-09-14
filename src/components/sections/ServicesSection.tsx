"use client";

import React, { useMemo, useState } from "react";
import {
  Search,
  X,
  LayoutGrid,
  List,
  ArrowRight,
  HeartPulse,
  Brain,
  Baby,
  ScanLine,
  Stethoscope,
  Activity,
  FlaskConical,
  ShieldAlert,
  Crosshair,
  type LucideIcon,
} from "lucide-react";
import { m } from "framer-motion";
import { useTranslations } from "next-intl";
import { SERVICES_DATA } from "@/data/services";
import type { IService } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import { Container } from "../common/Container";
import { SectionHeading } from "../common/SectionHeading";
import { Reveal } from "../common/Reveal";
import { SPRING } from "@/lib/animations";

interface ServicesSectionProps {
  onOpenAppointment: (serviceTitle?: string) => void;
  services?: IService[];
}

type View = "grid" | "list";

/** Bo'lim → ikonka. Karta "qaysi yo'nalish" ekanini bir qarashda aytadi, yozuvsiz. */
const DEPT_ICONS: Record<string, LucideIcon> = {
  cardiology: HeartPulse,
  neurology: Brain,
  pediatrics: Baby,
  diagnostics: ScanLine,
  therapy: Stethoscope,
  orthopedics: Activity,
  laboratory: FlaskConical,
  endocrinology: ShieldAlert,
  surgery: Crosshair,
};

/** Dastlab ko'rsatiladigan xizmatlar soni (grid: 3 qator, ro'yxat: 8 qator) */
const PREVIEW = { grid: 9, list: 8 } as const;

/**
 * Xizmatlar va narxlar.
 * Toolbar: qidiruv (chapda) + natija soni va ko'rinish almashtirgichi (o'ngda).
 * Karta tarkibi qat'iy: nom, tavsif, narx, "Yozilish". Boshqa hech narsa.
 */
export function ServicesSection({ onOpenAppointment, services = SERVICES_DATA }: ServicesSectionProps) {
  const t = useTranslations("services");
  const [view, setView] = useState<View>("grid");
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return services;
    return services.filter(
      (s) => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
    );
  }, [services, query]);

  const isSearching = query.trim().length > 0;
  const visible = isSearching || showAll ? filtered : filtered.slice(0, PREVIEW[view]);
  const hidden = filtered.length - visible.length;

  return (
    <section id="services" className="section-pad bg-white border-b border-line">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

        {/* ---------- Toolbar ---------- */}
        <Reveal className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6">
          <label className="relative flex items-center flex-1 sm:max-w-md">
            <Search className="absolute left-4 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full h-11 pl-11 pr-10 rounded-xl bg-white text-sm text-ink placeholder:text-slate-400 border border-line focus:outline-none focus:border-ink/40 focus:ring-4 focus:ring-ink/5 transition [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Tozalash"
                className="absolute right-2.5 w-6 h-6 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </label>

          <div className="flex items-center justify-between sm:justify-end gap-4 sm:ml-auto">
            <span className="text-sm text-slate-500 tabular-nums">{t("count", { count: filtered.length })}</span>

            <div role="group" aria-label="Ko'rinish" className="flex items-center h-11 p-1 rounded-xl bg-canvas-soft border border-line">
              {(
                [
                  { id: "grid", icon: LayoutGrid, label: t("viewGrid") },
                  { id: "list", icon: List, label: t("viewList") },
                ] as const
              ).map((opt) => {
                const active = view === opt.id;
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    aria-pressed={active}
                    aria-label={opt.label}
                    onClick={() => {
                      setView(opt.id);
                      setShowAll(false);
                    }}
                    className={cn(
                      "relative w-10 h-full rounded-lg flex items-center justify-center transition-colors cursor-pointer",
                      active ? "text-white" : "text-slate-500 hover:text-ink"
                    )}
                  >
                    {active && (
                      <m.span layoutId="services-view" transition={SPRING.soft} className="absolute inset-0 rounded-lg bg-ink" />
                    )}
                    <Icon className="relative z-10 w-4 h-4" />
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* ---------- Natijalar ---------- */}
        {visible.length === 0 ? (
          <div className="rounded-card border border-line px-6 py-16 text-center text-sm text-slate-500">
            {t("empty")}
          </div>
        ) : view === "grid" ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {visible.map((s) => (
              <li key={s.id}>
                <ServiceCard service={s} onBook={() => onOpenAppointment(s.title)} bookLabel={t("book")} popularLabel={t("popular")} />
              </li>
            ))}
          </ul>
        ) : (
          <ul className="rounded-card bg-white border border-line divide-y divide-line overflow-hidden">
            {visible.map((s) => (
              <li key={s.id}>
                <ServiceRow service={s} onBook={() => onOpenAppointment(s.title)} bookLabel={t("book")} popularLabel={t("popular")} />
              </li>
            ))}
          </ul>
        )}

        {!isSearching && (hidden > 0 || showAll) && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="inline-flex items-center gap-2 h-11 px-6 rounded-xl border border-line text-sm font-semibold text-ink hover:bg-ink hover:text-white hover:border-ink transition-colors cursor-pointer"
            >
              {showAll ? t("showLess") : t("showAll", { count: filtered.length })}
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}

/* ==========================================================================
   Karta (grid) va qator (ro'yxat) — bir xil tarkib, ikki xil joylashuv
   ========================================================================== */

interface ItemProps {
  service: IService;
  onBook: () => void;
  bookLabel: string;
  popularLabel: string;
}

function ServiceCard({ service, onBook, bookLabel, popularLabel }: ItemProps) {
  const Icon = DEPT_ICONS[service.departmentId] ?? Stethoscope;
  return (
    <article className="group h-full rounded-card bg-white border border-line p-6 flex flex-col transition-[box-shadow,border-color] duration-300 hover:border-slate-300 hover:shadow-card-hover">
      <div className="flex-1">
        <div className="flex items-start justify-between gap-3 mb-5">
          <span className="w-11 h-11 rounded-xl bg-canvas-soft text-ink flex items-center justify-center transition-colors group-hover:bg-ink group-hover:text-white">
            <Icon className="w-5 h-5" strokeWidth={1.75} />
          </span>
          {service.isPopular && (
            <span className="text-[11px] font-semibold uppercase tracking-wider text-accent">{popularLabel}</span>
          )}
        </div>
        <h3 className="font-display font-semibold text-[17px] leading-snug text-ink">{service.title}</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-slate-500 line-clamp-3">{service.description}</p>
      </div>

      <div className="mt-6 pt-5 border-t border-line flex items-center justify-between gap-4">
        <span className="font-display font-bold text-xl tabular-nums whitespace-nowrap text-ink">{formatPrice(service.price)}</span>
        <BookButton onClick={onBook} label={bookLabel} title={service.title} />
      </div>
    </article>
  );
}

function ServiceRow({ service, onBook, bookLabel, popularLabel }: ItemProps) {
  const Icon = DEPT_ICONS[service.departmentId] ?? Stethoscope;
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] md:grid-cols-[auto_minmax(0,1fr)_auto_auto] md:items-center gap-x-4 md:gap-x-8 gap-y-3 px-5 sm:px-6 py-5 hover:bg-canvas-soft transition-colors">
      <span className="w-10 h-10 rounded-xl bg-canvas-soft text-ink flex items-center justify-center shrink-0">
        <Icon className="w-[18px] h-[18px]" strokeWidth={1.75} />
      </span>
      <div className="min-w-0">
        <div className="flex items-center gap-2.5">
          <h3 className="font-display font-semibold text-base leading-snug text-ink">{service.title}</h3>
          {service.isPopular && (
            <span className="text-[11px] font-semibold uppercase tracking-wider text-accent">{popularLabel}</span>
          )}
        </div>
        <p className="mt-1 text-[13px] leading-relaxed text-slate-500 line-clamp-2 md:line-clamp-1">{service.description}</p>
      </div>
      <div className="col-start-2 md:col-start-auto flex items-center justify-between md:contents">
        <span className="font-display font-bold text-lg tabular-nums whitespace-nowrap text-ink md:min-w-[140px] md:text-right">
          {formatPrice(service.price)}
        </span>
        <BookButton onClick={onBook} label={bookLabel} title={service.title} />
      </div>
    </div>
  );
}

function BookButton({ onClick, label, title }: { onClick: () => void; label: string; title: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${title} uchun qabulga yozilish`}
      className="group inline-flex items-center gap-1.5 h-9 px-4 rounded-lg bg-ink text-white text-[13px] font-semibold hover:bg-accent transition-colors cursor-pointer shrink-0"
    >
      {label}
      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
    </button>
  );
}
