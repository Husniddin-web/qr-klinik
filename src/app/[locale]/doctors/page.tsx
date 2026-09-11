import type { Metadata } from "next";
import { getDoctors } from "@/lib/public-api";
import { DoctorsClient } from "./DoctorsClient";

export const metadata: Metadata = {
  title: "Shifokorlar | QAXRAMON-RAXIMJON Klinikasi",
  description: "Oliy toifali kardiolog, nevrolog, pediatr va boshqa mutaxassislarimiz bilan tanishing.",
};

/** Server component: ma'lumot backend'dan (60s ISR), client qismiga uzatiladi */
export default async function Page() {
  const doctors = await getDoctors();
  return <DoctorsClient doctors={doctors} />;
}
