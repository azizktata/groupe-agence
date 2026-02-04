// UI types for the review/revalidation page
export type UiReviewData = {
  verificationStatus: "CONFIRMED" | "PRICE_CHANGED" | "SOLD_OUT";
  flights: UiReviewFlight[];
  pricing: UiReviewPricing;
};

export type UiReviewFlight = {
  marketingCarrier: string;
  operatingCarrier: string;
  flightNumber: string;
  bookingCode: string;
  cabinCode: string;
  schedule: {
    departure: {
      airport: string;
      terminal?: string;
      time: string;
      date: string;
    };
    arrival: {
      airport: string;
      terminal?: string;
      time: string;
      date: string;
    };
    durationMinutes: number;
  };
};

export type UiReviewPricing = {
  baseFare: number;
  taxes: {
    total: number;
    breakdown: { code: string; amount: number; description: string }[];
  };
  total: number;
  currency: string;
  refundable: boolean;
  baggagePieces: number;
  lastTicketDateTime: string;
};

// Helper functions
function formatTime(time: string): string {
  return time.slice(0, 5);
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function findSchedule(scheduleDescs: any[], refId: number) {
  return scheduleDescs.find((s) => s.id === refId);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function findLeg(legDescs: any[], refId: number) {
  return legDescs.find((l) => l.id === refId);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function findTax(taxDescs: any[], refId: number) {
  return taxDescs.find((t) => t.id === refId);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function findBaggageAllowance(baggageAllowanceDescs: any[], refId: number) {
  return baggageAllowanceDescs.find((b) => b.id === refId);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapSabreRevalidateToUi(response: { groupedItineraryResponse: any }): UiReviewData {
  const data = response.groupedItineraryResponse;

  // Get the first (and typically only) itinerary from revalidation
  const group = data.itineraryGroups[0];
  const itinerary = group.itineraries[0];
  const legDescriptions = group.groupDescription.legDescriptions;

  const pricing = itinerary.pricingInformation[0];
  const fare = pricing.fare;
  const passengerInfo = fare.passengerInfoList[0].passengerInfo;

  // Build flight details for each leg
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const flights: UiReviewFlight[] = itinerary.legs.map((legRef: any, index: number) => {
    const leg = findLeg(data.legDescs, legRef.ref);
    const scheduleRef = leg.schedules[0].ref;
    const schedule = findSchedule(data.scheduleDescs, scheduleRef);
    const legDescription = legDescriptions[index];

    // Get booking code from fare components
    const fareComponent = passengerInfo.fareComponents[index];
    const segmentInfo = fareComponent?.segments[0]?.segment || {};

    return {
      marketingCarrier: schedule.carrier.marketing,
      operatingCarrier: schedule.carrier.operating,
      flightNumber: String(schedule.carrier.marketingFlightNumber),
      bookingCode: segmentInfo.bookingCode || "",
      cabinCode: segmentInfo.cabinCode || "",
      schedule: {
        departure: {
          airport: schedule.departure.airport,
          terminal: schedule.departure.terminal,
          time: formatTime(schedule.departure.time),
          date: legDescription.departureDate,
        },
        arrival: {
          airport: schedule.arrival.airport,
          terminal: schedule.arrival.terminal,
          time: formatTime(schedule.arrival.time),
          date: legDescription.departureDate, // Same day for short flights
        },
        durationMinutes: leg.elapsedTime,
      },
    };
  });

  // Build tax breakdown
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const taxBreakdown = passengerInfo.taxes.map((taxRef: any) => {
    const tax = findTax(data.taxDescs, taxRef.ref);
    return {
      code: tax.code,
      amount: tax.amount,
      description: tax.description,
    };
  });

  // Get baggage allowance
  const baggageInfo = passengerInfo.baggageInformation[0];
  const baggageAllowance = findBaggageAllowance(
    data.baggageAllowanceDescs,
    baggageInfo.allowance.ref
  );

  // Build pricing
  const reviewPricing: UiReviewPricing = {
    baseFare: passengerInfo.passengerTotalFare.equivalentAmount,
    taxes: {
      total: passengerInfo.passengerTotalFare.totalTaxAmount,
      breakdown: taxBreakdown,
    },
    total: passengerInfo.passengerTotalFare.totalFare,
    currency: passengerInfo.passengerTotalFare.currency,
    refundable: !passengerInfo.nonRefundable,
    baggagePieces: baggageAllowance.pieceCount,
    lastTicketDateTime: `${fare.lastTicketDate}T${fare.lastTicketTime}`,
  };

  // Determine verification status
  // In a real scenario, you'd compare with the original price from BFM
  const verificationStatus: UiReviewData["verificationStatus"] = itinerary.currentItinerary
    ? "CONFIRMED"
    : "PRICE_CHANGED";

  return {
    verificationStatus,
    flights,
    pricing: reviewPricing,
  };
}
