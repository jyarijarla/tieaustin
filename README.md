# TiE Austin Website

The official website for TiE Austin — a chapter of TiE Global, one of the world's largest entrepreneurship networks. Built to be fast, clean, and easy to maintain, with live event data pulling directly from Zoho Backstage.

---

## What's Built

### Pages
| Route | Description |
|-------|-------------|
| `/` | Home — hero photo, stats, pillars, sponsors, upcoming events, join CTA |
| `/about` | Dropdown parent — links to Pillars and Contact |
| `/pillars` | The Five Pillars of TiE with alternating section backgrounds |
| `/contact` | Minimalist email contact page |
| `/join-tie` | Membership categories (Associate, Charter, NxtGen, Partner) with tabbed detail cards |
| `/events` | Live upcoming events from Zoho Backstage — no manual updates needed |
| `/team` | Austin Team page with group photo |
| `/join` | Membership tier overview |

### Key Features
- **Live events** — events created in Zoho Backstage automatically appear on the site within 5 minutes
- **Responsive** — works across desktop and mobile with a collapsible nav
- **Brand-consistent** — TiE red (`#C41230`), dark maroon (`#7D1426`), Playfair Display for display type, Inter for body
- **External links** — "Join Now" and "Apply Now" route to the Austin Member Registration form (Zoho Creator)

---

## Tech Stack

- **Framework:** React 18 + Vite 8
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/vite` plugin — no PostCSS config needed)
- **Routing:** React Router v6 with `BrowserRouter`
- **API:** Vercel serverless function (`/api/events`) proxying Zoho Backstage
- **Deployment:** Vercel

---

## Local Development

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`. The `/api/events` route won't work locally unless you run `vercel dev` (see below).

### Testing the Events API locally

```bash
npx vercel dev
```

Then visit `http://localhost:3000/api/events` to confirm it returns your Backstage events as JSON.

---

## Environment Variables

Create a `.env` file in the project root (already gitignored):

```
ZOHO_CLIENT_ID=
ZOHO_CLIENT_SECRET=
ZOHO_REFRESH_TOKEN=
ZOHO_PORTAL_ID=
ZOHO_BRAND_ID=
ZOHO_ACCOUNTS_URL=https://accounts.zoho.com
```

### How to get these values

1. **Client ID + Secret** — [api-console.zoho.com](https://api-console.zoho.com) → Self Client → copy credentials
2. **Refresh Token** — Generate an auth code in the Self Client with scope `ZohoBackstage.event.READ`, then exchange it:
   ```powershell
   # Run get-token.ps1 (included in repo) immediately after generating the code
   .\get-token.ps1
   ```
3. **Portal ID** — found in the Backstage URL: `backstage.zoho.com/home#/portal/{PORTAL_ID}/...`
4. **Brand ID** — also in the Backstage URL: `.../brand/{BRAND_ID}/events`
5. **Accounts URL** — default is `https://accounts.zoho.com`. Change to `.eu` or `.in` if your Zoho account is on a regional data center.

> **Note:** The refresh token doesn't expire. The access token (used internally by the serverless function) refreshes automatically on every request.

---

## How the Events Integration Works

```
Zoho Backstage (create event → set to Live)
        ↓
/api/events  (Vercel serverless function)
  1. Exchanges refresh token for a short-lived access token
  2. Calls Zoho Backstage v3 API with portal + brand ID
  3. Returns formatted event list as JSON
        ↓
Events component (home page + /events page)
  Fetches /api/events on load, renders cards
  Falls back to a placeholder message if the API is unavailable
```

The API response is cached for 5 minutes on Vercel's edge (`Cache-Control: s-maxage=300`), so creating an event in Backstage will appear on the site within 5 minutes of publishing it as **Live**.

---

## Deployment

The site is deployed on Vercel. Push to the main branch triggers an automatic redeploy.

**Required environment variables in Vercel dashboard** (Settings → Environment Variables):
- `ZOHO_CLIENT_ID`
- `ZOHO_CLIENT_SECRET`
- `ZOHO_REFRESH_TOKEN`
- `ZOHO_PORTAL_ID`
- `ZOHO_BRAND_ID`
- `ZOHO_ACCOUNTS_URL`

---

## Project Structure

```
├── api/
│   └── events.js          # Vercel serverless function — Zoho Backstage proxy
├── public/
│   ├── Hero (2).png       # Home page hero photo
│   └── Team.png           # Austin team group photo
├── src/
│   ├── components/
│   │   ├── Navbar.jsx     # Sticky nav with About dropdown
│   │   ├── Hero.jsx       # Full-bleed hero image
│   │   ├── Stats.jsx      # 10K+ Startups, 80K+ Attendees, etc.
│   │   ├── WhyJoin.jsx    # Five pillars cards (home page section)
│   │   ├── Sponsors.jsx   # Corporate sponsors band
│   │   ├── Events.jsx     # Live events (home page — shows 3 most recent)
│   │   ├── JoinCTA.jsx    # Bottom CTA band
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Pillars.jsx    # Full five pillars page
│   │   ├── Contact.jsx
│   │   ├── JoinTiE.jsx    # Membership categories with tabs
│   │   ├── EventsPage.jsx # Full events listing page
│   │   ├── Team.jsx
│   │   └── Membership.jsx
│   ├── App.jsx            # Routes
│   ├── main.jsx           # BrowserRouter wrapper
│   └── index.css          # Tailwind v4 + custom theme tokens
├── .env                   # Local env vars (gitignored)
├── vercel.json            # SPA rewrite rule
└── get-token.ps1          # One-time script for generating Zoho refresh token
```

---

## Notes

- **Tailwind v4** uses `@theme` tokens in `index.css` — no `tailwind.config.js` needed
- **Social icons** in the footer use inline SVGs (lucide-react v4+ removed brand icons)
- **ScrollRestoration** is intentionally absent — it requires `createBrowserRouter`, not `BrowserRouter`
- The `get-token.ps1` script is safe to keep in the repo (it contains no secrets; you fill them in before running)

---

## Development Log

### August 27, 2026 — Initial Build

Built the full site from scratch in a single session. Everything below was created that day.

**Site foundation**
- Vite + React 18 + Tailwind CSS v4 project setup with Vercel deployment config (`vercel.json` SPA rewrite)
- React Router v6 with all routes wired up
- Sticky navbar with About dropdown (Pillars of TiE + Contact sub-pages); fixed a hover bug where a gap between the button and dropdown panel caused it to close prematurely — solved with `pt-1` on the wrapper so there's no dead zone
- Global `cursor: pointer` rule applied to all interactive elements site-wide

**Pages built**
- **Home** — hero photo, stats band (10K+ Startups, 80K+ Attendees, etc.), Five Pillars preview cards, corporate sponsors section, live events feed, join CTA
- **Pillars of TiE** — five full sections (Mentoring, Networking, Education, Investing, Incubating) with alternating maroon (`#7D1426`) and white backgrounds, starting with maroon
- **Contact** — minimalist page with Executive Director email
- **Team** — group photo (Team.png), no individual names or avatars
- **Join TiE Austin** (`/join-tie`) — five membership category cards (NxtGen, Associate, Scaleup, Charter, Corporate) with About / Eligibility / Benefits tab switchers and full content for each
- **Membership** — tier overview page
- **Events** — live event feed from Zoho Backstage

**Styling decisions**
- Corporate Sponsors and Ready to Join sections use the same dark maroon (`#7D1426`) as the stats band for visual consistency
- Hero image uses `backgroundSize: cover`, `backgroundPosition: center top`, and a fixed `clamp(580px, 88vh, 960px)` height so it looks consistent across screen sizes without over-zooming on mobile
- No text overlay on hero — clean full-bleed photo only

**Zoho Backstage integration**
- OAuth 2.0 setup: Self Client at api-console.zoho.com, scope `ZohoBackstage.event.READ`, refresh token exchange via `get-token.ps1`
- Vercel serverless function at `api/events.js` — refreshes access token on every request, calls Zoho Backstage v3 API (`https://www.zohoapis.com/backstage/v3/portals/{id}/events`), returns formatted JSON
- Key discovery: the `brand_id` query parameter is required — without it the portal-level endpoint returns zero events even with `status=all`
- API response cached 5 minutes on Vercel edge (`s-maxage=300, stale-while-revalidate`)
- Troubleshooting notes: `ZohoBackstage.events.READ` (plural) is invalid — the correct scope is `ZohoBackstage.event.READ` (singular); the old `backstage.zoho.com/api/v1/` base URL returns 404s — correct base is `https://www.zohoapis.com/backstage/v3/`

---

### August 31, 2026 — Content & Events Updates

**Membership page overhaul**
- Removed Scaleup membership category entirely
- Renamed "Corporate Member" to "Partner"
- New category order: Associate → Charter (top row), NxtGen → Partner (bottom row)
- Removed all INR pricing; all fees now display in USD with `$` symbol ($125, $1,200, $75, $500/year)
- Updated About copy for all four categories with official TiE descriptions
- Added Membership Fee entry to the Eligibility Criteria tab of every card
- All "Apply Now" buttons now link to the Austin Member Registration form (Zoho Creator) instead of the generic tie.org/join-now page
- Contact email at the bottom of each card updated to `ExecutiveDirector@austin.tie.org`

**Hero image**
- Switched hero from `Hero (2).png` to `Hero (3).png`
- Changed `backgroundSize` from `cover` to `contain` with white background so the full image is visible without cropping

**Events page redesign**
- API updated to fetch `status=all` instead of `status=live` — now returns all 56 events (1 upcoming, 55 past)
- API response restructured to `{ upcoming: [...], past: [...] }`, sorted by date (upcoming: soonest first; past: most recent first)
- Events page completely redesigned: dark maroon hero header, upcoming events in cards with red calendar badges and Register buttons, past events in a stacked list with gray date badges
- Home page Events component updated to handle the new response shape (shows 3 soonest upcoming)
