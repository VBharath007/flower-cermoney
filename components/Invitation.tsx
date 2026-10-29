'use client';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, CalendarDays, Clock3, MapPin, Play, RotateCcw } from 'lucide-react';
import { invitation as data } from '@/lib/invitation';
import Opening from './Opening';
import CoupleSection from './CoupleSection';
import Countdown from './Countdown';
import CeremonyStagePicture from './CeremonyStagePicture';
import GratitudeScroll from './GratitudeScroll';
import RightProgressNav from './RightProgressNav';
import { Flowers, Flourish, Frame, Lamp, Petals, TempleBackdrop, Sparkles } from './Decorations';
const sections = [
  'Opening Invitation',
  'Meet the Couple',
  'The Flower Ceremony Invitation',
  'Ceremony Details',
  'Flower Ceremony Animation / Video',
  'Family & Gratitude',
];
function Reveal({ children, className = '', side = 0 }: { children: React.ReactNode; className?: string; side?: number }) {
  return <div className={className}>{children}</div>;
}
function Details() { return <div className="details grid grid-cols-3"><div><CalendarDays /><p className="detail-label">Date</p><p>{data.dateLabel}<small>{data.dayLabel}</small></p></div><div><Clock3 /><p className="detail-label">Time</p><p>{data.timeLabel}<small>With your blessings</small></p></div><div><MapPin /><p className="detail-label">Venue</p><p>{data.venue}<small>{data.city}</small></p></div></div> }
export default function Invitation() {
  const [opened, setOpened] = useState(false); const [active, setActive] = useState(0); const mainRef = useRef<HTMLElement>(null); const welcomeRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (active === 2) {
      video.currentTime = 0;
      video.muted = false;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser policy restricts unmuted autoplay, mute and play immediately!
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
  useEffect(() => {
    if (!opened) return;
    let rafId: number | null = null;

    const observer = new IntersectionObserver(
      entries => {
        for (let i = 0; i < entries.length; i++) {
          const entry = entries[i];
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            if (!isNaN(idx)) {
              if (rafId) cancelAnimationFrame(rafId);
              rafId = requestAnimationFrame(() => {
                setActive(prev => (prev !== idx ? idx : prev));
              });
            }
          }
        }
      },
      { root: mainRef.current, threshold: 0.5 }
    );
    mainRef.current?.querySelectorAll('section').forEach(s => observer.observe(s));
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [opened]);
  function go(index: number) {
    const target = Math.max(0, Math.min(5, index));
    setActive(target);
    document.getElementById(`section-${target}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function complete() { setOpened(true); }
  return <><AnimatePresence>{!opened && <Opening onComplete={complete} />}</AnimatePresence><main ref={mainRef} className={`invitation ${opened ? 'unlocked' : ''}`} inert={!opened} aria-label="Flower ceremony invitation">
    <section id="section-0" data-index="0" className="scene welcome"><Frame active={active === 0} /><Petals /><div className="welcome-mandala" aria-hidden="true" /><div className="scene-content !py-3 sm:!py-6 max-w-[960px] relative z-10"><Reveal>
      <div className="welcome-kalasam" aria-hidden="true"><div className="kalasam-aura" /><svg viewBox="0 0 32 44" className="kalasam-svg"><path d="M16 1 C17 3, 17.5 5, 16 8 C14.5 5, 15 3, 16 1 Z" fill="url(#goldGradStupi)" /><circle cx="16" cy="9" r="2.2" fill="url(#goldGradStupi)" /><path d="M16 11.5 C13 14, 11 17, 16 20 C21 17, 19 14, 16 11.5 Z" fill="url(#goldGradStupi)" /><path d="M16 17 C11 16, 8 19, 7 24 C11 23, 14 21, 16 19 Z" fill="#d5b56d" opacity="0.95" /><path d="M16 17 C21 16, 24 19, 25 24 C21 23, 18 21, 16 19 Z" fill="#d5b56d" opacity="0.95" /><path d="M10 24 C9 27, 8 32, 10 36 C12 39, 20 39, 22 36 C24 32, 23 27, 22 24 Z" fill="url(#goldGradStupi)" /><rect x="11" y="38" width="10" height="3" rx="1.5" fill="#ffd77a" /><defs><linearGradient id="goldGradStupi" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#fff8db" /><stop offset="30%" stopColor="#f7d988" /><stop offset="70%" stopColor="#d5a643" /><stop offset="100%" stopColor="#966d1e" /></linearGradient></defs></svg></div>
      <p className="welcome-intro-script">Together with their families</p>
      <div tabIndex={-1} ref={welcomeRef} className="welcome-names-block outline-none focus:outline-none"><h1 className="gold-foil-name">{data.groom.name}</h1><div className="name-connector" aria-hidden="true"><span className="connector-line" /><span className="connector-script">&</span><span className="connector-line" /></div><h2 className="gold-foil-name">{data.bride.name}</h2></div>
      <div className="welcome-lotus-divider" aria-hidden="true"><span className="gold-dot-outer" /><span className="gold-dot-inner" /><svg viewBox="0 0 46 22" className="lotus-svg"><path d="M23 2 C24.5 7, 26 13, 23 20 C20 13, 21.5 7, 23 2 Z" fill="currentColor" /><path d="M23 9 C28 10, 34 13, 37 18 C31 19, 26 16, 23 13 Z" fill="currentColor" opacity="0.85" /><path d="M23 9 C18 10, 12 13, 9 18 C15 19, 20 16, 23 13 Z" fill="currentColor" opacity="0.85" /><path d="M23 14 C31 16, 38 18, 44 21 C36 22, 29 20, 23 18 Z" fill="currentColor" opacity="0.7" /><path d="M23 14 C15 16, 8 18, 2 21 C10 22, 17 20, 23 18 Z" fill="currentColor" opacity="0.7" /><circle cx="23" cy="20.5" r="1.5" fill="#fff" /></svg><span className="gold-dot-inner" /><span className="gold-dot-outer" /></div>
      <div className="welcome-date-venue"><p className="welcome-date">NOVEMBER 16, 2026</p><p className="welcome-venue">MADURAI, TAMIL NADU</p></div>
    </Reveal></div></section>
    <section id="section-1" data-index="1" className="scene"><Frame active={active === 1} /><CoupleSection active={active === 1} /></section>
    <section id="section-2" data-index="2" className="scene ceremony">
      <Frame active={active === 2} />
      <Flowers className="top-left" />
      <Flowers className="top-right" />
      <Flowers className="bottom-left" />
      <Flowers className="bottom-right" />
      <div className="scene-content !py-2 sm:!py-5 max-w-[960px] mx-auto w-full">
        <Reveal>
          <p className="script">You&apos;re cordially invited</p>
          <h2 className="ceremony-title">Flower Ceremony</h2>
          <Flourish />
          <div className="relative mx-auto mt-2 sm:mt-4 max-w-[620px] w-full rounded-2xl p-[3px] sm:p-1 bg-gradient-to-b from-[#f7d988] via-[#d5a643] to-[#966d1e] shadow-[0_20px_50px_rgba(0,10,14,0.9),0_0_35px_rgba(213,181,109,0.25)]">
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
          <p className="message mt-3 sm:mt-4 text-center text-[clamp(14px,1.5vw,18px)]">
            Your presence will make our celebration even more special.
          </p>
        </Reveal>
      </div>
      <Lamp className="scene-lamp left" />
      <Lamp className="scene-lamp right" />
    </section>
    <section id="section-3" data-index="3" className="scene">
      <Frame active={active === 3} />
      <div className="scene-content !pt-14 sm:!pt-18 md:!pt-24 !pb-4 sm:!pb-6 max-w-[1040px] mx-auto">
        <Reveal>
          <p className="script !mt-6 sm:!mt-8 md:!mt-10 !mb-1 text-[#f7d688]">The auspicious day is near</p>
          <h2 className="!mt-1 !mb-2 sm:!mb-3">Counting down to the celebration</h2>
          <Flourish />
          <Countdown active={active === 3} />
          <Details />
          <a
            className="gold-button inline-flex mt-3 sm:mt-5 md:mt-6"
            href={data.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View location <ArrowRight size={16} />
          </a>
        </Reveal>
      </div>
    </section>
    <section id="section-4" data-index="4" className="scene"><Frame active={active === 4} /><CeremonyStagePicture active={active === 4} /></section>
    <section id="section-5" data-index="5" className="scene gratitude-scene"><Frame active={active === 5} /><GratitudeScroll active={active === 5} onReplay={() => { go(0); setOpened(false); }} /></section>
  </main>
  {opened && <RightProgressNav active={active} onSelect={go} />}</>;
}
