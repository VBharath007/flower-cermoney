'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { invitation as data } from '@/lib/invitation';
import { Corner, Lamp, Petals } from './Decorations';

export default function Opening({ onComplete }: { onComplete: () => void }) {
  const [opening, setOpening] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  function open() {
    if (opening) return;
    setOpening(true);
    // Gates split & open smoothly -> directly reveal the main invitation
    timer.current = setTimeout(onComplete, 1150);
  }

  return (
    <motion.div
      className="opening"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
      role="dialog"
      aria-modal="true"
      aria-label="Open your flower ceremony invitation"
    >
      <Petals />

      {/* Royal 3D Gates swinging open AFTER the gentle shake */}
      {['left', 'right'].map((side) => (
        <motion.div
          key={side}
          className={`gate ${side}`}
          initial={{ rotateY: 0 }}
          animate={{ rotateY: opening ? (side === 'left' ? -108 : 108) : 0 }}
          transition={{ duration: 1.4, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="gate-inner">
            <div className="gate-border" />
            {['tl', 'tr', 'bl', 'br'].map((c) => (
              <Corner key={c} className={`corner ${c}`} />
            ))}
            <div className="studs">
              {Array.from({ length: 9 }, (_, i) => (
                <i key={i} />
              ))}
            </div>
            <span className="handle" />
          </div>
          <motion.div
            className="gate-shadow"
            animate={{ opacity: opening ? 0.55 : 0 }}
            transition={{ duration: 1.4, delay: 0.38 }}
          />
        </motion.div>
      ))}

      {/* Front Royal Arch Art: Shakes first, then splits and slides open */}
      <div className="opening-art">
        <motion.div
          className="shake"
          animate={opening ? { x: [0, -3, 3, -4, 4, -3, 2, 0] } : { x: 0 }}
          transition={{ duration: 0.42, ease: [0.36, 0.07, 0.19, 0.97] }}
        >
          {['left', 'right'].map((side) => (
            <motion.div
              key={side}
              className={`art-half ${side}`}
              animate={
                opening
                  ? {
                      x: side === 'left' ? '-74vw' : '74vw',
                      rotate: side === 'left' ? -3 : 3,
                      opacity: 0,
                    }
                  : { x: 0, rotate: 0, opacity: 1 }
              }
              transition={{ duration: 1.35, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
            >
              <img src={data.openingImage} alt="" draggable="false" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {!opening && (
          <motion.div
            className="open-button-wrap"
            exit={{ y: 16, opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <button autoFocus className="gold-button open-button" onClick={open}>
              Tap to open
              <span className="button-halo" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Lamp className="opening-lamp left" />
      <Lamp className="opening-lamp right" />
    </motion.div>
  );
}
