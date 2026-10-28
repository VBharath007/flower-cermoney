'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Flourish } from './Decorations';
import { Flower2 } from 'lucide-react';

interface InvitationCardVideoProps {
  active?: boolean;
}

const ceremonyQuotes = [
  'A beautiful tradition filled with love, happiness, and blessings.',
  'A special moment where two families come together to share joy and love.',
  'Every flower represents a blessing for the beautiful journey ahead.',
  'A day to cherish, a memory to treasure.',
];

// Letter-by-letter fade-in animation component with strict Framer Motion types
function LetterFadeText({
  text,
  startDelay = 0,
  active,
}: {
  text: string;
  startDelay?: number;
  active?: boolean;
}) {
  const letters = Array.from(text);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.016,
        delayChildren: startDelay,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 5,
      filter: 'blur(3px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.32,
        ease: [0, 0, 0.2, 1],
      },
    },
  };

  return (
    <motion.p
      className="text-[clamp(14px,1.45vw,17.5px)] text-[#fff5dc] font-cinzel leading-relaxed tracking-[0.025em] m-0"
      initial="hidden"
      animate={active ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      {letters.map((char, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.p>
  );
}

export default function InvitationCardVideo({ active }: InvitationCardVideoProps) {
  return (
    <div className="scene-content !py-2 !px-4 sm:!px-8 max-w-[1240px] mx-auto w-full">
      {/* Top Header */}
      <div className="mb-3 sm:mb-5 text-center">

        <h2 className="!text-[clamp(24px,3.2vw,42px)] !text-[#fff8e4] tracking-[0.06em] font-medium uppercase drop-shadow-[0_2px_10px_rgba(213,181,109,0.4)]">
          The Flower Ceremony
        </h2>
        <Flourish />
      </div>

      {/* Main Split Layout: Left Side 4 Quotes + Right Side Family Cutout Artwork */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center justify-between w-full">
        {/* LEFT COLUMN: 4 Ceremonial Quotes */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-3.5 sm:space-y-4 text-left">
          {ceremonyQuotes.map((quote, idx) => {
            const startDelay = 0.25 + idx * 0.55;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -16 }}
                animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                transition={{ duration: 0.65, delay: startDelay * 0.75, ease: [0, 0, 0.2, 1] }}
                className="relative p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-[rgba(0,34,40,0.7)] to-[rgba(1,24,28,0.5)] border border-[#d5b56d55] shadow-[0_6px_20px_rgba(0,10,14,0.6)] backdrop-blur-xs hover:border-[#ffd77a88] transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-[#003842] border border-[#ffd77a88] flex items-center justify-center text-[#ffd77a] shadow-[0_0_8px_rgba(255,215,122,0.4)]">
                    <Flower2 size={13} className="text-[#ffd77a]" />
                  </div>

                  <div className="flex-1">
                    <LetterFadeText
                      text={quote}
                      startDelay={startDelay}
                      active={active}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* RIGHT COLUMN: Flower Ceremony Family Cutout Artwork */}
        <motion.div
          className="lg:col-span-7 relative flex items-center justify-center w-full"
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={active ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="absolute inset-0 pointer-events-none rounded-full"
            style={{
              background:
                'radial-gradient(ellipse at 50% 50%, rgba(213, 181, 109, 0.22) 0%, rgba(2, 34, 40, 0.1) 50%, transparent 75%)',
              filter: 'blur(18px)',
            }}
          />

          <div className="relative z-10 w-full flex items-center justify-center">
            <img
              src="/images/flower cermoney.png"
              alt="Flower Ceremony - Bride seated on royal chair with family adorning jasmine flowers"
              className="max-h-[58svh] w-auto max-w-full object-contain filter drop-shadow-[0_16px_36px_rgba(0,10,14,0.85)]"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

