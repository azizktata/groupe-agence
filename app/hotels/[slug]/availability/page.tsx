import React from "react";
import {
  Star,
  Home,
  ChevronRight,
  Building2,
  Clock,
  ArrowLeft,
  Sparkles,
  BedDouble,
  Layers,
  MapPin,
  Phone,
  Plane,
  Info,
} from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ExpandableText } from "@/components/ExpandableText";
import {
  mapSabreHotelContentToUi,
  UiHotelDetails,
} from "@/mappers/mabSabreHotelSampleToUi";
import { MOCK_SABRE_HOTEL_SAMPLE } from "@/mocks/hotel/sabre-hotel-sample";
import { getHotelImage } from "@/lib/hotelImages";
import HotelRoomsSection from "@/components/HotelRoomsSection";
import { Button } from "@/components/ui/button";
import {
  mapSabreHotelAvailToUi,
  UiRoomAvail,
} from "@/mappers/mapSabreHotelAvailToUi";
import { MOCK_SABRE_HOTEL_AVAIL_RESPONSE } from "@/mocks/hotel/sabre-hotel-avail";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

async function fetchHotelContent(
  hotelCode: string,
): Promise<UiHotelDetails | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/hotels/content`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hotelCode }),
      cache: "no-store",
    });
    if (!response.ok) {
      console.error("Hotel content API failed:", response.status);
      return null;
    }

    const data = await response.json();
    if (
      !data ||
      !data.GetHotelContentRS ||
      !data.GetHotelContentRS.HotelContentInfos
    ) {
      console.error("Invalid hotel content response:", data);
      return null;
    }
    return mapSabreHotelContentToUi(data);
  } catch (error) {
    console.error("Error fetching hotel content:", error);
    return null;
  }
}

async function fetchHotelAvail(
  hotelCode: string,
  startDate: string,
  endDate: string,
  rooms: { index: number; adults: number; children?: number; childAges?: string }[],
): Promise<UiRoomAvail[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/hotels/avail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hotelCodes: [hotelCode],
        startDate,
        endDate,
        currencyCode: "USD",
        bestOnly: "2",
        rooms,
        sortBy: "AverageNightlyRate",
        sortOrder: "ASC",
        pageSize: 10,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Hotel avail API failed:", response.status);
      return [];
    }

    const data = await response.json();
    let mapped = mapSabreHotelAvailToUi(data);

    // Fallback to mock if API returns no results
    if (mapped.length === 0) {
      console.warn("No avail results from API, using mock data");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mapped = mapSabreHotelAvailToUi(MOCK_SABRE_HOTEL_AVAIL_RESPONSE as any);
    }

    const hotelData = mapped.find((h) => h.id === hotelCode);
    return hotelData?.rooms || (mapped.length > 0 ? mapped[0].rooms : []);
  } catch (error) {
    console.error("Error fetching hotel avail:", error);
    return [];
  }
}

// Category badge colors
const CATEGORY_STYLES: Record<string, string> = {
  Luxury: "bg-amber-500 text-white",
  Premium: "bg-[var(--brand-primary)] text-white",
  Standard: "bg-slate-500 text-white",
};

function renderStars(rating: number) {
  const fullStars = Math.floor(rating);
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: fullStars }, (_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
      {rating % 1 !== 0 && (
        <Star className="w-4 h-4 fill-amber-400/50 text-amber-400" />
      )}
    </div>
  );
}

export default async function HotelAvailabilityPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ startDate?: string; endDate?: string; rooms?: string }>;
}) {
  const { slug } = await params;
  const query = await searchParams;

  // Fetch hotel content for banner and sidebar data
  const apiHotelDetails = await fetchHotelContent(slug);
  const hotelDetails =
    apiHotelDetails || mapSabreHotelContentToUi(MOCK_SABRE_HOTEL_SAMPLE);

  // Fetch hotel availability if search params are present
  let availRooms: UiRoomAvail[] = [];
  if (query.startDate && query.endDate) {
    let roomParams = [{ index: 1, adults: 2 }];
    if (query.rooms) {
      try {
        roomParams = JSON.parse(query.rooms);
      } catch {
        console.error("Failed to parse rooms param");
      }
    }
    availRooms = await fetchHotelAvail(slug, query.startDate, query.endDate, roomParams);
  }

  const name = hotelDetails.name;
  const chain = hotelDetails.chain;
  const rating = hotelDetails.rating;

  const { propertyInfo, location, images, policies, descriptions } =
    hotelDetails;

  const categoryStyle =
    CATEGORY_STYLES[chain.category] || CATEGORY_STYLES.Standard;
  const galleryImages = images.slice(0, 6);
  const heroImage =
    galleryImages.length > 0
      ? galleryImages[0].url
      : getHotelImage(slug, "hero");

  return (
    <>
      <Header />

      <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
        {/* HERO SECTION */}
        <div className="relative w-full overflow-hidden">
          <img
            src={heroImage}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-slate-900/20"></div>

          <div className="relative max-w-6xl mx-auto px-6 py-16 md:pt-24 md:pb-16">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-white/80 text-sm mb-6">
              <Link href="/" className="hover:text-white transition-colors">
                <Home className="w-4 h-4" />
              </Link>
              <ChevronRight className="w-3 h-3" />
              <Link
                href="/hotels"
                className="hover:text-white transition-colors"
              >
                Hôtels
              </Link>
              <ChevronRight className="w-3 h-3" />
              <Link
                href={`/hotels/${slug}`}
                className="hover:text-white transition-colors"
              >
                {name}
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white font-medium">Disponibilités</span>
            </nav>

            {/* Hotel Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 bg-white/90 text-[var(--brand-primary)] px-3 py-1.5 rounded-full text-xs font-bold">
                    <Building2 className="w-3 h-3" />
                    {chain.brand}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${categoryStyle}`}
                  >
                    {chain.category === "Luxury" && (
                      <Sparkles className="w-3 h-3" />
                    )}
                    {chain.category}
                  </span>
                  {propertyInfo.quality && (
                    <span className="bg-white/20 text-white px-2.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide">
                      {propertyInfo.quality}
                    </span>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  {name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-white/90 px-3 py-1.5 rounded-full">
                    {renderStars(rating)}
                    <span className="text-sm font-bold text-slate-700">
                      {rating.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <BedDouble className="w-4 h-4" />
                    <span>{propertyInfo.rooms} chambres</span>
                    <span className="mx-1">•</span>
                    <Layers className="w-4 h-4" />
                    <span>{propertyInfo.floors} étages</span>
                  </div>
                </div>
              </div>

              {/* Back to details link */}
              <Link
                href={`/hotels/${slug}`}
                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Retour aux détails
              </Link>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT: Rooms */}
            <div className="lg:col-span-2 space-y-8">
              <HotelRoomsSection hotelId={slug} initialRooms={availRooms} />
            </div>

            {/* RIGHT: Sidebar */}
            <div className="space-y-6">
              {/* Booking Card */}
              <div className="bg-white z-90 rounded-3xl border border-slate-200 shadow-xl p-8 sticky top-6">
                <h3 className="text-lg font-black text-slate-900 mb-6">
                  Réserver une chambre
                </h3>

                {/* Check-in/Check-out Times */}
                <div className="space-y-3 mb-6">
                  {policies.checkIn && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Arrivée
                      </span>
                      <span className="font-bold text-slate-900">
                        À partir de {policies.checkIn}
                      </span>
                    </div>
                  )}
                  {policies.checkOut && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Départ
                      </span>
                      <span className="font-bold text-slate-900">
                        Avant {policies.checkOut}
                      </span>
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-100 pt-6 space-y-3">
                  <Button
                    size="lg"
                    rounded="xl"
                    className="w-full shadow-lg shadow-[var(--brand-primary)]/20 active:scale-[0.98]"
                  >
                    Réserver
                  </Button>
                  <p className="text-[10px] text-center text-slate-400 font-medium px-4">
                    Sélectionnez une chambre et un tarif ci-dessus
                  </p>
                </div>
              </div>

              {/* Location & Contact */}
              {(location.address.line1 || location.contact.phone) && (
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h4 className="font-bold text-sm text-slate-900 mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[var(--brand-primary)]" />
                    Adresse & Contact
                  </h4>

                  {/* Address */}
                  {location.address.line1 && (
                    <div className="space-y-1 mb-4">
                      <p className="text-sm text-slate-700">
                        {location.address.line1}
                      </p>
                      {location.address.line2 && (
                        <p className="text-sm text-slate-600">
                          {location.address.line2}
                        </p>
                      )}
                      <p className="text-sm text-slate-600">
                        {[
                          location.address.postalCode,
                          location.address.city,
                          location.address.country,
                        ]
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                    </div>
                  )}

                  {/* Contact */}
                  {(location.contact.phone || location.contact.fax) && (
                    <div className="border-t border-slate-100 pt-3 space-y-2">
                      {location.contact.phone && (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-slate-400" />
                          <a
                            href={`tel:${location.contact.phone.replace(/\s/g, "")}`}
                            className="text-[var(--brand-primary)] hover:underline"
                          >
                            {location.contact.phone}
                          </a>
                        </div>
                      )}
                      {location.contact.fax && (
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <span className="text-xs font-medium">Fax:</span>
                          {location.contact.fax}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Map Link */}
                  {location.latitude && location.longitude && (
                    <a
                      href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 flex items-center justify-center gap-2 w-full py-2 px-4 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium text-slate-700 transition-colors"
                    >
                      <MapPin className="w-4 h-4" />
                      Voir sur la carte
                    </a>
                  )}
                </div>
              )}

              {/* Policies Info */}
              {(policies.cancellation || policies.general) && (
                <div className="bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/10 rounded-2xl p-6">
                  <h4 className="text-[var(--brand-dark)] font-bold text-sm mb-3 flex items-center gap-2">
                    <Info className="w-4 h-4 text-[var(--brand-primary)]" />
                    Conditions
                  </h4>
                  <div className="space-y-3">
                    {policies.cancellation && (
                      <ExpandableText
                        text={policies.cancellation}
                        maxLines={3}
                        className="text-xs"
                      />
                    )}
                    {policies.general && (
                      <ExpandableText
                        text={policies.general}
                        maxLines={3}
                        className="text-xs"
                      />
                    )}
                    {policies.deposit && (
                      <p className="text-xs text-slate-600">
                        {policies.deposit}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
