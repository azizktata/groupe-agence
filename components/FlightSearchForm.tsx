"use client";

import { useState } from "react";
import {
  PlaneTakeoff,
  PlaneLanding,
  Calendar,
  Users,
  Briefcase,
  DollarSign,
  Search,
  ArrowLeftRight,
  Plane,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AIRLINES = [
  { name: "Toutes les compagnies", code: "" },
  { name: "Air Côte d'Ivoire", code: "HF" },
  { name: "Emirates", code: "EK" },
  { name: "Qatar Airways", code: "QR" },
  { name: "EgyptAir", code: "MS" },
  { name: "Royal Air Maroc", code: "AT" },
  { name: "Ethiopian Airlines", code: "ET" },
  { name: "Turkish Airlines", code: "TK" },
  { name: "Air Senegal", code: "HC" },
  { name: "LOT Polish Airlines", code: "LO" },
];

const CABINS = [
  { name: "Économique", code: "Y" },
  { name: "Éco Premium", code: "S" },
  { name: "Affaires", code: "C" },
  { name: "Première", code: "F" },
];

const STOPS = [
  { name: "Peu importe", code: "" },
  { name: "Vol direct", code: "0" },
  { name: "1 escale max", code: "1" },
  { name: "2 escales max", code: "2" },
];

export interface FlightSearchParams {
  from: string;
  to: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  cabin?: string;
  airline?: string;
  maxStops?: string;
}

interface FlightSearchFormProps {
  defaultValues?: {
    from?: string;
    to?: string;
    departureDate?: string;
    returnDate?: string;
    passengers?: number;
    cabin?: string;
    airline?: string;
    maxPrice?: number;
    maxStops?: string;
  };
  compact?: boolean;
  onSearch?: (params: FlightSearchParams) => void;
  isLoading?: boolean;
}

function SearchFormContent({
  form,
  setForm,
  tripType,
  setTripType,
  onSubmit,
  isLoading,
}: {
  form: {
    from: string;
    to: string;
    departureDate: string;
    returnDate: string;
    passengers: number;
    cabin: string;
    airline: string;
    maxStops: string;
  };
  setForm: React.Dispatch<React.SetStateAction<typeof form>>;
  tripType: "roundtrip" | "oneway";
  setTripType: (type: "roundtrip" | "oneway") => void;
  onSubmit: () => void;
  isLoading?: boolean;
}) {
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {/* Trip Type Toggle */}
      <div className="flex gap-2 mb-2">
        <button
          type="button"
          onClick={() => setTripType("roundtrip")}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
            tripType === "roundtrip"
              ? "bg-[var(--brand-primary)] text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Aller-retour
        </button>
        <button
          type="button"
          onClick={() => setTripType("oneway")}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
            tripType === "oneway"
              ? "bg-[var(--brand-primary)] text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Aller simple
        </button>
      </div>

      {/* Row 1: Origin & Destination */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 focus-within:border-[var(--brand-primary)] focus-within:ring-2 focus-within:ring-[var(--brand-primary)]/10 transition-all">
          <label className="text-slate-500 text-xs font-medium flex items-center gap-1.5 mb-1">
            <PlaneTakeoff className="w-3.5 h-3.5" />
            Départ
          </label>
          <input
            type="text"
            value={form.from}
            onChange={(e) => setForm((f) => ({ ...f, from: e.target.value.toUpperCase() }))}
            placeholder="ex: ABJ"
            className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none text-sm font-semibold uppercase"
          />
        </div>

        <div className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 focus-within:border-[var(--brand-primary)] focus-within:ring-2 focus-within:ring-[var(--brand-primary)]/10 transition-all">
          <label className="text-slate-500 text-xs font-medium flex items-center gap-1.5 mb-1">
            <PlaneLanding className="w-3.5 h-3.5" />
            Destination
          </label>
          <input
            type="text"
            value={form.to}
            onChange={(e) => setForm((f) => ({ ...f, to: e.target.value.toUpperCase() }))}
            placeholder="ex: CDG"
            className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none text-sm font-semibold uppercase"
          />
        </div>
      </div>

      {/* Row 2: Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 focus-within:border-[var(--brand-primary)] focus-within:ring-2 focus-within:ring-[var(--brand-primary)]/10 transition-all">
          <label className="text-slate-500 text-xs font-medium flex items-center gap-1.5 mb-1">
            <Calendar className="w-3.5 h-3.5" />
            Date de départ
          </label>
          <input
            type="date"
            value={form.departureDate}
            onChange={(e) => setForm((f) => ({ ...f, departureDate: e.target.value }))}
            className="w-full bg-transparent text-slate-900 focus:outline-none text-sm font-semibold"
          />
        </div>
        {tripType === "roundtrip" && (
          <div className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 focus-within:border-[var(--brand-primary)] focus-within:ring-2 focus-within:ring-[var(--brand-primary)]/10 transition-all">
            <label className="text-slate-500 text-xs font-medium flex items-center gap-1.5 mb-1">
              <Calendar className="w-3.5 h-3.5" />
              Date de retour
            </label>
            <input
              type="date"
              value={form.returnDate}
              onChange={(e) => setForm((f) => ({ ...f, returnDate: e.target.value }))}
              className="w-full bg-transparent text-slate-900 focus:outline-none text-sm font-semibold"
            />
          </div>
        )}
      </div>

      {/* Row 3: Passengers, Cabin, Airline */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <div className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 focus-within:border-[var(--brand-primary)] focus-within:ring-2 focus-within:ring-[var(--brand-primary)]/10 transition-all">
          <label className="text-slate-500 text-xs font-medium flex items-center gap-1.5 mb-1">
            <Users className="w-3.5 h-3.5" />
            Passagers
          </label>
          <input
            type="number"
            min="1"
            max="9"
            value={form.passengers}
            onChange={(e) => setForm((f) => ({ ...f, passengers: parseInt(e.target.value) || 1 }))}
            className="w-full bg-transparent text-slate-900 focus:outline-none text-sm font-semibold"
          />
        </div>

        <div className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 focus-within:border-[var(--brand-primary)] focus-within:ring-2 focus-within:ring-[var(--brand-primary)]/10 transition-all">
          <label className="text-slate-500 text-xs font-medium flex items-center gap-1.5 mb-1">
            <Briefcase className="w-3.5 h-3.5" />
            Cabine
          </label>
          <select
            value={form.cabin}
            onChange={(e) => setForm((f) => ({ ...f, cabin: e.target.value }))}
            className="w-full bg-transparent text-slate-900 focus:outline-none text-sm font-semibold appearance-none cursor-pointer"
          >
            {CABINS.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 focus-within:border-[var(--brand-primary)] focus-within:ring-2 focus-within:ring-[var(--brand-primary)]/10 transition-all col-span-2 md:col-span-1">
          <label className="text-slate-500 text-xs font-medium flex items-center gap-1.5 mb-1">
            <Plane className="w-3.5 h-3.5" />
            Compagnie
          </label>
          <select
            value={form.airline}
            onChange={(e) => setForm((f) => ({ ...f, airline: e.target.value }))}
            className="w-full bg-transparent text-slate-900 focus:outline-none text-sm font-semibold appearance-none cursor-pointer"
          >
            {AIRLINES.map((al) => (
              <option key={al.code} value={al.code}>
                {al.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 4: Stops & Max Price */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 focus-within:border-[var(--brand-primary)] focus-within:ring-2 focus-within:ring-[var(--brand-primary)]/10 transition-all">
          <label className="text-slate-500 text-xs font-medium flex items-center gap-1.5 mb-1">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            Escales
          </label>
          <select
            value={form.maxStops}
            onChange={(e) => setForm((f) => ({ ...f, maxStops: e.target.value }))}
            className="w-full bg-transparent text-slate-900 focus:outline-none text-sm font-semibold appearance-none cursor-pointer"
          >
            {STOPS.map((s) => (
              <option key={s.code} value={s.code}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 focus-within:border-[var(--brand-primary)] focus-within:ring-2 focus-within:ring-[var(--brand-primary)]/10 transition-all">
          <label className="text-slate-500 text-xs font-medium flex items-center gap-1.5 mb-1">
            <DollarSign className="w-3.5 h-3.5" />
            Prix max
          </label>
          <input
            type="number"
            placeholder="Sans limite"
            className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none text-sm font-semibold"
          />
        </div>
      </div>

      {/* Search Button */}
      <Button
        type="submit"
        size="lg"
        rounded="xl"
        disabled={isLoading}
        className="w-full mt-2 shadow-lg shadow-[var(--brand-primary)]/20"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Recherche en cours...
          </>
        ) : (
          <>
            <Search className="w-5 h-5" />
            Rechercher des vols
          </>
        )}
      </Button>
    </form>
  );
}

export function FlightSearchForm({
  defaultValues = {
    from: "WAW",
    to: "SPU",
    departureDate: "2026-09-11",
    returnDate: "2026-09-18",
    passengers: 1,
    cabin: "Y",
    airline: "",
    maxStops: "",
  },
  compact = false,
  onSearch,
  isLoading,
}: FlightSearchFormProps) {
  const [tripType, setTripType] = useState<"roundtrip" | "oneway">(
    defaultValues.returnDate ? "roundtrip" : "oneway"
  );

  const [form, setForm] = useState({
    from: defaultValues.from || "",
    to: defaultValues.to || "",
    departureDate: defaultValues.departureDate || "",
    returnDate: defaultValues.returnDate || "",
    passengers: defaultValues.passengers || 1,
    cabin: defaultValues.cabin || "Y",
    airline: defaultValues.airline || "",
    maxStops: defaultValues.maxStops || "",
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = () => {
    if (!onSearch) return;
    onSearch({
      from: form.from,
      to: form.to,
      departureDate: form.departureDate,
      returnDate: tripType === "roundtrip" ? form.returnDate : undefined,
      passengers: form.passengers,
      cabin: form.cabin || undefined,
      airline: form.airline || undefined,
      maxStops: form.maxStops || undefined,
    });
    setDialogOpen(false);
  };

  // Format date for display in French
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
  };

  if (compact) {
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Compact summary */}
          <div className="flex items-center gap-3 flex-1 min-w-[200px]">
            <div className="w-10 h-10 rounded-xl bg-[var(--brand-primary)]/10 flex items-center justify-center">
              <Plane className="w-5 h-5 text-[var(--brand-primary)]" />
            </div>
            <div>
              <p className="font-bold text-slate-900">
                {form.from}{" "}
                <ArrowLeftRight className="w-3 h-3 inline mx-1 text-slate-400" />{" "}
                {form.to}
              </p>
              <p className="text-xs text-slate-500">
                {formatDate(form.departureDate)}
                {form.returnDate
                  ? ` - ${formatDate(form.returnDate)}`
                  : " (Aller simple)"}
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-sm text-slate-600">
            <Users className="w-4 h-4" />
            <span>{form.passengers} Pax</span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-sm text-slate-600">
            <Briefcase className="w-4 h-4" />
            <span>
              {CABINS.find((c) => c.code === form.cabin)?.name ||
                "Économique"}
            </span>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="primary"
                size="default"
                rounded="full"
                className="ml-auto"
              >
                <Search className="w-12 h-12" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <Search className="w-5 h-5 text-[var(--brand-primary)]" />
                  Faire une nouvelle recherche
                </DialogTitle>
              </DialogHeader>
              <SearchFormContent
                form={form}
                setForm={setForm}
                tripType={tripType}
                setTripType={setTripType}
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }

  // Non-compact (full form) mode
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6 md:p-8">
      <SearchFormContent
        form={form}
        setForm={setForm}
        tripType={tripType}
        setTripType={setTripType}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
