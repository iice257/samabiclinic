import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Plus } from "lucide-react"

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
  ]

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground text-lg">Manage your website content and settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    </div>
  )
}
