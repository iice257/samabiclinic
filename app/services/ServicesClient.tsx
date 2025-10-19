"use client"

import Link from "next/link"
import { Microscope, Leaf, Apple, Heart, ArrowRight, Briefcase, HeartHandshake, Baby } from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  {
    icon: Microscope,
    title: "Mental Health and Behavioral Medicine",
    description:
      "Comprehensive, compassionate care for mental health conditions, blending medical expertise with holistic healing.",
    features: [
      "Psychiatric evaluation and diagnosis",
      "Medication management and monitoring",
      "Psychotherapy (CBT, trauma-focused, stress management)",
      "Treatment of depression, anxiety, insomnia, and mood disorders",
      "Adolescent and young adult mental health care",
      "Addiction and substance use disorder treatment",
      "Stress and burnout recovery for professionals",
    ],
  },
  {
    icon: Heart,
    title: "Functional Medicine Consultations",
    description:
      "Uncover why illness develops, not just what it is. We use advanced diagnostic tools to identify nutritional, hormonal, inflammatory, and metabolic imbalances.",
    features: [
      "Root cause analysis of health conditions",
      "Advanced diagnostic testing",
      "Personalized treatment planning",
      "Integration of nutrition and lifestyle therapy",
      "Ongoing monitoring and adjustment",
    ],
  },
  {
    icon: Apple,
    title: "Nutritional Psychiatry and Therapeutic Diets",
    description:
      "Explore how food affects the brain, mood, and metabolism. Evidence-based nutritional interventions for mental health.",
    features: [
      "Ketogenic therapy for mood disorders and metabolic brain dysfunction",
      "Anti-inflammatory and brain-supportive diets",
      "Nutritional supplementation for micronutrient deficiencies",
      "Collaboration with dietitians for personalized meal planning",
    ],
  },
  {
    icon: Leaf,
    title: "Management of Chronic Medical Conditions",
    description:
      "Integrative care for chronic illnesses, combining medical treatment with root-cause analysis and lifestyle optimization.",
    features: [
      "Hypertension and cardiovascular health",
      "Diabetes and insulin resistance management",
      "Autoimmune disorder treatment",
      "Thyroid disorder management",
      "Metabolic syndrome and obesity treatment",
    ],
  },
  {
  icon: Baby, 
  title: "Child and Adolescent Mental Health Program",
  description:
    "Early assessment, counseling, and therapy for children and teenagers facing emotional, behavioral, or developmental challenges. SAMABI partners with families, schools, and caregivers to foster resilience and emotional growth.",
  features: [
    "Emotional and behavioral assessments",
    "Individual and family therapy sessions",
    "School-based mental health support",
    "Stress and resilience training for teens",
    "Developmental and social skills coaching",
  ],
},
{
  icon: HeartHandshake, 
  title: "Elder Care and Assisted Living Program",
  description:
    "Comprehensive psychological and emotional support for seniors to promote independence, dignity, and mental wellness. Our personalized wellness plans enhance quality of life through compassionate, professional care.",
  features: [
    "Cognitive and emotional well-being programs",
    "Support for loneliness and depression in seniors",
    "Personalized therapy and counseling",
    "Assisted living and home-based support plans",
    "Meaningful engagement and memory care activities",
  ],
},
{
  icon: Briefcase, 
  title: "Employee Assistance Program (EAP)",
  description:
    "Confidential, workplace-focused mental health and wellness services designed to enhance employee resilience, productivity, and work-life balance. SAMABI's EAP supports both staff and management in building a healthier organization.",
  features: [
    "Confidential counseling for employees and executives",
    "Stress management and burnout prevention workshops",
    "Work-life balance and resilience training",
    "Mental health awareness sessions for teams",
    "Tailored corporate wellness programs",
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
              Comprehensive psychiatric and functional medicine care
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty">
              At SAMABI, we combine the science of psychiatry with the precision of functional medicine to restore
              balance to both mind and body. We look beyond symptoms to identify and treat the root causes of illness.
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
                  className="group bg-card rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-all  hover:-translate-y-1"
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
