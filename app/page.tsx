import Link from "next/link"
import { ArrowRight, Heart, Users, Sparkles, CheckCircle2, Clock, TrendingUp, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                <span>Personalized Functional Medicine</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                Transform Your Health, Reclaim Your Life
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                Experience healthcare that treats you as a whole person. Our evidence-based functional medicine approach
                addresses root causes, not just symptoms.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rounded-full" asChild>
                  <Link href="/contact">
                    Book Your Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full bg-transparent" asChild>
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                <img
                  src="/peaceful-wellness-meditation-nature.jpg"
                  alt="Wellness and health"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-lg border border-border">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">500+</p>
                    <p className="text-sm text-muted-foreground">Lives Transformed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 lg:py-32 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                <img
                  src="/doctor-consultation-functional-medicine.jpg"
                  alt="Our philosophy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
                Healthcare That Sees the Whole You
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At Samabi Functional Medicine Clinic, we believe your body is an interconnected system. We don't just
                treat symptoms,we investigate the root causes of your health challenges.
              </p>
              <ul className="space-y-4">
                {[
                  "Comprehensive health assessments",
                  "Personalized treatment plans",
                  "Evidence-based natural therapies",
                  "Ongoing support and monitoring",
                ].map((item) => (
                  <li key={item} className="flex items-start space-x-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" variant="outline" className="rounded-full bg-transparent" asChild>
                <Link href="/about">
                  Discover Our Approach
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              Comprehensive Care for Your Wellbeing
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From initial consultation to ongoing support, we're with you every step of your health journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Initial Consultation",
                description:
                  "Comprehensive 90-minute assessment to understand your health history, current concerns, and wellness goals.",
                icon: Users,
              },
              {
                title: "Advanced Testing",
                description:
                  "State-of-the-art diagnostic tests to uncover underlying imbalances and nutritional deficiencies.",
                icon: Sparkles,
              },
              {
                title: "Personalized Plans",
                description:
                  "Custom treatment protocols combining nutrition, lifestyle modifications, and targeted supplementation.",
                icon: Heart,
              },
            ].map((service) => (
              <Card key={service.title} className="border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-8 space-y-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                    <service.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                  <Link
                    href="/services"
                    className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="rounded-full" asChild>
              <Link href="/services">
                View All Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section with Statistics */}
      <section className="py-20 lg:py-32 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              Real Stories, Real Results
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Hear from patients who've transformed their mental health and wellbeing with SAMABI.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="border-border hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <p className="text-3xl md:text-4xl font-bold text-foreground">
                  <span className="font-bold">500+</span>
                </p>
                <p className="text-sm text-muted-foreground">Lives Transformed</p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <p className="text-3xl md:text-4xl font-bold text-foreground">
                  <span className="font-bold">15+</span>
                </p>
                <p className="text-sm text-muted-foreground">Years Practicing</p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <p className="text-3xl md:text-4xl font-bold text-foreground">
                  <span className="font-bold">95%</span>
                </p>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <p className="text-3xl md:text-4xl font-bold text-foreground">
                  <span className="font-bold">4.9/5</span>
                </p>
                <p className="text-sm text-muted-foreground">Patient Satisfaction</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                number: 1,
                quote:
                  "After years of struggling with anxiety and depression, Dr. Kazeem's integrated approach finally gave me real relief. I feel like myself again.",
                author: "Chioma O.",
                role: "Lagos",
              },
              {
                number: 2,
                quote:
                  "The personalized psychiatric care combined with functional medicine was transformative. My mood and energy have never been better.",
                author: "Tunde A.",
                role: "Abuja",
              },
              {
                number: 3,
                quote:
                  "SAMABI doesn't just treat symptoms—they helped me understand the root causes of my mental health challenges and gave me tools for lasting wellness.",
                author: "Amara N.",
                role: "Port Harcourt",
              },
            ].map((testimonial) => (
              <Card key={testimonial.number} className="border-border relative">
                <CardContent className="p-8 space-y-4">
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">{testimonial.number}</span>
                  </div>
                  <p className="text-foreground leading-relaxed italic">{testimonial.quote}</p>
                  <div className="pt-4 border-t border-border">
                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 rounded-3xl p-12 lg:p-16 space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              Ready to Start Your Wellness Journey?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Book your initial consultation today and take the first step toward optimal health.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full" asChild>
                <Link href="/contact">
                  Schedule Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full bg-transparent" asChild>
                <Link href="/treatments">Explore Treatments</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
