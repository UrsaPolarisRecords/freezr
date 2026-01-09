import type { ReactNode } from "react";

interface PageShellProps {
  title: string;
  description: string;
  children?: ReactNode;
}

export default function PageShell({ title, description, children }: PageShellProps) {
  return (
    <section className="grid gap-6">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        <p className="mt-2 text-slate-300">{description}</p>
      </div>
      {children ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          {children}
        </div>
      ) : null}
    </section>
  );
}
