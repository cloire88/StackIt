"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ConfirmDeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
}

export function ConfirmDeleteModal({ isOpen, onClose, onConfirm, title, message }: ConfirmDeleteModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">{title}</DialogTitle>
        </DialogHeader>
        <div className="text-center py-4">
          <p className="text-gray-600">{message}</p>
        </div>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={onClose} className="px-8">
            Batal
          </Button>
          <Button variant="destructive" onClick={onConfirm} className="px-8">
            Buang
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
