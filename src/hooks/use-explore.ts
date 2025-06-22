"use client"

import { useState, useCallback, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
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

export function useExplore() {
  const router = useRouter()
  const [decks, setDecks] = useState<Deck[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPublicDecks = async () => {
      try {
        console.log("Explore: Fetching public decks...")
        const response = await fetch('/api/decks?public=true')
        if (response.ok) {
          const data = await response.json()
          console.log("Explore: Public decks fetched:", data)
          
          const transformedDecks: Deck[] = (data.deck || []).map((apiDeck: ApiDeck) => ({
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
          
          console.log("Explore: Transformed and sorted decks:", transformedDecks)
          setDecks(transformedDecks)
        } else {
          console.error('Explore: Failed to fetch public decks')
        }
      } catch (error) {
        console.error('Explore: Error fetching public decks:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPublicDecks()
  }, [])

  const filteredDecks = useMemo(() => {
    if (!searchQuery.trim()) return decks
    return decks.filter((deck) => 
      deck.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deck.tag.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [decks, searchQuery])

  const handleDeckClick = useCallback(
    (deck: Deck) => {
      console.log("Explore: Navigating to deck:", deck.id)
      router.push(`/deck/${deck.id}`)
    },
    [router],
  )

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query)
  }, [])

  return {
    decks,
    filteredDecks,
    searchQuery,
    isLoading,
    handleDeckClick,
    handleSearchChange,
  }
} 