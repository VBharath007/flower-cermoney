'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export function Flourish({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`flourish ${className}`}>
      <span />✦ ❀ ✦<span />
    </div>
  );
}

export function Corner({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 90 90" fill="none">
      <path
        d="M5 86V5H86M13 65V13H65M12 34C60 31 54 7 35 15C22 21 41 29 40 13M34 12C31 60 7 54 15 35C21 22 29 41 13 40M20 20C43 22 53 36 57 57C36 53 22 43 20 20Z"
        stroke="currentColor"
      />
      <path d="M20 20L57 57" stroke="currentColor" />
      <circle cx="5" cy="5" r="3" fill="currentColor" />
    </svg>
  );
}

export function Lamp({ className = '' }: { className?: string }) {
  return null;
}

export function Flowers({ className = '' }: { className?: string }) {
  return null;
}

const floralCorners = [
  {
    key: 'tl',
    src: '/images/corner-tl.png',
    alt: 'Top-left corner flower blossom',
    className: '-top-5 -left-5 sm:-top-7 sm:-left-7',
    origin: 'top left',
    rotateStart: -18,
  },
  {
    key: 'tr',
    src: '/images/corner-tr.png',
    alt: 'Top-right corner flower blossom',
    className: '-top-5 -right-5 sm:-top-7 sm:-right-7',
    origin: 'top right',
    rotateStart: 18,
  },
  {
    key: 'bl',
    src: '/images/corner-bl.png',
    alt: 'Bottom-left corner flower blossom',
    className: '-bottom-5 -left-5 sm:-bottom-7 sm:-left-7',
    origin: 'bottom left',
    rotateStart: 18,
  },
  {
    key: 'br',
    src: '/images/corner-br.png',
    alt: 'Bottom-right corner flower blossom',
    className: '-bottom-5 -right-5 sm:-bottom-7 sm:-right-7',
    origin: 'bottom right',
    rotateStart: -18,
  },
];

export function Frame({ active }: { active?: boolean }) {
  const [bloomed, setBloomed] = useState(false);

  useEffect(() => {
    if (active) {
      setBloomed(true);
    }
  }, [active]);

  return (
    <div aria-hidden="true" className="frame pointer-events-none">
      {floralCorners.map((c, i) => (
        <div
          key={c.key}
          className={`absolute pointer-events-none z-20 w-[105px] sm:w-[150px] md:w-[190px] select-none ${c.className}`}
          style={{
            transform: bloomed ? 'scale(1) rotate(0deg)' : `scale(0.85) rotate(${c.rotateStart}deg)`,
            opacity: bloomed ? 1 : 0,
            transformOrigin: c.origin,
            transition: `transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.04}s, opacity 0.5s ease ${i * 0.04}s`,
          }}
        >
          <img
            src={c.src}
            alt={c.alt}
            className="w-full h-auto object-contain"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}

export function Petals() {
  return (
    <div className="petals" aria-hidden="true">
      {Array.from({ length: 16 }, (_, i) => (
        <i
          key={i}
          style={{
            left: `${(i * 37) % 100}%`,
            animationDelay: `${-i * 1.7}s`,
            animationDuration: `${12 + (i % 5) * 2}s`,
          }}
        />
      ))}
    </div>
  );
}

export function TempleBackdrop() {
  return (
    <div className="temple-skyline-backdrop pointer-events-none" aria-hidden="true">
      <div className="temple-ground-fog" />
      <svg
        viewBox="0 0 1200 240"
        preserveAspectRatio="none"
        className="temple-skyline-svg"
      >
        <defs>
          <linearGradient id="templeBodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#011e24" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#001418" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#000b0d" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="gopuramRimGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f5d38077" />
            <stop offset="50%" stopColor="#d5b56d33" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* Left Side Temple Gopuram */}
        <g transform="translate(60, 45)" fill="url(#templeBodyGrad)" stroke="url(#gopuramRimGrad)" strokeWidth="0.8">
          <path d="M70 10 L70 0 M66 12 L74 12" stroke="#f5d38099" strokeWidth="1.2" />
          <polygon points="56,20 84,20 81,45 59,45" />
          <polygon points="51,45 89,45 86,75 54,75" />
          <polygon points="45,75 95,75 92,110 48,110" />
          <polygon points="38,110 102,110 104,195 36,195" />
        </g>

        {/* Center Grand Raja Gopuram (Madurai style) */}
        <g transform="translate(480, 5)" fill="url(#templeBodyGrad)" stroke="url(#gopuramRimGrad)" strokeWidth="0.9">
          {/* Kalasams on top crest */}
          <path d="M102 8 L102 0 M111 8 L111 0 M120 8 L120 0 M129 8 L129 0 M138 8 L138 0" stroke="#f5d380bb" strokeWidth="1.4" />
          {/* Crown barrel-vault roof */}
          <path d="M85 18 Q120 7 155 18 L152 34 L88 34 Z" />
          {/* Tiers 1 to 5 */}
          <polygon points="82,34 158,34 154,58 86,58" />
          <polygon points="76,58 164,58 160,86 80,86" />
          <polygon points="70,86 170,86 166,118 74,118" />
          <polygon points="62,118 178,118 174,154 66,154" />
          <polygon points="54,154 186,154 182,195 58,195" />
          {/* Base Gateway */}
          <path d="M42 195 L198 195 L200 240 L40 240 Z" />
          <path d="M106 240 L106 210 Q120 200 134 210 L134 240 Z" fill="#000e12" stroke="#d5b56d55" />
        </g>

        {/* Right Side Temple Gopuram */}
        <g transform="translate(980, 45)" fill="url(#templeBodyGrad)" stroke="url(#gopuramRimGrad)" strokeWidth="0.8">
          <path d="M70 10 L70 0 M66 12 L74 12" stroke="#f5d38099" strokeWidth="1.2" />
          <polygon points="56,20 84,20 81,45 59,45" />
          <polygon points="51,45 89,45 86,75 54,75" />
          <polygon points="45,75 95,75 92,110 48,110" />
          <polygon points="38,110 102,110 104,195 36,195" />
        </g>
      </svg>
    </div>
  );
}

export function Sparkles() {
  return (
    <div className="welcome-sparkles-container pointer-events-none" aria-hidden="true">
      {Array.from({ length: 22 }, (_, i) => (
        <span
          key={i}
          className="welcome-sparkle"
          style={{
            left: `${(i * 17 + 5) % 94}%`,
            top: `${(i * 21 + 12) % 85}%`,
            animationDelay: `${(i * 0.35) % 5}s`,
            animationDuration: `${3.2 + (i % 4) * 0.8}s`,
          }}
        />
      ))}
    </div>
  );
}
