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
      className="absolute bottom-0 right-0 z-30 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 cursor-pointer select-none focus:outline-none group pointer-events-auto"
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.88 }}
      transition={{ duration: 0.35 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg
        viewBox="0 0 120 120"
        className="w-full h-full overflow-visible drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
      >
        <defs>
          {/* Deep realistic under-shadow cast on the page below */}
          <radialGradient id="curlUnderShadowRealistic" cx="85%" cy="85%" r="75%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.85" />
            <stop offset="35%" stopColor="#000000" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#000000" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* Luxury gold & dark teal shaded curl underside matching the reference curve */}
          <linearGradient id="curlFoldGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#011b20" />
            <stop offset="20%" stopColor="#02333b" />
            <stop offset="45%" stopColor="#d5a643" />
            <stop offset="55%" stopColor="#fff8e7" />
            <stop offset="68%" stopColor="#f7d988" />
            <stop offset="85%" stopColor="#053c45" />
            <stop offset="100%" stopColor="#001a1e" />
          </linearGradient>

          {/* Curved specular spine shine */}
          <linearGradient id="curlSpineShine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* 1. Underlying Cast Shadow matching reference */}
        <path
          d="M 25 120 Q 75 75 120 25 L 120 120 Z"
          fill="url(#curlUnderShadowRealistic)"
        />

        {/* 2. Curled Paper Flap with precise quadratic bezier curve */}
        <path
          d="M 28 120 Q 76 76 120 28 Q 82 82 28 120 Z"
          fill="url(#curlFoldGradient)"
          stroke="#ffd77a"
          strokeWidth="1"
        />

        {/* 3. Surface Light Reflection along the curve */}
        <path
          d="M 34 120 Q 79 79 120 34 Q 85 85 34 120 Z"
          fill="url(#curlSpineShine)"
          opacity="0.45"
        />

        {/* 4. Interactive Turn Indicator badge with subtle animated arrow */}
        <g transform="translate(80, 80) scale(0.72)" className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1">
          <circle cx="14" cy="14" r="16" fill="#002228ee" stroke="#f7d688" strokeWidth="1.4" />
          <path
            d="M 9 14 L 19 14 M 14 9 L 19 14 L 14 19"
            stroke="#f7d688"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </motion.button>
  );
}
