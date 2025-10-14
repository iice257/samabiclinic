"use client"

import { useState } from "react"
import { CalendarIcon, Clock, User } from "lucide-react"
import { Card } from "@/components/ui/card"
import { BookingForm } from "@/components/book/BookingForm"
import { NewsletterPopup } from "@/components/layout/newsletter-popup"

export default function BookingPage() {
  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false)

  const handleAppointmentBooked = () => {
    // setShowNewsletterPopup(true) // Will be enabled later
  }

  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 px-4 py-24 md:py-32">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h1 className="mb-6 text-balance font-bold text-4xl text-foreground md:text-5xl lg:text-6xl">
              Book Your Consultation
            </h1>
            <p className="mx-auto max-w-2xl text-balance text-muted-foreground text-lg md:text-xl leading-relaxed">
              Take the first step toward optimal health. Schedule your personalized functional medicine consultation.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-1">
              <InfoCard
                icon={CalendarIcon}
                title="Flexible Scheduling"
                description="Choose a date and time that works best for your schedule. We offer appointments throughout the week."
                delay={0}
              />
              <InfoCard
                icon={Clock}
                title="60-Minute Sessions"
                description="Initial consultations are comprehensive 60-minute sessions to fully understand your health concerns."
                delay={100}
              />
              <InfoCard
                icon={User}
                title="Expert Care"
                description="Meet with our experienced functional medicine specialists who will create a personalized care plan."
                delay={200}
              />
            </div>

            <Card className="border-border/50 bg-card p-8 lg:col-span-2 animate-in fade-in slide-in-from-right-8 duration-1000">
              <BookingForm onAppointmentBooked={handleAppointmentBooked} />
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-muted/30 px-4 py-16">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="mb-6 font-bold text-2xl text-foreground md:text-3xl">What to Expect</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <InfoStep title="Comprehensive Assessment" description="We'll review your health history, symptoms, and lifestyle in detail." step={1} />
            <InfoStep title="Personalized Plan" description="Receive a customized treatment strategy based on your unique needs." step={2} />
            <InfoStep title="Ongoing Support" description="Get continuous guidance and adjustments as you progress toward optimal health." step={3} />
          </div>
        </div>
      </section>

      {/* {showNewsletterPopup && <NewsletterPopup onClose={() => setShowNewsletterPopup(false)} />} */}
    </main>
  )
}

const InfoCard = ({ icon: Icon, title, description, delay }: { icon: React.ElementType, title: string, description: string, delay: number }) => (
  <Card className="border-border/50 bg-card p-6 animate-in fade-in slide-in-from-left-8 duration-1000" style={{ animationDelay: `${delay}ms` }}>
    <div className="mb-4 gap-4 inline-flex rounded-full bg-primary/10 p-3">
      <Icon className="h-6 w-6 text-primary" />
      <h3 className="font-semibold text-foreground text-lg">{title}</h3>
    </div>
    <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
  </Card>
)

const InfoStep = ({ title, description, step }: { title: string, description: string, step: number }) => (
  <div className={`animate-in fade-in slide-in-from-bottom-4 duration-1000`} style={{ animationDelay: `${step * 100}ms` }}>
    <div className="mb-3 text-4xl font-bold text-primary">{step}</div>
    <h3 className="mb-2 font-semibold text-foreground">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </div>
)
