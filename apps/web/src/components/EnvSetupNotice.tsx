import Link from "next/link";
import { getMissingPublicEnv } from "@/lib/env";

export default function EnvSetupNotice() {
  const missing = getMissingPublicEnv();

  if (missing.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-amber-500/70 bg-amber-500/10 p-4 text-sm text-amber-100">
      <p className="font-semibold">Supabase setup required</p>
      <p className="mt-2">
        Add the following environment variables to <code>.env.local</code> before running the app:
      </p>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        {missing.map((key) => (
          <li key={key} className="font-mono">
            {key}
          </li>
        ))}
      </ul>
      <p className="mt-3">
        See <Link href="/health" className="underline">/health</Link> after setup to confirm connectivity.
      </p>
    </div>
  );
}
