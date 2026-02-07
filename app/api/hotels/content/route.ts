import { NextRequest, NextResponse } from "next/server";
import { getToken } from "../../token/route";

const SABRE_BASE_URL = process.env.API_SABRE_BASE_URL || "https://api.cert.platform.sabre.com";

export type HotelContentRequest = {
    hotelCode: string;
};

type SabreHotelContentRequest = {
    GetHotelContentRQ: {
        // POS: {
        //     Source: {
        //         PseudoCityCode: string;
        //     }
        // },
        SearchCriteria: {
            HotelRefs: {
                HotelRef: {
                    HotelCode: string;
                    CodeContext: string; //"GLOBAL"  optional enum sabre and global
                }
            },
            DescriptiveInfoRef: {
                PropertyInfo: boolean; // true
                LocationInfo: boolean; // true
                Amenities: boolean; // true
                Descriptions: {
                    Description: {
                        Type: string; //"ShortDescription" for short, "Dining", "Facilities", 'Services', 'TransportationInfo // give me these
                    }[];
                },
                SecurityFeatures: boolean; // true
            },
            MediaRef: {
                MaxItems: string; // 10
                MediaTypes: {
                    Images: {
                        Image: {
                            Type: string; //"Large" for large images, "Small" for small images
                        }[];
                    }
                }
            }
        }
    };
};

function buildHotelContentRequest(params: HotelContentRequest): SabreHotelContentRequest  {
    return {
        GetHotelContentRQ: {
            // POS: {
            //     Source: {
            //         PseudoCityCode: "XXXXX", // TODO: replace with actual PCC
            //     }
            // },
            SearchCriteria: {
                HotelRefs: {
                    HotelRef: {
                        HotelCode: params.hotelCode,
                        CodeContext: "GLOBAL",
                    }
                },
                DescriptiveInfoRef: {
                    PropertyInfo: true,
                    LocationInfo: true,
                    Amenities: true,
                    Descriptions: {
                        Description: [
                            { Type: "ShortDescription" },
                            { Type: "Dining" },
                            { Type: "Facilities" },
                            { Type: "Services" },
                            { Type: "TransportationInfo" },
                        ]
                    },
                    SecurityFeatures: true,
                },
                MediaRef: {
                    MaxItems: "10",
                    MediaTypes: {
                        Images: {
                            Image: [
                                { Type: "LARGE" },
                                { Type: "SMALL" },
                            ],
                        }
                    }
                }
            }
        }
    }
};

export async function POST(request: NextRequest) {
    const params: HotelContentRequest = await request.json();
    const token = await getToken();
    const sabreRequest = buildHotelContentRequest(params);
    console.log("Sabre Hotel Content Request:", JSON.stringify(sabreRequest, null, 2));
    try {
        const response = await fetch(`${SABRE_BASE_URL}/v4.0.0/get/hotelcontent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(sabreRequest),
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Sabre API error:", errorData);
            return NextResponse.json({ error: "Failed to fetch hotel content" }, { status: 500 });
        }
        const data = await response.json();
        console.log("Sabre Hotel Content Response:", JSON.stringify(data, null, 2));
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching hotel content:", error);
        return NextResponse.json({ error: "Error fetching hotel content" }, { status: 500 });
    }
}