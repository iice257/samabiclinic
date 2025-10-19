import { NextResponse } from "next/server"

function maskKey(k?: string) {
  if (!k) return null
  if (k.length <= 8) return k.replace(/.(?=.{2})/g, '*')
  return `${k.slice(0, 4)}...${k.slice(-4)}`
}

export async function GET() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? null
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? null
    const service = process.env.NEXT_SUPABASE_SERVICE_KEY ?? null

    return NextResponse.json({
      url,
      anon_preview: maskKey(anon),
      service_preview: maskKey(service),
      has_anon: !!anon,
      has_service: !!service,
    })
  } catch (err: any) {
    return NextResponse.json({ error: String(err?.message ?? err) }, { status: 500 })
  }
}
