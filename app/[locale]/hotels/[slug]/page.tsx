import React from "react";
import {
  Star,
  Home,
  ChevronRight,
  Building2,
  Clock,
  Wifi,
  Car,
  Coffee,
  Waves,
  Dumbbell,
  Plane,
  Briefcase,
  UtensilsCrossed,
  PawPrint,
  ChefHat,
  Bath,
  Shirt,
  Check,
  Shield,
  Info,
  ArrowRight,
  Sparkles,
  BedDouble,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { ExpandableText } from "@/components/ExpandableText";
import {
  mapSabreHotelContentToUi,
  getFeaturedAmenities,
} from "@/mappers/mabSabreHotelSampleToUi";
import { mapSabreHotelsToUi } from "@/mappers/mapSabreHotelsToUi";
import { MOCK_SABRE_HOTEL_SAMPLE } from "@/mocks/hotel/sabre-hotel-sample";
import { MOCK_SABRE_HOTELS_LIST } from "@/mocks/hotel/sabre-hotel-list";
import { getHotelImage } from "@/lib/hotelImages";

// Icon mapping for amenities
const AMENITY_ICON_MAP: Record<number, React.ComponentType<{ className?: string }>> = {
  179: Wifi,
  259: Wifi,
  261: Wifi,
  227: Coffee,
  42: Car,
  54: Waves,
  71: Waves,
  48: Dumbbell,
  282: Plane,
  228: Briefcase,
  77: UtensilsCrossed,
  224: PawPrint,
  262: ChefHat,
  55: Bath,
  168: Shirt,
  96: Shirt,
};

function getAmenityIcon(code: number) {
  return AMENITY_ICON_MAP[code] || Check;
}

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

// Category badge colors
const CATEGORY_STYLES: Record<string, string> = {
  Luxury: "bg-amber-500 text-white",
  Premium: "bg-[var(--brand-primary)] text-white",
  Standard: "bg-slate-500 text-white",
};

// Hero images pool (hotel exteriors/interiors without people)
// const HERO_IMAGES = [
//   "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=80", // Hotel exterior
//   "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1600&q=80", // Beach resort
//   "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1600&q=80", // Hotel room view
//   "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&q=80", // Hotel bedroom
//   "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1600&q=80", // Resort exterior
//   "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600&q=80", // Hotel lobby
// ];

// // Get consistent random image based on hotel code
// function getHeroImage(hotelCode: string): string {
//   let hash = 0;
//   for (let i = 0; i < hotelCode.length; i++) {
//     hash = (hash << 5) - hash + hotelCode.charCodeAt(i);
//     hash |= 0;
//   }
//   const index = Math.abs(hash) % HERO_IMAGES.length;
//   return HERO_IMAGES[index];
// }

export default async function HotelDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;

  // Required before any next-intl call, or static rendering degrades.
  setRequestLocale(locale);
  const t = await getTranslations("hotelDetail");
  const th = await getTranslations("hotels");

  // Get basic hotel info from the hotel list using HotelCode (slug)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hotelsList = mapSabreHotelsToUi(MOCK_SABRE_HOTELS_LIST as any);
  const hotelBasicInfo = hotelsList.find((h) => h.id === slug);

  // Get detailed content (in production, fetch by HotelCode)
  const hotelDetails = mapSabreHotelContentToUi(MOCK_SABRE_HOTEL_SAMPLE);

  // Use basic info from list if found, otherwise fallback to details
  const name = hotelBasicInfo?.name || hotelDetails.name;
  const chain = hotelBasicInfo?.chain || hotelDetails.chain;
  const rating = hotelBasicInfo?.rating || hotelDetails.rating;

  const {
    propertyInfo,
    images,
    amenities,
    securityFeatures,
    policies,
    descriptions,
  } = hotelDetails;

  const featuredAmenities = getFeaturedAmenities(amenities);
  const categoryStyle = CATEGORY_STYLES[chain.category] || CATEGORY_STYLES.Standard;

  // Get hero image from random pool based on hotel code
  const heroImage = getHotelImage(slug, "hero");
  const galleryImages = images.slice(0, 6);

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
              <Link href="/hotels" className="hover:text-white transition-colors">
                {th("breadcrumb")}
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white font-medium truncate max-w-[200px]">
                {name}
              </span>
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
                    {chain.category === "Luxury" && <Sparkles className="w-3 h-3" />}
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
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT: Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              {galleryImages.length > 1 && (
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                  <h2 className="text-lg font-bold text-slate-900 mb-4">{t("gallery")}</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {galleryImages.map((image, index) => (
                      <div
                        key={image.id}
                        className="relative aspect-square rounded-xl overflow-hidden group"
                      >
                        <img
                          src={image.url}
                          alt={image.caption || `Photo ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {image.caption && (
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/80 to-transparent p-3">
                            <p className="text-xs text-white font-medium truncate">
                              {image.caption}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* About */}
              {descriptions.short && (
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                  <h2 className="text-lg font-bold text-slate-900 mb-4">
                    {t("about")}
                  </h2>
                  <ExpandableText text={descriptions.short} maxLines={5} />
                </div>
              )}

              {/* Property Types */}
              {propertyInfo.types.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {propertyInfo.types.map((type, index) => (
                    <span
                      key={index}
                      className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full text-xs font-medium"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              )}

              {/* Amenities */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4">
                  {t("amenities")}
                </h2>

                {/* Featured Amenities */}
                {featuredAmenities.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {featuredAmenities.map((amenity) => {
                      const IconComponent = getAmenityIcon(amenity.code);
                      return (
                        <div
                          key={amenity.code}
                          className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl"
                        >
                          <div className="w-10 h-10 bg-[var(--brand-primary)]/10 rounded-lg flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-[var(--brand-primary)]" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-900">
                              {amenity.name}
                            </p>
                            {amenity.isComplimentary && (
                              <p className="text-xs text-emerald-600 font-medium">
                                {t("free")}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* All Amenities List */}
                <div className="border-t border-slate-100 pt-4">
                  <h3 className="text-sm font-semibold text-slate-700 mb-3">
                    {t("allAmenities")}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {amenities.map((amenity) => (
                      <span
                        key={amenity.code}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                          amenity.isComplimentary
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <Check className="w-3 h-3" />
                        {amenity.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dining */}
              {descriptions.dining && (
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                  <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <UtensilsCrossed className="w-5 h-5 text-[var(--brand-primary)]" />
                    {t("dining")}
                  </h2>
                  <ExpandableText text={descriptions.dining} maxLines={4} />
                </div>
              )}

              {/* Facilities */}
              {descriptions.facilities && (
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                  <h2 className="text-lg font-bold text-slate-900 mb-4">
                    {t("facilities")}
                  </h2>
                  <ExpandableText text={descriptions.facilities} maxLines={4} />
                </div>
              )}

              {/* Security */}
              {securityFeatures.length > 0 && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
                  <h3 className="text-emerald-800 font-bold text-sm mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-600" />
                    Sécurité & Sûreté
                  </h3>
                  <ul className="space-y-2">
                    {securityFeatures.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-sm text-emerald-700"
                      >
                        <Check className="w-4 h-4 text-emerald-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* RIGHT: Sidebar */}
            <div className="space-y-6">
              {/* Booking Card */}
              <div className="bg-white z-90 rounded-3xl border border-slate-200 shadow-xl p-8 sticky top-6">
                <h3 className="text-lg font-black text-slate-900 mb-6">
                  {t("bookRoom")}
                </h3>

                {/* Check-in/Check-out Times */}
                <div className="space-y-3 mb-6">
                  {policies.checkIn && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {t("checkIn")}
                      </span>
                      <span className="font-bold text-slate-900">
                        {t("checkInFrom", { time: policies.checkIn })}
                      </span>
                    </div>
                  )}
                  {policies.checkOut && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {t("checkOut")}
                      </span>
                      <span className="font-bold text-slate-900">
                        {t("checkOutBefore", { time: policies.checkOut })}
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
                    {t("checkAvailability")}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <p className="text-[10px] text-center text-slate-400 font-medium px-4">
                    {t("ratesNote")}
                  </p>
                </div>
              </div>

              {/* Policies Info */}
              {(policies.cancellation || policies.general) && (
                <div className="bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/10 rounded-2xl p-6">
                  <h4 className="text-[var(--brand-dark)] font-bold text-sm mb-3 flex items-center gap-2">
                    <Info className="w-4 h-4 text-[var(--brand-primary)]" />
                    {t("conditions")}
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
                      <p className="text-xs text-slate-600">{policies.deposit}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Transportation */}
              {descriptions.transportation && (
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h4 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
                    <Plane className="w-4 h-4 text-[var(--brand-primary)]" />
                    {t("transport")}
                  </h4>
                  <ExpandableText
                    text={descriptions.transportation}
                    maxLines={3}
                    className="text-xs"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
