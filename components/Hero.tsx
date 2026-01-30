"use client";

import { PlaneTakeoff, PlaneLanding, Calendar, Search } from "lucide-react";

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

      <div className="max-w-7xl mx-auto 2xl:max-w-8xl px-6 relative z-10 mt-12 sm:mt-0 pb-12 sm:pb-0">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
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
                <span className="hidden sm:flex w-1.5 h-1.5 rounded-full bg-[var(--brand-primary)]" />
                560 000+ vols
              </span>
              <span className="text-xs sm:text-sm flex items-center gap-2 uppercase font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-primary)]" />
                21 000+ hôtels
              </span>
              <span className="text-xs sm:text-sm flex items-center gap-2 uppercase font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-primary)]" />
                120 pays
              </span>
            </div>
          </div>

          {/* Right Side - Search Card */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-white/15 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl">
             
              <form className="space-y-3">
                {/* Departure City */}
                <div className="bg-white rounded-xl px-4 py-3">
                  <label className="text-gray-500 text-xs font-medium flex items-center gap-1.5 mb-1">
                    <PlaneTakeoff className="w-3.5 h-3.5" />
                    From
                  </label>
                  <input
                    type="text"
                    placeholder="Ville de départ"
                    className="w-full bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none text-sm font-medium"
                  />
                </div>

                {/* Destination City */}
                <div className="bg-white rounded-xl px-4 py-3">
                  <label className="text-gray-500 text-xs font-medium flex items-center gap-1.5 mb-1">
                    <PlaneLanding className="w-3.5 h-3.5" />
                    To
                  </label>
                  <input
                    type="text"
                    placeholder="Ville de destination"
                    className="w-full bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none text-sm font-medium"
                  />
                </div>

                {/* Date Fields */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-xl px-4 py-3">
                    <label className="text-gray-500 text-xs font-medium flex items-center gap-1.5 mb-1">
                      <Calendar className="w-3.5 h-3.5" />
                      Départ
                    </label>
                    <input
                      type="date"
                      className="w-full bg-transparent text-gray-900 focus:outline-none text-sm font-medium"
                    />
                  </div>
                  <div className="bg-white rounded-xl px-4 py-3">
                    <label className="text-gray-500 text-xs font-medium flex items-center gap-1.5 mb-1">
                      <Calendar className="w-3.5 h-3.5" />
                      Retour
                    </label>
                    <input
                      type="date"
                      className="w-full bg-transparent text-gray-900 focus:outline-none text-sm font-medium"
                    />
                  </div>
                </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full text-sm sm:text-base flex items-center justify-center gap-2 bg-[var(--brand-primary)] hover:brightness-110 text-white font-semibold py-4 rounded-xl transition-all mt-2"
              >
                <Search className="w-5 h-5" />
                Rechercher un voyage
              </button>
            </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
