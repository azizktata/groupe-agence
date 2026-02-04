import { NextRequest, NextResponse } from "next/server";

const SABRE_BASE_URL = process.env.API_SABRE_BASE_URL || "https://api.cert.platform.sabre.com";

export type HotelListRequest = {
  hotelName?: string;
  chainCode?: string;
  minRating?: string;
  maxRating?: string;
  amenityCodes?: number[];
};

async function getToken(): Promise<string> {
  const clientUsername = process.env.API_CLIENT_USERNAME;
  const clientPassword = process.env.API_CLIENT_PASSWORD;
  const clientId = process.env.API_CLIENT_ID;
  const clientSecret = process.env.API_CLIENT_SECRET;
  const tokenUrl =
    process.env.API_TOKEN_URL || "https://api.platform.sabre.com/v3/auth/token";

  if (!clientId || !clientSecret) {
    throw new Error("Missing API credentials");
  }

  const encodedClientId = Buffer.from(clientId).toString("base64");
  const encodedClientSecret = Buffer.from(clientSecret).toString("base64");
  const credentials = Buffer.from(
    `${encodedClientId}:${encodedClientSecret}`
  ).toString("base64");

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${credentials}`,
    },
    body: `grant_type=password&username=${clientUsername}-DEVCENTER-EXT&password=${clientPassword}`,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Token request failed: ${errorText}`);
  }

  const data = await response.json();
  return data.access_token;
}

function buildHotelListRequest(params: HotelListRequest) {
  const hotelPref: Record<string, unknown> = {};
  // hotelPref.POS = {
  //   Source: {
  //     PseudoCityCode: "TM61",
  //   }
  // }
  // hotelPref.CorporateNumber = "DK44391RC";
  hotelPref.version = "4.1.0";
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
      version: "4.1.0",
      HotelPref: hotelPref,
    },
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: HotelListRequest = await request.json();
    // const token = await getToken();
    const token = process.env.API_SABRE_MOCK_TOKEN || "";
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
