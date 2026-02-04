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

The app integrates with the Sabre travel platform API for flight search:

- `app/api/token/route.ts` - OAuth token endpoint that authenticates with Sabre API using credentials from env vars
- `mappers/mapSabreBfmToUi.ts` - Transforms Sabre BFM (Bargain Finder Max) responses into `UiFlightOffer` types for the UI
- `mocks/` - Contains mock Sabre API responses for development without live API calls

### Environment Variables

Copy `.env.local.example` to `.env.local` and configure:
- `API_CLIENT_ID`, `API_CLIENT_SECRET` - Sabre API credentials
- `API_CLIENT_USERNAME`, `API_CLIENT_PASSWORD` - Sabre user credentials
- `API_TOKEN_URL` - Token endpoint (defaults to Sabre production)

### Page Structure

- `/` - Landing page with marketing sections (Hero, Services, Destinations, etc.)
- `/vols` - Flight search results using mapped Sabre data
- `/vols/[slug]` - Individual flight review/booking page

### Components

- `components/` - Page-level marketing components (Header, Hero, Footer, etc.)
- `components/ui/` - shadcn/ui base components
- `components/extra/` - Feature-specific components

## Path Aliases

Use `@/*` for imports from project root:
```typescript
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { mapSabreBfmToUi } from "@/mappers/mapSabreBfmToUi"
```
