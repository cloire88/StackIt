"use client"

import type * as React from "react"
import { User, Search, X, Home, Compass, ChevronDown } from "lucide-react"
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
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user?: string
}

interface Route {
  id: string
  title: string
  path: string
  icon: React.ComponentType<{ className?: string }>
}

const routes: Route[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    path: "/dashboard",
    icon: Home,
  },
  {
    id: "explore",
    title: "Explore",
    path: "/explore",
    icon: Compass,
  },
]

export function AppSidebar({ user = "User", ...props }: AppSidebarProps) {
  const router = useRouter()
  
  const onRouteClick = (route: string) => {
    router.push(route)
  }

  const onProfileClick = () => {
    router.push("/profile")
  }

  const onLogoutClick = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      })
      if (response.ok) {
        router.push("/login")
      }
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }
  
  return (
    <Sidebar {...props} className="bg-slate-800 text-white border-r-0">
      <SidebarHeader className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-3 p-0 h-auto text-white hover:bg-slate-700">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-slate-800" />
                </div>
                <span className="font-medium">{user}</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem onClick={onProfileClick}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onLogoutClick}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center gap-2 px-4 py-2">
            <SidebarGroupLabel className="text-white text-base font-medium">StackIt</SidebarGroupLabel>
            <Button variant="ghost" size="icon" className="text-white hover:bg-slate-700 ml-auto">
              <Search className="w-4 h-4" />
            </Button>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((route) => {
                const Icon = route.icon
                return (
                  <SidebarMenuItem key={route.id}>
                    <SidebarMenuButton
                      asChild
                      isActive={false}
                      className="text-white hover:bg-slate-700 data-[active=true]:bg-slate-700"
                      onClick={() => onRouteClick(route.path)}
                    >
                      <div className="cursor-pointer flex items-center">
                        <Icon className="w-4 h-4 mr-3" />
                        <span>{route.title}</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
