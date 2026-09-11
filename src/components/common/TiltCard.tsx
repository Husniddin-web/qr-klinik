"use client";

import React, { useRef, useState } from "react";
import { m as motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCanHover } from "@/lib/hooks/useMediaQuery";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  maxTilt?: number; // degrees of tilt, default 7
  glare?: boolean;
}

export function TiltCard({
  children,
  className = "",
  onClick,
  maxTilt = 7,
  glare = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const canHover = useCanHover();
  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 220, mass: 0.1 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [maxTilt, -maxTilt]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-maxTilt, maxTilt]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canHover || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseFromCenterX = (e.clientX - rect.left) / width - 0.5;
    const mouseFromCenterY = (e.clientY - rect.top) / height - 0.5;

    mouseX.set(mouseFromCenterX);
    mouseY.set(mouseFromCenterY);

    if (glare) {
      setGlarePos({
        x: Math.round(((e.clientX - rect.left) / width) * 100),
        y: Math.round(((e.clientY - rect.top) / height) * 100),
      });
    }
  };

  const handleMouseEnter = () => {
    if (!canHover) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!canHover) return;
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div style={{ perspective: 1000 }} className="w-full">
      <motion.div
        ref={ref}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: canHover ? rotateX : 0,
          rotateY: canHover ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        className={`relative ${className}`}
      >
        {children}

        {/* Specular Radial Glare Sheen */}
        {glare && canHover && (
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 z-30"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(circle 280px at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.22) 0%, transparent 80%)`,
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
