"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Globe,
  Menu,
  X,
  ChevronDown,
  Check,
  Calendar,
  ChevronRight,
  Home,
  Stethoscope,
  Users,
  Newspaper,
  MapPin,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import {
  m,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { Link, useRouter, usePathname } from "@/i18n/routing";
import { MagneticButton } from "./MagneticButton";
import { EASE, DUR, SPRING, STAGGER } from "@/lib/animations";

interface NavbarProps {
  onOpenAppointment: () => void;
}

const LANGUAGES = [
  { code: "uz", label: "UZ", fullName: "O'zbekcha" },
  { code: "kr", label: "УЗ", fullName: "Ўзбекча" },
];

export function Navbar({ onOpenAppointment }: NavbarProps) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  /* ------------------------------------------------------------------
     Scroll yo'nalishiga qarab avtomatik yashirinish.
     Pastga → header chekinadi (kontentga to'liq joy).
     Yuqoriga → darhol qaytadi (navigatsiya doim "qo'l ostida").
     ------------------------------------------------------------------ */
  const { scrollY } = useScroll();
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    setIsScrolled(y > 30);

    const delta = y - lastY.current;
    // 6px dan kichik siljishlarni e'tiborsiz qoldiramiz — "titrash" bo'lmasligi uchun
    if (Math.abs(delta) < 6) return;

    if (isMobileMenuOpen || isLangOpen || y < 120) {
      setIsHidden(false);
    } else {
      setIsHidden(delta > 0);
    }
    lastY.current = y;
  });

  // Mobil drawer ochiqligida body scroll qulfi
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Til menyusini tashqariga bosilganda yopish
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Escape — drawer/menyuni yopadi
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setIsMobileMenuOpen(false);
      setIsLangOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const currentLang = LANGUAGES.find((l) => l.code === locale) || LANGUAGES[0];

  const handleLanguageChange = (nextLocale: "uz" | "kr") => {
    setIsLangOpen(false);
    setIsMobileMenuOpen(false);
    router.replace(pathname, { locale: nextLocale });
  };

  const navItems = [
    { name: t("home"), href: "/", icon: Home },
    { name: t("services"), href: "/services", icon: Stethoscope },
    { name: t("doctors"), href: "/doctors", icon: Users },
    { name: t("news"), href: "/news", icon: Newspaper },
    { name: t("contact"), href: "/contact", icon: MapPin },
  ];

  const isDarkHero = pathname !== "/";

  return (
    <m.header
      initial={false}
      animate={{ y: isHidden && !shouldReduceMotion ? "-130%" : "0%" }}
      transition={SPRING.heavy}
      className="fixed top-0 left-0 right-0 w-full z-50 pointer-events-none flex justify-center will-change-transform"
    >
      <div
        className={`pointer-events-auto flex items-center justify-between transition-all duration-300 ease-out ${
          isScrolled
            ? "w-[95%] sm:w-[94%] max-w-6xl mt-2 sm:mt-3 px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-white/95 backdrop-blur-xl border border-slate-200/50 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)]"
            : "w-full max-w-7xl mt-0 px-3.5 sm:px-10 py-3 sm:py-5 bg-transparent backdrop-blur-none border-b border-transparent"
        }`}
      >
        {/* Brend logotipi */}
        <Link
          href="/"
          className="flex items-center shrink-0 hover:opacity-95 transition-opacity z-10"
          title="QAXRAMON-RAXIMJON"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/main-logo.jpg"
            alt="QAXRAMON-RAXIMJON"
            className="h-8 sm:h-9 md:h-10 w-auto object-contain rounded-md shrink-0 shadow-xs"
          />
        </Link>

        {/* Desktop navigatsiya — faol havola indikatori `layoutId` bilan suzadi */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-5">
          {navItems.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            const textColorClass = isScrolled
              ? isActive
                ? "font-bold text-slate-900"
                : "font-medium text-slate-600 hover:text-slate-900"
              : isDarkHero
                ? isActive
                  ? "font-bold text-white drop-shadow-sm"
                  : "font-medium text-white/85 hover:text-white"
                : isActive
                  ? "font-bold text-slate-900"
                  : "font-medium text-slate-600 hover:text-slate-900";

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-2 py-1 text-[15px] transition-colors tracking-wide ${textColorClass}`}
              >
                <span>{item.name}</span>
                {isActive && (
                  /* Bitta `layoutId` — indikator bir havoladan ikkinchisiga
                     yo'q bo'lib qayta paydo bo'lmaydi, balki SUZIB o'tadi. */
                  <m.span
                    layoutId="nav-indicator"
                    transition={SPRING.soft}
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-[#dc2626] rounded-full shadow-[0_1px_3px_rgba(220,38,38,0.3)]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* O'ng blok */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Til almashtirgich */}
          <div className="relative" ref={langRef}>
            <button
              type="button"
              onClick={() => setIsLangOpen(!isLangOpen)}
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                isScrolled
                  ? "bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200/50"
                  : isDarkHero
                    ? "bg-white/15 hover:bg-white/25 text-white border border-white/20 backdrop-blur-md"
                    : "bg-white/90 hover:bg-white text-slate-800 border border-slate-200/50 shadow-xs"
              }`}
              aria-expanded={isLangOpen}
              aria-haspopup="menu"
            >
              <Globe
                className={`w-3.5 h-3.5 ${!isScrolled && isDarkHero ? "text-white/80" : "text-slate-500"}`}
              />
              <span className="tracking-wide font-bold">{currentLang.label}</span>
              <m.span
                animate={{ rotate: isLangOpen ? 180 : 0 }}
                transition={{ duration: DUR.fast, ease: EASE }}
                className="inline-flex"
              >
                <ChevronDown
                  className={`w-3 h-3 ${!isScrolled && isDarkHero ? "text-white/80" : "text-slate-500"}`}
                />
              </m.span>
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <m.div
                  role="menu"
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: DUR.fast, ease: EASE }}
                  style={{ transformOrigin: "top right" }}
                  className="absolute right-0 mt-2 w-40 rounded-2xl bg-white/98 backdrop-blur-2xl border border-slate-200/60 shadow-lg p-1.5 z-50 text-slate-800"
                >
                  {LANGUAGES.map((lang) => {
                    const isSelected = currentLang.code === lang.code;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        role="menuitem"
                        onClick={() => handleLanguageChange(lang.code as "uz" | "kr")}
                        className={`w-full px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-[#dc2626] text-white"
                            : "text-slate-700 hover:bg-slate-100 hover:text-[#0f172a]"
                        }`}
                      >
                        <span className="tracking-wider">
                          {lang.fullName} ({lang.label})
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[2.5]" />}
                      </button>
                    );
                  })}
                </m.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop CTA */}
          <div className="hidden sm:block">
            <MagneticButton
              onClick={onOpenAppointment}
              strength={10}
              glow
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-[#dc2626] hover:bg-[#b91c1c] transition-colors duration-200 shadow-md shadow-red-500/20 active:scale-95 cursor-pointer shrink-0"
            >
              <Calendar className="w-4 h-4 shrink-0" />
              <span>{t("appointment")}</span>
            </MagneticButton>
          </div>

          {/* Mobil tezkor qabul tugmasi */}
          <button
            type="button"
            onClick={onOpenAppointment}
            aria-label={t("appointment")}
            className="sm:hidden w-8 h-8 rounded-full bg-[#dc2626] hover:bg-[#b91c1c] text-white flex items-center justify-center shadow-md shadow-red-500/25 active:scale-90 transition-all cursor-pointer shrink-0"
          >
            <Calendar className="w-4 h-4" />
          </button>

          {/* Menyu tugmasi — ikonka almashuvi ham animatsiyali */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full transition-colors active:scale-95 cursor-pointer shrink-0 overflow-hidden ${
              isScrolled
                ? "bg-slate-100 hover:bg-slate-200 border border-slate-200/50 text-slate-800"
                : isDarkHero
                  ? "bg-white/15 hover:bg-white/25 border border-white/20 text-white"
                  : "bg-slate-100 hover:bg-slate-200 border border-slate-200/50 text-slate-800"
            }`}
            aria-label={t("menu")}
            aria-expanded={isMobileMenuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              <m.span
                key={isMobileMenuOpen ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: DUR.instant, ease: EASE }}
                className="inline-flex"
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </m.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* ---------------- Mobil drawer ---------------- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <m.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: DUR.fast }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 pointer-events-auto"
            />

            <m.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={SPRING.heavy}
              className="md:hidden fixed inset-y-0 right-0 w-[86%] max-w-[340px] bg-[#0c1326] text-white shadow-2xl z-50 flex flex-col justify-between p-5 sm:p-6 border-l border-white/10 pointer-events-auto"
            >
              {/* Drawer sarlavhasi */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/main-logo.jpg"
                    alt="Logo"
                    className="h-8 w-auto rounded-md object-contain bg-white p-0.5"
                  />
                  <div>
                    <div className="text-xs font-black tracking-wider uppercase text-white leading-none">
                      Qaxramon-Raximjon
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium mt-0.5">
                      Ko&apos;p tarmoqli klinika
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors active:scale-90 cursor-pointer"
                  aria-label="Yopish"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Havolalar — ketma-ket (stagger) kirib keladi */}
              <m.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: STAGGER.tight, delayChildren: 0.12 } },
                }}
                className="flex-1 py-5 overflow-y-auto space-y-1.5 scrollbar-none"
              >
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                  return (
                    <m.div
                      key={item.name}
                      variants={{
                        hidden: { opacity: 0, x: 24 },
                        visible: { opacity: 1, x: 0, transition: { duration: DUR.base, ease: EASE } },
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-semibold transition-colors group ${
                          isActive
                            ? "bg-red-600/15 text-white border border-red-500/30"
                            : "text-slate-200 hover:text-white hover:bg-white/[0.08] active:bg-white/[0.12]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                              isActive
                                ? "bg-red-500 text-white shadow-sm"
                                : "bg-white/[0.06] text-slate-300 group-hover:text-red-400 group-hover:bg-red-500/10"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </span>
                          <span>{item.name}</span>
                        </div>
                        <ChevronRight
                          className={`w-4 h-4 transition-transform ${
                            isActive
                              ? "text-red-400 translate-x-0.5"
                              : "text-slate-500 group-hover:translate-x-0.5"
                          }`}
                        />
                      </Link>
                    </m.div>
                  );
                })}
              </m.div>

              {/* Drawer pastki blok */}
              <div className="pt-4 border-t border-white/10 space-y-3 shrink-0">
                <div className="flex items-center bg-white/[0.06] p-1 rounded-xl border border-white/10 relative">
                  {LANGUAGES.map((lang) => {
                    const isSelected = currentLang.code === lang.code;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => handleLanguageChange(lang.code as "uz" | "kr")}
                        className={`relative flex-1 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          isSelected ? "text-white" : "text-slate-400 hover:text-white"
                        }`}
                      >
                        {isSelected && (
                          <m.span
                            layoutId="lang-pill"
                            transition={SPRING.soft}
                            className="absolute inset-0 rounded-lg bg-[#dc2626] shadow-sm"
                          />
                        )}
                        <span className="relative z-10">
                          {lang.fullName} ({lang.label})
                        </span>
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAppointment();
                  }}
                  className="w-full py-3.5 rounded-2xl bg-[#dc2626] hover:bg-[#b91c1c] active:scale-[0.98] text-white font-bold text-sm shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t("appointment")}</span>
                </button>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </m.header>
  );
}
