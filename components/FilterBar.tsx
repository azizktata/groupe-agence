import {
  BfmFilterOptions,
  FlightFiltersState,
} from "@/mappers/mapSabreBfmToUi";
import { FilterPill } from "./filters/FilterPill";
import { useState } from "react";
import { PriceFilter } from "./filters/PriceFilter";
import { AirlinesFilter } from "./filters/AirlinesFilter";
import { StopsFilter } from "./filters/StopsFilter";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CabinsFilter } from "./filters/CabinsFilter";
import { TripTypesFilter } from "./filters/TripTypesFilter";
import { DepartureTimeRangesFilter } from "./filters/DepartureTimeRangesFilter";

type FiltersBarProps = {
  filters: FlightFiltersState;
  filterOptions: BfmFilterOptions;
  resultsCount: number;
  onChange: (next: FlightFiltersState) => void;
};

export function FiltersBar({
  filters,
  filterOptions,
  resultsCount,
  onChange,
}: FiltersBarProps) {
  // console.log('FiltersBar render with filters:', filters);
  console.log("Available filter options:", filterOptions);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  return (
    <div className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between overflow-x-auto">
        <div className="flex items-center gap-3 relative">
          {/* Tous les filtres */}
          <FilterPill
            label={
              showAdvancedFilters ? "Masquer les filtres" : "Tous les filtres"
            }
            primary
            active={showAdvancedFilters}
            onClick={() => setShowAdvancedFilters((v) => !v)}
          />

          {/* Escales */}
          <Popover>
            <PopoverTrigger asChild>
              <FilterPill label="Escales" active={filters.stops.length > 0} />
            </PopoverTrigger>

            <PopoverContent align="start" sideOffset={8} className="w-64">
              <StopsFilter
                availableStops={filterOptions.stops}
                selectedStops={filters.stops}
                onChange={(stops) => onChange({ ...filters, stops })}
              />
            </PopoverContent>
          </Popover>

          {/* Compagnies */}
          <Popover>
            <PopoverTrigger asChild>
              <FilterPill
                label="Compagnies"
                active={filters.airlines.length > 0}
              />
            </PopoverTrigger>

            <PopoverContent align="start" sideOffset={8} className="w-72">
              <AirlinesFilter
                airlines={filterOptions.airlines}
                selected={filters.airlines}
                onChange={(airlines) => onChange({ ...filters, airlines })}
              />
            </PopoverContent>
          </Popover>
          {/* Cabines */}
          <Popover>
            <PopoverTrigger asChild>
              <FilterPill label="Cabines" active={filters.cabins.length > 0} />
            </PopoverTrigger>

            <PopoverContent align="start" sideOffset={8} className="w-72">
              <CabinsFilter
                cabins={filterOptions.cabins}
                selected={filters.cabins}
                onChange={(cabins) => onChange({ ...filters, cabins })}
              />
            </PopoverContent>
          </Popover>

          {showAdvancedFilters && (
            <>
              {/* Departure Time */}
              <Popover>
                <PopoverTrigger asChild>
                  <FilterPill
                    label="Heure de départ"
                    active={
                      filters.departureTimeRanges.morning ||
                      filters.departureTimeRanges.afternoon ||
                      filters.departureTimeRanges.evening ||
                      filters.departureTimeRanges.night
                    }
                  />
                </PopoverTrigger>

                <PopoverContent align="start" sideOffset={8} className="w-72">
                  <DepartureTimeRangesFilter
                    value={filters.departureTimeRanges}
                    onChange={(departureTimeRanges) =>
                      onChange({ ...filters, departureTimeRanges })
                    }
                  />
                </PopoverContent>
              </Popover>

              {/* Trip types */}
              <Popover>
                <PopoverTrigger asChild>
                  <FilterPill
                    label="Type de voyage"
                    active={filters.tripType !== "any"}
                  />
                </PopoverTrigger>

                <PopoverContent align="start" sideOffset={8} className="w-72">
                  <TripTypesFilter
                    value={{
                      oneWay: filters.tripType === "ONE_WAY",
                      roundTrip: filters.tripType === "ROUND_TRIP",
                    }}
                    onChange={(value) => {
                      let tripType: "ONE_WAY" | "ROUND_TRIP" | "any" = "any";
                      if (value.oneWay && !value.roundTrip) {
                        tripType = "ONE_WAY";
                      } else if (!value.oneWay && value.roundTrip) {
                        tripType = "ROUND_TRIP";
                      }
                      onChange({ ...filters, tripType });
                    }}
                  />
                </PopoverContent>
              </Popover>

              {/* Prix */}
              <Popover>
                <PopoverTrigger asChild>
                  <FilterPill
                    label="Prix"
                    active={
                      filters.priceRange[0] !== filterOptions.priceRange.min ||
                      filters.priceRange[1] !== filterOptions.priceRange.max
                    }
                  />
                </PopoverTrigger>

                <PopoverContent align="start" sideOffset={8} className="w-72">
                  <PriceFilter
                    min={filterOptions.priceRange.min}
                    max={filterOptions.priceRange.max}
                    value={filters.priceRange}
                    onChange={(priceRange) =>
                      onChange({ ...filters, priceRange })
                    }
                  />
                </PopoverContent>
              </Popover>
            </>
          )}
        </div>

        <p className="text-xs font-medium text-slate-400 whitespace-nowrap">
          {resultsCount} résultat
          {resultsCount > 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}
