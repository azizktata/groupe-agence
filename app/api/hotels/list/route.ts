import { NextRequest, NextResponse } from "next/server";
import { getToken } from "../../token/route";

const SABRE_BASE_URL = process.env.API_SABRE_BASE_URL || "https://api.cert.platform.sabre.com";

export type HotelListRequest = {
  hotelName?: string;
  chainCode?: string;
  brandCodes?: string[];
  minRating?: string;
  maxRating?: string;
  amenityCodes?: number[];
  securityFeatureCodes?: number[];
  propertyTypeCodes?: number[];
  propertyQualityCodes?: number[];
};


function buildHotelListRequest(params: HotelListRequest) {
  // Build HotelPref matching Sabre's expected key order
  const hotelPref: Record<string, unknown> = {};

  if (params.hotelName && params.hotelName.length >= 3) {
    hotelPref.HotelName = params.hotelName;
  }

  if (params.chainCode) {
    hotelPref.ChainCodes = { ChainCode: [params.chainCode] };
  }

  if (params.brandCodes && params.brandCodes.length > 0) {
    hotelPref.BrandCodes = { BrandCode: params.brandCodes };
  }

  if (params.amenityCodes && params.amenityCodes.length > 0) {
    hotelPref.AmenityCodes = {
      Inclusive: false,
      AmenityCode: params.amenityCodes,
    };
  }

  if (params.securityFeatureCodes && params.securityFeatureCodes.length > 0) {
    hotelPref.SecurityFeatureCodes = {
      Inclusive: false,
      SecurityFeatureCode: params.securityFeatureCodes,
    };
  }

  if (params.propertyTypeCodes && params.propertyTypeCodes.length > 0) {
    hotelPref.PropertyTypeCodes = {
      Inclusive: false,
      PropertyTypeCode: params.propertyTypeCodes,
    };
  }

  if (params.propertyQualityCodes && params.propertyQualityCodes.length > 0) {
    hotelPref.PropertyQualityCodes = {
      Inclusive: false,
      PropertyQualityCode: params.propertyQualityCodes,
    };
  }

  // SabreRating last, matching the working format
  hotelPref.SabreRating = {
    Min: params.minRating || "3.0",
    Max: params.maxRating || "5.0",
  };

  return {
    GetHotelListRQ: {
      HotelPref: hotelPref,
      HotelInfoRef: {
        Amenities: false,
        LocationInfo: false,
        PropertyTypeInfo: true,
        PropertyQualityInfo: true,
        SecurityFeatures: true,
      },
    },
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: HotelListRequest = await request.json();
    // const token = await getToken();
    const token = await getToken();
    const sabreRequest = buildHotelListRequest(body);
    console.log("Sabre request body:", JSON.stringify(sabreRequest, null, 2));
    const response = await fetch(`${SABRE_BASE_URL}/v4.1.0/get/hotellist`, {
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
        { error: "Hotel list request failed", details: errorText, request: sabreRequest },
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
