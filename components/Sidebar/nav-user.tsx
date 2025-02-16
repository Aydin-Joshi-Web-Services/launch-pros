"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  LucideCreditCard,
  Sparkles,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { UserButton, useUser } from "@clerk/nextjs"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { ThemeButton } from "../ThemeButton"
import { useRouter } from "next/navigation"

const CardIcon = () => {
  return (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
  <rect x="2" y="5" width="20" height="14" rx="3" ry="3" fill="#707070"/>
  <rect x="2" y="9" width="20" height="2" fill="#fff"/>
  <rect x="2" y="13" width="7" height="2" fill="#fff"/>
</svg>


  )
}

export function NavUser() {

    const router = useRouter()
    const { isMobile } = useSidebar()
    const { user } = useUser()
    const userData = useQuery(api.users.getByUserId, user ? { userId: user.id } : "skip")

  return (
<SidebarMenu>
  <SidebarMenuItem>
    <div
      className="flex items-center gap-2 p-4 hover:bg-sidebar-accent cursor-pointer"
      // If you still want some interactivity (like hover or click effects), you can add event handlers here
    >
      

      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">{userData?.name}</span>
        <span className="truncate text-xs">{userData?.email}</span>
      </div>
      <ThemeButton />
    </div>
  </SidebarMenuItem>
</SidebarMenu>

  )
}
