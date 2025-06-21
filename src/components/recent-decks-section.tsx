"use client"

import { DeckCard } from "./deck-card"
import type { Deck } from "@/types/deck"

interface RecentDecksSectionProps {
  decks: Deck[]
  onDeckClick: (deck: Deck) => void
}

export function RecentDecksSection({ decks, onDeckClick }: RecentDecksSectionProps) {
  if (decks.length === 0) {
    return (
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white mb-6">Terakhir dibuka</h2>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center">
          <p className="text-white/70">Belum ada deck yang dibuka</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold text-white mb-6">Terakhir dibuka</h2>
      <div className="space-y-4">
        {decks.map((deck) => (
          <DeckCard key={deck.id} deck={deck} onClick={onDeckClick} />
        ))}
      </div>
    </div>
  )
}
