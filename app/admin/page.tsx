"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Plus, Mail, Calendar, BarChart2, Users } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-4 md:px-8 md:py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-primary">Welcome!</h1>
        <p className="text-muted-foreground text-lg">Here's an overview of your website's activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer bg-card text-card-foreground">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
              <BarChart2 className="h-6 w-6" />
            </div>
            <CardTitle>Site Analytics</CardTitle>
            <CardDescription>View your website's traffic and engagement.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">6</p>
            <p className="text-sm text-muted-foreground">Total Visitors (Updates every 24hrs)</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer bg-card text-card-foreground">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
              <Users className="h-6 w-6" />
            </div>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>View and manage your latest appointments.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">N/A</p>
            <p className="text-sm text-muted-foreground">Go to bookings page</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
