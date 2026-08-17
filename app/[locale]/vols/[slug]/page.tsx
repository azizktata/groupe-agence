import React from "react";
import {
  ShieldCheck,
  Info,
  Luggage,
  RotateCcw,
  AlertTriangle,
  ArrowRight,
  Plane,
  Receipt,
  Home,
  ChevronRight,
  Calendar,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { getTranslations, getFormatter, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { mapSabreRevalidateToUi } from "@/mappers/mapSabreRevalidateToUi";
import { MOCK_SABRE_REVALIDATE_RESPONSE } from "@/mocks/air/sabre-revalidate-original.mock";
import { MOCK_SABRE_REVALIDATE_V2_RESPONSE } from "@/mocks/air/sabre-revalidate-v2.mock";

// Mock selector based on flight ID
function getMockRevalidateResponse(flightId: string) {
  if (flightId === "1") {
    return MOCK_SABRE_REVALIDATE_V2_RESPONSE;
  }
  return MOCK_SABRE_REVALIDATE_RESPONSE;
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h${mins.toString().padStart(2, "0")}` : `${mins}min`;
}

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;

  // Required before any next-intl call, or static rendering degrades.
  setRequestLocale(locale);
  const t = await getTranslations("vols.review");
  const tcab = await getTranslations("cabins");
  const format = await getFormatter();
  const formatDateFr = (dateStr: string) =>
    format.dateTime(new Date(dateStr), {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const mockResponse = getMockRevalidateResponse(slug);
  const reviewData = mapSabreRevalidateToUi(mockResponse);

  const { verificationStatus, flights, pricing } = reviewData;

  // Status badge config - French translations
  const statusConfig = {
    CONFIRMED: {
      bg: "bg-emerald-100",
      text: "text-emerald-700",
      border: "border-emerald-200",
      icon: ShieldCheck,
      label: t("statusConfirmed"),
    },
    PRICE_CHANGED: {
      bg: "bg-amber-100",
      text: "text-amber-700",
      border: "border-amber-200",
      icon: AlertTriangle,
      label: t("statusPriceChanged"),
    },
    SOLD_OUT: {
      bg: "bg-red-100",
      text: "text-red-700",
      border: "border-red-200",
      icon: AlertTriangle,
      label: t("statusSoldOut"),
    },
  };

  const status = statusConfig[verificationStatus];
  const StatusIcon = status.icon;

  // Get route info from first and last flight
  const firstFlight = flights[0];
  const routeFrom = firstFlight?.schedule.departure.airport || "---";
  const routeTo = firstFlight?.schedule.arrival.airport || "---";

  return (
    <>
      <Header />

      <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
        {/* HERO BANNER SECTION */}
        <div className="relative w-full overflow-hidden">
          <img
            src="/airplane-background.png"
            alt="Bannière voyage"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/60"></div>

          <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-20">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-white/80 text-sm mb-6">
              <Link href="/" className="hover:text-white transition-colors">
                <Home className="w-4 h-4" />
              </Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/vols" className="hover:text-white transition-colors">
                Recherche
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white font-medium">
                {routeFrom} → {routeTo}
              </span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {t("title")}
                </h1>
                <p className="text-white/80">
                  {t("subtitle")}
                </p>
              </div>
              {/* <div
                className={`flex items-center gap-2 ${status.bg} ${status.text} px-4 py-2.5 rounded-full border ${status.border} shadow-sm`}
              >
                <StatusIcon className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-tight">
                  {status.label}
                </span>
              </div> */}
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT: Flight Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Flight Cards */}
              {flights.map((flight, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
                >
                  {/* Card Header with Cabin */}
                  <div className="px-8 pt-6 pb-4 border-b border-slate-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[var(--brand-primary)]/5 rounded-xl flex items-center justify-center font-bold text-[var(--brand-primary)] border border-[var(--brand-primary)]/10">
                          {flight.marketingCarrier}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">
                            {t("flightNumber", { number: flight.flightNumber })}
                          </p>
                          <p className="text-xs text-slate-500">
                            {flight.marketingCarrier}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] px-3 py-1 rounded-full text-xs font-bold">
                          <Briefcase className="w-3 h-3" />
                          {tcab(flight.cabinCode)}
                        </span>
                        <span className="bg-slate-100 text-slate-600 text-xs font-medium px-2.5 py-1 rounded-full">
                          {t("bookingClass", { code: flight.bookingCode })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    {/* Date */}
                    <div className="flex items-center gap-2 mb-6 text-sm text-slate-600">
                      <Calendar className="w-4 h-4 text-[var(--brand-primary)]" />
                      <span className="font-medium">
                        {formatDateFr(flight.schedule.departure.date)}
                      </span>
                    </div>

                    {/* Flight Timeline */}
                    <div className="flex items-center justify-between relative px-2">
                      <div className="z-10 bg-white pr-4">
                        <p className="text-3xl font-black text-slate-900">
                          {flight.schedule.departure.time}
                        </p>
                        <p className="text-sm font-bold text-slate-600 uppercase">
                          {flight.schedule.departure.airport}
                        </p>
                        {flight.schedule.departure.terminal && (
                          <p className="text-xs text-slate-400 mt-1">
                            {t("terminal", { terminal: flight.schedule.departure.terminal })}
                          </p>
                        )}
                      </div>

                      <div className="absolute inset-0 flex flex-col items-center justify-center -z-0">
                        <div className="w-full border-t-2 border-dashed border-slate-200"></div>
                        <div className="bg-white px-4 -mt-2.5">
                          <Plane className="w-5 h-5 text-[var(--brand-primary)] fill-[var(--brand-primary)]" />
                        </div>
                        <span className="text-xs font-bold text-slate-400 mt-2">
                          {formatDuration(flight.schedule.durationMinutes)}
                        </span>
                      </div>

                      <div className="z-10 bg-white pl-4 text-right">
                        <p className="text-3xl font-black text-slate-900">
                          {flight.schedule.arrival.time}
                        </p>
                        <p className="text-sm font-bold text-slate-600 uppercase">
                          {flight.schedule.arrival.airport}
                        </p>
                        {flight.schedule.arrival.terminal && (
                          <p className="text-xs text-slate-400 mt-1">
                            {t("terminal", { terminal: flight.schedule.arrival.terminal })}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Perks Bar */}
                  <div className="bg-slate-50 border-t border-slate-100 px-8 py-4 flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                      <Luggage className="w-4 h-4 text-emerald-500" />
                      {t("baggageIncluded", { count: pricing.baggagePieces })}
                    </div>
                    {pricing.refundable && (
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                        <RotateCcw className="w-4 h-4 text-[var(--brand-primary)]" />
                        {t("refundable")}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Important Info */}
              <div className="bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/10 rounded-2xl p-6">
                <h4 className="text-[var(--brand-dark)] font-bold text-sm mb-3 flex items-center gap-2">
                  <Info className="w-4 h-4 text-[var(--brand-primary)]" />
                  {t("fareConditions")}
                </h4>
                <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4 font-medium">
                  <li>
                    {t("conditionPrivate")}
                  </li>
                  <li>
                    {t("conditionTicketing")}{" "}
                    <span className="font-bold">
                      {formatDateFr(pricing.lastTicketDateTime.split("T")[0])} à{" "}
                      {pricing.lastTicketDateTime.split("T")[1]}
                    </span>
                    .
                  </li>
                  <li>
                    {t("conditionChanges")}
                  </li>
                </ul>
              </div>
            </div>

            {/* RIGHT: Price Summary Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sticky top-6">
                <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-[var(--brand-primary)]" />
                  {t("summary")}
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm font-medium text-slate-500">
                    <span>{t("baseFare")}</span>
                    <span>
                      {pricing.currency} {pricing.baseFare.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-slate-500">
                    <span>{t("taxes")}</span>
                    <span>
                      {pricing.currency} {pricing.taxes.total.toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                    <span className="text-base font-bold text-slate-900">
                      {t("totalPrice")}
                    </span>
                    <span className="text-3xl font-black text-[var(--brand-primary)]">
                      {pricing.currency} {pricing.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    size="lg"
                    rounded="xl"
                    className="w-full shadow-lg shadow-[var(--brand-primary)]/20 active:scale-[0.98]"
                  >
                    {t("bookNow")}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <p className="text-[10px] text-center text-slate-400 font-medium px-4">
                    {t("terms")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
