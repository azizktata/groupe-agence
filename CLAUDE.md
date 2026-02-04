# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Tech Stack

- **Next.js 16** with App Router and React 19
- **TypeScript** with strict mode enabled
- **Tailwind CSS 4** with CSS variables for theming
- **shadcn/ui** (new-york style) - add components with `npx shadcn@latest add <component>`
- **Lucide** for icons
- **Embla Carousel** for carousels

## Architecture

### Sabre GDS Integration

The app integrates with Sabre travel platform APIs for flights and hotels. See `sabre-air-booking.md` and `sabre-hotel-booking.md` for detailed API documentation.

#### Flight Booking Flow

1. **BFM (Bargain Finder Max)** - Search for flights via `POST /v5/offers/shop/`
2. **Revalidate** - Verify price/availability before booking via `POST /v5/shop/flights/revalidate/`
3. **Create Booking** - Reserve the flight and generate PNR

#### Mappers (`mappers/`)

Transform Sabre API responses into UI-friendly types:

- `mapSabreBfmToUi.ts` - BFM responses → `UiFlightOffer[]` with `RevalidationKey` for step 2
- `mapSabreRevalidateToUi.ts` - Revalidation responses → `UiReviewData` (verified pricing, baggage, taxes)
- `mapSabreHotelsToUi.ts` - Hotel list responses → UI hotel objects

#### Key Types

- `UiFlightOffer` - Normalized flight offer with outbound/inbound legs and pricing
- `RevalidationKey` - Data needed to construct a revalidation request (extracted from BFM)
- `UiReviewData` - Verified flight details with status: `CONFIRMED | PRICE_CHANGED | SOLD_OUT`
- `BfmFilterOptions` / `FlightFiltersState` - Flight filtering (stops, airlines, price, cabins, times)

#### Mocks (`mocks/`)

Mock Sabre responses for development:
- `mocks/air/` - Flight mocks (BFM, revalidation)
- `mocks/hotel/` - Hotel mocks

### Environment Variables

Copy `.env.local.example` to `.env.local` and configure:
- `API_CLIENT_ID`, `API_CLIENT_SECRET` - Sabre API credentials
- `API_CLIENT_USERNAME`, `API_CLIENT_PASSWORD` - Sabre user credentials
- `API_TOKEN_URL` - Token endpoint (defaults to Sabre production)

### Page Structure

- `/` - Landing page with marketing sections (Hero, Services, Destinations, etc.)
- `/vols` - Flight search results with filtering
- `/vols/[slug]` - Flight review page (revalidated pricing)
- `/hotels` - Hotel search (in development)

### Components

- `components/` - Page-level components (Header, Hero, Footer, etc.)
- `components/ui/` - shadcn/ui base components
- `components/extra/` - Feature-specific marketing components
- `components/filters/` - Flight filter components (stops, price, airlines, cabins, departure times)

## Path Aliases

Use `@/*` for imports from project root:
```typescript
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { mapSabreBfmToUi, UiFlightOffer } from "@/mappers/mapSabreBfmToUi"
```
