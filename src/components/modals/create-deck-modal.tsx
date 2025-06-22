"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useRouter } from "next/navigation"

interface CreateDeckModalProps {
  isOpen: boolean
  onClose: () => void
  onDeckCreated: (deckId: string) => void
}

export function CreateDeckModal({ isOpen, onClose, onDeckCreated }: CreateDeckModalProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [isPublic, setIsPublic] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim()) {
      alert("Deck name is required")
      return
    }

    setIsLoading(true)
    
    try {
      console.log("Creating deck with data:", { name, description, isPublic })
      
      const response = await fetch("/api/decks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim() || null,
          is_public: isPublic,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        console.log("Deck created successfully:", data)
        
        // Reset form
        setName("")
        setDescription("")
        setIsPublic(false)
        
        // Call callback with new deck ID
        onDeckCreated(data.deck.id)
        
        // Navigate to the new deck
        router.push(`/deck/${data.deck.id}`)
      } else {
        const error = await response.json()
        console.error("Failed to create deck:", error)
        alert(error.error || "Failed to create deck")
      }
    } catch (error) {
      console.error("Error creating deck:", error)
      alert("Failed to create deck")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    if (!isLoading) {
      setName("")
      setDescription("")
      setIsPublic(false)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="bg-white/95 backdrop-blur-sm border-white/20 text-gray-800 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Create New Deck</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-700">Deck Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter deck name"
              className="bg-white/80 border-gray-300 focus:border-blue-500"
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-700">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter deck description (optional)"
              className="bg-white/80 border-gray-300 focus:border-blue-500 min-h-[80px]"
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="public"
              checked={isPublic}
              onCheckedChange={setIsPublic}
              disabled={isLoading}
            />
            <Label htmlFor="public" className="text-gray-700">Make this deck public</Label>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="submit"
              disabled={isLoading || !name.trim()}
              className="bg-blue-600 hover:bg-blue-700 flex-1"
            >
              {isLoading ? "Creating..." : "Create Deck"}
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