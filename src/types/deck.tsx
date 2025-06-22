export interface Deck {
  id: string
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
  onAddTag?: (deckId: string) => void
  onRename?: (deckId: string) => void
  onDelete?: (deckId: string) => void
}
