"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast.warning("Please enter your email address.")
      return
    }
    setIsLoading(true)

    const { error } = await supabase.from("newsletter_subscribers").insert({ email })

    setIsLoading(false)

    if (error) {
      if (error.code === "23505") { // Unique constraint violation
        toast.info("You are already subscribed to our newsletter.")
      } else {
        toast.error("Failed to subscribe. Please try again.")
        console.error("Error subscribing to newsletter:", error)
      }
    } else {
      toast.success("You have been subscribed to our newsletter!")
      setEmail("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Subscribing..." : "Subscribe"}
      </Button>
    </form>
  )
}
