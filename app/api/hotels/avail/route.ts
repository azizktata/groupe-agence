import { NextRequest, NextResponse } from "next/server";
import { getToken } from "../../token/route";
import { Search } from "lucide-react";

const SABRE_BASE_URL = process.env.API_SABRE_BASE_URL || "https://api.cert.platform.sabre.com";

export type HotelAvailRequest = {
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


function buildHotelAvailRequest(params: HotelAvailRequest) {
  
}
// request: NextRequest
export async function POST() {
  try {
    // const body: HotelListRequest = await request.json();
    // const token = await getToken();
    const token = await getToken();
    // const sabreRequest = buildHotelListRequest(body);
    const sabreRequest = {
      GetHotelAvailRQ: {
        SearchCriteria: {
          Offset: 1,
          SortBy: "NegotiatedRateAvailability",
          SortOrder: "ASC",
          PageSize: 40,
        },
      },
    }
    const response = await fetch(`${SABRE_BASE_URL}/v5/get/hotelavail`, {
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
