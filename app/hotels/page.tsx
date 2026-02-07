"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronRight, Home, AlertCircle } from "lucide-react";
import { Header } from "@/components/Header";
import Link from "next/link";
import { mapSabreHotelsToUi, UiHotel } from "@/mappers/mapSabreHotelsToUi";
import HotelCard from "@/components/HotelCard";
import HotelSearchForm, { HotelSearchFilters } from "@/components/HotelSearchForm";
import {
  HotelFiltersBar,
  HotelFiltersState,
  HotelFilterOptions,
} from "@/components/HotelFiltersBar";
import { MOCK_SABRE_HOTEL_SAMPLE } from "@/mocks/hotel/sabre-hotel-sample";
import { MOCK_SABRE_HOTELS_LIST } from "@/mocks/hotel/sabre-hotel-list";

// Extract filter options from hotel list
function extractHotelFilterOptions(hotels: UiHotel[]): HotelFilterOptions {
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

// Apply filters to hotel list
function applyHotelFilters(
  hotels: UiHotel[],
  filters: HotelFiltersState
): UiHotel[] {
  return hotels.filter((hotel) => {
    // Chain filter
    if (
      filters.chains.length > 0 &&
      !filters.chains.includes(hotel.chain.code)
    ) {
      return false;
    }

    // Rating filter
    if (filters.minRating > 0 && hotel.rating < filters.minRating) {
      return false;
    }

    return true;
  });
}

export default function HotelsPage() {
  const [hotels, setHotels] = useState<UiHotel[]>([]);
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

  const handleSearch = useCallback(async (searchFilters: HotelSearchFilters) => {
    setIsSearching(true);
    setError(null);
    setHotels([]);
    setHasSearched(true);
    console.log("Search filters:", searchFilters);
    try {
      const listResponse = await fetch("/api/hotels/list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hotelName: searchFilters.hotelName || undefined,
          chainCode: searchFilters.chainCode || undefined,
          minRating: searchFilters.minRating,
          // amenityCodes: searchFilters.amenityCodes.length > 0 ? searchFilters.amenityCodes : undefined,
          securityFeatureCodes: searchFilters.securityFeatureCodes.length > 0 ? searchFilters.securityFeatureCodes : undefined,
          propertyTypeCodes: searchFilters.propertyTypeCodes.length > 0 ? searchFilters.propertyTypeCodes : undefined,
          propertyQualityCodes: searchFilters.propertyQualityCodes.length > 0 ? searchFilters.propertyQualityCodes : undefined,
        }),
      });

      if (!listResponse.ok) {
        const errorData = await listResponse.json();
        console.error("Hotel list API error:", errorData);
        throw new Error(errorData.details || "Failed to fetch hotels");
      }

      const listData = await listResponse.json();
      console.log("Raw Sabre response:", listData);
      const mockResponse = MOCK_SABRE_HOTELS_LIST;
      const mappedHotels = mapSabreHotelsToUi(listData, mockResponse);
      setHotels(mappedHotels);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    // Auto-trigger a search on mount with default filters (optional)
    handleSearch({
      hotelName: "",
      chainCode: "",
      minRating: "3.0",
      amenityCodes: [],
      securityFeatureCodes: [],
      propertyTypeCodes: [],
      propertyQualityCodes: [],
    });
  }, [handleSearch]);

  return (
    <>
      <Header />

      <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
        {/* 1. HERO BANNER SECTION */}
        <div className="relative w-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=80"
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
              <span className="text-white font-medium">Hôtels</span>
            </nav>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Trouvez votre hôtel idéal
            </h1>

            {/* Search Form */}
            <div className="max-w-4xl">
              <HotelSearchForm
                compact
                onSearch={handleSearch}
                isLoading={isSearching}
                defaultValues={{
                  hotelName: "",
                  chainCode: "",
                  minRating: "3.0",
                  amenityCodes: [],
                  securityFeatureCodes: [],
                  propertyTypeCodes: [],
                  propertyQualityCodes: [],
                }}
              />
            </div>
          </div>
        </div>

        {/* 2. FILTER BAR (Sticky) */}
        {hotels.length > 0 && (
          <HotelFiltersBar
            filters={filters}
            filterOptions={filterOptions}
            resultsCount={filteredHotels.length}
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

          {/* Results grid */}
          {!isSearching && filteredHotels.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          )}

          {/* Empty results after search */}
          {!isSearching && hasSearched && hotels.length === 0 && !error && (
            <div className="text-center py-16">
              <p className="text-slate-500 text-lg">
                Aucun hôtel ne correspond à vos critères.
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

          {/* Initial state - no search yet */}
          {!isSearching && !hasSearched && (
            <div className="text-center py-16">
              <p className="text-slate-500 text-lg">
                Lancez une recherche pour trouver des hôtels.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
