import type { Metadata } from "next";
import { AuthProvider } from "@/lib/auth-context";
import "../globals.css";

export const metadata: Metadata = {
  title: "Admin Portal | QAXRAMON-RAXIMJON Klinikasi",
  description: "Klinika boshqaruv tizimi va administratorlar paneli",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <body className="antialiased bg-slate-50 text-slate-900 selection:bg-[#dc2626] selection:text-white">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
