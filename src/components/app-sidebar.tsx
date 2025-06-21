"use client"

import type * as React from "react"
import { User, Search, X } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Menu, Settings } from "lucide-react"

const decks = [
  { title: "Rekayasa Kebutuhan", isActive: true },
  { title: "Kalkulus", isActive: false },
  { title: "PBKK", isActive: false },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} className="bg-slate-800 text-white border-r-0">
      <SidebarHeader className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-slate-800" />
            </div>
            <span className="font-medium">Zevanya</span>
          </div>
          {/* <Button variant="ghost" size="icon" className="text-white hover:bg-slate-700">
            <X className="w-4 h-4" />
          </Button> */}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center gap-2 px-4 py-2">
            <SidebarGroupLabel className="text-white text-base font-medium">Daftar Deck</SidebarGroupLabel>
            <Button variant="ghost" size="icon" className="text-white hover:bg-slate-700 ml-auto">
              <Search className="w-4 h-4" />
            </Button>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {decks.map((deck) => (
                <SidebarMenuItem key={deck.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={deck.isActive}
                    className="text-white hover:bg-slate-700 data-[active=true]:bg-slate-700"
                  >
                    <a href="/decklist">
                      <div className="w-3 h-3 bg-white rounded-full mr-3" />
                      <span>{deck.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
