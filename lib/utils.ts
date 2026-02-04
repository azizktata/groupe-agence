import { FlightFiltersState, UiFlightOffer } from "@/mappers/mapSabreBfmToUi";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function minutesToReadable(durationMinutes: number): string {
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;

    if (hours === 0) {
      return `${minutes}min`;
    }

    return `${hours}h${minutes.toString().padStart(2, "0")}`;
  }

export function applyFlightFilters(
  offers: UiFlightOffer[],
  filters: FlightFiltersState
): UiFlightOffer[] {
  return offers.filter((offer) => {
    // Stops
    if (filters.stops.length > 0 && !filters.stops.includes(offer.stops)) {
      return false;
    }

    // Airlines
    if (
      filters.airlines.length > 0 &&
      !filters.airlines.includes(offer.airlineCode)
    ) {
      return false;
    }

    // Price
    const [minPrice, maxPrice] = filters.priceRange;
    if (offer.price < minPrice || offer.price > maxPrice) {
      return false;
    }

    // Cabin
    if (
      filters.cabins.length > 0 &&
      !filters.cabins.includes(offer.cabin)
    ) {
      return false;
    }

    // Duration
    if (
      filters.maxDuration !== undefined &&
      offer.totalDurationMinutes > filters.maxDuration
    ) {
      return false;
    }

    // Trip type
    if (filters.tripType === "ONE_WAY" && offer.isRoundTrip) {
      return false;
    }
    if (filters.tripType === "ROUND_TRIP" && !offer.isRoundTrip) {
      return false;
    }

    // Baggage
    if (
      filters.baggagePieces !== undefined &&
      offer.baggagePieces < filters.baggagePieces
    ) {
      return false;
    }

    // Departure time ranges
    const h = offer.departureHour;
    const inMorning = h >= 6 && h < 12;
    const inAfternoon = h >= 12 && h < 18;
    const inEvening = h >= 18 && h < 22;
    const inNight = h >= 22 || h < 6;

    const timeFilters = filters.departureTimeRanges;
    const isTimeAllowed =
      (timeFilters.morning && inMorning) ||
      (timeFilters.afternoon && inAfternoon) ||
      (timeFilters.evening && inEvening) ||
      (timeFilters.night && inNight);

    if (
      Object.values(timeFilters).some(Boolean) &&
      !isTimeAllowed
    ) {
      return false;
    }

    return true;
  });
}
