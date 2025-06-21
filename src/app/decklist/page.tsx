"use client"

import { AppHeader } from "@/components/app-header"
import { DeckSearchBar } from "@/components/deck-search-bar"
import { DeckList } from "@/components/deck-list"
import { AddDeckCard } from "@/components/add-deck-card"
import { AddDeckModal } from "@/components/modals/add-deck-modal"
import { EditDeckModal } from "@/components/modals/edit-deck-modal"
import { AddTagModal } from "@/components/modals/add-tag-modal"
import { ConfirmDeleteModal } from "@/components/modals/confirm-delete-modal"
import { useDecklist } from "@/hooks/use-decklist"

export default function DecklistPage() {
  const {
    decks,
    searchQuery,
    isLoading,
    modals,
    selectedDeck,
    handleDeckClick,
    handleAddDeck,
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
  } = useDecklist()

  return (
    <>
      <AppHeader onSettingsClick={handleSettingsClick} />

      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-6">Daftar Deck</h1>

          <DeckSearchBar value={searchQuery} onChange={handleSearchChange} />

          <DeckList
            decks={decks}
            onDeckClick={handleDeckClick}
            searchQuery={searchQuery}
            onAddTag={handleAddTag}
            onRename={handleEditDeck}
            onDelete={handleDeleteDeck}
          />

          <AddDeckCard onClick={handleAddDeckModal} />

          {isLoading && (
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-gray-700">Memuat...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      <AddDeckModal isOpen={modals.addDeck} onClose={handleCloseModals} onSave={handleSaveDeck} />

      <EditDeckModal
        isOpen={modals.editDeck}
        onClose={handleCloseModals}
        onSave={handleSaveEditDeck}
        deck={selectedDeck}
      />

      <AddTagModal
        isOpen={modals.addTag}
        onClose={handleCloseModals}
        onSave={handleSaveTag}
        deckId={selectedDeck?.id || null}
      />

      <ConfirmDeleteModal
        isOpen={modals.confirmDelete}
        onClose={handleCloseModals}
        onConfirm={handleConfirmDelete}
        title="Hapus Deck"
        message="Kamu yakin mau buang deck ini?"
      />
    </>
  )
}
