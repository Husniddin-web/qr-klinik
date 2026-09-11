import type { Metadata } from "next";
import { getServices } from "@/lib/public-api";
import { ServicesClient } from "./ServicesClient";

export const metadata: Metadata = {
  title: "Xizmatlar va Narxlar | QAXRAMON-RAXIMJON Klinikasi",
  description: "Diagnostika, konsultatsiya, laboratoriya va davolash xizmatlarining to'liq ro'yxati va narxlari.",
};

/** Server component: ma'lumot backend'dan (60s ISR), client qismiga uzatiladi */
export default async function Page() {
  const services = await getServices();
  return <ServicesClient services={services} />;
}
