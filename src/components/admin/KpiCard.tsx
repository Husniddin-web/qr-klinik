import React from "react";
import { LucideIcon } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: number | string;
  subValue?: string;
  icon: LucideIcon;
  color?: "red" | "blue" | "emerald" | "purple";
}

export function KpiCard({
  title,
  value,
  subValue,
  icon: Icon,
  color = "blue",
}: KpiCardProps) {
  const colorMap = {
    red: "bg-red-50 text-[#dc2626] border-red-100",
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {title}
        </p>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] mt-1 tracking-tight">
          {value}
        </h3>
        {subValue && (
          <p className="text-xs font-medium text-slate-400 mt-1">{subValue}</p>
        )}
      </div>

      <div
        className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${colorMap[color]}`}
      >
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
}
