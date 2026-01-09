import { createClient } from "@supabase/supabase-js";
import { getPublicEnv } from "@/lib/env";

export function createBrowserSupabaseClient() {
  const { supabaseUrl, supabaseAnonKey } = getPublicEnv();
  return createClient(supabaseUrl, supabaseAnonKey);
}

export function createServerSupabaseClient() {
  const { supabaseUrl, supabaseAnonKey } = getPublicEnv();
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
