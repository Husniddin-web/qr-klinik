export interface IDepartment {
  /** Ikonka/URL kaliti (slug: "cardiology"). Backend'dan kelganda ham slug. */
  id: string;
  /** MongoDB ObjectId — formalarda backendga yuboriladi (static data'da yo'q) */
  dbId?: string;
  name: string;
  slug: string;
  shortDescription: string;
  iconName: string;
  image?: string;
  isPopular?: boolean;
  doctorCount?: number;
  availableServicesCount?: number;
}

export interface IService {
  id: string;
  title: string;
  departmentId: string;
  departmentName: string;
  price: number;
  duration: string;
  description: string;
  isPopular?: boolean;
}

export interface IEquipment {
  id: string;
  name: string;
  model: string;
  originCountry: string;
  price?: number;
  shortDescription: string;
  fullSpecs: string[];
  image: string;
  badge?: string;
}

export interface IDoctor {
  id: string;
  name: string;
  specialty: string;
  departmentId: string;
  experienceYears: number;
  education: string;
  image: string;
  schedule: string;
  rating: number;
}

export interface ITestimonial {
  id: string;
  patientName: string;
  serviceReceived: string;
  comment: string;
  rating: number;
  date: string;
  isVerified: boolean;
}

export interface IFaq {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface INews {
  id: string;
  title: string;
  summary: string;
  category: string;
  publishDate: string;
  readTime: string;
  image: string;
  author?: string;
}

export interface IStat {
  id: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export interface IPartner {
  id: string;
  name: string;
  type: string;
  logoText: string;
}

export interface IAppointmentForm {
  patientName: string;
  phoneNumber: string;
  departmentId: string;
  doctorId?: string;
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
}
