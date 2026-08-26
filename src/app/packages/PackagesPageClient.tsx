'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

/* ── Feature definitions ── */
const GOLD_FEATURES = [
  'Luxury Digital Invitation',
  'Animated Hero with Countdown',
  'Wedding Story Section',
  'Photo Gallery',
  'RSVP Form',
  'Guest Wishes Wall',
  'FAQ Section',
  'Mobile Responsive',
  'RTL Arabic Support',
  'WhatsApp Integration',
];

const PLATINUM_EXTRAS = [
  'Everything in Gold',
  'Custom Background Music',
  'Interactive Timeline',
  'Location & Maps',
  'Dress Code Section',
  'Admin Dashboard',
  'Guest Management',
  'Export RSVPs',
  'Custom Domain',
];

const DIAMOND_EXTRAS = [
  'Everything in Platinum',
  'Personal QR Invitations',
  'Digital Entry Passes',
  'QR Check-In Scanner',
  'Real-time Photo Sharing',
  'Photo Moderation',
  'Advanced Analytics',
  'Encrypted Token Security',
  'Live Check-In Dashboard',
  'Priority Support 24/7',
  'Unlimited Guests',
];

interface PkgFeatureProps {
  text: string;
  tier: 'gold' | 'platinum' | 'diamond';
}

function PkgFeature({ text, tier }: PkgFeatureProps) {
  return (
    <div className="pkg-feature">
      <span className={`pkg-feature__icon pkg-feature__icon--${tier}`}>✓</span>
      <span>{text}</span>
    </div>
  );
}

export default function PackagesPageClient() {
  return (
    <div className="packages-page">
      {/* ── Nav bar ── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.1rem 2.5rem',
        background: 'rgba(14,11,7,0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(193,102,59,0.12)',
      }}>
        <Link href="/" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.4rem', color: 'var(--gold)' }}>
          Luxury Invites
        </Link>
        <Link href="/" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          ← Back to Invitation
        </Link>
      </nav>

      {/* ── Hero ── */}
      <div className="packages-hero">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="lux-eyebrow">Pricing</span>
          <h1 style={{
            fontSize: 'clamp(3rem, 7vw, 5.5rem)',
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            color: 'var(--ivory)',
            lineHeight: 1.1,
            marginBottom: '1.5rem',
          }}>
            Choose Your Perfect<br />
            <span style={{ color: 'var(--gold)' }}>Wedding Experience</span>
          </h1>
          <hr className="lux-divider" />
          <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '560px', margin: '1.5rem auto 0', lineHeight: 1.8, fontSize: '1rem' }}>
            Three tiers of luxury crafted for the most important day of your life. Every package delivers an unforgettable digital experience.
          </p>
        </motion.div>
      </div>

      {/* ── Cards ── */}
      <div style={{ padding: '0 1.5rem 8rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="packages-grid">

          {/* ── GOLD ── */}
          <motion.div
            className="pkg-card pkg-card--gold"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            whileHover={{ scale: 1.015 }}
          >
            <span className="pkg-card__badge pkg-badge--gold">Gold</span>
            <h2 className="pkg-card__name" style={{ color: 'var(--ivory)' }}>Gold</h2>
            <p className="pkg-card__tagline">The perfect elegant start</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.25rem' }}>
              <span className="pkg-card__price" style={{ color: 'var(--gold)' }}>
                <span style={{ fontSize: '1.4rem', verticalAlign: 'top', marginTop: '0.8rem', display: 'inline-block' }}>$</span>
                499
              </span>
            </div>
            <p className="pkg-card__period">One-time payment</p>
            <div className="pkg-card__divider" />
            <div className="pkg-card__features">
              {GOLD_FEATURES.map(f => <PkgFeature key={f} text={f} tier="gold" />)}
            </div>
            <Link href="/#rsvp">
              <motion.button
                className="lux-btn-outline"
                whileHover={{ scale: 1.03 }}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Get Gold
              </motion.button>
            </Link>
          </motion.div>

          {/* ── PLATINUM ── */}
          <motion.div
            className="pkg-card pkg-card--platinum"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.015 }}
          >
            <span className="pkg-card__badge pkg-badge--platinum">Platinum</span>
            <h2 className="pkg-card__name" style={{ color: 'var(--ivory)' }}>Platinum</h2>
            <p className="pkg-card__tagline">Premium features, elevated</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.25rem' }}>
              <span className="pkg-card__price" style={{ color: '#d0d0e0' }}>
                <span style={{ fontSize: '1.4rem', verticalAlign: 'top', marginTop: '0.8rem', display: 'inline-block' }}>$</span>
                999
              </span>
            </div>
            <p className="pkg-card__period">One-time payment</p>
            <div className="pkg-card__divider" style={{ background: 'linear-gradient(90deg, transparent, rgba(200,200,220,0.3), transparent)' }} />
            <div className="pkg-card__features">
              {PLATINUM_EXTRAS.map(f => <PkgFeature key={f} text={f} tier="platinum" />)}
            </div>
            <Link href="/#rsvp">
              <motion.button
                className="lux-btn-outline"
                whileHover={{ scale: 1.03 }}
                style={{ width: '100%', justifyContent: 'center', borderColor: '#b0b0c0', color: '#c8c8d8' }}
              >
                Get Platinum
              </motion.button>
            </Link>
          </motion.div>

          {/* ── DIAMOND ── */}
          <motion.div
            className="pkg-card pkg-card--diamond"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            style={{ position: 'relative' }}
          >
            {/* Shimmer effect */}
            <div className="pkg-card__shimmer" />

            {/* Most Premium badge */}
            <div style={{
              position: 'absolute', top: '-1px', left: '50%', transform: 'translateX(-50%)',
              background: 'linear-gradient(135deg, var(--gold-light), var(--gold), var(--gold-dark))',
              color: '#000', fontSize: '0.6rem', fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              padding: '0.35rem 1.5rem',
              borderRadius: '0 0 12px 12px',
              boxShadow: '0 4px 20px rgba(193,102,59,0.4)',
            }}>
              ✦ Most Premium ✦
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <span className="pkg-card__badge pkg-badge--diamond">Diamond</span>
            </div>
            <h2 className="pkg-card__name" style={{ color: 'var(--gold-pale)' }}>Diamond</h2>
            <p className="pkg-card__tagline" style={{ color: 'rgba(255,255,255,0.4)' }}>The ultimate luxury experience</p>

            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.25rem' }}>
              <span className="pkg-card__price" style={{
                background: 'linear-gradient(135deg, var(--gold-light), var(--gold))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                <span style={{ fontSize: '1.4rem', verticalAlign: 'top', marginTop: '0.8rem', display: 'inline-block' }}>$</span>
                2,499
              </span>
            </div>
            <p className="pkg-card__period">One-time payment</p>

            <div className="pkg-card__divider" />
            <div className="pkg-card__features">
              {DIAMOND_EXTRAS.map(f => <PkgFeature key={f} text={f} tier="diamond" />)}
            </div>

            <motion.button
              className="lux-btn-gold"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              style={{ width: '100%', justifyContent: 'center', fontSize: '0.82rem' }}
              onClick={() => window.location.href = '/#rsvp'}
            >
              ✦ Get Diamond — $2,499
            </motion.button>

            {/* Diamond decorations */}
            <div style={{
              position: 'absolute', top: '1.5rem', right: '1.5rem',
              fontSize: '1.5rem', opacity: 0.25,
            }}>
              💎
            </div>
          </motion.div>

        </div>

        {/* ── Comparison note ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          style={{ textAlign: 'center', marginTop: '5rem' }}
        >
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', lineHeight: 2 }}>
            All packages include SSL security, 99.9% uptime guarantee, and lifetime access.<br />
            Diamond includes all Gold &amp; Platinum features plus exclusive Diamond-only capabilities.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
