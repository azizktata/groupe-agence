// Mock vehicle inventory for the /voitures search results.
// `type` values match the VEHICLE_TYPES codes in components/CarSearchForm.tsx,
// which is what makes the client-side filter a direct equality check.

export type UiVehicle = {
  id: string;
  name: string;
  type: "ECONOMY" | "SEDAN" | "SUV" | "MINIBUS" | "LUXURY";
  typeLabel: string;
  seats: number;
  transmission: "Manuelle" | "Automatique";
  luggage: number;
  withDriver: boolean;
  image: string;
};

export const MOCK_VEHICLES: UiVehicle[] = [
  {
    id: "veh-1",
    name: "Volkswagen Polo",
    type: "ECONOMY",
    typeLabel: "Économique",
    seats: 5,
    transmission: "Manuelle",
    luggage: 2,
    withDriver: false,
    image:
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80",
  },
  {
    id: "veh-2",
    name: "Volkswagen Golf",
    type: "ECONOMY",
    typeLabel: "Économique",
    seats: 5,
    transmission: "Automatique",
    luggage: 2,
    withDriver: false,
    image:
      "https://images.unsplash.com/photo-1471444928139-48c5bf5173f8?w=800&q=80",
  },
  {
    id: "veh-3",
    name: "Audi RS6",
    type: "SEDAN",
    typeLabel: "Berline",
    seats: 5,
    transmission: "Automatique",
    luggage: 3,
    withDriver: false,
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
  },
  {
    id: "veh-4",
    name: "Mercedes Classe E",
    type: "SEDAN",
    typeLabel: "Berline",
    seats: 4,
    transmission: "Automatique",
    luggage: 3,
    withDriver: true,
    image:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80",
  },
  {
    id: "veh-5",
    name: "Honda CR-V",
    type: "SUV",
    typeLabel: "SUV",
    seats: 5,
    transmission: "Automatique",
    luggage: 4,
    withDriver: false,
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80",
  },
  {
    id: "veh-6",
    name: "Tesla Model Y",
    type: "SUV",
    typeLabel: "SUV",
    seats: 5,
    transmission: "Automatique",
    luggage: 4,
    withDriver: false,
    image:
      "https://images.unsplash.com/photo-1600661653561-629509216228?w=800&q=80",
  },
  {
    id: "veh-7",
    name: "Volkswagen Transporter",
    type: "MINIBUS",
    typeLabel: "Minibus",
    seats: 9,
    transmission: "Manuelle",
    luggage: 6,
    withDriver: true,
    image:
      "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800&q=80",
  },
  {
    id: "veh-8",
    name: "BMW Série 7",
    type: "LUXURY",
    typeLabel: "Luxe",
    seats: 5,
    transmission: "Automatique",
    luggage: 3,
    withDriver: true,
    image:
      "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&q=80",
  },
  {
    id: "veh-9",
    name: "Porsche Panamera",
    type: "LUXURY",
    typeLabel: "Luxe",
    seats: 4,
    transmission: "Automatique",
    luggage: 2,
    withDriver: false,
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
  },
];
