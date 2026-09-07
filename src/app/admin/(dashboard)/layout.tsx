"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Loader2 } from "lucide-react";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { admin, token, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!admin || !token)) {
      router.push("/admin/login");
    }
  }, [admin, token, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#dc2626] animate-spin mb-3" />
        <p className="text-xs font-semibold text-slate-500">
          Admin portal yuklanmoqda...
        </p>
      </div>
    );
  }

  if (!admin || !token) {
    return null;
  }

  return (
    <div className="min-h-screen flex bg-slate-50 selection:bg-[#dc2626] selection:text-white">
      {/* Sleek Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
