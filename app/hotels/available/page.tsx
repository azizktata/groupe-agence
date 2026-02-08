"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronRight, Home, AlertCircle } from "lucide-react";
import { Header } from "@/components/Header";
import Link from "next/link";
import { mapSabreHotelAvailToUi, UiHotelAvail } from "@/mappers/mapSabreHotelAvailToUi";
import HotelAvailCard from "@/components/HotelAvailCard";
import HotelAvailSearchForm, { HotelAvailSearchFilters } from "@/components/HotelAvailSearchForm";
import {
  HotelFiltersBar,
  HotelFiltersState,
  HotelFilterOptions,
} from "@/components/HotelFiltersBar";
import { MOCK_SABRE_HOTEL_AVAIL_RESPONSE } from "@/mocks/hotel/sabre-hotel-avail";

function extractHotelFilterOptions(hotels: UiHotelAvail[]): HotelFilterOptions {
  const chainsMap = new Map<string, string>();
  hotels.forEach((h) => chainsMap.set(h.chain.code, h.chain.name));

  return {
    chains: Array.from(chainsMap.entries()).map(([code, name]) => ({
      code,
      name,
    })),
    ratings: [5, 4, 3],
    amenities: [
      { code: 179, name: "WiFi" },
      { code: 71, name: "Piscine" },
      { code: 42, name: "Parking gratuit" },
    ],
  };
}

function applyHotelFilters(
  hotels: UiHotelAvail[],
  filters: HotelFiltersState
): UiHotelAvail[] {
  return hotels.filter((hotel) => {
    if (
      filters.chains.length > 0 &&
      !filters.chains.includes(hotel.chain.code)
    ) {
      return false;
    }
    if (filters.minRating > 0 && hotel.rating < filters.minRating) {
      return false;
    }
    return true;
  });
}

export default function HotelsAvailablePage() {
  const [hotels, setHotels] = useState<UiHotelAvail[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const filterOptions = extractHotelFilterOptions(hotels);

  const [filters, setFilters] = useState<HotelFiltersState>({
    chains: [],
    minRating: 0,
    amenities: [],
  });

  const filteredHotels = useMemo(
    () => applyHotelFilters(hotels, filters),
    [hotels, filters]
  );

  const handleSearch = useCallback(async (searchFilters: HotelAvailSearchFilters) => {
    setIsSearching(true);
    setError(null);
    setHotels([]);
    setHasSearched(true);

    try {
      const rooms = searchFilters.rooms.map((room, i) => ({
        index: i + 1,
        adults: room.adults,
        children: room.children > 0 ? room.children : undefined,
        childAges: room.children > 0 && room.childAges ? room.childAges : undefined,
      }));

      const response = await fetch("/api/hotels/avail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          refPointValue: searchFilters.destination,
          refPointValueContext: "CODE",
          refPointType: "6",
          radius: 50,
          uom: "KM",
          startDate: searchFilters.startDate,
          endDate: searchFilters.endDate,
          currencyCode: "USD",
          bestOnly: "1",
          rooms,
          sortBy: "AverageNightlyRate",
          sortOrder: "ASC",
          pageSize: 50,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Hotel avail API error:", errorData);
        throw new Error(errorData.details || "Failed to fetch hotel availability");
      }

      const data = await response.json();
      console.log("Raw Sabre avail response:", data);
      const mappedHotels = mapSabreHotelAvailToUi(data);
      if (mappedHotels.length === 0) {
          console.warn("No hotels mapped from Sabre response, using mock data");
          const mockresponse = MOCK_SABRE_HOTEL_AVAIL_RESPONSE as any;
        setHotels(mapSabreHotelAvailToUi(mockresponse));
      } else {
        setHotels(mappedHotels);
      }
    //   setHotels(mappedHotels);
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
        {/* HERO BANNER */}
        <div className="relative w-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80"
            alt="Bannière hôtels disponibles"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/50"></div>

          <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-12">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-white/80 text-sm mb-6">
              <Link href="/" className="hover:text-white transition-colors">
                <Home className="w-4 h-4" />
              </Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/hotels" className="hover:text-white transition-colors">
                Hôtels
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white font-medium">Disponibilités</span>
            </nav>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              Hôtels disponibles
            </h1>
            <p className="text-white/70 text-lg mb-8">
              Recherchez par destination, dates et voyageurs pour voir les tarifs en temps réel.
            </p>

            {/* Search Form */}
            <div className="max-w-4xl">
              <HotelAvailSearchForm
                compact
                onSearch={handleSearch}
                isLoading={isSearching}
              />
            </div>
          </div>
        </div>

        {/* FILTER BAR */}
        {hotels.length > 0 && (
          <HotelFiltersBar
            filters={filters}
            filterOptions={filterOptions}
            resultsCount={filteredHotels.length}
            onChange={setFilters}
          />
        )}

        {/* RESULTS */}
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
              <p className="text-slate-500 text-lg">Recherche des disponibilités...</p>
            </div>
          )}

          {/* Results grid */}
          {!isSearching && filteredHotels.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHotels.map((hotel) => (
                <HotelAvailCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          )}

          {/* Empty results after search */}
          {!isSearching && hasSearched && hotels.length === 0 && !error && (
            <div className="text-center py-16">
              <p className="text-slate-500 text-lg">
                Aucun hôtel disponible pour ces critères.
              </p>
            </div>
          )}

          {/* Empty after filtering */}
          {!isSearching && hotels.length > 0 && filteredHotels.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-500 text-lg">
                Aucun hôtel ne correspond à vos filtres.
              </p>
              <button
                onClick={() =>
                  setFilters({ chains: [], minRating: 0, amenities: [] })
                }
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
                Sélectionnez une destination et vos dates pour voir les hôtels disponibles.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
