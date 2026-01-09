# FreeStuff + Local Message Promotion (MVP)

A **free-stuff marketplace** (Craigslist-style listings) with **pickup verification** and a **token-funded local message promotion layer**.

- **Listings** are the core product: post free items, browse nearby items, and confirm when items are gone.
- **Tokens** are earned for real contributions (posting + verification).
- **Messages** are separate from listings. Tokens are spent to promote a message to people near free-stuff activity.
- **Sponsored slot** per promotion zone: takeover price **doubles** each time; proceeds split **66% prev sponsor / 33% burn / 1% dev fund**.

See: **[Spec.md](./Spec.md)**

---

## Repo Layout (expected)

- `Spec.md` — product + mechanism spec (source of truth)
- `AGENTS.md` — instructions for Codex/agents (how to work in this repo)
- `TASKS.md` — PR-sized implementation queue
- `apps/web` — Next.js app (recommended)
- `packages/*` — shared packages (optional)

> If your codebase ends up different, update this README to match.

---

## Tech Stack (recommended for MVP)

- Frontend: **Next.js (TypeScript)** + Tailwind
- Backend: **Supabase** (Postgres + Auth + Storage)
- Maps: Leaflet + OpenStreetMap tiles (no API key)
- Package manager: **pnpm**

(You can swap later; MVP should stay boring.)

---

## Prerequisites

- Node.js 18+ (or 20+)
- pnpm
- A Supabase project (cloud) OR Supabase local dev (CLI)

---

## Quick Start

### 1) Install dependencies

```bash
pnpm install

2) Create env file
cp .env.example .env.local
```

Fill in the values in .env.local (see below).

3) Run dev server
```bash
pnpm dev
```

App should be available at:
```
http://localhost:3000
```
Environment Variables

Copy/paste from .env.example into .env.local and fill:
```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# App config
NEXT_PUBLIC_VERIFY_GEOFENCE_M=50
NEXT_PUBLIC_FEED_RADIUS_M=500
NEXT_PUBLIC_ZONE_MIN_PRICE=10
NEXT_PUBLIC_SPONSOR_TTL_HOURS=24
NEXT_PUBLIC_SPONSOR_COOLDOWN_SECONDS=180

# Token rewards (server-side)
REWARD_GIVER=50
REWARD_VERIFIER=10
```

Notes:

`NEXT_PUBLIC_*` vars are exposed to the client.

`SUPABASE_SERVICE_ROLE_KEY` must remain server-only (never exposed to client).

## Database & Migrations

This MVP expects tables described in Spec.md:

Users/Profile

Listings

ListingEvents

Messages

PromotionZones

PromotionTransactions

TokenLedger (append-only)

### Option A: Supabase Cloud (simple)

Create a Supabase project

Apply migrations (choose one):

Use Supabase SQL editor (manual paste), or

Use Supabase CLI migrations (preferred once set up)

### Option B: Supabase Local (recommended for development parity)

Use Supabase CLI to run Postgres/Auth/Storage locally.

Apply migrations locally, then push to cloud when ready.

The exact commands depend on how we set up /supabase in this repo. See TASKS.md for the current plan.

## Scripts

From repo root (or apps/web, depending on scaffold):
```
pnpm dev        # start dev server
pnpm lint       # lint
pnpm typecheck  # tsc typecheck
pnpm test       # unit tests
pnpm build      # production build
pnpm start      # run production server
```
## Product Mechanics (summary)
### Tokens

Minted for:

posting listings that later get verified gone (giver reward)

verifying a listing is gone (verifier reward)

Spent on sponsoring messages in a promotion zone

### Sponsorship

Each promotion zone has exactly one sponsored message slot

Takeover price doubles after each takeover

Payment split:

66% → previous sponsor

33% → burn

1% → dev fund

See full details in Spec.md.

## Contributing / Working Style

Make small PRs (1 feature per PR).

Keep pnpm dev working at all times.

Every PR includes:

what changed

how to test

any new env vars and schema changes

If using Codex/agents, follow AGENTS.md and take tasks from TASKS.md.

## Roadmap (MVP Milestones)

App scaffold + routing + styling

Supabase integration + env validation

DB schema + migrations

Auth + wallet (ledger-derived balance)

Listings create/browse/detail

Verification flow (geofence + photo proof)

Token minting on verified gone

Messages create/list

Promotion zones + sponsor purchase + splits + doubling price

Activity feed (sponsored pinned + nearby messages)
