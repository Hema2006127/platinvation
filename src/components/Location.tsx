'use client';

import { motion } from 'framer-motion';
import { INVITATION_CONFIG } from '@/lib/invitation-config';

const dressCodes = [
  { icon: '👔', title: 'Gentlemen', desc: 'Tuxedo or a formal dark suit with a tie.' },
  { icon: '👗', title: 'Ladies',    desc: 'Evening gown or a formal cocktail dress.' },
];

const paletteColors = [
  { hex: '#0d0d0d', label: 'Black'      },
  { hex: '#1A2A3A', label: 'Navy Blue'  },
  { hex: '#2C1810', label: 'Dark Brown' },
  { hex: '#C9A227', label: 'Gold'       },
];

export default function Location() {
  return (
    <section className="luxury-section luxury-location" style={{ padding: 'var(--spacing-xl) var(--spacing-md)', color: '#fff', position: 'relative' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '5rem' }}>

        {/* ── Venue ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          style={{ textAlign: 'center' }}
        >
          <span className="lux-eyebrow" style={{ color: 'var(--gold)' }}>The Venue</span>
          <h2 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontFamily: 'var(--font-display)', fontStyle: 'italic',
            color: 'var(--ivory)', marginBottom: '0.5rem',
          }}>
            {INVITATION_CONFIG.venueName}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.88rem', letterSpacing: '0.12em', marginBottom: '3rem' }}>
            {INVITATION_CONFIG.venueSubtitle}
          </p>

          {/* Map */}
          <div style={{
            borderRadius: 'var(--radius-md)', overflow: 'hidden',
            border: '1px solid rgba(193,102,59,0.22)',
            boxShadow: '0 24px 70px rgba(0,0,0,0.6)',
            position: 'relative', width: '100%',
            paddingTop: 'clamp(240px, 42vw, 400px)',
            background: '#201E17',
          }}>
            <iframe
              src={INVITATION_CONFIG.mapsEmbed}
              title={INVITATION_CONFIG.venueName}
              style={{
                position: 'absolute', top: 0, left: 0,
                width: '100%', height: '100%',
                border: 0,
                filter: 'grayscale(85%) contrast(1.1) brightness(0.85)',
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Map CTA */}
          <div style={{ marginTop: '2rem' }}>
            <motion.a
              href={INVITATION_CONFIG.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="lux-btn-gold"
              whileHover={{ y: -3 }}
              style={{ display: 'inline-flex' }}
            >
              📍 Open in Google Maps
            </motion.a>
          </div>
        </motion.div>

        {/* ── Dress Code ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, delay: 0.15 }}
          style={{ textAlign: 'center' }}
        >
          <span className="lux-eyebrow" style={{ color: 'var(--gold)' }}>Dress Code</span>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontFamily: 'var(--font-display)', fontStyle: 'italic',
            color: 'var(--ivory)', marginBottom: '0.5rem',
          }}>
            {INVITATION_CONFIG.dressCode}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '540px', margin: '0 auto 3rem', lineHeight: 1.75, fontSize: '0.95rem' }}>
            We invite our guests to dress in elegant formal attire to match the grandeur of the evening.
          </p>

          {/* Cards */}
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
            {dressCodes.map(card => (
              <motion.div
                key={card.title}
                whileHover={{ y: -6, borderColor: 'rgba(193,102,59,0.55)' }}
                transition={{ duration: 0.25 }}
                style={{
                  flex: 1, minWidth: 240, maxWidth: 360,
                  padding: '2rem',
                  background: 'rgba(193,102,59,0.04)',
                  border: '1px solid rgba(193,102,59,0.18)',
                  borderRadius: 'var(--radius-md)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.85rem' }}>{card.icon}</div>
                <h3 style={{
                  fontSize: '1.3rem', fontFamily: 'var(--font-display)', fontStyle: 'italic',
                  color: 'var(--gold)', marginBottom: '0.65rem',
                }}>
                  {card.title}
                </h3>
                <p style={{ color: 'var(--champagne)', lineHeight: 1.7, fontSize: '0.92rem' }}>
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Palette */}
          <div>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.22em', marginBottom: '1.25rem' }}>
              Recommended Colours
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {paletteColors.map(c => (
                <motion.div
                  key={c.hex}
                  title={c.label}
                  whileHover={{ scale: 1.15, y: -4 }}
                  style={{
                    width: 42, height: 42, borderRadius: '50%',
                    background: c.hex,
                    border: '2px solid rgba(255,255,255,0.14)',
                    boxShadow: `0 6px 18px ${c.hex}80`,
                    cursor: 'default',
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
