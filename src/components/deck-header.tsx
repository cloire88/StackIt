"use client"

import { ChevronLeft, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DeckHeaderProps {
  title: string
  onBack: () => void
  onPlay: () => void
}

export function DeckHeader({ title, onBack, onPlay }: DeckHeaderProps) {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-slate-800 text-white p-4 flex items-center justify-between shadow-lg">
      <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 transition-colors" onClick={onBack}>
        <ChevronLeft className="w-6 h-6" />
      </Button>

      <h1 className="text-xl font-semibold truncate max-w-xs">{title}</h1>

      <Button
        variant="ghost"
        size="icon"
        className="text-white hover:bg-white/20 bg-white/10 rounded-lg transition-colors"
        onClick={onPlay}
      >
        <Play className="w-5 h-5 ml-1" />
      </Button>
    </div>
  )
}
