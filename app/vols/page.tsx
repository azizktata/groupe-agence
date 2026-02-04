'use client';

import React, { useMemo, useState } from "react";
import {
  Plane,
  Luggage,
  ArrowRight,
  ChevronRight,
  Home,
  ChevronDown,
  Filter,
  Calendar,
  Briefcase,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { FlightSearchForm } from "@/components/FlightSearchForm";
import Link from "next/link";
import { extractBfmFilterOptions, FlightFiltersState, mapSabreBfmToUi } from "@/mappers/mapSabreBfmToUi";
import { MOCK_SABRE_BFM_RESPONSE } from "@/mocks/sabre-bfm-original.mock";
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
  const offers = mapSabreBfmToUi(MOCK_SABRE_BFM_RESPONSE);
  const filterOptions  = extractBfmFilterOptions(offers);
   const [filters, setFilters] = useState<FlightFiltersState>({
    stops: [],
    airlines: [],
    cabins: [],
    priceRange: [
      filterOptions.priceRange.min,
      filterOptions.priceRange.max,
    ],
    departureTimeRanges: {
      morning: false,
      afternoon: false,
      evening: false,
      night: false,
    },
    tripType: "any",
  });

  const filteredOffers = useMemo(
    () => applyFlightFilters(offers, filters),
    [offers, filters]
  );
  

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

          <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32">
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
        <FiltersBar 
          filters={filters}
          filterOptions={filterOptions}
          resultsCount={filteredOffers.length}
          onChange={setFilters}
        />

        {/* 3. RESULTS LIST */}
        <div className="max-w-6xl mx-auto px-6 py-10">
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
        </div>
      </div>
    </>
  );
}
