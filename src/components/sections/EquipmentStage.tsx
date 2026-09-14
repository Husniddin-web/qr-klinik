"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  m,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ScanLine } from "lucide-react";
import { useCanHover } from "@/lib/hooks/useMediaQuery";
import { EASE, DUR } from "@/lib/animations";

interface EquipmentStageProps {
  /** Shaffof fonli studiya renderi (PNG) */
  image: string;
  alt: string;
  /** Rasm almashganda crossfade uchun */
  itemKey: string;
}

/**
 * Uskuna "sahnasi": shaffof PNG render + sichqoncha bilan yengil parallax.
 * Uch qatlam turli tezlikda siljiydi (orqa doira ← , uskuna → , soya ↓),
 * shundan "3D" hissi paydo bo'ladi — WebGL'siz.
 */
export function EquipmentStage({ image, alt, itemKey }: EquipmentStageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const canHover = useCanHover();
  const shouldReduceMotion = useReducedMotion();
  const [imgFailed, setImgFailed] = useState<Record<string, boolean>>({});

  // Sichqoncha pozitsiyasi: -1 … 1
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 120, damping: 20, mass: 0.4 });

  const deviceX = useTransform(sx, [-1, 1], [-14, 14]);
  const deviceY = useTransform(sy, [-1, 1], [-8, 8]);
  const deviceRotate = useTransform(sx, [-1, 1], [-2, 2]);
  const backX = useTransform(sx, [-1, 1], [10, -10]);
  const backY = useTransform(sy, [-1, 1], [6, -6]);
  const shadowX = useTransform(sx, [-1, 1], [-22, 22]);
  const shadowScale = useTransform(sy, [-1, 1], [0.96, 1.04]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canHover || shouldReduceMotion) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const failed = imgFailed[itemKey];

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative w-full aspect-[5/4] rounded-xl bg-white border border-line overflow-hidden select-none"
    >
      {/* Orqa qatlam: yaxlit navy doira — uskunaga "sahna" beradi */}
      <m.div
        aria-hidden
        style={shouldReduceMotion ? undefined : { x: backX, y: backY }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[62%] aspect-square rounded-full bg-ink"
      />

      <>
        {/* Soya: uskuna ostidagi ellips, sichqoncha bilan qarama-qarshi siljiydi */}
        <m.div
          aria-hidden
          style={
            shouldReduceMotion ? undefined : { x: shadowX, scaleX: shadowScale }
          }
          className="absolute left-1/2 bottom-[13%] -translate-x-1/2 w-[48%] h-[6%] rounded-full bg-ink/25 blur-xl"
        />

        {/* Uskuna renderi. Tashqi qatlam — parallax (MotionValue), ichki — almashganda crossfade.
              Ikkalasi bitta elementda bo'lsa `y` to'qnashadi va animatsiya qotib qoladi. */}
        <m.div
          style={
            shouldReduceMotion
              ? undefined
              : { x: deviceX, y: deviceY, rotate: deviceRotate }
          }
          className="absolute inset-[9%] will-change-transform"
        >
          <m.div
            key={itemKey}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.base, ease: EASE }}
            className="absolute inset-0"
          >
            {failed ? (
              <div className="w-full h-full flex items-center justify-center text-white/70">
                <ScanLine className="w-24 h-24" strokeWidth={1} />
              </div>
            ) : (
              <Image
                src={image}
                alt={alt}
                fill
                sizes="(max-width: 1024px) 90vw, 640px"
                className="object-contain drop-shadow-[0_30px_50px_rgba(15,23,42,0.35)]"
                onError={() => setImgFailed((p) => ({ ...p, [itemKey]: true }))}
              />
            )}
          </m.div>
        </m.div>
      </>
    </div>
  );
}
