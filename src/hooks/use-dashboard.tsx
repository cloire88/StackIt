"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/constants/app"
import type { Deck } from "@/types/deck"

// Mock data - in real app this would come from API/database
const MOCK_RECENT_DECKS: Deck[] = [
  {
    id: 1,
    title: "Kalkulus",
    flashcardCount: 12,
    tag: "No Tag",
    lastAccessed: new Date("2024-01-15"),
  },
  {
    id: 2,
    title: "Dasar Pemrograman",
    flashcardCount: 10,
    tag: "No Tag",
    lastAccessed: new Date("2024-01-14"),
  },
  {
    id: 3,
    title: "Rekayasa Kebutuhan",
    flashcardCount: 5,
    tag: "No Tag",
    lastAccessed: new Date("2024-01-13"),
  },
]

export function useDashboard() {
  const router = useRouter()
  const [recentDecks] = useState<Deck[]>(MOCK_RECENT_DECKS)
  const [isLoading, setIsLoading] = useState(false)

  const handleDeckClick = useCallback(
    (deck: Deck) => {
      setIsLoading(true)
      router.push(ROUTES.deck(deck.id))
    },
    [router],
  )

  const handleSearchClick = useCallback(() => {
    router.push(ROUTES.decklist)
  }, [router])

  const handleSettingsClick = useCallback(() => {
    console.log("Settings clicked")
    // Navigate to settings page or open settings modal
  }, [])

  return {
    recentDecks,
    isLoading,
    handleDeckClick,
    handleSearchClick,
    handleSettingsClick,
  }
}
