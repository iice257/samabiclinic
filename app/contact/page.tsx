"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Contact form submitted:", formData)
    alert("Thank you for reaching out! We'll get back to you within 24 hours.")
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
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

      {/* Contact Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-5">
            {/* Left Column - Contact Info */}
            <div className="space-y-6 lg:col-span-2">
              <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
                <h2 className="mb-6 font-bold text-2xl text-foreground md:text-3xl">Get in Touch</h2>
                <p className="mb-8 text-muted-foreground leading-relaxed">
                  Have questions about our services or want to schedule a consultation? We're here to help.
                </p>
              </div>

              <Card className="border-border/50 bg-card p-6 transition-all hover:shadow-lg animate-in fade-in slide-in-from-left-8 duration-1000 delay-100">
                <div className="inline-flex rounded-full  p-3">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Visit Us</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  No 5 Isaac Ken Close,
                  <br />
                  Off farm Road,
                  <br />
                  Rumuosi Portharcourt.
                </p>
              </Card>

              <Card className="border-border/50 bg-card p-6 transition-all hover:shadow-lg animate-in fade-in slide-in-from-left-8 duration-1000 delay-200">
                <div className=" inline-flex rounded-full  p-3">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className=" font-semibold text-foreground">Call Us</h3>
                <p className="text-muted-foreground text-sm">
                  <a href="tel:+2348166423218" className="transition-colors hover:text-primary">
                    +234 816 642 3218
                  </a>
                </p>
              </Card>

              <Card className="border-border/50 bg-card p-6 transition-all hover:shadow-lg animate-in fade-in slide-in-from-left-8 duration-1000 delay-300">
                <div className=" inline-flex rounded-full  p-3">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className=" font-semibold text-foreground">Email Us</h3>
                <p className="text-muted-foreground text-sm">
                  <a href="mailto:mailto:Kazeem.uthman@npmcn.com" className="transition-colors hover:text-primary">
                    Kazeem.uthman@npmcn.com
                  </a>
                </p>
              </Card>

              <Card className="border-border/50 bg-card p-6 transition-all hover:shadow-lg animate-in fade-in slide-in-from-left-8 duration-1000 delay-400">
                <div className=" inline-flex rounded-full  p-3">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className=" font-semibold text-foreground">Office Hours</h3>
                <div className="space-y-1 text-muted-foreground text-sm">
                  <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                  <p>Saturday: 10:00 AM - 2:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </Card>
            </div>

            {/* Right Column - Contact Form */}
            <Card className="border-border/50 bg-card p-8 lg:col-span-3 animate-in fade-in slide-in-from-right-8 duration-1000">
              <h3 className="mb-6 font-bold text-2xl text-foreground">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="transition-all duration-300 focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+234 800 000 0000"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="transition-all duration-300 focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Select
                    value={formData.subject}
                    onValueChange={(value) => handleInputChange("subject", value)}
                    required
                  >
                    <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-primary">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consultation">Book a Consultation</SelectItem>
                      <SelectItem value="services">Questions About Services</SelectItem>
                      <SelectItem value="treatments">Treatment Inquiries</SelectItem>
                      <SelectItem value="billing">Billing & Insurance</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us how we can help you..."
                    rows={6}
                    required
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className="resize-none transition-all duration-300 focus:ring-2 focus:ring-primary"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="group rounded-full w-full transition-all duration-300 hover:shadow-lg"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <Card className="border-border/50 bg-card p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="font-bold text-3xl text-foreground md:text-4xl">Book an Appointment</h2>
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground text-xl">Prefer to speak directly with a specialist?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Skip the wait. Schedule a personalised consultation with our functional medicine team. Whether you're
                  seeking guidance, a treatment plan, or a second opinion, we'll help you take the next step toward
                  lasting wellness.
                </p>
              </div>
              <Button size="lg" className="group rounded-full transition-all duration-300 hover:shadow-lg" asChild>
                <Link href="/book">
                  Book Consultation
                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <section className="bg-background px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="relative aspect-[21/9] bg-muted">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.6847234567!2d7.0123456!3d4.8456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwNTAnNDQuNCJOIDfCsDAwJzQ0LjQiRQ!5e0!3m2!1sen!2sng!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Samabi Functional Medicine Clinic Location"
                className="absolute inset-0"
              />
            </div>
            <div className="bg-card p-4 text-center border-t border-border">
              <p className="text-muted-foreground text-sm">
                <MapPin className="inline h-4 w-4 mr-1" />
                No 5 Isaac Ken Close, Off farm Road, Rumuosi Portharcourt
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
