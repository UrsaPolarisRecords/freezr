import PageShell from "@/components/PageShell";

export default function SponsorPage() {
  return (
    <PageShell
      title="Sponsor Message"
      description="Pay tokens to take over the sponsored slot in your current zone."
    >
      <div className="space-y-3 text-sm text-slate-200">
        <p>• Show current zone price and sponsored message.</p>
        <p>• Select a message to sponsor and confirm payment.</p>
        <p>• Zone price doubles after each takeover.</p>
      </div>
    </PageShell>
  );
}
