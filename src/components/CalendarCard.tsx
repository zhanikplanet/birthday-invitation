import React from "react";
import { Heart, Calendar as CalendarIcon } from "lucide-react";

export default function CalendarCard() {
  // June 2026 days starting Monday (Monday = 1st, Sunday = 7th)
  const juneDays = Array.from({ length: 30 }, (_, i) => i + 1);
  const weekDays = ["ДС", "СС", "СР", "БС", "ЖМ", "СН", "ЖБ"]; // Kazakh: Mon, Tue, Wed, Thu, Fri, Sat, Sun

  return (
    <div className="w-full flex flex-col items-center py-10 px-4 sm:px-6 bg-[#FAF6EE]/50 rounded-2xl border border-amber-900/10 shadow-sm relative overflow-hidden">
      
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-amber-800/20 rounded-tl-xl" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-amber-800/20 rounded-tr-xl" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-amber-800/20 rounded-bl-xl" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-amber-800/20 rounded-br-xl" />

      {/* Title */}
      <div className="flex items-center gap-2 mb-6">
        <CalendarIcon className="w-5 h-5 text-amber-600" />
        <span className="font-sans font-semibold tracking-widest text-[#5C4D3C] text-sm uppercase">
          Мерекелік Күнтізбе
        </span>
      </div>

      <h3 className="font-display text-2xl sm:text-3xl text-amber-900 font-medium mb-6 tracking-wide">
        Маусым 2026
      </h3>

      {/* Calendar Grid */}
      <div className="w-full max-w-sm">
        <div className="grid grid-cols-7 gap-3 mb-4 text-center">
          {weekDays.map((day) => (
            <span
              key={day}
              className="text-xs font-semibold text-amber-900/50 tracking-wider"
            >
              {day}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2 text-center text-sm font-sans">
          {juneDays.map((day) => {
            const isTarget = day === 3;
            return (
              <div
                key={day}
                className="relative py-2 flex items-center justify-center hover:scale-105 transition-transform"
              >
                {isTarget ? (
                  <>
                    {/* Ring selection */}
                    <div className="absolute inset-0 bg-amber-500/10 rounded-full scale-110 pointer-events-none border border-amber-500 animate-pulse flex items-center justify-center">
                      <div className="w-full h-full border-2 border-amber-300 opacity-60 rounded-full scale-125" />
                    </div>
                    <span className="relative z-10 font-bold text-amber-900 drop-shadow-sm">
                      {day}
                    </span>
                    <Heart className="absolute -top-1 -right-1 w-3 h-3 text-red-500 fill-red-500 animate-[bounce_1.5s_infinite]" />
                  </>
                ) : (
                  <span className="text-[#6B5A47] font-medium">{day}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
