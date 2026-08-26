'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { INVITATION_CONFIG } from '@/lib/invitation-config';

const mockWishes = [
  { id: 1, name: 'Emily & James',      avatar: 'E', message: 'Wishing you both a lifetime of love, laughter and endless happiness! You make a truly magical couple. ✨', likes: 12 },
  { id: 2, name: 'Mohammed Al-Rashid', avatar: 'M', message: 'May your love story be filled with joy and blessings. So happy for you both! 🌹', likes: 8 },
  { id: 3, name: 'Sophie Chen',        avatar: 'S', message: 'The most beautiful couple I know — inside and out. Your wedding is going to be absolutely stunning. 💛', likes: 15 },
  { id: 4, name: 'David & Layla',      avatar: 'D', message: 'To many adventures, deep love, and a beautiful life together. Honoured to be part of your day! 🥂', likes: 10 },
];

type Wish = { id: number; name: string; avatar: string; message: string; likes: number };

export default function WishesWall() {
  const [wishes, setWishes] = useState<Wish[]>(mockWishes);
  const [name, setName]       = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setWishes(prev => [{ id: Date.now(), name: name.trim(), avatar: name[0].toUpperCase(), message: message.trim(), likes: 0 }, ...prev]);
    setName(''); setMessage('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
  };

  const bride = INVITATION_CONFIG.brideName;
  const groom = INVITATION_CONFIG.groomName;

  return (
    <section className="luxury-section luxury-wishes" style={{ padding: 'var(--spacing-xl) 2rem', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '900px', height: '500px',
        background: 'radial-gradient(ellipse, rgba(193,102,59,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1120px', margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span className="lux-eyebrow">From The Heart</span>
          <h2 style={{
            color: 'var(--ivory)', fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontFamily: 'var(--font-display)', fontStyle: 'italic',
          }}>
            Wishes Wall
          </h2>
          <hr className="lux-divider" />
          <p style={{ color: 'rgba(255,255,255,0.45)', maxWidth: '480px', margin: '1rem auto 0', lineHeight: 1.75 }}>
            Leave a message for {bride} &amp; {groom} and share in their joy.
          </p>
        </motion.div>

        {/* Submit form */}
        <motion.form
          className="wishes-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            background: 'rgba(193,102,59,0.04)',
            border: '1px solid rgba(193,102,59,0.18)',
            borderRadius: 'var(--radius-md)',
            padding: '2.5rem',
            marginBottom: '4rem',
            backdropFilter: 'blur(16px)',
            display: 'flex', flexDirection: 'column', gap: '1.25rem',
          }}
        >
          <div className="wishes-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your name"
              required
              style={{
                padding: '1rem 1.2rem', background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(193,102,59,0.22)', borderRadius: 14,
                color: '#fff', fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit',
                backdropFilter: 'blur(8px)',
              }}
            />
            <div className="wishes-form-hint" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(193,102,59,0.45)', fontSize: '0.82rem' }}>
              ✍️ Your wish will appear on the wall after you submit
            </div>
          </div>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder={`Write your wish for ${bride} & ${groom}…`}
            required rows={3}
            style={{
              padding: '1rem 1.2rem', background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(193,102,59,0.22)', borderRadius: 14,
              color: '#fff', fontSize: '0.95rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit',
            }}
          />
          <div className="wishes-form-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <AnimatePresence>
              {submitted && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  style={{ color: '#6ee7b7', fontSize: '0.88rem' }}
                >
                  ✓ Your wish has been added!
                </motion.span>
              )}
            </AnimatePresence>
            <motion.button
              type="submit"
              className="lux-btn-gold"
              whileHover={{ y: -2 }}
              style={{ marginLeft: 'auto' }}
            >
              Send Wish 💛
            </motion.button>
          </div>
        </motion.form>

        {/* Masonry cards */}
        <div style={{ columns: 'auto 320px', columnGap: '1.5rem' }}>
          <AnimatePresence>
            {wishes.map((w, i) => (
              <WishCard key={w.id} wish={w} delay={i * 0.07} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function WishCard({ wish, delay }: { wish: Wish; delay: number }) {
  const [liked, setLiked]   = useState(false);
  const [likes, setLikes]   = useState(wish.likes);
  const colors = ['#C1663B', '#E5C9A8', '#6EE7B7', '#93C5FD'];
  const bg = colors[wish.id % colors.length];

  const handleLike = () => {
    if (liked) { setLikes(l => l - 1); setLiked(false); }
    else        { setLikes(l => l + 1); setLiked(true); }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.88 }}
      transition={{ duration: 0.5, delay }}
      style={{
        breakInside: 'avoid',
        marginBottom: '1.5rem',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 22,
        padding: '1.6rem',
        backdropFilter: 'blur(14px)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
      }}
    >
      {/* Avatar + Name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '1rem' }}>
        <div style={{
          width: 44, height: 44, borderRadius: '50%',
          background: `${bg}22`, border: `2px solid ${bg}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: bg, fontWeight: 700, fontSize: '1.1rem', flexShrink: 0,
        }}>
          {wish.avatar}
        </div>
        <span style={{ color: '#fff', fontWeight: 500, fontSize: '0.92rem' }}>{wish.name}</span>
      </div>

      <p style={{ color: 'var(--champagne)', lineHeight: 1.75, fontSize: '0.92rem', margin: '0 0 1.2rem', opacity: 0.85 }}>
        {wish.message}
      </p>

      <motion.button
        onClick={handleLike}
        whileTap={{ scale: 0.9 }}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          background: liked ? 'rgba(193,102,59,0.14)' : 'transparent',
          border: `1px solid ${liked ? 'var(--gold)' : 'rgba(255,255,255,0.1)'}`,
          borderRadius: 999, padding: '0.4rem 1rem',
          color: liked ? 'var(--gold)' : 'rgba(255,255,255,0.35)',
          cursor: 'pointer', fontSize: '0.82rem', transition: 'all 0.22s ease',
        }}
      >
        <motion.span animate={{ scale: liked ? [1, 1.5, 1] : 1 }} transition={{ duration: 0.3 }}>♥</motion.span>
        {likes}
      </motion.button>
    </motion.div>
  );
}
