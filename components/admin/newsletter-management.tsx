"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Mail, Send, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import type { Tables } from "@/lib/supabase/database.types"

type Newsletter = Tables<"newsletters">

export function NewsletterManagement() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([])
  const [subscribers, setSubscribers] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const supabase = createClient()

      // Fetch subscriber count
      const { count: subCount, error: subError } = await supabase
        .from("newsletter_subscribers")
        .select("*", { count: "exact", head: true })
      if (subError) throw subError
      setSubscribers(subCount || 0)

      // Fetch newsletters
      const { data: nlData, error: nlError } = await supabase
        .from("newsletters")
        .select("*")
        .order("created_at", { ascending: false })
      if (nlError) throw nlError
      setNewsletters(nlData || [])
    } catch (error) {
      console.error("Error fetching data:", error)
      toast.error("Failed to load newsletter data")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this newsletter?")) return

    try {
      const supabase = createClient()
      const { error } = await supabase.from("newsletters").delete().eq("id", id)

      if (error) throw error
      toast.success("Newsletter deleted successfully")
      fetchData()
    } catch (error) {
      console.error("Error deleting newsletter:", error)
      toast.error("Failed to delete newsletter")
    }
  }

  const handleSend = async (id: string) => {
    if (!confirm("Are you sure you want to send this newsletter to all subscribers?")) return

    try {
      // Simulate sending newsletter
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const supabase = createClient()
      const { error } = await supabase
        .from("newsletters")
        .update({ status: "sent", sent_at: new Date().toISOString() })
        .eq("id", id)

      if (error) throw error
      toast.success("Newsletter sent successfully!")
      fetchData()
    } catch (error) {
      console.error("Error sending newsletter:", error)
      toast.error("Failed to send newsletter.")
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <Skeleton className="h-4 w-4" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Subscribers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold mb-4">{subscribers}</p>
            <Button variant="outline" asChild className="w-full bg-transparent">
              <Link href="/admin?tab=contacts">View All Contacts</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Create Newsletter</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href="/admin/newsletters/new">
              <Button className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                New Newsletter
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Newsletters</CardTitle>
          <CardDescription>Manage your created newsletters</CardDescription>
        </CardHeader>
        <CardContent>
          {newsletters.length === 0 ? (
            <div className="py-10 text-center text-muted-foreground">
              <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No newsletters created yet.</p>
              <Link href="/admin/newsletters/new">
                <Button className="mt-4">Create your first newsletter</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {newsletters.map((nl) => (
                <Card key={nl.id} className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-semibold">{nl.subject}</p>
                    <p className="text-sm text-muted-foreground">
                      Created: {new Date(nl.created_at).toLocaleDateString()}
                      {nl.status === "sent" && ` | Sent: ${new Date(nl.sent_at!).toLocaleDateString()}`}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {nl.status !== "sent" && (
                      <Button variant="outline" size="sm" onClick={() => handleSend(nl.id)}>
                        <Send className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/newsletters/edit/${nl.id}`}>
                        <Mail className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(nl.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
