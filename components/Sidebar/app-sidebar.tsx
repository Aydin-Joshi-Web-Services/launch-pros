"use client"

import {
  ChevronsUpDown,
  Code2,
  FileText,
  Laptop,
  LayoutDashboard,
  LifeBuoy,
  Wallet,
} from "lucide-react"
import * as React from "react"

import { NavMain } from "@/components/Sidebar/nav-main"
import { NavSecondary } from "@/components/Sidebar/nav-secondary"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useState } from "react"
import { EditPlatformModal } from "../EditPlatformModal"

  
  const data = {
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        isActive: true,
        beta: true,
        items: [
          {
            title: "Overview",
            url: "/dashboard",
          },
          /*{
            title: "Analytics",
            url: "/dashboard/analytics",
          },
          {
            title: "Performance",
            url: "/dashboard/performance",
          },*/
        ],
      },
      {
        title: "Finance",
        url: "/dashboard/finance",
        icon: Wallet,
        /*items: [
          {
            title: "Revenue",
            url: "/dashboard/financial/revenue",
          },
          {
            title: "Expenses",
            url: "/dashboard/financial/expenses",
          },
          {
            title: "Subscriptions",
            url: "/dashboard/financial/subscriptions",
          },
          {
            title: "Invoices",
            url: "/dashboard/financial/invoices",
          },
        ],*/
      },
      {
        title: "Development",
        url: "/dashboard/development",
        icon: Code2,
        beta: true,
        items: [
          {
            title: "Source Code",
            url: "/dashboard/development",
          },
          /*{
            title: "Deployments",
            url: "/dashboard/deployments",
          },*/
        ],
      },
      {
        title: "Marketing",
        url: "/dashboard/marketing",
        icon: Laptop,
        /*items: [
          {
            title: "General",
            url: "/dashboard/settings/general",
          },
          {
            title: "Team",
            url: "/dashboard/settings/team",
          },
          {
            title: "Integrations",
            url: "/dashboard/settings/integrations",
          },
        ],*/
      },
    ],
    navSecondary: [
      {
        title: "Support",
        url: "/dashboard/support",
        icon: LifeBuoy,
      },
      {
        title: "Documentation",
        url: "/dashboard/docs",
        icon: FileText,
      },
    ],
    /*projects: [
      {
        name: "Main Product",
        url: "/dashboard/projects/main",
        icon: Terminal,
      },
      {
        name: "API Services",
        url: "/dashboard/projects/api",
        icon: Database,
      },
      {
        name: "Mobile App",
        url: "/dashboard/projects/mobile",
        icon: GitBranch,
      },
    ],*/
  }
  

  export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useUser()
  
    // Fetch user platforms
    const convexUser = useQuery(api.users.getByUserId, user ? { userId: user.id } : "skip");
    const platforms = useQuery(
      api.platforms.by_owner_id,
      convexUser ? { ownerId: convexUser._id } : "skip"
    );

    return (
      <Sidebar variant="inset" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="/dashboard">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <div className="flex items-center gap-2">
                      {/* Rounded Logo */}
                        <img src="/logo.png" className="w-8 h-8 rounded-lg" />
                      {/* Brand Name */}
                    </div>
                  </div>
                  <div className="grid flex-1 text-left text-lg leading-tight ml-1">
                    <span className="truncate font-semibold">LaunchPro</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
  
        <SidebarContent>
          <NavMain items={data.navMain} />
          { /* <NavProjects projects={data.projects} /> */ }
          <NavSecondary items={data.navSecondary} className="mt-auto" />
        </SidebarContent>
  
        <SidebarFooter>
  <SidebarMenu>
  <SidebarMenuItem>
          <SidebarMenuButton 
            size="lg" 
            asChild 
            onClick={() => setIsModalOpen(true)}
          >
            <a href="#" onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(true);
            }}>
              <div className="flex items-center justify-center">
                {platforms && platforms.length > 0 ? (
                  <img 
                    src={platforms[0].logo}
                    alt={platforms[0].name}
                    className="w-8 h-8 rounded-lg"
                  />
                ) : (
                  <div className="flex items-center justify-center w-6 h-6 bg-gray-200 rounded-lg">
                    <span className="text-gray-500">+</span>
                  </div>
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {platforms && platforms.length > 0 ? platforms[0].name : "No Platform"}
                </span>
                <span className="truncate text-xs">
                  {platforms && "SaaS"}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>

  </SidebarMenu>
</SidebarFooter>

{platforms && platforms.length > 0 && (
        <EditPlatformModal
          platform={platforms[0]}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      </Sidebar>
    );
  }
