"use client";

import React, { useState } from "react";
import { Loader2, Search, Building2, Star, Shield, Home, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export type HotelSearchFilters = {
  hotelName: string;
  chainCode: string;
  minRating: string;
  amenityCodes: number[];
  securityFeatureCodes: number[];
  propertyTypeCodes: number[];
  propertyQualityCodes: number[];
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
  const [filters, setFilters] = useState<HotelSearchFilters>({
    hotelName: defaultValues?.hotelName || "",
    chainCode: defaultValues?.chainCode || "",
    minRating: defaultValues?.minRating || "3.0",
    amenityCodes: defaultValues?.amenityCodes || [],
    securityFeatureCodes: defaultValues?.securityFeatureCodes || [],
    propertyTypeCodes: defaultValues?.propertyTypeCodes || [],
    propertyQualityCodes: defaultValues?.propertyQualityCodes || [],
  });

  const chainOptions = [
    { code: "HY", name: "Hyatt" },
    { code: "HL", name: "Hilton" },
    { code: "SI", name: "Sheraton" },
    { code: "MA", name: "Marriott" },
    { code: "MC", name: "Marriott (MC)" },
    { code: "RA", name: "Radisson" },
    { code: "AA", name: "Accor" },
    { code: "FS", name: "Four Seasons" },
    { code: "RZ", name: "Ritz-Carlton" },
    { code: "JU", name: "Jumeirah" },
    { code: "RT", name: "Rotana" },
    { code: "MS", name: "Mövenpick" },
    { code: "W", name: "W Hotels" },
  ];

  const amenityOptions = [
    { code: 179, name: "WiFi" },
    { code: 71, name: "Piscine" },
    { code: 42, name: "Parking gratuit" },
    { code: 227, name: "Petit-déjeuner" },
    { code: 48, name: "Salle de sport" },
    { code: 282, name: "Navette aéroport" },
  ];

  const securityFeatureOptions = [
    { code: 9, name: "Normes incendie" },
    { code: 39, name: "Accès restreint" },
    { code: 15, name: "ART" },
  ];

  const propertyTypeOptions = [
    { code: 15, name: "Hôtel" },
    { code: 16, name: "Resort" },
  ];

  const propertyQualityOptions = [
    { code: 4, name: "Luxe / Deluxe" },
    { code: 5, name: "Première classe" },
    { code: 6, name: "Économique" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(filters);
  };

  const toggleCode = (field: keyof Pick<HotelSearchFilters, "amenityCodes" | "securityFeatureCodes" | "propertyTypeCodes" | "propertyQualityCodes">, code: number) => {
    setFilters((prev) => ({
      ...prev,
      [field]: prev[field].includes(code)
        ? prev[field].filter((c) => c !== code)
        : [...prev[field], code],
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
            Nom de l&apos;établissement
          </label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="ex: Resort, Spa, Marriott..."
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
            Chaîne hôtelière
          </label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <select
              className="w-full border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm bg-white cursor-pointer focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent outline-none appearance-none transition-all"
              value={filters.chainCode}
              onChange={(e) => setFilters({ ...filters, chainCode: e.target.value })}
              disabled={isLoading}
            >
              <option value="">Toutes les chaînes</option>
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
            Classement minimum
          </label>
          <div className="relative">
            <Star className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <select
              className="w-full border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm bg-white cursor-pointer focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent outline-none appearance-none transition-all"
              value={filters.minRating}
              onChange={(e) => setFilters({ ...filters, minRating: e.target.value })}
              disabled={isLoading}
            >
              <option value="3.0">3 étoiles et +</option>
              <option value="4.0">4 étoiles et +</option>
              <option value="4.5">4.5 étoiles et +</option>
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

      {/* Extended filters */}
      <div className="mt-4 pt-4 border-t border-slate-100 space-y-4">
        {/* Amenities */}
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">
            Équipements souhaités
          </label>
          <div className="flex gap-2 flex-wrap">
            {amenityOptions.map((amenity) => (
              <button
                key={amenity.code}
                type="button"
                onClick={() => toggleCode("amenityCodes", amenity.code)}
                disabled={isLoading}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all ${
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

        <div className={`grid gap-4 ${compact ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-3"}`}>
          {/* Property Quality */}
          <div>
            <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">
              <Award className="w-3 h-3" />
              Catégorie
            </label>
            <div className="flex gap-2 flex-wrap">
              {propertyQualityOptions.map((pq) => (
                <button
                  key={pq.code}
                  type="button"
                  onClick={() => toggleCode("propertyQualityCodes", pq.code)}
                  disabled={isLoading}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all ${
                    filters.propertyQualityCodes.includes(pq.code)
                      ? "bg-[var(--brand-primary)] text-white border-[var(--brand-primary)]"
                      : "bg-white text-slate-600 border-slate-200 hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
                  }`}
                >
                  {pq.name}
                </button>
              ))}
            </div>
          </div>

          {/* Property Type */}
          <div>
            <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">
              <Home className="w-3 h-3" />
              Type d&apos;établissement
            </label>
            <div className="flex gap-2 flex-wrap">
              {propertyTypeOptions.map((pt) => (
                <button
                  key={pt.code}
                  type="button"
                  onClick={() => toggleCode("propertyTypeCodes", pt.code)}
                  disabled={isLoading}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all ${
                    filters.propertyTypeCodes.includes(pt.code)
                      ? "bg-[var(--brand-primary)] text-white border-[var(--brand-primary)]"
                      : "bg-white text-slate-600 border-slate-200 hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
                  }`}
                >
                  {pt.name}
                </button>
              ))}
            </div>
          </div>

          {/* Security Features */}
          <div>
            <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">
              <Shield className="w-3 h-3" />
              Sécurité
            </label>
            <div className="flex gap-2 flex-wrap">
              {securityFeatureOptions.map((sf) => (
                <button
                  key={sf.code}
                  type="button"
                  onClick={() => toggleCode("securityFeatureCodes", sf.code)}
                  disabled={isLoading}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all ${
                    filters.securityFeatureCodes.includes(sf.code)
                      ? "bg-[var(--brand-primary)] text-white border-[var(--brand-primary)]"
                      : "bg-white text-slate-600 border-slate-200 hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
                  }`}
                >
                  {sf.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default HotelSearchForm;
