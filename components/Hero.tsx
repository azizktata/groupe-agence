"use client";

import { SearchCard } from "./SearchCard";

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center pt-20"
      style={{
        backgroundImage: "url('/airplane-background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[var(--brand-dark)]/30" />

      <div className="max-w-7xl mx-auto 2xl:max-w-8xl px-6 2xl:px-10 relative z-10 mt-12 sm:mt-0 pb-12 sm:pb-0">
        <div className="grid lg:grid-cols-2 gap-12 items-start lg:items-center">
          {/* Left Side - Content */}
          <div className="text-white">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight tracking-wide mb-6">
              Voyagez, Réservez{" "}
              <span className="text-[var(--brand-accent)]">Économisez.</span>
            </h1>
            <p className="text-md sm:text-lg text-white/90 mb-8 max-w-xl">
              Accédez aux meilleures offres de vols et d&apos;hôtels, réunies en
              un seul endroit pour réserver simplement et au meilleur prix.
            </p>

            {/* Proof Text */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/90">
              <span className=" hidden sm:flex items-center gap-2 uppercase font-medium">
                Une seule recherche
              </span>
              <span className="text-xs sm:text-sm flex items-center gap-2 uppercase font-medium">
                <span className="hidden sm:flex w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)] animate-pulse" />
                560 000+ vols
              </span>
              <span className="text-xs sm:text-sm flex items-center gap-2 uppercase font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)] animate-pulse" />
                21 000+ hôtels
              </span>
              <span className="text-xs sm:text-sm flex items-center gap-2 uppercase font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)] animate-pulse" />
                120 pays
              </span>
            </div>
          </div>

          {/* Right Side - Search Card */}
          <SearchCard />
        </div>
      </div>
    </section>
  );
}
