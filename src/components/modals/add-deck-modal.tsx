"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface AddDeckModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (name: string, tag: string) => void
}

export function AddDeckModal({ isOpen, onClose, onSave }: AddDeckModalProps) {
  const [name, setName] = useState("")
  const [tag, setTag] = useState("")

  const handleSave = () => {
    if (name.trim()) {
      onSave(name.trim(), tag.trim() || "No Tag")
      setName("")
      setTag("")
      onClose()
    }
  }

  const handleClose = () => {
    setName("")
    setTag("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Tambah Deck</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="deck-name">
              Nama Deck <span className="text-red-500">*</span>
            </Label>
            <Input id="deck-name" placeholder="Masukkan Nama" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="deck-tag">Tag</Label>
            <Input id="deck-tag" placeholder="Tambahkan Tag" value={tag} onChange={(e) => setTag(e.target.value)} />
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
