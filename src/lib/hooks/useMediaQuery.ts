"use client";

import { useSyncExternalStore } from "react";

/**
 * Hydration-xavfsiz media query hook.
 *
 * `useEffect` ichida `setState(matchMedia(...).matches)` qilish o'rniga
 * `useSyncExternalStore` — React Compiler qoidasiga mos, qo'shimcha render yo'q,
 * serverda `false` qaytaradi (SSR/CSR mos keladi).
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

/** Haqiqiy hover + aniq kursor (sichqoncha) bor qurilmalar. Touch'da `false`. */
export function useCanHover(): boolean {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}
