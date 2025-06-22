"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CreateDeckModal } from "./modals/create-deck-modal"
import { CreateCardModal } from "./modals/create-card-modal"

interface FloatingActionButtonProps {
  mode: "dashboard" | "deck"
  deckId?: string
  onDeckCreated?: (deckId: string) => void
  onCardCreated?: () => void
}

export function FloatingActionButton({ 
  mode, 
  deckId, 
  onDeckCreated, 
  onCardCreated 
}: FloatingActionButtonProps) {
  const [showCreateDeckModal, setShowCreateDeckModal] = useState(false)
  const [showCreateCardModal, setShowCreateCardModal] = useState(false)

  const handleCreateDeck = () => {
    setShowCreateDeckModal(true)
  }

  const handleCreateCard = () => {
    setShowCreateCardModal(true)
  }

  const handleDeckCreated = (deckId: string) => {
    setShowCreateDeckModal(false)
    onDeckCreated?.(deckId)
  }

  const handleCardCreated = () => {
    setShowCreateCardModal(false)
    onCardCreated?.()
  }

  return (
    <>
      <Button
        onClick={mode === "dashboard" ? handleCreateDeck : handleCreateCard}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg z-50 flex items-center justify-center"
      >
        <Plus className="w-6 h-6" />
      </Button>

      {mode === "dashboard" && (
        <CreateDeckModal
          isOpen={showCreateDeckModal}
          onClose={() => setShowCreateDeckModal(false)}
          onDeckCreated={handleDeckCreated}
        />
      )}

      {mode === "deck" && deckId && (
        <CreateCardModal
          isOpen={showCreateCardModal}
          onClose={() => setShowCreateCardModal(false)}
          deckId={deckId}
          onCardCreated={handleCardCreated}
        />
      )}
    </>
  )
} 