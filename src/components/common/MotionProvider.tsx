"use client";

import React from "react";
import { LazyMotion, MotionConfig } from "framer-motion";

/**
 * Butun public sayt uchun yagona motion konteksti.
 *
 * 1. `LazyMotion` — framer-motion'ning og'ir qismi (~30kb) asosiy bundle'ga
 *    tushmaydi, hydration'dan so'ng alohida chunk bo'lib keladi.
 *    Shuning uchun komponentlarda `motion.div` emas, `m.div` ishlatiladi
 *    (biz uni `import { m as motion }` ko'rinishida import qilamiz).
 *
 * 2. `MotionConfig reducedMotion="user"` — OS darajasida "harakatni kamaytirish"
 *    yoqilgan bo'lsa, framer transform/opacity animatsiyalarini avtomatik
 *    o'chiradi. Tibbiyot sayti uchun majburiy a11y talabi.
 */
const loadFeatures = () => import("@/lib/motion-features").then((mod) => mod.default);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures}>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.45 }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
