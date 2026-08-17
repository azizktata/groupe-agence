import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16 renamed `middleware.ts` to `proxy.ts`. next-intl still exports its
// factory from `next-intl/middleware`; only the file name changed.
export default createMiddleware(routing);

export const config = {
  // Match all pathnames except:
  //  - /api/*      Sabre API routes must NOT be locale-rewritten
  //  - /_next/*    Next.js internals
  //  - /_vercel/*  Vercel internals
  //  - anything containing a dot (static files: .png, .ico, .json, ...)
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
