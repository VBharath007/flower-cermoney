'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Sparkles } from 'lucide-react';
import { Flourish } from './Decorations';

interface GratitudeScrollProps {
  active?: boolean;
  onReplay: () => void;
}

export default function GratitudeScroll({ active = true, onReplay }: GratitudeScrollProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Automatically unroll when arriving at this section
  useEffect(() => {
    if (active) {
      // Start in closed roll position, then automatically unroll with majestic royal timing
      setIsOpen(false);
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 450);
      return () => clearTimeout(timer);
    } else {
      setIsOpen(false);
    }
  }, [active]);

  const toggleScroll = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="royal-scroll-wrapper relative z-10 flex flex-col items-center justify-center w-full max-w-[840px] mx-auto px-2 sm:px-6 select-none">
      {/* Interactive status / hint button */}
      <motion.button
        type="button"
        onClick={toggleScroll}
        className="mb-3 px-3.5 py-1 rounded-full border border-[#d5b56d66] bg-[#00242bcc] hover:bg-[#033a44] text-[#f7d688] text-[10px] sm:text-[11px] font-cinzel tracking-[0.2em] uppercase flex items-center gap-1.5 shadow-[0_4px_12px_rgba(0,10,14,0.6)] cursor-pointer transition-all active:scale-95"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        title="Click to roll or unroll scroll"
      >
        <Sparkles size={11} className="text-[#ffd77a]" />
        <span>{isOpen ? 'Royal Scroll • Open (Tap to Close)' : 'Scroll Closed • Tap to Open'}</span>
      </motion.button>

      {/* The Royal Scroll Container */}
      <div className="royal-scroll relative w-full flex flex-col items-center">
        {/* =========================================================
            TOP ROLLER ROD (மேல் உருளை) with Carved Gold Handles
            ========================================================= */}
        <div className="scroll-roller top-roller relative z-30 w-full flex items-center justify-center filter drop-shadow-[0_8px_16px_rgba(0,10,14,0.9)]">
          {/* Left Carved Gold Finial / Handle */}
          <div className="scroll-handle left-handle" aria-hidden="true">
            <svg viewBox="0 0 76 44" className="handle-svg">
              {/* Outer Finial Tip */}
              <path d="M 4 22 C 4 17, 12 15, 18 18 C 22 19, 22 25, 18 26 C 12 29, 4 27, 4 22 Z" fill="url(#goldRodShine)" />
              <circle cx="6" cy="22" r="3.5" fill="url(#goldTipShine)" />
              {/* Primary Turned Sphere / Acorn Knob */}
              <circle cx="28" cy="22" r="10.5" fill="url(#goldKnobShine)" stroke="#805b12" strokeWidth="0.8" />
              {/* Waist Neck Collar */}
              <rect x="38" y="16" width="6" height="12" rx="1.5" fill="url(#goldRodShine)" />
              {/* Secondary Turned Ring Collar */}
              <rect x="44" y="11" width="5" height="22" rx="2" fill="url(#goldRodShine)" stroke="#805b12" strokeWidth="0.6" />
              {/* Gold Filigree Cuff with Ornamental Pattern */}
              <rect x="49" y="7" width="27" height="30" rx="3" fill="url(#goldCuffPattern)" stroke="#ffd77a" strokeWidth="0.9" />
              <line x1="56" y1="8" x2="56" y2="36" stroke="#7a540f" strokeWidth="1" />
              <line x1="67" y1="8" x2="67" y2="36" stroke="#7a540f" strokeWidth="1" />
              <circle cx="61.5" cy="22" r="2.5" fill="#fff5d0" />
            </svg>
          </div>

          {/* Center Cylinder Rod wrapped in Peacock Teal Velvet with Gold Trim */}
          <div className="scroll-rod-center flex-1 relative h-[32px] sm:h-[40px] rounded-sm overflow-hidden shadow-[inset_0_2px_4px_rgba(255,255,255,0.25),0_6px_18px_rgba(0,10,14,0.95)]">
            <div className="rod-texture absolute inset-0" />
            {/* Top specular highlight representing cylindrical light reflection */}
            <div className="absolute top-[3px] inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-[rgba(255,245,208,0.75)] to-transparent" />
            {/* Bottom cylinder shadow */}
            <div className="absolute bottom-0 inset-x-0 h-[4px] bg-gradient-to-t from-[rgba(0,10,12,0.9)] to-transparent" />
            {/* Left and Right Gold Filigree edge rings */}
            <div className="absolute inset-y-0 left-0 w-3.5 border-r border-[#ffd77a] bg-gradient-to-r from-[#ffd978] via-[#e5b74b] to-[#996d1b] shadow-md" />
            <div className="absolute inset-y-0 right-0 w-3.5 border-l border-[#ffd77a] bg-gradient-to-l from-[#ffd978] via-[#e5b74b] to-[#996d1b] shadow-md" />
          </div>

          {/* Right Carved Gold Finial / Handle */}
          <div className="scroll-handle right-handle" aria-hidden="true">
            <svg viewBox="0 0 76 44" className="handle-svg transform scale-x-[-1]">
              <path d="M 4 22 C 4 17, 12 15, 18 18 C 22 19, 22 25, 18 26 C 12 29, 4 27, 4 22 Z" fill="url(#goldRodShine)" />
              <circle cx="6" cy="22" r="3.5" fill="url(#goldTipShine)" />
              <circle cx="28" cy="22" r="10.5" fill="url(#goldKnobShine)" stroke="#805b12" strokeWidth="0.8" />
              <rect x="38" y="16" width="6" height="12" rx="1.5" fill="url(#goldRodShine)" />
              <rect x="44" y="11" width="5" height="22" rx="2" fill="url(#goldRodShine)" stroke="#805b12" strokeWidth="0.6" />
              <rect x="49" y="7" width="27" height="30" rx="3" fill="url(#goldCuffPattern)" stroke="#ffd77a" strokeWidth="0.9" />
              <line x1="56" y1="8" x2="56" y2="36" stroke="#7a540f" strokeWidth="1" />
              <line x1="67" y1="8" x2="67" y2="36" stroke="#7a540f" strokeWidth="1" />
              <circle cx="61.5" cy="22" r="2.5" fill="#fff5d0" />
            </svg>
          </div>
        </div>

        {/* =========================================================
            PARCHMENT BODY (பட்டுச் சுருள் ஏடு) Unrolls Vertically
            ========================================================= */}
        <motion.div
          className="scroll-parchment-body relative z-20 w-[94%] sm:w-[92%] overflow-hidden"
          initial={false}
          animate={{
            height: isOpen ? 'auto' : 0,
            opacity: isOpen ? 1 : 0.35,
          }}
          transition={{
            height: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.5 },
          }}
        >
          {/* Royal Peacock Teal Silk & Velvet Parchment Canvas */}
          <div className="parchment-canvas relative p-5 sm:p-9 md:p-11 text-center shadow-[inset_0_0_90px_rgba(0,10,14,0.95),0_20px_50px_rgba(0,12,16,0.85)]">
            {/* Top roller cast shadow onto fabric */}
            <div className="absolute top-0 inset-x-0 h-6 bg-gradient-to-b from-[rgba(0,8,10,0.9)] to-transparent pointer-events-none z-10" />
            {/* Bottom roller cast shadow onto fabric */}
            <div className="absolute bottom-0 inset-x-0 h-6 bg-gradient-to-t from-[rgba(0,8,10,0.9)] to-transparent pointer-events-none z-10" />

            {/* Ornate Gold Filigree Border matching Reference Image */}
            <div className="parchment-gold-border absolute inset-3 sm:inset-5 pointer-events-none border border-[#d5b56d88]">
              {/* Outer Inset Thin Accent Line */}
              <div className="absolute inset-1 border border-[#ffd77a33]" />

              {/* Four Ornate Corner Baroque Filigrees */}
              <svg viewBox="0 0 60 60" className="parchment-corner corner-tl" aria-hidden="true">
                {/* Baroque outer arc */}
                <path d="M 3 3 L 56 3 C 36 10, 24 22, 20 42 L 20 57 C 14 38, 8 22, 3 3 Z" fill="url(#goldRodShine)" opacity="0.9" />
                {/* Inner floral scroll swirls */}
                <path d="M 6 6 Q 28 6 36 24 Q 24 36 6 6 Z" fill="none" stroke="#fff1b8" strokeWidth="1" />
                <circle cx="14" cy="14" r="3.5" fill="#ffd77a" />
                <circle cx="24" cy="10" r="2" fill="#d5b56d" />
                <circle cx="10" cy="24" r="2" fill="#d5b56d" />
                <path d="M 4 28 C 14 26, 26 14, 28 4" fill="none" stroke="#ffd77a" strokeWidth="1.2" />
              </svg>

              <svg viewBox="0 0 60 60" className="parchment-corner corner-tr" aria-hidden="true">
                <path d="M 3 3 L 56 3 C 36 10, 24 22, 20 42 L 20 57 C 14 38, 8 22, 3 3 Z" fill="url(#goldRodShine)" opacity="0.9" />
                <path d="M 6 6 Q 28 6 36 24 Q 24 36 6 6 Z" fill="none" stroke="#fff1b8" strokeWidth="1" />
                <circle cx="14" cy="14" r="3.5" fill="#ffd77a" />
                <circle cx="24" cy="10" r="2" fill="#d5b56d" />
                <circle cx="10" cy="24" r="2" fill="#d5b56d" />
                <path d="M 4 28 C 14 26, 26 14, 28 4" fill="none" stroke="#ffd77a" strokeWidth="1.2" />
              </svg>

              <svg viewBox="0 0 60 60" className="parchment-corner corner-bl" aria-hidden="true">
                <path d="M 3 3 L 56 3 C 36 10, 24 22, 20 42 L 20 57 C 14 38, 8 22, 3 3 Z" fill="url(#goldRodShine)" opacity="0.9" />
                <path d="M 6 6 Q 28 6 36 24 Q 24 36 6 6 Z" fill="none" stroke="#fff1b8" strokeWidth="1" />
                <circle cx="14" cy="14" r="3.5" fill="#ffd77a" />
                <circle cx="24" cy="10" r="2" fill="#d5b56d" />
                <circle cx="10" cy="24" r="2" fill="#d5b56d" />
                <path d="M 4 28 C 14 26, 26 14, 28 4" fill="none" stroke="#ffd77a" strokeWidth="1.2" />
              </svg>

              <svg viewBox="0 0 60 60" className="parchment-corner corner-br" aria-hidden="true">
                <path d="M 3 3 L 56 3 C 36 10, 24 22, 20 42 L 20 57 C 14 38, 8 22, 3 3 Z" fill="url(#goldRodShine)" opacity="0.9" />
                <path d="M 6 6 Q 28 6 36 24 Q 24 36 6 6 Z" fill="none" stroke="#fff1b8" strokeWidth="1" />
                <circle cx="14" cy="14" r="3.5" fill="#ffd77a" />
                <circle cx="24" cy="10" r="2" fill="#d5b56d" />
                <circle cx="10" cy="24" r="2" fill="#d5b56d" />
                <path d="M 4 28 C 14 26, 26 14, 28 4" fill="none" stroke="#ffd77a" strokeWidth="1.2" />
              </svg>

              {/* Center Edge Gold Filigree Tabs (Matching Reference Image) */}
              <div className="parchment-side-tab tab-left" aria-hidden="true">
                <svg viewBox="0 0 20 42">
                  <path d="M 0 0 C 18 8, 20 21, 20 21 C 20 21, 18 34, 0 42 Z" fill="url(#goldRodShine)" stroke="#ffd77a" strokeWidth="0.8" />
                  <circle cx="8" cy="21" r="2.5" fill="#fff8db" />
                </svg>
              </div>
              <div className="parchment-side-tab tab-right" aria-hidden="true">
                <svg viewBox="0 0 20 42">
                  <path d="M 20 0 C 2 8, 0 21, 0 21 C 0 21, 2 34, 20 42 Z" fill="url(#goldRodShine)" stroke="#ffd77a" strokeWidth="0.8" />
                  <circle cx="12" cy="21" r="2.5" fill="#fff8db" />
                </svg>
              </div>
            </div>

            {/* Gratitude Message Contents inside the Scroll */}
            <motion.div
              initial={false}
              animate={{
                opacity: isOpen ? 1 : 0,
                y: isOpen ? 0 : 25,
                scale: isOpen ? 1 : 0.96,
              }}
              transition={{
                duration: 0.9,
                delay: isOpen ? 0.35 : 0,
                ease: 'easeOut',
              }}
              className="relative z-10 max-w-[620px] mx-auto py-2 sm:py-4"
            >
              {/* Royal Kalasam / Lotus Motif */}
              <div className="mx-auto mb-2 flex items-center justify-center">
                <svg viewBox="0 0 36 20" className="w-9 h-5 text-[#ffd77a]" aria-hidden="true">
                  <path d="M18 1 C19.5 5, 21 11, 18 18 C15 11, 16.5 5, 18 1 Z" fill="currentColor" />
                  <path d="M18 7 C23 8, 28 11, 31 16 C25 17, 21 14, 18 11 Z" fill="currentColor" opacity="0.85" />
                  <path d="M18 7 C13 8, 8 11, 5 16 C11 17, 15 14, 18 11 Z" fill="currentColor" opacity="0.85" />
                  <circle cx="18" cy="18" r="1.5" fill="#fff" />
                </svg>
              </div>

              {/* Elegant Script Header */}
              <p className="script !text-[clamp(28px,4vw,44px)] !text-[#f7d688] mb-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                With love & gratitude
              </p>

              {/* Gold Foil Main Heading */}
              <h2 className="!text-[clamp(22px,3vw,36px)] !text-[#fff8e3] tracking-[0.09em] font-medium uppercase drop-shadow-[0_2px_10px_rgba(213,181,109,0.5)]">
                Blessings & Best Wishes
              </h2>

              <Flourish />

              {/* Heartfelt Message */}
              <p className="message !text-[clamp(14px,1.9vw,18px)] !text-[#f4e6cb] !leading-relaxed max-w-[500px] mx-auto mb-3 font-cinzel">
                Your presence, wishes and blessings
                <br />
                mean the world to us.
              </p>

              {/* Grand Thank You Script */}
              <p className="script thank-you !text-[clamp(38px,5.5vw,56px)] !text-[#ffd77a] !mt-2 drop-shadow-[0_2px_14px_rgba(255,215,122,0.6)]">
                Thank you!
              </p>

              {/* Replay Invitation Action Button inside the Scroll */}
              <div className="mt-5 sm:mt-6 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={onReplay}
                  className="royal-replay-btn inline-flex items-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full border border-[#ffd77a] bg-gradient-to-r from-[#032e35] via-[#054955] to-[#032e35] hover:from-[#065b6a] hover:to-[#065b6a] text-[#fff2c6] text-[11px] sm:text-[12px] font-cinzel font-semibold tracking-[0.18em] uppercase shadow-[0_6px_22px_rgba(0,14,18,0.75),0_0_16px_rgba(213,181,109,0.35)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <RotateCcw size={15} className="text-[#ffd77a]" />
                  <span>Replay Invitation</span>
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* =========================================================
            BOTTOM ROLLER ROD (கீழ் உருளை) Moves Down With Scroll
            ========================================================= */}
        <motion.div
          className="scroll-roller bottom-roller relative z-30 w-full flex items-center justify-center -mt-[1px] filter drop-shadow-[0_12px_24px_rgba(0,10,14,0.95)]"
          initial={false}
          animate={{
            y: isOpen ? 0 : 0,
          }}
        >
          {/* Left Carved Gold Finial / Handle */}
          <div className="scroll-handle left-handle" aria-hidden="true">
            <svg viewBox="0 0 76 44" className="handle-svg">
              <path d="M 4 22 C 4 17, 12 15, 18 18 C 22 19, 22 25, 18 26 C 12 29, 4 27, 4 22 Z" fill="url(#goldRodShine)" />
              <circle cx="6" cy="22" r="3.5" fill="url(#goldTipShine)" />
              <circle cx="28" cy="22" r="10.5" fill="url(#goldKnobShine)" stroke="#805b12" strokeWidth="0.8" />
              <rect x="38" y="16" width="6" height="12" rx="1.5" fill="url(#goldRodShine)" />
              <rect x="44" y="11" width="5" height="22" rx="2" fill="url(#goldRodShine)" stroke="#805b12" strokeWidth="0.6" />
              <rect x="49" y="7" width="27" height="30" rx="3" fill="url(#goldCuffPattern)" stroke="#ffd77a" strokeWidth="0.9" />
              <line x1="56" y1="8" x2="56" y2="36" stroke="#7a540f" strokeWidth="1" />
              <line x1="67" y1="8" x2="67" y2="36" stroke="#7a540f" strokeWidth="1" />
              <circle cx="61.5" cy="22" r="2.5" fill="#fff5d0" />
            </svg>
          </div>

          {/* Center Cylinder Rod wrapped in Peacock Teal Velvet with Gold Trim */}
          <div className="scroll-rod-center flex-1 relative h-[32px] sm:h-[40px] rounded-sm overflow-hidden shadow-[inset_0_2px_4px_rgba(255,255,255,0.25),0_8px_20px_rgba(0,10,14,0.95)]">
            <div className="rod-texture absolute inset-0" />
            <div className="absolute top-[3px] inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-[rgba(255,245,208,0.75)] to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-[4px] bg-gradient-to-t from-[rgba(0,10,12,0.9)] to-transparent" />
            <div className="absolute inset-y-0 left-0 w-3.5 border-r border-[#ffd77a] bg-gradient-to-r from-[#ffd978] via-[#e5b74b] to-[#996d1b] shadow-md" />
            <div className="absolute inset-y-0 right-0 w-3.5 border-l border-[#ffd77a] bg-gradient-to-l from-[#ffd978] via-[#e5b74b] to-[#996d1b] shadow-md" />
          </div>

          {/* Right Carved Gold Finial / Handle */}
          <div className="scroll-handle right-handle" aria-hidden="true">
            <svg viewBox="0 0 76 44" className="handle-svg transform scale-x-[-1]">
              <path d="M 4 22 C 4 17, 12 15, 18 18 C 22 19, 22 25, 18 26 C 12 29, 4 27, 4 22 Z" fill="url(#goldRodShine)" />
              <circle cx="6" cy="22" r="3.5" fill="url(#goldTipShine)" />
              <circle cx="28" cy="22" r="10.5" fill="url(#goldKnobShine)" stroke="#805b12" strokeWidth="0.8" />
              <rect x="38" y="16" width="6" height="12" rx="1.5" fill="url(#goldRodShine)" />
              <rect x="44" y="11" width="5" height="22" rx="2" fill="url(#goldRodShine)" stroke="#805b12" strokeWidth="0.6" />
              <rect x="49" y="7" width="27" height="30" rx="3" fill="url(#goldCuffPattern)" stroke="#ffd77a" strokeWidth="0.9" />
              <line x1="56" y1="8" x2="56" y2="36" stroke="#7a540f" strokeWidth="1" />
              <line x1="67" y1="8" x2="67" y2="36" stroke="#7a540f" strokeWidth="1" />
              <circle cx="61.5" cy="22" r="2.5" fill="#fff5d0" />
            </svg>
          </div>
        </motion.div>

        {/* Golden Ribbon Clasp (Visible when scroll is closed) */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.3 }}
              className="absolute z-40 pointer-events-none flex flex-col items-center justify-center top-1/2 -translate-y-1/2"
            >
              <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#b58b2e] via-[#ffd978] to-[#b58b2e] text-[#1a1204] font-cinzel font-bold text-[11px] tracking-[0.25em] uppercase shadow-[0_4px_16px_rgba(0,0,0,0.8),0_0_12px_rgba(255,215,122,0.8)] border border-[#fff2b8] flex items-center gap-1.5">
                <Sparkles size={12} className="text-[#593d05]" />
                <span>Royal Scroll</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* SVG Global Definitions for Golden Handle Gradients & Patterns */}
      <svg width="0" height="0" className="absolute">
        <defs>
          {/* Rod Metallic Gold Cylindrical Gradient */}
          <linearGradient id="goldRodShine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#875f14" />
            <stop offset="25%" stopColor="#ffd978" />
            <stop offset="50%" stopColor="#fff8e0" />
            <stop offset="75%" stopColor="#d5a643" />
            <stop offset="100%" stopColor="#5e4108" />
          </linearGradient>

          {/* Knob Spherical 3D Radial Gradient */}
          <radialGradient id="goldKnobShine" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#ffd978" />
            <stop offset="70%" stopColor="#bd8928" />
            <stop offset="100%" stopColor="#4f3506" />
          </radialGradient>

          {/* Tip Radial Gradient */}
          <radialGradient id="goldTipShine" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#f3cc69" />
            <stop offset="100%" stopColor="#7a520c" />
          </radialGradient>

          {/* Gold Filigree Cuff Pattern Gradient */}
          <linearGradient id="goldCuffPattern" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7a520c" />
            <stop offset="20%" stopColor="#ffd978" />
            <stop offset="50%" stopColor="#fff8db" />
            <stop offset="80%" stopColor="#c5942e" />
            <stop offset="100%" stopColor="#543706" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
