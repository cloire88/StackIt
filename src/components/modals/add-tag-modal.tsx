"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface AddTagModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (deckId: number, tag: string) => void
  deckId: number | null
}

export function AddTagModal({ isOpen, onClose, onSave, deckId }: AddTagModalProps) {
  const [tag, setTag] = useState("")

  const handleSave = () => {
    if (tag.trim() && deckId) {
      onSave(deckId, tag.trim())
      setTag("")
      onClose()
    }
  }

  const handleClose = () => {
    setTag("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Tambah Tag</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="add-tag">
              Tambahkan Tag <span className="text-red-500">*</span>
            </Label>
            <Input id="add-tag" placeholder="Masukkan Nama Tag" value={tag} onChange={(e) => setTag(e.target.value)} />
          </div>
        </div>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={handleClose} className="px-8">
            Batal
          </Button>
          <Button onClick={handleSave} className="px-8" disabled={!tag.trim()}>
            Simpan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
