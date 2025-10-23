import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { LayoutWrapper } from "./layout-wrapper"
import { GlobalSkeleton } from "@/components/ui/global-skeleton"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Samabi Functional Medicine Clinic | Personalized Healthcare in Port Harcourt",
  description:
    "Transform your health with personalized functional medicine. Expert care for gut health, hormonal balance, chronic fatigue, and stress management in Port Harcourt, Nigeria.",
  keywords: [
    "functional medicine",
    "Port Harcourt",
    "Nigeria",
    "gut health",
    "hormonal balance",
    "chronic fatigue",
    "personalized healthcare",
  ],
  authors: [{ name: "Samabi Functional Medicine Clinic" }],
  openGraph: {
    title: "Samabi Functional Medicine Clinic | Personalized Healthcare in Port Harcourt",
    description: "Transform your health with personalized functional medicine.",
    type: "website",
    locale: "en_US",
    siteName: "Samabi Functional Medicine Clinic",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samabi Functional Medicine Clinic | Personalized Healthcare in Port Harcourt",
    description: "Transform your health with personalized functional medicine.",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
          <Suspense fallback={<GlobalSkeleton />}>
          <LayoutWrapper>{children}</LayoutWrapper>
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
