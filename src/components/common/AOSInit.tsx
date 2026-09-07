"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export function AOSInit() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 40,
      delay: 0,
      mirror: false,
    });

    const timer = setTimeout(() => {
      AOS.refresh();
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
