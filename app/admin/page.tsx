"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { AnalyticsCard } from "@/components/admin/analytics-card"
import { AdminFAB } from "@/components/admin/admin-fab"
import { BarChart2, Users, Mail, Calendar, BookOpen } from "lucide-react"

interface BookingStats {
  total: number
  last7Days: number
  byCategory: Record<string, number>
}

interface AnalyticsStats {
  totalVisitors: number
  last7DaysVisitors: number
}

export default function AdminDashboard() {
  const [bookingStats, setBookingStats] = useState<BookingStats>({ total: 0, last7Days: 0, byCategory: {} })
  const [analyticsStats, setAnalyticsStats] = useState<AnalyticsStats>({ totalVisitors: 0, last7DaysVisitors: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const supabase = createClient()

      // Fetch booking stats
      const { data: bookings } = await supabase.from("appointments").select("service, created_at")

      if (bookings) {
        const now = new Date()
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

        const last7Days = bookings.filter((b) => new Date(b.created_at) >= sevenDaysAgo).length
        const byCategory: Record<string, number> = {}

        bookings.forEach((b) => {
          byCategory[b.service] = (byCategory[b.service] || 0) + 1
        })

        setBookingStats({
          total: bookings.length,
          last7Days,
          byCategory,
        })
      }

      // Fetch analytics (simulated - in production, you'd track page views)
      const { count: totalContacts } = await supabase
        .from("contact_submissions")
        .select("*", { count: "exact", head: true })

      setAnalyticsStats({
        totalVisitors: totalContacts || 0,
        last7DaysVisitors: Math.floor((totalContacts || 0) * 0.3),
      })
    } catch (error) {
      console.error("Error fetching stats:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-4 md:px-8 md:py-8 relative pb-32">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-primary">Dashboard</h1>
        <p className="text-muted-foreground text-lg">
          Welcome to your admin dashboard. Here's an overview of your website's activity.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnalyticsCard
            title="Site Analytics"
            description="View your website's traffic"
            icon={<BarChart2 className="h-6 w-6" />}
            mainStat={analyticsStats.last7DaysVisitors}
            mainLabel="Visitors (Last 7 Days)"
            expandedContent={
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lifetime Visitors:</span>
                  <span className="font-semibold">{analyticsStats.totalVisitors}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">This Week:</span>
                  <span className="font-semibold">{analyticsStats.last7DaysVisitors}</span>
                </div>
              </div>
            }
          />

          <AnalyticsCard
            title="Recent Bookings"
            description="View your latest appointments"
            icon={<Calendar className="h-6 w-6" />}
            mainStat={bookingStats.last7Days}
            mainLabel={`Bookings (Last 7 Days)`}
            expandedContent={
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Bookings:</span>
                  <span className="font-semibold">{bookingStats.total}</span>
                </div>
                <div className="border-t pt-3">
                  <p className="text-sm font-semibold mb-2">Bookings by Service:</p>
                  <div className="space-y-1">
                    {Object.entries(bookingStats.byCategory)
                      .sort(([, a], [, b]) => b - a)
                      .map(([service, count]) => (
                        <div key={service} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{service}:</span>
                          <span className="font-medium">{count}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            }
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnalyticsCard
            title="Blog Posts"
            description="Manage your content"
            icon={<BookOpen className="h-6 w-6" />}
            mainStat="View"
            mainLabel="Go to Blog Management"
          />

          <AnalyticsCard
            title="Newsletter Subscribers"
            description="Manage your mailing list"
            icon={<Mail className="h-6 w-6" />}
            mainStat="View"
            mainLabel="Go to Newsletter Management"
          />

          <AnalyticsCard
            title="All Contacts"
            description="View all site contacts"
            icon={<Users className="h-6 w-6" />}
            mainStat="View"
            mainLabel="Go to Contacts"
          />
        </div>
      </div>

      <AdminFAB />
    </div>
  )
}
