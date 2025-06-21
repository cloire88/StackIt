"use client"

import { Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface AddDeckCardProps {
  onClick: () => void
}

export function AddDeckCard({ onClick }: AddDeckCardProps) {
  return (
    <Card
      className="bg-white/20 backdrop-blur-sm border-2 border-dashed border-white/30 hover:bg-white/30 transition-all duration-200 cursor-pointer hover:scale-[1.02]"
      onClick={onClick}
    >
      <CardContent className="p-8 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Plus className="w-8 h-8 text-white" />
          <span className="text-white/80 text-sm font-medium">Tambah Deck Baru</span>
        </div>
      </CardContent>
    </Card>
  )
}
