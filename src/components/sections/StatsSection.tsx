"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { STATS_DATA } from "@/data/stats";
import { Container } from "../common/Container";

function CounterItem({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1000;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = value / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-left py-2 sm:py-0">
      <div className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] tracking-tight">
        {count.toLocaleString()}
        <span className="text-[#dc2626] ml-0.5">{suffix}</span>
      </div>
      <div className="mt-1.5 sm:mt-2 text-xs sm:text-base font-bold text-[#0f172a]">
        {label}
      </div>
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="py-14 sm:py-20 bg-[#f8fafc] border-b border-slate-200/80">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:divide-x divide-slate-200">
          {STATS_DATA.map((stat, idx) => (
            <div
              key={stat.id}
              data-aos="fade-up"
              data-aos-delay={(idx + 1) * 120}
              data-aos-duration="750"
              className={idx > 0 ? "lg:pl-8" : ""}
            >
              <CounterItem
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
