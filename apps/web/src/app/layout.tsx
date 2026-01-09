import "./globals.css";
import type { Metadata } from "next";
import EnvSetupNotice from "@/components/EnvSetupNotice";
import PrimaryNav from "@/components/PrimaryNav";

export const metadata: Metadata = {
  title: "Freezr",
  description: "Free stuff listings with tokenized local message promotion."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-6">
          <header className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                Freezr MVP
              </p>
              <h1 className="text-3xl font-semibold text-white">Free Stuff + Local Promotion</h1>
              <p className="mt-2 text-slate-300">
                Marketplace listings, pickup verification, and token-powered sponsored messages.
              </p>
            </div>
            <PrimaryNav />
          </header>
          <div className="mt-6">
            <EnvSetupNotice />
          </div>
          <main className="mt-8 flex-1">{children}</main>
          <footer className="mt-12 text-sm text-slate-500">
            Built for the MVP scaffold · Next.js + Tailwind
          </footer>
        </div>
      </body>
    </html>
  );
}
