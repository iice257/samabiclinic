import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Plus, Edit } from "lucide-react"

export default function AdminDashboard() {
  const adminPages = [
    {
      title: "Blog Dashboard",
      description: "View and manage all blog posts",
      href: "/admin/blog",
      icon: BookOpen,
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      title: "Create New Post",
      description: "Write and publish a new blog post",
      href: "/admin/blog/new",
      icon: Plus,
      color: "bg-green-500/10 text-green-600",
    },
    {
      title: "Edit Posts",
      description: "Edit existing blog posts and manage drafts",
      href: "/admin/blog",
      icon: Edit,
      color: "bg-purple-500/10 text-purple-600",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-10 px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground text-lg">Manage your website content and settings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminPages.map((page) => {
            const Icon = page.icon
            return (
              <Link key={page.href} href={page.href}>
                <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${page.color} flex items-center justify-center mb-4`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle>{page.title}</CardTitle>
                    <CardDescription>{page.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full bg-transparent">
                      Access
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        <div className="mt-12 p-6 bg-muted/30 rounded-lg border border-border">
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link href="/admin/blog">Blog Dashboard</Link>
            </Button>
            <Button asChild>
              <Link href="/admin/blog/new">New Post</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">View Website</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
