import { NextRequest, NextResponse } from "next/server";
import { getToken } from "../../token/route";

const SABRE_BASE_URL = process.env.API_SABRE_BASE_URL || "https://api.cert.platform.sabre.com";

export type HotelListRequest = {
  hotelName?: string;
  chainCode?: string;
  minRating?: string;
  maxRating?: string;
  amenityCodes?: number[];
};


function buildHotelListRequest(params: HotelListRequest) {
  const hotelPref: Record<string, unknown> = {};
  const hotelInfoRef: Record<string, unknown> = {};
   hotelInfoRef.Amenities = true;
   hotelInfoRef.LocationInfo = true;
   hotelInfoRef.PropertyTypeInfo = true;
   hotelInfoRef.PropertyQualityInfo = true;
   hotelInfoRef.SecurityFeatures = false;

  // hotelPref.POS = {
  //   Source: {
  //     PseudoCityCode: "TM61",
  //   }
  // }
  // hotelPref.CorporateNumber = "DK44391RC";
  // hotelPref.version = "4.1.0";
  if (params.hotelName && params.hotelName.length >= 3) {
    hotelPref.HotelName = params.hotelName;
  }

  if (params.chainCode) {
    hotelPref.ChainCodes = { ChainCode: [params.chainCode] };
  }

  hotelPref.SabreRating = {
    Min: params.minRating || "3.0",
    Max: params.maxRating || "5.0",
  };

  if (params.amenityCodes && params.amenityCodes.length > 0) {
    hotelPref.AmenityCodes = {
      AmenityCode: params.amenityCodes,
      Inclusive: true,
    };
  }

  return {
    GetHotelListRQ: {
      // version: "4.1.0",
      HotelPref: hotelPref,
      HotelInfoRef: hotelInfoRef,
    },
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: HotelListRequest = await request.json();
    // const token = await getToken();
    const token = await getToken();
    const sabreRequest = buildHotelListRequest(body);

    const response = await fetch(`${SABRE_BASE_URL}/v4.1.0/get/hotellist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(sabreRequest),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: "Hotel list request failed", details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch hotel list", details: String(error) },
      { status: 500 }
    );
  }
}
