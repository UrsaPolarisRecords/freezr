# Spec.md — FreeStuff + Tokenized Local Message Promotion

## 0) Purpose

Build an MVP mobile/web app with:

1) **Free Stuff Marketplace** (Craigslist-style listings)  
2) **Pickup Verification** (proof-of-work loop)  
3) **Token Economy** where tokens are **earned** by contributing to the marketplace (posting + verifying) and **spent** to **promote messages** to nearby users  
4) **Sponsored Message Slot** per promotion zone, where **price doubles** on each takeover and proceeds are split:
   - **66%** to previous sponsor
   - **33%** burned
   - **1%** to dev fund

> Important: **Listings and Messages are separate.**  
> Free stuff is the core utility. Messages are what people spend earned tokens on to advertise to users near free-stuff activity.

---

## 1) Definitions

### 1.1 Entities
- **User**: account with token balance and reputation
- **Listing**: free item post (title, photos, location, status)
- **Pickup Verification**: confirmation that a listing is gone (with proof)
- **Message**: short local promo content (text + optional image/link)
- **Promotion Zone**: geographic region with one sponsored message slot
- **Sponsorship**: paying tokens to occupy the zone’s sponsored slot
- **Token**: in-app unit earned via marketplace work and spent on sponsorship

### 1.2 Roles
- **Giver**: posts a listing
- **Getter**: picks up the item
- **Verifier**: confirms the item is gone (often getter)
- **Advertiser**: spends tokens to promote a message

---

## 2) Goals / Non-Goals

### 2.1 MVP Goals
- Users can post and browse listings by location
- Users can mark listings as “gone” with geofenced proof (verification)
- Tokens are issued to:
  - givers for successful listings (once verified gone)
  - verifiers for confirming “gone” (smaller reward)
- Users can create messages
- Users can sponsor a message in their local promotion zone:
  - pay current zone price
  - split proceeds per rules
  - new zone price doubles
- Activity feed shows:
  - sponsored message at top (if any)
  - nearby messages
  - optionally nearby listing activity

### 2.2 Non-Goals (MVP)
- Full AR overlay (future)
- Complex reputation/anti-fraud ML
- On-chain settlement (optional future)
- Multi-language, multi-region compliance

---

## 3) UX Overview

### 3.1 Screens (MVP)
1) **Listings Feed** (primary marketplace)
   - list view + map view toggle
   - filters (distance, category, newest)
2) **Create Listing**
   - title, description, category, photos (required)
   - location pin (required)
   - optional “approximate location” privacy toggle
3) **Listing Detail**
   - photos, description, pickup instructions
   - button: “I picked this up” / “It’s gone”
4) **Verify Pickup Flow**
   - requires proximity (geofence)
   - requires photo proof (MVP)
5) **Messages**
   - list your messages
   - create new message
6) **Sponsor Message**
   - show current zone price
   - show sponsored slot status
   - button: “Sponsor this message”
7) **Activity Feed**
   - shows when app opens near listings OR after verification
   - sponsored message pinned at top
8) **Wallet / Tokens**
   - token balance
   - transaction history (ledger)

### 3.2 Activity Feed Trigger (MVP)
- On app open: if user is within `FEED_RADIUS_M` of any active listing OR in an “active area”
- After successful pickup verification: show feed immediately
- Optional: push notification “Free stuff nearby” (opt-in)

---

## 4) Geographic Model

### 4.1 Listing Location
- Store exact location server-side.
- Optionally display a fuzzed/approximate location to other users (privacy mode).

### 4.2 Promotion Zones (Dynamic sizing)
Requirement: **zone size should scale with price/demand**.

MVP approach:
- Use a fixed spatial index (S2/geohash) at moderate resolution as a base.
- Maintain a **demand score** per base cell:
  - active listings count
  - verifications in last N hours
  - app opens near listings (optional)
- Assign cells to a **demand band**, which determines promotion zone radius:
  - High demand → smaller zones (more granular)
  - Low demand → larger zones (covers suburban/rural)

Example demand bands (tunable):
- Band A: 75m zones
- Band B: 150m zones
- Band C: 300m zones
- Band D: 750m zones
- Band E: 2km zones

A user’s current promotion zone is computed from:
- user location
- underlying demand band in that area

---

## 5) Sponsorship Market Mechanism

### 5.1 State per Zone
- `current_sponsor_message_id` (nullable)
- `current_price_tokens` (number)
- `last_change_at` (timestamp)
- optional `sponsor_expires_at` (timestamp)
- optional `cooldown_until` (timestamp)
- `dev_fund_balance` (global or per-zone)

### 5.2 Taking Over Sponsored Slot
When a user sponsors a message in zone Z:

1) Charge user `current_price_tokens`
2) Split payment:
   - `to_prev = price * 0.66` (0 if no previous sponsor)
   - `to_burn = price * 0.33`
   - `to_dev = price * 0.01`
3) Update zone:
   - `current_sponsor_message_id = new_message_id`
   - `current_price_tokens = current_price_tokens * 2`
   - `last_change_at = now`
4) Optional:
   - set `sponsor_expires_at = now + 24h` (recommended)
   - enforce `cooldown_until = now + COOLDOWN_MIN` (recommended)

### 5.3 Sponsor Expiry + Price Decay (Recommended)
To prevent permanent ratcheting:
- If `sponsor_expires_at` passes without a new sponsor:
  - clear `current_sponsor_message_id`
  - decay `current_price_tokens` toward `ZONE_MIN_PRICE` over time
    - e.g. halve every 24h without sponsor, floor at min

MVP: implement expiry; decay optional but recommended.

### 5.4 Constraints / Safety
- `ZONE_MIN_PRICE`: minimum sponsorship price
- `ZONE_MAX_PRICE`: optional cap
- `COOLDOWN_MIN`: minimum time between sponsor changes (e.g., 2–5 minutes)
- If no previous sponsor, the 66% “to_prev” portion is instead burned or sent to dev fund (choose one; default: burn).

---

## 6) Token Policy (MVP)

### 6.1 Token Issuance Events
Tokens are minted for real contributions:
- **Listing Verified Gone**:
  - giver gets `REWARD_GIVER`
  - verifier gets `REWARD_VERIFIER` (smaller)
- Optional:
  - small reward for “listing created” (can be 0 to prevent spam)
  - additional verifier rewards if multiple confirmations required

All issuance must go through a ledger entry.

### 6.2 Token Sinks
- Sponsorship payments (33% burned + 1% dev fund)
- Optional later: small listing posting fee for spam control (off by default)

### 6.3 Reputation (Minimal)
- Start with a simple score:
  - + for successful listings that get verified gone
  - - for listings frequently reported false/spam
  - - for false “gone” reports
- Use reputation to:
  - rate-limit new listings
  - rate-limit verifications
  - (future) weight confirmations

MVP can implement only rate limits without complex scoring.

---

## 7) Pickup Verification (Proof-of-Work)

### 7.1 Verification Requirements (MVP)
To mark a listing as gone:
- user must be within `VERIFY_GEOFENCE_M` of listing location
- user must upload a photo proof (required)
- optionally choose report type:
  - “Picked up”
  - “Gone”
  - “Couldn’t find” (does not close listing)

### 7.2 Listing States
- `ACTIVE`
- `SUSPECTED_GONE` (after first report)
- `GONE_VERIFIED` (after confirmation threshold)
- `EXPIRED` (time-based)

MVP recommended rule:
- If giver marks gone: immediate `GONE_VERIFIED`
- Else:
  - first valid gone report → `SUSPECTED_GONE`
  - second valid gone report by different user OR giver confirmation → `GONE_VERIFIED`

---

## 8) Data Model (Suggested)

### 8.1 Users
- `id`
- `created_at`
- `token_balance`
- `reputation_score` (optional)
- `notification_prefs`
- `last_known_location` (optional)

### 8.2 Listings
- `id`
- `giver_user_id`
- `title`
- `description`
- `category`
- `photos[]`
- `location_exact` (lat,lng)
- `location_public` (lat,lng; fuzzed optional)
- `status`
- `created_at`, `updated_at`
- `expires_at`

### 8.3 Listing Events
- `id`
- `listing_id`
- `user_id`
- `type` (CREATED, GONE_REPORT, GONE_VERIFIED, etc.)
- `photo_proof[]`
- `location_at_event`
- `created_at`

### 8.4 Messages
- `id`
- `owner_user_id`
- `text`
- `image` (optional)
- `link` (optional)
- `category`
- `created_at`
- `expires_at` (optional)

### 8.5 Promotion Zones
- `id`
- `geometry` (cell set / center+radius)
- `demand_band`
- `current_price_tokens`
- `current_sponsor_message_id` (nullable)
- `last_change_at`
- `sponsor_expires_at` (optional)

### 8.6 Promotion Transactions
- `id`
- `zone_id`
- `buyer_user_id`
- `prev_sponsor_user_id` (nullable)
- `message_id`
- `price_paid`
- `split_prev`
- `split_burn`
- `split_dev`
- `created_at`

### 8.7 Token Ledger (Append-only)
- `id`
- `user_id` (nullable for burn/dev fund)
- `type` (MINT, TRANSFER, BURN, DEV_FUND)
- `amount`
- `reference_type` (LISTING_VERIFIED, SPONSORSHIP, etc.)
- `reference_id`
- `created_at`

---

## 9) API Requirements (MVP)

### 9.1 Auth
- Email magic link or phone OTP (implementation choice)

### 9.2 Listings
- `POST /listings`
- `GET /listings?near=lat,lng&radius_m=&filters=...`
- `GET /listings/{id}`
- `POST /listings/{id}/report_gone` (requires location + photo)
- `POST /listings/{id}/confirm_gone` (giver-only optional)
- `GET /listings/{id}/events`

### 9.3 Messages
- `POST /messages`
- `GET /messages?owner=me`
- `GET /messages?near=lat,lng&radius_m=...` (for feed)

### 9.4 Promotion
- `GET /zones/current?lat=&lng=` (returns zone id + price + sponsored message)
- `POST /zones/{id}/sponsor`
  - body: `message_id`
  - server validates user owns message and has balance
- `GET /zones/{id}/sponsor_history`

### 9.5 Feed
- `GET /feed?lat=&lng=&radius_m=...`
  - returns sponsored message first (if any), then nearby messages and optional listing activity

### 9.6 Wallet
- `GET /wallet`
- `GET /wallet/ledger`

---

## 10) Acceptance Criteria (MVP)

### Listings
- Can create listing with required photo and location
- Can browse listings near a location
- Can open listing detail
- Can report “gone” only when within geofence and with photo
- Listing transitions to Gone Verified after configured threshold
- Tokens are minted to giver + verifier on successful verification

### Messages
- Can create a message and view own messages
- Can see nearby messages in feed

### Sponsorship
- User can sponsor one of their messages in current zone
- Sponsorship:
  - charges current price
  - pays previous sponsor 66% (if exists)
  - burns 33%
  - adds 1% to dev fund
  - doubles price afterward
- Sponsored message appears at top of feed for the zone
- Optional: sponsor expires after 24h (recommended)

### Ledger
- All token movements are recorded in ledger
- Token balance matches sum of ledger entries

---

## 11) Configuration (Environment Variables)
- `VERIFY_GEOFENCE_M` (e.g., 50)
- `FEED_RADIUS_M` (e.g., 500)
- `ZONE_MIN_PRICE` (e.g., 10 tokens)
- `ZONE_PRICE_DECAY_HALFLIFE_HOURS` (optional)
- `SPONSOR_TTL_HOURS` (e.g., 24)
- `SPONSOR_COOLDOWN_SECONDS` (e.g., 180)
- `REWARD_GIVER`
- `REWARD_VERIFIER`

---

## 12) Notes / Future Extensions
- AR overlay for messages
- Reputation-weighted verification
- Listing escrow/bonds for spam control
- Category-specific listing incentives
- Multiple sponsored slots by category
- Business “official accounts” (later)

