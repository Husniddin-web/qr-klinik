import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export function Card({ className, hoverable = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl border border-slate-100/80 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] p-6 transition-all duration-300",
        hoverable && "hover:shadow-[0_12px_32px_-4px_rgba(15,23,42,0.12)] hover:-translate-y-1 hover:border-slate-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
