import { NextRequest, NextResponse } from "next/server";
import { getToken } from "@/app/api/token/route";

const baseUrl = process.env.API_SABRE_BASE_URL || "https://api.cert.platform.sabre.com";

// Matches RevalidationKey from mapSabreBfmToUi.ts
export type RevalidateSegment = {
    marketingCarrier: string;
    operatingCarrier: string;
    flightNumber: number;
    bookingCode: string;
    origin: string;
    destination: string;
    departureDateTime: string; // ISO format: "2026-09-11T06:55:00"
    arrivalDateTime: string;
};

export type RevalidateRequest = {
    segments: RevalidateSegment[]; // One segment per leg (outbound, inbound) or per stop
    passengerType: string; // "ADT", "CNN", "INF"
    passengerCount: number;
};

type SabreFlight = {
    Type: string;
    Number: number;
    ClassOfService: string;
    DepartureDateTime: string;
    ArrivalDateTime: string;
    OriginLocation: { LocationCode: string };
    DestinationLocation: { LocationCode: string };
    Airline: {
        Marketing: string;
        Operating?: string;
    };
};

type SabreOriginDestinationInfo = {
    Fixed: boolean;
    DepartureDateTime: string;
    OriginLocation: { LocationCode: string };
    DestinationLocation: { LocationCode: string };
    TPA_Extensions: {
        Flight: SabreFlight[];
    };
};

type SabreRevalidateRequest = {
    OTA_AirLowFareSearchRQ: {
        OriginDestinationInformation: SabreOriginDestinationInfo[];
        POS: {
            Source: {
                PseudoCityCode: string;
                RequestorID: {
                    Type: string;
                    ID: string;
                    CompanyName: { Code: string };
                };
            }[];
        };
        TravelPreferences: {
            TPA_Extensions: {
                VerificationItinCallLogic: {
                    Value: string;
                };
            };
        };
        TravelerInfoSummary: {
            AirTravelerAvail: {
                PassengerTypeQuantity: {
                    Code: string;
                    Quantity: number;
                }[];
            }[];
        };
        Version: string;
    };
};

/**
 * Groups segments by leg based on connectivity.
 * Segments are part of the same leg if they connect (arrival airport = next departure airport).
 * Otherwise, they're separate legs (e.g., outbound vs inbound).
 */
function groupSegmentsByLeg(segments: RevalidateSegment[]): RevalidateSegment[][] {
    if (segments.length === 0) return [];
    if (segments.length === 1) return [[segments[0]]];

    const legs: RevalidateSegment[][] = [];
    let currentLeg: RevalidateSegment[] = [segments[0]];

    for (let i = 1; i < segments.length; i++) {
        const prevSegment = segments[i - 1];
        const currSegment = segments[i];

        // Check if this segment connects to the previous one (same airport continuation)
        // If destination of previous matches origin of current, they're part of same leg (connection)
        if (prevSegment.destination === currSegment.origin) {
            currentLeg.push(currSegment);
        } else {
            // Different leg (e.g., outbound completed, now inbound starts)
            legs.push(currentLeg);
            currentLeg = [currSegment];
        }
    }

    // Don't forget the last leg
    legs.push(currentLeg);

    return legs;
}

function buildRevalidateRequestBody(params: RevalidateRequest): SabreRevalidateRequest {
    // Group segments into legs (outbound, inbound, or multi-city)
    const legs = groupSegmentsByLeg(params.segments);

    // Build OriginDestinationInformation for each leg
    const originDestinationInformation: SabreOriginDestinationInfo[] = legs.map((legSegments) => {
        // For a leg, the origin is the first segment's origin
        // and destination is the last segment's destination
        const firstSegment = legSegments[0];
        const lastSegment = legSegments[legSegments.length - 1];

        // Build Flight array for all segments in this leg
        const flights: SabreFlight[] = legSegments.map((segment) => {
            const flight: SabreFlight = {
                Type: "A",
                Number: segment.flightNumber,
                ClassOfService: segment.bookingCode,
                DepartureDateTime: segment.departureDateTime,
                ArrivalDateTime: segment.arrivalDateTime,
                OriginLocation: { LocationCode: segment.origin },
                DestinationLocation: { LocationCode: segment.destination },
                Airline: {
                    Marketing: segment.marketingCarrier,
                },
            };

            // Only add Operating if different from Marketing
            if (segment.operatingCarrier && segment.operatingCarrier !== segment.marketingCarrier) {
                flight.Airline.Operating = segment.operatingCarrier;
            }

            return flight;
        });

        return {
            Fixed: true,
            DepartureDateTime: firstSegment.departureDateTime,
            OriginLocation: { LocationCode: firstSegment.origin },
            DestinationLocation: { LocationCode: lastSegment.destination },
            TPA_Extensions: {
                Flight: flights,
            },
        };
    });

    return {
        OTA_AirLowFareSearchRQ: {           
            OriginDestinationInformation: originDestinationInformation,
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
            TravelPreferences: {
                TPA_Extensions: {
                    VerificationItinCallLogic: {
                        Value: "L", // Required for revalidation mode
                    },
                },
            },
            TravelerInfoSummary: {
                AirTravelerAvail: [{
                    PassengerTypeQuantity: [{
                        Code: params.passengerType,
                        Quantity: params.passengerCount,
                    }],
                }],
            },
            Version: "5",
        },
    };
}

export async function POST(request: NextRequest) {
    try {
        const body: RevalidateRequest = await request.json();

        // Validate request
        if (!body.segments || body.segments.length === 0) {
            return NextResponse.json(
                { error: "At least one segment is required" },
                { status: 400 }
            );
        }

        // Get auth token
        const token = await getToken();

        // Build Sabre request
        const requestBody = buildRevalidateRequestBody(body);

        console.log("Revalidate request:", JSON.stringify(requestBody, null, 2));

        const response = await fetch(`${baseUrl}/v5/shop/flights/revalidate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Sabre revalidate failed:", response.status, errorText);
            return NextResponse.json(
                { error: "Failed to revalidate offer", details: errorText },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error revalidating offer:", error);
        return NextResponse.json(
            { error: "Error revalidating offer", details: String(error) },
            { status: 500 }
        );
    }
}
