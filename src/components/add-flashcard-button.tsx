"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AddFlashcardButtonProps {
  onClick: () => void
}

export function AddFlashcardButton({ onClick }: AddFlashcardButtonProps) {
  return (
    <div className="flex justify-center">
      <Button
        onClick={onClick}
        className="w-16 h-16 rounded-full bg-white hover:bg-gray-50 shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
      >
        <Plus className="w-8 h-8 text-blue-500" />
      </Button>
    </div>
  )
}
