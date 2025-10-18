"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Plus, Mail, Calendar } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BlogPostsList } from "@/components/admin/blog-posts-list"
import { NewsletterManagement } from "@/components/admin/newsletter-management"
import { BookingManagement } from "@/components/admin/booking-management"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground text-lg">Manage your website content and settings</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="newsletters">Newsletters</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="new-post">New Post</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/admin/blog">
              <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <CardTitle>Blog Dashboard</CardTitle>
                  <CardDescription>View and manage all blog posts</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full bg-transparent">
                    Access
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/blog/new">
              <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-green-500/10 text-green-600 flex items-center justify-center mb-4">
                    <Plus className="h-6 w-6" />
                  </div>
                  <CardTitle>Create New Post</CardTitle>
                  <CardDescription>Write and publish a new blog post</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full bg-transparent">
                    Create
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/newsletters">
              <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center mb-4">
                    <Mail className="h-6 w-6" />
                  </div>
                  <CardTitle>Newsletters</CardTitle>
                  <CardDescription>Manage newsletters and subscribers</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full bg-transparent">
                    Manage
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/bookings">
              <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center mb-4">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <CardTitle>Bookings</CardTitle>
                  <CardDescription>View and manage appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full bg-transparent">
                    Manage
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </TabsContent>

        <TabsContent value="blog" className="space-y-4">
          <BlogPostsList />
        </TabsContent>

        <TabsContent value="newsletters" className="space-y-4">
          <NewsletterManagement />
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <BookingManagement />
        </TabsContent>

        <TabsContent value="new-post" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New Post</CardTitle>
              <CardDescription>Write and publish a new blog post</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/admin/blog/new">Go to Editor</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
