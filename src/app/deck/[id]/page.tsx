"use client"

import { use, useState } from "react"
import { AppHeader } from "@/components/app-header"
import { DeckHeader } from "@/components/deck-header"
import { FlashcardList } from "@/components/flashcard-list"
import { AddFlashcardButton } from "@/components/add-flashcard-button"
import { StudyActionButtons } from "@/components/study-action-buttons"
import { StudySession } from "@/components/study-session"
import { FloatingActionButton } from "@/components/floating-action-button"
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

  const [isStudying, setIsStudying] = useState(false)

  const handleStartStudySession = () => {
    console.log("Starting study session for deck:", id)
    setIsStudying(true)
  }

  const handleFinishStudySession = () => {
    console.log("Finishing study session")
    setIsStudying(false)
    window.location.reload()
  }

  const handleExitStudySession = () => {
    console.log("Exiting study session")
    setIsStudying(false)
  }

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

  if (isStudying) {
    return (
      <>
        <AppHeader onSettingsClick={handleSettingsClick} />
        <StudySession
          cards={deckData.flashcards
            .filter(card => card.title && card.content) 
            .map(card => ({
              id: card.id, 
              front: card.title,
              back: card.content || "" 
            }))}
          onFinish={handleFinishStudySession}
          onBack={handleExitStudySession}
        />
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
            onDelete={handleDeleteFlashcard}
          />
          <StudyActionButtons onStartStudy={handleStartStudySession}/>
        </div>
      </main>

      <FloatingActionButton 
        mode="deck" 
        deckId={id}
        onCardCreated={() => {
          console.log("Card created, refreshing deck data")
          window.location.reload()
        }}
      />

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
