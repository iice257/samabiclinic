import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function POST() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const key = process.env.NEXT_SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    const supabase = createServerClient(url, key, {
      cookies: {
        getAll() {
          return [] as any
        },
        setAll() {
          // noop
        },
      },
    })

    const payload = {
      name: "test-insert",
      email: "test@example.com",
      phone: "",
      subject: "test",
      message: "test insert from server route",
    }

    const { data, error } = await supabase.from("contact_submissions").insert(payload).select("*")

    if (error) {
      return NextResponse.json({ success: false, error: { code: (error as any)?.code ?? null, message: error.message } }, { status: 200 })
    }

    return NextResponse.json({ success: true, inserted: data }, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: { message: String(err?.message ?? err) } }, { status: 500 })
  }
}
