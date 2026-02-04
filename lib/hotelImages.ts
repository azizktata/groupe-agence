// Shared hotel images pool (hotel exteriors/interiors without people)
export const HOTEL_IMAGES = [
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb", // Hotel exterior
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4", // Beach resort
  "https://images.unsplash.com/photo-1445019980597-93fa8acb246c", // Hotel room view
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b", // Hotel bedroom
  "https://images.unsplash.com/photo-1564501049412-61c2a3083791", // Resort exterior
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d", // Hotel lobby
];

// Get consistent image based on hotel code (same hotel = same image everywhere)
export function getHotelImage(hotelCode: string, size: "card" | "hero" = "card"): string {
  let hash = 0;
  for (let i = 0; i < hotelCode.length; i++) {
    hash = (hash << 5) - hash + hotelCode.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % HOTEL_IMAGES.length;
  const width = size === "hero" ? 1600 : 800;
  return `${HOTEL_IMAGES[index]}?w=${width}&q=80`;
}
