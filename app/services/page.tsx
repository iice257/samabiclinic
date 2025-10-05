import type { Metadata } from "next"
import ServicesClient from "./ServicesClient"

export const metadata: Metadata = {
  title: "Our Services | Samabi Functional Medicine",
  description:
    "Comprehensive functional medicine services including diagnostics, integrative treatments, nutritional therapy, and lifestyle optimization.",
  openGraph: {
    title: "Our Services | Samabi Functional Medicine",
    description:
      "Comprehensive functional medicine services including diagnostics, integrative treatments, nutritional therapy, and lifestyle optimization.",
  },
}

export default function ServicesPage() {
  return <ServicesClient />
}
