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
