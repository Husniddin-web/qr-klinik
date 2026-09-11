import type { IDepartment, IDoctor, IService, INews } from "@/types";

/* ==========================================================================
   Backend hujjatlari → frontend interfeyslari.
   Section komponentlari IDepartment/IDoctor/... bilan yozilgan; backend sxemasi
   boshqacha (role vs specialty, title vs name...). Mapping shu yerda, bitta joyda.
   ========================================================================== */

export const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001";

/** `/uploads/...` — backend'dan; `/images/...` — frontend public; http(s) — tashqi */
export function resolveImage(url?: string | null, fallback = ""): string {
  if (!url) return fallback;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/uploads")) return `${BACKEND_URL}${url}`;
  return url;
}

/** Populated `departmentId` ({_id,title,slug}) yoki oddiy string ID — ikkalasini ham qabul qiladi */
function refId(ref: unknown): string {
  if (!ref) return "";
  if (typeof ref === "string") return ref;
  const obj = ref as { _id?: string; slug?: string };
  return obj.slug || obj._id || "";
}
function refTitle(ref: unknown): string {
  if (!ref || typeof ref === "string") return "";
  return (ref as { title?: string }).title || "";
}

export interface ApiDepartment {
  _id: string;
  title: string;
  slug?: string;
  description: string;
  icon: string;
  order?: number;
  isActive?: boolean;
}

export interface ApiDoctor {
  _id: string;
  name: string;
  role: string;
  image: string;
  experience?: string;
  bio?: string;
  schedule?: string;
  rating?: number;
  departmentId?: ApiDepartment | string | null;
}

export interface ApiService {
  _id: string;
  title: string;
  description: string;
  price: number;
  priceFormatted?: string;
  duration?: string;
  departmentId?: ApiDepartment | string | null;
}

export interface ApiNews {
  _id: string;
  title: string;
  description: string;
  image?: string;
  category?: string;
  author?: string;
  viewsCount?: number;
  createdAt: string;
}

const ICON_NAME_BY_SLUG: Record<string, string> = {
  cardiology: "HeartPulse",
  neurology: "Brain",
  pediatrics: "Baby",
  diagnostics: "ScanLine",
  therapy: "Stethoscope",
  orthopedics: "Activity",
  laboratory: "FlaskConical",
  endocrinology: "ShieldAlert",
  surgery: "Crosshair",
};

const isImagePath = (v: string) => /^(https?:\/\/|\/)/.test(v);

export function toDepartment(d: ApiDepartment): IDepartment {
  const slug = d.slug || d._id;
  return {
    // `id` = slug: Department3DIcon "cardiology" kabi kalitlar bo'yicha 3D ikonka chizadi
    id: slug,
    dbId: d._id,
    name: d.title,
    slug,
    shortDescription: d.description,
    iconName: !isImagePath(d.icon) ? d.icon : ICON_NAME_BY_SLUG[slug] || "Stethoscope",
    image: isImagePath(d.icon) ? resolveImage(d.icon) : undefined,
  };
}

export function toDoctor(d: ApiDoctor): IDoctor {
  const years = parseInt((d.experience || "").replace(/\D/g, ""), 10);
  return {
    id: d._id,
    name: d.name,
    specialty: d.role,
    departmentId: refId(d.departmentId),
    experienceYears: Number.isFinite(years) ? years : 0,
    education: d.bio || "",
    image: resolveImage(d.image, "/images/doctor-1.jpg"),
    schedule: d.schedule || "Dush - Shanba: 09:00 - 17:00",
    rating: typeof d.rating === "number" ? d.rating : 4.9,
  };
}

export function toService(s: ApiService): IService {
  return {
    id: s._id,
    title: s.title,
    departmentId: refId(s.departmentId),
    departmentName: refTitle(s.departmentId),
    price: s.price,
    duration: s.duration || "",
    description: s.description,
  };
}

const UZ_MONTHS = [
  "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
  "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr",
];

export function formatUzDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getDate()} ${UZ_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export function toNews(n: ApiNews): INews {
  const words = (n.description || "").split(/\s+/).length;
  return {
    id: n._id,
    title: n.title,
    summary: n.description,
    category: n.category || "Yangilik",
    publishDate: formatUzDate(n.createdAt),
    readTime: `${Math.max(2, Math.ceil(words / 120))} daqiqa`,
    image: resolveImage(n.image, "/images/clinic-hero.jpg"),
    author: n.author || "Klinika Mutaxassisi",
  };
}
