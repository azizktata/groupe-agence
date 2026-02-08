"use client";

import React, { useState } from "react";
import { Loader2, Search, MapPin, Calendar, Users, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

export type HotelAvailSearchFilters = {
  destination: string;
  startDate: string;
  endDate: string;
  rooms: { adults: number; children: number; childAges: string }[];
};

type HotelAvailSearchFormProps = {
  onSearch?: (filters: HotelAvailSearchFilters) => void;
  isLoading?: boolean;
  compact?: boolean;
  defaultValues?: Partial<HotelAvailSearchFilters>;
};

// Common airport / city codes
const DESTINATION_OPTIONS = [
  { code: "CDG", label: "Paris (CDG)" },
  { code: "NCE", label: "Nice (NCE)" },
  { code: "MRS", label: "Marseille (MRS)" },
  { code: "LYS", label: "Lyon (LYS)" },
  { code: "ABJ", label: "Abidjan (ABJ)" },
  { code: "CMN", label: "Casablanca (CMN)" },
  { code: "DXB", label: "Dubaï (DXB)" },
  { code: "JFK", label: "New York (JFK)" },
  { code: "LAX", label: "Los Angeles (LAX)" },
  { code: "LHR", label: "Londres (LHR)" },
  { code: "CAI", label: "Le Caire (CAI)" },
  { code: "IST", label: "Istanbul (IST)" },
];

function getTomorrowDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

function getDefaultEndDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 3);
  return d.toISOString().split("T")[0];
}

const HotelAvailSearchForm = ({
  onSearch,
  isLoading = false,
  compact = false,
  defaultValues,
}: HotelAvailSearchFormProps) => {
  const [filters, setFilters] = useState<HotelAvailSearchFilters>({
    destination: defaultValues?.destination || "CDG",
    startDate: defaultValues?.startDate || getTomorrowDate(),
    endDate: defaultValues?.endDate || getDefaultEndDate(),
    rooms: defaultValues?.rooms || [{ adults: 2, children: 0, childAges: "" }],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(filters);
  };

  const addRoom = () => {
    if (filters.rooms.length >= 4) return;
    setFilters((prev) => ({
      ...prev,
      rooms: [...prev.rooms, { adults: 2, children: 0, childAges: "" }],
    }));
  };

  const removeRoom = (index: number) => {
    if (filters.rooms.length <= 1) return;
    setFilters((prev) => ({
      ...prev,
      rooms: prev.rooms.filter((_, i) => i !== index),
    }));
  };

  const updateRoom = (index: number, field: string, value: number | string) => {
    setFilters((prev) => ({
      ...prev,
      rooms: prev.rooms.map((room, i) =>
        i === index ? { ...room, [field]: value } : room
      ),
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/20"
    >
      <div className={`grid gap-4 ${compact ? "md:grid-cols-4" : "md:grid-cols-2 lg:grid-cols-4"}`}>
        {/* Destination */}
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Destination
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <select
              className="w-full border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm bg-white cursor-pointer focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent outline-none appearance-none transition-all"
              value={filters.destination}
              onChange={(e) => setFilters({ ...filters, destination: e.target.value })}
              disabled={isLoading}
            >
              {DESTINATION_OPTIONS.map((dest) => (
                <option key={dest.code} value={dest.code}>
                  {dest.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Check-in Date */}
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Arrivée
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="date"
              className="w-full border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent outline-none transition-all"
              value={filters.startDate}
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
              min={getTomorrowDate()}
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Check-out Date */}
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Départ
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="date"
              className="w-full border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent outline-none transition-all"
              value={filters.endDate}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
              min={filters.startDate || getTomorrowDate()}
              disabled={isLoading}
            />
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

      {/* Rooms section */}
      <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Chambres & voyageurs
          </label>
          <button
            type="button"
            onClick={addRoom}
            disabled={isLoading || filters.rooms.length >= 4}
            className="flex items-center gap-1 text-xs font-semibold text-[var(--brand-primary)] hover:underline disabled:opacity-40 disabled:no-underline"
          >
            <Plus className="w-3.5 h-3.5" />
            Ajouter une chambre
          </button>
        </div>

        {filters.rooms.map((room, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-slate-50 rounded-xl p-3"
          >
            <span className="text-xs font-bold text-slate-400 uppercase w-20 flex-shrink-0">
              Chambre {index + 1}
            </span>

            {/* Adults */}
            <div className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs text-slate-500">Adultes</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => updateRoom(index, "adults", Math.max(1, room.adults - 1))}
                  disabled={isLoading || room.adults <= 1}
                  className="w-6 h-6 flex items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] disabled:opacity-30 transition-all text-xs"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-sm font-semibold text-slate-700 w-6 text-center">
                  {room.adults}
                </span>
                <button
                  type="button"
                  onClick={() => updateRoom(index, "adults", Math.min(6, room.adults + 1))}
                  disabled={isLoading || room.adults >= 6}
                  className="w-6 h-6 flex items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] disabled:opacity-30 transition-all text-xs"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Children */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Enfants</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => updateRoom(index, "children", Math.max(0, room.children - 1))}
                  disabled={isLoading || room.children <= 0}
                  className="w-6 h-6 flex items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] disabled:opacity-30 transition-all text-xs"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-sm font-semibold text-slate-700 w-6 text-center">
                  {room.children}
                </span>
                <button
                  type="button"
                  onClick={() => updateRoom(index, "children", Math.min(4, room.children + 1))}
                  disabled={isLoading || room.children >= 4}
                  className="w-6 h-6 flex items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] disabled:opacity-30 transition-all text-xs"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Child ages (if children > 0) */}
            {room.children > 0 && (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Âges (ex: 5,8)"
                  className="border border-slate-200 rounded-lg py-1.5 px-3 text-xs w-28 focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent outline-none"
                  value={room.childAges}
                  onChange={(e) => updateRoom(index, "childAges", e.target.value)}
                  disabled={isLoading}
                />
              </div>
            )}

            {/* Remove room button */}
            {filters.rooms.length > 1 && (
              <button
                type="button"
                onClick={() => removeRoom(index)}
                disabled={isLoading}
                className="ml-auto text-xs text-red-400 hover:text-red-600 font-medium transition-colors"
              >
                Supprimer
              </button>
            )}
          </div>
        ))}
      </div>
    </form>
  );
};

export default HotelAvailSearchForm;
