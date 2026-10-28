'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { CalendarDays, Clock3, MapPin, RotateCcw, ExternalLink } from 'lucide-react';
import { invitation as data } from '@/lib/invitation';

// ============================================================================
// BOTANICAL JASMINE SVG (Mogra / Madurai Malli)
// ============================================================================

function JasmineBlossom({
  size = 40,
  bloom = 1,
  className = '',
}: {
  size?: number;
  bloom?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`overflow-visible filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.45)] ${className}`}
    >
      <g stroke="#264b22" strokeWidth="2" fill="#366b30">
        <path d="M50 50 L43 74 L50 67 L57 74 Z" />
        <path d="M50 50 L32 60 L41 54 Z" />
        <path d="M50 50 L68 60 L59 54 Z" />
      </g>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <motion.path
          key={`outer-${i}`}
          d="M50 50 C41 33, 41 15, 50 8 C59 15, 59 33, 50 50 Z"
          fill="url(#jasminePetalGrad)"
          stroke="#e3dac6"
          strokeWidth="0.75"
          transform={`rotate(${angle} 50 50)`}
          initial={false}
          animate={{
            scale: 0.35 + 0.65 * bloom,
            rotate: angle + (1 - bloom) * 25,
          }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: '50px 50px' }}
        />
      ))}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => (
        <motion.path
          key={`inner-${i}`}
          d="M50 50 C44 36, 44 22, 50 16 C56 22, 56 36, 50 50 Z"
          fill="#ffffff"
          stroke="#ebe3d3"
          strokeWidth="0.6"
          transform={`rotate(${angle} 50 50)`}
          initial={false}
          animate={{
            scale: 0.25 + 0.75 * bloom,
          }}
          transition={{ duration: 0.75, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: '50px 50px' }}
        />
      ))}
      <circle cx="50" cy="50" r="6" fill="#ce9e49" />
      <circle cx="50" cy="50" r="3" fill="#f9e28f" />
      <defs>
        <linearGradient id="jasminePetalGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#faf7f0" />
          <stop offset="100%" stopColor="#ede4d0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function JasmineBud({
  size = 28,
  rotate = 0,
  className = '',
}: {
  size?: number;
  rotate?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size * 1.3}
      viewBox="0 0 60 80"
      className={`overflow-visible filter drop-shadow-[0_3px_6px_rgba(0,0,0,0.35)] ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <path d="M30 76 Q28 58 30 46" stroke="#254721" strokeWidth="3" fill="none" />
      <path
        d="M30 50 L18 36 L26 44 L30 30 L34 44 L42 36 L30 50 Z"
        fill="#366b30"
        stroke="#22421f"
        strokeWidth="1"
      />
      <ellipse cx="30" cy="23" rx="10" ry="17" fill="url(#budGrad)" stroke="#e4dbca" strokeWidth="0.8" />
      <path d="M26 9 Q30 5 34 9" stroke="#9ec987" strokeWidth="1.2" fill="none" />
      <defs>
        <linearGradient id="budGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="65%" stopColor="#f8f4ea" />
          <stop offset="100%" stopColor="#d3e7c5" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function JasmineLeaf({
  width = 40,
  height = 20,
  rotate = 0,
  className = '',
}: {
  width?: number;
  height?: number;
  rotate?: number;
  className?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 80 40"
      className={`overflow-visible filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.3)] ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <path
        d="M4 20 C24 2, 56 2, 76 20 C56 38, 24 38, 4 20 Z"
        fill="url(#jasmineLeafGrad)"
        stroke="#16381b"
        strokeWidth="1"
      />
      <path d="M4 20 Q40 20 76 20" stroke="#488250" strokeWidth="1.2" fill="none" opacity="0.8" />
      <defs>
        <linearGradient id="jasmineLeafGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#173d1f" />
          <stop offset="50%" stopColor="#245a2d" />
          <stop offset="100%" stopColor="#377341" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function EnvelopeInvitation({ active }: { active?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Animation sequence steps:
  // 0: Closed envelope pocket (initial state as user lands)
  // 1: Top flap opens 180° upward in 3D
  // 2: Invitation card slides smoothly up out of pocket
  // 3: Envelope fades away, and card glides down to center showcase, fitted & spotlighted!
  const [step, setStep] = useState(0);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const startSequence = () => {
    clearAllTimers();
    setStep(0); // initial closed pocket

    // 1. Flap opens upward (at 350ms)
    timersRef.current.push(
      setTimeout(() => {
        setStep(1);
      }, 350)
    );

    // 2. Card slides up out of pocket (at 1000ms)
    timersRef.current.push(
      setTimeout(() => {
        setStep(2);
      }, 1000)
    );

    // 3. Envelope dissolves, card glides right into the center of the screen, fitted and prominent!
    timersRef.current.push(
      setTimeout(() => {
        setStep(3);
      }, 1800)
    );
  };

  useEffect(() => {
    if (reduceMotion) {
      setStep(3);
      return;
    }

    if (active) {
      startSequence();
    } else if (active === false) {
      clearAllTimers();
      setStep(0);
    }

    return () => clearAllTimers();
  }, [active, reduceMotion]);

  const handleReplay = () => {
    startSequence();
  };

  const isFlapOpen = step >= 1;
  const isCardOut = step >= 2;
  const isSettled = step >= 3;

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[850px] mx-auto min-h-[560px] sm:min-h-[600px] flex flex-col items-center justify-center py-2 px-2"
      role="region"
      aria-label="Flower ceremony envelope and invitation card animation"
    >
      {/* Background Radial Ambient Glow */}
      <div
        className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="w-[85vw] max-w-[550px] h-[460px] rounded-full bg-radial from-[#d5b56d18] via-[#063e4620] to-transparent blur-3xl" />
      </div>

      {/* ==============================================================
          THE ENVELOPE & CARD STAGE (PORTRAIT ORIENTATION)
          ============================================================== */}
      <div
        className="relative w-[320px] sm:w-[365px] md:w-[395px] h-[410px] sm:h-[440px] md:h-[470px] flex items-center justify-center"
        style={{ perspective: '1400px' }}
      >
        {/* ==============================================================
            ENVELOPE ASSEMBLY CONTAINER
            ============================================================== */}
        <div className="relative w-full h-full">
          {/* 1. ENVELOPE BACK WALL (zIndex: 4) */}
          <motion.div
            className="absolute inset-0 rounded-sm overflow-hidden bg-[#032e35] border-2 border-[#d5b56d88] shadow-[0_18px_40px_rgba(0,10,15,0.7)]"
            style={{ zIndex: 4 }}
            initial={false}
            animate={{
              opacity: isSettled ? 0 : 1,
              y: isSettled ? 35 : 0,
              scale: isSettled ? 0.94 : 1,
            }}
            transition={{
              duration: isSettled ? 0.65 : 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,#095c66_0%,#033037_70%,#011e23_100%)]" />
            <div
              className="absolute inset-0 opacity-15 bg-[repeating-linear-gradient(45deg,#d5b56d_0,#d5b56d_1px,transparent_1px,transparent_10px)]"
              aria-hidden="true"
            />
            <div className="absolute inset-4 border border-[#d5b56d33] rounded-xs flex flex-col items-center justify-start pt-4">
              <span className="font-['Cinzel',serif] text-[#d5b56d44] text-2xl select-none">
                ✦
              </span>
              <p className="font-['Great_Vibes',cursive] text-[#d5b56d33] text-xl mt-0.5 select-none">
                With Blessings
              </p>
            </div>
          </motion.div>

          {/* 2. ENVELOPE TOP FLAP (3D Hinge opening upward) */}
          <motion.div
            className="absolute top-0 left-0 w-full h-[180px] sm:h-[195px]"
            style={{
              transformOrigin: 'top center',
              transformStyle: 'preserve-3d',
            }}
            initial={false}
            animate={{
              rotateX: isFlapOpen ? 180 : 0,
              zIndex: isFlapOpen ? 5 : 28,
              opacity: isSettled ? 0 : 1,
              y: isSettled ? 35 : 0,
            }}
            transition={{
              rotateX: {
                duration: reduceMotion ? 0.01 : 0.65,
                ease: [0.4, 0, 0.2, 1],
              },
              opacity: {
                duration: isSettled ? 0.65 : 0.8,
                ease: [0.16, 1, 0.3, 1],
              },
              y: {
                duration: isSettled ? 0.65 : 0.8,
                ease: [0.16, 1, 0.3, 1],
              },
              zIndex: {
                delay: isFlapOpen ? 0.25 : 0,
                duration: 0.01,
              },
            }}
          >
            {/* FLAP FRONT FACE (Visible when closed) */}
            <div
              className="absolute inset-0"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              <svg
                viewBox="0 0 350 195"
                className="w-full h-full filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.55)] overflow-visible"
              >
                <path
                  d="M0 0 L350 0 L175 190 Z"
                  fill="url(#flapTealGrad)"
                  stroke="#d5b56daa"
                  strokeWidth="2"
                />
                <path
                  d="M15 6 L335 6 L175 176 Z"
                  fill="none"
                  stroke="#d5b56d55"
                  strokeWidth="1"
                  strokeDasharray="4 3"
                />
                {/* Gold Crest Seal on Flap Tip */}
                <g transform="translate(175, 110)">
                  <circle r="22" fill="#012b31" stroke="#d5b56d" strokeWidth="1.8" />
                  <circle r="18" fill="none" stroke="#d5b56d55" strokeWidth="1" />
                  <path
                    d="M0 -10 C-5 -3, -6 4, 0 9 C6 4, 5 -3, 0 -10 Z"
                    fill="#d5b56d"
                  />
                  <circle cx="0" cy="-2" r="2" fill="#012b31" />
                  <text
                    y="2"
                    textAnchor="middle"
                    fill="#f1d99b"
                    fontFamily="'Cinzel', Georgia, serif"
                    fontSize="7"
                    fontWeight="600"
                    letterSpacing="0.1em"
                  >
                    K & T
                  </text>
                </g>
                <defs>
                  <linearGradient id="flapTealGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#08525b" />
                    <stop offset="65%" stopColor="#04383f" />
                    <stop offset="100%" stopColor="#02272e" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* FLAP BACK / INSIDE FACE (Visible when open, rotateX: 180) */}
            <div
              className="absolute inset-0"
              style={{
                transform: 'rotateX(180deg)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              <svg
                viewBox="0 0 350 195"
                className="w-full h-full filter drop-shadow-[0_-6px_12px_rgba(0,0,0,0.4)] overflow-visible"
              >
                <path
                  d="M0 0 L350 0 L175 190 Z"
                  fill="url(#flapInsideGrad)"
                  stroke="#d5b56d88"
                  strokeWidth="2"
                />
                <path
                  d="M22 10 L328 10 L175 174 Z"
                  fill="none"
                  stroke="#d5b56d33"
                  strokeWidth="1"
                />
                <g transform="translate(175, 75)">
                  <text
                    textAnchor="middle"
                    fill="#d5b56daa"
                    fontFamily="'Cinzel', serif"
                    fontSize="12.5"
                    letterSpacing="0.22em"
                    fontWeight="bold"
                  >
                    FLOWER CEREMONY
                  </text>
                  <text
                    y="22"
                    textAnchor="middle"
                    fill="#d5b56dcc"
                    fontFamily="'Great Vibes', cursive"
                    fontSize="18"
                  >
                    Invitation
                  </text>
                </g>
                <defs>
                  <linearGradient id="flapInsideGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#095963" />
                    <stop offset="100%" stopColor="#033036" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>

          {/* 3. INVITATION CARD (Fully concealed inside pocket; slides upward, then centers into spotlight) */}
          <motion.div
            className="absolute left-[3%] right-[3%] sm:left-[4%] sm:right-[4%]"
            style={{
              top: '12px',
              height: 'calc(100% - 24px)',
            }}
            initial={false}
            animate={
              isSettled
                ? {
                  y: 0,
                  scale: 1.08,
                  zIndex: 50,
                  boxShadow: '0 25px 60px -10px rgba(0, 0, 0, 0.9), 0 0 35px rgba(214, 180, 106, 0.25)',
                }
                : isCardOut
                  ? {
                    y: -175,
                    scale: 1.0,
                    zIndex: 25,
                    boxShadow: '0 14px 28px rgba(0,0,0,0.5)',
                  }
                  : {
                    y: 0,
                    scale: 0.96,
                    zIndex: 10,
                    boxShadow: 'none',
                  }
            }
            transition={{
              y: {
                duration: isSettled ? 0.85 : 0.75,
                ease: [0.16, 1, 0.3, 1],
              },
              scale: {
                duration: isSettled ? 0.85 : 0.75,
                ease: [0.16, 1, 0.3, 1],
              },
              zIndex: {
                delay: isSettled ? 0.1 : isCardOut ? 0.25 : 0,
                duration: 0.01,
              },
            }}
          >
            {/* THE INVITATION CARD (Warm Ivory #FFF4DD, Teal #063E46, Gold #D6B46A, Peacock) */}
            <div
              className="relative w-full h-full rounded-xs overflow-hidden border-[2.5px] border-[#063E46] p-2 sm:p-2.5 text-center select-none flex flex-col justify-between"
              style={{
                backgroundColor: '#FFF4DD',
                backgroundImage:
                  'radial-gradient(circle at 50% 25%, #fffef7 0%, #fff4dd 70%, #faedd0 100%)',
              }}
            >
              {/* Outer Teal Margin & Gold Fillet Frame */}
              <div className="relative border-2 border-[#D6B46A] p-1.5 sm:p-2 rounded-xs h-full flex flex-col justify-between bg-[#FFF4DD]/60">
                {/* Corner Gold Filigree Accents */}
                <div className="absolute top-1 left-1 text-[#D6B46A] text-[9px] leading-none">❖</div>
                <div className="absolute top-1 right-1 text-[#D6B46A] text-[9px] leading-none">❖</div>
                <div className="absolute bottom-1 left-1 text-[#D6B46A] text-[9px] leading-none">❖</div>
                <div className="absolute bottom-1 right-1 text-[#D6B46A] text-[9px] leading-none">❖</div>

                {/* Inner Dashed Border */}
                <div className="border border-[#D6B46A]/50 border-dashed p-1 sm:p-1.5 h-full flex flex-col justify-between relative">
                  {/* Top Blessing Header */}
                  <div>
                    <p className="font-['Cinzel',serif] text-[8px] sm:text-[9.5px] tracking-[0.26em] uppercase text-[#063E46]/90 font-medium">
                      Cordially Inviting You To The
                    </p>
                  </div>

                  {/* Main Section: Peacock Illustration & Ceremony Title */}
                  <div className="flex items-center gap-2 my-0.5">
                    {/* Left: Graceful Peacock Artwork */}
                    <div className="relative w-20 sm:w-24 shrink-0 aspect-[2/3] rounded-xs overflow-hidden border border-[#D6B46A]/40 bg-[#FFF4DD] shadow-xs flex items-center justify-center">
                      <img
                        src="/images/peacock-card-art.jpg"
                        alt="Graceful royal peacock with ornate turquoise, coral and gold tail plumage"
                        className="w-full h-full object-contain"
                        style={{ mixBlendMode: 'multiply' }}
                      />
                      <div
                        className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-[#d6b46a15] to-transparent"
                        aria-hidden="true"
                      />
                    </div>

                    {/* Right: Honoree & Typography */}
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="font-['Cinzel',serif] text-[17px] sm:text-[21px] font-bold text-[#063E46] tracking-[0.14em] uppercase leading-tight -my-0.5 drop-shadow-xs">
                        Flower Ceremony
                      </h3>

                      <p className="font-['Cinzel',serif] text-[7.5px] sm:text-[8.5px] tracking-[0.2em] uppercase text-[#063E46]/75 mt-0.5">
                        in honour of
                      </p>

                      <h4 className="font-['Petit_Formal_Script',cursive] text-[18px] sm:text-[21px] font-normal text-[#8b6526] leading-tight my-0.5 drop-shadow-xs">
                        {data.groom.name} & {data.bride.name}
                      </h4>

                      <p className="font-['Cinzel',serif] text-[9px] sm:text-[10px] text-[#063E46]/85 tracking-[0.05em] leading-tight my-0.5">
                        as they step into a beautiful new chapter of life
                      </p>
                    </div>
                  </div>

                  {/* Event Details: Date, Time, Venue */}
                  <div className="pt-1 border-t border-[#D6B46A]/40 flex flex-col gap-0.5 text-[8.5px] sm:text-[9.5px] text-[#063E46] font-['Cinzel',serif] tracking-wider">
                    <div className="flex items-center justify-center gap-3">
                      <div className="flex items-center gap-1">
                        <CalendarDays size={11} className="text-[#8b6526]" />
                        <span className="font-semibold">{data.dateLabel}</span>
                        <span className="text-[7.5px] opacity-75">({data.dayLabel})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock3 size={11} className="text-[#8b6526]" />
                        <span>{data.timeLabel}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-1 text-[8px] sm:text-[9px] text-[#063E46]/90">
                      <MapPin size={10} className="text-[#8b6526] shrink-0" />
                      <span className="truncate">
                        {data.venue}, {data.city}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Flourish & Action */}
                  <div className="pt-0.5 border-t border-[#D6B46A]/30 flex items-center justify-between text-[8.5px] text-[#8b6526]">
                    <span className="font-['Great_Vibes',cursive] text-xs text-[#063E46]">
                      With warm blessings
                    </span>
                    <a
                      href={data.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-['Cinzel',serif] text-[8px] tracking-wider text-[#063E46] hover:text-[#8b6526] transition-colors"
                      aria-label="View ceremony location on Google Maps"
                    >
                      <span>Location</span>
                      <ExternalLink size={8} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 4. ENVELOPE FRONT POCKET (zIndex: 20) */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 20 }}
            initial={false}
            animate={{
              opacity: isSettled ? 0 : 1,
              y: isSettled ? 35 : 0,
              scale: isSettled ? 0.94 : 1,
            }}
            transition={{
              duration: isSettled ? 0.65 : 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="absolute inset-0 filter drop-shadow-[0_12px_24px_rgba(0,10,15,0.65)]">
              <svg
                viewBox="0 0 350 400"
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
              >
                {/* Front Pocket Folds */}
                <path
                  d="M0 0 L175 185 L350 0 L350 400 L0 400 Z"
                  fill="url(#pocketTealGrad)"
                  stroke="#d5b56d88"
                  strokeWidth="2"
                />

                {/* Left Side Fold Geometry */}
                <path
                  d="M0 0 L175 235 L0 400 Z"
                  fill="url(#sideFoldLeft)"
                  opacity="0.35"
                />
                {/* Right Side Fold Geometry */}
                <path
                  d="M350 0 L175 235 L350 400 Z"
                  fill="url(#sideFoldRight)"
                  opacity="0.35"
                />

                {/* Bottom Triangular Fold */}
                <path
                  d="M0 400 L175 250 L350 400 Z"
                  fill="url(#bottomFoldGrad)"
                  stroke="#d5b56d55"
                  strokeWidth="1"
                />

                {/* Gold Filigree Line at Bottom */}
                <path
                  d="M15 385 L335 385"
                  stroke="#d5b56d88"
                  strokeWidth="1.5"
                />
                <path
                  d="M25 378 L325 378"
                  stroke="#d5b56d44"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />

                {/* Center Royal Gold Crest Emblem on Pocket */}
                <g transform="translate(175, 315)">
                  <circle r="24" fill="#02272e" stroke="#d5b56daa" strokeWidth="1.5" />
                  <circle r="20" fill="none" stroke="#d5b56d44" strokeWidth="1" strokeDasharray="3 2" />
                  <path
                    d="M-7 -5 C-3 -12, 3 -12, 7 -5 C9 0, 3 7, 0 11 C-3 7, -9 0, -7 -5 Z"
                    fill="#d5b56d"
                    opacity="0.9"
                  />
                  <circle cx="0" cy="-5" r="2" fill="#02272e" />
                  <text
                    y="34"
                    textAnchor="middle"
                    fill="#f1d99b"
                    fontFamily="'Cinzel', Georgia, serif"
                    fontSize="8"
                    letterSpacing="0.22em"
                  >
                    FLOWER CEREMONY
                  </text>
                </g>

                <defs>
                  <linearGradient id="pocketTealGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#064850" />
                    <stop offset="60%" stopColor="#033036" />
                    <stop offset="100%" stopColor="#012227" />
                  </linearGradient>
                  <linearGradient id="sideFoldLeft" x1="0" y1="0" x2="1" y2="0.5">
                    <stop offset="0%" stopColor="#021c21" />
                    <stop offset="100%" stopColor="#07535c" />
                  </linearGradient>
                  <linearGradient id="sideFoldRight" x1="1" y1="0" x2="0" y2="0.5">
                    <stop offset="0%" stopColor="#021c21" />
                    <stop offset="100%" stopColor="#07535c" />
                  </linearGradient>
                  <linearGradient id="bottomFoldGrad" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="#012227" />
                    <stop offset="100%" stopColor="#053b42" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Interactive Controls & Status Note */}
      <motion.div
        className="mt-2 flex flex-col items-center gap-1 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <button
          id="replay-invitation-btn"
          onClick={handleReplay}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#d5b56d88] bg-[#00282ee6] hover:bg-[#084b55] active:scale-95 text-[#f1d99b] text-[10px] font-['Cinzel',serif] tracking-[0.16em] uppercase transition-all duration-200 shadow-[0_4px_12px_rgba(0,0,0,0.4)] cursor-pointer"
          aria-label="Replay envelope opening animation"
        >
          <RotateCcw size={11} className="text-[#d5b56d]" />
          <span>Replay Opening</span>
        </button>

        <p className="text-[10px] text-[#d5b56d99] font-['Cinzel',serif] tracking-wider uppercase">
          {isSettled
            ? 'Your presence will make our celebration even more special.'
            : 'Unveiling the sacred invitation...'}
        </p>
      </motion.div>
    </div>
  );
}
