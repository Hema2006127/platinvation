'use client';

import { motion } from 'framer-motion';
import { INVITATION_CONFIG } from '@/lib/invitation-config';

const storyEvents = [
  { year: '2021', title: 'First Meeting',  description: 'A serendipitous encounter changed our lives forever — two souls recognising each other across a crowded room.', align: 'left',  icon: '✨' },
  { year: '2022', title: 'The Proposal',   description: 'Under a starlit sky, a lifetime promise was whispered. The answer was written in the stars long before.', align: 'right', icon: '💍' },
  { year: '2023', title: 'Engagement',     description: 'Celebrating our commitment surrounded by those we love most. The journey to forever had officially begun.', align: 'left',  icon: '🥂' },
  { year: '2026', title: 'The Wedding',    description: 'The beginning of our forever. Every step of this journey has led beautifully to this day.', align: 'right', icon: '💛' },
];

type StoryEvent = typeof storyEvents[number];

export default function Story() {
  return (
    <section className="luxury-section luxury-story" style={{ padding: 'var(--spacing-xl) var(--spacing-md)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}
        >
          <span className="lux-eyebrow">Our Love Story</span>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--black)', marginBottom: '1.2rem' }}>
            How It All Began
          </h2>
          <hr className="lux-divider" />
          <p style={{ color: 'var(--charcoal-2)', maxWidth: '580px', margin: '1.2rem auto 0', fontSize: '1.05rem', lineHeight: 1.8 }}>
            Every love story is beautiful — but ours is our favourite. Here are the milestones that brought us to this perfect day.
          </p>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Central line */}
          <div style={{
            position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px',
            background: 'linear-gradient(to bottom, transparent, rgba(193,102,59,0.35) 10%, rgba(193,102,59,0.35) 90%, transparent)',
            transform: 'translateX(-50%)',
          }} />

          {storyEvents.map((event, index) => (
            <StoryItem key={index} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StoryItem({ event, index }: { event: StoryEvent; index: number }) {
  const isLeft = event.align === 'left';

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'flex',
        justifyContent: isLeft ? 'flex-start' : 'flex-end',
        padding: '2rem 0',
        width: '100%',
        position: 'relative',
      }}
    >
      {/* Centre dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 14, height: 14,
          borderRadius: '50%',
          background: 'var(--gold)',
          boxShadow: '0 0 0 4px rgba(193,102,59,0.15), 0 0 16px rgba(193,102,59,0.4)',
          zIndex: 2,
        }}
      />

      <motion.div
        whileHover={{ y: -4, boxShadow: '0 20px 50px rgba(0,0,0,0.12)' }}
        transition={{ duration: 0.3 }}
        style={{
          width: '44%',
          padding: '2rem 2rem 2rem',
          background: 'rgba(255,255,255,0.75)',
          border: '1px solid rgba(193,102,59,0.18)',
          borderRadius: 'var(--radius-md)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.07)',
          textAlign: isLeft ? 'right' : 'left',
          position: 'relative',
        }}
      >
        {/* Icon */}
        <div style={{
          display: 'flex',
          justifyContent: isLeft ? 'flex-end' : 'flex-start',
          marginBottom: '0.75rem',
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: 'rgba(193,102,59,0.1)',
            border: '1px solid rgba(193,102,59,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.25rem',
          }}>
            {event.icon}
          </div>
        </div>

        <div style={{
          fontFamily: 'var(--font-display)', fontStyle: 'italic',
          color: 'var(--gold)', fontSize: '1.1rem', marginBottom: '0.35rem',
        }}>
          {event.year}
        </div>
        <h3 style={{
          fontSize: '1.5rem', fontFamily: 'var(--font-display)',
          color: 'var(--black)', marginBottom: '0.75rem', fontWeight: 500,
        }}>
          {event.title}
        </h3>
        <p style={{ color: 'var(--charcoal-2)', lineHeight: 1.75, fontSize: '0.92rem' }}>
          {event.description}
        </p>
      </motion.div>
    </motion.div>
  );
}
