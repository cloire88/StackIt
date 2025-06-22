"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface CreateCardModalProps {
  isOpen: boolean
  onClose: () => void
  deckId: string
  onCardCreated: () => void
}

export function CreateCardModal({ isOpen, onClose, deckId, onCardCreated }: CreateCardModalProps) {
  const [front, setFront] = useState("")
  const [back, setBack] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!front.trim() || !back.trim()) {
      alert("Both front and back content are required")
      return
    }

    setIsLoading(true)
    
    try {
      console.log("Creating card with data:", { deckId, front, back })
      
      const response = await fetch("/api/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deck_id: deckId,
          front: front.trim(),
          back: back.trim(),
        }),
      })

      if (response.ok) {
        const data = await response.json()
        console.log("Card created successfully:", data)
        
        // Reset form
        setFront("")
        setBack("")
        
        // Call callback
        onCardCreated()
      } else {
        const error = await response.json()
        console.error("Failed to create card:", error)
        alert(error.error || "Failed to create card")
      }
    } catch (error) {
      console.error("Error creating card:", error)
      alert("Failed to create card")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    if (!isLoading) {
      setFront("")
      setBack("")
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="bg-white/95 backdrop-blur-sm border-white/20 text-gray-800 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Create New Card</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="front" className="text-gray-700">Front (Question) *</Label>
            <Textarea
              id="front"
              value={front}
              onChange={(e) => setFront(e.target.value)}
              placeholder="Enter the question or front of the card"
              className="bg-white/80 border-gray-300 focus:border-blue-500 min-h-[100px]"
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="back" className="text-gray-700">Back (Answer) *</Label>
            <Textarea
              id="back"
              value={back}
              onChange={(e) => setBack(e.target.value)}
              placeholder="Enter the answer or back of the card"
              className="bg-white/80 border-gray-300 focus:border-blue-500 min-h-[100px]"
              disabled={isLoading}
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="submit"
              disabled={isLoading || !front.trim() || !back.trim()}
              className="bg-blue-600 hover:bg-blue-700 flex-1"
            >
              {isLoading ? "Creating..." : "Create Card"}
            </Button>
            <Button
              type="button"
              onClick={handleClose}
              variant="outline"
              disabled={isLoading}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 