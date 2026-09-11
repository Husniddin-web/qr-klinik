import type { Variants, Transition } from "framer-motion";

/* ==========================================================================
   MOTION DESIGN TOKENS
   Saytdagi BARCHA animatsiya shu yerdan oziqlanadi. Hech bir komponentda
   "sehrli raqam" (0.62s, cubic-bezier(...)) yozilmaydi — faqat shu tokenlar.
   ========================================================================== */

/** Asosiy easing — "expo out". Tez boshlanadi, mayin to'xtaydi. */
export const EASE = [0.22, 1, 0.36, 1] as const;
/** Kirish/chiqish juftligi uchun simmetrik easing. */
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

/** Davomiyliklar (soniya). Reja: 0.3s–0.5s oralig'i — "vibecoding" bo'lmasligi uchun. */
export const DUR = {
  instant: 0.15,
  fast: 0.25,
  base: 0.45,
  slow: 0.7,
  curtain: 0.85,
} as const;

/** Kirish masofalari (px). Katta sakrashlar arzon ko'rinadi. */
export const DIST = {
  sm: 12,
  md: 24,
  lg: 40,
} as const;

/** Stagger qadamlari. */
export const STAGGER = {
  tight: 0.06,
  base: 0.1,
  loose: 0.16,
} as const;

/** Spring presetlari — hover, drag va layout animatsiyalari uchun. */
export const SPRING = {
  /** Yumshoq, ortiqcha sakramaydigan. UI elementlari uchun standart. */
  soft: { type: "spring", stiffness: 260, damping: 26, mass: 0.6 },
  /** Tezkor va aniq — tugma, ikonka mikro-interaksiyalari. */
  snappy: { type: "spring", stiffness: 420, damping: 32, mass: 0.5 },
  /** Og'irroq — katta panellar, modal, drawer. */
  heavy: { type: "spring", stiffness: 180, damping: 28, mass: 0.9 },
} satisfies Record<string, Transition>;

/** Scroll-linked motion value'larni silliqlash uchun. */
export const SCROLL_SPRING = {
  stiffness: 90,
  damping: 26,
  restDelta: 0.001,
} as const;

/** Standart viewport sozlamasi — bir marta, element 15% ko'ringanda. */
export const VIEWPORT = { once: true, amount: 0.15 } as const;

const t = (duration: number, delay = 0): Transition => ({
  duration,
  delay,
  ease: EASE,
});

/* ==========================================================================
   VARIANTLAR
   ========================================================================== */

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: t(DUR.base) },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: DIST.md },
  visible: { opacity: 1, y: 0, transition: t(DUR.base) },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -DIST.md },
  visible: { opacity: 1, y: 0, transition: t(DUR.base) },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -DIST.lg },
  visible: { opacity: 1, x: 0, transition: t(DUR.slow) },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: DIST.lg },
  visible: { opacity: 1, x: 0, transition: t(DUR.slow) },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: t(DUR.base) },
};

/** Matn pastdan "niqob" ortidan ko'tariladi — sarlavhalar uchun. */
export const maskUp: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: t(DUR.slow) },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER.base,
      delayChildren: 0.05,
    },
  },
};

/** Reveal komponenti uchun variant xaritasi. */
export const REVEAL_VARIANTS = {
  up: fadeInUp,
  down: fadeInDown,
  left: fadeInLeft,
  right: fadeInRight,
  zoom: scaleIn,
  fade: fadeIn,
  mask: maskUp,
} as const;

export type RevealVariant = keyof typeof REVEAL_VARIANTS;
