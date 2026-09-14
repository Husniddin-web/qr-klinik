import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Raqamni minglik guruhlarga ajratadi: 180000 → "180 000".
 * `Intl.NumberFormat("uz-UZ")` ishlatilmaydi: Node ICU va brauzer turli
 * ajratgich (bo'shliq vs vergul) qaytarib, hydration mismatch berardi.
 * Ajratgich — tor bo'linmas bo'shliq (U+202F): satr oxirida sinmaydi.
 */
export function formatNumber(value: number): string {
  const rounded = Math.round(value);
  const sign = rounded < 0 ? "-" : "";
  const digits = Math.abs(rounded).toString();
  return sign + digits.replace(/\B(?=(\d{3})+(?!\d))/g, "\u202F");
}

export function formatPrice(price: number): string {
  return formatNumber(price) + " so'm";
}
