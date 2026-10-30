import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-ink text-ink-foreground border-b-4 border-brass">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex flex-col leading-none">
            <span className="font-display text-2xl tracking-wide">Iron &amp; Oak</span>
            <span className="label-caps text-brass text-[0.6rem]">Motorcycle Co. · Est. 1962</span>
          </Link>
          <nav className="flex gap-8 label-caps">
            <Link to="/" className="hover:text-brass" activeOptions={{ exact: true }} activeProps={{ className: "text-brass" }}>Home</Link>
            <Link to="/bikes" className="hover:text-brass" activeProps={{ className: "text-brass" }}>Showroom</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="bg-ink text-ink-foreground mt-24">
        <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row justify-between gap-4">
          <p className="font-display text-xl">Iron &amp; Oak Motorcycle Co.</p>
          <p className="label-caps text-brass">Hand-picked machines since 1962</p>
        </div>
      </footer>
    </div>
  );
}
