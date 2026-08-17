"use client";

import { useTranslations } from "next-intl";

import { FilterPill } from "./filters/FilterPill";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Star, Building2, Wifi, Car, Waves } from "lucide-react";

// Hotel filter types
export type HotelFiltersState = {
  chains: string[];
  minRating: number;
  amenities: number[];
};

export type HotelFilterOptions = {
  chains: { code: string; name: string }[];
  ratings: number[];
  amenities: { code: number; name: string; icon?: React.ReactNode }[];
};

type HotelFiltersBarProps = {
  filters: HotelFiltersState;
  filterOptions: HotelFilterOptions;
  resultsCount: number;
  onChange: (next: HotelFiltersState) => void;
};

// Amenity icons
const AMENITY_ICONS: Record<number, React.ReactNode> = {
  179: <Wifi className="w-3.5 h-3.5" />,
  71: <Waves className="w-3.5 h-3.5" />,
  42: <Car className="w-3.5 h-3.5" />,
};

export function HotelFiltersBar({
  filters,
  filterOptions,
  resultsCount,
  onChange,
}: HotelFiltersBarProps) {
  const t = useTranslations("hotelFilters");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const renderStars = (count: number) => {
    return Array.from({ length: count }, (_, i) => (
      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
    ));
  };

  return (
    <div className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between overflow-x-auto">
        <div className="flex items-center gap-3 relative">
          {/* All filters toggle */}
          <FilterPill
            label={
              showAdvancedFilters ? t("hide") : t("allFilters")
            }
            primary
            active={showAdvancedFilters}
            onClick={() => setShowAdvancedFilters((v) => !v)}
          />

          {/* Chain filter */}
          <Popover>
            <PopoverTrigger asChild>
              <FilterPill label={t("chain")} active={filters.chains.length > 0} />
            </PopoverTrigger>

            <PopoverContent align="start" sideOffset={8} className="w-64">
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-slate-900">{t("chainFull")}</h4>
                <div className="space-y-2">
                  {filterOptions.chains.map((chain) => (
                    <label
                      key={chain.code}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={filters.chains.includes(chain.code)}
                        onChange={() => {
                          const newChains = filters.chains.includes(chain.code)
                            ? filters.chains.filter((c) => c !== chain.code)
                            : [...filters.chains, chain.code];
                          onChange({ ...filters, chains: newChains });
                        }}
                        className="w-4 h-4 rounded border-slate-300 text-[var(--brand-primary)] focus:ring-[var(--brand-primary)]"
                      />
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-700 group-hover:text-slate-900">
                          {chain.name}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Rating filter */}
          <Popover>
            <PopoverTrigger asChild>
              <FilterPill label={t("stars")} active={filters.minRating > 0} />
            </PopoverTrigger>

            <PopoverContent align="start" sideOffset={8} className="w-64">
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-slate-900">{t("minRating")}</h4>
                <div className="space-y-2">
                  {[5, 4, 3].map((rating) => (
                    <label
                      key={rating}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="rating"
                        checked={filters.minRating === rating}
                        onChange={() => onChange({ ...filters, minRating: rating })}
                        className="w-4 h-4 border-slate-300 text-[var(--brand-primary)] focus:ring-[var(--brand-primary)]"
                      />
                      <div className="flex items-center gap-1">
                        {renderStars(rating)}
                        <span className="text-sm text-slate-500 ml-1">et plus</span>
                      </div>
                    </label>
                  ))}
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="rating"
                      checked={filters.minRating === 0}
                      onChange={() => onChange({ ...filters, minRating: 0 })}
                      className="w-4 h-4 border-slate-300 text-[var(--brand-primary)] focus:ring-[var(--brand-primary)]"
                    />
                    <span className="text-sm text-slate-700">{t("allRatings")}</span>
                  </label>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {showAdvancedFilters && (
            <>
              {/* Amenities filter */}
              <Popover>
                <PopoverTrigger asChild>
                  <FilterPill
                    label={t("amenities")}
                    active={filters.amenities.length > 0}
                  />
                </PopoverTrigger>

                <PopoverContent align="start" sideOffset={8} className="w-64">
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-slate-900">{t("amenities")}</h4>
                    <div className="space-y-2">
                      {filterOptions.amenities.map((amenity) => (
                        <label
                          key={amenity.code}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            checked={filters.amenities.includes(amenity.code)}
                            onChange={() => {
                              const newAmenities = filters.amenities.includes(amenity.code)
                                ? filters.amenities.filter((c) => c !== amenity.code)
                                : [...filters.amenities, amenity.code];
                              onChange({ ...filters, amenities: newAmenities });
                            }}
                            className="w-4 h-4 rounded border-slate-300 text-[var(--brand-primary)] focus:ring-[var(--brand-primary)]"
                          />
                          <div className="flex items-center gap-2">
                            {AMENITY_ICONS[amenity.code] || <Wifi className="w-4 h-4 text-slate-400" />}
                            <span className="text-sm text-slate-700 group-hover:text-slate-900">
                              {amenity.name}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </>
          )}
        </div>

        <p className="text-xs font-medium text-slate-400 whitespace-nowrap">
          {resultsCount} hôtel{resultsCount > 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}
