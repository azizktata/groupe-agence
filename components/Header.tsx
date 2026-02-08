"use client";

import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Accueil", href: "/" },
  { label: "Vols", href: "/vols" },
  { label: "Hotels", href: "/hotels" },
  // { label: "Disponibilités", href: "/hotels/available" },
  // { label: "À propos", href: "#about" },
  // { label: "Services", href: "#services" },
  { label: "Destinations", href: "/#destinations" },
  { label: "Contact", href: "/#contact" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50 py-4">
        <div className="max-w-7xl mx-auto px-6">
          {/* Desktop Navigation - Centered with auto width */}
          <nav className="hidden md:flex justify-center">
            <ul className="flex items-center gap-8 bg-white/20 backdrop-blur-md border border-white/20 rounded-full px-12 py-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-white/90 hover:text-white transition-colors font-medium text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Navigation - Logo + Menu Button */}
          <nav className="flex md:hidden items-center justify-between bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-lg font-bold text-white">
                Groupe L&apos;Agence
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="p-2"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6 text-white" />
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
                key={item.label}
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
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
