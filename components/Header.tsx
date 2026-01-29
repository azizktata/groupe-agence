"use client";

import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "Accueil", href: "/" },
  { label: "Qui sommes-nous", href: "#about" },
  { label: "Billets", href: "#billets" },
  { label: "Hôtels", href: "#hotels" },
];

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 py-4">
      <div className="max-w-7xl mx-auto px-6">
        {/* Desktop Navigation - Centered with auto width */}
        <nav className="hidden md:flex justify-center">
          <ul className="flex items-center gap-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-8 py-2">
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
        <nav className={cn("flex md:hidden items-center justify-between bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3", isMenuOpen && "flex-col")}>
          {/* Logo */}
          <Link href="/" className={cn("flex items-center gap-2", isMenuOpen && "hidden")}>
            <span className="text-lg font-bold text-white">
              Groupe L&apos;Agence
            </span>
          </Link>

          {/* Mobile Menu Button */}
           <button
            className="p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-primary" />
            ) : (
              <Menu className="h-6 w-6 text-primary" />
            )}
          </button>

          {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-border animate-fade-up">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-base font-medium text-white hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
 
            </nav>
          </div>
        )}
        </nav>
      </div>
    </header>
  );
}
