"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  m,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";

/**
 * EKG (kardiogramma) chizig'i — section'lar orasidagi ajratgich.
 *
 * Chiziq scroll bilan BOG'LANGAN: foydalanuvchi pastga tushganda chizmoq
 * chapdan o'ngga chiziladi, yuqoriga qaytganda orqaga "o'chadi".
 * R-cho'qqisiga yetganda qizil "blip" yonadi — yurak urishi metaforasi.
 *
 * Nega shunday: klinika brendi uchun mavhum dekorativ chiziqdan ko'ra
 * mazmunli va hech bir shablonda uchramaydigan detal.
 */

// viewBox 0 0 1200 100, baseline y=50 — P to'lqin, QRS kompleksi, T to'lqin
const EKG_PATH =
  "M0,50 H500 q15,-10 30,0 H560 l8,8 l10,-42 l10,36 l6,-2 H640 q25,-16 50,0 H1200";

/** R-cho'qqisi koordinatasi (blip shu yerda yonadi) */
const R_PEAK = { x: 578, y: 16 };

interface EkgDividerProps {
  className?: string;
  /** Fon rangi section'larga mos kelishi uchun */
  variant?: "light" | "dark";
}

export function EkgDivider({ className = "", variant = "light" }: EkgDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const [pathLen, setPathLen] = useState(0);
  const [beat, setBeat] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "center 55%"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (pathRef.current) setPathLen(pathRef.current.getTotalLength());
  }, []);

  // Chiziq uchidagi nuqta path bo'ylab yuradi — getPointAtLength orqali
  const dotX = useTransform(progress, (v) =>
    pathRef.current && pathLen ? pathRef.current.getPointAtLength(v * pathLen).x : 0
  );
  const dotY = useTransform(progress, (v) =>
    pathRef.current && pathLen ? pathRef.current.getPointAtLength(v * pathLen).y : 50
  );
  const dotOpacity = useTransform(progress, [0, 0.04, 0.96, 1], [0, 1, 1, 0]);

  // R-cho'qqisidan o'tganda bir marta "urish"
  useMotionValueEvent(progress, "change", (v) => {
    if (v > 0.5 && !beat) setBeat(true);
    if (v < 0.35 && beat) setBeat(false);
  });

  const lineColor = variant === "dark" ? "#f87171" : "#dc2626";
  const trackColor = variant === "dark" ? "rgba(255,255,255,0.10)" : "rgba(15,23,42,0.08)";

  return (
    <div
      ref={ref}
      aria-hidden
      className={`relative w-full overflow-hidden select-none pointer-events-none ${className}`}
    >
      <svg
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        className="w-full h-14 sm:h-20"
        fill="none"
      >
        {/* Xira asosiy yo'l — chiziq qayerga borishini ko'rsatadi */}
        <path
          d={EKG_PATH}
          stroke={trackColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* Scroll bilan chiziladigan asosiy qizil chiziq */}
        <m.path
          ref={pathRef}
          d={EKG_PATH}
          stroke={lineColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: shouldReduceMotion ? 1 : progress }}
        />

        {/* Chiziq uchidagi yorqin nuqta */}
        {!shouldReduceMotion && pathLen > 0 && (
          <m.circle
            r="4"
            fill={lineColor}
            style={{ cx: dotX, cy: dotY, opacity: dotOpacity }}
            className="drop-shadow-[0_0_6px_rgba(220,38,38,0.9)]"
          />
        )}

        {/* R-cho'qqisidagi pulsatsiya */}
        {beat && !shouldReduceMotion && (
          <m.circle
            cx={R_PEAK.x}
            cy={R_PEAK.y}
            r="4"
            fill="none"
            stroke={lineColor}
            strokeWidth="1.5"
            initial={{ scale: 0.5, opacity: 0.9 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", repeat: 2 }}
            style={{ transformOrigin: `${R_PEAK.x}px ${R_PEAK.y}px` }}
          />
        )}
      </svg>
    </div>
  );
}
