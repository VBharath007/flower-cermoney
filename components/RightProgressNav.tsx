'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface SectionItem {
  id: string;
  name: string;
}

export const SECTIONS: SectionItem[] = [
  { id: 'section-0', name: 'Opening Invitation' },
  { id: 'section-1', name: 'Meet the Couple' },
  { id: 'section-2', name: 'The Flower Ceremony Invitation' },
  { id: 'section-3', name: 'Ceremony Details' },
  { id: 'section-4', name: 'Flower Ceremony Animation / Video' },
  { id: 'section-5', name: 'Family & Gratitude' },
];

interface RightProgressNavProps {
  active: number;
  onSelect: (index: number) => void;
}

export default function RightProgressNav({ active, onSelect }: RightProgressNavProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredArrow, setHoveredArrow] = useState<'top' | 'bottom' | null>(null);

  const canGoDown = active < SECTIONS.length - 1;
  const canGoUp = active > 0;

  return (
    <nav
      className="fixed right-2.5 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center select-none"
      aria-label="Section progress navigation"
    >
      {/* Decorative vertical golden guide line */}
      <div
        className="absolute top-8 bottom-8 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-[#d5b56d35] to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* TOP ARROW: Points down (↓) to descend to next section */}
      <div
        className="relative flex items-center justify-center mb-3 sm:mb-3.5 group"
        onMouseEnter={() => setHoveredArrow('top')}
        onMouseLeave={() => setHoveredArrow(null)}
      >
        <AnimatePresence>
          {hoveredArrow === 'top' && canGoDown && (
            <motion.div
              role="tooltip"
              initial={{ opacity: 0, x: 8, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 6, scale: 0.96 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="hidden md:flex absolute right-full mr-3.5 top-1/2 -translate-y-1/2 pointer-events-none items-center z-50"
            >
              <div className="relative px-3 py-1.5 rounded-md bg-[#002228f0] border border-[#d5b56d88] shadow-[0_4px_20px_rgba(0,0,0,0.65),0_0_12px_rgba(213,181,109,0.2)] backdrop-blur-md whitespace-nowrap">
                <span className="font-['Cinzel',serif] text-[11px] font-medium tracking-[0.08em] text-[#fff2c8] drop-shadow-xs">
                  Next Section ↓
                </span>
                <div
                  className="absolute top-1/2 -right-[5px] -translate-y-1/2 w-2 h-2 rotate-45 bg-[#002228f0] border-t border-r border-[#d5b56d88]"
                  aria-hidden="true"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => canGoDown && onSelect(active + 1)}
          disabled={!canGoDown}
          aria-label="Next section (scroll down)"
          className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#d5b56d88] bg-[#00282ee8] text-[#f7d688] flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:border-[#ffd77a] hover:bg-[#06444d] hover:text-[#fff5db] hover:shadow-[0_0_12px_rgba(247,214,136,0.5)] active:scale-90 disabled:opacity-25 disabled:cursor-default disabled:hover:border-[#d5b56d88] disabled:hover:bg-[#00282ee8] disabled:hover:shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd77a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#01272e]"
        >
          <ChevronDown size={17} strokeWidth={2.4} className="transition-transform group-hover:translate-y-0.5" />
        </button>
      </div>

      {/* THE 6 PROGRESS DOTS */}
      <div className="relative flex flex-col items-center gap-3 sm:gap-3.5 md:gap-4 my-0.5">
        {SECTIONS.map((section, index) => {
          const isActive = active === index;
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={section.id}
              className="relative flex items-center justify-center group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Desktop Hover Tooltip */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    role="tooltip"
                    id={`tooltip-${index}`}
                    initial={{ opacity: 0, x: 8, scale: 0.96 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 6, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="hidden md:flex absolute right-full mr-3.5 top-1/2 -translate-y-1/2 pointer-events-none items-center z-50"
                  >
                    <div className="relative px-3 py-1.5 rounded-md bg-[#002228f0] border border-[#d5b56d88] shadow-[0_4px_20px_rgba(0,0,0,0.65),0_0_12px_rgba(213,181,109,0.2)] backdrop-blur-md whitespace-nowrap">
                      <span className="font-['Cinzel',serif] text-[11px] font-medium tracking-[0.08em] text-[#fff2c8] drop-shadow-xs">
                        {section.name}
                      </span>
                      {/* Subtle Arrow pointing to the dot */}
                      <div
                        className="absolute top-1/2 -right-[5px] -translate-y-1/2 w-2 h-2 rotate-45 bg-[#002228f0] border-t border-r border-[#d5b56d88]"
                        aria-hidden="true"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Dot Button */}
              <button
                type="button"
                onClick={() => onSelect(index)}
                onFocus={() => setHoveredIndex(index)}
                onBlur={() => setHoveredIndex(null)}
                aria-label={`Go to section ${index + 1}: ${section.name}`}
                aria-describedby={`tooltip-${index}`}
                aria-current={isActive ? 'step' : undefined}
                className="relative flex items-center justify-center p-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd77a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#01272e] transition-transform active:scale-90"
              >
                {/* Active Outer Ring / Glow Indicator */}
                {isActive && (
                  <motion.span
                    layoutId="activeDotRing"
                    className="absolute inset-0.5 rounded-full border border-[#f7d688]/80 shadow-[0_0_10px_rgba(247,214,136,0.6)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                )}

                {/* The Dot Core */}
                <span
                  className={`block rounded-full transition-all duration-300 ease-out ${
                    isActive
                      ? 'w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gradient-to-tr from-[#d5a643] via-[#ffd77a] to-[#fff5db] border border-[#fff2b2] shadow-[0_0_10px_#f7d688,0_0_4px_#ffd77a] scale-105'
                      : 'w-2 h-2 sm:w-2.5 sm:h-2.5 border border-[#d5b56d88] bg-[#00282e77] hover:border-[#ffd77a] hover:bg-[#d5b56d55] hover:scale-125'
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>

      {/* BOTTOM ARROW: Points up (↑) to ascend to previous section */}
      <div
        className="relative flex items-center justify-center mt-3 sm:mt-3.5 group"
        onMouseEnter={() => setHoveredArrow('bottom')}
        onMouseLeave={() => setHoveredArrow(null)}
      >
        <AnimatePresence>
          {hoveredArrow === 'bottom' && canGoUp && (
            <motion.div
              role="tooltip"
              initial={{ opacity: 0, x: 8, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 6, scale: 0.96 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="hidden md:flex absolute right-full mr-3.5 top-1/2 -translate-y-1/2 pointer-events-none items-center z-50"
            >
              <div className="relative px-3 py-1.5 rounded-md bg-[#002228f0] border border-[#d5b56d88] shadow-[0_4px_20px_rgba(0,0,0,0.65),0_0_12px_rgba(213,181,109,0.2)] backdrop-blur-md whitespace-nowrap">
                <span className="font-['Cinzel',serif] text-[11px] font-medium tracking-[0.08em] text-[#fff2c8] drop-shadow-xs">
                  Previous Section ↑
                </span>
                <div
                  className="absolute top-1/2 -right-[5px] -translate-y-1/2 w-2 h-2 rotate-45 bg-[#002228f0] border-t border-r border-[#d5b56d88]"
                  aria-hidden="true"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => canGoUp && onSelect(active - 1)}
          disabled={!canGoUp}
          aria-label="Previous section (scroll up)"
          className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#d5b56d88] bg-[#00282ee8] text-[#f7d688] flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:border-[#ffd77a] hover:bg-[#06444d] hover:text-[#fff5db] hover:shadow-[0_0_12px_rgba(247,214,136,0.5)] active:scale-90 disabled:opacity-25 disabled:cursor-default disabled:hover:border-[#d5b56d88] disabled:hover:bg-[#00282ee8] disabled:hover:shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd77a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#01272e]"
        >
          <ChevronUp size={17} strokeWidth={2.4} className="transition-transform group-hover:-translate-y-0.5" />
        </button>
      </div>
    </nav>
  );
}
