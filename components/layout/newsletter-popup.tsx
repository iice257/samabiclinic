"use client"

import { useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { NewsletterForm } from "./newsletter-form"

interface NewsletterPopupProps {
  onClose: () => void
}

export function NewsletterPopup({ onClose }: NewsletterPopupProps) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }
    window.addEventListener("keydown", handleEsc)
    return () => {
      window.removeEventListener("keydown", handleEsc)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-in fade-in">
      <Card className="w-full max-w-md m-4 relative animate-in zoom-in-95">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 rounded-full"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        <CardHeader>
          <CardTitle>Stay in the Loop!</CardTitle>
          <CardDescription>
            Subscribe to our newsletter for the latest health tips, articles, and clinic updates.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NewsletterForm />
        </CardContent>
      </Card>
    </div>
  )
}
