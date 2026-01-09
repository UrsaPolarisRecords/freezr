import Link from "next/link";

const highlights = [
  {
    title: "Listings",
    description: "Browse nearby free items and see listing details.",
    href: "/listings"
  },
  {
    title: "Create Listing",
    description: "Post a free item with photos and location.",
    href: "/listings/new"
  },
  {
    title: "Messages",
    description: "Manage your promo messages and local ads.",
    href: "/messages"
  },
  {
    title: "Sponsor",
    description: "Claim the sponsored slot in your promotion zone.",
    href: "/sponsor"
  },
  {
    title: "Feed",
    description: "View sponsored messages and nearby activity.",
    href: "/feed"
  },
  {
    title: "Wallet",
    description: "Track token balance and ledger history.",
    href: "/wallet"
  }
];

export default function HomePage() {
  return (
    <section className="grid gap-6">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <h2 className="text-2xl font-semibold text-white">MVP Scaffold</h2>
        <p className="mt-2 text-slate-300">
          This is the starting point for the Freezr marketplace, verification flow, and token-driven
          sponsorship system. Use the routes below to navigate the MVP pages.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {highlights.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition hover:border-slate-600"
          >
            <h3 className="text-lg font-semibold text-white group-hover:text-sky-200">
              {item.title}
            </h3>
            <p className="mt-2 text-sm text-slate-300">{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
