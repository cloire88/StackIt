"use client"

import type React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { useEffect, useState } from "react"

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<string>("User")
  const [isLoadingUser, setIsLoadingUser] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/profile")
        if (response.ok) {
          const { profile } = await response.json()
          setUser(profile?.username || "User")
        } else {
          console.error('Failed to fetch profile')
          setUser("User")
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
        setUser("User")
      } finally {
        setIsLoadingUser(false)
      }
    }
    fetchUser()
  }, [])

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset className="bg-gradient-to-br from-blue-500 via-blue-600 to-slate-800">{children}</SidebarInset>
    </SidebarProvider>
  )
} 