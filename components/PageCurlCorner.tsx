'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PageCurlCornerProps {
  onClick: () => void;
  visible?: boolean;
}

export default function PageCurlCorner({ onClick, visible = true }: PageCurlCornerProps) {
  if (!visible) return null;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label="Turn to next page"
      className="absolute bottom-0 right-0 z-30 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 cursor-pointer select-none focus:outline-none group pointer-events-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full overflow-visible drop-shadow-[0_8px_20px_rgba(0,0,0,0.7)]"
      >
        <defs>
          {/* Deep shadow cast by the curl onto the page below */}
          <radialGradient id="curlUnderShadow" cx="80%" cy="80%" r="70%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.8" />
            <stop offset="45%" stopColor="#000000" stopOpacity="0.45" />
            <stop offset="80%" stopColor="#000000" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* Golden metallic gradient along the backface of the curled corner */}
          <linearGradient id="curlPaperGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#03252a" />
            <stop offset="25%" stopColor="#08424a" />
            <stop offset="48%" stopColor="#f7d988" />
            <stop offset="58%" stopColor="#fff8e7" />
            <stop offset="70%" stopColor="#d5a643" />
            <stop offset="88%" stopColor="#0c4a54" />
            <stop offset="100%" stopColor="#021c21" />
          </linearGradient>

          {/* Cylindrical shine highlight across the curved spine */}
          <linearGradient id="curlShine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* 1. Underlying Cast Shadow */}
        <path
          d="M 22 100 Q 65 65 100 22 L 100 100 Z"
          fill="url(#curlUnderShadow)"
          opacity="0.9"
        />

        {/* 2. Curled Flap (The turned corner fold) */}
        <path
          d="M 25 100 Q 62 62 100 25 Q 70 70 25 100 Z"
          fill="url(#curlPaperGrad)"
          stroke="#ffd77a"
          strokeWidth="0.8"
        />

        {/* 3. Surface curved highlight */}
        <path
          d="M 30 100 Q 65 65 100 30 Q 72 72 30 100 Z"
          fill="url(#curlShine)"
          opacity="0.5"
        />

        {/* 4. Elegant gold corner accent / Turn hint */}
        <g transform="translate(68, 68) scale(0.65)" className="transition-transform group-hover:translate-x-1 group-hover:translate-y-1">
          <circle cx="12" cy="12" r="14" fill="#00282ee8" stroke="#d5b56d88" strokeWidth="1.2" />
          <path
            d="M 8 12 L 16 12 M 12 8 L 16 12 L 12 16"
            stroke="#f7d688"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </motion.button>
  );
}
