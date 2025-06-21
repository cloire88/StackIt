"use client"

import { use } from "react"
import { AppHeader } from "@/components/app-header"
import { DeckHeader } from "@/components/deck-header"
import { FlashcardList } from "@/components/flashcard-list"
import { AddFlashcardButton } from "@/components/add-flashcard-button"
import { StudyActionButtons } from "@/components/study-action-buttons"
import { ConfirmDeleteModal } from "@/components/modals/confirm-delete-modal"
import { useDeck } from "@/hooks/use-deck"

interface DeckPageProps {
  params: Promise<{ id: string }>
}

export default function DeckPage({ params }: DeckPageProps) {
  const { id } = use(params)
  const {
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
  } = useDeck(id)

  if (isLoading) {
    return (
      <>
        <AppHeader onSettingsClick={handleSettingsClick} />
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center">
              <div className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span className="text-white">Memuat deck...</span>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  if (!deckData) {
    return (
      <>
        <AppHeader onSettingsClick={handleSettingsClick} />
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center">
              <p className="text-white/70 mb-4">Deck tidak ditemukan</p>
              <button onClick={handleBack} className="text-blue-300 hover:text-blue-200 underline">
                Kembali ke daftar deck
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <AppHeader onSettingsClick={handleSettingsClick} />
      <DeckHeader title={deckData.title} onBack={handleBack} onPlay={handlePlay} />

      <main className="p-6 pb-32">
        <div className="max-w-4xl mx-auto">
          <FlashcardList
            flashcards={deckData.flashcards}
            onFlashcardClick={handleFlashcardClick}
            onRename={handleRenameFlashcard}
            onDelete={handleDeleteFlashcard}
          />
          <AddFlashcardButton onClick={handleAddFlashcard} />
        </div>
      </main>

      <StudyActionButtons onStartStudy={handleStartStudy} onAddCard={handleAddFlashcard} />

      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Hapus Flashcard"
        message="Kamu yakin mau buang kartu ini?"
      />
    </>
  )
}
