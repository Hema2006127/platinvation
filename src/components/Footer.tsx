'use client';

import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/ToastContext';
import { INVITATION_CONFIG } from '@/lib/invitation-config';

export default function Footer() {
  const { notify } = useToast();
  const bride = INVITATION_CONFIG.brideName;
  const groom = INVITATION_CONFIG.groomName;

  return (
    <footer className="luxury-footer" style={{
      padding: 'var(--spacing-xl) var(--spacing-md)',
      borderTop: '1px solid rgba(193,102,59,0.18)',
      textAlign: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative top line */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 160, height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
      }} />

      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {/* Monogram */}
          <div style={{
            fontFamily: 'var(--font-display)', fontStyle: 'italic',
            fontSize: 'clamp(3rem, 7vw, 5rem)',
            color: 'var(--gold)', lineHeight: 1, marginBottom: '1rem',
          }}>
            {bride[0]} &amp; {groom[0]}
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)', fontStyle: 'italic',
            fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
            color: 'var(--black)', marginBottom: '1rem',
          }}>
            We Can&apos;t Wait To Celebrate With You
          </h2>
          <p style={{ color: 'var(--charcoal-2)', marginBottom: '3rem', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Your presence is the greatest gift of all.
          </p>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}>
            <motion.button
              className="lux-btn-outline"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => notify('WhatsApp sharing is ready from the floating button.', 'info')}
            >
              💬 Share on WhatsApp
            </motion.button>
            <motion.button
              className="lux-btn-outline"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => notify('Calendar event download will be available shortly.', 'info')}
            >
              📅 Add to Calendar
            </motion.button>
          </div>

          {/* Divider */}
          <hr className="lux-divider" style={{ margin: '2rem auto' }} />

          {/* Social */}
          <div style={{ marginBottom: '2rem' }}>
            <a
              href={INVITATION_CONFIG.instagram}
              target="_blank" rel="noopener noreferrer"
              aria-label="Instagram"
              style={{ color: 'var(--gold)', fontSize: '1.4rem', transition: 'opacity 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              📸
            </a>
          </div>

          <p style={{
            color: 'rgba(0,0,0,0.35)', fontSize: '0.75rem',
            letterSpacing: '0.12em', textTransform: 'uppercase', lineHeight: 2,
          }}>
            © {new Date().getFullYear()} {bride} &amp; {groom}. All Rights Reserved.<br />
            Crafted with love &amp; elegance.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
