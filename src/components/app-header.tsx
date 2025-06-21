"use client"

import Link from 'next/link'
import { Menu, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"

interface AppHeaderProps {
  onSettingsClick?: () => void
}

export function AppHeader({ onSettingsClick }: AppHeaderProps) {
  return (
    <header className="bg-blue-500 text-white p-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-white hover:bg-blue-600 transition-colors">
          <Menu className="w-6 h-6" />
        </SidebarTrigger>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center shadow-md">
          <div className="w-4 h-4 bg-orange-600 transform rotate-45" />
        </div>
        <Link href="/dashboard">
          <span className="text-xl font-bold">StackIt</span>
        </Link>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="text-white hover:bg-blue-600 transition-colors"
        onClick={onSettingsClick}
      >
        <Settings className="w-6 h-6" />
      </Button>
    </header>
  )
}
