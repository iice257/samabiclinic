"use client"

import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Plus, LogOut, Moon, Sun, Home, Mail, Calendar, Newspaper, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

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
  {
    title: "Contacts",
    href: "/admin/contacts",
    icon: Users,
  },
]

export function AdminSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const [isDark, setIsDark] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    router.push("/admin/login")
  }

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <aside className="sticky top-0 left-0 w-64 bg-muted/30 border-r border-border max-h-screen min-h-screen flex flex-col">
      <div className="flex items-center justify-between p-2 border-b border-border">
        <Link href="/admin" className="flex items-center gap-2">
          <Image src="/favicon.png" alt="Samabi Logo" width={20} height={20} className="rounded-sm" />
          <h2 className="text-muted-primary text-xl font-bold">Samabi Admin</h2>
        </Link>
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
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
        <Button variant={"outline"} asChild className="w-full justify-start">
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
