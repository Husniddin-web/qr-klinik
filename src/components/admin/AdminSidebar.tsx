"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Network,
  Stethoscope,
  Users,
  Newspaper,
  LogOut,
  ExternalLink,
  Shield,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const NAV_ITEMS = [
  {
    href: "/admin",
    label: "Boshqaruv (KPI)",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: "/admin/departments",
    label: "Bo'limlar",
    icon: Network,
  },
  {
    href: "/admin/services",
    label: "Xizmatlar",
    icon: Stethoscope,
  },
  {
    href: "/admin/doctors",
    label: "Shifokorlar",
    icon: Users,
  },
  {
    href: "/admin/news",
    label: "Yangiliklar",
    icon: Newspaper,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { admin, logout } = useAuth();

  const isActive = (item: (typeof NAV_ITEMS)[0]) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };

  return (
    <aside className="w-64 bg-[#0f172a] text-slate-300 flex flex-col h-screen sticky top-0 shrink-0 border-r border-slate-800 selection:bg-[#dc2626] selection:text-white z-30">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-white p-1 flex items-center justify-center shrink-0">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={28}
              height={28}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight leading-none">
              QR-KLINIK
            </h2>
            <span className="text-[10px] text-red-400 font-semibold tracking-wider uppercase mt-1 inline-block">
              Admin Portal
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-5 space-y-1.5 overflow-y-auto">
        <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
          Asosiy Modullar
        </p>

        {NAV_ITEMS.map((item) => {
          const active = isActive(item);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                active
                  ? "bg-[#dc2626] text-white shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}

        <div className="pt-6">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            Tizim
          </p>
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/40 transition-colors"
          >
            <span className="flex items-center gap-2.5">
              <ExternalLink className="w-4 h-4" />
              Saytni ko&apos;rish
            </span>
            <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">
              Public
            </span>
          </Link>
        </div>
      </nav>

      {/* Admin Profile & Logout */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/40">
        <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#dc2626]/20 text-[#dc2626] border border-red-900/30 flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">
                {admin?.fullName || "Administrator"}
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                @{admin?.username || "admin"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={logout}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 flex items-center justify-center transition-colors shrink-0"
            title="Tizimdan chiqish"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
