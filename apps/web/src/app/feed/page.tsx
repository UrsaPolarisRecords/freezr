import PageShell from "@/components/PageShell";

export default function FeedPage() {
  return (
    <PageShell
      title="Activity Feed"
      description="See the sponsored message pinned above nearby messages and listings."
    >
      <div className="space-y-3 text-sm text-slate-200">
        <p>• Sponsored message pinned at the top.</p>
        <p>• Nearby messages and listing activity below.</p>
        <p>• Triggered on app open near listings or after verification.</p>
      </div>
    </PageShell>
  );
}
