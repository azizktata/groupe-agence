"use client";

import React, { useState } from "react";
import { Loader2, Search, MapPin, Calendar, Car } from "lucide-react";
import { Button } from "@/components/ui/button";

export type CarSearchFilters = {
  pickupLocation: string;
  pickupDate: string;
  returnDate: string;
  vehicleType: string;
};

type CarSearchFormProps = {
  onSearch?: (filters: CarSearchFilters) => void;
  isLoading?: boolean;
  compact?: boolean;
  defaultValues?: Partial<CarSearchFilters>;
};

const VEHICLE_TYPES = [
  { code: "", name: "Peu importe" },
  { code: "ECONOMY", name: "Économique" },
  { code: "SEDAN", name: "Berline" },
  { code: "SUV", name: "SUV" },
  { code: "MINIBUS", name: "Minibus" },
  { code: "LUXURY", name: "Luxe" },
];

export function CarSearchForm({
  onSearch,
  isLoading = false,
  compact = false,
  defaultValues,
}: CarSearchFormProps) {
  const [filters, setFilters] = useState<CarSearchFilters>({
    pickupLocation: defaultValues?.pickupLocation || "",
    pickupDate: defaultValues?.pickupDate || "",
    returnDate: defaultValues?.returnDate || "",
    vehicleType: defaultValues?.vehicleType || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(filters);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/20"
    >
      <div
        className={`grid gap-4 ${
          compact ? "md:grid-cols-2 lg:grid-cols-5" : "md:grid-cols-2 lg:grid-cols-4"
        }`}
      >
        {/* Pickup Location */}
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Lieu de prise en charge
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="ex: Abidjan, Aéroport FHB..."
              className="w-full border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent outline-none transition-all"
              value={filters.pickupLocation}
              onChange={(e) =>
                setFilters({ ...filters, pickupLocation: e.target.value })
              }
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Pickup Date */}
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Date de prise en charge
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="date"
              className="w-full border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent outline-none transition-all"
              value={filters.pickupDate}
              onChange={(e) =>
                setFilters({ ...filters, pickupDate: e.target.value })
              }
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Return Date */}
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Date de retour
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="date"
              min={filters.pickupDate || undefined}
              className="w-full border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent outline-none transition-all"
              value={filters.returnDate}
              onChange={(e) =>
                setFilters({ ...filters, returnDate: e.target.value })
              }
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Vehicle Type */}
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Type de véhicule
          </label>
          <div className="relative">
            <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <select
              className="w-full border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm bg-white cursor-pointer focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent outline-none appearance-none transition-all"
              value={filters.vehicleType}
              onChange={(e) =>
                setFilters({ ...filters, vehicleType: e.target.value })
              }
              disabled={isLoading}
            >
              {VEHICLE_TYPES.map((type) => (
                <option key={type.code} value={type.code}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <Button
            type="submit"
            disabled={isLoading}
            size="lg"
            rounded="xl"
            className="w-full shadow-lg shadow-[var(--brand-primary)]/30 active:scale-[0.98]"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Recherche...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                Rechercher
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default CarSearchForm;
