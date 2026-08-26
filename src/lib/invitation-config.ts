/**
 * Invitation Configuration
 *
 * Central source of truth for all dynamic wedding details.
 * In production, these values should come from the database via Supabase.
 * For now, they serve as configurable defaults.
 */

export const INVITATION_CONFIG = {
  /** Bride's full display name */
  brideName: 'Layla',
  /** Groom's full display name */
  groomName: 'Omar',
  /** Wedding date (ISO format) — used for countdown */
  weddingDate: '2026-12-25T18:00:00',
  /** Human-readable date string */
  weddingDateLabel: 'December 25 · 2026',
  /** Venue name */
  venueName: 'Armani Hotel Dubai',
  /** Venue subtitle */
  venueSubtitle: 'Burj Khalifa · Downtown Dubai · UAE',
  /** Google Maps embed URL */
  mapsEmbed: 'https://maps.google.com/maps?q=Armani+Hotel+Dubai&output=embed&z=15',
  /** Google Maps direct link */
  mapsLink: 'https://maps.google.com/maps?q=Armani+Hotel+Dubai',
  /** RSVP deadline label */
  rsvpDeadline: 'November 1st, 2026',
  /** WhatsApp contact number (with country code, no spaces) */
  whatsappNumber: '15550000000',
  /** Instagram handle */
  instagram: '#',
  /** Dress code */
  dressCode: 'Black Tie Optional',
  /** Music source URL — set in admin dashboard */
  musicUrl: '',
  /** Monogram for navigation */
  monogram: 'L & O',
} as const;

export type InvitationConfig = typeof INVITATION_CONFIG;
