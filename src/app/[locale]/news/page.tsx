import type { Metadata } from "next";
import { getNews } from "@/lib/public-api";
import { NewsClient } from "./NewsClient";

export const metadata: Metadata = {
  title: "Yangiliklar | QAXRAMON-RAXIMJON Klinikasi",
  description: "Klinika yangiliklari, aksiyalar va shifokor maslahatlari.",
};

/** Server component: ma'lumot backend'dan (60s ISR), client qismiga uzatiladi */
export default async function Page() {
  const news = await getNews();
  return <NewsClient news={news} />;
}
