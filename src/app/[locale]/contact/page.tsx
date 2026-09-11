import type { Metadata } from "next";
import { getDepartments } from "@/lib/public-api";
import { ContactClient } from "./ContactClient";

export const metadata: Metadata = {
  title: "Aloqa | QAXRAMON-RAXIMJON Klinikasi",
  description: "Manzil, ish vaqti, telefon raqamlar va qabulga yozilish formasi.",
};

export default async function Page() {
  const departments = await getDepartments();
  return <ContactClient departments={departments} />;
}
