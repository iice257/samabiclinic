"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Trash2, ChevronDown, ChevronUp } from "lucide-react"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"

interface Booking {
  id: string
  name: string
  email: string
  phone: string
  service: string
  date: string
  time: string
  status: string
  message?: string
  created_at: string
}

export function BookingManagement() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [expandedBookings, setExpandedBookings] = useState<Set<string>>(new Set())
  const [bookingStats, setBookingStats] = useState({ total: 0, last7Days: 0 })

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase.from("appointments").select("*").order("date", { ascending: true })

      if (error) throw error

      const bookingsData = data || []
      setBookings(bookingsData)

      // Calculate stats
      const now = new Date()
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      const last7Days = bookingsData.filter((b) => new Date(b.created_at) >= sevenDaysAgo).length

      setBookingStats({
        total: bookingsData.length,
        last7Days,
      })
    } catch (error) {
      console.error("Error fetching bookings:", error)
      toast.error("Failed to load bookings")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return

    try {
      const supabase = createClient()
      const { error } = await supabase.from("appointments").delete().eq("id", id)

      if (error) throw error
      toast.success("Booking deleted successfully")
      fetchBookings()
    } catch (error) {
      console.error("Error deleting booking:", error)
      toast.error("Failed to delete booking")
    }
  }

  const toggleExpanded = (bookingId: string) => {
    const newExpanded = new Set(expandedBookings)
    if (newExpanded.has(bookingId)) {
      newExpanded.delete(bookingId)
    } else {
      newExpanded.add(bookingId)
    }
    setExpandedBookings(newExpanded)
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

  if (bookings.length === 0) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground">No bookings yet</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 text-sm">
        <div>
          <p className="text-muted-foreground">Total Bookings</p>
          <p className="text-2xl font-bold">{bookingStats.total}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Last 7 Days</p>
          <p className="text-2xl font-bold text-primary">{bookingStats.last7Days}</p>
        </div>
      </div>

      <div className="space-y-2">
        {bookings.map((booking) => (
          <Card key={booking.id} className="hover:shadow-md transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <button onClick={() => toggleExpanded(booking.id)} className="p-1 hover:bg-muted rounded">
                    {expandedBookings.has(booking.id) ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{booking.name}</h3>
                      <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                        {booking.status || "Pending"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {booking.service} • {new Date(booking.date).toLocaleDateString()} at {booking.time}
                    </p>

                    {expandedBookings.has(booking.id) && (
                      <div className="mt-3 pt-3 border-t space-y-2 text-sm">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-muted-foreground">Email</p>
                            <p className="font-medium">{booking.email}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Phone</p>
                            <p className="font-medium">{booking.phone}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Booked On</p>
                            <p className="font-medium">{new Date(booking.created_at).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Service</p>
                            <p className="font-medium">{booking.service}</p>
                          </div>
                        </div>
                        {booking.message && (
                          <div>
                            <p className="text-muted-foreground">Message</p>
                            <p className="font-medium">{booking.message}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleDelete(booking.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
