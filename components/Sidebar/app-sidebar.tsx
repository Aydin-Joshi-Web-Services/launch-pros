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
  const { user } = useUser();
  const userData = useQuery(
    api.users.getByUserId, 
    user ? { userId: user.id } : "skip"
  );
  const convexUser = useQuery(api.users.getByUserId, user ? { userId: user.id } : "skip");
  const platforms = useQuery(
    api.platforms.by_owner_id,
    convexUser ? { ownerId: convexUser._id } : "skip"
  );
  const [selectedPlatform, setSelectedPlatform] = React.useState(platforms?.[0]?._id);

  if (!userData || !platforms?.length) return null;

  const currentPlatform = platforms.find(p => p._id === selectedPlatform) || platforms[0];

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Select
              value={selectedPlatform} 
              onValueChange={(value) => setSelectedPlatform(value)}
            >
              <SelectTrigger className="w-full border-none shadow-none">
                <div className="flex items-center gap-3">
                  <img 
                    src={currentPlatform.logo} 
                    className="aspect-square size-8 rounded-lg object-cover"
                    alt={currentPlatform.name}
                  />
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <SelectValue placeholder="Select platform">
                      <span className="font-semibold">{currentPlatform.name}</span>
                    </SelectValue>
                  </div>
                </div>
              </SelectTrigger>
              <SelectContent>
                {platforms.map((platform) => (
                  <SelectItem 
                    key={platform._id} 
                    value={platform._id}
                    className="flex items-center gap-3 p-2"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={platform.logo} 
                        className="aspect-square size-8 rounded-lg object-cover"
                        alt={platform.name}
                      />
                      <div className="grid flex-1">
                        <span className="font-semibold">{platform.name}</span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser 
          user={{
            name: userData.name, 
            email: userData.email, 
            avatar: userData.avatar || "/default-avatar.png"
          }} 
        />
      </SidebarFooter>
    </Sidebar>
  );
}