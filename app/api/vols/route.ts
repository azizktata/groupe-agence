import { NextRequest, NextResponse } from "next/server";
import { getToken } from "../token/route";

const SABRE_BASE_URL = process.env.API_SABRE_BASE_URL || "https://api.cert.platform.sabre.com";

export type BfmSearchRequest = {
  origin: string;           // IATA code e.g. "WAW"
  destination: string;      // IATA code e.g. "SPU"
  departureDate: string;    // "2026-09-11"
  returnDate?: string;      // "2026-09-18" (omit for one-way)
  passengers: number;       // ADT count
  cabin?: string;           // "Y" | "S" | "C" | "F"
  airline?: string;         // IATA carrier code e.g. "LO"
  maxStops?: number;        // 0 = direct, 1, 2...
  maxItineraries?: number;  // default 50
};

function buildBfmRequest(params: BfmSearchRequest) {
  // Origin/Destination legs
  const legs: Record<string, unknown>[] = [
    {
      DepartureDateTime: `${params.departureDate}T00:00:00`,
      OriginLocation: { LocationCode: params.origin },
      DestinationLocation: { LocationCode: params.destination },
    },
  ];

  // Round-trip: add return leg
  if (params.returnDate) {
    legs.push({
      DepartureDateTime: `${params.returnDate}T00:00:00`,
      OriginLocation: { LocationCode: params.destination },
      DestinationLocation: { LocationCode: params.origin },
    });
  }

  // Travel preferences
  const travelPreferences: Record<string, unknown> = {};

  if (params.maxStops !== undefined) {
    travelPreferences.MaxStopsQuantity = params.maxStops;
  }

  if (params.airline) {
    travelPreferences.VendorPref = [{ Code: params.airline }];
  }

  if (params.cabin) {
    travelPreferences.CabinPref = [{ Cabin: params.cabin }];
  }

  // Passengers
  const passengerTypes: Record<string, unknown>[] = [
    { Code: "ADT", Quantity: params.passengers },
  ];

  const maxItins = params.maxItineraries || 50;

  return {
    OTA_AirLowFareSearchRQ: {
      Version: "5",
      POS: {
        Source: [{
          PseudoCityCode: "XXXXX",
          RequestorID: {
            Type: "1",
            ID: "1",
            CompanyName: { Code: "TN" },
          },
        }],
      },
      OriginDestinationInformation: legs,
      TravelPreferences: travelPreferences,
      TravelerInfoSummary: {
        AirTravelerAvail: [{
          PassengerTypeQuantity: passengerTypes,
        }],
      },
      TPA_Extensions: {
        IntelliSellTransaction: {
          RequestType: { Name: `${maxItins}ITINS` },
        },
      },
    },
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: BfmSearchRequest = await request.json();
    const token = await getToken();
    const sabreRequest = buildBfmRequest(body);
    console.log("Received BFM search request:", JSON.stringify(body, null, 2));
    console.log("BFM request body:", JSON.stringify(sabreRequest, null, 2));

    const response = await fetch(`${SABRE_BASE_URL}/v5/offers/shop`, {
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
        { error: "BFM search failed", details: errorText, request: sabreRequest },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to search flights", details: String(error) },
      { status: 500 }
    );
  }
}
