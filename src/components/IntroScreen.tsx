'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { INVITATION_CONFIG } from '@/lib/invitation-config';

export default function IntroScreen({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState<'seal' | 'breaking' | 'card'>('seal');
  const [exiting, setExiting] = useState(false);
  // Generated client-side only (empty on first render) so the random
  // values can't mismatch between server and client during hydration.
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number; dur: number }>>([]);

  useEffect(() => {
    setParticles(Array.from({ length: 26 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.6 + 1.4,
      delay: Math.random() * 5,
      dur: 3 + Math.random() * 4,
    })));
    const t1 = setTimeout(() => setStage('breaking'), 900);
    const t2 = setTimeout(() => setStage('card'), 2100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleOpen = () => {
    setExiting(true);
    setTimeout(onComplete, 1100);
  };

  const broken = stage === 'breaking' || stage === 'card';
  const bride = INVITATION_CONFIG.brideName;
  const groom = INVITATION_CONFIG.groomName;
  const initials = `${bride[0]}${groom[0]}`;

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(12px)' }}
          transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'radial-gradient(ellipse at center, #2E2C22 0%, #191811 65%, #0D0C09 100%)',
            overflow: 'hidden',
          }}
        >
          {/* Soft sage specks */}
          {particles.map(p => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 0.6, 0], y: -70 }}
              transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'linear' }}
              style={{
                position: 'absolute',
                left: `${p.x}%`, top: `${p.y}%`,
                width: p.size, height: p.size,
                borderRadius: '50%',
                background: '#8FA07E',
                pointerEvents: 'none',
              }}
            />
          ))}

          {/* Ambient radial glow */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at 50% 55%, rgba(193,102,59,0.14) 0%, transparent 58%)',
          }} />

          <div style={{ position: 'relative', width: 420, maxWidth: '88vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            {/* ── Wax seal, breaks in two once "opened" ── */}
            <div style={{ position: 'relative', width: 128, height: 128, marginBottom: broken ? 0 : '1.5rem' }}>
              {/* Ink ripple burst */}
              <AnimatePresence>
                {stage === 'breaking' && (
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0.6 }}
                    animate={{ scale: 2.4, opacity: 0 }}
                    transition={{ duration: 1.1, ease: 'easeOut' }}
                    style={{
                      position: 'absolute', inset: 0, borderRadius: '50%',
                      border: '1.5px solid var(--terracotta)',
                      pointerEvents: 'none',
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Left half */}
              <motion.div
                animate={broken
                  ? { x: -70, y: 30, rotate: -50, opacity: 0 }
                  : { x: 0, y: 0, rotate: 0, opacity: 1 }}
                transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
                style={{
                  position: 'absolute', inset: 0,
                  clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
                }}
              >
                <SealFace pulsing={!broken} />
              </motion.div>

              {/* Right half */}
              <motion.div
                animate={broken
                  ? { x: 70, y: 30, rotate: 50, opacity: 0 }
                  : { x: 0, y: 0, rotate: 0, opacity: 1 }}
                transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
                style={{
                  position: 'absolute', inset: 0,
                  clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)',
                }}
              >
                <SealFace pulsing={!broken} />
              </motion.div>

              {/* Monogram, unclipped — sits on top and fades out as the seal cracks */}
              <motion.div
                animate={{ opacity: broken ? 0 : 1 }}
                transition={{ duration: 0.35 }}
                style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.94)', fontFamily: 'var(--font-display)',
                  fontStyle: 'italic', fontSize: '2.2rem', letterSpacing: '-1px',
                  textShadow: '0 1px 3px rgba(0,0,0,0.45)',
                  pointerEvents: 'none',
                }}
              >
                {initials}
              </motion.div>
            </div>

            {!broken && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                style={{
                  color: 'rgba(244,241,232,0.4)', fontSize: '0.62rem',
                  letterSpacing: '0.3em', textTransform: 'uppercase',
                  fontFamily: 'var(--font-english-sans)',
                }}
              >
                Breaking the seal…
              </motion.p>
            )}

            {/* ── Invitation card, rises where the seal used to be ── */}
            <AnimatePresence>
              {stage === 'card' && (
                <motion.div
                  className="intro-card"
                  initial={{ y: 24, opacity: 0, scale: 0.96 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    width: '100%',
                    marginTop: '1.5rem',
                    background: 'linear-gradient(160deg, #FBF9F2 0%, #F3ECD9 100%)',
                    border: '1px solid #C9BE9E', borderRadius: 8,
                    padding: '2rem 2rem 1.8rem',
                    textAlign: 'center',
                    boxShadow: '0 24px 70px rgba(0,0,0,0.4), 0 0 0 1px rgba(107,122,94,0.15)',
                  }}
                >
                  <div className="intro-ornament" style={{ color: 'var(--sage)', fontSize: '0.95rem', letterSpacing: '0.42em', marginBottom: '0.65rem' }}>✦ ✦ ✦</div>

                  <p className="intro-lead" style={{ fontFamily: 'var(--font-english-sans)', fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: '0.85rem' }}>
                    Together with their families
                  </p>

                  <div className="intro-line" style={{ height: '1px', background: 'linear-gradient(to right, transparent, var(--sage), transparent)', margin: '0 10% 1.1rem' }} />

                  <h2 className="intro-title" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(1.55rem, 4.5vw, 2.3rem)', color: 'var(--ink)', fontWeight: 400, lineHeight: 1.15, margin: 0 }}>
                    {bride}
                  </h2>
                  <div className="intro-heart" style={{ color: 'var(--terracotta)', fontSize: '1.1rem', margin: '0.35rem 0' }}>&amp;</div>
                  <h2 className="intro-title" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(1.55rem, 4.5vw, 2.3rem)', color: 'var(--ink)', fontWeight: 400, lineHeight: 1.15, marginBottom: '1.1rem' }}>
                    {groom}
                  </h2>

                  <div className="intro-line" style={{ height: '1px', background: 'linear-gradient(to right, transparent, var(--sage), transparent)', margin: '0 10% 1rem' }} />

                  <p className="intro-date" style={{ fontFamily: 'var(--font-english-sans)', fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: '1.5rem' }}>
                    {INVITATION_CONFIG.weddingDateLabel} · {INVITATION_CONFIG.venueSubtitle.split('·')[0]?.trim()}
                  </p>

                  <motion.button
                    className="intro-btn"
                    onClick={handleOpen}
                    whileHover={{ scale: 1.04, boxShadow: '0 12px 28px rgba(193,102,59,0.35)' }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      padding: '0.75rem 2.2rem',
                      background: 'linear-gradient(135deg, #C1663B 0%, #9C4F2C 100%)',
                      color: '#fff', border: 'none', borderRadius: '999px',
                      fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                      cursor: 'pointer', fontFamily: 'var(--font-english-sans)',
                      boxShadow: '0 6px 20px rgba(193,102,59,0.3)',
                    }}
                  >
                    Open Invitation
                  </motion.button>

                  <div style={{ color: 'var(--sage)', fontSize: '0.95rem', letterSpacing: '0.42em', marginTop: '1.2rem' }}>✦ ✦ ✦</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** One half of the wax-seal medallion (split by a clip-path in the parent). */
function SealFace({ pulsing }: { pulsing: boolean }) {
  return (
    <motion.div
      animate={pulsing ? { scale: [1, 1.04, 1] } : {}}
      transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: 'radial-gradient(circle at 38% 32%, #D07A4B, #7A3F22)',
        boxShadow: 'inset 0 2px 6px rgba(255,255,255,0.25), inset 0 -6px 14px rgba(0,0,0,0.35), 0 10px 30px rgba(0,0,0,0.4)',
      }}
    />
  );
}
