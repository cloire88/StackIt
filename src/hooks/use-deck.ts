"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { DeckData, Flashcard } from "@/types/flashcard"

interface ApiCard {
  id: string
  front: string
  back: string
  deck_id: string
  created_at: string | null
  updated_at: string | null
}

interface ApiDeck {
  id: string
  name: string
  description: string | null
  created_at: string | null
  updated_at: string | null
  user_id: string
  is_public: boolean | null
  card_count?: number
}

export function useDeck(deckId: string) {
  const router = useRouter()
  const [deckData, setDeckData] = useState<DeckData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedFlashcard, setSelectedFlashcard] = useState<Flashcard | null>(null)

  useEffect(() => {
    const fetchDeckData = async () => {
      try {
        const deckResponse = await fetch(`/api/decks/${deckId}`)
        if (!deckResponse.ok) {
          console.error('Failed to fetch deck')
          setIsLoading(false)
          return
        }
        const deckData = await deckResponse.json()

        const cardsResponse = await fetch(`/api/cards?deck_id=${deckId}&sort_by_progress=true`)
        let cards: ApiCard[] = []
        if (cardsResponse.ok) {
          const cardsData = await cardsResponse.json()
          cards = cardsData.cards || []
        }

        const transformedDeckData: DeckData = {
          id: deckData.deck.id,
          title: deckData.deck.name,
          totalCount: deckData.deck.card_count || cards.length,
          flashcards: cards.map((card: ApiCard) => ({
            id: card.id,
            title: card.front,
            content: card.back,
          })),
        }

        setDeckData(transformedDeckData)
      } catch (error) {
        console.error('Error fetching deck data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDeckData()
  }, [deckId])

  const handleBack = useCallback(() => {
    router.back()
  }, [router])

  const handlePlay = useCallback(() => {
    if (deckData) {
      console.log("Start studying deck:", deckData.id)
    }
  }, [deckData])

  const handleStartStudy = useCallback(() => {
    if (deckData) {
      console.log("Start studying deck:", deckData.id)
    }
  }, [deckData])

  const handleFlashcardClick = useCallback((flashcard: Flashcard) => {
    console.log("Open flashcard:", flashcard.id)
  }, [])

  const handleAddFlashcard = useCallback(async () => {
    if (deckData) {
      try {
        const response = await fetch('/api/cards', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            deck_id: deckId,
            front: 'New Flashcard',
            back: 'Content here',
          }),
        })

        if (response.ok) {
          const data = await response.json()
          const newFlashcard: Flashcard = {
            id: data.card.id,
            title: data.card.front,
            content: data.card.back,
          }
          
          setDeckData(prev => prev ? {
            ...prev,
            flashcards: [...prev.flashcards, newFlashcard],
            totalCount: prev.totalCount + 1,
          } : null)
        } else {
          console.error('Failed to create flashcard')
        }
      } catch (error) {
        console.error('Error creating flashcard:', error)
      }
    }
  }, [deckData, deckId])

  const handleRenameFlashcard = useCallback((flashcardId: string) => {
    console.log("Rename flashcard:", flashcardId)
  }, [])

  const handleDeleteFlashcard = useCallback(
    (flashcardId: string) => {
      const flashcard = deckData?.flashcards.find((f) => f.id === flashcardId)
      if (flashcard) {
        setSelectedFlashcard(flashcard)
        setShowDeleteModal(true)
      }
    },
    [deckData],
  )

  const handleConfirmDelete = useCallback(async () => {
    if (selectedFlashcard && deckData) {
      try {
        const response = await fetch(`/api/cards/${selectedFlashcard.id}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          const updatedFlashcards = deckData.flashcards.filter((f) => f.id !== selectedFlashcard.id)
          setDeckData({
            ...deckData,
            flashcards: updatedFlashcards,
            totalCount: updatedFlashcards.length,
          })
          setShowDeleteModal(false)
          setSelectedFlashcard(null)
        } else {
          console.error('Failed to delete flashcard')
        }
      } catch (error) {
        console.error('Error deleting flashcard:', error)
      }
    }
  }, [selectedFlashcard, deckData])

  const handleCloseDeleteModal = useCallback(() => {
    setShowDeleteModal(false)
    setSelectedFlashcard(null)
  }, [])

  const handleSettingsClick = useCallback(() => {
    console.log("Settings clicked")
  }, [])

  return {
    deckData,
    isLoading,
    showDeleteModal,
    selectedFlashcard,
    handleBack,
    handlePlay,
    handleFlashcardClick,
    handleAddFlashcard,
    handleSettingsClick,
    handleStartStudy,
    handleRenameFlashcard,
    handleDeleteFlashcard,
    handleConfirmDelete,
    handleCloseDeleteModal,
  }
}
