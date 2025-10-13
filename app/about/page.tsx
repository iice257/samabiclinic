import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Heart, Microscope, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us | Samabi Functional Medicine Clinic",
  description:
    "Root-cause medicine for the modern world. Learn about our team, philosophy, and approach to integrative functional medicine.",
  openGraph: {
    title: "About Us | Samabi Functional Medicine Clinic",
    description:
      "Root-cause medicine for the modern world. Learn about our team, philosophy, and approach to integrative functional medicine.",
    type: "website",
  },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 px-4 py-24 md:py-32">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h1 className="mb-6 text-balance font-bold text-4xl text-foreground md:text-5xl lg:text-6xl">
              Root-cause medicine for the modern world
            </h1>
            <p className="mx-auto max-w-2xl text-balance text-muted-foreground text-lg md:text-xl leading-relaxed">
              We practice medicine that listens deeply, combining conventional diagnostics with holistic healing.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
            <div className="animate-in fade-in slide-in-from-left-8 duration-1000 delay-200">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/modern-medical-clinic-interior-with-natural-light.jpg"
                  alt="Samabi Clinic Interior"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
            <div className="animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
              <h2 className="mb-6 font-bold text-3xl text-foreground md:text-4xl">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  At Samabi Functional Medicine Clinic, we practice medicine that listens deeply. Our team combines conventional diagnostics with
                  holistic healing to uncover what your body truly needs.
                </p>
                <p>
                  Founded by experts in integrative and functional medicine, our clinic was built on one principle:
                  every patient deserves care that addresses the whole person, not just the symptoms.
                </p>
                <p>
                  We believe in the power of understanding root causes, personalized treatment plans, and empowering our
                  patients with knowledge and tools for lasting health.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-muted/30 px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h2 className="mb-4 font-bold text-3xl text-foreground md:text-4xl">Meet Our Founder</h2>
            <p className="mx-auto max-w-2xl text-balance text-muted-foreground text-lg">
              The Expert.
            </p>
          </div>

          <div className="mx-auto max-w-2xl">
            <Card className="px-4 group overflow-hidden border-border/50 bg-card transition-all hover:shadow-xl hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              <div className="relative aspect-[6/4] overflow-hidden">
                <Image
                  src="/Dr. Abimbola Kazeem.jpeg"
                  alt="Dr. Abimbola Kazeem"
                  fill
                  className="rounded-sm object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 font-semibold text-foreground text-xl">Dr. Abimbola Kazeem</h3>
                <p className="mb-4 font-medium text-primary text-sm">15+ years in psychiatry and integrative wellness, redefining mental health care in Nigeria.</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  With over 15 years of experience in integrative medicine, Dr. Kazeem founded Samabi to provide
                  personalized, root-cause healthcare. He specializes in complex chronic conditions, hormonal
                  imbalances, metabolic health, and nutritional therapy. His approach combines advanced diagnostics with
                  evidence-based holistic treatment protocols, empowering patients to achieve lasting wellness and
                  vitality.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h2 className="mb-4 font-bold text-3xl text-foreground md:text-4xl">Our Core Values</h2>
            <p className="mx-auto max-w-2xl text-balance text-muted-foreground text-lg">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Value 1 */}
            <Card className="flex flex-col items-center group border-border/50 bg-card p-8 text-center transition-all  hover:shadow-lg hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
              <div className="mb-6 inline-flex rounded-full bg-primary/10 p-4 transition-colors duration-300 group-hover:bg-primary/20">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-6 font-semibold text-foreground text-xl">Empathy & Evidence</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We combine compassionate care with rigorous scientific evidence to provide treatment that truly works.
              </p>
            </Card>

            {/* Value 2 */}
            <Card className="flex flex-col items-center group border-border/50 bg-card p-8 text-center transition-all hover:shadow-lg hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              <div className="mb-6 inline-flex rounded-full bg-accent/10 p-4 transition-colors duration-300 group-hover:bg-accent/20">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-6 font-semibold text-foreground text-xl">Personalized Care</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Every patient is unique. We design treatment plans tailored to your biology, lifestyle, and goals.
              </p>
            </Card>

            {/* Value 3 */}
            <Card className="flex flex-col items-center group border-border/50 bg-card p-8 text-center transition-all hover:shadow-lg hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400">
              <div className="mb-6 inline-flex rounded-full bg-primary/10 p-4 transition-colors duration-300 group-hover:bg-primary/20">
                <Microscope className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-6 font-semibold text-foreground text-xl">Continuous Discovery</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We stay at the forefront of functional medicine research to bring you the most effective treatments.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-4xl text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h2 className="mb-6 text-balance font-bold text-3xl text-foreground md:text-4xl">
            Ready to experience personalized care?
          </h2>
          <p className="mb-8 text-balance text-muted-foreground text-lg leading-relaxed">
            Join hundreds of patients who have transformed their health with our root-cause approach.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="group w-full sm:w-auto" asChild>
              <Link href="/contact">
                Book Consultation
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-2 w-2" />
                </span>
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent" asChild>
              <Link href="/services">Explore Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
