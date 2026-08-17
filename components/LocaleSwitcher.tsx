"use client";

import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

// Inline SVG flags: emoji flags (🇫🇷/🇬🇧) do not render on Windows — Chrome and
// Edge substitute the letters "FR"/"GB" — so they are drawn instead.
function FlagFR({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 3 2" className={className} aria-hidden="true">
      <rect width="1" height="2" x="0" fill="#002654" />
      <rect width="1" height="2" x="1" fill="#FFFFFF" />
      <rect width="1" height="2" x="2" fill="#ED2939" />
    </svg>
  );
}

function FlagGB({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 30" className={className} aria-hidden="true">
      <rect width="60" height="30" fill="#012169" />
      {/* White diagonals */}
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFFFFF" strokeWidth="6" />
      {/* Red diagonals (thin, drawn over the white ones) */}
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="2.5" />
      {/* White cross */}
      <path d="M30,0 L30,30 M0,15 L60,15" stroke="#FFFFFF" strokeWidth="10" />
      {/* Red cross */}
      <path d="M30,0 L30,30 M0,15 L60,15" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

const FLAGS: Record<string, React.ComponentType<{ className?: string }>> = {
  fr: FlagFR,
  en: FlagGB,
};

type LocaleSwitcherProps = {
  /** `light` for dark backgrounds (header at top), `dark` for light ones. */
  variant?: "light" | "dark";
  className?: string;
};

export function LocaleSwitcher({
  variant = "light",
  className,
}: LocaleSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const activeIndex = routing.locales.indexOf(
    locale as (typeof routing.locales)[number]
  );

  function switchTo(next: string) {
    if (next === locale) return;
    startTransition(() => {
      // `pathname` here is locale-agnostic, so this keeps the user on the
      // same page instead of sending them back to the home page.
      // `scroll: false` stops Next.js from jumping back to the top, so the
      // reader stays where they were when changing language.
      router.replace(
        // @ts-expect-error -- params of the current route are passed through
        { pathname, params },
        { locale: next, scroll: false }
      );
    });
  }

  return (
    <div
      className={cn(
        "relative flex items-center rounded-full p-0.5 transition-colors duration-300",
        variant === "light"
          ? "bg-white/15 ring-1 ring-white/25"
          : "bg-gray-100 ring-1 ring-gray-200",
        isPending && "opacity-70 pointer-events-none",
        className
      )}
    >
      {/* Sliding indicator */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-0.5 bottom-0.5 left-0.5 w-[calc(50%-0.125rem)] rounded-full transition-transform duration-300 ease-out",
          variant === "light"
            ? "bg-white shadow-sm"
            : "bg-[var(--brand-primary)] shadow-sm"
        )}
        style={{ transform: `translateX(${activeIndex * 100}%)` }}
      />

      {routing.locales.map((loc) => {
        const Flag = FLAGS[loc];
        const isActive = loc === locale;

        return (
          <button
            key={loc}
            type="button"
            onClick={() => switchTo(loc)}
            disabled={isPending}
            aria-current={isActive ? "true" : undefined}
            aria-label={loc === "fr" ? "Français" : "English"}
            className={cn(
              "relative z-10 flex flex-1 items-center justify-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide cursor-pointer transition-colors duration-300",
              isActive
                ? variant === "light"
                  ? "text-[var(--brand-dark)]"
                  : "text-white"
                : variant === "light"
                  ? "text-white/70 hover:text-white"
                  : "text-gray-500 hover:text-gray-900"
            )}
          >
            <span
              className={cn(
                "block w-4 h-3 overflow-hidden rounded-[2px] ring-1 ring-black/10 transition-transform duration-300",
                isActive ? "scale-100" : "scale-90 opacity-70"
              )}
            >
              <Flag className="w-full h-full object-cover" />
            </span>
            {loc}
          </button>
        );
      })}
    </div>
  );
}
