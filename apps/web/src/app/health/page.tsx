import PageShell from "@/components/PageShell";
import { getMissingPublicEnv } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase";

function isExpectedSchemaError(message: string | null) {
  if (!message) {
    return false;
  }

  return message.toLowerCase().includes("does not exist");
}

export default async function HealthPage() {
  const missing = getMissingPublicEnv();

  if (missing.length > 0) {
    return (
      <PageShell
        title="Health Check"
        description="Supabase connectivity status for the MVP scaffold."
      >
        <div className="space-y-2 text-sm text-amber-100">
          <p className="font-semibold text-amber-200">NOT OK</p>
          <p>Missing required environment variables:</p>
          <ul className="list-disc space-y-1 pl-5 font-mono">
            {missing.map((key) => (
              <li key={key}>{key}</li>
            ))}
          </ul>
        </div>
      </PageShell>
    );
  }

  const supabase = createServerSupabaseClient();

  try {
    const { error } = await supabase.from("health_check").select("id").limit(1);
    const reachable = !error || isExpectedSchemaError(error.message);

    if (!reachable) {
      return (
        <PageShell
          title="Health Check"
          description="Supabase connectivity status for the MVP scaffold."
        >
          <div className="space-y-2 text-sm text-rose-200">
            <p className="font-semibold">NOT OK</p>
            <p>{error?.message ?? "Unknown Supabase error."}</p>
          </div>
        </PageShell>
      );
    }

    return (
      <PageShell
        title="Health Check"
        description="Supabase connectivity status for the MVP scaffold."
      >
        <p className="text-sm text-emerald-200">OK</p>
      </PageShell>
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return (
      <PageShell
        title="Health Check"
        description="Supabase connectivity status for the MVP scaffold."
      >
        <div className="space-y-2 text-sm text-rose-200">
          <p className="font-semibold">NOT OK</p>
          <p>{message}</p>
        </div>
      </PageShell>
    );
  }
}
