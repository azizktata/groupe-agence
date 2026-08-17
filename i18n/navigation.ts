import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Import Link/useRouter/usePathname from here (never from next/link or
// next/navigation) so the active locale prefix is preserved on navigation.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
