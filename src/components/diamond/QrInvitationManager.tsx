'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useToast } from '@/components/ui/ToastContext';

export default function QrInvitationManager({ guestId, guestName }: { guestId: string; guestName: string }) {
  const { notify } = useToast();
  const [loading, setLoading] = useState(false);
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [inviteUrl, setInviteUrl] = useState<string | null>(null);

  const generateQr = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/guests/${guestId}/qr`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed to generate QR');
      const data = await res.json();
      setQrUrl(data.qrCodeUrl);
      setInviteUrl(data.inviteUrl);
      notify(`QR code generated for ${guestName}`);
    } catch {
      notify('Failed to generate QR invitation', 'error');
    } finally {
      setLoading(false);
    }
  };

  const copyUrl = async () => {
    if (!inviteUrl) return;
    try {
      await navigator.clipboard.writeText(inviteUrl);
      notify('Invitation link copied to clipboard');
    } catch {
      notify('Failed to copy link', 'error');
    }
  };

  return (
    <div className="qr-manager">
      <div className="qr-manager__copy">
        <p className="qr-manager__eyebrow">Digital Access</p>
        <h3>Diamond Entry Pass</h3>
        <p>Generate a unique, cryptographically secure entry pass for this guest. The pass grants access to the event and unlocks their personalised experience.</p>
      </div>

      <div className="qr-manager__workspace">
        <div className="qr-manager__preview">
          {qrUrl ? (
            <Image src={qrUrl} alt={`QR for ${guestName}`} width={140} height={140} unoptimized />
          ) : (
            <span>🔲</span>
          )}
        </div>
        <div className="qr-manager__actions">
          {!qrUrl ? (
            <button
              onClick={generateQr}
              disabled={loading}
              className="qr-manager__primary"
            >
              {loading ? 'Generating…' : 'Generate QR Pass'}
            </button>
          ) : (
            <>
              <button onClick={copyUrl} className="qr-manager__primary">
                Copy Link
              </button>
              <button onClick={() => window.open(inviteUrl!, '_blank')}>
                Preview Pass
              </button>
            </>
          )}
          <small>Secure one-time-use token</small>
        </div>
      </div>
    </div>
  );
}
