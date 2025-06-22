"use client"

import { AppHeader } from "@/components/app-header"
import { DeckCard } from "@/components/deck-card"
import { DeckSearchBar } from "@/components/deck-search-bar"
import { useExplore } from "@/hooks/use-explore"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function ExplorePage() {
  const router = useRouter()
  const { 
    filteredDecks, 
    searchQuery, 
    isLoading, 
    handleDeckClick, 
    handleSearchChange 
  } = useExplore()

  const handleSettingsClick = () => {
    console.log("Settings clicked")
  }

  const handleRename = (deckId: string) => {
    console.log("Rename deck:", deckId)
    toast.info("Rename functionality coming soon!")
  }

  const handleDelete = (deckId: string) => {
    console.log("Delete deck:", deckId)
    toast.info("Delete functionality coming soon!")
  }

  const handleAddTag = (deckId: string) => {
    console.log("Add tag to deck:", deckId)
    toast.info("Add tag functionality coming soon!")
  }

  return (
    <>
      <AppHeader onSettingsClick={handleSettingsClick} />

      <main className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Explore Decks</h1>
            <p className="text-gray-300">Discover amazing flashcard decks created by the community</p>
          </div>

          <DeckSearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search public decks..."
          />

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white/10 rounded-lg p-6 animate-pulse">
                  <div className="h-4 bg-white/20 rounded mb-2"></div>
                  <div className="h-3 bg-white/20 rounded mb-4"></div>
                  <div className="h-3 bg-white/20 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : filteredDecks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDecks.map((deck) => (
                <DeckCard
                  key={deck.id}
                  deck={deck}
                  onClick={() => handleDeckClick(deck)}
                  onRename={handleRename}
                  onDelete={handleDelete}
                  onAddTag={handleAddTag}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-2">
                {searchQuery ? "No decks found matching your search" : "No public decks available"}
              </div>
              <p className="text-gray-500">
                {searchQuery ? "Try adjusting your search terms" : "Be the first to create a public deck!"}
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  )
} 