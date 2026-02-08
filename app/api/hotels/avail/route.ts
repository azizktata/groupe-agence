import { NextRequest, NextResponse } from "next/server";
import { getToken } from "../../token/route";

const SABRE_BASE_URL = process.env.API_SABRE_BASE_URL || "https://api.cert.platform.sabre.com";

export type HotelAvailRoom = {
  index: number;
  adults: number;
  children?: number;
  childAges?: string;
};

export type HotelAvailRequest = {
  latitude?: number;
  longitude?: number;
  radius?: number;
  uom?: "KM" | "MI";
  refPointValue?: string;
  refPointValueContext?: "CODE" | "NAME";
  refPointType?: string;
  countryCode?: string;
  city?: string;
  hotelCodes?: string[];
  startDate: string;
  endDate: string;
  currencyCode?: string;
  bestOnly?: "1" | "2";
  rooms: HotelAvailRoom[];
  sortBy?: "DistanceFrom" | "SabreRating" | "AverageNightlyRate" | "AverageNightlyRateBeforeTax";
  sortOrder?: "ASC" | "DESC";
  pageSize?: number;
  offset?: number;
};

function buildGeoSearch(params: HotelAvailRequest) {
  const geoRef: Record<string, unknown> = {
    Radius: params.radius || 10,
    UOM: params.uom || "KM",
  };

  if (params.latitude !== undefined && params.longitude !== undefined) {
    geoRef.GeoCode = {
      Latitude: params.latitude,
      Longitude: params.longitude,
    };
  } else if (params.refPointValue) {
    geoRef.RefPoint = {
      Value: params.refPointValue,
      ValueContext: params.refPointValueContext || "CODE",
      RefPointType: params.refPointType || "6",
    };
  } else if (params.city) {
    geoRef.AddressRef = {
      CountryCode: params.countryCode || "US",
      City: params.city,
    };
  }

  return { GeoRef: geoRef };
}

function buildHotelAvailRequest(params: HotelAvailRequest) {
  const searchCriteria: Record<string, unknown> = {
    OffSet: params.offset || 1,
    SortBy: params.sortBy || "AverageNightlyRate",
    SortOrder: params.sortOrder || "ASC",
    PageSize: params.pageSize || 50,
  };

  if (params.hotelCodes && params.hotelCodes.length > 0) {
    searchCriteria.HotelRefs = {
      HotelRef: params.hotelCodes.map((code) => ({
        HotelCode: code,
        CodeContext: "GLOBAL",
      })),
    };
  } else {
    searchCriteria.GeoSearch = buildGeoSearch(params);
  }

  searchCriteria.RateInfoRef = {
    CurrencyCode: params.currencyCode || "USD",
    BestOnly: params.bestOnly || "1",
    StayDateTimeRange: {
      StartDate: params.startDate,
      EndDate: params.endDate,
    },
    Rooms: {
      Room: params.rooms.map((room) => {
        const roomObj: Record<string, unknown> = {
          Index: room.index,
          Adults: room.adults,
        };
        if (room.children && room.children > 0) {
          roomObj.Children = room.children;
          if (room.childAges) {
            roomObj.ChildAges = room.childAges;
          }
        }
        return roomObj;
      }),
    },
  };

  return {
    GetHotelAvailRQ: {
      version: "5.0.0",
      SearchCriteria: searchCriteria,
    },
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: HotelAvailRequest = await request.json();
    const token = await getToken();
    const sabreRequest = buildHotelAvailRequest(body);
    console.log("Sabre Hotel Avail Request:", JSON.stringify(sabreRequest, null, 2));

    const response = await fetch(`${SABRE_BASE_URL}/v5/get/hotelavail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(sabreRequest),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: "Hotel avail request failed", details: errorText, request: sabreRequest },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch hotel avail", details: String(error) },
      { status: 500 }
    );
  }
}
