# Freezr MVP

Freezr is a **free-stuff marketplace** with **pickup verification** and a **token-funded local message promotion layer**.

- **Listings** are the core product: post free items, browse nearby items, and confirm when items are gone.
- **Tokens** are earned for real contributions (posting + verification).
- **Messages** are separate from listings. Tokens are spent to promote a message to people near free-stuff activity.
- **Sponsored slot** per promotion zone: takeover price **doubles** each time; proceeds split **66% prev sponsor / 33% burn / 1% dev fund**.

See the product spec in [Spec.md](./Spec.md).

---

## MVP Scaffold Routes

The scaffold includes the following routes from `TASKS.md` / `Spec.md`:

- `/listings`
- `/listings/new`
- `/messages`
- `/sponsor`
- `/feed`
- `/wallet`

---

## Repo Layout

- `apps/web` — Next.js app scaffold (TypeScript + Tailwind)

---

## Tech Stack

- Frontend: **Next.js (TypeScript)** + Tailwind
- Backend (later): **Supabase** (Postgres + Auth + Storage)
- Maps (later): Leaflet + OpenStreetMap tiles
- Package manager: **pnpm**

---

## Prerequisites

- Node.js 18+ (or 20+)
- pnpm

---

## Quick Start

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

App runs at: `http://localhost:3000`

---

## Environment Variables

Copy from `.env.example` to `.env.local` and fill in as needed:

```bash
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
REWARD_GIVER=50
REWARD_VERIFIER=10
```

`NEXT_PUBLIC_*` variables are exposed to the client. Keep server-only keys private.

---

## Scripts

All scripts run from the repo root and proxy to `apps/web`:

```bash
pnpm dev        # start dev server
pnpm lint       # lint
pnpm typecheck  # tsc typecheck
pnpm test       # unit tests
```

---

## How to Test

```bash
pnpm lint
pnpm typecheck
pnpm test
```
Make small PRs (1 feature per PR).

Keep pnpm dev working at all times.

Every PR includes:

what changed

how to test

any new env vars and schema changes

If using Codex/agents, follow AGENTS.md and take tasks from TASKS.md.

## Roadmap (MVP Milestones)

1. App scaffold + routing + styling

2. Supabase integration + env validation

3. DB schema + migrations

4. Auth + wallet (ledger-derived balance)

5. Listings create/browse/detail

6. Verification flow (geofence + photo proof)

7. Token minting on verified gone

8. Messages create/list

9. Promotion zones + sponsor purchase + splits + doubling price

10. Activity feed (sponsored pinned + nearby messages)
