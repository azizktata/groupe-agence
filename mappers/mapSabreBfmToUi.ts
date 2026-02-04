// UI types
export type UiFlightOffer = {
  id: number;
  airline: string;
  airlineCode: string;
  price: number;
  currency: string;
  cabin: string;
  baggage: string;
  outbound: UiFlightLeg;
  inbound: UiFlightLeg | null;
  revalidationKey: RevalidationKey;
  // Filter-relevant fields
  stops: number;
  totalDurationMinutes: number;
  baggagePieces: number;
  isRoundTrip: boolean;
  departureHour: number; // 0-23, for time-of-day filtering
};

export type UiFlightLeg = {
  from: string;
  to: string;
  date: string;
  departureTime: string;
  arrivalTime: string;
  durationMinutes: number;
  flightNumber: string;
  stopCount: number;
};

// Filter options extracted from BFM response
export type BfmFilterOptions = {
  airlines: { code: string; name: string }[];
  stops: number[]; // unique stop counts (0, 1, 2, etc.)
  priceRange: { min: number; max: number };
  cabins: string[]; // unique cabin codes
  durationRange: { min: number; max: number }; // in minutes
  departureTimeRanges: {
    morning: boolean;   // 06:00-11:59
    afternoon: boolean; // 12:00-17:59
    evening: boolean;   // 18:00-21:59
    night: boolean;     // 22:00-05:59
  };
  tripTypes: {
    oneWay: boolean;
    roundTrip: boolean;
  };
  baggageOptions: number[]; // unique baggage piece counts
};

// Data needed to construct a Sabre revalidation request
export type RevalidationKey = {
  segments: RevalidationSegment[];
  passengerType: string;
  passengerCount: number;
};

export type RevalidationSegment = {
  marketingCarrier: string;
  operatingCarrier: string;
  flightNumber: number;
  bookingCode: string;
  origin: string;
  destination: string;
  departureDateTime: string;
  arrivalDateTime: string;
};

// Sabre response types
type SabreLegDesc = {
  id: number;
  elapsedTime: number;
  schedules: { ref: number }[];
};

type SabreScheduleDesc = {
  id: number;
  departure: { airport: string; time: string };
  arrival: { airport: string; time: string };
  carrier: {
    marketing: string;
    operating: string;
    marketingFlightNumber: number;
  };
};

type SabreValidatingCarrierDesc = {
  id: number;
  carrierName: string;
  carrier: string;
};

type SabreBaggageAllowanceDesc = {
  id: number;
  pieceCount: number;
};

function findLeg(legDescs: SabreLegDesc[], refId: number) {
  return legDescs.find((l) => l.id === refId);
}

function findSchedule(scheduleDescs: SabreScheduleDesc[], refId: number) {
  return scheduleDescs.find((s) => s.id === refId);
}

function findValidatingCarrier(
  validatingCarrierDescs: SabreValidatingCarrierDesc[],
  refId: number
) {
  return validatingCarrierDescs.find((v) => v.id === refId);
}

function findBaggageAllowance(
  baggageAllowanceDescs: SabreBaggageAllowanceDesc[],
  refId: number
) {
  return baggageAllowanceDescs.find((b) => b.id === refId);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapSabreBfmToUi(response: { groupedItineraryResponse: any }): UiFlightOffer[] {
  const data = response.groupedItineraryResponse;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.itineraryGroups.flatMap((group: any) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    group.itineraries.map((itinerary: any) => {
      const pricing = itinerary.pricingInformation[0];
      const passengerInfo = pricing.fare.passengerInfoList[0].passengerInfo;
      const segment = passengerInfo.fareComponents[0].segments[0].segment;

      // Get validating carrier by ref
      const validatingCarrierRef = pricing.fare.validatingCarriers[0].ref;
      const validatingCarrier = findValidatingCarrier(
        data.validatingCarrierDescs,
        validatingCarrierRef
      );

      // Handle legs - one-way flights only have outbound
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const legRefs = itinerary.legs.map((l: any) => l.ref);
      const legDescriptions = group.groupDescription.legDescriptions;
      const outboundRef = legRefs[0];
      const inboundRef = legRefs.length > 1 ? legRefs[1] : null;

      const outbound = buildLeg(outboundRef, data.legDescs, data.scheduleDescs, legDescriptions[0].departureDate);
      const inbound = inboundRef
        ? buildLeg(inboundRef, data.legDescs, data.scheduleDescs, legDescriptions[1].departureDate)
        : null;
      
      // fiilter-relevant fields
      const outboundStops = outbound.stopCount;
      const inboundStops = inbound ? inbound.stopCount : 0;
      const totalDurationMinutes = outbound.durationMinutes + (inbound?.durationMinutes ?? 0);
      const departureHour = parseInt(outbound.departureTime.split(":")[0], 10);


      // Get baggage allowance from first segment's baggage info
      const baggageInfo = passengerInfo.baggageInformation[0];
      const baggageAllowance = findBaggageAllowance(
        data.baggageAllowanceDescs,
        baggageInfo.allowance.ref
      )!;
      const baggage =
        baggageAllowance.pieceCount === 0
          ? "No checked baggage"
          : `${baggageAllowance.pieceCount} checked bag${baggageAllowance.pieceCount > 1 ? "s" : ""} included`;

      // Build revalidation key with all data needed for revalidation request
      const revalidationSegments: RevalidationSegment[] = [];

      // Outbound segment
      const outboundFareComponent = passengerInfo.fareComponents[0];
      const outboundSegmentInfo = outboundFareComponent.segments[0].segment;
      revalidationSegments.push(
        buildRevalidationSegment(
          outboundRef,
          data.legDescs,
          data.scheduleDescs,
          legDescriptions[0].departureDate,
          outboundSegmentInfo.bookingCode
        )
      );

      // Inbound segment (if round-trip)
      if (inboundRef && passengerInfo.fareComponents.length > 1) {
        const inboundFareComponent = passengerInfo.fareComponents[1];
        const inboundSegmentInfo = inboundFareComponent.segments[0].segment;
        revalidationSegments.push(
          buildRevalidationSegment(
            inboundRef,
            data.legDescs,
            data.scheduleDescs,
            legDescriptions[1].departureDate,
            inboundSegmentInfo.bookingCode
          )
        );
      }

      const revalidationKey: RevalidationKey = {
        segments: revalidationSegments,
        passengerType: passengerInfo.passengerType,
        passengerCount: passengerInfo.passengerNumber,
      };

      return {
        id: itinerary.id,
        airline: validatingCarrier!.carrierName,
        airlineCode: validatingCarrier!.carrier,
        price: pricing.fare.totalFare.totalPrice,
        currency: pricing.fare.totalFare.currency,
        cabin: segment.cabinCode,
        baggage,
        outbound,
        inbound,
        revalidationKey,

        // Filter-relevant fields
        stops: outboundStops + inboundStops,
        totalDurationMinutes,
        baggagePieces: baggageAllowance.pieceCount,
        isRoundTrip: Boolean(inbound),
        departureHour,
      };
    })
  );
}

// Extracts HH:MM from time string like "14:20:00+02:00"
function formatTime(time: string): string {
  return time.slice(0, 5);
}

function buildLeg(
  legRef: number,
  legDescs: SabreLegDesc[],
  scheduleDescs: SabreScheduleDesc[],
  departureDate: string
): UiFlightLeg {
  const leg = findLeg(legDescs, legRef)!;
  const scheduleRef = leg.schedules[0].ref;
  const schedule = findSchedule(scheduleDescs, scheduleRef)!;

  return {
    from: schedule.departure.airport,
    to: schedule.arrival.airport,
    date: departureDate,
    departureTime: formatTime(schedule.departure.time),
    arrivalTime: formatTime(schedule.arrival.time),
    durationMinutes: leg.elapsedTime,
    flightNumber: `${schedule.carrier.marketing}${schedule.carrier.marketingFlightNumber}`,
    stopCount: leg.schedules.length - 1,
  };
}

function buildRevalidationSegment(
  legRef: number,
  legDescs: SabreLegDesc[],
  scheduleDescs: SabreScheduleDesc[],
  departureDate: string,
  bookingCode: string
): RevalidationSegment {
  const leg = findLeg(legDescs, legRef)!;
  const scheduleRef = leg.schedules[0].ref;
  const schedule = findSchedule(scheduleDescs, scheduleRef)!;

  return {
    marketingCarrier: schedule.carrier.marketing,
    operatingCarrier: schedule.carrier.operating,
    flightNumber: schedule.carrier.marketingFlightNumber,
    bookingCode,
    origin: schedule.departure.airport,
    destination: schedule.arrival.airport,
    departureDateTime: `${departureDate}T${schedule.departure.time.slice(0, 8)}`,
    arrivalDateTime: `${departureDate}T${schedule.arrival.time.slice(0, 8)}`,
  };
}

export function extractBfmFilterOptions(
  offers: UiFlightOffer[]
): BfmFilterOptions {
  const airlinesMap = new Map<string, string>();
  const stopsSet = new Set<number>();
  const cabinsSet = new Set<string>();
  const baggageSet = new Set<number>();

  let minPrice = Infinity;
  let maxPrice = 0;
  let minDuration = Infinity;
  let maxDuration = 0;

  let hasOneWay = false;
  let hasRoundTrip = false;

  for (const offer of offers) {
    airlinesMap.set(offer.airlineCode, offer.airline);
    stopsSet.add(offer.stops);
    cabinsSet.add(offer.cabin);
    baggageSet.add(offer.baggagePieces);

    minPrice = Math.min(minPrice, offer.price);
    maxPrice = Math.max(maxPrice, offer.price);

    minDuration = Math.min(minDuration, offer.totalDurationMinutes);
    maxDuration = Math.max(maxDuration, offer.totalDurationMinutes);

    if (offer.isRoundTrip) hasRoundTrip = true;
    else hasOneWay = true;
  }

  return {
    airlines: Array.from(airlinesMap.entries()).map(([code, name]) => ({
      code,
      name,
    })),

    stops: Array.from(stopsSet).sort((a, b) => a - b),

    priceRange: {
      min: Math.floor(minPrice),
      max: Math.ceil(maxPrice),
    },

    cabins: Array.from(cabinsSet),

    durationRange: {
      min: minDuration,
      max: maxDuration,
    },

    departureTimeRanges: {
      morning: offers.some(o => o.departureHour >= 6 && o.departureHour < 12),
      afternoon: offers.some(o => o.departureHour >= 12 && o.departureHour < 18),
      evening: offers.some(o => o.departureHour >= 18 && o.departureHour < 22),
      night: offers.some(o => o.departureHour >= 22 || o.departureHour < 6),
    },

    tripTypes: {
      oneWay: hasOneWay,
      roundTrip: hasRoundTrip,
    },

    baggageOptions: Array.from(baggageSet).sort((a, b) => a - b),
  };
}
export type FlightFiltersState = {
  stops: number[];                 // ex: [0, 1]
  airlines: string[];              // airlineCode[]
  priceRange: [number, number];    // min / max
  cabins: string[];
  maxDuration?: number;            // minutes
  departureTimeRanges: {
    morning: boolean;
    afternoon: boolean;
    evening: boolean;
    night: boolean;
  };
  tripType?: "ONE_WAY" | "ROUND_TRIP" | "any";
  baggagePieces?: number;          // minimum required
};
