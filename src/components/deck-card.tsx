"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreVertical, Tag } from "lucide-react"
import { DeckContextMenu } from "./context-menus/deck-context-menu"
import type { ExtendedDeckCardProps } from "@/types/deck"

export function DeckCard({ deck, onClick, onAddTag, onRename, onDelete }: ExtendedDeckCardProps) {
  const handleCardClick = () => {
    onClick(deck)
  }

  const handleMenuAction = (action: () => void) => (e: React.MouseEvent) => {
    e.stopPropagation()
    action()
  }

  return (
    <Card
      className="bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer hover:scale-[1.02] group"
      onClick={handleCardClick}
    >
      <CardContent className="p-6 flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-semibold text-gray-800 mb-1 truncate">{deck.title}</h3>
          <p className="text-gray-600 text-sm">
            Jumlah Flashcard: <span className="text-blue-600 font-medium">{deck.flashcardCount}</span>
          </p>
        </div>
        <div className="flex items-center gap-4 ml-4 shrink-0">
          <div className="flex items-center gap-2 text-gray-500">
            <Tag className="w-4 h-4" />
            <span className="text-sm">{deck.tag}</span>
          </div>
          {(onAddTag || onRename || onDelete) && (
            <DeckContextMenu
              onAddTag={() => onAddTag?.(deck.id)}
              onRename={() => onRename?.(deck.id)}
              onDelete={() => onDelete?.(deck.id)}
            >
              <Button variant="ghost" size="icon" className="text-gray-500 hover:bg-gray-100 transition-colors">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DeckContextMenu>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
