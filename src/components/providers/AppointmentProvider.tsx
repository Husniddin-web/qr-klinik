"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

export interface AppointmentOptions {
  doctorId?: string;
  departmentId?: string;
  serviceTitle?: string;
}

interface AppointmentContextValue {
  isOpen: boolean;
  options: AppointmentOptions;
  /** Har ochilishda +1 — modal ichidagi forma holatini `key` orqali tozalash uchun */
  openCount: number;
  /** Modalni ochadi; ixtiyoriy oldindan tanlangan qiymatlar bilan */
  open: (options?: AppointmentOptions) => void;
  close: () => void;
}

const AppointmentContext = createContext<AppointmentContextValue | null>(null);

/**
 * "Qabulga yozilish" modalining yagona holati.
 *
 * Ilgari har bir sahifa o'z `isAppointmentOpen` state'ini va o'z
 * `<AppointmentModal>` nusxasini saqlar edi. Endi:
 *   - modal layout darajasida BIR marta render qilinadi,
 *   - istalgan komponent (Navbar, Doctor card, Hero...) `useAppointment().open()`
 *     bilan ochadi,
 *   - Navbar sahifalar orasida remount bo'lmaydi → `layoutId` animatsiyasi ishlaydi.
 */
export function AppointmentProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<AppointmentOptions>({});
  const [openCount, setOpenCount] = useState(0);

  const open = useCallback((opts: AppointmentOptions = {}) => {
    setOptions(opts);
    setOpenCount((c) => c + 1);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({ isOpen, options, openCount, open, close }),
    [isOpen, options, openCount, open, close]
  );

  return <AppointmentContext.Provider value={value}>{children}</AppointmentContext.Provider>;
}

export function useAppointment(): AppointmentContextValue {
  const ctx = useContext(AppointmentContext);
  if (!ctx) {
    throw new Error("useAppointment faqat <AppointmentProvider> ichida ishlatilishi kerak");
  }
  return ctx;
}
