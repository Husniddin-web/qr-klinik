"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItemProps {
  id: string;
  title: React.ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  badge?: React.ReactNode;
}

export function AccordionItem({
  title,
  children,
  isOpen = false,
  onToggle,
  badge,
}: AccordionItemProps) {
  return (
    <div className="border border-slate-200/80 rounded-2xl bg-white overflow-hidden transition-all duration-200 shadow-sm hover:border-slate-300">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left font-medium text-slate-900 gap-4 cursor-pointer focus:outline-none"
      >
        <div className="flex items-center gap-3 flex-1 text-base sm:text-lg">
          {title}
        </div>
        <div className="flex items-center gap-3">
          {badge}
          <ChevronDown
            className={cn(
              "w-5 h-5 text-slate-500 transition-transform duration-300 shrink-0",
              isOpen && "transform rotate-180 text-[#0f172a]"
            )}
          />
        </div>
      </button>
      {isOpen && (
        <div className="px-5 pb-5 pt-1 text-sm text-slate-600 border-t border-slate-100 animate-fadeIn leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}
