"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Users, Plus, Minus } from "lucide-react";

type CheckAvailabilityDialogProps = {
  hotelId: string;
};

type RoomConfig = {
  adults: number;
  children: number;
  childAges: string;
};

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

export default function CheckAvailabilityDialog({ hotelId }: CheckAvailabilityDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(getTomorrowDate());
  const [endDate, setEndDate] = useState(getDefaultEndDate());
  const [rooms, setRooms] = useState<RoomConfig[]>([{ adults: 2, children: 0, childAges: "" }]);

  const addRoom = () => {
    if (rooms.length >= 4) return;
    setRooms((prev) => [...prev, { adults: 2, children: 0, childAges: "" }]);
  };

  const removeRoom = (index: number) => {
    if (rooms.length <= 1) return;
    setRooms((prev) => prev.filter((_, i) => i !== index));
  };

  const updateRoom = (index: number, field: string, value: number | string) => {
    setRooms((prev) =>
      prev.map((room, i) => (i === index ? { ...room, [field]: value } : room))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Build search params to pass to availability page
    const params = new URLSearchParams({
      startDate,
      endDate,
      rooms: JSON.stringify(
        rooms.map((room, i) => ({
          index: i + 1,
          adults: room.adults,
          children: room.children > 0 ? room.children : undefined,
          childAges: room.children > 0 && room.childAges ? room.childAges : undefined,
        }))
      ),
    });

    setOpen(false);
    router.push(`/hotels/${hotelId}/availability?${params.toString()}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          rounded="xl"
          className="w-full shadow-lg shadow-[var(--brand-primary)]/20 active:scale-[0.98]"
        >
          Voir les disponibilités
          <ArrowRight className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Vérifier les disponibilités</DialogTitle>
          <DialogDescription>
            Sélectionnez vos dates et le nombre de voyageurs.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Dates row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Arrivée
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="date"
                  className="w-full border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent outline-none transition-all"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={getTomorrowDate()}
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Départ
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="date"
                  className="w-full border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent outline-none transition-all"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate || getTomorrowDate()}
                />
              </div>
            </div>
          </div>

          {/* Rooms */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Chambres & voyageurs
              </label>
              <button
                type="button"
                onClick={addRoom}
                disabled={rooms.length >= 4}
                className="flex items-center gap-1 text-xs font-semibold text-[var(--brand-primary)] hover:underline disabled:opacity-40"
              >
                <Plus className="w-3.5 h-3.5" />
                Ajouter
              </button>
            </div>

            {rooms.map((room, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-slate-50 rounded-xl p-3 flex-wrap"
              >
                <span className="text-xs font-bold text-slate-400 uppercase w-16 flex-shrink-0">
                  Ch. {index + 1}
                </span>

                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs text-slate-500">Ad.</span>
                  <button
                    type="button"
                    onClick={() => updateRoom(index, "adults", Math.max(1, room.adults - 1))}
                    disabled={room.adults <= 1}
                    className="w-6 h-6 flex items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] disabled:opacity-30 transition-all text-xs"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-sm font-semibold text-slate-700 w-5 text-center">{room.adults}</span>
                  <button
                    type="button"
                    onClick={() => updateRoom(index, "adults", Math.min(6, room.adults + 1))}
                    disabled={room.adults >= 6}
                    className="w-6 h-6 flex items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] disabled:opacity-30 transition-all text-xs"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">Enf.</span>
                  <button
                    type="button"
                    onClick={() => updateRoom(index, "children", Math.max(0, room.children - 1))}
                    disabled={room.children <= 0}
                    className="w-6 h-6 flex items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] disabled:opacity-30 transition-all text-xs"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-sm font-semibold text-slate-700 w-5 text-center">{room.children}</span>
                  <button
                    type="button"
                    onClick={() => updateRoom(index, "children", Math.min(4, room.children + 1))}
                    disabled={room.children >= 4}
                    className="w-6 h-6 flex items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] disabled:opacity-30 transition-all text-xs"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                {room.children > 0 && (
                  <input
                    type="text"
                    placeholder="Âges (ex: 5,8)"
                    className="border border-slate-200 rounded-lg py-1.5 px-3 text-xs w-24 focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent outline-none"
                    value={room.childAges}
                    onChange={(e) => updateRoom(index, "childAges", e.target.value)}
                  />
                )}

                {rooms.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeRoom(index)}
                    className="ml-auto text-xs text-red-400 hover:text-red-600 font-medium"
                  >
                    Suppr.
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            size="lg"
            rounded="xl"
            className="w-full shadow-lg shadow-[var(--brand-primary)]/20 active:scale-[0.98]"
          >
            Rechercher les disponibilités
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
