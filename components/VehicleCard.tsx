"use client";

import React from "react";
import { Car, Users, Settings2, Briefcase, UserCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { UiVehicle } from "@/mocks/car/vehicles";

type VehicleCardProps = {
  vehicle: UiVehicle;
};

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const t = useTranslations("vehicleCard");
  const tType = useTranslations("vehicleTypes");

  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-xl hover:border-[var(--brand-primary)]/30 transition-all duration-300 overflow-hidden group">
      {/* Image Section */}
      <div className="relative w-full h-48 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={vehicle.image}
          alt={vehicle.name}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

        {/* Top badges row */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
          {/* Type Badge */}
          <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-[var(--brand-primary)] px-3 py-1.5 rounded-full text-xs font-bold shadow-sm">
            <Car className="w-3 h-3" />
            {tType(vehicle.type)}
          </span>

          {/* Driver Badge */}
          {vehicle.withDriver && (
            <span className="inline-flex items-center gap-1 bg-[var(--brand-accent)]/90 backdrop-blur-sm text-[var(--brand-dark)] px-2.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide shadow-sm">
              <UserCheck className="w-3 h-3" />
              {t("withDriver")}
            </span>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Vehicle Name */}
        <h3 className="font-bold text-lg text-slate-900 mb-3 leading-tight group-hover:text-[var(--brand-primary)] transition-colors">
          {vehicle.name}
        </h3>

        {/* Specs */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-500 text-sm mb-5">
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 flex-shrink-0" />
            {t("seats", { count: vehicle.seats })}
          </span>
          <span className="flex items-center gap-1.5">
            <Settings2 className="w-3.5 h-3.5 flex-shrink-0" />
            {vehicle.transmission === "Automatique"
              ? t("transmissionAutomatic")
              : t("transmissionManual")}
          </span>
          <span className="flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 flex-shrink-0" />
            {t("luggage", { count: vehicle.luggage })}
          </span>
        </div>

        {/* Action Button */}
        <Button
          type="button"
          size="default"
          rounded="xl"
          className="w-full shadow-lg shadow-[var(--brand-primary)]/20 active:scale-[0.98]"
        >
          {t("book")}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export default VehicleCard;
