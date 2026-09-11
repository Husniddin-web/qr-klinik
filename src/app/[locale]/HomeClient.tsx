"use client";

import React, { useState } from "react";
import { Footer } from "@/components/common/Footer";
import { EkgDivider } from "@/components/common/EkgDivider";
import { useAppointment } from "@/components/providers/AppointmentProvider";
import type { IDepartment, IDoctor, IService, INews } from "@/types";

import { HeroSection } from "@/components/sections/HeroSection";
import { HeroShowcaseSection } from "@/components/sections/HeroShowcaseSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { DepartmentsSection } from "@/components/sections/DepartmentsSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WellnessBannerSection } from "@/components/sections/WellnessBannerSection";
import { DoctorsSection } from "@/components/sections/DoctorsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { ContactSection } from "@/components/sections/ContactSection";

interface HomeClientProps {
  departments: IDepartment[];
  doctors: IDoctor[];
  services: IService[];
  news: INews[];
}

/**
 * Bosh sahifa (client qismi). Ma'lumotlar `page.tsx` server komponentidan keladi.
 * Navbar va AppointmentModal layout darajasidagi <SiteShell>da.
 */
export function HomeClient({ departments, doctors, services, news }: HomeClientProps) {
  const { open: openAppointment } = useAppointment();
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | undefined>();

  const handleSelectDepartment = (deptId: string) => {
    setSelectedDepartmentId(deptId);
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main
      id="main-content"
      className="min-h-screen flex flex-col bg-white selection:bg-[#dc2626] selection:text-white overflow-x-clip w-full max-w-full"
    >
      <HeroSection onOpenAppointment={() => openAppointment()} />

      <HeroShowcaseSection onOpenAppointment={() => openAppointment()} />

      <AboutSection />

      {/* EKG: scroll bilan chiziladi — brend "yurak urishi" */}
      <EkgDivider className="bg-[#f8fafc]" />

      <StatsSection />

      <DepartmentsSection departments={departments} onSelectDepartment={handleSelectDepartment} />

      <HowItWorksSection />

      <ServicesSection
        onOpenAppointment={(serviceTitle) =>
          openAppointment({ serviceTitle, departmentId: selectedDepartmentId })
        }
        selectedDept={selectedDepartmentId}
        services={services}
      />

      <WellnessBannerSection onOpenAppointment={() => openAppointment()} />

      <DoctorsSection doctors={doctors} onSelectDoctor={(doctorId) => openAppointment({ doctorId })} />

      <EkgDivider className="bg-white" />

      <TestimonialsSection />

      <FaqSection onOpenAppointment={() => openAppointment()} />

      <ContactSection onOpenAppointment={() => openAppointment()} />

      <PartnersSection />

      <NewsSection news={news} />

      <Footer departments={departments} />
    </main>
  );
}
