"use client"

import type React from "react"

import { Edit, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface FlashcardContextMenuProps {
  children: React.ReactNode
  onRename: () => void
  onDelete: () => void
}

export function FlashcardContextMenu({ children, onRename, onDelete }: FlashcardContextMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem onClick={onRename} className="flex items-center gap-2">
          <Edit className="w-4 h-4" />
          <span>Rename</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete} className="flex items-center gap-2 text-red-600">
          <Trash2 className="w-4 h-4" />
          <span>Hapus</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
