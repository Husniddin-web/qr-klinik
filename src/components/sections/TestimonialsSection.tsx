"use client";

import React, { useRef, useState } from "react";
import { Star, Hand } from "lucide-react";
import {
  m,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
  wrap,
} from "framer-motion";
import { TESTIMONIALS_DATA } from "@/data/testimonials";
import { ITestimonial } from "@/types";
import { Reveal } from "../common/Reveal";
import { AnimatedDivider } from "../common/AnimatedDivider";

/**
 * Vertikal cheksiz marquee — endi CSS keyframe emas, framer MotionValue.
 *
 * Nega: CSS animatsiya + drag bir vaqtda `transform`ga yozolmaydi.
 * Endi bitta `y` MotionValue bor: rAF uni doim siljitadi, drag esa
 * o'sha qiymatni foydalanuvchi qo'li bilan o'zgartiradi. Drag tugagach
 * marquee shu joydan davom etadi — hech qanday "sakrash" yo'q.
 */
function MarqueeColumn({
  items,
  direction = 1,
  speed = 28,
  className = "",
}: {
  items: ITestimonial[];
  direction?: 1 | -1;
  speed?: number; // px / s
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const y = useMotionValue(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useAnimationFrame((_, delta) => {
    if (shouldReduceMotion || isDragging || isHovered) return;
    const half = (contentRef.current?.scrollHeight ?? 0) / 2;
    if (!half) return;
    const next = y.get() - direction * speed * (delta / 1000);
    // Yarim balandlikdan o'tgach boshiga qaytadi — 2 nusxa borligi uchun sezilmaydi
    y.set(wrap(-half, 0, next));
  });

  return (
    <m.div
      ref={contentRef}
      drag={shouldReduceMotion ? false : "y"}
      dragMomentum={false}
      dragElastic={0.05}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => {
        setIsDragging(false);
        // Drag chegaradan chiqqan bo'lsa, wrap qilib qo'yamiz
        const half = (contentRef.current?.scrollHeight ?? 0) / 2;
        if (half) y.set(wrap(-half, 0, y.get()));
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ y }}
      className={`flex flex-col gap-6 ${isDragging ? "cursor-grabbing" : "cursor-grab"} ${className}`}
    >
      {[...items, ...items].map((review, idx) => (
        <ReviewCard key={`${review.id}-${idx}`} review={review} />
      ))}
    </m.div>
  );
}

export function TestimonialsSection() {
  const col1 = [TESTIMONIALS_DATA[0], TESTIMONIALS_DATA[3], TESTIMONIALS_DATA[6]];
  const col2 = [TESTIMONIALS_DATA[1], TESTIMONIALS_DATA[4], TESTIMONIALS_DATA[7]];
  const col3 = [TESTIMONIALS_DATA[2], TESTIMONIALS_DATA[5], TESTIMONIALS_DATA[8]];

  return (
    <section
      id="testimonials"
      className="py-20 lg:py-28 bg-white relative overflow-hidden border-b border-slate-200/80"
    >
      <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14 px-4 relative z-10">
        <Reveal as="h2" delay={0.1} className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0f172a] tracking-tight uppercase">
          Bemorlar Sharhlari
        </Reveal>
        <AnimatedDivider />
        <Reveal delay={0.3} className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          <Hand className="w-3.5 h-3.5" />
          Sudrab ko&apos;ring
        </Reveal>
      </div>

      <Reveal delay={0.2} className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden h-[620px] sm:h-[680px] [mask-image:linear-gradient(to_bottom,transparent_0%,black_16%,black_84%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_16%,black_84%,transparent_100%)]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white via-white/80 to-transparent z-20" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/80 to-transparent z-20" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full items-start">
            <MarqueeColumn items={col1} direction={1} speed={26} />
            <MarqueeColumn items={col2} direction={-1} speed={22} className="hidden md:flex" />
            <MarqueeColumn items={col3} direction={1} speed={30} className="hidden lg:flex" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function ReviewCard({ review }: { review: ITestimonial }) {
  return (
    <div className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 hover:shadow-lg transition-all duration-300 shadow-xs group text-left select-none">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-1">
          {[...Array(review.rating)].map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4 fill-amber-400 text-amber-400 transition-transform duration-300 group-hover:scale-110"
              style={{ transitionDelay: `${i * 40}ms` }}
            />
          ))}
        </div>
        <span className="text-[11px] font-mono text-slate-400">{review.date}</span>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic mb-5 font-normal">
        &ldquo;{review.comment}&rdquo;
      </p>

      <div className="pt-4 border-t border-slate-100">
        <h4 className="text-xs sm:text-sm font-bold text-[#0f172a] tracking-tight">{review.patientName}</h4>
      </div>
    </div>
  );
}
