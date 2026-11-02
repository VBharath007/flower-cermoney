'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { invitation as data } from '@/lib/invitation';
import { RotateCcw } from 'lucide-react';

interface CoupleSectionProps {
  active?: boolean;
}

export default function CoupleSection({ active }: CoupleSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [joined, setJoined] = useState(false);

  const playWalkAnimation = () => {
    const video = videoRef.current;
    if (!video) return;

    setJoined(false);
    video.currentTime = 0;
    video.muted = true;
    // Play at a graceful, natural 1.35x pace (neither dragging nor rushing)
    video.defaultPlaybackRate = 1.35;
    video.playbackRate = 1.35;

    const promise = video.play();
    if (promise !== undefined) {
      promise.catch(() => {
        video.muted = true;
        video.playbackRate = 1.35;
        video.play().catch(() => { });
      });
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (active) {
      playWalkAnimation();
    } else {
      setJoined(false);
      if (!video.paused) {
        video.pause();
      }
    }
  }, [active]);

  // Track video playback time: Couple stops walking and stands holding hands at ~7.6s (real-world ~4.3s)
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure playback rate remains 1.35x during playback
    if (video.playbackRate !== 1.35 && !video.paused) {
      video.playbackRate = 1.35;
    }

    if (video.currentTime >= 7.6 || video.ended) {
      if (!joined) {
        setJoined(true);
      }
    }
  };

  const handleVideoClick = () => {
    playWalkAnimation();
  };

  const handleVideoEnded = () => {
    const video = videoRef.current;
    if (video) {
      video.pause(); // Maintain the final hand-holding pose
    }
    setJoined(true);
  };

  return (
    <div className="scene-content !py-2 !px-2 sm:!px-4 md:!px-6 max-w-[1240px] mx-auto w-full flex flex-col items-center justify-center">
      {/* 
        Couple Walk Stage Video Container (16:9 Aspect Ratio)
        Blends seamlessly into the dark peacock teal background 
      */}
      <div
        className="relative w-full max-w-[1100px] aspect-[16/9] mx-auto rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_16px_40px_rgba(0,10,14,0.75)] border border-[#d5b56d44] group cursor-pointer bg-[#022026]"
        onClick={handleVideoClick}
        title="Tap to replay bride & groom walking entrance"
      >
        <video
          ref={videoRef}
          playsInline
          muted
          preload="auto"
          poster="/images/couple_walk_poster.jpg"
          onLoadedMetadata={(e) => {
            (e.target as HTMLVideoElement).playbackRate = 1.35;
          }}
          onPlay={(e) => {
            (e.target as HTMLVideoElement).playbackRate = 1.35;
          }}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnded}
          className="w-full h-full object-contain block select-none"
          aria-label="Bride and Groom Walking Entrance Animation"
        >
          <source src="/images/bride groom walk.mp4" type="video/mp4" />
          <source src="/images/bride%20groom%20walk.mp4" type="video/mp4" />
          Your browser does not support video playback.
        </video>

        {/* =========================================================
            LEFT NAME: Directly & perfectly centered below "Bride"
            Appears promptly ("takunu") once couple stands in center
            ========================================================= */}
        <motion.div
          className="couple-name-badge bride-badge"
          initial={false}
          animate={{
            opacity: joined ? 1 : 0,
            y: joined ? 0 : 5,
            scale: joined ? 1 : 0.9,
          }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="couple-name-text">
            {data.bride.name}
          </h3>
          <motion.span
            className="couple-name-line"
            initial={false}
            animate={{ scaleX: joined ? 1 : 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          />
        </motion.div>

        {/* =========================================================
            RIGHT NAME: Directly & perfectly centered below "Groom"
            Appears promptly ("takunu") once couple stands in center
            ========================================================= */}
        <motion.div
          className="couple-name-badge groom-badge"
          initial={false}
          animate={{
            opacity: joined ? 1 : 0,
            y: joined ? 0 : 5,
            scale: joined ? 1 : 0.9,
          }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="couple-name-text">
            {data.groom.name}
          </h3>
          <motion.span
            className="couple-name-line"
            initial={false}
            animate={{ scaleX: joined ? 1 : 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          />
        </motion.div>

        {/* Replay indicator on hover */}
        <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 px-2 sm:px-2.5 py-1 rounded-full bg-[#001f25b3] border border-[#d5b56d55] text-[#ffd77a] text-[9px] sm:text-[10px] font-cinzel tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shadow-md pointer-events-none z-30">
          <RotateCcw size={10} />
          <span>Replay</span>
        </div>
      </div>

      {/* Subtitle below: Together, with love & blessings */}
   
    </div>
  );
}
