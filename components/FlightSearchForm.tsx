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
  Edit3,
  SearchIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslations, useFormatter } from "next-intl";

// Airline names are proper nouns and stay in code; only the "any" option and
// the cabin/stop labels are translated.
const AIRLINE_NAMES: Array<{ name: string; code: string }> = [
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

const CABIN_CODES = ["Y", "S", "C", "F"];
const STOP_OPTIONS = [
  { code: "", key: "any" },
  { code: "0", key: "nonstop" },
  { code: "1", key: "one" },
  { code: "2", key: "twoPlus" },
];

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
}

function SearchFormContent({
  defaultValues,
  tripType,
  setTripType,
}: {
  defaultValues: FlightSearchFormProps["defaultValues"];
  tripType: "roundtrip" | "oneway";
  setTripType: (type: "roundtrip" | "oneway") => void;
}) {
  const t = useTranslations("flightSearch");
  const tc = useTranslations("common");
  const tcab = useTranslations("cabins");
  const tstop = useTranslations("stops");
  const AIRLINES = [{ name: t("anyAirline"), code: "" }, ...AIRLINE_NAMES];
  const CABINS = CABIN_CODES.map((code) => ({ name: tcab(code), code }));
  const STOPS = STOP_OPTIONS.map((s) => ({ name: tstop(s.key), code: s.code }));

  return (
    <form className="space-y-4">
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
          {t("roundTrip")}
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
          {t("oneWay")}
        </button>
      </div>

      {/* Row 1: Origin & Destination */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 focus-within:border-[var(--brand-primary)] focus-within:ring-2 focus-within:ring-[var(--brand-primary)]/10 transition-all">
          <label className="text-slate-500 text-xs font-medium flex items-center gap-1.5 mb-1">
            <PlaneTakeoff className="w-3.5 h-3.5" />
            {tc("departure")}
          </label>
          <input
            type="text"
            defaultValue={defaultValues?.from}
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
            defaultValue={defaultValues?.to}
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
            defaultValue={defaultValues?.departureDate}
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
              defaultValue={defaultValues?.returnDate}
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
            {t("passengers")}
          </label>
          <input
            type="number"
            min="1"
            max="9"
            defaultValue={defaultValues?.passengers}
            className="w-full bg-transparent text-slate-900 focus:outline-none text-sm font-semibold"
          />
        </div>

        <div className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 focus-within:border-[var(--brand-primary)] focus-within:ring-2 focus-within:ring-[var(--brand-primary)]/10 transition-all">
          <label className="text-slate-500 text-xs font-medium flex items-center gap-1.5 mb-1">
            <Briefcase className="w-3.5 h-3.5" />
            {tc("cabin")}
          </label>
          <select
            defaultValue={defaultValues?.cabin}
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
            {t("airline")}
          </label>
          <select
            defaultValue={defaultValues?.airline}
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
            {t("stops")}
          </label>
          <select
            defaultValue={defaultValues?.maxStops}
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
            defaultValue={defaultValues?.maxPrice}
            className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none text-sm font-semibold"
          />
        </div>
      </div>

      {/* Search Button */}
      <Button
        type="submit"
        size="lg"
        rounded="xl"
        className="w-full mt-2 shadow-lg shadow-[var(--brand-primary)]/20"
      >
        <Search className="w-5 h-5" />
        {t("submit")}
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
}: FlightSearchFormProps) {
  const t = useTranslations("flightSearch");
  const tcab = useTranslations("cabins");
  const format = useFormatter();
  const [tripType, setTripType] = useState<"roundtrip" | "oneway">(
    defaultValues.returnDate ? "roundtrip" : "oneway"
  );

  // Formatted with next-intl so the date follows the active locale.
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    return format.dateTime(new Date(dateStr), {
      day: "numeric",
      month: "short",
    });
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
                {defaultValues.from}{" "}
                <ArrowLeftRight className="w-3 h-3 inline mx-1 text-slate-400" />{" "}
                {defaultValues.to}
              </p>
              <p className="text-xs text-slate-500">
                {formatDate(defaultValues.departureDate)}
                {defaultValues.returnDate
                  ? ` - ${formatDate(defaultValues.returnDate)}`
                  : ` (${t("oneWay")})`}
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-sm text-slate-600">
            <Users className="w-4 h-4" />
            <span>{defaultValues.passengers} Pax</span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-sm text-slate-600">
            <Briefcase className="w-4 h-4" />
            <span>
              {defaultValues.cabin ? tcab(defaultValues.cabin) : tcab("Y")}
            </span>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="primary"
                size="default"
                rounded="full"
                className="ml-auto"
              >
                <Search className="w-12 h-12" />
                {/* Modifier */}
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
                defaultValues={defaultValues}
                tripType={tripType}
                setTripType={setTripType}
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
        defaultValues={defaultValues}
        tripType={tripType}
        setTripType={setTripType}
      />
    </div>
  );
}
