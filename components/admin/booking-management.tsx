"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Trash2 } from "lucide-react"
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
  created_at: string
}

export function BookingManagement() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase.from("appointments").select("*").order("date", { ascending: true })

      if (error) throw error
      setBookings(data || [])
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
    <div className="container mx-auto px-4 py-4 md:px-8 md:py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-primary">Bookings & Appointments</h1>
        <p className="text-muted-foreground text-lg">Here's where you view and manage your bookings.</p>
      </div>
      {bookings.map((booking) => (
        <Card key={booking.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold">{booking.name}</h3>
                  <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                    {booking.status || "Pending"}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div>
                    <p className="font-medium text-foreground">Service</p>
                    <p>{booking.service}</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Date & Time</p>
                    <p>
                      {new Date(booking.date).toLocaleDateString()} at {booking.time}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <p>{booking.email}</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Phone</p>
                    <p>{booking.phone}</p>
                  </div>
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
  )
}
