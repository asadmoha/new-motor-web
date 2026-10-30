import { createFileRoute, Link } from "@tanstack/react-router";

import { SiteChrome } from "@/components/SiteChrome";
import { BikeCard } from "@/components/BikeCard";
import { BIKES, CATEGORIES } from "@/lib/bikes";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Iron & Oak Motorcycle Co. — Classic Motorcycle Dealership" },
      { name: "description", content: "Browse 100 hand-picked cruisers, bobbers, café racers and more at Iron & Oak Motorcycle Co." },
      { property: "og:title", content: "Iron & Oak Motorcycle Co." },
      { property: "og:description", content: "100 hand-picked motorcycles across eight classic categories." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = BIKES.filter((b) => b.category === "Bobber").slice(0, 3);
  return (
    <SiteChrome>
      <section className="relative h-[88vh] min-h-[560px] overflow-hidden bg-ink">
        <video
          src="/hero-bobber.mp4"
          autoPlay muted loop playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 mx-auto max-w-7xl h-full px-6 flex flex-col justify-end pb-20 text-ink-foreground">
          <span className="label-caps text-brass">Since 1962 · Purveyors of fine machines</span>
          <h1 className="mt-4 text-5xl md:text-7xl max-w-3xl leading-[1.05]">
            Built for the road. <em className="text-brass">Kept for the soul.</em>
          </h1>
          <div className="mt-8 flex gap-4">
            <Link to="/bikes" className="label-caps bg-primary text-primary-foreground px-8 py-4 hover:bg-accent hover:text-accent-foreground transition">
              Enter the Showroom
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pt-20">
        <div className="text-center">
          <span className="label-caps text-primary">The Collection</span>
          <h2 className="text-4xl mt-2">Eight Categories, One Hundred Machines</h2>
        </div>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 border-t border-l border-border">
          {CATEGORIES.map((c) => (
            <Link
              key={c}
              to="/bikes"
              search={{ category: c }}
              className="border-r border-b border-border p-8 text-center hover:bg-ink hover:text-ink-foreground transition"
            >
              <p className="font-display text-2xl">{c}</p>
              <p className="label-caps text-muted-foreground mt-2">
                {BIKES.filter((b) => b.category === c).length} bikes
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pt-20">
        <div className="flex items-end justify-between">
          <h2 className="text-4xl">Featured Bobbers</h2>
          <Link to="/bikes" search={{ category: "Bobber" }} className="label-caps text-primary hover:underline">View all →</Link>
        </div>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {featured.map((b) => <BikeCard key={b.id} bike={b} />)}
        </div>
      </section>
    </SiteChrome>
  );
}
