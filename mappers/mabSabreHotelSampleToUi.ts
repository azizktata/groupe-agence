import { CHAIN_CODE_INFO } from "./mapSabreHotelsToUi";

// UI types for hotel detail page
export type UiHotelImage = {
  id: string;
  url: string;
  caption: string;
  category: string;
  ordinal: number;
};

export type UiHotelAmenity = {
  code: number;
  name: string;
  isComplimentary: boolean;
};

export type UiHotelPolicy = {
  checkIn: string | null;
  checkOut: string | null;
  cancellation: string | null;
  deposit: string | null;
  general: string | null;
};

export type UiHotelDescription = {
  short: string | null;
  dining: string | null;
  facilities: string | null;
  recreation: string | null;
  services: string | null;
  attractions: string | null;
  safety: string | null;
  transportation: string | null;
};

export type UiHotelLocation = {
  latitude: number | null;
  longitude: number | null;
  address: {
    line1: string | null;
    line2: string | null;
    city: string | null;
    cityCode: string | null;
    postalCode: string | null;
    country: string | null;
    countryCode: string | null;
  };
  contact: {
    phone: string | null;
    fax: string | null;
  };
};

export type UiHotelDetails = {
  id: string;
  name: string;
  chain: {
    code: string;
    name: string;
    brand: string;
    category: string;
  };
  rating: number;
  propertyInfo: {
    floors: number;
    rooms: number;
    types: string[];
    quality: string | null;
  };
  location: UiHotelLocation;
  images: UiHotelImage[];
  amenities: UiHotelAmenity[];
  securityFeatures: string[];
  policies: UiHotelPolicy;
  descriptions: UiHotelDescription;
};

// Sabre GetHotelContentRS types
type SabreText = {
  Type: string;
  value: string;
};

type SabrePolicy = {
  Text: SabreText;
};

type SabrePropertyType = {
  Code: number;
  Description: string;
};

type SabrePropertyQuality = {
  Code: number;
  Description: string;
};

type SabreAmenity = {
  Code: number;
  Description: string;
  ComplimentaryInd?: boolean;
  value?: string;
};

type SabreSecurityFeature = {
  Code: number;
  Description: string;
  value?: string;
};

type SabreDescription = {
  Text: SabreText;
};

type SabreLocationInfo = {
  Latitude?: number;
  Longitude?: number;
  Address?: {
    AddressLine1?: string;
    AddressLine2?: string;
    CityName?: {
      CityCode?: string;
      value?: string;
    };
    PostalCode?: string;
    CountryName?: {
      Code?: string;
      value?: string;
    };
  };
  Contact?: {
    Phone?: string;
    Fax?: string;
  };
};

type SabreImageCategory = {
  CategoryCode: number;
  Description: {
    Text: { Language: string; value: string }[];
  };
};

type SabreImage = {
  Url: string;
  Type: string;
  Height: number;
  Width: number;
};

type SabreMediaItem = {
  Id: string;
  Ordinal: number;
  LastModifedDate: string;
  Format: string;
  ImageItems: {
    Image: SabreImage[];
  };
  Category: SabreImageCategory;
  AdditionalInfo?: {
    Info: {
      Type: string;
      Description: {
        Text: { Language: string; value: string }[];
      };
    }[];
  };
};

type SabreHotelContentResponse = {
  GetHotelContentRS: {
    ApplicationResults: {
      status: string;
      Success?: { timeStamp: string }[];
    };
    HotelContentInfos: {
      HotelContentInfo: {
        HotelInfo: {
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
        HotelDescriptiveInfo: {
          PropertyInfo: {
            Floors: string;
            Rooms: string;
            PropertyTypeInfo?: {
              PropertyType: SabrePropertyType[];
            };
            Policies?: {
              Policy: SabrePolicy[];
            };
            PropertyQualityInfo?: {
              PropertyQuality: SabrePropertyQuality[];
            };
          };
          LocationInfo?: SabreLocationInfo;
          Amenities?: {
            Amenity: SabreAmenity[];
          };
          SecurityFeatures?: {
            SecurityFeature: SabreSecurityFeature[];
          };
          Descriptions?: {
            Description: SabreDescription[];
          };
        };
        HotelMediaInfo?: {
          MediaItems?: {
            MediaItem: SabreMediaItem[];
          };
        };
      };
    };
  };
};

// Helper to find description by type
function findDescription(
  descriptions: SabreDescription[] | undefined,
  type: string
): string | null {
  if (!descriptions) return null;
  const desc = descriptions.find((d) => d.Text.Type === type);
  return desc?.Text.value?.trim() || null;
}

// Helper to format time from HHMM to HH:MM
function formatTime(time: string | undefined): string | null {
  if (!time || time.length !== 4) return null;
  return `${time.slice(0, 2)}:${time.slice(2)}`;
}

// Helper to get caption from media item
function getCaption(mediaItem: SabreMediaItem): string {
  const captionInfo = mediaItem.AdditionalInfo?.Info?.find(
    (i) => i.Type === "CAPTION"
  );
  const captionText = captionInfo?.Description?.Text?.find(
    (t) => t.Language === "en"
  );
  return captionText?.value || "";
}

// Helper to get category name from media item
function getCategoryName(mediaItem: SabreMediaItem): string {
  const categoryText = mediaItem.Category?.Description?.Text?.find(
    (t) => t.Language === "en"
  );
  return categoryText?.value || "General";
}

/**
 * Maps Sabre GetHotelContentRS response to UI hotel details
 */
export function mapSabreHotelContentToUi(
  response: SabreHotelContentResponse
): UiHotelDetails {
  const content = response.GetHotelContentRS.HotelContentInfos.HotelContentInfo;
  const info = content.HotelInfo;
  const descriptive = content.HotelDescriptiveInfo;
  const media = content.HotelMediaInfo;

  const chainInfo = CHAIN_CODE_INFO[info.ChainCode];

  // Map policies
  const policies = descriptive.PropertyInfo?.Policies?.Policy || [];
  const checkInPolicy = policies.find((p) => p.Text.Type === "CheckIn");
  const checkOutPolicy = policies.find((p) => p.Text.Type === "CheckOut");

  // Map descriptions
  const descriptions = descriptive.Descriptions?.Description;

  // Map images
  const mediaItems = media?.MediaItems?.MediaItem || [];
  const images: UiHotelImage[] = mediaItems
    .sort((a, b) => a.Ordinal - b.Ordinal)
    .map((item) => ({
      id: item.Id,
      url: item.ImageItems.Image[0]?.Url || "",
      caption: getCaption(item),
      category: getCategoryName(item),
      ordinal: item.Ordinal,
    }))
    .filter((img) => img.url);

  // Map amenities
  const amenities: UiHotelAmenity[] = (descriptive.Amenities?.Amenity || []).map(
    (amenity) => ({
      code: amenity.Code,
      name: amenity.Description,
      isComplimentary: amenity.ComplimentaryInd === true,
    })
  );

  // Map security features
  const securityFeatures: string[] = (
    descriptive.SecurityFeatures?.SecurityFeature || []
  ).map((sf) => sf.Description);

  // Map property types
  const propertyTypes: string[] = (
    descriptive.PropertyInfo?.PropertyTypeInfo?.PropertyType || []
  ).map((pt) => pt.Description);

  // Map property quality
  const propertyQuality =
    descriptive.PropertyInfo?.PropertyQualityInfo?.PropertyQuality?.[0]
      ?.Description || null;

  // Map location info
  const locationInfo = descriptive.LocationInfo;
  const location: UiHotelLocation = {
    latitude: locationInfo?.Latitude ?? null,
    longitude: locationInfo?.Longitude ?? null,
    address: {
      line1: locationInfo?.Address?.AddressLine1 ?? null,
      line2: locationInfo?.Address?.AddressLine2 ?? null,
      city: locationInfo?.Address?.CityName?.value ?? null,
      cityCode: locationInfo?.Address?.CityName?.CityCode ?? null,
      postalCode: locationInfo?.Address?.PostalCode ?? null,
      country: locationInfo?.Address?.CountryName?.value ?? null,
      countryCode: locationInfo?.Address?.CountryName?.Code ?? null,
    },
    contact: {
      phone: locationInfo?.Contact?.Phone ?? null,
      fax: locationInfo?.Contact?.Fax ?? null,
    },
  };

  return {
    id: info.HotelCode,
    name: info.HotelName,
    chain: {
      code: info.ChainCode,
      name: info.ChainName,
      brand: chainInfo?.brand || info.ChainName,
      category: chainInfo?.category || "Standard",
    },
    rating: parseFloat(info.SabreRating) || 0,
    propertyInfo: {
      floors: parseInt(descriptive.PropertyInfo?.Floors || "0", 10),
      rooms: parseInt(descriptive.PropertyInfo?.Rooms || "0", 10),
      types: propertyTypes,
      quality: propertyQuality,
    },
    location,
    images,
    amenities,
    securityFeatures,
    policies: {
      checkIn: formatTime(checkInPolicy?.Text.value),
      checkOut: formatTime(checkOutPolicy?.Text.value),
      cancellation: findDescription(descriptions, "CancellationPolicy"),
      deposit: findDescription(descriptions, "DepositPolicy"),
      general: findDescription(descriptions, "Policies"),
    },
    descriptions: {
      short: findDescription(descriptions, "ShortDescription"),
      dining: findDescription(descriptions, "Dining"),
      facilities: findDescription(descriptions, "Facilities"),
      recreation: findDescription(descriptions, "Recreation"),
      services: findDescription(descriptions, "Services"),
      attractions: findDescription(descriptions, "Attractions"),
      safety: findDescription(descriptions, "SafetyInfo"),
      transportation: findDescription(descriptions, "TransportationInfo"),
    },
  };
}

// Amenity icon mapping for common amenities
export const AMENITY_ICONS: Record<number, string> = {
  179: "wifi", // Wireless internet
  259: "wifi", // High speed internet
  261: "wifi", // High speed wireless
  227: "coffee", // Complimentary breakfast
  42: "car", // Free parking
  54: "waves", // Indoor pool
  71: "waves", // Pool
  48: "dumbbell", // Health club
  282: "plane", // Airport shuttle
  228: "briefcase", // Business center
  77: "utensils", // Room service
  224: "paw-print", // Pets allowed
  262: "chef-hat", // Kitchenette
  55: "bath", // Hot Tub
  168: "shirt", // Laundry
  96: "shirt", // Dry cleaning
};

// Get featured amenities (most important ones to show prominently)
export function getFeaturedAmenities(amenities: UiHotelAmenity[]): UiHotelAmenity[] {
  const featuredCodes = [227, 179, 42, 71, 54, 48, 282, 228];
  return amenities
    .filter((a) => featuredCodes.includes(a.code))
    .slice(0, 6);
}
