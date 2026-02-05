# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test framework is configured.

## Tech Stack

- **Next.js 16** with App Router and React 19
- **TypeScript** with strict mode enabled
- **Tailwind CSS 4** with CSS variables for theming
- **shadcn/ui** (new-york style) — add components with `npx shadcn@latest add <component>`
- **Lucide** for icons, **Embla Carousel** for carousels, **Vaul** for drawers

## Architecture

### Overview

Travel agency web app ("Groupe L'Agence") integrating with Sabre GDS APIs for flights and hotels. The UI is in French. See `sabre-air-booking.md` and `sabre-hotel-booking.md` for detailed Sabre API documentation.

### Data Flow Pattern

All Sabre integrations follow the same pattern:

1. **API Routes** (`app/api/`) — Server-side proxies to Sabre APIs, handling auth and request building
2. **Mappers** (`mappers/`) — Transform raw Sabre responses into normalized UI types
3. **Pages** — Consume mapped data, apply client-side filtering

Currently, flight pages use **mock data directly** (imported from `mocks/`) bypassing API routes. Hotel search calls the real API via `/api/hotels/list`. Hotel detail page also uses mocks.

### Sabre Authentication

Two different auth flows exist:
- **Client credentials** (`app/api/token/route.ts`) — Used by `getToken()`, exported and reused by hotel list API. Uses `API_CLIENT_ID` + `API_CLIENT_SECRET` with `grant_type=client_credentials`.
- **Password grant** (`app/api/hotels/images/route.ts`) — Local `getToken()` using `API_CLIENT_USERNAME` + `API_CLIENT_PASSWORD` with `grant_type=password`. Currently bypassed with a mock token.

Base URL: `API_SABRE_BASE_URL` env var, defaults to `https://api.cert.platform.sabre.com`.

### Flight Booking Flow

1. **BFM (Bargain Finder Max)** — `POST /v5/offers/shop/` → `mapSabreBfmToUi()` → `UiFlightOffer[]`
2. **Revalidate** — `POST /v5/shop/flights/revalidate/` → `mapSabreRevalidateToUi()` → `UiReviewData`
3. **Create Booking** — Not yet implemented

Each `UiFlightOffer` carries a `RevalidationKey` containing segments, passenger type, and count — everything needed to construct the revalidation request.

### Hotel Booking Flow

1. **Hotel List** — `POST /v4.1.0/get/hotellist` via `/api/hotels/list` → `mapSabreHotelsToUi()` → `UiHotel[]`
2. **Hotel Images** — `POST /v1.0.0/shop/hotels/image` via `/api/hotels/images` → `mapSabreImagesToMap()` → merge with hotels (currently commented out)
3. **Hotel Content** — `mapSabreHotelContentToUi()` → `UiHotelDetails` (for detail pages, uses `mabSabreHotelSampleToUi.ts`)

Hotels use a two-step loading pattern: list first, then images merged in asynchronously.

### Key Mappers

| File | Input | Output | Used By |
|------|-------|--------|---------|
| `mapSabreBfmToUi.ts` | BFM response | `UiFlightOffer[]` + `BfmFilterOptions` | `/vols` |
| `mapSabreRevalidateToUi.ts` | Revalidate response | `UiReviewData` | `/vols/[slug]` |
| `mapSabreHotelsToUi.ts` | Hotel list response | `UiHotel[]` + image merging utils | `/hotels` |
| `mabSabreHotelSampleToUi.ts` | Hotel content response | `UiHotelDetails` | `/hotels/[slug]` |

### Client-Side Filtering

Flight filtering is in `lib/utils.ts` (`applyFlightFilters`). Filter options are extracted from BFM results via `extractBfmFilterOptions()`. Hotel filtering logic lives directly in `app/hotels/page.tsx`.

### Theming

Brand colors defined as CSS custom properties in `globals.css` and used throughout via `var(--brand-primary)`, `var(--brand-accent)`, `var(--brand-dark)`, `var(--brand-teal)`. Tailwind theme colors are also configured alongside shadcn/ui variables.

Fonts: **Poppins** (headings + body default) and **Inter** (body alternate), loaded via `next/font/google`.

### Page Structure

- `/` — Landing page with marketing sections
- `/vols` — Flight search results with filtering (client component, uses mocks)
- `/vols/[slug]` — Flight review page with revalidated pricing (server component, uses mocks)
- `/hotels` — Hotel search with live API (client component)
- `/hotels/[slug]` — Hotel detail page (server component, uses mocks)

### API Routes

- `POST /api/token` — Sabre OAuth token (client credentials)
- `POST /api/hotels/list` — Hotel list search proxy
- `POST /api/hotels/images` — Hotel images proxy (partially implemented)

No flight API routes exist yet — flights currently use mock data directly.

## Path Aliases

Use `@/*` for imports from project root:
```typescript
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { mapSabreBfmToUi, UiFlightOffer } from "@/mappers/mapSabreBfmToUi"
```
