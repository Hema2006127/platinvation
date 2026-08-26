'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ui/ToastContext';
import { INVITATION_CONFIG } from '@/lib/invitation-config';

type FormData = {
  name: string;
  phone: string;
  attendance: string;
  guests: string;
  dietary: string;
  message: string;
};

const INITIAL: FormData = { name: '', phone: '', attendance: '', guests: '1', dietary: '', message: '' };

export default function RSVP() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const { notify } = useToast();

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    await new Promise(r => setTimeout(r, 1800));
    setStatus('success');
    notify('Your RSVP has been beautifully recorded. 💛');
  };

  const inputBase: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box',
    padding: '1rem 1.1rem',
    background: 'rgba(255,255,255,0.55)',
    border: '1px solid rgba(107,122,94,0.28)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--black)',
    fontSize: '0.95rem',
    outline: 'none',
    fontFamily: 'inherit',
    backdropFilter: 'blur(8px)',
    transition: 'border-color 0.25s, box-shadow 0.25s',
  };

  return (
    <section
      className="luxury-section luxury-rsvp"
      style={{ padding: 'var(--spacing-xl) var(--spacing-md)', position: 'relative' }}
    >
      {/* Decorative blobs */}
      <div style={{
        position: 'absolute', top: '-5rem', right: '-5rem', width: '30rem', height: '30rem',
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(193,102,59,0.07), transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <span className="lux-eyebrow">Kindly Respond</span>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontFamily: 'var(--font-display)', fontStyle: 'italic',
            color: 'var(--black)',
          }}>
            RSVP
          </h2>
          <hr className="lux-divider" />
          <p style={{ color: 'var(--charcoal-2)', marginTop: '1rem', lineHeight: 1.75 }}>
            Kindly respond by <strong>{INVITATION_CONFIG.rsvpDeadline}</strong>
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            /* Success State */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                textAlign: 'center',
                padding: '5rem 2rem',
                border: '1px solid rgba(193,102,59,0.28)',
                borderRadius: 'var(--radius-lg)',
                background: 'rgba(255,255,255,0.6)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 20px 60px rgba(193,102,59,0.1)',
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2, stiffness: 200 }}
                style={{ fontSize: '3rem', marginBottom: '1.5rem' }}
              >
                💛
              </motion.div>
              <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--gold)', marginBottom: '1rem' }}>
                Thank You!
              </h3>
              <p style={{ color: 'var(--charcoal-2)', fontSize: '1.05rem', lineHeight: 1.8 }}>
                Your response has been beautifully recorded.<br />
                We can&apos;t wait to celebrate with you.
              </p>
            </motion.div>
          ) : (
            /* Form */
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rsvp-form-container"
              style={{
                padding: '3rem',
                background: 'rgba(255,255,255,0.65)',
                border: '1px solid rgba(193,102,59,0.2)',
                borderRadius: 'var(--radius-lg)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 24px 80px rgba(0,0,0,0.1)',
                display: 'flex', flexDirection: 'column', gap: '1.5rem',
              }}
            >
              <div className="rsvp-form-row">
                <Field label="Full Name">
                  <input required type="text" style={inputBase} placeholder="Your full name" value={form.name} onChange={set('name')} />
                </Field>
                <Field label="Phone Number">
                  <input required type="tel" style={inputBase} placeholder="+1 234 567 890" value={form.phone} onChange={set('phone')} />
                </Field>
              </div>

              <div className="rsvp-form-row">
                <Field label="Will You Attend?">
                  <select required style={{ ...inputBase, appearance: 'none', cursor: 'pointer' }} value={form.attendance} onChange={set('attendance')}>
                    <option value="" disabled>Select attendance</option>
                    <option value="yes">✅ Joyfully Accepts</option>
                    <option value="no">❌ Regretfully Declines</option>
                    <option value="maybe">🤔 Maybe</option>
                  </select>
                </Field>
                <Field label="Number of Guests">
                  <input required type="number" min="1" max="10" style={inputBase} value={form.guests} onChange={set('guests')} />
                </Field>
              </div>

              <Field label="Dietary Requirements">
                <input type="text" style={inputBase} placeholder="E.g. Vegetarian, No Gluten" value={form.dietary} onChange={set('dietary')} />
              </Field>

              <Field label="A Message for the Couple">
                <textarea rows={4} style={{ ...inputBase, resize: 'vertical' }} placeholder="Share a heartfelt wish..." value={form.message} onChange={set('message')} />
              </Field>

              <motion.button
                type="submit"
                disabled={status === 'submitting'}
                whileHover={status !== 'submitting' ? { y: -2, boxShadow: '0 16px 40px rgba(193,102,59,0.45)' } : {}}
                whileTap={{ scale: 0.98 }}
                style={{
                  marginTop: '0.5rem',
                  padding: '1.1rem',
                  background: status === 'submitting'
                    ? 'rgba(193,102,59,0.5)'
                    : 'var(--terracotta)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 'var(--radius-pill)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: status === 'submitting' ? 'wait' : 'pointer',
                  width: '100%',
                  boxShadow: '0 8px 28px rgba(193,102,59,0.32)',
                  transition: 'background 0.3s',
                }}
              >
                {status === 'submitting' ? '✦ Sending…' : '✦ Send RSVP'}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label style={{ fontSize: '0.72rem', color: 'var(--charcoal-2)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
        {label}
      </label>
      {children}
    </div>
  );
}
