# TASKS.md — MVP Implementation Queue

This repo builds the MVP defined in `Spec.md`. Work in small PRs (one task per PR). Keep the app runnable after every PR.

## PR 0 — Repo hygiene (if not already done)
- [ ] Add `.gitignore` (ignore `.env*` except `.env.example`, `node_modules`, `.next`, etc.)
- [ ] Ensure `.env.local` is not committed
- [ ] Confirm `Spec.md`, `AGENTS.md`, `README.md` exist in repo root

## PR 1 — MVP scaffold (Next.js + Tailwind + routes)
- [ ] Create `apps/web` as a Next.js (TypeScript) app
- [ ] Add Tailwind CSS
- [ ] Add placeholder pages/routes:
  - [ ] `/listings`
  - [ ] `/listings/new`
  - [ ] `/messages`
  - [ ] `/sponsor`
  - [ ] `/feed`
  - [ ] `/wallet`
- [ ] Add basic layout + navigation between pages
- [ ] Use pnpm; commit `pnpm-lock.yaml`
- [ ] Root scripts (or workspace scripts) for:
  - [ ] `pnpm dev`
  - [ ] `pnpm build`
  - [ ] `pnpm lint`
  - [ ] `pnpm typecheck`
  - [ ] `pnpm test` (can be a placeholder test runner initially)
- [ ] Update `README.md` Quick Start to match actual commands and paths

## PR 2 — Supabase integration + env validation
- [ ] Add Supabase client setup (browser + server safe)
- [ ] Add env var validation + friendly error page if missing
- [ ] Add a simple `/health` page that checks Supabase connectivity (server-side)
- [ ] Document required env vars in `README.md`

## PR 3 — Database schema + migrations
- [ ] Implement DB schema from `Spec.md`:
  - [ ] Users/Profile (or rely on Supabase auth + profile table)
  - [ ] Listings
  - [ ] ListingEvents
  - [ ] Messages
  - [ ] PromotionZones
  - [ ] PromotionTransactions
  - [ ] TokenLedger (append-only)
- [ ] Add migrations (Supabase migrations or Prisma—choose one and stick with it)
- [ ] Document how to apply migrations locally

## PR 4 — Auth + profile + wallet (ledger-derived balance)
- [ ] Email magic link auth (Supabase)
- [ ] Create/ensure profile row on first login
- [ ] Wallet page shows:
  - [ ] token balance (derived from ledger)
  - [ ] recent ledger entries

## PR 5 — Listings: create + browse + detail
- [ ] Create listing form (required photo + location + category + title)
- [ ] Photo upload to storage
- [ ] Browse listings near a location (list + map)
- [ ] Listing detail page

## PR 6 — Pickup verification flow (geofence + proof)
- [ ] Verify flow requires:
  - [ ] user within geofence distance of listing
  - [ ] photo proof upload
- [ ] Create `ListingEvent` on report
- [ ] Listing state transitions:
  - [ ] `ACTIVE` → `SUSPECTED_GONE` after first valid report
  - [ ] `SUSPECTED_GONE` → `GONE_VERIFIED` after second distinct valid report (or giver confirm)

## PR 7 — Token minting rules (giver + verifier)
- [ ] On transition to `GONE_VERIFIED`, mint:
  - [ ] `REWARD_GIVER` to giver
  - [ ] `REWARD_VERIFIER` to verifying user(s) per MVP rules
- [ ] Record all mints in TokenLedger
- [ ] Ensure wallet balance reflects ledger

## PR 8 — Messages: create + list + nearby query
- [ ] Create message form (text + optional link/image)
- [ ] List “my messages”
- [ ] Query “messages near location” for feed

## PR 9 — Promotion zones (MVP-simple first) + sponsorship purchase
- [ ] Compute current zone id from location (start simple: fixed geohash grid)
- [ ] Create/initialize PromotionZone rows on demand:
  - [ ] `current_price_tokens` starts at `ZONE_MIN_PRICE`
- [ ] Sponsor purchase endpoint:
  - [ ] validates user owns message
  - [ ] checks user token balance
  - [ ] charges `current_price_tokens`
  - [ ] splits: 66% prev sponsor (if exists), 33% burn, 1% dev fund
  - [ ] doubles zone price after takeover
  - [ ] enforces cooldown + TTL if enabled
- [ ] Record PromotionTransaction + TokenLedger entries for all movements

## PR 10 — Activity feed (sponsored pinned + nearby content)
- [ ] Feed endpoint returns:
  - [ ] sponsored message pinned at top (if exists in user zone)
  - [ ] nearby non-sponsored messages
  - [ ] optional nearby listing activity events
- [ ] Feed UI page shows this content cleanly

## PR 11 — Zone sizing scales with demand (banding)
- [ ] Implement demand score per base cell (active listings + recent verifications)
- [ ] Map demand bands to zone size (A/B/C/D/E)
- [ ] Update zone selection logic to use banded zone sizes
- [ ] Document assumptions + tunables

## PR 12 — Polishing / basic guardrails
- [ ] Rate limits for listing creation + verification (simple per-user caps)
- [ ] Basic error handling + loading states
- [ ] Minimal tests for core flows (at least token ledger + sponsorship split)
- [ ] Update README with “How to test MVP flows”
