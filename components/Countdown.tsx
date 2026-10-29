'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { invitation as data } from '@/lib/invitation';

interface CountdownProps {
  active?: boolean;
}

export default function Countdown({ active = true }: CountdownProps) {
  const [now, setNow] = useState<number | null>(null);
  const [doorOpen, setDoorOpen] = useState(false);
  const [doorsGone, setDoorsGone] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (active) {
      setDoorOpen(false);
      setDoorsGone(false);

      // Wait 600ms after user arrives on section so doors are visibly CLOSED first
      const openTimer = setTimeout(() => {
        setDoorOpen(true);
      }, 600);

      // Unmount doors after full slow majestic animation completes
      const goneTimer = setTimeout(() => {
        setDoorsGone(true);
      }, 5800);

      return () => {
        clearTimeout(openTimer);
        clearTimeout(goneTimer);
      };
    } else {
      setDoorOpen(false);
      setDoorsGone(false);
    }
  }, [active]);

  useEffect(() => {
    if (!active) return;
    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [active]);

  const replayDoors = () => {
    setDoorsGone(false);
    setDoorOpen(false);
    setTimeout(() => {
      setDoorOpen(true);
    }, 350);
    setTimeout(() => {
      setDoorsGone(true);
    }, 5800);
  };

  const seconds =
    now === null
      ? 0
      : Math.max(0, Math.floor((new Date(data.dateISO).getTime() - now) / 1000));

  const values = [
    Math.floor(seconds / 86400),
    Math.floor(seconds / 3600) % 24,
    Math.floor(seconds / 60) % 60,
    seconds % 60,
  ];

  const labels = ['Days', 'Hours', 'Minutes', 'Seconds'];

  return (
    <>
      <div className="countdown grid grid-cols-4 gap-1.5 sm:gap-3 md:gap-4 max-w-[660px] mx-auto !my-2 sm:!my-3 md:!my-4">
        {values.map((v, i) => {
          // Sequential stagger for royal door opening
          const delay = i * 0.35;
          const isOpen = doorOpen;

          return (
            <div
              key={i}
              onClick={replayDoors}
              className="countdown-box relative p-1.5 sm:p-3 md:p-4 rounded-[12px_2px] sm:rounded-[15px_2px] bg-[#00323a55] border border-[#d5b56d88] outline outline-1 outline-[#d5b56d22] -outline-offset-[4px] sm:-outline-offset-[6px] shadow-[0_6px_20px_rgba(0,18,22,0.65)] overflow-visible cursor-pointer select-none"
              style={{ perspective: '900px' }}
              title="Click to replay doors"
            >
              {/* Inner ambient golden aura when doors open */}
              <motion.div
                className="absolute inset-0 pointer-events-none rounded-[12px_2px] sm:rounded-[15px_2px]"
                initial={false}
                animate={{
                  opacity: isOpen ? 1 : 0,
                  background: isOpen
                    ? 'radial-gradient(circle at center, rgba(213,181,109,0.25) 0%, rgba(2,32,38,0) 75%)'
                    : 'transparent',
                }}
                transition={{ duration: 2.8, delay: delay + 0.4 }}
              />

              {/* REVEALED TIME NUMBERS & LABELS */}
              <div className="relative z-10 flex flex-col items-center justify-center min-h-[58px] sm:min-h-[78px] md:min-h-[92px]">
                <motion.strong
                  className="font-cinzel text-[clamp(19px,4.5vw,48px)] font-normal block leading-none text-[var(--pale)] drop-shadow-[0_2px_12px_rgba(213,181,109,0.45)]"
                  initial={false}
                  animate={
                    isOpen
                      ? {
                          scale: [0.94, 1.02, 1],
                          opacity: 1,
                        }
                      : {
                          scale: 0.94,
                          opacity: 0,
                        }
                  }
                  transition={{
                    duration: 2.2,
                    delay: delay + 0.4,
                    ease: [0.38, 0.04, 0.2, 1],
                  }}
                >
                  {now === null ? '—' : String(v).padStart(2, '0')}
                </motion.strong>

                <motion.span
                  className="font-cinzel text-[7px] sm:text-[9.5px] md:text-[11px] tracking-[0.08em] sm:tracking-[0.16em] uppercase text-[#d5b56d] block mt-1 sm:mt-1.5 font-semibold"
                  initial={false}
                  animate={
                    isOpen
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 6 }
                  }
                  transition={{
                    duration: 1.8,
                    delay: delay + 0.7,
                    ease: [0.38, 0.04, 0.2, 1],
                  }}
                >
                  {labels[i]}
                </motion.span>
              </div>

              {/* ROYAL GOLD SCREEN / DOORS (Unmount completely once opened) */}
              {!doorsGone && (
                <>
                  <motion.div
                    className="gold-door left-door absolute inset-y-0 left-0 w-[51%] z-20 pointer-events-none origin-left overflow-hidden flex items-center justify-end"
                    style={{
                      transformStyle: 'preserve-3d',
                      borderTopLeftRadius: '14px',
                      borderBottomLeftRadius: '2px',
                      background:
                        'linear-gradient(135deg, #ffd978 0%, #d4a946 30%, #8c6218 60%, #e0b44f 85%, #fff2b2 100%)',
                      boxShadow:
                        'inset -1px 0 0 rgba(255,255,255,0.7), inset 0 0 10px rgba(110,72,12,0.6), 2px 0 6px rgba(0,0,0,0.5)',
                      borderRight: '1px solid #7c5210',
                    }}
                    initial={false}
                    animate={
                      isOpen
                        ? {
                            rotateY: shouldReduceMotion ? 0 : -118,
                            opacity: [1, 1, 0.85, 0],
                            scaleX: shouldReduceMotion ? 0 : 0.95,
                          }
                        : {
                            rotateY: 0,
                            opacity: 1,
                            scaleX: 1,
                          }
                    }
                    transition={{
                      duration: shouldReduceMotion ? 0.4 : 3.2,
                      delay,
                      ease: [0.38, 0.04, 0.2, 1],
                      opacity: {
                        duration: shouldReduceMotion ? 0.4 : 3.2,
                        delay,
                        times: [0, 0.75, 0.92, 1],
                        ease: 'easeInOut',
                      },
                    }}
                  >
                    {/* Traditional Lattice / Filigree texture */}
                    <div
                      className="absolute inset-[3px] border border-[rgba(255,255,255,0.45)] pointer-events-none"
                      style={{
                        borderTopLeftRadius: '11px',
                        backgroundImage:
                          'repeating-linear-gradient(45deg, rgba(140, 95, 25, 0.22) 0px, rgba(140, 95, 25, 0.22) 1px, transparent 1px, transparent 6px)',
                      }}
                    />

                    {/* Left Door Center Handle / Half-Medallion */}
                    <div className="relative z-30 mr-[-1px] w-2.5 sm:w-3.5 h-6 sm:h-8 rounded-l-full bg-gradient-to-l from-[#ffe28a] via-[#c99833] to-[#754a0a] border border-[#fff2b2] shadow-[-2px_0_4px_rgba(0,0,0,0.6)] flex items-center justify-center">
                      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#520000] border border-[#ffd77a] shadow-[0_0_3px_#ff9e3b]" />
                    </div>
                  </motion.div>

                  <motion.div
                    className="gold-door right-door absolute inset-y-0 right-0 w-[51%] z-20 pointer-events-none origin-right overflow-hidden flex items-center justify-start"
                    style={{
                      transformStyle: 'preserve-3d',
                      borderTopRightRadius: '2px',
                      borderBottomRightRadius: '14px',
                      background:
                        'linear-gradient(225deg, #ffd978 0%, #d4a946 30%, #8c6218 60%, #e0b44f 85%, #fff2b2 100%)',
                      boxShadow:
                        'inset 1px 0 0 rgba(255,255,255,0.7), inset 0 0 10px rgba(110,72,12,0.6), -2px 0 6px rgba(0,0,0,0.5)',
                      borderLeft: '1px solid #7c5210',
                    }}
                    initial={false}
                    animate={
                      isOpen
                        ? {
                            rotateY: shouldReduceMotion ? 0 : 118,
                            opacity: [1, 1, 0.85, 0],
                            scaleX: shouldReduceMotion ? 0 : 0.95,
                          }
                        : {
                            rotateY: 0,
                            opacity: 1,
                            scaleX: 1,
                          }
                    }
                    transition={{
                      duration: shouldReduceMotion ? 0.4 : 3.2,
                      delay,
                      ease: [0.38, 0.04, 0.2, 1],
                      opacity: {
                        duration: shouldReduceMotion ? 0.4 : 3.2,
                        delay,
                        times: [0, 0.75, 0.92, 1],
                        ease: 'easeInOut',
                      },
                    }}
                  >
                    {/* Traditional Lattice / Filigree texture */}
                    <div
                      className="absolute inset-[3px] border border-[rgba(255,255,255,0.45)] pointer-events-none"
                      style={{
                        borderBottomRightRadius: '11px',
                        backgroundImage:
                          'repeating-linear-gradient(-45deg, rgba(140, 95, 25, 0.22) 0px, rgba(140, 95, 25, 0.22) 1px, transparent 1px, transparent 6px)',
                      }}
                    />

                    {/* Right Door Center Handle / Half-Medallion */}
                    <div className="relative z-30 ml-[-1px] w-2.5 sm:w-3.5 h-6 sm:h-8 rounded-r-full bg-gradient-to-r from-[#ffe28a] via-[#c99833] to-[#754a0a] border border-[#fff2b2] shadow-[2px_0_4px_rgba(0,0,0,0.6)] flex items-center justify-center">
                      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#520000] border border-[#ffd77a] shadow-[0_0_3px_#ff9e3b]" />
                    </div>
                  </motion.div>
                </>
              )}
            </div>
          );
        })}
      </div>

      <p className="countdown-note !mt-1.5 sm:!mt-2 !mb-1 text-[clamp(12px,1.4vw,16px)]">
        {now !== null && seconds === 0
          ? 'The special day has arrived. Thank you for your blessings.'
          : 'Every moment brings us closer to a beautiful beginning.'}
      </p>
    </>
  );
}
