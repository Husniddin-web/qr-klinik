"use client";

import React, { useRef, useState } from "react";
import { m as motion, useSpring } from "framer-motion";
import { useCanHover } from "@/lib/hooks/useMediaQuery";

interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number; // max displacement in px (default 12)
  glow?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  "aria-label"?: string;
  id?: string;
}

export function MagneticButton({
  children,
  strength = 12,
  glow = true,
  className = "",
  onClick,
  type = "button",
  "aria-label": ariaLabel,
  id,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  // Faqat haqiqiy hover/kursor bor qurilmalarda kursorni kuzatamiz
  const canHover = useCanHover();
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { damping: 14, stiffness: 160, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!canHover || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set((distanceX / (rect.width / 2)) * strength);
    y.set((distanceY / (rect.height / 2)) * strength);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative inline-flex items-center justify-center group">
      {/* Ambient Breathing Glow Ripple */}
      {glow && (
        <motion.span
          animate={{
            scale: isHovered ? [1, 1.08, 1] : 1,
            opacity: isHovered ? 0.45 : 0,
          }}
          transition={{
            scale: { repeat: Infinity, duration: 1.8, ease: "easeInOut" },
            opacity: { duration: 0.25 },
          }}
          className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-[#dc2626] to-red-500 blur-lg pointer-events-none -z-10"
        />
      )}

      <motion.button
        ref={ref}
        id={id}
        type={type}
        aria-label={ariaLabel}
        style={{ x, y }}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        className={className}
      >
        {children}
      </motion.button>
    </div>
  );
}
