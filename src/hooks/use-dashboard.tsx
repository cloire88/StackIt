"use client"

import { useState, useCallback, useEffect } from "react"
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

export function useDashboard() {
  const router = useRouter()
  const [recentDecks, setRecentDecks] = useState<Deck[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRecentDecks = async () => {
      try {
        console.log("Dashboard: Fetching user's decks...")
        const response = await fetch('/api/decks')
        if (response.ok) {
          const data = await response.json()
          console.log("Dashboard: User's decks fetched:", data)
          
          if (data.deck && Array.isArray(data.deck)) {
            const transformedDecks: Deck[] = data.deck.map((apiDeck: ApiDeck) => ({
              id: apiDeck.id,
              title: apiDeck.name,
              flashcardCount: apiDeck.card_count || 0,
              tag: "No Tag", // TODO: Fetch actual tags
              lastAccessed: apiDeck.updated_at ? new Date(apiDeck.updated_at) : new Date(),
            }))
            
            transformedDecks.sort((a, b) => {
              const aDate = a.lastAccessed || new Date()
              const bDate = b.lastAccessed || new Date()
              return bDate.getTime() - aDate.getTime()
            })
            
            console.log("Dashboard: Transformed and sorted decks:", transformedDecks)
            setRecentDecks(transformedDecks)
          } else {
            console.log("Dashboard: No decks found or invalid data structure")
            setRecentDecks([])
          }
        } else {
          console.error('Dashboard: Failed to fetch decks -', response.status, response.statusText)
          setRecentDecks([])
        }
      } catch (error) {
        console.error('Dashboard: Error fetching decks:', error)
        setRecentDecks([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecentDecks()
  }, [])

  const handleDeckClick = useCallback(
    (deck: Deck) => {
      console.log("Dashboard: Navigating to deck:", deck.id)
      setIsLoading(true)
      router.push(ROUTES.deck(deck.id))
    },
    [router],
  )

  const handleSearchClick = useCallback(() => {
    console.log("Dashboard: Navigating to explore page")
    router.push("/explore")
  }, [router])

  const handleSettingsClick = useCallback(() => {
    console.log("Dashboard: Settings clicked")
  }, [])

  return {
    recentDecks,
    isLoading,
    handleDeckClick,
    handleSearchClick,
    handleSettingsClick,
  }
}
