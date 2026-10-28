'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Flourish } from './Decorations';
import { Flower2 } from 'lucide-react';

interface CeremonyStagePictureProps {
  active?: boolean;
}

const ceremonyQuotes = [
  'A beautiful tradition filled with love, happiness, and blessings.',
  'A special moment where two families come together to share joy and love.',
  'Every flower represents a blessing for the beautiful journey ahead.',
  'A day to cherish, a memory to treasure.',
];

// Word-by-word fade-in animation component
function WordFadeText({
  text,
  startDelay = 0,
  active,
}: {
  text: string;
  startDelay?: number;
  active?: boolean;
}) {
  const words = text.split(' ');

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.055,
        delayChildren: startDelay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 6,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.p
      className="text-[clamp(11.5px,2.9vw,16px)] md:text-[clamp(13px,1.35vw,16.5px)] text-[#fff5dc] font-cinzel leading-relaxed tracking-[0.02em] m-0"
      initial="hidden"
      animate={active ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}

export default function CeremonyStagePicture({ active }: CeremonyStagePictureProps) {
  return (
    <div className="scene-content !py-2 !px-3 sm:!px-6 md:!px-8 max-w-[1240px] mx-auto w-full">
      {/* Top Header */}
      <div className="mb-2 sm:mb-3 md:mb-5 text-center">
        <h2 className="!text-[clamp(20px,3.2vw,38px)] !text-[#fff8e4] tracking-[0.06em] font-medium uppercase drop-shadow-[0_2px_10px_rgba(213,181,109,0.4)]">
          The Flower Ceremony
        </h2>
        <Flourish />
      </div>

      {/* Main Split Layout: Left Side 4 Quotes + Right Side Family Cutout Artwork */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 md:gap-6 lg:gap-8 items-center justify-between w-full">
        {/* =========================================================
            LEFT COLUMN: 4 Ceremonial Quotes (Word-by-Word Fade In)
            ========================================================= */}
        <div className="md:col-span-5 flex flex-col justify-center space-y-2 sm:space-y-2.5 md:space-y-3.5 text-left">
          {ceremonyQuotes.map((quote, idx) => {
            const startDelay = 0.2 + idx * 0.45;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -18 }}
                animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -18 }}
                transition={{ duration: 0.6, delay: startDelay * 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="relative p-2 sm:p-2.5 md:p-3.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-[rgba(0,34,40,0.75)] to-[rgba(1,24,28,0.55)] border border-[#d5b56d55] shadow-[0_4px_16px_rgba(0,10,14,0.6)] backdrop-blur-xs hover:border-[#ffd77a88] transition-all"
              >
                {/* Golden lotus / flower bullet icon */}
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <div className="mt-0.5 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#003842] border border-[#ffd77a88] flex items-center justify-center text-[#ffd77a] shadow-[0_0_8px_rgba(255,215,122,0.4)]">
                    <Flower2 size={11} className="sm:w-[13px] sm:h-[13px] text-[#ffd77a]" />
                  </div>

                  <div className="flex-1">
                    <WordFadeText
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

        {/* =========================================================
            RIGHT COLUMN: Flower Ceremony Family Cutout Artwork (Fade in)
            ========================================================= */}
        <motion.div
          className="md:col-span-7 relative flex items-center justify-center w-full"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={active ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Subtle golden halo glow behind the artwork */}
          <div
            className="absolute inset-0 pointer-events-none rounded-full"
            style={{
              background:
                'radial-gradient(ellipse at 50% 50%, rgba(213, 181, 109, 0.22) 0%, rgba(2, 34, 40, 0.1) 50%, transparent 75%)',
              filter: 'blur(20px)',
            }}
          />

          {/* The Flower Ceremony Family Cutout Artwork */}
          <div className="relative z-10 w-full flex items-center justify-center">
            <img
              src="/images/flower cermoney.png"
              alt="Flower Ceremony - Bride seated on royal chair with family adorning jasmine flowers"
              className="max-h-[30svh] sm:max-h-[38svh] md:max-h-[54svh] lg:max-h-[58svh] w-auto max-w-full object-contain filter drop-shadow-[0_12px_32px_rgba(0,10,14,0.85)]"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
