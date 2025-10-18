"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { ContactForm } from "@/components/contact/ContactForm"
import { NewsletterPopup } from "@/components/layout/newsletter-popup"

export default function ContactPage() {
  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false)

  const handleFormSubmitted = () => {
    setShowNewsletterPopup(true)
  }

  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 px-4 py-24 md:py-32">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h1 className="mb-6 text-balance font-bold text-4xl text-foreground md:text-5xl lg:text-6xl">
              Let's Start Your Journey to Better Health
            </h1>
            <p className="mx-auto max-w-2xl text-balance text-muted-foreground text-lg md:text-xl leading-relaxed">
              Our care team is ready to listen and help you achieve optimal wellness.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="space-y-6 lg:col-span-2">
              <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
                <h2 className="mb-6 font-bold text-2xl text-foreground md:text-3xl">Get in Touch</h2>
                <p className="mb-8 text-muted-foreground leading-relaxed">
                  Have questions about our services or want to schedule a consultation? We're here to help.
                </p>
              </div>
              <InfoCard
                icon={MapPin}
                title="Visit Us"
                text="No 5 Isaac Ken Close, Off farm Road, Rumuosi Portharcourt."
              />
              <InfoCard icon={Phone} title="Call Us" text="+234 816 642 3218" href="tel:+2348166423218" />
              <InfoCard
                icon={Mail}
                title="Email Us"
                text="Kazeem.uthman@npmcn.com"
                href="mailto:Kazeem.uthman@npmcn.com"
              />
              <InfoCard icon={Clock} title="Office Hours" text="Mon - Fri: 8am - 5pm" />
            </div>

            <div className="space-y-8 lg:col-span-3">
              <Card className="border-border/50 bg-card p-8 animate-in fade-in slide-in-from-right-8 duration-1000">
                <h3 className="mb-6 font-bold text-2xl text-foreground">Send Us a Message</h3>
                <ContactForm onFormSubmitted={handleFormSubmitted} />
              </Card>
              <Card className="border-border/50 bg-card p-8 animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
                <div className="p-3.5 text-center space-y-6">
                  <h3 className="font-bold text-2xl text-foreground md:text-3xl">Book an Appointment</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Prefer to speak directly with a specialist? Skip the wait. Schedule a personalised consultation with
                    our functional medicine team. Whether you're seeking guidance, a treatment plan, or a second
                    opinion, we'll help you take the next step toward lasting wellness.
                  </p>
                  <Button size="lg" className="group rounded-full" asChild>
                    <Link href="/book">
                      Book Consultation
                      <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h2 className="mb-2 font-bold text-3xl text-foreground">Visit Our Clinic</h2>
            <p className="text-muted-foreground">No 5 Isaac Ken Close, Off farm Road, Rumuosi Portharcourt, Nigeria</p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg h-96 animate-in fade-in duration-1000">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3968.8234567890123!2d7.0123456!3d4.7654321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x107f5c1234567890%3A0x1234567890abcdef!2sNo%205%20Isaac%20Ken%20Close%2C%20Rumuosi%2C%20Port%20Harcourt!5e0!3m2!1sen!2sng!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {showNewsletterPopup && <NewsletterPopup onClose={() => setShowNewsletterPopup(false)} />}
    </main>
  )
}

const InfoCard = ({
  icon: Icon,
  title,
  text,
  href,
}: { icon: React.ElementType; title: string; text: string; href?: string }) => (
  <Card className="border-border/50 bg-card p-6 transition-all hover:shadow-lg animate-in fade-in slide-in-from-left-8 duration-1000">
    <div className="inline-flex rounded-full p-3">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <h3 className="font-semibold text-foreground">{title}</h3>
    <p className="text-muted-foreground text-sm leading-relaxed">
      {href ? (
        <a href={href} className="transition-colors hover:text-primary">
          {text}
        </a>
      ) : (
        text
      )}
    </p>
  </Card>
)
