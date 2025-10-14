"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { CalendarIcon, Clock, User, Mail, Phone, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { toast } from "sonner"

interface BookingFormProps {
  onAppointmentBooked: () => void
}

export function BookingForm({ onAppointmentBooked }: BookingFormProps) {
  const [date, setDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

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

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!date || !selectedTime) {
      toast.warning("Please select a date and time.")
      return
    }
    setIsLoading(true)

    const { error } = await supabase.from("appointments").insert({
      ...formData,
      date: format(date, "yyyy-MM-dd"),
      time: selectedTime,
    })

    setIsLoading(false)

    if (error) {
      toast.error("Failed to book appointment. Please try again.")
      console.error("Error booking appointment:", error)
    } else {
      toast.success("Appointment request submitted successfully!")
      setFormData({ name: "", email: "", phone: "", service: "", message: "" })
      setDate(undefined)
      setSelectedTime(undefined)
      onAppointmentBooked()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-6 border-t border-border">
        <h3 className="font-semibold text-foreground text-xl">Appointment Details</h3>
        <div className="space-y-2">
          <Label htmlFor="service">Service Type *</Label>
          <Select
            value={formData.service}
            onValueChange={(value) => handleInputChange("service", value)}
            required
          >
            <SelectTrigger>
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
                  className="w-full justify-start text-left font-normal"
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
              <SelectTrigger>
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
            placeholder="Tell us about your health concerns..."
            rows={4}
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
          />
        </div>
      </div>

      <div className="pt-6">
        <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
          {isLoading ? "Confirming..." : "Confirm Booking"}
        </Button>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          By booking, you agree to our terms. We will contact you to confirm.
        </p>
      </div>
    </form>
  )
}
