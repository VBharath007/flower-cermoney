'use client';

import React from 'react';

export default function PageBackface() {
  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none select-none flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#021f25] via-[#032e36] to-[#01171c] border-2 border-[#d5b56d55]"
      style={{
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: 'rotateY(180deg)',
      }}
      aria-hidden="true"
    >
      {/* Decorative background watermark aura */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(213,181,109,0.12)_0%,transparent_75%)]" />

      {/* Luxury gold filigree inner frame */}
      <div className="relative z-10 w-full h-full max-w-[700px] max-h-[500px] border border-[#d5b56d33] rounded-sm flex flex-col items-center justify-center p-6">
        {/* Subtle corner flourishes */}
        <span className="absolute top-3 left-3 text-[#d5b56d66] text-xs font-serif">✦</span>
        <span className="absolute top-3 right-3 text-[#d5b56d66] text-xs font-serif">✦</span>
        <span className="absolute bottom-3 left-3 text-[#d5b56d66] text-xs font-serif">✦</span>
        <span className="absolute bottom-3 right-3 text-[#d5b56d66] text-xs font-serif">✦</span>

        {/* Monogram emblem */}
        <div className="w-16 h-16 rounded-full border border-[#d5b56d88] flex items-center justify-center bg-[#01252be8] shadow-[0_0_20px_rgba(213,181,109,0.2)] mb-3">
          <span className="font-['Cinzel',serif] text-base text-[#f7d688] font-bold tracking-widest">
            K & T
          </span>
        </div>

        <p className="font-['Great_Vibes',cursive] text-2xl sm:text-3xl text-[#f7d688cc] my-1">
          Flower Ceremony
        </p>

        <p className="font-['Cinzel',serif] text-[10px] sm:text-xs text-[#d5b56d99] tracking-[0.25em] uppercase mt-2">
          November 16, 2026 • Madurai
        </p>
      </div>
    </div>
  );
}
