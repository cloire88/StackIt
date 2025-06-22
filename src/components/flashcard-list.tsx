"use client"

import { FlashcardCard } from "./flashcard-card"
import type { FlashcardListProps } from "@/types/flashcard"

interface ExtendedFlashcardListProps extends FlashcardListProps {
  onDelete?: (flashcardId: string) => void
}

export function FlashcardList({ flashcards, onFlashcardClick,  onDelete }: ExtendedFlashcardListProps) {
  if (flashcards.length === 0) {
    return (
      <div className="space-y-4 mb-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center">
          <p className="text-white/70 mb-2">Belum ada flashcard dalam deck ini</p>
          <p className="text-white/50 text-sm">Tambahkan flashcard pertama untuk mulai belajar</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 mb-8">
      {flashcards.map((flashcard) => (
        <FlashcardCard
          key={flashcard.id}
          flashcard={flashcard}
          onClick={onFlashcardClick}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
