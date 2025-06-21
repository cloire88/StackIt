"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface DeckSearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function DeckSearchBar({ value, onChange, placeholder = "Cari deck" }: DeckSearchBarProps) {
  return (
    <div className="relative mb-8">
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full max-w-md ml-auto bg-white/90 backdrop-blur-sm border-0 rounded-full px-4 py-3 pr-12 text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-white/50"
      />
      <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
    </div>
  )
}
