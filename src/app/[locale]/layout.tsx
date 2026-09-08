import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { AOSInit } from "@/components/common/AOSInit";
import "../globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "QAXRAMON-RAXIMJON Klinikasi | Zamonaviy Ko'p Tarmoqli Tibbiyot Markazi",
  description:
    "Toshkent shahridagi eng zamonaviy tibbiyot markazi. 3.0 Tesla MRT, multispirel KT, to'liq robotlashgan laboratoriya, oliy toifali kardiolog, nevrolog va mutaxassislar.",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body className="antialiased selection:bg-[#dc2626] selection:text-white bg-white text-[#1e293b]">
        <AOSInit />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
