"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { treatments } from "@/lib/data/treatments"
import LightRays from "@/components/ui/lightrays"
import { useTheme } from "next-themes"

export default function TreatmentsClientPage() {
  const { theme } = useTheme()

  return (
    <main className="min-h-screen animated-gradient">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <LightRays
            raysColor={theme === "light" ? "#B2D8B2" : "#ffffff"}
            raysSpeed={0.2}
            lightSpread={0.5}
            rayLength={1.5}
            pulsating={true}
            mouseInfluence={0.1}
          />
        </div>
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance">Specialized treatment programs</h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty">
              Evidence-based protocols designed to address the root causes of your health concerns and restore lasting
              vitality.
            </p>
          </div>
        </div>
      </section>

      {/* Treatments Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {treatments.map((treatment, index) => (
              <Link
                key={treatment.slug}
                href={`/treatments/${treatment.slug}`}
                className="group block"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={treatment.image || "/placeholder.svg"}
                      alt={treatment.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-2xl md:text-3xl font-bold text-white text-balance">{treatment.title}</h3>
                    </div>
                  </div>
                  <div className="p-8 space-y-4">
                    <p className="text-muted-foreground leading-relaxed">{treatment.summary}</p>
                    <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all duration-300">
                      <span>Learn more</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-balance">What to expect from our programs</h2>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              Each treatment program is personalized to your unique biology and health goals. We combine advanced
              diagnostics, evidence-based protocols, and ongoing support to help you achieve lasting results.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 text-left">
              {[
                {
                  title: "12-16 Weeks",
                  description: "Comprehensive program duration with flexibility based on your progress",
                },
                {
                  title: "Personalized",
                  description: "Every protocol is tailored to your test results and health history",
                },
                {
                  title: "Ongoing Support",
                  description: "Regular check-ins and adjustments throughout your journey",
                },
              ].map((item, index) => (
                <div
                  key={item.title}
                  className="bg-card rounded-xl p-6 shadow-md transition-transform hover:scale-105"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${0.6 + index * 0.1}s both`,
                  }}
                >
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance">
              Not sure which program is right for you?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty">
              Book a consultation and we'll help you find the best path forward for your health goals.
            </p>
            <Button size="lg" asChild className="text-base transition-transform hover:scale-105">
              <Link href="/contact">
                Book Your Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  )
}
