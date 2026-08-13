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
- **TypeScript** strict mode
- **Tailwind CSS 4** — theme via CSS variables in `app/globals.css`, no `tailwind.config`
- **shadcn/ui** (new-york style) — add components with `npx shadcn@latest add <component>`
- **Lucide** icons, **Embla** carousels, **vaul** drawers

## Architecture

### The UI currently runs entirely on mocks

This is the single most important thing to know before changing anything. Every page imports
fixtures from `mocks/` and renders them synchronously — **no page calls the API routes.**

- `/vols` → `MOCK_SABRE_BFM_RESPONSE`
- `/vols/[slug]` → picks a revalidate mock by slug (`"1"` → V2, else original) via
  `getMockRevalidateResponse`
- `/hotels` → `MOCK_SABRE_HOTELS_LIST`
- `/hotels/[slug]` → `MOCK_SABRE_HOTEL_SAMPLE` + `MOCK_SABRE_HOTELS_LIST`

The real search flow (fetch `/api/hotels/list` → map → fetch `/api/hotels/images` → merge) exists
only as a commented-out `TODO` block at the bottom of [app/hotels/page.tsx](app/hotels/page.tsx#L159-L246).
It is the intended wiring — read it before rebuilding live search from scratch.

Because slugs index into mocks rather than a data source, `/vols/[slug]` and `/hotels/[slug]`
render the same fixture regardless of which card was clicked.

### Sabre GDS integration

Detailed API request/response docs live in `sabre-air-booking.md` and `sabre-hotel-booking.md`.
Consult them before hand-rolling a Sabre payload — the envelopes are deeply nested and
version-pinned in the URL path.

Flight booking is a three-step protocol:

1. **BFM (Bargain Finder Max)** — search, `POST /v5/offers/shop/`
2. **Revalidate** — re-verify price/availability, `POST /v5/shop/flights/revalidate/`
3. **Create Booking** — reserve and generate a PNR

Step 2 is why `mapSabreBfmToUi` attaches a `RevalidationKey` (segments + passenger type/count) to
every offer: BFM results go stale, and the revalidate request must be reconstructed from the
chosen offer. Preserve that field when touching the BFM mapper.

### API routes (`app/api/`)

| Route | Sabre endpoint | Auth |
| --- | --- | --- |
| `token/` | `{API_SABRE_BASE_URL}/v2/auth/token` | `client_credentials` |
| `hotels/list/` | `/v4.1.0/get/hotellist` | `await getToken()` |
| `hotels/images/` | `/v1.0.0/shop/hotels/image` | **hardcoded to `API_SABRE_MOCK_TOKEN`** |

Auth quirks to be aware of:

- `app/api/token/route.ts` serves double duty: `getToken()` is a plain `Promise<string>` helper
  imported directly by other routes, and `GET` wraps it as a debugging endpoint. Import the helper;
  don't fetch the endpoint from another route.
- `hotels/images/route.ts` defines its own second, divergent `getToken()` — `grant_type=password`
  with a `-DEVCENTER-EXT` username suffix, against `API_TOKEN_URL` — but the call is commented out
  ([route.ts:87-88](app/api/hotels/images/route.ts#L87-L88)) in favor of the static mock token.
  That mock token expires; when it does, this route 401s and the fix is to restore the real call.
- Sabre's `client_credentials` flow base64-encodes the id and secret *individually*, then
  base64-encodes the joined `id:secret` pair again. This double encoding is intentional; do not
  "simplify" it.

`hotels/list` caps nothing, but `hotels/images` rejects more than 300 hotel codes per request —
batch beyond that.

### Mappers (`mappers/`)

Normalize deeply-nested Sabre envelopes into flat UI types. All UI components consume mapper
output, never raw Sabre JSON — keep that boundary.

- `mapSabreBfmToUi.ts` — BFM → `UiFlightOffer[]`; also exports `extractBfmFilterOptions` (derives
  the filter bar's available choices from the result set) and `FlightFiltersState`
- `mapSabreRevalidateToUi.ts` — revalidation → `UiReviewData`, with
  `verificationStatus: CONFIRMED | PRICE_CHANGED | SOLD_OUT` driving the review page's badge
- `mapSabreHotelsToUi.ts` — hotel list → `UiHotel[]`; plus `extractHotelCodes`,
  `mapSabreImagesToMap`, `mergeHotelImages` (images arrive from a separate call and are merged in
  by hotel code) and the `CHAIN_CODE_INFO` lookup
- `mabSabreHotelSampleToUi.ts` — hotel *content/details* → `UiHotelDetails`. Note the typo in the
  filename (`mab`, not `map`); it is the real path.

Filtering is client-side and the two domains are not symmetric:

- Flights — `applyFlightFilters` in [lib/utils.ts](lib/utils.ts), driven by `FlightFiltersState`
  from the BFM mapper. Note `tripType` is the string union `"ONE_WAY" | "ROUND_TRIP" | "any"`, and
  `/vols` initializes it to `"any"`; the filter only narrows for the two explicit values.
- Hotels — a local `applyHotelFilters` inside [app/hotels/page.tsx](app/hotels/page.tsx#L37-L57).
  It reads `filters.amenities` from state but **never applies it** — only chain and `minRating`
  actually filter. `extractHotelFilterOptions` in the same file also hardcodes the amenity choices
  (WiFi 179 / Piscine 71 / Parking 42) instead of deriving them from the result set, unlike the
  flight side's `extractBfmFilterOptions`.

### Conventions

- **All user-facing copy is French.** Pages keep local `CABIN_LABELS` maps translating Sabre cabin
  codes (`Y`/`S`/`C`/`F`) to French labels, and dates format with `toLocaleDateString("fr-FR")`.
  Note the two flight pages define overlapping-but-different cabin maps.
- Brand colors come from CSS variables, used as `bg-[var(--brand-primary)]`:
  `--brand-primary` `#51C4F5`, `--brand-accent` `#F0D43A`, `--brand-dark` `#01303D`,
  `--brand-teal` `#2A7589`. They are declared **twice** in `app/globals.css` — under `@theme inline`
  as `--color-brand-*` (which is what generates Tailwind utilities) and again on `:root` as
  `--brand-*` (what the arbitrary-value syntax above reads). Change both or the two drift apart.
- Fonts: Poppins for headings, Inter for body, loaded in `app/layout.tsx` as `--font-poppins` /
  `--font-inter`. `app/globals.css` separately defines `--font-heading` / `--font-body` pointing at
  bare `'Poppins'` / `'Inter'` family names, and `--font-sans` still points at the unused Geist
  variables from the create-next-app scaffold.
- `content.md` at the repo root is the client's French copy/brief (brand palette, nav, per-section
  content). Consult it for wording and structure decisions on marketing pages.
- Amenity codes are numeric Sabre codes mapped to Lucide icons per-page (`AMENITY_ICON_MAP`), with
  a parallel `AMENITY_ICONS` in the mapper.

### Components

`components/` holds page-level sections (Header, Hero, Footer, search forms, cards);
`components/ui/` is shadcn primitives; `components/extra/` is marketing blocks;
`components/filters/` is the flight filter controls used by `FilterBar`.

Both search forms are currently inert, consistent with the mocks-only state: `HotelSearchForm`
takes an optional `onSearch` callback that `/hotels` does not pass, and `FlightSearchForm` has no
search wiring at all. Both pages render them with hardcoded `defaultValues` (`/vols` defaults to
`WAW → SPU`). Wiring search means supplying `onSearch` and rebuilding the fetch flow — see the
commented block referenced above.

### Environment

Copy `.env.local.example` (which is nearly empty — the list below is the real set) to `.env.local`:

- `API_CLIENT_ID`, `API_CLIENT_SECRET` — Sabre credentials for `client_credentials`
- `API_CLIENT_USERNAME`, `API_CLIENT_PASSWORD` — used only by the `password` grant in `hotels/images`
- `API_SABRE_BASE_URL` — defaults to `https://api.cert.platform.sabre.com` (CERT, not production)
- `API_TOKEN_URL` — only read by the unused `password`-grant helper
- `API_SABRE_MOCK_TOKEN` — short-lived token the images route currently uses; expires, and when it
  does that route 401s

`.gitignore` covers `.env*`, but `.env.local` is present in the working tree with live CERT
credentials in it. It is untracked — keep it that way.

Remote images are restricted by `next.config.ts` to `images.unsplash.com`. Hotel photos are
currently fake: [lib/hotelImages.ts](lib/hotelImages.ts) hashes a hotel code into a fixed pool of
six Unsplash URLs so a given hotel gets a stable image. The real path is the Sabre images call
merged via `mergeHotelImages`. Add any new remote host to `next.config.ts` or `next/image` fails.

## Path Aliases

`@/*` maps to the project root:

```typescript
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { mapSabreBfmToUi, UiFlightOffer } from "@/mappers/mapSabreBfmToUi"
```
