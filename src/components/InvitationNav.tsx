'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { INVITATION_CONFIG } from '@/lib/invitation-config';

const NAV_LINKS = [
  { href: '#story',    label: 'Our Story' },
  { href: '#moments',  label: 'Gallery' },
  { href: '#timeline', label: 'Schedule' },
  { href: '#location', label: 'Venue' },
  { href: '#rsvp',     label: 'RSVP' },
  { href: '#wishes',   label: 'Wishes' },
];

export default function InvitationNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  return (
    <motion.nav
      ref={navRef}
      className="invitation-nav"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
      aria-label="Invitation navigation"
    >
      {/* Monogram */}
      <span className="invitation-nav__monogram" aria-label="Couple monogram">
        {INVITATION_CONFIG.brideName.charAt(0)}
        <span>&</span>
        {INVITATION_CONFIG.groomName.charAt(0)}
      </span>

      {/* Desktop links */}
      <div className="invitation-nav__links" role="menubar">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            role="menuitem"
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Desktop CTA */}
      <a href="#rsvp" className="invitation-nav__rsvp">RSVP</a>

      {/* Mobile Toggle */}
      <button
        className="invitation-nav__toggle"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((o) => !o)}
      >
        <span style={{ transform: menuOpen ? 'rotate(45deg) translateY(5px)' : undefined }} />
        <span style={{ opacity: menuOpen ? 0 : 1 }} />
        <span style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-5px)' : undefined }} />
      </button>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="invitation-nav__mobile"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#rsvp"
              onClick={() => setMenuOpen(false)}
              style={{
                marginTop: '0.5rem',
                textAlign: 'center',
                background: 'var(--grad-gold)',
                borderRadius: '12px',
                color: '#fff',
                padding: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                fontSize: '0.78rem',
                textTransform: 'uppercase',
              }}
            >
              RSVP Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
