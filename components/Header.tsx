"use client";

import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useState, useEffect, useRef } from "react";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

// hrefs stay in code; only the labels are translated.
const navItems = [
  { key: "home", href: "/" },
  { key: "flights", href: "/vols" },
  { key: "hotels", href: "/hotels" },
  { key: "cars", href: "/voitures" },
  { key: "contact", href: "/#contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastY = useRef(0);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Sticky behaviour: frosted style past the hero, and hide on scroll-down /
  // reveal on scroll-up. The 8px threshold absorbs trackpad jitter and iOS
  // rubber-banding so the bar does not flicker.
  useEffect(() => {
    lastY.current = window.scrollY;

    function onScroll() {
      const y = window.scrollY;
      const delta = y - lastY.current;

      setIsScrolled(y > 80);

      if (Math.abs(delta) > 8) {
        setIsHidden(delta > 0 && y > 200);
        lastY.current = y;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Never hide the bar while the mobile menu is open, or the close button
  // can end up scrolled out of reach.
  const hidden = isHidden && !isMenuOpen;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 py-4 transition-transform duration-300 ease-out",
          hidden ? "-translate-y-full" : "translate-y-0"
        )}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Desktop Navigation - Centered pill, switcher floating right */}
          <div className="hidden md:flex items-center justify-center relative">
            <nav>
              <ul
                className={cn(
                  "flex items-center gap-6 border rounded-full px-8 py-2 transition-all duration-300",
                  isScrolled
                    ? "bg-white/90 backdrop-blur-xl border-white/40 shadow-lg shadow-black/5"
                    : "bg-white/20 backdrop-blur-md border-white/20"
                )}
              >
                {navItems.map((item) => (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      className={cn(
                        "transition-colors font-medium text-sm",
                        isScrolled
                          ? "text-[var(--brand-dark)]/80 hover:text-[var(--brand-dark)]"
                          : "text-white/90 hover:text-white"
                      )}
                    >
                      {t(item.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Floating language switcher - top right, independent of the pill */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <LocaleSwitcher variant={isScrolled ? "dark" : "light"} />
            </div>
          </div>

          {/* Mobile Navigation - Logo + Menu Button */}
          <nav
            className={cn(
              "flex md:hidden items-center justify-between border rounded-2xl px-4 py-3 transition-all duration-300",
              isScrolled
                ? "bg-white/90 backdrop-blur-xl border-white/40 shadow-lg shadow-black/5"
                : "bg-white/10 backdrop-blur-md border-white/20"
            )}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span
                className={cn(
                  "text-lg font-bold transition-colors duration-300",
                  isScrolled ? "text-[var(--brand-dark)]" : "text-white"
                )}
              >
                {t("brand")}
              </span>
            </Link>

            {/* Mobile Menu Button - the switcher lives inside the sidebar */}
            <button
              className="p-2"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu
                className={cn(
                  "h-6 w-6 transition-colors duration-300",
                  isScrolled ? "text-[var(--brand-dark)]" : "text-white"
                )}
              />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "fixed top-0 right-0 z-[101] h-full w-[280px] bg-white shadow-2xl transition-transform duration-300 ease-out md:hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--brand-accent)]/50 ">
          <span className="text-lg font-bold text-gray-900">Menu</span>
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="p-6">
          <ul className="flex flex-col gap-2">
            {navItems.map((item, index) => (
              <li
                key={item.key}
                className={cn(
                  "transform transition-all duration-300",
                  isMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "translate-x-4 opacity-0"
                )}
                style={{
                  transitionDelay: isMenuOpen ? `${index * 50 + 100}ms` : "0ms",
                }}
              >
                <Link
                  href={item.href}
                  className="block py-3 px-4 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors font-medium text-base"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>

          {/* Language switcher */}
          <div
            className={cn(
              "mt-6 pt-6 border-t border-gray-100 px-4 transform transition-all duration-300",
              isMenuOpen
                ? "translate-x-0 opacity-100"
                : "translate-x-4 opacity-0"
            )}
            style={{
              transitionDelay: isMenuOpen
                ? `${navItems.length * 50 + 100}ms`
                : "0ms",
            }}
          >
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">
              {t("language")}
            </p>
            <LocaleSwitcher variant="dark" className="w-full" />
          </div>
        </nav>
      </aside>
    </>
  );
}
