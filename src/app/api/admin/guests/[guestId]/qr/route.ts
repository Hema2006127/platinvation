import { NextRequest, NextResponse } from 'next/server';
import { createGuestQrToken, hashGuestQrToken } from '@/lib/qr/token';
import { getSupabaseAdmin } from '@/lib/supabase/admin';

export const runtime = 'nodejs';

type RequestBody = { guestName: string; expiresAt?: string; regenerate?: boolean };

export async function POST(request: NextRequest, context: RouteContext<'/api/admin/guests/[guestId]/qr'>) {
  try {
    const { guestId } = await context.params;
    const body = await request.json() as RequestBody;
    if (!guestId || !body.guestName?.trim()) return NextResponse.json({ error: 'Guest ID and name are required.' }, { status: 400 });

    const token = createGuestQrToken();
    const expiresAt = body.expiresAt ? new Date(body.expiresAt) : new Date('2026-12-26T06:00:00.000Z');
    if (Number.isNaN(expiresAt.getTime()) || expiresAt <= new Date()) return NextResponse.json({ error: 'A future expiration date is required.' }, { status: 400 });

    const supabase = getSupabaseAdmin();
    if (body.regenerate) {
      const { error } = await supabase.from('guest_qr').update({ revoked_at: new Date().toISOString() }).eq('guest_id', guestId).is('revoked_at', null);
      if (error) throw error;
    }

    const { data, error } = await supabase.from('guest_qr').insert({
      guest_id: guestId,
      guest_name: body.guestName.trim(),
      token_hash: hashGuestQrToken(token),
      expires_at: expiresAt.toISOString(),
    }).select('id, expires_at').single();
    if (error) throw error;

    const origin = request.nextUrl.origin;
    return NextResponse.json({ id: data.id, inviteUrl: `${origin}/invite/${token}`, expiresAt: data.expires_at });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to generate QR invitation.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
