"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, ExternalLink } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export function AdminHeader() {
  const pathname = usePathname();
  const { admin } = useAuth();

  // Generate breadcrumbs from path
  const segments = pathname.split("/").filter(Boolean);

  const formatSegment = (seg: string) => {
    switch (seg) {
      case "admin":
        return "Boshqaruv";
      case "departments":
        return "Bo'limlar";
      case "services":
        return "Xizmatlar";
      case "doctors":
        return "Shifokorlar";
      case "news":
        return "Yangiliklar";
      case "create":
        return "Yangi qo'shish";
      case "edit":
        return "Tahrirlash";
      default:
        return seg;
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/admin" className="font-semibold text-slate-700 hover:text-[#dc2626]">
          Admin
        </Link>

        {segments.slice(1).map((seg, idx) => {
          const path = `/${segments.slice(0, idx + 2).join("/")}`;
          const isLast = idx === segments.slice(1).length - 1;

          return (
            <React.Fragment key={path}>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              {isLast ? (
                <span className="font-bold text-[#0f172a] truncate max-w-[200px]">
                  {formatSegment(seg)}
                </span>
              ) : (
                <Link
                  href={path}
                  className="font-medium text-slate-600 hover:text-[#dc2626]"
                >
                  {formatSegment(seg)}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          Klinika sayti
        </Link>

        <div className="h-6 w-px bg-slate-200 hidden sm:block" />

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#0f172a] text-white flex items-center justify-center font-bold text-xs">
            {admin?.fullName ? admin.fullName[0].toUpperCase() : "A"}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-bold text-slate-900 leading-none">
              {admin?.fullName || "Admin"}
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">
              {admin?.role || "superadmin"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
