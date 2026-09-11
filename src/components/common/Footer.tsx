"use client";

import React from "react";
import { CLINIC_CONTACT, NAV_LINKS } from "@/data/navigation";
import { DEPARTMENTS_DATA } from "@/data/departments";
import type { IDepartment } from "@/types";
import { Container } from "./Container";
import { RevealGroup, RevealItem } from "./Reveal";

export function Footer({ departments = DEPARTMENTS_DATA }: { departments?: IDepartment[] }) {
  return (
    <footer className="bg-[#0f172a] text-slate-400 pt-20 pb-12 border-t border-slate-800 text-sm">
      <Container>
        {/* 4 ustun ketma-ket (stagger) ochiladi */}
        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-slate-800/80">
          {/* Brend */}
          <RevealItem className="lg:col-span-4 space-y-5 text-left">
            <a href="#hero" className="inline-block hover:opacity-90 transition-opacity">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/main-logo.jpg"
                alt="QAXRAMON-RAXIMJON"
                className="h-11 w-auto object-contain rounded-lg shadow-sm"
              />
            </a>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Xalqaro standartlar asosidagi ko&apos;p tarmoqli tibbiyot klinikasi. Siemens 3.0T MRT, multispirel KT, to&apos;liq avtomatlashtirilgan laboratoriya va oliy toifali shifokorlar xizmatingizda.
            </p>

            <div className="text-xs text-slate-500 font-medium">
              Davlat Litsenziyasi: №048123 (Sog&apos;liqni saqlash vazirligi)
            </div>
          </RevealItem>

          {/* Bo'limlar */}
          <RevealItem className="lg:col-span-3 text-left">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">
              Tibbiy Bo&apos;limlar
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              {departments.slice(0, 6).map((dep) => (
                <li key={dep.id}>
                  <a href="#departments" className="footer-link">
                    {dep.name}
                  </a>
                </li>
              ))}
            </ul>
          </RevealItem>

          {/* Navigatsiya */}
          <RevealItem className="lg:col-span-2 text-left">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">
              Navigatsiya
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              {NAV_LINKS.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="footer-link">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </RevealItem>

          {/* Aloqa */}
          <RevealItem className="lg:col-span-3 space-y-3 text-left text-xs">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">
              Bog&apos;lanish
            </h4>
            <p className="text-slate-300 font-semibold leading-relaxed">{CLINIC_CONTACT.address}</p>
            <p className="pt-1">
              <a
                href={`tel:${CLINIC_CONTACT.phones[0].replace(/\s+/g, "")}`}
                className="text-white hover:text-red-400 font-bold text-sm transition-colors"
              >
                {CLINIC_CONTACT.phones[0]}
              </a>
            </p>
            <p>
              <a
                href={`tel:${CLINIC_CONTACT.emergencyPhone.replace(/\s+/g, "")}`}
                className="text-[#dc2626] hover:underline font-bold text-xs"
              >
                {CLINIC_CONTACT.emergencyPhone} (24/7 Shoshilinch)
              </a>
            </p>
            <p className="text-slate-500 font-normal pt-1">{CLINIC_CONTACT.workingHours}</p>
            <p className="text-slate-400">{CLINIC_CONTACT.email}</p>
          </RevealItem>
        </RevealGroup>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} QAXRAMON-RAXIMJON Klinikasi. Barcha huquqlar himoyalangan.</p>
          <p className="text-slate-400 font-medium">
            Sizning sog&apos;lig&apos;ingiz – bizning oliy qadriyatimiz
          </p>
        </div>
      </Container>

    </footer>
  );
}
