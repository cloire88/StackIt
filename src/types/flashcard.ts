export interface Flashcard {
    id: string
    title: string
    content?: string
    createdAt?: Date
    lastStudied?: Date
  }
  
  export interface FlashcardListProps {
    flashcards: Flashcard[]
    onFlashcardClick: (flashcard: Flashcard) => void
  }
  
  export interface DeckData {
    id: string
    title: string
    flashcards: Flashcard[]
    totalCount: number
  }
  