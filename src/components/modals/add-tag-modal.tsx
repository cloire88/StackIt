"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface AddTagModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (deckId: string, tag: string) => void
  deckId: string | null
}

export function AddTagModal({ isOpen, onClose, onSave, deckId }: AddTagModalProps) {
  const [tag, setTag] = useState("")

  const handleSave = () => {
    if (deckId && tag.trim()) {
      onSave(deckId, tag.trim())
      setTag("")
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Tag</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Masukkan nama tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button onClick={handleSave} disabled={!tag.trim()}>
              Simpan
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
