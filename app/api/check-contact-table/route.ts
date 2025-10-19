import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function GET() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const key = process.env.NEXT_SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    const supabase = createServerClient(url, key, {
      cookies: {
        getAll() {
          return [] as any
        },
        setAll() {
          // noop for this check
        },
      },
    })

    // Try a small select. If the table doesn't exist, PostgREST returns PGRST205.
    const { data, error } = await supabase.from("contact_submissions").select("id").limit(1)

    if (error) {
      return NextResponse.json({ exists: false, error: { code: (error as any)?.code ?? null, message: error.message } }, { status: 200 })
    }

    return NextResponse.json({ exists: true, sample: data?.[0] ?? null }, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ exists: false, error: { message: String(err?.message ?? err) } }, { status: 500 })
  }
}
