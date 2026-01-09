Here’s a good MVP task breakdown (copy into TASKS.md or Issues):

Scaffold Next.js + Tailwind + basic routes

Routes: /listings, /listings/new, /messages, /sponsor, /feed, /wallet

Add Supabase integration + env validation

Healthcheck page that shows “connected” (server-side)

Implement DB schema + migrations

Tables from Spec.md (Users/Profile, Listings, ListingEvents, Messages, Zones, PromotionTransactions, TokenLedger)

Auth + profile + wallet

Email magic link

Show token balance derived from ledger

Listings CRUD

Create listing with photo upload (Supabase storage)

Browse listings near a point (simple radius filter)

Verification flow

Geofence check on client

Upload proof photo

Create listing event

Transition listing states

Token minting

Mint giver/verifier rewards when listing becomes Gone Verified

Messages CRUD

Promotion zones + sponsor purchase

Compute current zone id from geohash/S2 banding (start simple: fixed zones)

Sponsor a message

Split 66/33/1, then double zone price

Sponsor TTL + cooldown (basic)

Activity feed

Sponsored message pinned

Nearby messages underneath

Optional listing activity events
