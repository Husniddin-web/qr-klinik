"use client";

import React from "react";
import { m as motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#dc2626] via-red-500 to-[#dc2626] origin-left z-[9999] pointer-events-none shadow-sm shadow-red-500/50"
    />
  );
}
