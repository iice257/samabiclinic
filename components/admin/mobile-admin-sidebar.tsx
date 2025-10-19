"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { BookOpen, Plus, LogOut, Home, Mail, Calendar, Newspaper, X, Menu, Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

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

export function MobileAdminSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const pathname = usePathname()

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 top-0 md:hidden bg-background/95 backdrop-blur-lg z-50 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <Link href="/admin" className="flex items-center gap-2">
              <Image
                src="/favicon.png"
                alt="Samabi Logo"
                width={30}
                height={30}
                className="rounded-sm object-cover transition-transform duration-700 group-hover:scale-105"
              />  
              <h2 className="text-muted-primary text-2xl font-bold">Samabi Admin</h2>
        </Link>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-6 w-6" />
            </Button>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {adminLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all font-medium",
                    isActive
                      ? "bg-primary text-primary-foreground hover:text-primary-foreground"
                      : "text-muted-foreground hover:text-primary"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <link.icon className="h-4 w-4" />
                  {link.title}
                </Link>
              )
            })}
            <hr className="my-2 border-border" />
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/admin/blog/new" onClick={() => setIsOpen(false)}>
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Link>
            </Button>
          </nav>

          <div className="p-4 border-t border-border space-y-2">
            <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
              <Link href="/" onClick={() => setIsOpen(false)}>
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <Button variant="destructive" className="w-full justify-start">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
