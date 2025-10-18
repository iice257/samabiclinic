"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { isAdminAuthenticated } from "@/lib/admin-auth"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const authenticated = isAdminAuthenticated()

    if (!authenticated && pathname !== "/admin/login") {
      router.push("/admin/login")
    } else if (authenticated) {
      setIsAuthenticated(true)
    }

    setIsLoading(false)
  }, [router, pathname])

  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1">
        <div className="container mx-auto py-10 px-4">{children}</div>
      </main>
    </div>
  )
}
