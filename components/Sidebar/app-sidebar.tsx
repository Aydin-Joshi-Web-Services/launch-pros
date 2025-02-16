"use client"

import * as React from "react"
import {
    LayoutDashboard,
    Wallet,
    Code2,
    BarChart3,
    Users2,
    FileText,
    Terminal,
    GitBranch,
    Database,
    CreditCard,
    TrendingUp,
    Receipt,
    LifeBuoy,
    Mail,
    Building2,
    MessageSquare,
    Settings2,
    Laptop,
    Command,
  } from "lucide-react"

import { NavMain } from "@/components/Sidebar/nav-main"
import { NavProjects } from "@/components/Sidebar/nav-projects"
import { NavSecondary } from "@/components/Sidebar/nav-secondary"
import { NavUser } from "@/components/Sidebar/nav-user"
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
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { ThemeButton } from "../ThemeButton"

  
  const data = {
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        isActive: true,
        items: [
          {
            title: "Overview",
            url: "/dashboard",
          },
          {
            title: "Analytics",
            url: "/dashboard/analytics",
          },
          {
            title: "Performance",
            url: "/dashboard/performance",
          },
        ],
      },
      {
        title: "Finance",
        url: "/finance",
        icon: Wallet,
        items: [
          {
            title: "Revenue",
            url: "/financial/revenue",
          },
          {
            title: "Expenses",
            url: "/financial/expenses",
          },
          {
            title: "Subscriptions",
            url: "/financial/subscriptions",
          },
          {
            title: "Invoices",
            url: "/financial/invoices",
          },
        ],
      },
      {
        title: "Development",
        url: "/development",
        icon: Code2,
        items: [
          {
            title: "Projects",
            url: "/development/projects",
          },
          {
            title: "Deployments",
            url: "/development/deployments",
          },
          {
            title: "Infrastructure",
            url: "/development/infrastructure",
          },
          {
            title: "API Status",
            url: "/development/api-status",
          },
        ],
      },
      {
        title: "Promotion",
        url: "/promotion",
        icon: Laptop,
        items: [
          {
            title: "General",
            url: "/settings/general",
          },
          {
            title: "Team",
            url: "/settings/team",
          },
          {
            title: "Integrations",
            url: "/settings/integrations",
          },
        ],
      },
    ],
    navSecondary: [
      {
        title: "Support",
        url: "/support",
        icon: LifeBuoy,
      },
      {
        title: "Documentation",
        url: "/docs",
        icon: FileText,
      },
    ],
    projects: [
      {
        name: "Main Product",
        url: "/projects/main",
        icon: Terminal,
      },
      {
        name: "API Services",
        url: "/projects/api",
        icon: Database,
      },
      {
        name: "Mobile App",
        url: "/projects/mobile",
        icon: GitBranch,
      },
    ],
  }
  

  export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { user } = useUser()
    const userData = useQuery(api.users.getByUserId, user ? { userId: user.id } : "skip")

    return (
      <Sidebar variant="inset" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="#">
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
          <NavProjects projects={data.projects} />
          <NavSecondary items={data.navSecondary} className="mt-auto" />
        </SidebarContent>
  
        <SidebarFooter>
  <SidebarMenu>
    <SidebarMenuItem>
    <div className="flex items-center justify-between p-4">
              {/* Logo and Company Name on the Left */}
              <div className="flex items-center gap-4">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">SaaS Manager</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </div>
              <ThemeButton />
              </div>
    </SidebarMenuItem>
  </SidebarMenu>
</SidebarFooter>


      </Sidebar>
    );
  }
  