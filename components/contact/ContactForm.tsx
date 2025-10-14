"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send } from "lucide-react"
import { toast } from "sonner"

interface ContactFormProps {
  onFormSubmitted: () => void
}

export function ContactForm({ onFormSubmitted }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Mock submission since there's no table
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log("Contact form submitted:", formData)

    setIsLoading(false)
    toast.success("Your message has been sent successfully!")
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    onFormSubmitted()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name *</Label>
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
          <Label htmlFor="email">Email *</Label>
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
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+234 800 000 0000"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
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
          <SelectTrigger>
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
        />
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
        <Send className="mr-2 h-5 w-5" />
        {isLoading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  )
}
