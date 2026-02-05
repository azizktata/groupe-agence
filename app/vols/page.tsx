'use client';

import React, { useCallback, useMemo, useState } from "react";
import {
  Plane,
  Luggage,
  ArrowRight,
  ChevronRight,
  Home,
  Calendar,
  Briefcase,
  AlertCircle,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { FlightSearchForm } from "@/components/FlightSearchForm";
import Link from "next/link";
import { extractBfmFilterOptions, FlightFiltersState, mapSabreBfmToUi, UiFlightOffer } from "@/mappers/mapSabreBfmToUi";
import { applyFlightFilters, minutesToReadable } from "@/lib/utils";
import { FiltersBar } from "@/components/FilterBar";

// Helper to format date in French
function formatDateFr(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
  });
}

// Cabin type translations
const CABIN_LABELS: Record<string, string> = {
  Economy: "Économique",
  "Premium Economy": "Économique Premium",
  Business: "Affaires",
  "First Class": "Première Classe",
  Y: "Économique",
  S: "Éco Premium",
  C: "Affaires",
  F: "Première",
};

export default function Index() {
  const [offers, setOffers] = useState<UiFlightOffer[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const filterOptions = extractBfmFilterOptions(offers);

  const [filters, setFilters] = useState<FlightFiltersState>({
    stops: [],
    airlines: [],
    cabins: [],
    priceRange: [0, 0],
    departureTimeRanges: {
      morning: false,
      afternoon: false,
      evening: false,
      night: false,
    },
    tripType: "any",
  });

  // Reset filters when new results come in
  const updateOffers = (newOffers: UiFlightOffer[]) => {
    setOffers(newOffers);
    const newFilterOptions = extractBfmFilterOptions(newOffers);
    setFilters({
      stops: [],
      airlines: [],
      cabins: [],
      priceRange: [
        newFilterOptions.priceRange.min,
        newFilterOptions.priceRange.max,
      ],
      departureTimeRanges: {
        morning: false,
        afternoon: false,
        evening: false,
        night: false,
      },
      tripType: "any",
    });
  };

  const filteredOffers = useMemo(
    () => applyFlightFilters(offers, filters),
    [offers, filters]
  );

  const handleSearch = useCallback(async (params: {
    from: string;
    to: string;
    departureDate: string;
    returnDate?: string;
    passengers: number;
    cabin?: string;
    airline?: string;
    maxStops?: string;
  }) => {
    setIsSearching(true);
    setError(null);
    setOffers([]);
    setHasSearched(true);

    try {
      const response = await fetch("/api/vols", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin: params.from,
          destination: params.to,
          departureDate: params.departureDate,
          returnDate: params.returnDate || undefined,
          passengers: params.passengers,
          cabin: params.cabin || undefined,
          airline: params.airline || undefined,
          maxStops: params.maxStops ? parseInt(params.maxStops) : undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("BFM API error:", errorData);
        throw new Error(errorData.details || "Failed to search flights");
      }

      const data = await response.json();
      console.log("Raw BFM response:", data);
      const mappedOffers = mapSabreBfmToUi(data);
      updateOffers(mappedOffers);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSearching(false);
    }
  }, []);

  return (
    <>
      <Header />

      <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
        {/* 1. HERO BANNER SECTION */}
        <div className="relative w-full overflow-hidden">
          <img
            src="/airplane-background.png"
            alt="Bannière voyage"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark Overlay for text readability */}
          <div className="absolute inset-0 bg-slate-900/50"></div>

          <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-white/80 text-sm mb-6">
              <Link href="/" className="hover:text-white transition-colors">
                <Home className="w-4 h-4" />
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span>Recherche</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white font-medium">Résultats</span>
            </nav>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Trouvez votre vol idéal
            </h1>

            {/* Search Form */}
            <div className="max-w-4xl">
              <FlightSearchForm
                compact
                onSearch={handleSearch}
                isLoading={isSearching}
                defaultValues={{
                  from: "WAW",
                  to: "SPU",
                  departureDate: "2026-09-11",
                  returnDate: "2026-09-18",
                  passengers: 1,
                  cabin: "Y",
                  airline: "",
                  maxStops: "",
                }}
              />
            </div>
          </div>
        </div>

        {/* 2. FILTER BAR (Sticky) */}
        {offers.length > 0 && (
          <FiltersBar
            filters={filters}
            filterOptions={filterOptions}
            resultsCount={filteredOffers.length}
            onChange={setFilters}
          />
        )}

        {/* 3. RESULTS / STATES */}
        <div className="max-w-6xl mx-auto px-6 py-10">
          {/* Error state */}
          {error && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6 mb-6">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Loading state */}
          {isSearching && (
            <div className="text-center py-16">
              <div className="w-8 h-8 border-4 border-[var(--brand-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-500 text-lg">Recherche en cours...</p>
            </div>
          )}

          {/* Results list */}
          {!isSearching && filteredOffers.length > 0 && (
            <div className="space-y-6">
              {filteredOffers.map((flight) => (
                <div
                  key={flight.id}
                  className="bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-xl hover:border-[var(--brand-primary)]/30 transition-all duration-300"
                >
                  {/* Cabin Badge - Top of card */}
                  <div className="px-8 pt-6 pb-0">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] px-3 py-1 rounded-full text-xs font-bold">
                        <Briefcase className="w-3 h-3" />
                        {CABIN_LABELS[flight.cabin] || flight.cabin}
                      </span>
                      {flight.inbound && (
                        <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full text-xs font-medium">
                          Aller-retour
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-8 pt-4 flex flex-col lg:flex-row gap-8 lg:items-center">
                    {/* Airline info */}
                    <div className="flex lg:flex-col items-center gap-4 min-w-[120px]">
                      <div className="w-14 h-14 bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/10 rounded-2xl flex items-center justify-center text-[var(--brand-primary)] font-black text-xl">
                        {flight.airlineCode}
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-slate-900 text-sm">
                          {flight.airline}
                        </p>
                      </div>
                    </div>

                    {/* Journey logic */}
                    <div className="flex-1 space-y-6">
                      {/* Outbound Leg */}
                      <div className="flex items-center justify-between">
                        <div className="text-left">
                          <div className="flex items-center gap-2 mb-1">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            <span className="text-xs text-slate-500 font-medium">
                              {formatDateFr(flight.outbound.date)}
                            </span>
                          </div>
                          <p className="text-2xl font-black text-slate-900">
                            {flight.outbound.departureTime}
                          </p>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                            {flight.outbound.from}
                          </p>
                        </div>

                        <div className="flex-1 px-6 flex flex-col items-center">

                          <div className="w-full h-[2px] bg-slate-200 relative">
                            <Plane className="w-4 h-4 absolute -top-[7px] left-1/2 -translate-x-1/2 text-[var(--brand-primary)] fill-[var(--brand-primary)]" />
                          </div>
                          <span className="text-[10px] text-slate-400 font-bold mt-3">
                            {minutesToReadable(flight.outbound.durationMinutes)}
                          </span>
                        </div>

                        <div className="text-right">
                          <div className="flex items-center justify-end gap-2 mb-1">
                            <span className="text-xs text-slate-500 font-medium">
                              {formatDateFr(flight.outbound.date)}
                            </span>
                          </div>
                          <p className="text-2xl font-black text-slate-900">
                            {flight.outbound.arrivalTime}
                          </p>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                            {flight.outbound.to}
                          </p>
                        </div>
                      </div>

                      {/* Inbound Leg */}
                      {flight.inbound && (
                        <div className="flex items-center justify-between border-t border-slate-100 pt-5">
                          <div className="text-left">
                            <div className="flex items-center gap-2 mb-1">
                              <Calendar className="w-3 h-3 text-slate-400" />
                              <span className="text-xs text-slate-500 font-medium">
                                {formatDateFr(flight.inbound.date)}
                              </span>
                            </div>
                            <p className="text-xl font-bold text-slate-700">
                              {flight.inbound.departureTime}
                            </p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">
                              {flight.inbound.from}
                            </p>
                          </div>

                          <div className="flex-1 px-6 flex flex-col items-center">
                            <div className="w-full h-[1px] border-t border-dashed border-slate-300 relative">

                            <Plane className="w-4 h-4 absolute -top-[7px] left-1/2 -translate-x-1/2 text-[var(--brand-primary)]/50 fill-[var(--brand-primary)]/50 -rotate-90" />
                            </div>
                            <span className="text-[10px] text-slate-400 font-bold mt-3">
                              {minutesToReadable(flight.inbound.durationMinutes)}
                            </span>
                          </div>

                          <div className="text-right">
                            <div className="flex items-center justify-end gap-2 mb-1">
                              <span className="text-xs text-slate-500 font-medium">
                                {formatDateFr(flight.inbound.date)}
                              </span>
                            </div>
                            <p className="text-xl font-bold text-slate-700">
                              {flight.inbound.arrivalTime}
                            </p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">
                              {flight.inbound.to}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Price & Action */}
                    <div className="lg:border-l border-slate-100 lg:pl-8 flex flex-col items-center justify-center min-w-[180px]">
                      <div className="mb-4 text-center">
                        <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">
                          Prix total / pers.
                        </div>
                        <p className="text-3xl font-black text-slate-900">
                          <span className="text-base font-bold text-slate-400 mr-0.5">
                            $
                          </span>
                          {flight.price}
                        </p>
                        <p className="text-[10px] text-slate-500 font-medium flex items-center justify-center gap-1 mt-1">
                          <Luggage className="w-3 h-3 text-emerald-500" />
                          {flight.baggage === "No checked bag"
                            ? "Bagage cabine"
                            : flight.baggage}
                        </p>
                      </div>
                      <Button
                        asChild
                        size="default"
                        rounded="xl"
                        className="w-full shadow-lg shadow-[var(--brand-primary)]/20 active:scale-[0.98]"
                      >
                        <Link href={`/vols/${flight.id}`}>
                          Sélectionner
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty results after search */}
          {!isSearching && hasSearched && offers.length === 0 && !error && (
            <div className="text-center py-16">
              <p className="text-slate-500 text-lg">
                Aucun vol ne correspond à vos critères.
              </p>
            </div>
          )}

          {/* Empty after filtering */}
          {!isSearching && offers.length > 0 && filteredOffers.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-500 text-lg">
                Aucun vol ne correspond à vos filtres.
              </p>
              <button
                onClick={() => {
                  const opts = extractBfmFilterOptions(offers);
                  setFilters({
                    stops: [],
                    airlines: [],
                    cabins: [],
                    priceRange: [opts.priceRange.min, opts.priceRange.max],
                    departureTimeRanges: { morning: false, afternoon: false, evening: false, night: false },
                    tripType: "any",
                  });
                }}
                className="mt-4 text-[var(--brand-primary)] font-semibold hover:underline"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}

          {/* Initial state */}
          {!isSearching && !hasSearched && (
            <div className="text-center py-16">
              <p className="text-slate-500 text-lg">
                Lancez une recherche pour trouver des vols.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
