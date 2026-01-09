import PageShell from "@/components/PageShell";

export default function NewListingPage() {
  return (
    <PageShell
      title="Create Listing"
      description="Post a free item with required photos and location pin."
    >
      <ol className="space-y-3 text-sm text-slate-200">
        <li>1. Title, description, category, photos (required)</li>
        <li>2. Location pin with optional approximate privacy toggle</li>
        <li>3. Submit to create listing</li>
      </ol>
    </PageShell>
  );
}
