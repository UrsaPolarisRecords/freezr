import Link from "next/link";

const navItems = [
  { href: "/listings", label: "Listings" },
  { href: "/listings/new", label: "New Listing" },
  { href: "/messages", label: "Messages" },
  { href: "/sponsor", label: "Sponsor" },
  { href: "/feed", label: "Feed" },
  { href: "/wallet", label: "Wallet" },
  { href: "/health", label: "Health" }
];

export default function PrimaryNav() {
  return (
    <nav className="flex flex-wrap gap-3">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="rounded-full border border-slate-700 bg-slate-950/70 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-500 hover:text-white"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
