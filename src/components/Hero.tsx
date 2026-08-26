'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { INVITATION_CONFIG } from '@/lib/invitation-config';

function pad(n: number) { return String(n).padStart(2, '0'); }

function useCountdown(targetIso: string) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const target = new Date(targetIso).getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) return;
      setTime({
        days:    Math.floor(diff / 86_400_000),
        hours:   Math.floor((diff % 86_400_000) / 3_600_000),
        minutes: Math.floor((diff % 3_600_000)  / 60_000),
        seconds: Math.floor((diff % 60_000)     / 1_000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetIso]);
  return time;
}

/** Thin hand-drawn-style botanical sprig, used as a recurring motif instead of gold ornaments. */
function Sprig({ style, flip }: { style?: React.CSSProperties; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 120 60"
      width="120"
      height="60"
      style={{ position: 'absolute', opacity: 0.5, transform: flip ? 'scaleX(-1)' : undefined, ...style }}
    >
      <path d="M2 58C22 40 34 26 58 16" stroke="var(--sage)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      {[[14, 46, 10], [26, 34, 16], [38, 24, 22], [50, 17, 28]].map(([x, y, r], i) => (
        <ellipse key={i} cx={x} cy={y} rx={7} ry={3.2} fill="none" stroke="var(--sage)" strokeWidth="1.1"
          transform={`rotate(${-30 - i * 6} ${x} ${y})`} opacity={0.85} />
      ))}
      <circle cx="58" cy="16" r="2.2" fill="var(--terracotta)" />
    </svg>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], ['0px', '50px']);
  const opacity  = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const time = useCountdown(INVITATION_CONFIG.weddingDate);

  const countdownItems = [
    { label: 'Days',    value: time.days    },
    { label: 'Hours',   value: time.hours   },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds },
  ];

  /* soft drifting leaf specks — replaces the old gold-dust particles.
     Generated client-side only (empty on first render) so the random
     values can't mismatch between server and client during hydration. */
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number; dur: number }>>([]);
  useEffect(() => {
    setParticles(Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 2,
      delay: Math.random() * 6,
      dur: 7 + Math.random() * 5,
    })));
  }, []);

  return (
    <div ref={containerRef} className="luxury-hero" style={{ height: '100svh' }}>
      {/* Botanical corner sprigs */}
      <Sprig style={{ top: '6%', left: '3%' }} />
      <Sprig style={{ bottom: '6%', right: '3%' }} flip />

      {/* Drifting leaf specks */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 0.5, 0], y: -50 }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'linear' }}
          style={{
            position: 'absolute',
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            borderRadius: '50%',
            background: 'var(--sage)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      ))}

      {/* Hero content */}
      <motion.div
        className="luxury-hero__content"
        style={{ y: contentY, opacity, position: 'relative', zIndex: 2 }}
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.6em' }}
          animate={{ opacity: 1, letterSpacing: '0.35em' }}
          transition={{ duration: 1.8, delay: 0.2 }}
          style={{
            color: 'var(--terracotta)',
            textTransform: 'uppercase',
            fontSize: '0.72rem',
            marginBottom: '2rem',
            fontFamily: 'var(--font-english-sans)',
            fontWeight: 600,
          }}
        >
          Together forever
        </motion.p>

        {/* Thin sage line */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 48, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{ height: 1, margin: '0 auto 2.25rem', background: 'var(--sage)' }}
        />

        {/* Couple Names */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.5, ease: [0.22,1,0.36,1] }}
          style={{
            fontSize: 'clamp(3.2rem, 9vw, 6.8rem)',
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 400,
            color: 'var(--ink)',
            lineHeight: 1.05,
            marginBottom: '0.5rem',
          }}
        >
          {INVITATION_CONFIG.brideName}
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            style={{
              display: 'block',
              fontSize: '0.2em',
              color: 'var(--terracotta)',
              letterSpacing: '0.3em',
              fontStyle: 'normal',
              margin: '0.7em 0',
              fontFamily: 'var(--font-english-sans)',
            }}
          >
            &amp;
          </motion.span>
          {INVITATION_CONFIG.groomName}
        </motion.h1>

        {/* Date & Venue */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          style={{
            color: 'var(--ink-soft)',
            fontSize: '0.82rem',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            marginTop: '1.75rem',
            marginBottom: '3rem',
          }}
        >
          {INVITATION_CONFIG.weddingDateLabel} · {INVITATION_CONFIG.venueSubtitle.split('·')[1]?.trim() || 'Dubai'}
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}
        >
          {countdownItems.map(({ label, value }) => (
            <div
              key={label}
              style={{
                textAlign: 'center',
                minWidth: '90px',
                padding: '1.1rem 0.9rem',
                background: 'var(--paper)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-sm)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ fontSize: '2.1rem', fontFamily: 'var(--font-display)', color: 'var(--terracotta)', lineHeight: 1 }}>
                {pad(value)}
              </div>
              <div style={{ fontSize: '0.62rem', color: 'var(--ink-faint)', textTransform: 'uppercase', letterSpacing: '0.14em', marginTop: '0.5rem' }}>
                {label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <motion.a
            href="#rsvp"
            whileHover={{ y: -3, boxShadow: '0 16px 32px rgba(193,102,59,0.32)' }}
            style={{
              padding: '1rem 2.5rem',
              background: 'var(--terracotta)',
              color: '#fff',
              borderRadius: '999px',
              fontFamily: 'var(--font-english-sans)',
              fontSize: '0.8rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 600,
              boxShadow: 'var(--shadow-gold)',
              display: 'inline-block',
            }}
          >
            RSVP Now
          </motion.a>

          <motion.a
            href="#location"
            whileHover={{ y: -2, background: 'var(--sage-pale)' }}
            style={{
              padding: '1rem 2.5rem',
              background: 'transparent',
              border: '1px solid var(--sage)',
              color: 'var(--sage-deep)',
              borderRadius: '999px',
              fontFamily: 'var(--font-english-sans)',
              fontSize: '0.8rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'inline-block',
            }}
          >
            View Venue
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        style={{
          position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
          color: 'var(--ink-faint)', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase',
          zIndex: 2,
        }}
      >
        <div style={{ width: '1px', height: '36px', background: 'linear-gradient(to bottom, transparent, var(--sage))' }} />
        Scroll
      </motion.div>
    </div>
  );
}
