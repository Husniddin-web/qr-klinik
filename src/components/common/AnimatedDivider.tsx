"use client";

import React from "react";
import { m as motion } from "framer-motion";

interface AnimatedDividerProps {
  className?: string;
}

/**
 * Qizil divider chiziq — chapdan o'ngga chizilgandek paydo bo'ladi.
 * Hamma section headinglarida `data-aos="zoom-in"` o'rniga ishlatiladi.
 */
export function AnimatedDivider({ className = "" }: AnimatedDividerProps) {
  return (
    <motion.div
      initial={{ scaleX: 0, originX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.1 }}
      className={`w-12 h-1 bg-[#dc2626] rounded-full mx-auto mt-4 ${className}`}
    />
  );
}
