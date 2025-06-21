"use client"

import { BookOpen, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface StudyActionButtonsProps {
  onStartStudy: () => void
  onAddCard: () => void
}

export function StudyActionButtons({ onStartStudy, onAddCard }: StudyActionButtonsProps) {
  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 flex gap-4 z-10">
      <Button
        onClick={onStartStudy}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
      >
        <BookOpen className="w-5 h-5" />
        <span>Mulai Belajar</span>
      </Button>
      <Button
        onClick={onAddCard}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
      >
        <Plus className="w-5 h-5" />
        <span>Tambah Kartu</span>
      </Button>
    </div>
  )
}
