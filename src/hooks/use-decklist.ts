"use client"

import { useState, useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/constants/app"
import type { Deck } from "@/types/deck"

// Mock data - in real app this would come from API/database
const MOCK_DECKS: Deck[] = [
  {
    id: 1,
    title: "Kalkulus",
    flashcardCount: 12,
    tag: "No Tag",
  },
  {
    id: 2,
    title: "Dasar Pemrograman",
    flashcardCount: 10,
    tag: "No Tag",
  },
  {
    id: 3,
    title: "Rekayasa Kebutuhan",
    flashcardCount: 5,
    tag: "No Tag",
  },
]

interface ModalStates {
  addDeck: boolean
  editDeck: boolean
  addTag: boolean
  confirmDelete: boolean
}

export function useDecklist() {
  const router = useRouter()
  const [decks, setDecks] = useState<Deck[]>(MOCK_DECKS)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null)
  const [modals, setModals] = useState<ModalStates>({
    addDeck: false,
    editDeck: false,
    addTag: false,
    confirmDelete: false,
  })

  const filteredDecks = useMemo(() => {
    if (!searchQuery.trim()) return decks
    return decks.filter((deck) => deck.title.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [decks, searchQuery])

  const handleDeckClick = useCallback(
    (deck: Deck) => {
      setIsLoading(true)
      router.push(ROUTES.deck(deck.id))
    },
    [router],
  )

  const handleAddDeckModal = useCallback(() => {
    setModals((prev) => ({ ...prev, addDeck: true }))
  }, [])

  const handleEditDeck = useCallback((deckId: number) => {
    const deck = MOCK_DECKS.find((d) => d.id === deckId)
    if (deck) {
      setSelectedDeck(deck)
      setModals((prev) => ({ ...prev, editDeck: true }))
    }
  }, [])

  const handleAddTag = useCallback((deckId: number) => {
    const deck = MOCK_DECKS.find((d) => d.id === deckId)
    if (deck) {
      setSelectedDeck(deck)
      setModals((prev) => ({ ...prev, addTag: true }))
    }
  }, [])

  const handleDeleteDeck = useCallback((deckId: number) => {
    const deck = MOCK_DECKS.find((d) => d.id === deckId)
    if (deck) {
      setSelectedDeck(deck)
      setModals((prev) => ({ ...prev, confirmDelete: true }))
    }
  }, [])

  const handleSaveDeck = useCallback(
    (name: string, tag: string) => {
      const newDeck: Deck = {
        id: Math.max(...decks.map((d) => d.id)) + 1,
        title: name,
        flashcardCount: 0,
        tag,
      }
      setDecks((prev) => [...prev, newDeck])
    },
    [decks],
  )

  const handleSaveEditDeck = useCallback((id: number, name: string, tag: string) => {
    setDecks((prev) => prev.map((deck) => (deck.id === id ? { ...deck, title: name, tag } : deck)))
  }, [])

  const handleSaveTag = useCallback((deckId: number, tag: string) => {
    setDecks((prev) => prev.map((deck) => (deck.id === deckId ? { ...deck, tag } : deck)))
  }, [])

  const handleConfirmDelete = useCallback(() => {
    if (selectedDeck) {
      setDecks((prev) => prev.filter((deck) => deck.id !== selectedDeck.id))
      handleCloseModals()
    }
  }, [selectedDeck])

  const handleCloseModals = useCallback(() => {
    setModals({
      addDeck: false,
      editDeck: false,
      addTag: false,
      confirmDelete: false,
    })
    setSelectedDeck(null)
  }, [])

  const handleSettingsClick = useCallback(() => {
    console.log("Settings clicked")
  }, [])

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value)
  }, [])

  return {
    decks: filteredDecks,
    searchQuery,
    isLoading,
    modals,
    selectedDeck,
    handleDeckClick,
    handleAddDeck: handleAddDeckModal,
    handleSettingsClick,
    handleSearchChange,
    handleAddDeckModal,
    handleEditDeck,
    handleAddTag,
    handleDeleteDeck,
    handleSaveDeck,
    handleSaveEditDeck,
    handleSaveTag,
    handleConfirmDelete,
    handleCloseModals,
  }
}
