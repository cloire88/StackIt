"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Deck } from "@/types/deck"

interface EditDeckModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (id: number, name: string, tag: string) => void
  deck: Deck | null
}

export function EditDeckModal({ isOpen, onClose, onSave, deck }: EditDeckModalProps) {
  const [name, setName] = useState("")
  const [tag, setTag] = useState("")

  useEffect(() => {
    if (deck) {
      setName(deck.title)
      setTag(deck.tag === "No Tag" ? "" : deck.tag)
    } else {
      setName("")
      setTag("")
    }
  }, [deck])

  const handleSave = () => {
    if (name.trim() && deck) {
      onSave(deck.id, name.trim(), tag.trim() || "No Tag")
      onClose()
    }
  }

  const handleClose = () => {
    setName("")
    setTag("")
    onClose()
  }

  if (!deck) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Ubah Nama Deck</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-deck-name">
              Nama Baru Deck <span className="text-red-500">*</span>
            </Label>
            <Input
              id="edit-deck-name"
              placeholder="Masukkan Nama Baru Deck"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-deck-tag">Tag Baru Deck</Label>
            <Input
              id="edit-deck-tag"
              placeholder="Tambahkan Tag Baru Deck"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={handleClose} className="px-8">
            Batal
          </Button>
          <Button onClick={handleSave} className="px-8" disabled={!name.trim()}>
            Simpan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
