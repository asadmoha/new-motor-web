export type Category =
  | "Cruiser" | "Bobber" | "Café Racer" | "Sport" | "Touring" | "Adventure" | "Scrambler" | "Chopper";

export const CATEGORIES: Category[] = [
  "Cruiser", "Bobber", "Café Racer", "Sport", "Touring", "Adventure", "Scrambler", "Chopper",
];

export type Bike = {
  id: string;
  make: string;
  model: string;
  category: Category;
  year: number;
  country: string;
  engine: string;
  displacement: number;
  horsepower: number;
  price: number;
  mileage: number;
  description: string;
  images: BikeImage[];
};

import raw from "@/data/bikes.json";

export type BikeImage = { src: string; page: string; credit: string; license: string };

export const BIKES: Bike[] = (raw as Omit<Bike, "mileage" | "description">[]).map((b) => ({
  ...b,
  category: b.category as Category,
  mileage: b.year >= 2023 ? 0 : Math.round(((Number(b.id) * 7919) % 40000) / 100) * 100,
  description: `The ${b.year} ${b.make} ${b.model} — a genuine ${b.category.toLowerCase()} built in ${b.country}. Powered by a ${b.displacement}cc ${b.engine.toLowerCase()} engine making around ${b.horsepower} hp, this machine has been inspected, serviced and is ready for the open road.`,
}));

export const PRICE_RANGES = [
  { id: "all", label: "Any price", min: 0, max: Infinity },
  { id: "u10", label: "Under $10,000", min: 0, max: 10000 },
  { id: "10-20", label: "$10,000 – $20,000", min: 10000, max: 20000 },
  { id: "20-30", label: "$20,000 – $30,000", min: 20000, max: 30000 },
  { id: "30p", label: "$30,000+", min: 30000, max: Infinity },
] as const;

export const formatPrice = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
