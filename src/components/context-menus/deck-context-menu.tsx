"use client"

import type React from "react"

import { Edit, Plus, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface DeckContextMenuProps {
  children: React.ReactNode
  onAddTag: () => void
  onRename: () => void
  onDelete: () => void
}

export function DeckContextMenu({ children, onAddTag, onRename, onDelete }: DeckContextMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={onAddTag} className="flex items-center gap-2">
          <Plus className="w-4 h-4 text-blue-500" />
          <span>Tambah Tag</span>
        </DropdownMenuItem>
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
