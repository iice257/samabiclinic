"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Mail } from "lucide-react"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"
import link from "next/link"

interface Newsletter {
  id: string
  subject: string
  created_at: string
  sent_at: string | null
  subscriber_count: number
}

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
      const { count } = await supabase.from("newsletter_subscribers").select("*", { count: "exact", head: true })

      setSubscribers(count || 0)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error)
      toast.error("Failed to load newsletter data")
      setIsLoading(false)
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
    <div className="container mx-auto px-4 py-4 md:px-8 md:py-8">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-muted-foreground text-lg">Total Subscribers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-3xl font-bold">{subscribers}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-muted-foreground text-lg">Create Newsletter</CardTitle>
            </CardHeader>
            <CardContent>
              <a href="/admin/newsletters/new">
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  New Newsletter
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="text-muted-foreground">
            <CardTitle>Newsletter Subscribers</CardTitle>
            <CardDescription>Manage your newsletter subscriber list</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>You have {subscribers} active subscribers</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
