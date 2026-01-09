import PageShell from "@/components/PageShell";

export default function MessagesPage() {
  return (
    <PageShell
      title="Messages"
      description="Create and manage your local promo messages."
    >
      <div className="space-y-3 text-sm text-slate-200">
        <p>• List your existing messages here.</p>
        <p>• Create new message with optional image and link.</p>
      </div>
    </PageShell>
  );
}
