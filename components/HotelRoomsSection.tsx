"use client";

import { useEffect, useState } from "react";
import {
  UiRoomAvail,
  UiRatePlan,
} from "@/mappers/mapSabreHotelAvailToUi";
import {
  BedDouble,
  Coffee,
  UtensilsCrossed,
  Check,
  X,
  ShieldCheck,
  CreditCard,
  Wifi,
  Car,
  Ban,
} from "lucide-react";

type HotelRoomsSectionProps = {
  hotelId: string;
  initialRooms?: UiRoomAvail[];
};

function formatCurrency(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${amount} ${currency}`;
  }
}

// Map common inclusion codes to icons
function getInclusionIcon(code: number) {
  switch (code) {
    case 42:
      return <Car className="w-3 h-3" />;
    case 286:
    case 179:
    case 259:
      return <Wifi className="w-3 h-3" />;
    default:
      return <Check className="w-3 h-3" />;
  }
}

function RatePlanCard({ ratePlan }: { ratePlan: UiRatePlan }) {
  return (
    <div className="border border-slate-200 rounded-xl p-4 hover:border-[var(--brand-primary)]/30 transition-colors">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-800 line-clamp-2">
            {ratePlan.name}
          </p>
          {ratePlan.type && (
            <p className="text-xs text-slate-400 mt-0.5">{ratePlan.type}</p>
          )}
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-lg font-bold text-[var(--brand-primary)]">
            {formatCurrency(ratePlan.nightlyRate, ratePlan.currencyCode)}
          </p>
          <p className="text-[10px] text-slate-400">/ nuit</p>
        </div>
      </div>

      {/* Total price */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
        <span>Prix total</span>
        <span className="font-semibold text-slate-700">
          {formatCurrency(ratePlan.totalPrice, ratePlan.currencyCode)}
        </span>
      </div>

      {/* Badges row */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {/* Refundable badge */}
        {ratePlan.refundable ? (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <ShieldCheck className="w-3 h-3" />
            Remboursable
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold bg-red-50 text-red-600 border border-red-200">
            <Ban className="w-3 h-3" />
            Non remboursable
          </span>
        )}

        {/* Prepaid badge */}
        {ratePlan.prepaid && (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <CreditCard className="w-3 h-3" />
            Prépayé
          </span>
        )}

        {/* Availability */}
        {ratePlan.availableQty !== null && (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">
            {ratePlan.availableQty} dispo.
          </span>
        )}
      </div>

      {/* Meals */}
      {ratePlan.meals && (ratePlan.meals.breakfast || ratePlan.meals.lunch || ratePlan.meals.dinner) && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {ratePlan.meals.breakfast && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold bg-orange-50 text-orange-700 border border-orange-200">
              <Coffee className="w-3 h-3" />
              Petit-déjeuner
            </span>
          )}
          {ratePlan.meals.lunch && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold bg-orange-50 text-orange-700 border border-orange-200">
              <UtensilsCrossed className="w-3 h-3" />
              Déjeuner
            </span>
          )}
          {ratePlan.meals.dinner && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold bg-orange-50 text-orange-700 border border-orange-200">
              <UtensilsCrossed className="w-3 h-3" />
              Dîner
            </span>
          )}
        </div>
      )}

      {/* Inclusions */}
      {ratePlan.inclusions.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {ratePlan.inclusions.map((inc) => (
            <span
              key={inc.code}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-200"
            >
              {getInclusionIcon(inc.code)}
              {inc.description}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function RoomCard({ room }: { room: UiRoomAvail }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
      {/* Room header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 bg-[var(--brand-primary)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <BedDouble className="w-5 h-5 text-[var(--brand-primary)]" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 text-sm line-clamp-2">
            {room.name}
          </h3>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            {room.bedTypes.length > 0 && (
              <span className="text-xs text-slate-500">
                {room.bedTypes.join(", ")}
              </span>
            )}
            {room.nonSmoking === true && (
              <span className="inline-flex items-center gap-1 text-[10px] text-slate-400">
                <X className="w-3 h-3" />
                Non-fumeur
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Rate plans */}
      {room.ratePlans.length > 0 && (
        <div className="space-y-3">
          {room.ratePlans.map((rp, i) => (
            <RatePlanCard key={i} ratePlan={rp} />
          ))}
        </div>
      )}

      {room.ratePlans.length === 0 && (
        <p className="text-sm text-slate-400 italic">
          Aucun tarif disponible pour cette chambre.
        </p>
      )}
    </div>
  );
}

export default function HotelRoomsSection({ hotelId, initialRooms }: HotelRoomsSectionProps) {
  const [rooms, setRooms] = useState<UiRoomAvail[] | null>(initialRooms || null);

  useEffect(() => {
    // Skip sessionStorage lookup if rooms were passed as props
    if (initialRooms) return;
    const stored = sessionStorage.getItem(`hotel-avail-rooms-${hotelId}`);
    if (stored) {
      try {
        setRooms(JSON.parse(stored));
      } catch {
        setRooms(null);
      }
    }
  }, [hotelId, initialRooms]);

  if (!rooms || rooms.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
      <h2 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
        <BedDouble className="w-5 h-5 text-[var(--brand-primary)]" />
        Chambres disponibles
      </h2>
      <p className="text-xs text-slate-400 mb-5">
        {rooms.length} type{rooms.length > 1 ? "s" : ""} de chambre disponible{rooms.length > 1 ? "s" : ""}
      </p>

      <div className="space-y-4">
        {rooms.map((room, i) => (
          <RoomCard key={i} room={room} />
        ))}
      </div>
    </div>
  );
}
