"use client"

import type React from "react"
import { useState, useMemo, useEffect } from "react"
import { CalendarIcon, Clock, User, Mail, Phone, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format, parseISO, startOfWeek, endOfWeek, addDays, startOfDay, endOfDay } from "date-fns"
import { enUS } from "date-fns/locale"

import { Calendar, dateFnsLocalizer, Event } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"

const locales = {
  "en-US": enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse: parseISO,
  startOfWeek,
  endOfWeek,
  getDay: (date) => date.getDay(),
  locales,
})

interface AppointmentEvent extends Event {
  id: string;
  patientId: string;
  doctorId: string;
  notes?: string;
  status: string;
}

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date; doctorId: string } | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })
  const [events, setEvents] = useState<AppointmentEvent[]>([])

  // Placeholder for available slots - in a real app, this would come from an API
  const generateAvailableSlots = (date: Date) => {
    const slots: AppointmentEvent[] = [];
    const startHour = 9; // 9 AM
    const endHour = 17; // 5 PM
    const interval = 60; // 60 minutes

    const currentDay = startOfDay(date);

    for (let i = startHour; i < endHour; i++) {
      const start = new Date(currentDay);
      start.setHours(i, 0, 0, 0);
      const end = new Date(start);
      end.setMinutes(start.getMinutes() + interval);

      // Only add slots in the future
      if (start > new Date()) {
        slots.push({
          id: `slot-${start.getTime()}`,
          title: "Available",
          start,
          end,
          patientId: "", // Placeholder
          doctorId: "clx0000000000000000000001", // Placeholder Doctor ID
          status: "available",
        });
      }
    }
    return slots;
  };

  useEffect(() => {
    // In a real application, you would fetch actual appointments for the selectedDate
    // For now, we'll generate dummy available slots
    setEvents(generateAvailableSlots(selectedDate));
  }, [selectedDate]);

  const services = [
    "Initial Consultation",
    "Follow-up Appointment",
    "Gut Health Assessment",
    "Hormonal Balance Consultation",
    "Chronic Fatigue Evaluation",
    "Stress & Sleep Optimization",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedSlot) {
      alert("Please select a date and time for your appointment.");
      return;
    }

    // Assuming a fixed patientId for now. This would come from auth context.
    const patientId = "clx0000000000000000000000"; // Placeholder Patient ID
    const doctorId = selectedSlot.doctorId; // Get doctorId from the selected slot

    const bookingData = {
      patientId,
      doctorId,
      startTime: selectedSlot.start.toISOString(),
      endTime: selectedSlot.end.toISOString(),
      notes: formData.message,
      // service: formData.service, // Service can be stored in notes or a separate field if needed
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to book appointment');
      }

      alert("Booking request submitted successfully! We'll contact you shortly to confirm your appointment.");
      // Optionally reset form
      setSelectedSlot(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
      // Refresh events to show the booked slot (in a real app, this would involve re-fetching from API)
      setEvents(generateAvailableSlots(selectedDate));
    } catch (error: any) {
      console.error("Error booking appointment:", error);
      alert(`Error booking appointment: ${error.message}`);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    // Check if the selected slot is an available slot (not an existing event)
    const isAvailable = events.some(
      (event) => event.start.getTime() === start.getTime() && event.end.getTime() === end.getTime() && event.status === "available"
    );

    if (isAvailable) {
      setSelectedSlot({ start, end, doctorId: "clx0000000000000000000001" }); // Assuming a default doctor for now
    } else {
      setSelectedSlot(null);
      alert("This slot is not available or already booked.");
    }
  };

  const handleSelectEvent = (event: AppointmentEvent) => {
    if (event.status === "available") {
      setSelectedSlot({ start: event.start, end: event.end, doctorId: event.doctorId });
    } else {
      setSelectedSlot(null);
      alert("This slot is not available or already booked.");
    }
  };

  const eventPropGetter = (event: AppointmentEvent) => {
    const style = {
      backgroundColor: event.status === "available" ? "#4CAF50" : "#F44336", // Green for available, Red for booked
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
    };
    return {
      style: style,
    };
  };

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
            <div className="space-y-6 lg:col-span-1">
              <Card className="border-border/50 bg-card p-6 animate-in fade-in slide-in-from-left-8 duration-1000">
                <div className="mb-4 inline-flex rounded-full bg-primary/10 p-3">
                  <CalendarIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground text-lg">Flexible Scheduling</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Choose a date and time that works best for your schedule. We offer appointments throughout the week.
                </p>
              </Card>

              <Card className="border-border/50 bg-card p-6 animate-in fade-in slide-in-from-left-8 duration-1000 delay-100">
                <div className="mb-4 inline-flex rounded-full bg-accent/10 p-3">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground text-lg">60-Minute Sessions</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Initial consultations are comprehensive 60-minute sessions to fully understand your health concerns.
                </p>
              </Card>

              <Card className="border-border/50 bg-card p-6 animate-in fade-in slide-in-from-left-8 duration-1000 delay-200">
                <div className="mb-4 inline-flex rounded-full bg-primary/10 p-3">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground text-lg">Expert Care</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Meet with our experienced functional medicine specialists who will create a personalized care plan.
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

                <div className="space-y-2">
                  <Label>Select Date and Time *</Label>
                  <div className="h-[500px] w-full">
                    <Calendar
                      localizer={localizer}
                      events={events}
                      startAccessor="start"
                      endAccessor="end"
                      selectable
                      onSelectSlot={handleSelectSlot}
                      onSelectEvent={handleSelectEvent}
                      defaultView="week"
                      views={["month", "week", "day"]}
                      step={60}
                      timeslots={1}
                      min={new Date(0, 0, 0, 9, 0, 0)} // 9 AM
                      max={new Date(0, 0, 0, 17, 0, 0)} // 5 PM
                      eventPropGetter={eventPropGetter}
                      style={{ height: "100%" }}
                    />
                  </div>
                  {selectedSlot && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Selected: {format(selectedSlot.start, "PPP p", { locale: enUS })} - {format(selectedSlot.end, "p", { locale: enUS })} (Doctor ID: {selectedSlot.doctorId})
                    </p>
                  )}
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
