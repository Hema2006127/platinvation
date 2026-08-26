import { createHash, createHmac, randomBytes, timingSafeEqual } from 'crypto';

const TOKEN_BYTES = 32;

function secret() {
  const value = process.env.QR_TOKEN_SECRET;
  if (!value || value.length < 32) throw new Error('QR_TOKEN_SECRET must be at least 32 characters.');
  return value;
}

export function createGuestQrToken() {
  const nonce = randomBytes(TOKEN_BYTES).toString('base64url');
  const signature = createHmac('sha256', secret()).update(nonce).digest('base64url');
  return `${nonce}.${signature}`;
}

export function verifyGuestQrToken(token: string) {
  const [nonce, suppliedSignature] = token.split('.');
  if (!nonce || !suppliedSignature || token.split('.').length !== 2) return false;
  const expectedSignature = createHmac('sha256', secret()).update(nonce).digest('base64url');
  const supplied = Buffer.from(suppliedSignature);
  const expected = Buffer.from(expectedSignature);
  return supplied.length === expected.length && timingSafeEqual(supplied, expected);
}

export function hashGuestQrToken(token: string) {
  return createHash('sha256').update(token).digest('hex');
}
