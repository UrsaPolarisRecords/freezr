-- Enable extensions
create extension if not exists "pgcrypto";

-- Profiles
create table if not exists public.profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Listings
create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  giver_user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  description text not null,
  category text not null,
  photos jsonb not null default '[]'::jsonb,
  location_exact_lat double precision not null,
  location_exact_lng double precision not null,
  location_public_lat double precision,
  location_public_lng double precision,
  status text not null default 'ACTIVE',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  expires_at timestamptz,
  constraint listings_status_check check (status in ('ACTIVE', 'SUSPECTED_GONE', 'GONE_VERIFIED', 'EXPIRED'))
);

-- Listing events
create table if not exists public.listing_events (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  type text not null,
  photo_proof jsonb not null default '[]'::jsonb,
  location_at_event_lat double precision,
  location_at_event_lng double precision,
  created_at timestamptz not null default now()
);

-- Messages
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references auth.users (id) on delete cascade,
  text text not null,
  image text,
  link text,
  category text,
  created_at timestamptz not null default now(),
  expires_at timestamptz
);

-- Promotion zones
create table if not exists public.promotion_zones (
  id text primary key,
  demand_band text,
  geometry jsonb,
  current_price_tokens bigint not null default 0,
  current_sponsor_message_id uuid references public.messages (id) on delete set null,
  last_change_at timestamptz not null default now(),
  sponsor_expires_at timestamptz
);

-- Promotion transactions
create table if not exists public.promotion_transactions (
  id uuid primary key default gen_random_uuid(),
  zone_id text not null references public.promotion_zones (id) on delete cascade,
  buyer_user_id uuid not null references auth.users (id) on delete cascade,
  prev_sponsor_user_id uuid references auth.users (id) on delete set null,
  message_id uuid not null references public.messages (id) on delete cascade,
  price_paid bigint not null,
  split_prev bigint not null,
  split_burn bigint not null,
  split_dev bigint not null,
  created_at timestamptz not null default now()
);

-- Token ledger (append-only)
create table if not exists public.token_ledger (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  type text not null,
  amount bigint not null,
  reference_type text not null,
  reference_id text,
  created_at timestamptz not null default now(),
  constraint token_ledger_amount_positive check (amount > 0),
  constraint token_ledger_type_check check (type in ('MINT', 'TRANSFER', 'BURN', 'DEV_FUND'))
);

-- Indexes
create index if not exists listings_status_created_at_idx on public.listings (status, created_at desc);
create index if not exists listings_location_exact_idx on public.listings (location_exact_lat, location_exact_lng);
create index if not exists listing_events_listing_id_created_at_idx on public.listing_events (listing_id, created_at desc);
create index if not exists messages_owner_created_at_idx on public.messages (owner_user_id, created_at desc);
create index if not exists promotion_transactions_zone_created_at_idx on public.promotion_transactions (zone_id, created_at desc);
create index if not exists token_ledger_user_created_at_idx on public.token_ledger (user_id, created_at desc);

-- RLS
alter table public.profiles enable row level security;
alter table public.listings enable row level security;
alter table public.listing_events enable row level security;
alter table public.messages enable row level security;
alter table public.promotion_zones enable row level security;
alter table public.promotion_transactions enable row level security;
alter table public.token_ledger enable row level security;

-- Profiles policies
create policy "Profiles are viewable by owner"
  on public.profiles for select
  using (auth.uid() = user_id);

create policy "Profiles are updatable by owner"
  on public.profiles for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Listings policies
create policy "Listings are readable when active or suspected"
  on public.listings for select
  using (status in ('ACTIVE', 'SUSPECTED_GONE'));

create policy "Listings can be inserted by giver"
  on public.listings for insert
  with check (auth.uid() = giver_user_id);

create policy "Listings can be updated by giver"
  on public.listings for update
  using (auth.uid() = giver_user_id)
  with check (auth.uid() = giver_user_id);

-- Listing events policies
create policy "Listing events are readable by authenticated users"
  on public.listing_events for select
  using (auth.role() = 'authenticated');

create policy "Listing events can be inserted by authenticated users"
  on public.listing_events for insert
  with check (auth.role() = 'authenticated');

-- Messages policies
create policy "Messages are readable by authenticated users"
  on public.messages for select
  using (auth.role() = 'authenticated');

create policy "Messages can be inserted by owner"
  on public.messages for insert
  with check (auth.uid() = owner_user_id);

create policy "Messages can be updated by owner"
  on public.messages for update
  using (auth.uid() = owner_user_id)
  with check (auth.uid() = owner_user_id);

create policy "Messages can be deleted by owner"
  on public.messages for delete
  using (auth.uid() = owner_user_id);

-- Promotion zones policies
create policy "Promotion zones are readable by authenticated users"
  on public.promotion_zones for select
  using (auth.role() = 'authenticated');

-- Promotion transactions policies
create policy "Promotion transactions are readable by authenticated users"
  on public.promotion_transactions for select
  using (auth.role() = 'authenticated');

-- Token ledger policies
create policy "Token ledger is readable by owner"
  on public.token_ledger for select
  using (auth.uid() = user_id);
