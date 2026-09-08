import type { Metadata } from "next";
import { AuthProvider } from "@/lib/auth-context";
import "../globals.css";

export const metadata: Metadata = {
  title: "Admin Portal | QAXRAMON-RAXIMJON Klinikasi",
  description: "Klinika boshqaruv tizimi va administratorlar paneli",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
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
