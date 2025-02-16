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

const DotIcon = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
      </svg>
    )
  }

export function NavUser({
  user,
}: {
  user: {
    name: any
    email: any
    avatar: any
  }
}) {

    const router = useRouter()

  return (
<SidebarMenu>
  <SidebarMenuItem>
    <div
      className="flex items-center gap-2 p-4 hover:bg-sidebar-accent cursor-pointer"
      // If you still want some interactivity (like hover or click effects), you can add event handlers here
    >
      <UserButton>
        <UserButton.MenuItems>
          <UserButton.Action
            label="View Subscription"
            labelIcon={<DotIcon />}
            onClick={() => router.push("/dashboard/account/payment")}
          />
        </UserButton.MenuItems>
      </UserButton>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">{user.name}</span>
        <span className="truncate text-xs">{user.email}</span>
      </div>
      <ThemeButton />
    </div>
  </SidebarMenuItem>
</SidebarMenu>

  )
}
