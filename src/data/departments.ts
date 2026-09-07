import { IDepartment } from "@/types";

export const DEPARTMENTS_DATA: IDepartment[] = [
  {
    id: "cardiology",
    name: "Kardiologiya",
    slug: "kardiologiya",
    shortDescription: "Yurak-qon tomir tizimi kasalliklarini aniq EKG, Xolter va zamonaviy usullarda tashxislash.",
    iconName: "HeartPulse",
  },
  {
    id: "neurology",
    name: "Nevrologiya",
    slug: "nevrologiya",
    shortDescription: "Bosh miya, asab tizimi faoliyati buzilishlari va orqa miya kasalliklarini davolash.",
    iconName: "Brain",
  },
  {
    id: "pediatrics",
    name: "Pediatriya",
    slug: "pediatriya",
    shortDescription: "Bolalar salomatligi, rivojlanish nazorati va profilaktik emlashlar bo'yicha g'amxo'rlik.",
    iconName: "Baby",
  },
  {
    id: "diagnostics",
    name: "MRT va KT Diagnostika",
    slug: "diagnostika",
    shortDescription: "Eng so'nggi 3.0 Tesla MRT va multispirel KT orqali butun tana a'zolarini yuqori aniqlikda tekshirish.",
    iconName: "ScanLine",
  },
  {
    id: "therapy",
    name: "Terapiya",
    slug: "terapiya",
    shortDescription: "Umumiy tana kasalliklarini erta aniqlash, kompleks tekshiruv va individual davolash rejasi.",
    iconName: "Stethoscope",
  },
  {
    id: "orthopedics",
    name: "Travmatologiya va Ortopediya",
    slug: "ortopediya",
    shortDescription: "Bo'g'imlar, umurtqa pog'onasi, jarohatlar va suyak tizimi kasalliklarini tiklash.",
    iconName: "Activity",
  },
  {
    id: "laboratory",
    name: "Klinik Laboratoriya",
    slug: "laboratoriya",
    shortDescription: "Avtomatlashtirilgan analizatorlarda qisqa muddatda yuqori aniqlikdagi tahlillar (biokimyo, IFA, PSR).",
    iconName: "FlaskConical",
  },
  {
    id: "endocrinology",
    name: "Endokrinologiya",
    slug: "endokrinologiya",
    shortDescription: "Qalqonsimon bez, gormonal buzilishlar va qandli diabetni kompleks nazorat qilish.",
    iconName: "ShieldAlert",
  },
  {
    id: "surgery",
    name: "Umumiy Jarrohlik",
    slug: "jarrohlik",
    shortDescription: "Zamonaviy kam invaziv laparoskopik muolajalar, kichik amaliyotlar va yuqori xavfsizlikdagi operatsiyalar.",
    iconName: "Crosshair",
  },
];
