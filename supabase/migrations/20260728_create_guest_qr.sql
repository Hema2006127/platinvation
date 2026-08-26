create table if not exists public.guest_qr (
  id uuid primary key default gen_random_uuid(),
  guest_id uuid not null,
  guest_name text not null,
  token_hash text not null unique,
  expires_at timestamptz not null,
  revoked_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint guest_qr_expiration_check check (expires_at > created_at)
);

create unique index if not exists guest_qr_active_guest_idx on public.guest_qr (guest_id) where revoked_at is null;
create index if not exists guest_qr_lookup_idx on public.guest_qr (token_hash) where revoked_at is null;
create index if not exists guest_qr_expiration_idx on public.guest_qr (expires_at) where revoked_at is null;

alter table public.guest_qr enable row level security;

create policy "Authenticated admins can manage guest QR codes" on public.guest_qr
  for all to authenticated using ((auth.jwt() ->> 'role') = 'admin') with check ((auth.jwt() ->> 'role') = 'admin');

create policy "No direct public guest QR access" on public.guest_qr
  for select to anon using (false);
