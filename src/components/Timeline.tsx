'use client';

import { motion } from 'framer-motion';
import { INVITATION_CONFIG } from '@/lib/invitation-config';

const events = [
  { time: '5:00 PM',  icon: '🚗', title: 'Guest Arrival',   desc: 'Guests are welcomed with champagne and canapés upon arrival.' },
  { time: '6:00 PM',  icon: '💍', title: 'Ceremony',        desc: 'The wedding ceremony begins in the Grand Hall.' },
  { time: '7:30 PM',  icon: '🍽️', title: 'Dinner',          desc: 'A curated fine-dining experience served to our cherished guests.' },
  { time: '9:00 PM',  icon: '🎂', title: 'Wedding Cake',    desc: 'The ceremonial cutting of our wedding cake.' },
  { time: '9:30 PM',  icon: '💃', title: 'First Dance',     desc: 'The couple takes the floor for their first dance as one.' },
  { time: '10:00 PM', icon: '🎉', title: 'Celebration',     desc: 'Music, dancing and celebration into the night.' },
];

export default function Timeline() {
  return (
    <section className="luxury-section luxury-timeline" style={{ padding: 'var(--spacing-xl) var(--spacing-md)', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px', height: '700px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(193,102,59,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="timeline-container" style={{ paddingBottom: '2rem' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{ textAlign: 'center', marginBottom: '5rem' }}
        >
          <span className="lux-eyebrow" style={{ color: 'var(--gold)' }}>The Big Day</span>
          <h2 style={{
            color: 'var(--ivory)', fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontFamily: 'var(--font-display)', fontStyle: 'italic',
          }}>
            Wedding Schedule
          </h2>
          <hr className="lux-divider" />
          <p style={{ color: 'var(--champagne)', marginTop: '1rem', fontSize: '0.95rem', opacity: 0.75 }}>
            {INVITATION_CONFIG.weddingDateLabel} · {INVITATION_CONFIG.venueName}
          </p>
        </motion.div>

        {/* Timeline Line */}
        <div className="timeline-vertical-line" />

        {/* Events */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem', position: 'relative' }}>
          {events.map((ev, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{ duration: 0.75, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`timeline-row ${isLeft ? 'is-left' : 'is-right'}`}
              >
                {/* Card */}
                <div className="timeline-card-col">
                  <motion.div
                    whileHover={{ y: -4, borderColor: 'rgba(193,102,59,0.6)' }}
                    transition={{ duration: 0.25 }}
                    className="timeline-card"
                    style={{
                      background: 'rgba(193,102,59,0.04)',
                      border: '1px solid rgba(193,102,59,0.18)',
                      borderRadius: 18,
                      padding: '1.6rem',
                      backdropFilter: 'blur(12px)',
                      boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
                    }}
                  >
                    <h3 style={{
                      color: 'var(--ivory)', fontSize: '1.2rem',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic',
                      marginBottom: '0.5rem', fontWeight: 400,
                    }}>
                      {ev.title}
                    </h3>
                    <p style={{ color: 'var(--champagne)', fontSize: '0.88rem', lineHeight: 1.7, margin: 0, opacity: 0.8 }}>
                      {ev.desc}
                    </p>
                  </motion.div>
                </div>

                {/* Badge */}
                <div className="timeline-badge-col">
                  <motion.div
                    className="timeline-icon-circle"
                    whileHover={{ scale: 1.12 }}
                  >
                    {ev.icon}
                  </motion.div>
                  <span className="timeline-time-text">{ev.time}</span>
                </div>

                {/* Spacer */}
                <div className="timeline-spacer-col" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
