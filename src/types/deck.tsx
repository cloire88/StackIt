export interface Deck {
  id: number
  title: string
  flashcardCount: number
  tag: string
  lastAccessed?: Date
}

export interface DeckCardProps {
  deck: Deck
  onClick: (deck: Deck) => void
}

export interface ExtendedDeckCardProps extends DeckCardProps {
  onAddTag?: (deckId: number) => void
  onRename?: (deckId: number) => void
  onDelete?: (deckId: number) => void
}
