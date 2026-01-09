import PageShell from "@/components/PageShell";

export default function ListingsPage() {
  return (
    <PageShell
      title="Listings Feed"
      description="Browse nearby free items with list + map views and filters."
    >
      <ul className="space-y-3 text-sm text-slate-200">
        <li>• Map/list toggle placeholder</li>
        <li>• Filters: distance, category, newest</li>
        <li>• Listing cards for nearby items</li>
      </ul>
    </PageShell>
  );
}
