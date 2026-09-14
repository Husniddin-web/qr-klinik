"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/animations";

/** EkgDivider bilan bir xil P–QRS–T shakli, butun ekran kengligiga cho'ziladi */
const EKG_PATH =
  "M0,6 H420 q10,-4 20,0 H470 l6,4 l6,-9 l6,8 l4,-2 H520 q14,-6 28,0 H1200";

type Phase = "idle" | "loading" | "done";

/**
 * Sahifa o'tish indikatori — yuqoridagi EKG chizig'i.
 *
 * Ichki havola bosilganda chiziq chapdan chizila boshlaydi (~85% gacha sekin),
 * yangi sahifa kelganda (pathname o'zgarganda) oxirigacha chiziladi,
 * R-cho'qqisida bir marta "uradi" va so'nadi. Parda yo'q, sahna yo'q — faqat imzo.
 */
export function NavProgress() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [run, setRun] = useState(0);
  const startedFor = useRef<string | null>(null);

  // Ichki havola bosilishini ushlaymiz (Next Link ham oddiy <a> render qiladi)
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      const samePage = url.pathname === location.pathname && url.search === location.search;
      if (samePage) return; // faqat hash (#services) yoki o'sha sahifa — indikator kerak emas
      startedFor.current = location.pathname;
      setRun((r) => r + 1);
      setPhase("loading");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Sahifa keldi — tugatamiz
  useEffect(() => {
    if (startedFor.current !== null && startedFor.current !== pathname) {
      startedFor.current = null;
      setPhase("done");
      const t = setTimeout(() => setPhase("idle"), 900);
      return () => clearTimeout(t);
    }
  }, [pathname]);

  if (shouldReduceMotion) return null;

  return (
    <div aria-hidden className="fixed top-0 inset-x-0 z-[9999] h-3 pointer-events-none">
      <AnimatePresence>
        {phase !== "idle" && (
          <m.svg
            key={run}
            viewBox="0 0 1200 12"
            preserveAspectRatio="none"
            className="w-full h-full"
            fill="none"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.35 } }}
          >
            <m.path
              d={EKG_PATH}
              stroke="#dc2626"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: phase === "done" ? 1 : 0.85 }}
              transition={
                phase === "done"
                  ? { duration: 0.25, ease: EASE }
                  : { duration: 6, ease: [0.1, 0.8, 0.2, 1] }
              }
            />
            {/* R-cho'qqisidagi urish — faqat sahifa kelganda */}
            {phase === "done" && (
              <m.circle
                cx="482"
                cy="1"
                r="3"
                fill="none"
                stroke="#dc2626"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
                initial={{ scale: 0.5, opacity: 0.9 }}
                animate={{ scale: 4, opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                style={{ transformOrigin: "482px 1px" }}
              />
            )}
          </m.svg>
        )}
      </AnimatePresence>
    </div>
  );
}
