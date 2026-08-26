'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/ToastContext';
import { INVITATION_CONFIG } from '@/lib/invitation-config';

interface EntryPassProps {
  guestName: string;
  guestId: string;
  qrDataUrl?: string;
  expiresAt?: string;
}

export default function EntryPass({ guestName, guestId, qrDataUrl, expiresAt }: EntryPassProps) {
  const passRef = useRef<HTMLDivElement>(null);
  const { notify } = useToast();
  const [downloading, setDownloading] = useState<'png' | 'pdf' | null>(null);

  const bride = INVITATION_CONFIG.brideName;
  const groom = INVITATION_CONFIG.groomName;
  const dateLabel = INVITATION_CONFIG.weddingDateLabel;
  const venue = INVITATION_CONFIG.venueName;

  async function downloadPng() {
    if (!passRef.current) return;
    setDownloading('png');
    try {
      const { toPng } = await import('html-to-image');
      const dataUrl = await toPng(passRef.current, { quality: 0.97, pixelRatio: 2 });
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `entry-pass-${guestName.toLowerCase().replace(/\s+/g, '-')}.png`;
      a.click();
      notify('Entry pass downloaded as PNG.');
    } catch {
      notify('Failed to download PNG. Please try again.', 'error');
    } finally {
      setDownloading(null);
    }
  }

  async function downloadPdf() {
    if (!passRef.current) return;
    setDownloading('pdf');
    try {
      const { toPng } = await import('html-to-image');
      const { default: jsPDF } = await import('jspdf');
      const dataUrl = await toPng(passRef.current, { quality: 0.97, pixelRatio: 2 });
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: [340, 520] });
      pdf.addImage(dataUrl, 'PNG', 0, 0, 340, 520);
      pdf.save(`entry-pass-${guestName.toLowerCase().replace(/\s+/g, '-')}.pdf`);
      notify('Entry pass downloaded as PDF.');
    } catch {
      notify('Failed to download PDF. Please try again.', 'error');
    } finally {
      setDownloading(null);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
      {/* The pass card */}
      <motion.div
        ref={passRef}
        className="entry-pass"
        initial={{ opacity: 0, y: 20, rotateY: -8 }}
        animate={{ opacity: 1, y: 0, rotateY: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -4 }}
      >
        {/* Header */}
        <div className="entry-pass__header">
          <div className="entry-pass__monogram">{bride[0]} &amp; {groom[0]}</div>
          <p className="entry-pass__event">Wedding Invitation · Entry Pass</p>
        </div>

        {/* Body */}
        <div className="entry-pass__body">
          {/* Guest Name */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              Honoured Guest
            </p>
            <p className="entry-pass__guest-name">{guestName}</p>
          </div>

          {/* QR Code */}
          <div className="entry-pass__qr">
            {qrDataUrl ? (
              <Image src={qrDataUrl} alt={`QR pass for ${guestName}`} width={140} height={140} unoptimized />
            ) : (
              <div style={{
                width: 140, height: 140,
                background: 'rgba(193,102,59,0.08)',
                border: '1px dashed rgba(193,102,59,0.3)',
                borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(193,102,59,0.5)', fontSize: '2rem',
              }}>
                ◇
              </div>
            )}
          </div>

          {/* Metadata */}
          <div className="entry-pass__meta">
            <div className="entry-pass__meta-item">
              <p className="entry-pass__meta-label">Date</p>
              <p className="entry-pass__meta-value">{dateLabel}</p>
            </div>
            <div className="entry-pass__meta-item">
              <p className="entry-pass__meta-label">Venue</p>
              <p className="entry-pass__meta-value">{venue}</p>
            </div>
            <div className="entry-pass__meta-item">
              <p className="entry-pass__meta-label">Pass ID</p>
              <p className="entry-pass__meta-value" style={{ fontSize: '0.72rem', fontFamily: 'monospace' }}>
                {guestId.slice(0, 8).toUpperCase()}
              </p>
            </div>
            <div className="entry-pass__meta-item">
              <p className="entry-pass__meta-label">Expires</p>
              <p className="entry-pass__meta-value" style={{ fontSize: '0.75rem' }}>
                {expiresAt
                  ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(expiresAt))
                  : dateLabel}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="entry-pass__footer">
          Diamond Invitation · Present this pass at the entrance
        </div>
      </motion.div>

      {/* Download buttons */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <motion.button
          className="lux-btn-gold"
          whileHover={{ y: -2 }}
          onClick={downloadPng}
          disabled={downloading !== null}
          style={{ fontSize: '0.75rem' }}
        >
          {downloading === 'png' ? 'Preparing…' : '↓ Download PNG'}
        </motion.button>
        <motion.button
          className="lux-btn-outline"
          whileHover={{ y: -2 }}
          onClick={downloadPdf}
          disabled={downloading !== null}
          style={{ fontSize: '0.75rem', color: 'var(--gold)', borderColor: 'var(--gold)' }}
        >
          {downloading === 'pdf' ? 'Preparing…' : '↓ Download PDF'}
        </motion.button>
      </div>
    </div>
  );
}
