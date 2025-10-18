"use client"

import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { BookOpen, Plus, LogOut, Home, Mail, Calendar, Newspaper } from "lucide-react"
import { cn } from "@/lib/utils"

const adminLinks = [
  {
    title: "Home",
    href: "/admin",
    icon: Home,
  },
  {
    title: "Blog",
    href: "/admin/blog",
    icon: Newspaper,
  },
  {
    title: "Newsletters",
    href: "/admin/newsletters",
    icon: Mail,
  },
  {
    title: "Bookings",
    href: "/admin/bookings",
    icon: Calendar,
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
    <aside className="sticky top-0 left-0 w-64 bg-muted/30 border-r border-border min-h-screen max-h-screen flex flex-col">
      <div className="p-6 border-b border-border">
        <Link href="/admin" className="flex items-center gap-2">
          <Image
            src="/favicon.png"
            alt="Samabi Logo"
            width={40}
            height={40}
            className="rounded-sm object-cover transition-transform duration-700 group-hover:scale-105"
          />  
          <h2 className="text-muted-primary text-xl font-bold">Samabi Admin</h2>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {adminLinks.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href
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
        <hr className="my-2 border-border" />
        <Button variant={"secondary"} asChild className="w-full justify-start">
          <Link href="/admin/blog/new">
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Link>
        </Button>
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
