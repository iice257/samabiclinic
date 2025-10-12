import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Suspense } from "react"
import { AuthProvider } from "@/hooks/useAuth" // Import AuthProvider

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Samabi Functional Medicine | Personalized Healthcare in Lagos",
  description:
    "Transform your health with personalized functional medicine. Expert care for gut health, hormonal balance, chronic fatigue, and stress management in Lagos, Nigeria.",
  keywords: [
    "functional medicine",
    "Lagos",
    "Nigeria",
    "gut health",
    "hormonal balance",
    "chronic fatigue",
    "personalized healthcare",
  ],
  authors: [{ name: "Samabi Functional Medicine" }],
  openGraph: {
    title: "Samabi Functional Medicine | Personalized Healthcare in Lagos",
    description: "Transform your health with personalized functional medicine.",
    type: "website",
    locale: "en_US",
    siteName: "Samabi Functional Medicine",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samabi Functional Medicine | Personalized Healthcare in Lagos",
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
        <AuthProvider> {/* Wrap the application with AuthProvider */}
          <Suspense fallback={<div>Loading...</div>}>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <Analytics />
          </Suspense>
        </AuthProvider>
      </body>
    </html>
  )
}
