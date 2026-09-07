"use client";

import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  delay?: number;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Qidirish...",
  delay = 300,
}: SearchInputProps) {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (internalValue !== value) {
        onChange(internalValue);
      }
    }, delay);

    return () => clearTimeout(handler);
  }, [internalValue, delay, onChange, value]);

  return (
    <div className="relative w-full max-w-xs sm:max-w-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
        <Search className="w-4 h-4" />
      </div>

      <input
        type="text"
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626] transition-all"
      />

      {internalValue && (
        <button
          type="button"
          onClick={() => {
            setInternalValue("");
            onChange("");
          }}
          className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
