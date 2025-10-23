import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.warn("[v0] Supabase environment variables are not set. Database features will be unavailable.")
    // Return a mock client that won't throw errors
    return {
      from: () => ({
        insert: async () => ({ error: new Error("Supabase not configured") }),
        select: async () => ({ data: [], error: new Error("Supabase not configured") }),
        update: async () => ({ error: new Error("Supabase not configured") }),
        delete: async () => ({ error: new Error("Supabase not configured") }),
      }),
      auth: {
        signInWithPassword: async () => ({ error: new Error("Supabase not configured") }),
        signUp: async () => ({ error: new Error("Supabase not configured") }),
        signOut: async () => ({ error: new Error("Supabase not configured") }),
      },
    } as any
  }

  return createBrowserClient(url, key)
}
