import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SiteChrome } from "@/components/SiteChrome";
import { BikeCard } from "@/components/BikeCard";
import { BIKES, CATEGORIES, PRICE_RANGES } from "@/lib/bikes";

type Search = { category?: string | undefined; price?: string | undefined; sort?: string | undefined };

export const Route = createFileRoute("/bikes/")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    category: typeof s["category"] === "string" ? s["category"] : undefined,
    price: typeof s["price"] === "string" ? s["price"] : undefined,
    sort: typeof s["sort"] === "string" ? s["sort"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Showroom — Iron & Oak Motorcycle Co." },
      { name: "description", content: "Filter 100 motorcycles by category and price range." },
      { property: "og:title", content: "Showroom — Iron & Oak Motorcycle Co." },
      { property: "og:description", content: "Cruisers, bobbers, café racers, choppers and more." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Showroom,
});

function Showroom() {
  const { category, price = "all", sort = "price-asc" } = Route.useSearch();
  const navigate = useNavigate({ from: "/bikes/" });
  const range = PRICE_RANGES.find((r) => r.id === price) ?? PRICE_RANGES[0]!;
  const set = (patch: Search) => navigate({ search: (prev) => ({ ...prev, ...patch }) });

  const list = BIKES.filter(
    (b) => (!category || b.category === category) && b.price >= range.min && b.price < range.max,
  ).sort((a, b) =>
    sort === "price-desc" ? b.price - a.price : sort === "year-desc" ? b.year - a.year : sort === "year-asc" ? a.year - b.year : a.price - b.price,
  );

  const chip = (active: boolean) =>
    `label-caps px-4 py-2 border transition ${active ? "bg-ink text-ink-foreground border-ink" : "border-border hover:border-primary"}`;

  return (
    <SiteChrome>
      <section className="mx-auto max-w-7xl px-6 pt-16">
        <span className="label-caps text-primary">The Showroom</span>
        <h1 className="text-5xl mt-2">{category ?? "All Motorcycles"}</h1>

        <div className="mt-8 flex flex-wrap gap-2">
          <button className={chip(!category)} onClick={() => set({ category: undefined })}>All</button>
          {CATEGORIES.map((c) => (
            <button key={c} className={chip(category === c)} onClick={() => set({ category: c })}>{c}</button>
          ))}
        </div>

        <div className="mt-6 rule-double pt-6 flex flex-wrap items-center gap-4 justify-between">
          <div className="flex flex-wrap gap-2">
            {PRICE_RANGES.map((r) => (
              <button key={r.id} className={chip(price === r.id)} onClick={() => set({ price: r.id })}>{r.label}</button>
            ))}
          </div>
          <select
            value={sort}
            onChange={(e) => set({ sort: e.target.value })}
            className="label-caps bg-card border border-border px-4 py-2"
          >
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="year-desc">Year: newest</option>
            <option value="year-asc">Year: oldest</option>
          </select>
        </div>

        <p className="mt-6 italic text-muted-foreground">{list.length} machines found</p>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {list.map((b) => <BikeCard key={b.id} bike={b} />)}
        </div>
      </section>
    </SiteChrome>
  );
}
