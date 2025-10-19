import { createServerClient } from "@supabase/ssr"

export async function createClient() {
  // Dynamically import next/headers at runtime so this module can be
  // statically imported from non-server contexts without causing build
  // errors. During server execution we can use the cookies() helper.
  let cookiesGetter: (() => ReturnType<typeof Object>) | undefined

  try {
    const nh = await import("next/headers")
    cookiesGetter = () => nh.cookies()
  } catch {
    // If importing fails (for example in non-server contexts), provide
    // fallbacks that return empty values. This prevents runtime crashes
    // during bundling or static analysis.
    cookiesGetter = () => ({ getAll: () => [], set: () => {} }) as any
  }

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        try {
          const cookieStore = cookiesGetter!()
          // cookieStore.getAll() returns an array of cookies; normalize to [] when unavailable
          return (cookieStore.getAll && cookieStore.getAll()) || []
        } catch {
          return []
        }
      },
      setAll(cookiesToSet) {
        try {
          const cookieStore = cookiesGetter!()
          if (cookieStore && cookieStore.set) {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          }
        } catch {
          // Ignore failures when setting cookies in contexts that can't set them.
        }
      },
    },
  })
}
