"use client"

import Link from "next/link"
import { Microscope, Leaf, Apple, Heart, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  {
    icon: Microscope,
    title: "Diagnostics & Lab Testing",
    description:
      "Gain clarity through comprehensive functional panels for hormones, gut health, and metabolism. We use advanced testing to uncover the root causes of your symptoms.",
    features: [
      "Comprehensive hormone panels",
      "Gut microbiome analysis",
      "Metabolic function testing",
      "Nutritional deficiency screening",
    ],
  },
  {
    icon: Heart,
    title: "Integrative Treatments",
    description:
      "Natural and clinical interventions customized for your unique biology. We combine the best of conventional and holistic medicine.",
    features: [
      "Personalized treatment protocols",
      "Evidence-based interventions",
      "Natural therapeutic options",
      "Ongoing monitoring and adjustment",
    ],
  },
  {
    icon: Apple,
    title: "Nutritional Therapy",
    description:
      "Build lasting energy through targeted diet and micronutrient support. Nutrition is the foundation of functional medicine.",
    features: [
      "Customized meal planning",
      "Supplement recommendations",
      "Food sensitivity testing",
      "Metabolic nutrition coaching",
    ],
  },
  {
    icon: Leaf,
    title: "Lifestyle Optimization",
    description:
      "Rewire habits for stress, sleep, and longevity. Sustainable health requires sustainable lifestyle changes.",
    features: [
      "Stress management strategies",
      "Sleep optimization protocols",
      "Movement and exercise guidance",
      "Mindfulness and recovery practices",
    ],
  },
]

export default function ServicesClient() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance">
              Our approach blends science, precision, and compassion
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty">
              We restore your health through comprehensive diagnostics, personalized care, and evidence-based treatments
              tailored to your unique biology.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div
                  key={service.title}
                  className="group bg-card rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                  }}
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <h3 className="text-2xl font-bold">{service.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                      <ul className="space-y-2 pt-2">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-1">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-balance">Your journey to better health</h2>
              <p className="text-lg text-muted-foreground text-pretty">
                Our comprehensive approach ensures you receive personalized care at every step.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {[
                {
                  step: "01",
                  title: "Initial Consultation",
                  description: "We listen deeply to understand your health history, symptoms, and goals.",
                },
                {
                  step: "02",
                  title: "Comprehensive Testing",
                  description: "Advanced diagnostics reveal the root causes behind your symptoms.",
                },
                {
                  step: "03",
                  title: "Personalized Treatment",
                  description: "Evidence-based protocols tailored to your unique biology and lifestyle.",
                },
              ].map((item, index) => (
                <div
                  key={item.step}
                  className="space-y-3"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`,
                  }}
                >
                  <div className="text-4xl font-bold text-primary/20">{item.step}</div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
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
              Ready to explore our treatments?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty">
              Discover our specialized treatment programs designed to address your specific health concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-base">
                <Link href="/treatments">
                  View Treatments
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base bg-transparent">
                <Link href="/contact">Book Consultation</Link>
              </Button>
            </div>
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
