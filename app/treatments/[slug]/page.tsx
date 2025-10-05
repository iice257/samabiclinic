import type { Metadata } from "next"
import { treatments } from "@/lib/data/treatments"
import TreatmentDetailClient from "./TreatmentDetailPageClient"

export async function generateStaticParams() {
  return treatments.map((treatment) => ({
    slug: treatment.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const treatment = treatments.find((t) => t.slug === params.slug)

  if (!treatment) {
    return {
      title: "Treatment Not Found | Samabi Functional Medicine",
    }
  }

  return {
    title: `${treatment.title} | Samabi Functional Medicine`,
    description: treatment.summary,
    openGraph: {
      title: `${treatment.title} | Samabi Functional Medicine`,
      description: treatment.summary,
    },
  }
}

export default function TreatmentDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  return <TreatmentDetailClient params={params} />
}
