import { notFound } from 'next/navigation';
import { hashGuestQrToken, verifyGuestQrToken } from '@/lib/qr/token';
import { getSupabaseAdmin } from '@/lib/supabase/admin';
import Link from 'next/link';
import EntryPass from '@/components/diamond/EntryPass';

export const dynamic = 'force-dynamic';

export default async function GuestInvitePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (!verifyGuestQrToken(token)) notFound();
  
  const { data } = await getSupabaseAdmin()
    .from('guest_qr')
    .select('guest_id, guest_name, expires_at, revoked_at')
    .eq('token_hash', hashGuestQrToken(token))
    .maybeSingle();
    
  if (!data || data.revoked_at || new Date(data.expires_at) <= new Date()) notFound();
  
  // In a real app we would generate the QR data URL here based on the token
  // For now we'll use a placeholder or leave it to be generated client side
  const qrDataUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(token)}&bgcolor=FFFFFF&color=C1663B`;

  return (
    <main className="guest-invite">
      <div className="guest-invite__card">
        <p>Private Invitation</p>
        <span>✦</span>
        <h1>Welcome, {data.guest_name}</h1>
        <p>Your private wedding invitation has been verified. Please keep your entry pass ready for arrival.</p>
        
        <div style={{ margin: '3rem 0', display: 'flex', justifyContent: 'center' }}>
          <EntryPass 
            guestName={data.guest_name}
            guestId={data.guest_id}
            qrDataUrl={qrDataUrl}
            expiresAt={data.expires_at}
          />
        </div>

        <div style={{ marginTop: '3rem' }}>
          <Link href="/" style={{
            display: 'inline-block',
            padding: '1rem 2.5rem',
            background: 'rgba(193,102,59,0.1)',
            border: '1px solid var(--gold)',
            color: 'var(--gold-dark)',
            borderRadius: '999px',
            fontSize: '0.8rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontWeight: 600,
            textDecoration: 'none',
          }}>
            View Full Invitation
          </Link>
        </div>
      </div>
    </main>
  );
}
