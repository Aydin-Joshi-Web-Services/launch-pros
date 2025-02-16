"use client"

import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useUser } from "@clerk/nextjs"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { ThemeButton } from "../ThemeButton"

export function NavUser() {
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
