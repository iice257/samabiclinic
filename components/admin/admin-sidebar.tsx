"use client"

import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Plus, LogOut, Home } from "lucide-react"
import { cn } from "@/lib/utils"

const adminLinks = [
  {
    title: "Blog Dashboard",
    href: "/admin/blog",
    icon: BookOpen,
  },
  {
    title: "New Post",
    href: "/admin/blog/new",
    icon: Plus,
  },
]

export function AdminSidebar() {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    router.push("/admin/login")
  }

  return (
    <aside className="w-64 bg-muted/30 border-r border-border min-h-screen flex flex-col">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-bold">Admin Panel</h2>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {adminLinks.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href || pathname.startsWith(link.href + "/")
          return (
            <Link key={link.href} href={link.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn("w-full justify-start", isActive && "bg-primary text-primary-foreground")}
              >
                <Icon className="h-4 w-4 mr-2" />
                {link.title}
              </Button>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border space-y-2">
        <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
          <Link href="/">
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>
        <Button variant="destructive" className="w-full justify-start" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </aside>
  )
}
