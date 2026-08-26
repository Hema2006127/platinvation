'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  { q: 'Is there parking available?',      a: 'Yes, complimentary valet parking is available for all guests at the Grand Palace entrance.' },
  { q: 'Are children welcome?',            a: "We love little ones! Children are welcome and a dedicated kids' corner will be set up for their enjoyment." },
  { q: 'Is there a prayer area?',          a: 'Yes, a designated prayer area is available on the second floor of the venue.' },
  { q: 'Can I take photos?',               a: 'Please enjoy photos during the celebration. We kindly ask guests to be seated during the ceremony.' },
  { q: 'What food will be served?',        a: 'A full fine-dining experience will be served, including vegetarian and gluten-free options.' },
  { q: 'What is the dress code?',          a: 'Black Tie Optional. We encourage formal elegant attire in our wedding colour palette.' },
  { q: 'What time should I arrive?',       a: 'Doors open at 5:00 PM. We recommend arriving by 5:30 PM to find your seat before the ceremony.' },
  { q: 'Who can I contact for questions?', a: 'Please WhatsApp us and we\'ll be happy to help with any queries.' },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="luxury-section luxury-faq" style={{ padding: 'var(--spacing-xl) 2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span className="lux-eyebrow">Questions & Answers</span>
          <h2 style={{
            color: 'var(--black)', fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontFamily: 'var(--font-display)', fontStyle: 'italic',
          }}>
            Frequently Asked
          </h2>
          <hr className="lux-divider" />
        </motion.div>

        {/* Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {faqs.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              style={{
                border: open === i ? '1px solid var(--gold)' : '1px solid rgba(0,0,0,0.1)',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                background: '#fff',
                boxShadow: open === i
                  ? '0 10px 36px rgba(193,102,59,0.14)'
                  : '0 2px 12px rgba(0,0,0,0.05)',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%', padding: '1.6rem 2rem',
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', background: 'none',
                  border: 'none', cursor: 'pointer', textAlign: 'left', gap: '1rem',
                }}
              >
                <span style={{ color: 'var(--black)', fontSize: '1rem', fontWeight: 500, fontFamily: 'var(--font-english-sans)' }}>
                  {item.q}
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.28 }}
                  style={{
                    flexShrink: 0, width: 30, height: 30, borderRadius: '50%',
                    border: '1px solid var(--gold)', color: 'var(--gold)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.25rem', lineHeight: 1,
                  }}
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{
                      padding: '0 2rem 1.75rem',
                      color: 'var(--charcoal-2)', lineHeight: 1.8, fontSize: '0.93rem',
                      borderTop: '1px solid rgba(193,102,59,0.18)', paddingTop: '1rem',
                    }}>
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
