# AGENTS.md

## Goal
Implement the MVP described in Spec.md as a working web app (PWA-friendly) with a minimal backend.

## Tech choices (do not bikeshed)
- Frontend: Next.js (TypeScript) + Tailwind
- Backend: Supabase (Postgres + Auth + Storage) OR local Postgres via Prisma if Supabase is unavailable
- Maps: Leaflet + OpenStreetMap tiles (no API key)
- Testing: Vitest for unit, Playwright optional later
- Package manager: pnpm

## Hard rules
- Work in small PRs (1 feature per PR).
- Keep the app runnable at every PR.
- Do not add complex architecture. Prefer boring defaults.
- Every PR must include:
  - updated docs (README or /docs)
  - “How to test” steps
  - basic validation (lint + typecheck)

## Commands
- Install: `pnpm install`
- Dev: `pnpm dev`
- Lint: `pnpm lint`
- Typecheck: `pnpm typecheck`
- Test: `pnpm test`

## MVP milestones (implement in order)
1. Repo scaffold: Next.js app, Tailwind, basic layout + routing.
2. DB schema + migrations (tables from Spec.md).
3. Auth (email magic link) + user profile + wallet balance.
4. Listings: create/browse/detail.
5. Verification flow: geofence check (client) + photo upload + server validation.
6. Token ledger: mint on verified gone; balances derived from ledger.
7. Messages: create/list.
8. Promotion zones: compute user’s current zone; sponsor flow; split (66/33/1); double price.
9. Activity feed: sponsored message pinned + nearby messages + optional listing activity.

## Acceptance criteria
Use Spec.md “Acceptance Criteria (MVP)” as the definition of done. If unclear, add a TODO and proceed with the simplest interpretation.
