"use client";

import { useMemo, useState } from "react";
import { ChevronRight, Home } from "lucide-react";
import { Header } from "@/components/Header";
import Link from "next/link";
import { mapSabreHotelsToUi, UiHotel } from "@/mappers/mapSabreHotelsToUi";
import { MOCK_SABRE_HOTELS_LIST } from "@/mocks/hotel/sabre-hotel-list";
import HotelCard from "@/components/HotelCard";
import HotelSearchForm from "@/components/HotelSearchForm";
import {
  HotelFiltersBar,
  HotelFiltersState,
  HotelFilterOptions,
} from "@/components/HotelFiltersBar";

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
  // Using mock data directly for testing
  const hotels = mapSabreHotelsToUi(MOCK_SABRE_HOTELS_LIST);
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
              <span className="text-white font-medium">Hôtels</span>
            </nav>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Trouvez votre hôtel idéal
            </h1>

            {/* Search Form */}
            <div className="max-w-4xl">
              <HotelSearchForm
                compact
                defaultValues={{
                  hotelName: "",
                  chainCode: "",
                  minRating: "3.0",
                  amenityCodes: [],
                }}
              />
            </div>
          </div>
        </div>

        {/* 2. FILTER BAR (Sticky) */}
        <HotelFiltersBar
          filters={filters}
          filterOptions={filterOptions}
          resultsCount={filteredHotels.length}
          onChange={setFilters}
        />

        {/* 3. RESULTS GRID */}
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>

          {/* Empty state */}
          {filteredHotels.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-500 text-lg">
                Aucun hôtel ne correspond à vos critères.
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
        </div>
      </div>
    </>
  );
}

/* TODO: Uncomment when ready to implement full search functionality

import { useState, useCallback } from "react";
import { AlertCircle } from "lucide-react";
import {
  mapSabreImagesToMap,
  mergeHotelImages,
  extractHotelCodes,
  UiHotel,
} from "@/mappers/mapSabreHotelsToUi";
import HotelSearchForm, { HotelSearchFilters } from "@/components/HotelSearchForm";

// State management
const [hotels, setHotels] = useState<UiHotel[]>([]);
const [isSearching, setIsSearching] = useState(false);
const [isLoadingImages, setIsLoadingImages] = useState(false);
const [error, setError] = useState<string | null>(null);
const [hasSearched, setHasSearched] = useState(false);

const handleSearch = useCallback(async (filters: HotelSearchFilters) => {
  setIsSearching(true);
  setIsLoadingImages(true);
  setError(null);
  setHotels([]);
  setHasSearched(true);

  try {
    // Step 1: Fetch hotel list
    const listResponse = await fetch("/api/hotels/list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hotelName: filters.hotelName || undefined,
        chainCode: filters.chainCode || undefined,
        minRating: filters.minRating,
        amenityCodes: filters.amenityCodes.length > 0 ? filters.amenityCodes : undefined,
      }),
    });

    if (!listResponse.ok) {
      const errorData = await listResponse.json();
      throw new Error(errorData.details || "Failed to fetch hotels");
    }

    const listData = await listResponse.json();
    const mappedHotels = mapSabreHotelsToUi(listData);

    if (mappedHotels.length === 0) {
      setHotels([]);
      setIsSearching(false);
      setIsLoadingImages(false);
      return;
    }

    setHotels(mappedHotels);
    setIsSearching(false);

    // Step 2: Fetch images in parallel
    const hotelCodes = extractHotelCodes(listData);

    try {
      const imagesResponse = await fetch("/api/hotels/images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hotelCodes,
          imageType: "LARGE",
        }),
      });

      if (imagesResponse.ok) {
        const imagesData = await imagesResponse.json();
        const imageMap = mapSabreImagesToMap(imagesData);
        setHotels((currentHotels) => mergeHotelImages(currentHotels, imageMap));
      }
    } catch (imageError) {
      console.error("Failed to load hotel images:", imageError);
    } finally {
      setIsLoadingImages(false);
    }
  } catch (err) {
    setError(err instanceof Error ? err.message : "An error occurred");
    setIsSearching(false);
    setIsLoadingImages(false);
  }
}, []);

*/
