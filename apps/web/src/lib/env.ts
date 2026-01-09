const REQUIRED_PUBLIC_VARS = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY"
] as const;

type RequiredPublicVar = (typeof REQUIRED_PUBLIC_VARS)[number];

export function getMissingPublicEnv(): RequiredPublicVar[] {
  return REQUIRED_PUBLIC_VARS.filter((key) => !process.env[key]);
}

export function getPublicEnv() {
  return {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
  };
}

export function getOptionalServerEnv() {
  return {
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY
  };
}
