"use client";

import { useState } from "react";
import {
  PlaneTakeoff,
  PlaneLanding,
  Calendar,
  ShieldCheck,
  Search,
  Briefcase,
} from "lucide-react";
import Link from "next/link";

const AIRLINES = [
  { name: "Peu importe", code: "" },
  { name: "Air Côte d'Ivoire", code: "HF" },
  { name: "Emirates", code: "EK" },
  { name: "Qatar Airways", code: "QR" },
  { name: "EgyptAir", code: "MS" },
  { name: "Royal Air Maroc", code: "AT" },
  { name: "Ethiopian Airlines", code: "ET" },
  { name: "Turkish Airlines", code: "TK" },
  { name: "Air Senegal", code: "HC" },
];

const CABINS = [
  { name: "Économique", code: "Y" },
  { name: "Économique Premium", code: "S" },
  { name: "Affaires", code: "C" },
  { name: "Première Classe", code: "F" },
];

const DEFAULT = {
  origin: "WAW",
  destination: "SPU",
  departureDate: "2026-09-11",
  returnDate: "2026-09-18",
  airline: "",
  cabin: "Y",
};

export function SearchCard() {
  const [formData, setFormData] = useState(DEFAULT);

  const handleChange = (field: keyof typeof DEFAULT, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex justify-start lg:justify-end pb-6 lg:pb-0">
      <div className="w-full max-w-lg bg-white/15 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl">
        <form className="space-y-3">
          {/* 1. Origin & Destination */}
          {/* <div className="grid grid-cols-2 gap-3"> */}
            <div className="bg-white rounded-xl px-4 py-3">
              <label className="text-gray-500 text-xs font-medium flex items-center gap-1.5 mb-1">
                <PlaneTakeoff className="w-3.5 h-3.5" />
                From
              </label>
              <input
                type="text"
                placeholder="e.g. WAW"
                value={formData.origin}
                onChange={(e) => handleChange("origin", e.target.value)}
                className="w-full bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none text-sm font-medium uppercase"
              />
            </div>

            <div className="bg-white rounded-xl px-4 py-3">
              <label className="text-gray-500 text-xs font-medium flex items-center gap-1.5 mb-1">
                <PlaneLanding className="w-3.5 h-3.5" />
                To
              </label>
              <input
                type="text"
                placeholder="e.g. SPU"
                value={formData.destination}
                onChange={(e) => handleChange("destination", e.target.value)}
                className="w-full bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none text-sm font-medium uppercase"
              />
            </div>
          {/* </div> */}
          {/* 2. Dates (DepartureDateTime) */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl px-4 py-3">
              <label className="text-gray-500 text-xs font-medium flex items-center gap-1.5 mb-1">
                <Calendar className="w-3.5 h-3.5" />
                Départ
              </label>
              <input
                type="date"
                value={formData.departureDate}
                onChange={(e) => handleChange("departureDate", e.target.value)}
                className="w-full bg-transparent text-gray-900 focus:outline-none text-sm font-medium"
              />
            </div>
            <div className="bg-white rounded-xl px-4 py-3">
              <label className="text-gray-500 text-xs font-medium flex items-center gap-1.5 mb-1">
                <Calendar className="w-3.5 h-3.5" />
                Retour
              </label>
              <input
                type="date"
                value={formData.returnDate}
                onChange={(e) => handleChange("returnDate", e.target.value)}
                className="w-full bg-transparent text-gray-900 focus:outline-none text-sm font-medium"
              />
            </div>
          </div>

          {/* 4. API Logic (MaxStops & IntelliSell Count) */}
          {/* <div className="grid grid-cols-2 gap-3">

   <div className="bg-white rounded-xl px-4 py-3">
     <label className="text-gray-500 text-xs font-medium flex items-center gap-1.5 mb-1">
       <ListOrdered className="w-3.5 h-3.5" />
       Results (Itins)
     </label>
     <select className="w-full bg-transparent text-gray-900 focus:outline-none text-sm font-medium appearance-none">
       <option value="50ITINS">50 Results</option>
       <option value="100ITINS">100 Results</option>
       <option value="200ITINS">200 Results</option>
     </select>
   </div>
 </div> */}
          {/* NEW: Airline Selection & Cabin */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl px-4 py-2">
              <label className="text-gray-500 text-xs font-medium flex items-center gap-1.5 mb-0.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Airline
              </label>
              <select
                className="w-full bg-transparent text-gray-900 focus:outline-none text-sm font-medium"
                value={formData.airline}
                onChange={(e) => handleChange("airline", e.target.value)}
              >
                {AIRLINES.map((al) => (
                  <option key={al.code} value={al.code}>
                    {al.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="bg-white rounded-xl px-4 py-2">
              <label className="text-gray-500 text-xs font-medium flex items-center gap-1.5 mb-0.5">
                <Briefcase className="w-3.5 h-3.5" /> Cabine
              </label>
              <select
                className="w-full bg-transparent text-gray-900 focus:outline-none text-sm font-medium"
                value={formData.cabin}
                onChange={(e) => handleChange("cabin", e.target.value)}
              >
                {CABINS.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* 3. Passengers (PassengerTypeQuantity) & Preferred Airline (VendorPref) */}
          {/* <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl px-4 py-2">
              <label className="text-gray-500 text-xs font-medium flex items-center gap-1.5 mb-0.5">
                <DollarSign className="w-3.5 h-3.5" /> Prix Max
              </label>
              <input
                type="number"
                placeholder="500"
                className="w-full bg-transparent text-gray-900 focus:outline-none text-sm font-semibold"
              />
            </div>
              <div className="bg-white rounded-xl px-4 py-3">
              <label className="text-gray-500 text-xs font-medium flex items-center gap-1.5 mb-1">
                <Users className="w-3.5 h-3.5" />
                Passagers (ADT)
              </label>
              <input
                type="number"
                min="1"
                defaultValue="1"
                className="w-full bg-transparent text-gray-900 focus:outline-none text-sm font-medium"
              />
            </div>
          </div> */}
            {/* <div className="bg-white rounded-xl px-4 py-3">
              <label className="text-gray-500 text-xs font-medium flex items-center gap-1.5 mb-1">
                <Ban className="w-3.5 h-3.5" />
                Max Stops
              </label>
              <select className="w-full bg-transparent text-gray-900 focus:outline-none text-xs font-medium">
                <option value="0">Non-stop</option>
                <option value="1">1 Stop</option>
                <option value="2">2+ Stops</option>
              </select>
            </div> */}

          {/* NEW: Max Fare & Flexible Dates */}
          {/* <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl px-4 py-2">
              <label className="text-gray-500 text-[10px] font-medium flex items-center gap-1.5 mb-0.5">
                <DollarSign className="w-3.5 h-3.5" /> Max Price
              </label>
              <input
                type="number"
                placeholder="500"
                className="w-full bg-transparent text-gray-900 focus:outline-none text-sm font-semibold"
              />
            </div>
            <div className="bg-white rounded-xl px-4 py-2">
              <label className="text-gray-500 text-[10px] font-medium flex items-center gap-1.5 mb-0.5">
                <MoveHorizontal className="w-3.5 h-3.5" /> Flexibility
              </label>
              <select className="w-full bg-transparent text-gray-900 focus:outline-none text-xs font-medium">
                <option value="0">Exact Dates</option>
                <option value="1">+/- 1 Day</option>
                <option value="3">+/- 3 Days</option>
              </select>
            </div>
          </div> */}

          {/* Submit Button */}
          <Link href="/vols">
          <button
            type="button"
            className="w-full text-sm sm:text-base flex items-center justify-center gap-2 bg-[var(--brand-primary)] hover:brightness-110 text-white font-semibold py-4 rounded-xl transition-all mt-4 shadow-lg shadow-black/10"
          >
            <Search className="w-5 h-5" />
            Rechercher
          </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
