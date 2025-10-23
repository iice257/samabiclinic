"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface Contact {
  id: string
  name: string | null
  email: string
  phone?: string
  createdAt: string
  source: string
}

export function ContactsManagement() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const supabase = createClient()
      const allContacts: Contact[] = []

      // Fetch from contact_submissions
      const { data: contactData } = await supabase
        .from("contact_submissions")
        .select("id, name, email, phone, created_at")
        .order("created_at", { ascending: false })

      if (contactData) {
        allContacts.push(
          ...contactData.map((c) => ({
            id: c.id,
            name: c.name,
            email: c.email,
            phone: c.phone,
            createdAt: c.created_at,
            source: "Contact Form",
          })),
        )
      }

      // Fetch from newsletter_subscribers
      const { data: newsletterData } = await supabase
        .from("newsletter_subscribers")
        .select("id, email, created_at")
        .order("created_at", { ascending: false })

      if (newsletterData) {
        allContacts.push(
          ...newsletterData.map((n) => ({
            id: n.id,
            name: null,
            email: n.email,
            createdAt: n.created_at,
            source: "Newsletter",
          })),
        )
      }

      // Fetch from appointments
      const { data: appointmentData } = await supabase
        .from("appointments")
        .select("id, name, email, phone, created_at")
        .order("created_at", { ascending: false })

      if (appointmentData) {
        allContacts.push(
          ...appointmentData.map((a) => ({
            id: a.id,
            name: a.name,
            email: a.email,
            phone: a.phone,
            createdAt: a.created_at,
            source: "Booking",
          })),
        )
      }

      // Fetch from blog_comments
      const { data: commentData } = await supabase
        .from("blog_comments")
        .select("id, name, created_at")
        .order("created_at", { ascending: false })

      if (commentData) {
        allContacts.push(
          ...commentData.map((c) => ({
            id: c.id,
            name: c.name,
            email: `${c.name}-comment@blog.local`,
            createdAt: c.created_at,
            source: "Blog Comment",
          })),
        )
      }

      // Sort by date descending
      allContacts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      setContacts(allContacts)
    } catch (error) {
      console.error("Error fetching contacts:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Contacts</CardTitle>
        <CardDescription>Complete list of all contacts from various sources</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4 font-semibold">Name</th>
                <th className="text-left py-2 px-4 font-semibold">Email</th>
                <th className="text-left py-2 px-4 font-semibold">Phone</th>
                <th className="text-left py-2 px-4 font-semibold">Date Added</th>
                <th className="text-left py-2 px-4 font-semibold">Source</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={`${contact.source}-${contact.id}`} className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4">
                    {contact.name || <span className="text-muted-foreground italic">Not provided</span>}
                  </td>
                  <td className="py-3 px-4">{contact.email}</td>
                  <td className="py-3 px-4">{contact.phone || "-"}</td>
                  <td className="py-3 px-4">{new Date(contact.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                      {contact.source}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
