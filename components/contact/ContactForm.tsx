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
import { createClient } from "@/lib/supabase/client"

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
  const supabase = createClient()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await supabase.from("contact_submissions").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      })

      setIsLoading(false)

      // Log full response for easier debugging in browser console
      // response: { data, error, status, statusText }
      try {
        console.debug("Supabase client shape:", {
          hasFrom: typeof (supabase as any)?.from === "function",
          clientType: typeof supabase,
        })
      } catch (e) {
        console.debug("Supabase client debug failed", e)
      }

      console.debug("Supabase insert response:", response)
      console.debug("response.status:", (response as any)?.status, "response.statusText:", (response as any)?.statusText)
      try {
        const errMsg = (response as any)?.error?.message ?? JSON.stringify((response as any)?.error) ?? null
        console.debug("response.error.message:", errMsg)
      } catch (e) {
        console.debug("Could not stringify response.error", e)
      }

      if (response.error) {
        toast.error("Failed to send message. Please try again.")
        // Print multiple forms of the error to help identify empty object cases
        console.error("Error submitting contact form (raw):", response.error)
        try {
          console.error("Error submitting contact form (stringified):", JSON.stringify(response.error))
        } catch (e) {
          console.error("Error stringifying response.error:", e)
        }
      } else {
        toast.success("Your message has been sent successfully!")
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
        onFormSubmitted()
      }
    } catch (err) {
      setIsLoading(false)
      toast.error("Failed to send message due to an unexpected error.")
      console.error("Unexpected error submitting contact form:", err)
    }
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
        <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)} required>
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
