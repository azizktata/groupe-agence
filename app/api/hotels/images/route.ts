import { NextRequest, NextResponse } from "next/server";

const SABRE_BASE_URL = process.env.API_SABRE_BASE_URL || "https://api.cert.platform.sabre.com";

export type HotelImagesRequest = {
  hotelCodes: string[];
  imageType?: "ORIGINAL" | "THUMBNAIL" | "SMALL" | "MEDIUM" | "LARGE";
  categoryCode?: number;
  languageCode?: string;
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

function buildHotelImageRequest(params: HotelImagesRequest) {
  const hotelRefs = params.hotelCodes.map((code) => ({
    HotelCode: code,
    CodeContext: "GLOBAL",
  }));

  return {
    GetHotelImageRQ: {
      version: "1.0.0",
      HotelRefs: {
        HotelRef: hotelRefs,
      },
      ImageRef: {
        Type: params.imageType || "LARGE",
        CategoryCode: params.categoryCode || 1, // 1 = Exterior
        LanguageCode: params.languageCode || "EN",
      },
    },
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: HotelImagesRequest = await request.json();

    if (!body.hotelCodes || body.hotelCodes.length === 0) {
      return NextResponse.json(
        { error: "hotelCodes array is required" },
        { status: 400 }
      );
    }

    if (body.hotelCodes.length > 300) {
      return NextResponse.json(
        { error: "Maximum 300 hotel codes allowed per request" },
        { status: 400 }
      );
    }

    // const token = await getToken();
    const token = process.env.API_SABRE_MOCK_TOKEN || "";
    const sabreRequest = buildHotelImageRequest(body);

    const response = await fetch(
      `${SABRE_BASE_URL}/v1.0.0/shop/hotels/image`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(sabreRequest),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: "Hotel images request failed", details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch hotel images", details: String(error) },
      { status: 500 }
    );
  }
}
