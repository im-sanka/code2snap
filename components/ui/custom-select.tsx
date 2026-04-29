"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  label: string;
  value: string;
  color?: string; // Optional color indicator for themes
}

interface CustomSelectProps {
  value: string;
  onChange: (val: string) => void;
  options: SelectOption[];
  className?: string;
  buttonClassName?: string;
}

export function CustomSelect({ value, onChange, options, className, buttonClassName }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(o => o.value === value) || options[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={cn("relative", className)} ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn("w-full flex items-center justify-between bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-300 hover:border-slate-700 focus:outline-none focus:border-indigo-500 transition-colors", buttonClassName)}
      >
        <div className="flex items-center gap-2 truncate">
          {selectedOption?.color && (
            <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: selectedOption.color }} />
          )}
          <span className="truncate">{selectedOption?.label}</span>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0 ml-1" />
      </button>

      {isOpen && (
        <div className="absolute z-50 min-w-full w-max mt-1 right-0 sm:left-0 sm:right-auto bg-slate-900 border border-slate-700 rounded-lg shadow-xl shadow-black/80 py-1 max-h-60 overflow-auto scrollbar-thin [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 text-left text-xs transition-colors",
                value === option.value ? "bg-indigo-500/20 text-indigo-300 font-medium" : "text-slate-300 hover:bg-slate-800"
              )}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              <div className="flex items-center gap-2 truncate">
                {option.color && (
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: option.color }} />
                )}
                <span className="truncate">{option.label}</span>
              </div>
              {value === option.value && <Check className="w-3 h-3 text-indigo-400 shrink-0 ml-3" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
