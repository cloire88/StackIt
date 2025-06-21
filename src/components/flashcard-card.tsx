"use client"

import { ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { FlashcardContextMenu } from "./context-menus/flashcard-context-menu"
import type { Flashcard } from "@/types/flashcard"

interface FlashcardCardProps {
  flashcard: Flashcard
  onClick: (flashcard: Flashcard) => void
  onRename?: (flashcardId: number) => void
  onDelete?: (flashcardId: number) => void
}

export function FlashcardCard({ flashcard, onClick, onRename, onDelete }: FlashcardCardProps) {
  const handleClick = () => {
    onClick(flashcard)
  }

  return (
    <FlashcardContextMenu onRename={() => onRename?.(flashcard.id)} onDelete={() => onDelete?.(flashcard.id)}>
      <Card
        className="bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer hover:scale-[1.02] group"
        onClick={handleClick}
      >
        <CardContent className="p-6 flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-medium text-gray-800 truncate">{flashcard.title}</h3>
            {flashcard.content && <p className="text-gray-600 text-sm mt-1 line-clamp-2">{flashcard.content}</p>}
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors shrink-0 ml-4" />
        </CardContent>
      </Card>
    </FlashcardContextMenu>
  )
}
