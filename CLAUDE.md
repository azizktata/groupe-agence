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
- **Tailwind CSS 4** with CSS variables for theming (light/dark mode)
- **shadcn/ui** (new-york style) - add components with `npx shadcn@latest add <component>`
- **Lucide** for icons

## Project Structure

- `app/` - Next.js App Router (pages, layouts, globals.css)
- `components/ui/` - shadcn/ui base components
- `components/extra/` - Custom feature components
- `lib/utils.ts` - `cn()` helper for merging Tailwind classes

## Path Aliases

Use `@/*` for imports from project root (configured in tsconfig.json):
```typescript
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
```
