import { CHAIN_CODE_INFO } from "./mapSabreHotelsToUi";

// --- UI types for room/rate data ---

export type UiMealsIncluded = {
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
  description: string | null;
};

export type UiRatePlanInclusion = {
  code: number;
  description: string;
};

export type UiRatePlan = {
  name: string;
  type: string;
  prepaid: boolean;
  availableQty: number | null;
  nightlyRate: number;
  totalPrice: number;
  currencyCode: string;
  refundable: boolean;
  meals: UiMealsIncluded | null;
  inclusions: UiRatePlanInclusion[];
};

export type UiRoomAvail = {
  name: string;
  bedTypes: string[];
  nonSmoking: boolean | null;
  ratePlans: UiRatePlan[];
};

// --- UI type for hotel availability ---

export type UiHotelAvail = {
  id: string;
  name: string;
  chain: {
    code: string;
    name: string;
    brand: string;
    category: string;
  };
  location: string | null;
  rating: number;
  image: string | null;
  sabreCode: string;
  averageNightlyRate: number | null;
  currencyCode: string;
  distance: number | null;
  distanceUnit: string | null;
  rooms: UiRoomAvail[];
};

// --- Sabre response types ---

type SabreConvertedRateInfo = {
  StartDate?: string;
  EndDate?: string;
  AmountBeforeTax?: string;
  AmountAfterTax?: string;
  AverageNightlyRate?: string;
  AverageNightlyRateBeforeTax?: string;
  ApproxTotalPrice?: string;
  CurrencyCode?: string;
  RateSource?: string;
  CancelPenalties?: {
    CancelPenalty?: { Refundable?: boolean }[];
  };
};

type SabreRatePlan = {
  RatePlanName?: string;
  RatePlanType?: string;
  RatePlanTypeDescription?: string;
  PrepaidIndicator?: boolean;
  AvailableQuantity?: number;
  RateSource?: string;
  RateKey?: string;
  LoyaltyPoints?: boolean;
  MealsIncluded?: {
    Breakfast?: boolean;
    Lunch?: boolean;
    Dinner?: boolean;
    MealPlanDescription?: string;
  };
  RatePlanInclusions?: {
    RatePlanInclusion?: { Code: number; Description: string }[];
  };
  ConvertedRateInfo?: SabreConvertedRateInfo;
};

type SabreBedType = {
  Code?: number;
  Description?: string;
};

type SabreRoom = {
  RoomIndex?: number;
  RoomType?: string;
  NonSmoking?: boolean;
  Adults?: number;
  Children?: number;
  BedTypeOptions?: {
    BedTypes?: {
      BedType?: SabreBedType[];
    }[];
  };
  RoomDescription?: {
    Name?: string;
    Text?: string[];
  };
  Amenities?: {
    Amenity?: { Code: number; Description: string; value?: string }[];
  };
  RatePlans?: {
    RatePlan?: SabreRatePlan[];
  };
};

type SabreHotelAvailEntry = {
  HotelInfo: {
    HotelCode: string;
    CodeContext: string;
    HotelName: string;
    ChainCode: string;
    ChainName: string;
    BrandCode?: string;
    BrandName?: string;
    SabreRating: string;
    SabreHotelCode: string;
    Distance?: number;
    Direction?: string;
    UOM?: string;
    LocationInfo?: {
      Latitude?: string;
      Longitude?: string;
      Address?: {
        AddressLine1?: string;
        CityName?: string | { CityCode?: string; value?: string };
        StateProv?: { StateCode?: string; value?: string };
        PostalCode?: string;
        CountryName?: { Code?: string; value?: string };
      };
    };
  };
  HotelRateInfo?: {
    RateInfos?: {
      ConvertedRateInfo?: SabreConvertedRateInfo[];
    };
    Rooms?: {
      Room?: SabreRoom[];
    };
  };
};

type SabreHotelAvailResponse = {
  GetHotelAvailRS?: {
    ApplicationResults?: {
      status: string;
    };
    HotelAvailInfos?: {
      HotelAvailInfo?: SabreHotelAvailEntry[];
    };
  };
};

// --- Helpers ---

function extractCityName(cityName?: string | { CityCode?: string; value?: string }): string | null {
  if (!cityName) return null;
  if (typeof cityName === "string") return cityName;
  return cityName.value || null;
}

function getLowestRate(rateInfos?: SabreConvertedRateInfo[]): { rate: number; currency: string } | null {
  if (!rateInfos || rateInfos.length === 0) return null;

  let lowest: number | null = null;
  let currency = "USD";

  for (const info of rateInfos) {
    const rate = parseFloat(info.AverageNightlyRate || "");
    if (!isNaN(rate) && (lowest === null || rate < lowest)) {
      lowest = rate;
      currency = info.CurrencyCode || "USD";
    }
  }

  return lowest !== null ? { rate: lowest, currency } : null;
}

function mapRatePlan(rp: SabreRatePlan): UiRatePlan | null {
  const rateInfo = rp.ConvertedRateInfo;
  const nightlyRate = parseFloat(rateInfo?.AverageNightlyRate || "");
  const totalPrice = parseFloat(rateInfo?.ApproxTotalPrice || rateInfo?.AmountAfterTax || "");

  if (isNaN(nightlyRate)) return null;

  const cancelPenalties = rateInfo?.CancelPenalties?.CancelPenalty || [];
  const refundable = cancelPenalties.length > 0
    ? cancelPenalties.some((cp) => cp.Refundable === true)
    : true;

  const meals: UiMealsIncluded | null = rp.MealsIncluded
    ? {
        breakfast: rp.MealsIncluded.Breakfast ?? false,
        lunch: rp.MealsIncluded.Lunch ?? false,
        dinner: rp.MealsIncluded.Dinner ?? false,
        description: rp.MealsIncluded.MealPlanDescription || null,
      }
    : null;

  const inclusions: UiRatePlanInclusion[] = (
    rp.RatePlanInclusions?.RatePlanInclusion || []
  ).map((inc) => ({
    code: inc.Code,
    description: inc.Description,
  }));

  return {
    name: rp.RatePlanName || "Standard",
    type: rp.RatePlanTypeDescription || "",
    prepaid: rp.PrepaidIndicator ?? false,
    availableQty: rp.AvailableQuantity ?? null,
    nightlyRate,
    totalPrice: isNaN(totalPrice) ? nightlyRate : totalPrice,
    currencyCode: rateInfo?.CurrencyCode || "USD",
    refundable,
    meals,
    inclusions,
  };
}

function mapRooms(rooms?: SabreRoom[]): UiRoomAvail[] {
  if (!rooms || rooms.length === 0) return [];

  return rooms.map((room) => {
    const bedTypes: string[] = [];
    const bedTypeOptions = room.BedTypeOptions?.BedTypes || [];
    for (const bt of bedTypeOptions) {
      for (const bed of bt.BedType || []) {
        if (bed.Description) bedTypes.push(bed.Description);
      }
    }

    const name =
      room.RoomDescription?.Name ||
      room.RoomDescription?.Text?.[0] ||
      room.RoomType ||
      "Chambre standard";

    const ratePlans: UiRatePlan[] = (room.RatePlans?.RatePlan || [])
      .map(mapRatePlan)
      .filter((rp): rp is UiRatePlan => rp !== null);

    return {
      name,
      bedTypes,
      nonSmoking: room.NonSmoking ?? null,
      ratePlans,
    };
  });
}

// --- Main mapper ---

export function mapSabreHotelAvailToUi(response: SabreHotelAvailResponse): UiHotelAvail[] {
  const hotelList = response?.GetHotelAvailRS?.HotelAvailInfos?.HotelAvailInfo || [];
  if (hotelList.length === 0) {
    console.warn("No hotels found in Sabre response");
    return [];
  }

  return hotelList.map((entry) => {
    const hotel = entry.HotelInfo;
    const chainInfo = CHAIN_CODE_INFO[hotel.ChainCode];
    const location = extractCityName(hotel.LocationInfo?.Address?.CityName);
    const rateData = getLowestRate(entry.HotelRateInfo?.RateInfos?.ConvertedRateInfo);
    const rooms = mapRooms(entry.HotelRateInfo?.Rooms?.Room);

    return {
      id: hotel.HotelCode,
      name: hotel.HotelName,
      chain: {
        code: hotel.ChainCode,
        name: hotel.ChainName,
        brand: chainInfo?.brand || hotel.ChainName,
        category: chainInfo?.category || "Standard",
      },
      location,
      rating: parseFloat(hotel.SabreRating) || 0,
      image: null,
      sabreCode: hotel.SabreHotelCode,
      averageNightlyRate: rateData?.rate ?? null,
      currencyCode: rateData?.currency || "USD",
      distance: hotel.Distance ?? null,
      distanceUnit: hotel.UOM || null,
      rooms,
    };
  });
}
