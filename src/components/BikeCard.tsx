import { Link } from "@tanstack/react-router";
import { type Bike, formatPrice } from "@/lib/bikes";

export function BikeCard({ bike }: { bike: Bike }) {
  return (
    <Link
      to="/bikes/$id"
      params={{ id: bike.id }}
      className="group block bg-card border border-border transition hover:border-primary hover:-translate-y-0.5"
    >
      <div className="aspect-[4/3] overflow-hidden bg-muted border-b border-border">
        <img
          src={bike.images[0]?.src}
          alt={`${bike.year} ${bike.make} ${bike.model}`}
          loading="lazy"
          className="h-full w-full object-cover sepia-[.15] transition duration-500 group-hover:scale-105 group-hover:sepia-0"
        />
      </div>
      <div className="p-6">
      <div className="flex justify-between items-start">
        <span className="label-caps text-primary">{bike.category}</span>
        <span className="label-caps text-muted-foreground">No. {bike.id}</span>
      </div>
      <h3 className="mt-4 text-2xl leading-tight group-hover:text-primary">{bike.make}</h3>
      <p className="italic text-muted-foreground">{bike.model}</p>
      <dl className="mt-5 rule-double pt-4 grid grid-cols-2 gap-y-2 text-sm">
        <dt className="text-muted-foreground">Year</dt><dd className="text-right">{bike.year}</dd>
        <dt className="text-muted-foreground">Country</dt><dd className="text-right">{bike.country}</dd>
        <dt className="text-muted-foreground">Engine</dt><dd className="text-right">{bike.displacement}cc</dd>
      </dl>
      <p className="mt-5 font-display text-2xl text-primary">{formatPrice(bike.price)}</p>
      </div>
    </Link>
  );
}
