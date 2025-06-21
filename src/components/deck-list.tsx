"use client"

import { DeckCard } from "./deck-card"
import type { Deck } from "@/types/deck"

interface DeckListProps {
  decks: Deck[]
  onDeckClick: (deck: Deck) => void
  searchQuery?: string
  onAddTag?: (deckId: number) => void
  onRename?: (deckId: number) => void
  onDelete?: (deckId: number) => void
}

export function DeckList({ decks, onDeckClick, searchQuery = "", onAddTag, onRename, onDelete }: DeckListProps) {
  const filteredDecks = decks.filter((deck) => deck.title.toLowerCase().includes(searchQuery.toLowerCase()))

  if (filteredDecks.length === 0 && searchQuery) {
    return (
      <div className="space-y-4 mb-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center">
          <p className="text-white/70">Tidak ada deck yang ditemukan untuk "{searchQuery}"</p>
        </div>
      </div>
    )
  }

  if (filteredDecks.length === 0) {
    return (
      <div className="space-y-4 mb-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center">
          <p className="text-white/70">Belum ada deck yang dibuat</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 mb-6">
      {filteredDecks.map((deck) => (
        <DeckCard
          key={deck.id}
          deck={deck}
          onClick={onDeckClick}
          onAddTag={onAddTag}
          onRename={onRename}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
