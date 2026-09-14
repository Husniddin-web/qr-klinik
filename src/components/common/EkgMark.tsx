import React from "react";
import { cn } from "@/lib/utils";

/**
 * Kichik kardiogramma belgisi — sarlavha eyebrow'lari va chip'larda brend imzosi.
 * EkgDivider bilan bir xil shakl (P–QRS–T), faqat ixcham.
 */
export function EkgMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 48 16"
      fill="none"
      className={cn("w-8 h-3 shrink-0", className)}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M0 8h12l3-4 3 8 3-10 3 12 3-6h21" />
    </svg>
  );
}
