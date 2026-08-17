"use client";

import React, { useState } from "react";
import { Loader2, Search, Building2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export type HotelSearchFilters = {
  hotelName: string;
  chainCode: string;
  minRating: string;
  amenityCodes: number[];
};

type HotelSearchFormProps = {
  onSearch?: (filters: HotelSearchFilters) => void;
  isLoading?: boolean;
  compact?: boolean;
  defaultValues?: Partial<HotelSearchFilters>;
};

const HotelSearchForm = ({
  onSearch,
  isLoading = false,
  compact = false,
  defaultValues,
}: HotelSearchFormProps) => {
  const t = useTranslations("hotelSearch");
  const tc = useTranslations("common");
  const [filters, setFilters] = useState<HotelSearchFilters>({
    hotelName: defaultValues?.hotelName || "",
    chainCode: defaultValues?.chainCode || "",
    minRating: defaultValues?.minRating || "3.0",
    amenityCodes: defaultValues?.amenityCodes || [],
  });

  const chainOptions = [
    { code: "HY", name: "Hyatt" },
    { code: "HL", name: "Hilton" },
    { code: "RT", name: "Rotana" },
    { code: "AA", name: "Accor" },
    { code: "MS", name: "Mövenpick" },
  ];

  const amenityOptions = [
    { code: 179, name: t("wifi") },
    { code: 71, name: t("pool") },
    { code: 42, name: t("freeParking") },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(filters);
  };

  const toggleAmenity = (code: number) => {
    setFilters((prev) => ({
      ...prev,
      amenityCodes: prev.amenityCodes.includes(code)
        ? prev.amenityCodes.filter((c) => c !== code)
        : [...prev.amenityCodes, code],
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/20"
    >
      <div className={`grid gap-4 ${compact ? "md:grid-cols-4" : "md:grid-cols-2 lg:grid-cols-4"}`}>
        {/* Property Name Input */}
        <div className="relative">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            {t("propertyName")}
          </label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={t("propertyNamePlaceholder")}
              className="w-full border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent outline-none transition-all"
              value={filters.hotelName}
              onChange={(e) => setFilters({ ...filters, hotelName: e.target.value })}
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Chain Selection */}
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            {t("chain")}
          </label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <select
              className="w-full border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm bg-white cursor-pointer focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent outline-none appearance-none transition-all"
              value={filters.chainCode}
              onChange={(e) => setFilters({ ...filters, chainCode: e.target.value })}
              disabled={isLoading}
            >
              <option value="">{t("allChains")}</option>
              {chainOptions.map((chain) => (
                <option key={chain.code} value={chain.code}>
                  {chain.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Rating Selection */}
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            {t("minRating")}
          </label>
          <div className="relative">
            <Star className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <select
              className="w-full border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm bg-white cursor-pointer focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent outline-none appearance-none transition-all"
              value={filters.minRating}
              onChange={(e) => setFilters({ ...filters, minRating: e.target.value })}
              disabled={isLoading}
            >
              <option value="3.0">{t("rating3")}</option>
              <option value="4.0">{t("rating4")}</option>
              <option value="4.5">{t("rating45")}</option>
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

      {/* Amenities - Optional filters */}
      {!compact && (
        <div className="mt-4 pt-4 border-t border-slate-100">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">
            {t("amenities")}
          </label>
          <div className="flex gap-2 flex-wrap">
            {amenityOptions.map((amenity) => (
              <button
                key={amenity.code}
                type="button"
                onClick={() => toggleAmenity(amenity.code)}
                disabled={isLoading}
                className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all ${
                  filters.amenityCodes.includes(amenity.code)
                    ? "bg-[var(--brand-primary)] text-white border-[var(--brand-primary)]"
                    : "bg-white text-slate-600 border-slate-200 hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
                }`}
              >
                {amenity.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </form>
  );
};

export default HotelSearchForm;
