"use client";

import {
  PlaneTakeoff,
  PlaneLanding,
  Calendar,
  ShieldCheck,
  Search,
  Briefcase,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
export function Hero() {
  const t = useTranslations("hero");
  const tc = useTranslations("common");
  const tf = useTranslations("flightSearch");
  const tcab = useTranslations("cabins");
  const AIRLINES = [
    { name: tf("anyAirline"), code: "" },
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
    { name: tcab("Y"), code: "Y" },
    { name: tcab("S"), code: "S" },
    { name: tcab("C"), code: "C" },
    { name: tcab("F"), code: "F" },
  ];
  return (
    <section className="relative min-h-screen flex items-center pt-20 bg-[var(--brand-dark)]">
      {/* Background image - rendered via next/image so it is preloaded and
          served as WebP/AVIF. The solid section background above paints
          immediately, preventing a white flash before the image arrives. */}
      <Image
        src="/airplane-background.png"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[var(--brand-dark)]/30" />

      <div className="max-w-7xl mx-auto 2xl:max-w-8xl px-6 2xl:px-10 relative z-10 mt-12 sm:mt-0 pb-12 sm:pb-0">
        <div className="grid lg:grid-cols-2 gap-12 items-start lg:items-center">
          {/* Left Side - Content */}
          <div className="text-white">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight tracking-wide mb-6">
              {t("title")}{" "}
              <span className="text-[var(--brand-accent)]">
                {t("titleAccent")}
              </span>
            </h1>
            <p className="text-md sm:text-lg text-white/90 mb-8 max-w-xl">
              {t("subtitle")}
            </p>

            {/* Proof Text */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/90">
              <span className=" hidden sm:flex items-center gap-2 uppercase font-medium">
                {t("proofSearch")}
              </span>
              <span className="text-xs sm:text-sm flex items-center gap-2 uppercase font-medium">
                <span className="hidden sm:flex w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)] animate-pulse" />
                {t("proofFlights")}
              </span>
              <span className="text-xs sm:text-sm flex items-center gap-2 uppercase font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)] animate-pulse" />
                {t("proofHotels")}
              </span>
              <span className="text-xs sm:text-sm flex items-center gap-2 uppercase font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)] animate-pulse" />
                {t("proofCountries")}
              </span>
            </div>
          </div>

          {/* Right Side - Search Card */}
          <div className="flex justify-start lg:justify-end pb-6 lg:pb-0">
            <div className="w-full max-w-lg bg-white/15 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl">
              <form className="space-y-3">
                {/* 1. Origin & Destination */}
                {/* <div className="grid grid-cols-2 gap-3"> */}
                  <div className="bg-white rounded-xl px-4 py-3">
                    <label className="text-gray-500 text-xs font-medium flex items-center gap-1.5 mb-1">
                      <PlaneTakeoff className="w-3.5 h-3.5" />
                      {tc("from")}
                    </label>
                    <input
                      type="text"
                      placeholder={t("placeholderFrom")}
                      className="w-full bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none text-sm font-medium uppercase"
                    />
                  </div>

                  <div className="bg-white rounded-xl px-4 py-3">
                    <label className="text-gray-500 text-xs font-medium flex items-center gap-1.5 mb-1">
                      <PlaneLanding className="w-3.5 h-3.5" />
                      {tc("to")}
                    </label>
                    <input
                      type="text"
                      placeholder={t("placeholderTo")}
                      className="w-full bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none text-sm font-medium uppercase"
                    />
                  </div>
                {/* </div> */}
                {/* 2. Dates (DepartureDateTime) */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-xl px-4 py-3">
                    <label className="text-gray-500 text-xs font-medium flex items-center gap-1.5 mb-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {tc("departure")}
                    </label>
                    <input
                      type="date"
                      className="w-full bg-transparent text-gray-900 focus:outline-none text-sm font-medium"
                    />
                  </div>
                  <div className="bg-white rounded-xl px-4 py-3">
                    <label className="text-gray-500 text-xs font-medium flex items-center gap-1.5 mb-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {tc("return")}
                    </label>
                    <input
                      type="date"
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
                      <ShieldCheck className="w-3.5 h-3.5" /> {tc("airline")}
                    </label>
                    <select className="w-full bg-transparent text-gray-900 focus:outline-none text-sm font-medium">
                      {AIRLINES.map((al) => (
                        <option key={al.code} value={al.code}>
                          {al.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="bg-white rounded-xl px-4 py-2">
                    <label className="text-gray-500 text-xs font-medium flex items-center gap-1.5 mb-0.5">
                      <Briefcase className="w-3.5 h-3.5" /> {tc("cabin")}
                    </label>
                    <select className="w-full bg-transparent text-gray-900 focus:outline-none text-sm font-medium">
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
                  {tc("search")}
                </button>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
