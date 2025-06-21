"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { DeckData, Flashcard } from "@/types/flashcard"

// Mock data - in real app this would come from API/database based on deck ID
const MOCK_DECK_DATA: Record<string, DeckData> = {
  "1": {
    id: "1",
    title: "Kalkulus",
    totalCount: 12,
    flashcards: [
      { id: 1, title: "Limit Fungsi", content: "Konsep dasar limit dalam kalkulus" },
      { id: 2, title: "Turunan", content: "Definisi dan aplikasi turunan" },
      { id: 3, title: "Integral", content: "Integral tak tentu dan tentu" },
    ],
  },
  "2": {
    id: "2",
    title: "Dasar Pemrograman",
    totalCount: 10,
    flashcards: [
      { id: 1, title: "Variabel dan Tipe Data", content: "Konsep dasar variabel dalam pemrograman" },
      { id: 2, title: "Struktur Kontrol", content: "If-else, loop, dan percabangan" },
      { id: 3, title: "Fungsi", content: "Definisi dan penggunaan fungsi" },
    ],
  },
  "3": {
    id: "3",
    title: "Rekayasa Kebutuhan",
    totalCount: 5,
    flashcards: [
      { id: 1, title: "Use Case Diagram", content: "Diagram untuk menggambarkan interaksi user dengan sistem" },
      { id: 2, title: "Requirements Gathering", content: "Teknik pengumpulan kebutuhan sistem" },
      { id: 3, title: "User Stories", content: "Format penulisan kebutuhan dari perspektif user" },
    ],
  },
}

export function useDeck(deckId: string) {
  const router = useRouter()
  const [deckData, setDeckData] = useState<DeckData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedFlashcard, setSelectedFlashcard] = useState<Flashcard | null>(null)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      const data = MOCK_DECK_DATA[deckId]
      setDeckData(data || null)
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [deckId])

  const handleBack = useCallback(() => {
    router.back()
  }, [router])

  const handlePlay = useCallback(() => {
    if (deckData) {
      console.log("Start studying deck:", deckData.id)
      // Navigate to study mode
      // router.push(`/study/${deckData.id}`)
    }
  }, [deckData])

  const handleStartStudy = useCallback(() => {
    if (deckData) {
      console.log("Start studying deck:", deckData.id)
      // Navigate to study mode
      // router.push(`/study/${deckData.id}`)
    }
  }, [deckData])

  const handleFlashcardClick = useCallback((flashcard: Flashcard) => {
    console.log("Open flashcard:", flashcard.id)
    // Navigate to flashcard detail or study mode
    // router.push(`/flashcard/${flashcard.id}`)
  }, [])

  const handleAddFlashcard = useCallback(() => {
    if (deckData) {
      console.log("Add new flashcard to deck:", deckData.id)
      // Navigate to add flashcard page or open modal
      // router.push(`/deck/${deckData.id}/add`)
    }
  }, [deckData])

  const handleRenameFlashcard = useCallback((flashcardId: number) => {
    console.log("Rename flashcard:", flashcardId)
    // Open rename modal or navigate to edit page
  }, [])

  const handleDeleteFlashcard = useCallback(
    (flashcardId: number) => {
      const flashcard = deckData?.flashcards.find((f) => f.id === flashcardId)
      if (flashcard) {
        setSelectedFlashcard(flashcard)
        setShowDeleteModal(true)
      }
    },
    [deckData],
  )

  const handleConfirmDelete = useCallback(() => {
    if (selectedFlashcard && deckData) {
      const updatedFlashcards = deckData.flashcards.filter((f) => f.id !== selectedFlashcard.id)
      setDeckData({
        ...deckData,
        flashcards: updatedFlashcards,
        totalCount: updatedFlashcards.length,
      })
      setShowDeleteModal(false)
      setSelectedFlashcard(null)
    }
  }, [selectedFlashcard, deckData])

  const handleCloseDeleteModal = useCallback(() => {
    setShowDeleteModal(false)
    setSelectedFlashcard(null)
  }, [])

  const handleSettingsClick = useCallback(() => {
    console.log("Settings clicked")
    // Navigate to settings page or open settings modal
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
