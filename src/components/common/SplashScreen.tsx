"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { EASE, EASE_IN_OUT } from "@/lib/animations";

const SESSION_KEY = "qr_splash_shown";
/** Umumiy davomiylik (chiqish animatsiyasidan tashqari). LCP uchun 1.5s dan oshmasin. */
const SPLASH_MS = 1350;

/** EkgDivider bilan bir xil kardiogramma — brend tili bir xil bo'lsin */
const EKG_PATH =
  "M0,50 H440 q15,-10 30,0 H500 l8,8 l10,-42 l10,36 l6,-2 H580 q25,-16 50,0 H1200";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Brendlangan splash: EKG chizig'i chapdan o'ngga chiziladi → markazdan o'tganda
 * logotip "yurak urishi"dek chiqadi → butun ekran yuqoriga parda kabi ochiladi.
 * Sessiyada faqat bir marta. Harakat kamaytirilgan bo'lsa ko'rsatilmaydi.
 */
export function SplashScreen() {
  const shouldReduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useIsomorphicLayoutEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") {
        setVisible(false);
        return;
      }
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* private mode — har safar ko'rinadi, zarar yo'q */
    }
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => setVisible(false), SPLASH_MS);
    return () => clearTimeout(timer);
  }, [visible]);

  if (shouldReduceMotion) return null;

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          key="splash"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: EASE_IN_OUT }}
          aria-hidden
          className="fixed inset-0 z-[9999] bg-white pointer-events-none select-none overflow-hidden"
        >
          {/* Pastki qizil chiziq — parda ko'tarilganda brend rangi "iz" qoldiradi */}
          <div className="absolute inset-x-0 bottom-0 h-1 bg-[#dc2626]" />

          {/* EKG chizig'i — butun ekran kengligida, markazda */}
          <svg
            viewBox="0 0 1200 100"
            preserveAspectRatio="none"
            className="absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full h-24 sm:h-28"
            fill="none"
          >
            <m.path
              d={EKG_PATH}
              stroke="#dc2626"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 1 }}
              animate={{ pathLength: 1, opacity: [1, 1, 0.25] }}
              transition={{
                pathLength: { duration: 0.95, ease: EASE },
                opacity: { duration: 1.3, times: [0, 0.75, 1] },
              }}
            />
          </svg>

          {/* Logotip — EKG R-cho'qqisi (≈0.45s) paytida "urib" chiqadi */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <m.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: [0.7, 1.08, 1] }}
              transition={{
                delay: 0.42,
                duration: 0.55,
                ease: EASE,
                scale: { delay: 0.42, duration: 0.55, times: [0, 0.6, 1], ease: EASE },
              }}
              className="relative"
            >
              {/* Logotip orqasida oq halqa — EKG chizig'i ustidan o'tmasligi uchun */}
              <span className="absolute -inset-5 rounded-full bg-white" />
              {/* Yurak urishi halqasi */}
              <m.span
                initial={{ scale: 0.8, opacity: 0.6 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.9, ease: "easeOut" }}
                className="absolute -inset-3 rounded-full border-2 border-[#dc2626]/40"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/main-logo.jpg"
                alt="QAXRAMON-RAXIMJON"
                width={160}
                height={64}
                className="relative h-14 sm:h-16 w-auto object-contain rounded-lg"
              />
            </m.div>

            <m.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.45, ease: EASE }}
              className="relative text-[11px] sm:text-xs uppercase tracking-[0.35em] text-slate-500 font-semibold bg-white px-3"
            >
              Zamonaviy tibbiyot klinikasi
            </m.p>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
