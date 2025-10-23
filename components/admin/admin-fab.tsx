"use client"

import { useState } from "react"
import { Plus, X, Mail, BookOpen } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function AdminFAB() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-8 right-8 z-40">
      {isOpen && (
        <div className="absolute bottom-24 right-0 flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Button
            asChild
            size="lg"
            className="rounded-full h-16 w-16 shadow-lg hover:shadow-xl transition-shadow bg-transparent"
            variant="outline"
          >
            <Link href="/admin/newsletters/new" title="Create Newsletter">
              <Mail className="h-6 w-6" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="rounded-full h-16 w-16 shadow-lg hover:shadow-xl transition-shadow bg-transparent"
            variant="outline"
          >
            <Link href="/admin/blog/new" title="Create Blog Post">
              <BookOpen className="h-6 w-6" />
            </Link>
          </Button>
        </div>
      )}

      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="lg"
        className="rounded-full h-24 w-24 shadow-lg hover:shadow-xl transition-all"
      >
        {isOpen ? <X className="h-8 w-8" /> : <Plus className="h-8 w-8" />}
      </Button>
    </div>
  )
}
