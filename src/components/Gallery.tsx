'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  { src: 'https://images.unsplash.com/photo-1492175742197-ed20dc5a6bed?w=900&q=80', alt: 'Wedding ceremony' },
  { src: 'https://images.unsplash.com/photo-1625224699695-2b31e3698312?w=900&q=80', alt: 'Wedding flowers' },
  { src: 'https://images.unsplash.com/photo-1549488497-94b52bddac5d?w=900&q=80', alt: 'Wedding couple' },
  { src: 'https://images.unsplash.com/photo-1627293509201-cd0c780043e6?w=900&q=80', alt: 'Wedding rings' },
  { src: 'https://images.unsplash.com/photo-1476836349418-180f91b52141?w=900&q=80', alt: 'Wedding dress' },
  { src: 'https://images.unsplash.com/photo-1533120921505-7f40f5237ee1?w=900&q=80', alt: 'Wedding reception' },
  { src: 'https://images.unsplash.com/photo-1705058718118-80cadb3e9f4c?w=900&q=80', alt: 'Wedding bouquet' },
  { src: 'https://images.unsplash.com/photo-1683435844312-ac5324de7572?w=900&q=80', alt: 'Wedding venue' },
];

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const [idx, setIdx] = useState(0);

  function openLight(i: number) { setIdx(i); setSelected(i); }
  function closeLight() { setSelected(null); }
  function prev(e: React.MouseEvent) { e.stopPropagation(); setIdx(i => (i - 1 + images.length) % images.length); }
  function next(e: React.MouseEvent) { e.stopPropagation(); setIdx(i => (i + 1) % images.length); }

  return (
    <section className="luxury-section luxury-gallery" style={{ padding: 'var(--spacing-xl) var(--spacing-md)' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}
        >
          <span className="lux-eyebrow">A Glimpse Into Our World</span>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--black)' }}>
            Precious Moments
          </h2>
          <hr className="lux-divider" />
        </motion.div>

        {/* Masonry grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
          gap: '1rem',
          gridAutoFlow: 'dense',
        }}>
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.65, delay: i * 0.07 }}
              onClick={() => openLight(i)}
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 'var(--radius-sm)',
                cursor: 'zoom-in',
                aspectRatio: i % 3 === 0 ? '1 / 1' : '3 / 4',
                boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                gridRow: i % 5 === 0 ? 'span 2' : 'span 1',
              }}
            >
              <motion.img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                onError={e => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/wed${i}/600/800`; }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                whileHover={{ scale: 1.07 }}
                transition={{ duration: 0.4 }}
              />
              {/* Terracotta hover overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to bottom, transparent 40%, rgba(193,102,59,0.35) 100%)',
                  display: 'flex', alignItems: 'flex-end', padding: '1.25rem',
                }}
              >
                <span style={{ color: '#fff', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-english-sans)' }}>
                  View →
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLight}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(43,43,38,0.95)',
              zIndex: 10000,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '2rem',
              backdropFilter: 'blur(8px)',
            }}
          >
            {/* Close */}
            <button
              onClick={closeLight}
              style={{
                position: 'absolute', top: '1.5rem', right: '1.5rem',
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '50%', width: 44, height: 44, color: '#fff', fontSize: '1.2rem',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              ×
            </button>

            {/* Prev */}
            <button
              onClick={prev}
              style={{
                position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '50%', width: 48, height: 48, color: '#fff', fontSize: '1.3rem',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              ‹
            </button>

            <motion.img
              key={idx}
              src={images[idx].src}
              alt={images[idx].alt}
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain',
                borderRadius: 'var(--radius-sm)',
                boxShadow: '0 32px 100px rgba(0,0,0,0.6)',
              }}
              onClick={e => e.stopPropagation()}
            />

            {/* Next */}
            <button
              onClick={next}
              style={{
                position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '50%', width: 48, height: 48, color: '#fff', fontSize: '1.3rem',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              ›
            </button>

            {/* Counter */}
            <div style={{
              position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)',
              color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem', letterSpacing: '0.1em',
            }}>
              {idx + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
