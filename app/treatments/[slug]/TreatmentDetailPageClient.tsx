"use client"

import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { treatments } from "@/lib/data/treatments"

export default function TreatmentDetailPageClient({
  params,
}: {
  params: { slug: string }
}) {
  const treatment = treatments.find((t) => t.slug === params.slug)

  if (!treatment) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      {/* Back Button */}
      <section className="py-8">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <Link
            href="/treatments"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Treatments</span>
          </Link>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance">{treatment.title}</h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">{treatment.summary}</p>
              <Button size="lg" asChild className="text-base">
                <Link href="/contact">Book Consultation</Link>
              </Button>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image src={treatment.image || "/placeholder.svg"} alt={treatment.title} fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed text-foreground">{treatment.description}</p>
          </div>
        </div>
      </section>

      {/* What We Address */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">What we address</h2>
              <ul className="space-y-4">
                {treatment.addresses.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3"
                    style={{
                      animation: `fadeInLeft 0.5s ease-out ${index * 0.1}s both`,
                    }}
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-lg leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">What's included</h2>
              <ul className="space-y-4">
                {treatment.includes.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3"
                    style={{
                      animation: `fadeInRight 0.5s ease-out ${index * 0.1}s both`,
                    }}
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-lg leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Duration Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Program duration</h2>
            <p className="text-xl text-muted-foreground">{treatment.duration}</p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every program is personalized based on your progress and health goals. We provide ongoing support and
              adjustments throughout your journey.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="bg-primary/5 rounded-3xl p-12 md:p-16 text-center space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance">
              Ready to start your healing journey?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Book a consultation to discuss how this program can be personalized for your unique health needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-base">
                <Link href="/contact">Book Consultation</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base bg-transparent">
                <Link href="/treatments">View All Treatments</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </main>
  )
}
