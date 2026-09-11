"use client";

import React from "react";
import { m, useReducedMotion } from "framer-motion";
import {
  REVEAL_VARIANTS,
  RevealVariant,
  VIEWPORT,
  EASE,
  DUR,
  STAGGER,
} from "@/lib/animations";

type RevealTag = "div" | "span" | "section" | "article" | "li" | "p" | "h2" | "h3";

export interface RevealProps {
  children: React.ReactNode;
  /** Kirish yo'nalishi. Default: "up" */
  variant?: RevealVariant;
  /** Kechikish (soniya). AOS'dagi `data-aos-delay="200"` → `delay={0.2}` */
  delay?: number;
  /** Davomiylik (soniya). Berilmasa variant o'zinikini ishlatadi. */
  duration?: number;
  /** Element necha foiz ko'ringanda ishga tushsin. Default: 0.15 */
  amount?: number;
  /** Faqat bir marta o'ynasinmi. Default: true */
  once?: boolean;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  as?: RevealTag;
}

/**
 * AOS o'rniga ishlatiladigan yagona scroll-reveal komponenti.
 *
 * Nega AOS emas:
 *  - AOS va Framer Motion turli easing/duration bilan ishlagani uchun sayt
 *    "yig'ma" ko'rinardi; endi hamma narsa bitta token to'plamidan oziqlanadi.
 *  - AOS DOM'ga class yozadi va `refresh()` talab qiladi (App Router'da
 *    client navigation'dan keyin sinadi); bu esa IntersectionObserver asosida.
 *  - `prefers-reduced-motion` avtomatik hurmat qilinadi.
 */
export function Reveal({
  children,
  variant = "up",
  delay = 0,
  duration,
  amount = VIEWPORT.amount,
  once = true,
  className,
  style,
  id,
  as = "div",
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = m[as] as typeof m.div;

  // Harakat kamaytirilgan bo'lsa — animatsiyasiz, lekin kontent albatta ko'rinadi.
  if (shouldReduceMotion) {
    const Tag = as as React.ElementType;
    return (
      <Tag className={className} style={style} id={id}>
        {children}
      </Tag>
    );
  }

  const variants = REVEAL_VARIANTS[variant];

  return (
    <MotionTag
      id={id}
      className={className}
      style={style}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={{
        duration: duration ?? DUR.base,
        delay,
        ease: EASE,
      }}
    >
      {children}
    </MotionTag>
  );
}

export interface RevealGroupProps {
  children: React.ReactNode;
  className?: string;
  /** Bolalar orasidagi qadam (soniya). Default: 0.1 */
  stagger?: number;
  delay?: number;
  amount?: number;
  once?: boolean;
  as?: RevealTag;
}

/**
 * Bolalarini ketma-ket (stagger) ochadigan konteyner.
 * Ichida `<RevealItem>` yoki variant="hidden"/"visible" biladigan `m.*` bo'lishi kerak.
 */
export function RevealGroup({
  children,
  className,
  stagger = STAGGER.base,
  delay = 0.05,
  amount = VIEWPORT.amount,
  once = true,
  as = "div",
}: RevealGroupProps) {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = m[as] as typeof m.div;

  if (shouldReduceMotion) {
    const Tag = as as React.ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </MotionTag>
  );
}

export interface RevealItemProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  className?: string;
  style?: React.CSSProperties;
  as?: RevealTag;
}

/** `RevealGroup` ichidagi bitta element. */
export function RevealItem({
  children,
  variant = "up",
  className,
  style,
  as = "div",
}: RevealItemProps) {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = m[as] as typeof m.div;

  if (shouldReduceMotion) {
    const Tag = as as React.ElementType;
    return (
      <Tag className={className} style={style}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag className={className} style={style} variants={REVEAL_VARIANTS[variant]}>
      {children}
    </MotionTag>
  );
}
