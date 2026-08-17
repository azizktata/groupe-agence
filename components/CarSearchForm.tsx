"use client";

import React, { useState } from "react";
import { Loader2, Search, MapPin, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

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

// Codes stay in code; labels come from the `vehicleTypes` catalog.
const VEHICLE_TYPE_CODES = ["", "ECONOMY", "SEDAN", "SUV", "MINIBUS", "LUXURY"];

export function CarSearchForm({
  onSearch,
  isLoading = false,
  compact = false,
  defaultValues,
}: CarSearchFormProps) {
  const t = useTranslations("carSearch");
  const tc = useTranslations("common");
  const tType = useTranslations("vehicleTypes");
  const VEHICLE_TYPES = VEHICLE_TYPE_CODES.map((code) => ({
    code,
    name: tType(code === "" ? "ANY" : code),
  }));
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
            {t("pickupLocation")}
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={t("pickupLocationPlaceholder")}
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
            {t("pickupDate")}
          </label>
          <div className="relative">
            <input
              type="date"
              className="w-full border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent outline-none transition-all"
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
            {t("returnDate")}
          </label>
          <div className="relative">
            <input
              type="date"
              min={filters.pickupDate || undefined}
              className="w-full border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent outline-none transition-all"
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
            {t("vehicleType")}
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
                {tc("loading")}
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                {tc("search")}
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default CarSearchForm;
