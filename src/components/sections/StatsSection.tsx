"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  m,
  animate,
  useInView,
  useMotionValue,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { STATS_DATA } from "@/data/stats";
import { Container } from "../common/Container";
import { RevealGroup, RevealItem } from "../common/Reveal";
import { EASE } from "@/lib/animations";

function CounterItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const shouldReduceMotion = useReducedMotion();
  const [done, setDone] = useState(false);

  // Ilgari setInterval(20ms) + setState edi — har 20ms'da re-render, jank.
  // Endi: bitta MotionValue, rAF'da yangilanadi, DOM'ga to'g'ridan-to'g'ri yoziladi.
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString("uz-UZ"));

  useEffect(() => {
    if (!isInView) return;
    if (shouldReduceMotion) {
      // Animatsiyasiz — darhol yakuniy qiymat (pulsatsiya halqasi baribir ko'rsatilmaydi)
      count.set(value);
      return;
    }
    const controls = animate(count, value, {
      duration: 1.4,
      ease: EASE,
      onComplete: () => setDone(true),
    });
    return () => controls.stop();
  }, [isInView, value, count, shouldReduceMotion]);

  return (
    <div ref={ref} className="text-left py-2 sm:py-0 relative">
      <div className="relative inline-flex items-baseline">
        <div className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] tracking-tight tabular-nums">
          <m.span>{rounded}</m.span>
          <span className="text-[#dc2626] ml-0.5">{suffix}</span>
        </div>

        {/* Sanoq tugagach bir marta pulsatsiya */}
        <AnimatePresence>
          {done && !shouldReduceMotion && (
            <>
              <m.span
                key="ring1"
                initial={{ scale: 0.6, opacity: 0.7 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="absolute inset-0 rounded-full border-2 border-[#dc2626]/50 pointer-events-none"
              />
              <m.span
                key="ring2"
                initial={{ scale: 0.6, opacity: 0.4 }}
                animate={{ scale: 3.2, opacity: 0 }}
                transition={{ duration: 1.1, ease: "easeOut", delay: 0.15 }}
                className="absolute inset-0 rounded-full border border-[#dc2626]/25 pointer-events-none"
              />
            </>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-1.5 sm:mt-2 text-xs sm:text-base font-bold text-[#0f172a]">{label}</div>
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="py-14 sm:py-20 bg-[#f8fafc] border-b border-slate-200/80">
      <Container>
        <RevealGroup
          stagger={0.12}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:divide-x divide-slate-200"
        >
          {STATS_DATA.map((stat, idx) => (
            <RevealItem key={stat.id} className={idx > 0 ? "lg:pl-8" : ""}>
              <CounterItem value={stat.value} suffix={stat.suffix} label={stat.label} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
