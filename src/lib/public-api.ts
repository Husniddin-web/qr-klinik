import type { IDepartment, IDoctor, IService, INews } from "@/types";
import {
  toDepartment,
  toDoctor,
  toService,
  toNews,
  type ApiDepartment,
  type ApiDoctor,
  type ApiService,
  type ApiNews,
} from "./adapters";
import { DEPARTMENTS_DATA } from "@/data/departments";
import { DOCTORS_DATA } from "@/data/doctors";
import { SERVICES_DATA } from "@/data/services";
import { NEWS_DATA } from "@/data/news";

/* ==========================================================================
   PUBLIC API — server component'larda ishlatiladi (SSR + ISR kesh).
   Backend o'chiq bo'lsa sayt sinmaydi: static fallback ma'lumot qaytadi.
   ========================================================================== */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

/** Ma'lumotlar 60 soniya keshlanadi (ISR) — admin o'zgartirsa ≤1 daqiqada saytga chiqadi */
const REVALIDATE_SECONDS = 60;

interface ListResponse<T> {
  success: boolean;
  data: T[];
}

async function fetchList<T>(path: string, params: Record<string, string | number> = {}): Promise<T[] | null> {
  const qs = new URLSearchParams({ isActive: "true", limit: "100", ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])) });
  try {
    const res = await fetch(`${API_URL}${path}?${qs}`, {
      next: { revalidate: REVALIDATE_SECONDS, tags: [path.replace("/", "")] },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as ListResponse<T>;
    return json.success ? json.data : null;
  } catch (err) {
    console.warn(`[public-api] ${path} — backend javob bermadi, static fallback ishlatiladi`, (err as Error)?.message);
    return null;
  }
}

export async function getDepartments(): Promise<IDepartment[]> {
  const list = await fetchList<ApiDepartment>("/departments");
  return list && list.length ? list.map(toDepartment) : DEPARTMENTS_DATA;
}

export async function getDoctors(): Promise<IDoctor[]> {
  const list = await fetchList<ApiDoctor>("/doctors");
  return list && list.length ? list.map(toDoctor) : DOCTORS_DATA;
}

export async function getServices(): Promise<IService[]> {
  const list = await fetchList<ApiService>("/services");
  return list && list.length ? list.map(toService) : SERVICES_DATA;
}

export async function getNews(limit = 100): Promise<INews[]> {
  const list = await fetchList<ApiNews>("/news", { limit });
  return list && list.length ? list.map(toNews) : NEWS_DATA;
}

/** Bosh sahifa va layout uchun — hammasi parallel */
export async function getSiteData() {
  const [departments, doctors, services, news] = await Promise.all([
    getDepartments(),
    getDoctors(),
    getServices(),
    getNews(),
  ]);
  return { departments, doctors, services, news };
}

/* ==========================================================================
   FORMALAR — client'dan yuboriladi
   ========================================================================== */

export interface AppointmentPayload {
  name: string;
  phone: string;
  departmentId?: string;
  doctorId?: string;
  serviceTitle?: string;
  preferredDate?: string;
  timeSlot?: "morning" | "afternoon" | "evening" | "";
  message?: string;
  source?: string;
  /** honeypot */
  website?: string;
}

export interface ContactPayload {
  name: string;
  phone: string;
  departmentId?: string;
  message?: string;
  source?: string;
  website?: string;
}

interface SubmitResponse {
  success: boolean;
  message?: string;
  errors?: { field: string; message: string }[] | null;
}

async function submit(path: string, payload: object): Promise<SubmitResponse> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = (await res.json().catch(() => ({}))) as SubmitResponse;
  if (!res.ok || !json.success) {
    const detail = json.errors?.map((e) => e.message).join(", ");
    throw new Error(detail || json.message || "Yuborishda xatolik yuz berdi");
  }
  return json;
}

/** ObjectId bo'lmagan (static fallback) ID'larni backendga yubormaymiz */
const asObjectId = (v?: string) => (v && /^[a-f\d]{24}$/i.test(v) ? v : undefined);

export function submitAppointment(p: AppointmentPayload) {
  return submit("/appointments", {
    ...p,
    departmentId: asObjectId(p.departmentId),
    doctorId: asObjectId(p.doctorId),
  });
}

export function submitContact(p: ContactPayload) {
  return submit("/contact", { ...p, departmentId: asObjectId(p.departmentId) });
}
