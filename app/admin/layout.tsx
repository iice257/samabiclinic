"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// ... (rest of the imports remain the same)
import { GlobalSkeleton } from "@/components/ui/global-skeleton"
import { fab } from "@/components/ui/fab"
import { MobileAdminSidebar } from "@/components/admin/mobile-admin-sidebar"


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null) // null means checking
  const [showFab, setShowFab] = useState(true)

  useEffect(() => {
    if (pathname === "/admin/login") {
      setIsAuthenticated(false) // No auth needed for login page
      return
    }

    const checkAuth = () => {
      const authenticated = isAdminAuthenticated()
      if (!authenticated) {
        router.replace("/admin/login")
        setIsAuthenticated(false)
      } else {
        setIsAuthenticated(true)
      }
    }

    checkAuth()

    const handleScroll = () => {
      if (window.innerWidth < 768) { // Only apply on mobile screens
        const scrollHeight = document.documentElement.scrollHeight
        const scrollTop = document.documentElement.scrollTop
        const clientHeight = document.documentElement.clientHeight

        if (scrollTop + clientHeight >= scrollHeight * 0.8) {
          setShowFab(false)
        } else {
          setShowFab(true)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [router, pathname])

  if (isAuthenticated === null) {
    return <GlobalSkeleton /> // Show skeleton while checking auth
  }

  if (!isAuthenticated && pathname !== "/admin/login") {
    return null // Prevent rendering if not authenticated and not on login page
  }

  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden md:flex">
        <AdminSidebar />
      </div>
      <main className="flex-1">
        <div className="md:hidden p-4 border-b border-border flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2">
            <Image src="/favicon.png" width={30} height={30} alt="Samabi Logo" />
            <h2 className="text-2xl text-muted-primary font-bold">Samabi Admin</h2>
          </Link>
          <MobileAdminSidebar />
        </div>
        <div className="container mx-auto py-10 px-4">
          {children}
        </div>
        {showFab && (
          <div className="fixed bottom-15 right-15 z-50">
            {fab()}
          </div>
        )}
      </main>
    </div>
  )
}
