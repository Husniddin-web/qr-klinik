"use client";

import React from "react";
import { Star } from "lucide-react";
import { TESTIMONIALS_DATA } from "@/data/testimonials";
import { ITestimonial } from "@/types";

export function TestimonialsSection() {
  // Split testimonials into 3 distinct columns
  const col1 = [TESTIMONIALS_DATA[0], TESTIMONIALS_DATA[3], TESTIMONIALS_DATA[6]];
  const col2 = [TESTIMONIALS_DATA[1], TESTIMONIALS_DATA[4], TESTIMONIALS_DATA[7]];
  const col3 = [TESTIMONIALS_DATA[2], TESTIMONIALS_DATA[5], TESTIMONIALS_DATA[8]];

  return (
    <section
      id="testimonials"
      className="py-20 lg:py-28 bg-white relative overflow-hidden border-b border-slate-200/80"
    >
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14 px-4 relative z-10">
        <h2
          data-aos="fade-up"
          data-aos-delay="200"
          className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0f172a] tracking-tight uppercase font-sans"
        >
          Bemorlar Sharhlari
        </h2>
        <div
          data-aos="zoom-in"
          data-aos-delay="240"
          className="w-12 h-1 bg-[#dc2626] mx-auto rounded-full mt-4"
        />
      </div>

      {/* 3-Column Vertical Infinite Marquee Showcase */}
      <div
        data-aos="fade-up"
        data-aos-delay="250"
        data-aos-duration="850"
        className="relative max-w-7xl mx-auto px-4 sm:px-6"
      >
        {/* Soft Fading Mask Container (No Sharp Cuts - Smoothly Dissolves) */}
        <div className="relative overflow-hidden h-[620px] sm:h-[680px] [mask-image:linear-gradient(to_bottom,transparent_0%,black_16%,black_84%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_16%,black_84%,transparent_100%)]">
          {/* Top & Bottom White Gradient Glows for Extra Soft Dissolve */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white via-white/80 to-transparent z-20" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/80 to-transparent z-20" />

          {/* 3 Columns Grid with Pause-on-Hover */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full items-start hover-pause">
            {/* Column 1: Moves UP */}
            <div className="flex flex-col gap-6 animate-marquee-vertical-up">
              {[...col1, ...col1].map((review, idx) => (
                <ReviewCard key={`col1-${review.id}-${idx}`} review={review} />
              ))}
            </div>

            {/* Column 2: Moves DOWN */}
            <div className="hidden md:flex flex-col gap-6 animate-marquee-vertical-down">
              {[...col2, ...col2].map((review, idx) => (
                <ReviewCard key={`col2-${review.id}-${idx}`} review={review} />
              ))}
            </div>

            {/* Column 3: Moves UP */}
            <div className="hidden lg:flex flex-col gap-6 animate-marquee-vertical-up">
              {[...col3, ...col3].map((review, idx) => (
                <ReviewCard key={`col3-${review.id}-${idx}`} review={review} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: ITestimonial }) {
  return (
    <div className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 hover:shadow-lg transition-all duration-300 shadow-xs group text-left">
      {/* Rating & Date */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-1">
          {[...Array(review.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          {review.date}
        </span>
      </div>

      {/* Comment text */}
      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic mb-5 font-normal">
        &ldquo;{review.comment}&rdquo;
      </p>

      {/* Patient Footer */}
      <div className="pt-4 border-t border-slate-100">
        <h4 className="text-xs sm:text-sm font-bold text-[#0f172a] tracking-tight">
          {review.patientName}
        </h4>
      </div>
    </div>
  );
}

