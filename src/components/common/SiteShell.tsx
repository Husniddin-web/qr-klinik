"use client";

import React from "react";
import { Navbar } from "./Navbar";
import { AppointmentModal } from "../modals/AppointmentModal";
import { AppointmentProvider, useAppointment } from "../providers/AppointmentProvider";
import type { IDepartment, IDoctor } from "@/types";

interface SiteShellProps {
  children: React.ReactNode;
  departments?: IDepartment[];
  doctors?: IDoctor[];
}

/**
 * Public saytning doimiy "qobig'i": Navbar + AppointmentModal.
 * Layout'da yashaydi, shuning uchun sahifa almashganda qayta yaratilmaydi.
 */
function ShellInner({ children, departments, doctors }: SiteShellProps) {
  const { isOpen, options, openCount, open, close } = useAppointment();

  return (
    <>
      <Navbar onOpenAppointment={() => open()} />
      {children}
      <AppointmentModal
        isOpen={isOpen}
        sessionKey={openCount}
        onClose={close}
        preselectedDoctorId={options.doctorId}
        preselectedDepartmentId={options.departmentId}
        preselectedServiceTitle={options.serviceTitle}
        departments={departments}
        doctors={doctors}
      />
    </>
  );
}

export function SiteShell({ children, departments, doctors }: SiteShellProps) {
  return (
    <AppointmentProvider>
      <ShellInner departments={departments} doctors={doctors}>
        {children}
      </ShellInner>
    </AppointmentProvider>
  );
}
