"use client";

import React, { useEffect, useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import { DUR, EASE, EASE_IN_OUT } from "@/lib/animations";

/**
 * Sahifalararo o'tish animatsiyasi.
 *
 * Next.js App Router'da `template.tsx` har bir navigatsiyada QAYTA MOUNT bo'ladi
 * (`layout.tsx` esa bo'lmaydi) — shuning uchun kirish animatsiyasi shu yerda.
 *
 * Effekt: brand rangidagi (#dc2626) parda chapdan yopib, o'ngga ochiladi;
 * ayni paytda yangi sahifa kontenti pastdan mayin ko'tariladi.
 *
 * Parda FAQAT client-side navigatsiyada ishlaydi — birinchi yuklanishda
 * SplashScreen bilan ustma-ust tushmasligi uchun (modul scope'dagi bayroq
 * remount'lardan omon qoladi).
 */
let hasNavigatedOnce = false;

export default function LocaleTemplate({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();
  const [showCurtain] = useState(() => hasNavigatedOnce);

  useEffect(() => {
    hasNavigatedOnce = true;
    // Yangi sahifa har doim tepadan boshlansin
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <>
      {showCurtain && (
        <>
          {/* Asosiy qizil parda: chapdan yopiq → o'ngga ochiladi */}
          <m.div
            aria-hidden
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: DUR.curtain, ease: EASE_IN_OUT }}
            style={{ originX: 1 }}
            className="fixed inset-0 z-[9998] bg-[#dc2626] pointer-events-none"
          />
          {/* Orqasidan ergashuvchi to'q ko'k qatlam — chuqurlik hissi beradi */}
          <m.div
            aria-hidden
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: DUR.curtain, ease: EASE_IN_OUT, delay: 0.08 }}
            style={{ originX: 1 }}
            className="fixed inset-0 z-[9997] bg-[#0f172a] pointer-events-none"
          />
        </>
      )}

      <m.div
        initial={{ opacity: 0, y: showCurtain ? 16 : 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: DUR.base,
          ease: EASE,
          delay: showCurtain ? 0.35 : 0,
        }}
      >
        {children}
      </m.div>
    </>
  );
}
