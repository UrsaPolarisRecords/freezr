import PageShell from "@/components/PageShell";

export default function WalletPage() {
  return (
    <PageShell
      title="Wallet"
      description="Track your token balance and ledger history."
    >
      <div className="space-y-3 text-sm text-slate-200">
        <p>• Token balance derived from ledger entries.</p>
        <p>• Recent transactions: mint, burn, sponsorship splits.</p>
      </div>
    </PageShell>
  );
}
