"use client"

import { BookOpen, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface StudyActionButtonsProps {
  onStartStudy: () => void
}

export function StudyActionButtons({ onStartStudy }: StudyActionButtonsProps) {
  return (
    <div className="flex justify-center mt-8">
      <Button
        onClick={onStartStudy}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
      >
        <BookOpen className="w-5 h-5" />
        <span>Mulai Belajar</span>
      </Button>
    </div>
  )
}
