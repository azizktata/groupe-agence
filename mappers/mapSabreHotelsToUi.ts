// Chain code mapping with brand info and typical regions
// Based on Sabre Regional Chain Code Mapping
export const CHAIN_CODE_INFO: Record<
  string,
  { brand: string; category: string; regions: string[] }
> = {
  // International Chains
  HY: { brand: "Hyatt", category: "Luxury", regions: ["Worldwide"] },
  HL: { brand: "Hilton", category: "Luxury", regions: ["Worldwide"] },
  SI: { brand: "Sheraton", category: "Premium", regions: ["Worldwide"] },
  MA: { brand: "Marriott", category: "Premium", regions: ["Worldwide"] },
  MC: { brand: "Marriott", category: "Premium", regions: ["Worldwide"] },
  RA: { brand: "Radisson", category: "Premium", regions: ["Worldwide"] },
  FS: { brand: "Four Seasons", category: "Luxury", regions: ["Worldwide"] },
  RZ: { brand: "Ritz-Carlton", category: "Luxury", regions: ["Worldwide"] },
  W: { brand: "W Hotels", category: "Luxury", regions: ["Worldwide"] },
  // Regional Chains
  AA: { brand: "Accor", category: "Premium", regions: ["Côte d'Ivoire", "Africa", "Europe"] },
  RT: { brand: "Rotana", category: "Premium", regions: ["UAE", "Middle East"] },
  EK: { brand: "Rotana", category: "Premium", regions: ["UAE", "Middle East"] },
  JU: { brand: "Jumeirah", category: "Luxury", regions: ["UAE", "Dubai"] },
  MS: { brand: "Mövenpick", category: "Premium", regions: ["Egypt", "Middle East"] },
  HI: { brand: "Hilton", category: "Luxury", regions: ["Egypt", "Middle East"] },
};

// Extract location from hotel name (common patterns)
function extractLocationFromName(hotelName: string): string | null {
  // Common location patterns in hotel names
  const locationPatterns = [
    // City/Region after brand name
    /(?:Hyatt|Hilton|Marriott|Sheraton|Sofitel|Radisson|Rotana|Jumeirah|Four Seasons|Ritz-Carlton|W Hotel|Park Hyatt|Grand Hyatt|Hyatt Regency|Hyatt Ziva|Hyatt Place)\s+(.+?)(?:\s+(?:Resort|Hotel|Spa|All-inclusive|Beach|Bay|City|Airport))?$/i,
    // Location before "Resort" or "Hotel"
    /^(.+?)\s+(?:Resort|Hotel|Spa)/i,
  ];

  for (const pattern of locationPatterns) {
    const match = hotelName.match(pattern);
    if (match && match[1]) {
      // Clean up the location string
      let location = match[1]
        .replace(/\s+(Resort|Hotel|Spa|All-inclusive|And|Beach|Bay|City)$/gi, "")
        .trim();

      // If still too long or contains "And", try to extract just the city
      if (location.length > 30 || location.toLowerCase().includes(" and ")) {
        const parts = location.split(/\s+/);
        // Take last 2-3 words as likely location
        location = parts.slice(-2).join(" ");
      }

      return location || null;
    }
  }
  return null;
}

// UI types for hotels
export type UiHotel = {
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
  image: string | null; // null when images haven't loaded yet
  sabreCode: string;
};

// Sabre GetHotelListRS types
type SabreHotelInfo = {
  HotelCode: string;
  CodeContext: string;
  HotelName: string;
  ChainCode: string;
  ChainName: string;
  BrandCode?: string;
  BrandName?: string;
  SabreRating: string;
  SabreHotelCode: string;
};

type SabreHotelListResponse = {
  GetHotelListRS?: {
    ApplicationResults?: {
      status: string;
    };
    HotelInfos?: {
      MaxSearchResults?: number;
      HotelInfo?: SabreHotelInfo[];
    };
  };
};

// Sabre GetHotelImageRS types
type SabreImageItem = {
  Id: string;
  Ordinal: number;
  Format: string;
  Image: {
    Url: string;
    Type: string;
    Height?: number;
    Width?: number;
  };
};

type SabreHotelImageInfo = {
  HotelInfo: {
    HotelCode: string;
    CodeContext: string;
    ChainCode?: string;
    Logo?: string;
  };
  ImageItem?: SabreImageItem | SabreImageItem[];
};

type SabreHotelImageResponse = {
  GetHotelImageRS?: {
    ApplicationResults?: {
      status: string;
    };
    HotelImageInfos?: {
      HotelImageInfo?: SabreHotelImageInfo[];
    };
  };
};

// Image map type for merging
export type HotelImageMap = Record<string, string>;

/**
 * Maps Sabre GetHotelListRS response to UI hotel objects
 * Images will be null initially - use mergeHotelImages to add them
 */
export function mapSabreHotelsToUi(response: SabreHotelListResponse, mockResponse: SabreHotelListResponse): UiHotel[] {
  const hotelList = response?.GetHotelListRS?.HotelInfos?.HotelInfo || mockResponse?.GetHotelListRS?.HotelInfos?.HotelInfo || [];

  return hotelList.map((hotel) => {
    const chainInfo = CHAIN_CODE_INFO[hotel.ChainCode];
    const location = extractLocationFromName(hotel.HotelName);

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
      image: null, // Images loaded separately
      sabreCode: hotel.SabreHotelCode,
    };
  });
}

/**
 * Extracts hotel codes from the list response for the images API call
 */
export function extractHotelCodes(response: SabreHotelListResponse): string[] {
  const hotelList = response?.GetHotelListRS?.HotelInfos?.HotelInfo || [];
  return hotelList.map((hotel) => hotel.HotelCode);
}

/**
 * Maps Sabre GetHotelImageRS response to a lookup map (HotelCode -> ImageUrl)
 */
export function mapSabreImagesToMap(response: SabreHotelImageResponse): HotelImageMap {
  const imageInfos = response?.GetHotelImageRS?.HotelImageInfos?.HotelImageInfo || [];
  const imageMap: HotelImageMap = {};

  for (const info of imageInfos) {
    const hotelCode = info.HotelInfo?.HotelCode;
    if (!hotelCode) continue;

    // ImageItem can be a single object or an array
    const imageItems = Array.isArray(info.ImageItem)
      ? info.ImageItem
      : info.ImageItem
        ? [info.ImageItem]
        : [];

    // Get the first image URL (sorted by ordinal if available)
    const sortedImages = imageItems.sort((a, b) => (a.Ordinal || 0) - (b.Ordinal || 0));
    const primaryImage = sortedImages[0];

    if (primaryImage?.Image?.Url) {
      imageMap[hotelCode] = primaryImage.Image.Url;
    }
  }

  return imageMap;
}

/**
 * Merges image URLs into hotel objects
 * Returns a new array with updated image fields
 */
export function mergeHotelImages(hotels: UiHotel[], imageMap: HotelImageMap): UiHotel[] {
  return hotels.map((hotel) => ({
    ...hotel,
    image: imageMap[hotel.id] || hotel.image,
  }));
}

/**
 * Placeholder image for hotels without images
 */
export const HOTEL_PLACEHOLDER_IMAGE = "/hotel-placeholder.jpg";

/**
 * Gets display image - returns placeholder if no image available
 */
export function getHotelDisplayImage(hotel: UiHotel): string {
  return hotel.image || HOTEL_PLACEHOLDER_IMAGE;
}
