"use client";

import React, { useEffect } from "react";
import { m, useReducedMotion } from "framer-motion";
import { DUR, EASE } from "@/lib/animations";

/**
 * Sahifalararo o'tish.
 *
 * `template.tsx` har navigatsiyada QAYTA MOUNT bo'ladi — shuning uchun kirish
 * animatsiyasi shu yerda. Parda yo'q: yangi kontent 12px pastdan yengil
 * ko'tarilib paydo bo'ladi (350ms), yuqorida esa NavProgress EKG chizig'i
 * "sahifa keldi" deb bir marta uradi. Navbar layout'da, u qimirlamaydi.
 */
export default function LocaleTemplate({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Yangi sahifa har doim tepadan boshlansin
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  if (shouldReduceMotion) return <>{children}</>;

  return (
    <m.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DUR.base * 0.8, ease: EASE }}
    >
      {children}
    </m.div>
  );
}
