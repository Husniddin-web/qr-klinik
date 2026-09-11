import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { MotionProvider } from "@/components/common/MotionProvider";
import { SiteShell } from "@/components/common/SiteShell";
import { getDepartments, getDoctors } from "@/lib/public-api";
import { ScrollProgressBar } from "@/components/common/ScrollProgressBar";
import { SplashScreen } from "@/components/common/SplashScreen";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import "../globals.css";

/**
 * Inter variable — reja (plan.txt) talab qilgan shrift.
 * `display: "swap"` + `preload` LCP'ni sezilarli yaxshilaydi, system stack esa
 * fallback bo'lib qoladi (shrift yuklanmasa ham layout siljimaydi).
 */
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0f172a",
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

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();
  // Modal (bo'lim/shifokor tanlash) uchun — 60s ISR kesh, parallel
  const [departments, doctors] = await Promise.all([getDepartments(), getDoctors()]);

  return (
    <html lang={locale} className={`${inter.variable} scroll-smooth`}>
      <body className="antialiased selection:bg-[#dc2626] selection:text-white bg-white text-[#1e293b]">
        {/* Klaviatura foydalanuvchilari uchun kontentga tez o'tish havolasi */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:px-4 focus:py-2 focus:rounded-xl focus:bg-[#0f172a] focus:text-white focus:text-sm focus:font-bold"
        >
          Asosiy kontentga o&apos;tish
        </a>

        {/* Barcha framer animatsiyalari uchun yagona kontekst:
            LazyMotion (bundle) + reducedMotion="user" (a11y) */}
        <MotionProvider>
          {/* Sessiya davomida faqat bir marta ko'rinadigan splash */}
          <SplashScreen />
          <ScrollProgressBar />
          <ScrollToTop />
          <NextIntlClientProvider locale={locale} messages={messages}>
            {/* Navbar + AppointmentModal — sahifalar orasida saqlanib qoladi */}
            <SiteShell departments={departments} doctors={doctors}>
              {children}
            </SiteShell>
          </NextIntlClientProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
