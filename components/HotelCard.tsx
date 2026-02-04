import React from "react";
import { UiHotel } from "@/mappers/mapSabreHotelsToUi";
import { Star, MapPin, Building2, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getHotelImage } from "@/lib/hotelImages";

type HotelCardProps = {
  hotel: UiHotel;
  isImageLoading?: boolean;
};

// Category badge colors
const CATEGORY_STYLES: Record<string, string> = {
  Luxury: "bg-amber-500/90 text-white",
  Premium: "bg-[var(--brand-primary)]/90 text-white",
  Standard: "bg-slate-500/90 text-white",
};

// Hotel card images pool (hotel exteriors/interiors without people)
// const HOTEL_CARD_IMAGES = [
//   "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
//   "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
//   "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80",
//   "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
//   "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
//   "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
//   "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
//   "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
// ];

// // Get consistent random image based on hotel code
// function getHotelCardImage(hotelCode: string): string {
//   let hash = 0;
//   for (let i = 0; i < hotelCode.length; i++) {
//     hash = (hash << 5) - hash + hotelCode.charCodeAt(i);
//     hash |= 0;
//   }
//   const index = Math.abs(hash) % HOTEL_CARD_IMAGES.length;
//   return HOTEL_CARD_IMAGES[index];
// }

const HotelCard = ({ hotel, isImageLoading = false }: HotelCardProps) => {
  const displayImage = getHotelImage(hotel.id, "card");

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: fullStars }, (_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
        ))}
        {rating % 1 !== 0 && (
          <Star className="w-3.5 h-3.5 fill-amber-400/50 text-amber-400" />
        )}
      </div>
    );
  };

  const categoryStyle = CATEGORY_STYLES[hotel.chain.category] || CATEGORY_STYLES.Standard;

  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-xl hover:border-[var(--brand-primary)]/30 transition-all duration-300 overflow-hidden group">
      {/* Image Section */}
      <div className="relative w-full h-48 overflow-hidden">
        {isImageLoading ? (
          <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse flex items-center justify-center">
            <Building2 className="w-12 h-12 text-slate-300" />
          </div>
        ) : (
          <>
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              src={displayImage}
              alt={hotel.name}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/hotel-placeholder.jpg";
              }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
          </>
        )}

        {/* Top badges row */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
          {/* Brand Badge */}
          <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-[var(--brand-primary)] px-3 py-1.5 rounded-full text-xs font-bold shadow-sm">
            <Building2 className="w-3 h-3" />
            {hotel.chain.brand}
          </span>

          {/* Category Badge */}
          <span className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide shadow-sm backdrop-blur-sm ${categoryStyle}`}>
            {hotel.chain.category === "Luxury" && <Sparkles className="w-3 h-3" />}
            {hotel.chain.category}
          </span>
        </div>

        {/* Rating Badge - positioned on image */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
            {renderStars(hotel.rating)}
            <span className="text-xs font-bold text-slate-700">
              {hotel.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Hotel Name */}
        <h2
          className="font-bold text-lg text-slate-900 mb-2 line-clamp-2 leading-tight group-hover:text-[var(--brand-primary)] transition-colors"
          title={hotel.name}
        >
          {hotel.name}
        </h2>

        {/* Location */}
        {hotel.location && (
          <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-4">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{hotel.location}</span>
          </div>
        )}

        {/* No location fallback */}
        {!hotel.location && (
          <div className="flex items-center gap-1.5 text-slate-400 text-sm mb-4">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate italic">Destination de rêve</span>
          </div>
        )}

        {/* Action Button */}
        <Button
          asChild
          size="default"
          rounded="xl"
          className="w-full shadow-lg shadow-[var(--brand-primary)]/20 active:scale-[0.98]"
        >
          <Link href={`/hotels/${hotel.id}`}>
            Voir les détails
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>

      {/* Footer Meta */}
      <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <p className="text-slate-400 text-[10px] uppercase tracking-wide font-medium">
          {hotel.chain.code} • {hotel.sabreCode}
        </p>
        <p className="text-slate-400 text-[10px] uppercase tracking-wide font-medium">
          {hotel.chain.name.split(" ").slice(0, 2).join(" ")}
        </p>
      </div>
    </div>
  );
};

export default HotelCard;
