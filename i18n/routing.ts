import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  // French keeps clean URLs (/voitures); English is prefixed (/en/voitures).
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
