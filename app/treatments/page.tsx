import type { Metadata } from "next"
import TreatmentsClient from "./_components/TreatmentsClientPage"

export const metadata: Metadata = {
  title: "Treatment Programs | Samabi Functional Medicine Clinic",
  description:
    "Specialized functional medicine treatment programs for gut health, hormonal balance, chronic fatigue, and stress management.",
  openGraph: {
    title: "Treatment Programs | Samabi Functional Medicine Clinic",
    description:
      "Specialized functional medicine treatment programs for gut health, hormonal balance, chronic fatigue, and stress management.",
  },
}

export default function TreatmentsPage() {
  return <TreatmentsClient />
}
