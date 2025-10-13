"use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon, Clock, User, Mail, Phone, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

export default function BookingPage() {
  const [date, setDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })

  const availableTimes = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ]

  const services = [
    "Initial Consultation",
    "Follow-up Appointment",
    "Gut Health Assessment",
    "Hormonal Balance Consultation",
    "Chronic Fatigue Evaluation",
    "Stress & Sleep Optimization",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Booking submitted:", { ...formData, date, time: selectedTime })
    alert("Booking request submitted! We'll contact you shortly to confirm your appointment.")
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
              Book Your Consultation
            </h1>
            <p className="mx-auto max-w-2xl text-balance text-muted-foreground text-lg md:text-xl leading-relaxed">
              Take the first step toward optimal health. Schedule your personalized functional medicine consultation.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column - Info Cards */}
            <div className="space-y-8 lg:col-span-1">
              <Card className="border-border/50 bg-card p-6 animate-in fade-in slide-in-from-left-8 duration-1000">
                <div className="mb-4 gap-4 inline-flex rounded-full bg-primary/10 p-3">
                  <CalendarIcon className="h-6 w-6 text-primary" />
                  <h3 className="font-semibold text-foreground text-lg">Flexible Scheduling</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Choose a date and time that works best for your schedule. We offer appointments throughout the week.
                </p>
              </Card>

              <Card className="border-border/50 bg-card p-6 animate-in fade-in slide-in-from-left-8 duration-1000 delay-100">
                <div className="mb-4 gap-4 inline-flex rounded-full bg-primary/10 p-3">
                  <Clock className="h-6 w-6 text-primary" />
                  <h3 className="font-semibold text-foreground text-lg">60-Minute Sessions</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Initial consultations are comprehensive 60-minute sessions to fully understand your health concerns.
                </p>
              </Card>

              <Card className="border-border/50 bg-card p-6 animate-in fade-in slide-in-from-left-8 duration-1000 delay-200">
                <div className="mb-4 gap-4 inline-flex rounded-full bg-primary/10 p-3">
                  <User className="h-6 w-6 text-primary" />
                  <h3 className="font-semibold text-foreground text-lg">Expert Care</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Meet with our experienced functional medicine specialists who will create a personalized care plan.
                </p>
              </Card>
              <Card className="border-border/50 bg-card p-4 animate-in fade-in slide-in-from-left-8 duration-1000 delay-200">
              <p className="text-muted-foreground text-xs">
                For enquiries, 
                <a href="/contact" className="transition-colors underline hover:text-primary">
                  contact us.
                </a>
              </p>
              </Card>    
            </div>

            {/* Right Column - Booking Form */}
            <Card className="border-border/50 bg-card p-8 lg:col-span-2 animate-in fade-in slide-in-from-right-8 duration-1000">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground text-xl">Your Information</h3>

                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Full Name *
                    </Label>
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
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email *
                      </Label>
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
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+234 800 000 0000"
                        required
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="transition-all duration-300 focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="space-y-4 pt-6 border-t border-border">
                  <h3 className="font-semibold text-foreground text-xl">Appointment Details</h3>

                  <div className="space-y-2">
                    <Label htmlFor="service">Service Type *</Label>
                    <Select
                      value={formData.service}
                      onValueChange={(value) => handleInputChange("service", value)}
                      required
                    >
                      <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-primary">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Preferred Date *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal transition-all duration-300 hover:bg-muted bg-transparent"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time">Preferred Time *</Label>
                      <Select value={selectedTime} onValueChange={setSelectedTime} required>
                        <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-primary">
                          <SelectValue placeholder="Select a time" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableTimes.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Additional Information
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your health concerns or any specific questions you have..."
                      rows={4}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className="resize-none transition-all duration-300 focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button type="submit" size="lg" className="group w-full transition-all duration-300 hover:shadow-lg">
                    Confirm Booking
                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Button>
                  <p className="mt-4 text-center text-muted-foreground text-xs">
                    By booking, you agree to our terms and privacy policy. We'll contact you to confirm your
                    appointment.
                  </p>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-muted/30 px-4 py-16">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="mb-6 font-bold text-2xl text-foreground md:text-3xl">What to Expect</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <div className="mb-3 text-4xl font-bold text-primary">1</div>
              <h3 className="mb-2 font-semibold text-foreground">Comprehensive Assessment</h3>
              <p className="text-muted-foreground text-sm">
                We'll review your health history, symptoms, and lifestyle in detail.
              </p>
            </div>
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
              <div className="mb-3 text-4xl font-bold text-primary">2</div>
              <h3 className="mb-2 font-semibold text-foreground">Personalized Plan</h3>
              <p className="text-muted-foreground text-sm">
                Receive a customized treatment strategy based on your unique needs.
              </p>
            </div>
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
              <div className="mb-3 text-4xl font-bold text-primary">3</div>
              <h3 className="mb-2 font-semibold text-foreground">Ongoing Support</h3>
              <p className="text-muted-foreground text-sm">
                Get continuous guidance and adjustments as you progress toward optimal health.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
