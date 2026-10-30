import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteChrome } from "@/components/SiteChrome";
import { BikeCard } from "@/components/BikeCard";
import { BIKES, formatPrice } from "@/lib/bikes";

export const Route = createFileRoute("/bikes/$id")({
  loader: ({ params }) => {
    const bike = BIKES.find((b) => b.id === params.id);
    if (!bike) throw notFound();
    return { bike };
  },
  head: ({ loaderData }) => {
    const t = loaderData ? `${loaderData.bike.year} ${loaderData.bike.make} ${loaderData.bike.model} — Iron & Oak` : "Motorcycle not found";
    const d = loaderData?.bike.description ?? "This motorcycle is no longer available.";
    return {
      meta: [
        { title: t }, { name: "description", content: d },
        { property: "og:title", content: t }, { property: "og:description", content: d },
        { property: "og:type", content: "product" }, { name: "twitter:card", content: "summary" },
      ],
    };
  },
  notFoundComponent: () => (
    <SiteChrome>
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-4xl">This machine has left the showroom.</h1>
        <Link to="/bikes" className="label-caps text-primary mt-6 inline-block">Back to showroom</Link>
      </div>
    </SiteChrome>
  ),
  component: BikeDetail,
});

function BikeDetail() {
  const { bike } = Route.useLoaderData();
  const related = BIKES.filter((b) => b.category === bike.category && b.id !== bike.id).slice(0, 4);
  const specs: [string, string][] = [
    ["Make", bike.make], ["Model", bike.model], ["Category", bike.category],
    ["Year made", String(bike.year)], ["Country of origin", bike.country],
    ["Engine type", bike.engine], ["Displacement", `${bike.displacement} cc`],
    ["Horsepower", `${bike.horsepower} hp`],
    ["Mileage", bike.mileage === 0 ? "New" : `${bike.mileage.toLocaleString()} mi`],
  ];
  return (
    <SiteChrome>
      <section className="mx-auto max-w-5xl px-6 pt-12">
        <Link to="/bikes" className="label-caps text-muted-foreground hover:text-primary">← Showroom</Link>
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          {bike.images.map((img, i) => (
            <figure key={img.src} className="bg-card border border-border p-2">
              <img src={img.src} alt={`${bike.make} ${bike.model} photo ${i + 1}`} className="aspect-[4/3] w-full object-cover" />
              <figcaption className="mt-2 text-xs text-muted-foreground italic">
                Photo: <a href={img.page} target="_blank" rel="noreferrer" className="underline hover:text-primary">{img.credit || "Wikimedia Commons"}</a>
                {img.license ? ` · ${img.license}` : ""}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-12 grid md:grid-cols-[1.4fr_1fr] gap-12">
          <div>
            <span className="label-caps text-primary">{bike.category} · No. {bike.id}</span>
            <h1 className="text-5xl md:text-6xl mt-3 leading-tight">{bike.make}</h1>
            <p className="text-2xl italic text-muted-foreground">{bike.year} {bike.model}</p>
            <p className="mt-8 text-lg leading-relaxed first-letter:font-display first-letter:text-6xl first-letter:float-left first-letter:mr-2 first-letter:text-primary">
              {bike.description}
            </p>
          </div>
          <aside className="bg-ink text-ink-foreground p-8 self-start border-t-4 border-brass">
            <span className="label-caps text-brass">Asking price</span>
            <p className="font-display text-5xl mt-2">{formatPrice(bike.price)}</p>
            <a href={`mailto:sales@ironandoak.example?subject=Enquiry: No. ${bike.id}`} className="mt-6 block text-center label-caps bg-primary text-primary-foreground py-4 hover:bg-accent hover:text-accent-foreground transition">
              Enquire about this bike
            </a>
          </aside>
        </div>

        <h2 className="text-3xl mt-16">Details</h2>
        <dl className="mt-4 rule-double">
          {specs.map(([k, v]) => (
            <div key={k} className="grid grid-cols-2 py-3 border-b border-border">
              <dt className="label-caps text-muted-foreground self-center">{k}</dt>
              <dd className="text-right text-lg">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-7xl px-6 pt-20">
        <h2 className="text-3xl">More {bike.category}s</h2>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {related.map((b) => <BikeCard key={b.id} bike={b} />)}
        </div>
      </section>
    </SiteChrome>
  );
}
