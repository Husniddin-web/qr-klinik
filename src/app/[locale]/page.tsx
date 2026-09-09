"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { AppointmentModal } from "@/components/modals/AppointmentModal";

// Sections
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

export default function HomePage() {
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | undefined>(undefined);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | undefined>(undefined);

  const handleOpenAppointment = (doctorId?: string, deptId?: string) => {
    setSelectedDoctorId(doctorId);
    setSelectedDepartmentId(deptId);
    setIsAppointmentOpen(true);
  };

  const handleCloseAppointment = () => {
    setIsAppointmentOpen(false);
    setSelectedDoctorId(undefined);
    setSelectedDepartmentId(undefined);
  };

  const handleSelectDepartment = (deptId: string) => {
    setSelectedDepartmentId(deptId);
    const servicesElement = document.getElementById("services");
    if (servicesElement) {
      servicesElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-white selection:bg-[#dc2626] selection:text-white overflow-x-hidden w-full max-w-full">
      {/* 1. Floating Pill Header with next-intl language switcher */}
      <Navbar onOpenAppointment={() => handleOpenAppointment()} />

      {/* 2. Hero Section with Primary Navy & Accent Red Styling */}
      <HeroSection onOpenAppointment={() => handleOpenAppointment()} />

      {/* 2.5. Post-Hero 4-Card Photo Showcase Section */}
      <HeroShowcaseSection onOpenAppointment={() => handleOpenAppointment()} />

      {/* 3. About Us Section (Storytelling Book Page-Turn) */}
      <AboutSection />

      {/* 5. Achievements / Live Counter Section */}
      <StatsSection />

      {/* 6. Departments Grid Section */}
      <DepartmentsSection onSelectDepartment={handleSelectDepartment} />

      {/* 7. How It Works (4 Connected Circular Process Steps) */}
      <HowItWorksSection />

      {/* 8. Services & Pricing Section */}
      <ServicesSection
        onOpenAppointment={() => handleOpenAppointment()}
        selectedDept={selectedDepartmentId}
      />

      {/* 8.5 Medical Team / Wellness Banner Section */}
      <WellnessBannerSection onOpenAppointment={() => handleOpenAppointment()} />

      {/* 9. Staff / Doctors Section */}
      <DoctorsSection
        onSelectDoctor={(docId) => handleOpenAppointment(docId)}
      />

      {/* 10. Testimonials Section */}
      <TestimonialsSection />

      {/* 13. Frequently Asked Questions (F.A.Q.) Section */}
      <FaqSection onOpenAppointment={() => handleOpenAppointment()} />

      {/* 13.5. Unified Contact & Appointment Section (Without redundant phone/email bottom cards) */}
      <ContactSection onOpenAppointment={() => handleOpenAppointment()} />

      {/* 14. Partners & Certifications Section */}
      <PartnersSection />

      {/* 15. News & Health Articles Section */}
      <NewsSection />

      {/* Global Footer */}
      <Footer />

      {/* Interactive Appointment Modal */}
      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={handleCloseAppointment}
        preselectedDoctorId={selectedDoctorId}
        preselectedDepartmentId={selectedDepartmentId}
      />
    </main>
  );
}
