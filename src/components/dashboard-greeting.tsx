"use client"

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DashboardGreetingProps {
  userName: string
  onSearchClick?: () => void
}

export function DashboardGreeting({ userName, onSearchClick }: DashboardGreetingProps) {
  return (
    <div className="mb-8 flex items-start justify-between">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-white leading-tight">Halo, {userName}</h1>
        <p className="text-xl text-white/90">Belajar apa hari ini?</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="text-white hover:bg-white/20 transition-colors shrink-0"
        onClick={onSearchClick}
      >
        <Search className="w-6 h-6" />
      </Button>
    </div>
  )
}
