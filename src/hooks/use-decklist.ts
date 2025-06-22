"use client"

import { useState, useCallback, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/constants/app"
import type { Deck } from "@/types/deck"

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

interface ModalStates {
  addDeck: boolean
  editDeck: boolean
  addTag: boolean
  confirmDelete: boolean
}

export function useDecklist() {
  const router = useRouter()
  const [decks, setDecks] = useState<Deck[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null)
  const [modals, setModals] = useState<ModalStates>({
    addDeck: false,
    editDeck: false,
    addTag: false,
    confirmDelete: false,
  })

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const response = await fetch('/api/decks')
        if (response.ok) {
          const data = await response.json()
          const transformedDecks: Deck[] = data.deck.map((apiDeck: ApiDeck) => ({
            id: apiDeck.id, 
            title: apiDeck.name,
            flashcardCount: apiDeck.card_count || 0,
            tag: "No Tag",
            lastAccessed: apiDeck.updated_at ? new Date(apiDeck.updated_at) : new Date(),
          }))

          transformedDecks.sort((a, b) => {
            const aDate = a.lastAccessed || new Date()
            const bDate = b.lastAccessed || new Date()
            return bDate.getTime() - aDate.getTime()
          })
          
          setDecks(transformedDecks)
        } else {
          console.error('Failed to fetch decks')
        }
      } catch (error) {
        console.error('Error fetching decks:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDecks()
  }, [])

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

  const handleEditDeck = useCallback((deckId: string) => {
    const deck = decks.find((d) => d.id === deckId)
    if (deck) {
      setSelectedDeck(deck)
      setModals((prev) => ({ ...prev, editDeck: true }))
    }
  }, [decks])

  const handleAddTag = useCallback((deckId: string) => {
    const deck = decks.find((d) => d.id === deckId)
    if (deck) {
      setSelectedDeck(deck)
      setModals((prev) => ({ ...prev, addTag: true }))
    }
  }, [decks])

  const handleDeleteDeck = useCallback((deckId: string) => {
    const deck = decks.find((d) => d.id === deckId)
    if (deck) {
      setSelectedDeck(deck)
      setModals((prev) => ({ ...prev, confirmDelete: true }))
    }
  }, [decks])

  const handleSaveDeck = useCallback(
    async (name: string, tag: string) => {
      try {
        const response = await fetch('/api/decks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            description: '',
            is_public: false,
            user_id: 'current-user-id',
          }),
        })

        if (response.ok) {
          const data = await response.json()
          const newDeck: Deck = {
            id: data.deck.id, 
            title: data.deck.name,
            flashcardCount: 0,
            tag,
            lastAccessed: new Date(),
          }
          setDecks((prev) => [...prev, newDeck])
          handleCloseModals()
        } else {
          console.error('Failed to create deck')
        }
      } catch (error) {
        console.error('Error creating deck:', error)
      }
    },
    [],
  )

  const handleSaveEditDeck = useCallback(async (id: string, name: string, tag: string) => {
    try {
      const response = await fetch(`/api/decks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description: '',
          is_public: false,
        }),
      })

      if (response.ok) {
        setDecks((prev) => prev.map((deck) => (deck.id === id ? { ...deck, title: name, tag, lastAccessed: new Date() } : deck)))
        handleCloseModals()
      } else {
        console.error('Failed to update deck')
      }
    } catch (error) {
      console.error('Error updating deck:', error)
    }
  }, [])

  const handleSaveTag = useCallback((deckId: string, tag: string) => {
    setDecks((prev) => prev.map((deck) => (deck.id === deckId ? { ...deck, tag } : deck)))
  }, [])

  const handleConfirmDelete = useCallback(async () => {
    if (selectedDeck) {
      try {
        const response = await fetch(`/api/decks/${selectedDeck.id}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          setDecks((prev) => prev.filter((deck) => deck.id !== selectedDeck.id))
          handleCloseModals()
        } else {
          console.error('Failed to delete deck')
        }
      } catch (error) {
        console.error('Error deleting deck:', error)
      }
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
