'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CalendarDays, Clock3, MapPin } from 'lucide-react';
import { invitation as data } from '@/lib/invitation';
import Opening from './Opening';
import CoupleSection from './CoupleSection';
import Countdown from './Countdown';
import CeremonyStagePicture from './CeremonyStagePicture';
import GratitudeScroll from './GratitudeScroll';
import RightProgressNav from './RightProgressNav';
import PageCurlCorner from './PageCurlCorner';
import PageBackface from './PageBackface';
import { Flowers, Flourish, Frame, Lamp, Petals } from './Decorations';

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

function Details() {
  return (
    <div className="details grid grid-cols-3 !my-2 sm:!my-3 !py-2 sm:!py-3">
      <div>
        <CalendarDays />
        <p className="detail-label">Date</p>
        <p>
          {data.dateLabel}
          <small>{data.dayLabel}</small>
        </p>
      </div>
      <div>
        <Clock3 />
        <p className="detail-label">Time</p>
        <p>
          {data.timeLabel}
          <small>With your blessings</small>
        </p>
      </div>
      <div>
        <MapPin />
        <p className="detail-label">Venue</p>
        <p>
          {data.venue}
          <small>{data.city}</small>
        </p>
      </div>
    </div>
  );
}

export default function Invitation() {
  const [opened, setOpened] = useState(false);
  const [active, setActive] = useState(0);
  const [turningFrom, setTurningFrom] = useState<number | null>(null);
  const turnTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mainRef = useRef<HTMLElement>(null);
  const welcomeRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastTurnTimeRef = useRef(0);

  const goToPage = useCallback((nextIndex: number) => {
    const target = Math.max(0, Math.min(5, nextIndex));
    if (target === active) return;
    lastTurnTimeRef.current = Date.now();
    setTurningFrom(active);
    setActive(target);

    if (turnTimeoutRef.current) clearTimeout(turnTimeoutRef.current);
    turnTimeoutRef.current = setTimeout(() => {
      setTurningFrom(null);
    }, 850);
  }, [active]);

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.muted) {
      video.muted = false;
    } else if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  // Video autoplay/pause sync with active page
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (active === 2) {
      video.currentTime = 0;
      video.muted = false;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          video.muted = true;
          video.play().catch(() => {});
        });
      }
    } else {
      if (!video.paused) {
        video.pause();
      }
    }
  }, [active]);

  // Page-turn gesture listeners: Wheel, Touch Swipe, and Keyboard
  useEffect(() => {
    if (!opened) return;

    let accumulatedDelta = 0;
    let resetTimer: NodeJS.Timeout | null = null;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const now = Date.now();
      // Responsive 550ms cooldown between turns
      if (now - lastTurnTimeRef.current < 550) {
        accumulatedDelta = 0;
        return;
      }

      accumulatedDelta += e.deltaY;
      if (resetTimer) clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        accumulatedDelta = 0;
      }, 140);

      if (accumulatedDelta > 28) {
        accumulatedDelta = 0;
        if (active < 5) goToPage(active + 1);
      } else if (accumulatedDelta < -28) {
        accumulatedDelta = 0;
        if (active > 0) goToPage(active - 1);
      }
    };

    let touchStartY = 0;
    let touchStartX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTurnTimeRef.current < 550) return;

      if (e.changedTouches.length > 0) {
        const deltaY = touchStartY - e.changedTouches[0].clientY;
        const deltaX = touchStartX - e.changedTouches[0].clientX;

        // Turn forward on swipe up or swipe left
        if (deltaY > 35 || deltaX > 35) {
          if (active < 5) goToPage(active + 1);
        } else if (deltaY < -35 || deltaX < -35) {
          // Turn back on swipe down or swipe right
          if (active > 0) goToPage(active - 1);
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const now = Date.now();
      if (now - lastTurnTimeRef.current < 450) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === 'ArrowRight' || e.key === ' ') {
        if (active < 5) {
          e.preventDefault();
          goToPage(active + 1);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'ArrowLeft') {
        if (active > 0) {
          e.preventDefault();
          goToPage(active - 1);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
      if (resetTimer) clearTimeout(resetTimer);
    };
  }, [opened, active, goToPage]);

  function complete() {
    setOpened(true);
  }

  // Animation parameters for turning a page
  const getPageMotion = (pageIdx: number) => {
    const isTurned = pageIdx < active;
    const isCurrent = pageIdx === active;

    // Is this page actively flipping through the air?
    // Forward turn (active > turningFrom): page being flipped is turningFrom
    // Backward turn (active < turningFrom): page being flipped is active
    let isFlipping = false;
    if (turningFrom !== null) {
      if (active > turningFrom) {
        isFlipping = pageIdx === turningFrom;
      } else {
        isFlipping = pageIdx === active;
      }
    }

    // z-index:
    // Flipping page gets highest zIndex (50) so its front is ALWAYS on top while turning!
    // Current active page has zIndex: 20
    // Turned pages on the left have 10 + pageIdx
    // Unturned pages on the right have 10 - pageIdx
    const zIndex = isFlipping
      ? 50
      : isCurrent
      ? 20
      : isTurned
      ? 10 + pageIdx
      : 10 - pageIdx;

    return {
      zIndex,
      animate: isTurned
        ? {
            rotateY: -180,
            transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
          }
        : {
            rotateY: 0,
            transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
          },
    };
  };

  return (
    <>
      <AnimatePresence>
        {!opened && <Opening onComplete={complete} />}
      </AnimatePresence>

      <main
        ref={mainRef}
        className={`invitation ${opened ? 'unlocked' : ''}`}
        inert={!opened}
        aria-label="Flower ceremony invitation"
      >
        {/* ================= PAGE 0: WELCOME & NAMES ================= */}
        <motion.div
          id="section-0"
          data-index="0"
          className="book-page-layer"
          style={{
            transformOrigin: 'left center',
            transformStyle: 'preserve-3d',
            pointerEvents: active === 0 ? 'auto' : 'none',
            zIndex: getPageMotion(0).zIndex,
          }}
          initial={false}
          animate={getPageMotion(0).animate}
        >
          <section className="scene welcome w-full h-full">
            <Frame active={active === 0} />
            <Petals />
            <div className="welcome-mandala" aria-hidden="true" />
            <div className="scene-content !py-3 sm:!py-6 max-w-[960px] relative z-10">
              <Reveal>
                <div className="welcome-kalasam" aria-hidden="true">
                  <div className="kalasam-aura" />
                  <svg viewBox="0 0 32 44" className="kalasam-svg">
                    <path d="M16 1 C17 3, 17.5 5, 16 8 C14.5 5, 15 3, 16 1 Z" fill="url(#goldGradStupi)" />
                    <circle cx="16" cy="9" r="2.2" fill="url(#goldGradStupi)" />
                    <path d="M16 11.5 C13 14, 11 17, 16 20 C21 17, 19 14, 16 11.5 Z" fill="url(#goldGradStupi)" />
                    <path d="M16 17 C11 16, 8 19, 7 24 C11 23, 14 21, 16 19 Z" fill="#d5b56d" opacity="0.95" />
                    <path d="M16 17 C21 16, 24 19, 25 24 C21 23, 18 21, 16 19 Z" fill="#d5b56d" opacity="0.95" />
                    <path d="M10 24 C9 27, 8 32, 10 36 C12 39, 20 39, 22 36 C24 32, 23 27, 22 24 Z" fill="url(#goldGradStupi)" />
                    <rect x="11" y="38" width="10" height="3" rx="1.5" fill="#ffd77a" />
                    <defs>
                      <linearGradient id="goldGradStupi" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#fff8db" />
                        <stop offset="30%" stopColor="#f7d988" />
                        <stop offset="70%" stopColor="#d5a643" />
                        <stop offset="100%" stopColor="#966d1e" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <p className="welcome-intro-script">Together with their families</p>
                <div tabIndex={-1} ref={welcomeRef} className="welcome-names-block outline-none focus:outline-none">
                  <h1 className="gold-foil-name">{data.groom.name}</h1>
                  <div className="name-connector" aria-hidden="true">
                    <span className="connector-line" />
                    <span className="connector-script">&</span>
                    <span className="connector-line" />
                  </div>
                  <h2 className="gold-foil-name">{data.bride.name}</h2>
                </div>
                <div className="welcome-lotus-divider" aria-hidden="true">
                  <span className="gold-dot-outer" />
                  <span className="gold-dot-inner" />
                  <svg viewBox="0 0 46 22" className="lotus-svg">
                    <path d="M23 2 C24.5 7, 26 13, 23 20 C20 13, 21.5 7, 23 2 Z" fill="currentColor" />
                    <path d="M23 9 C28 10, 34 13, 37 18 C31 19, 26 16, 23 13 Z" fill="currentColor" opacity="0.85" />
                    <path d="M23 9 C18 10, 12 13, 9 18 C15 19, 20 16, 23 13 Z" fill="currentColor" opacity="0.85" />
                    <path d="M23 14 C31 16, 38 18, 44 21 C36 22, 29 20, 23 18 Z" fill="currentColor" opacity="0.7" />
                    <path d="M23 14 C15 16, 8 18, 2 21 C10 22, 17 20, 23 18 Z" fill="currentColor" opacity="0.7" />
                    <circle cx="23" cy="20.5" r="1.5" fill="#fff" />
                  </svg>
                  <span className="gold-dot-inner" />
                  <span className="gold-dot-outer" />
                </div>
                <div className="welcome-date-venue">
                  <p className="welcome-date">NOVEMBER 16, 2026</p>
                  <p className="welcome-venue">MADURAI, TAMIL NADU</p>
                </div>
              </Reveal>
            </div>
            {active === 0 && <PageCurlCorner onClick={() => goToPage(1)} />}
          </section>
          <PageBackface />
        </motion.div>

        {/* ================= PAGE 1: MEET THE COUPLE ================= */}
        <motion.div
          id="section-1"
          data-index="1"
          className="book-page-layer"
          style={{
            transformOrigin: 'left center',
            transformStyle: 'preserve-3d',
            pointerEvents: active === 1 ? 'auto' : 'none',
            zIndex: getPageMotion(1).zIndex,
          }}
          initial={false}
          animate={getPageMotion(1).animate}
        >
          <section className="scene w-full h-full">
            <Frame active={active === 1} />
            <CoupleSection active={active === 1} />
            {active === 1 && <PageCurlCorner onClick={() => goToPage(2)} />}
          </section>
          <PageBackface />
        </motion.div>

        {/* ================= PAGE 2: FLOWER CEREMONY INVITATION ================= */}
        <motion.div
          id="section-2"
          data-index="2"
          className="book-page-layer"
          style={{
            transformOrigin: 'left center',
            transformStyle: 'preserve-3d',
            pointerEvents: active === 2 ? 'auto' : 'none',
            zIndex: getPageMotion(2).zIndex,
          }}
          initial={false}
          animate={getPageMotion(2).animate}
        >
          <section className="scene ceremony w-full h-full">
            <Frame active={active === 2} />
            <Flowers className="top-left" />
            <Flowers className="top-right" />
            <Flowers className="bottom-left" />
            <Flowers className="bottom-right" />
            <div className="scene-content !pt-7 sm:!pt-9 md:!pt-12 !pb-3 !px-4 max-w-[960px] mx-auto w-full">
              <Reveal>
                <h2 className="ceremony-title mt-2 sm:mt-3 md:mt-4 !text-[clamp(24px,3.4vw,46px)] leading-tight tracking-[0.06em] text-[#f7d688]">
                  Flower Ceremony
                </h2>
                <Flourish className="!my-1.5 sm:!my-2.5" />
                <div className="relative mx-auto mt-2 sm:mt-3 max-w-[520px] md:max-w-[560px] w-full rounded-2xl p-[3px] sm:p-1 bg-gradient-to-b from-[#f7d988] via-[#d5a643] to-[#966d1e] shadow-[0_20px_50px_rgba(0,10,14,0.9),0_0_35px_rgba(213,181,109,0.25)]">
                  <div className="relative w-full aspect-[440/318] rounded-[13px] overflow-hidden bg-black border border-[#ffd77a55]">
                    <video
                      ref={videoRef}
                      playsInline
                      preload="auto"
                      loop
                      onClick={handleVideoClick}
                      className="w-full h-full object-cover block cursor-pointer"
                      aria-label="Flower Ceremony Invitation Video"
                    >
                      <source src="/images/invitation_video.mp4" type="video/mp4" />
                      <source src="/images/invitation%20vedio.mp4" type="video/mp4" />
                      Your browser does not support video playback.
                    </video>
                  </div>
                </div>
              </Reveal>
            </div>
            <Lamp className="scene-lamp left" />
            <Lamp className="scene-lamp right" />
            {active === 2 && <PageCurlCorner onClick={() => goToPage(3)} />}
          </section>
          <PageBackface />
        </motion.div>

        {/* ================= PAGE 3: CEREMONY DETAILS ================= */}
        <motion.div
          id="section-3"
          data-index="3"
          className="book-page-layer"
          style={{
            transformOrigin: 'left center',
            transformStyle: 'preserve-3d',
            pointerEvents: active === 3 ? 'auto' : 'none',
            zIndex: getPageMotion(3).zIndex,
          }}
          initial={false}
          animate={getPageMotion(3).animate}
        >
          <section className="scene w-full h-full">
            <Frame active={active === 3} />
            <div className="scene-content !py-2 sm:!py-4 md:!py-6 !px-3 sm:!px-6 max-w-[960px] mx-auto w-full">
              <Reveal>
                <h2 className="mt-5 sm:mt-7 md:mt-9 !text-[clamp(19px,2.5vw,34px)] leading-tight text-[#f7d688]">
                  Counting down to the celebration
                </h2>
                <Flourish className="!my-2 sm:!my-2.5" />
                <Countdown active={active === 3} />
                <Details />
                <a
                  className="gold-button inline-flex !mt-2 sm:!mt-3 md:!mt-4"
                  href={data.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View location <ArrowRight size={16} />
                </a>
              </Reveal>
            </div>
            {active === 3 && <PageCurlCorner onClick={() => goToPage(4)} />}
          </section>
          <PageBackface />
        </motion.div>

        {/* ================= PAGE 4: CEREMONY STAGE PICTURE ================= */}
        <motion.div
          id="section-4"
          data-index="4"
          className="book-page-layer"
          style={{
            transformOrigin: 'left center',
            transformStyle: 'preserve-3d',
            pointerEvents: active === 4 ? 'auto' : 'none',
            zIndex: getPageMotion(4).zIndex,
          }}
          initial={false}
          animate={getPageMotion(4).animate}
        >
          <section className="scene w-full h-full">
            <Frame active={active === 4} />
            <CeremonyStagePicture active={active === 4} />
            {active === 4 && <PageCurlCorner onClick={() => goToPage(5)} />}
          </section>
          <PageBackface />
        </motion.div>

        {/* ================= PAGE 5: FAMILY & GRATITUDE ================= */}
        <motion.div
          id="section-5"
          data-index="5"
          className="book-page-layer"
          style={{
            transformOrigin: 'left center',
            transformStyle: 'preserve-3d',
            pointerEvents: active === 5 ? 'auto' : 'none',
            zIndex: getPageMotion(5).zIndex,
          }}
          initial={false}
          animate={getPageMotion(5).animate}
        >
          <section className="scene gratitude-scene w-full h-full">
            <Frame active={active === 5} />
            <GratitudeScroll
              active={active === 5}
              onReplay={() => {
                goToPage(0);
                setOpened(false);
              }}
            />
          </section>
          <PageBackface />
        </motion.div>
      </main>

      {/* Right Progress Navigation (6 Dots + Top Down-Arrow + Bottom Up-Arrow) */}
      {opened && <RightProgressNav active={active} onSelect={goToPage} />}
    </>
  );
}
