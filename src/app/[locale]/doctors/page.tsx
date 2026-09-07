"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { PageHero } from "@/components/common/PageHero";
import { AppointmentModal } from "@/components/modals/AppointmentModal";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { DOCTORS_DATA } from "@/data/doctors";

export default function DoctorsPage() {
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | undefined>(undefined);

  const handleOpenAppointment = (docId?: string) => {
    setSelectedDoctorId(docId);
    setIsAppointmentOpen(true);
  };

  const handleCloseAppointment = () => {
    setIsAppointmentOpen(false);
    setSelectedDoctorId(undefined);
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 selection:bg-[#dc2626] selection:text-white">
      {/* Floating Navbar */}
      <Navbar onOpenAppointment={() => handleOpenAppointment()} />

      {/* Page Hero without eyebrow badge */}
      <PageHero
        title="Oliy Toifali Vrachlar va Xalqaro Mutaxassislar"
        description="15 yildan ortiq klinik amaliyotga va xalqaro nufuzli markazlar malakasiga ega 45+ nafar yetakchi vrach va professorlarimiz salomatligingiz xizmatida."
        bgImage="/images/heroes/hero-doctors.jpg"
        breadcrumbs={[{ label: "Shifokorlar" }]}
      />

      {/* Main Content Area: Doctors Gallery matching user reference style */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Doctors Grid: Clean Square Rounded Photos with Centered Name & Position */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {DOCTORS_DATA.map((doctor) => (
              <div
                key={doctor.id}
                onClick={() => handleOpenAppointment(doctor.id)}
                className="group cursor-pointer flex flex-col items-center text-center transition-transform active:scale-98"
              >
                {/* Photo Container with rounded corners */}
                <div className="relative w-full aspect-square rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-100 mb-3 sm:mb-4 shadow-xs group-hover:shadow-md transition-all duration-300">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>

                {/* Doctor Name */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#dc2626] transition-colors leading-snug">
                  {doctor.name}
                </h3>

                {/* Doctor Specialty / Position */}
                <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1 leading-normal max-w-xs">
                  {doctor.specialty}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Frequently Asked Questions (FAQ) Section */}
      <FaqSection />

      {/* Global Footer */}
      <Footer />

      {/* Direct Appointment Modal */}
      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={handleCloseAppointment}
        preselectedDoctorId={selectedDoctorId}
      />
    </main>
  );
}
