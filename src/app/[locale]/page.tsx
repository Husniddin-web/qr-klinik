import { getSiteData } from "@/lib/public-api";
import { HomeClient } from "./HomeClient";

/**
 * Bosh sahifa — server component.
 * Bo'limlar, shifokorlar, xizmatlar, yangiliklar backend'dan parallel olinadi
 * (60s ISR kesh; backend o'chiq bo'lsa static fallback) va client qismiga uzatiladi.
 */
export default async function HomePage() {
  const data = await getSiteData();
  return <HomeClient {...data} />;
}
