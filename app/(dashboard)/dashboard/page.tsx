"use client"

import { api } from "@/convex/_generated/api"
import { UserButton, useUser } from "@clerk/nextjs"
import { useQuery } from "convex/react"
import { redirect, useRouter } from "next/navigation"
import { useEffect } from "react"
import { AppSidebar } from "@/components/Sidebar/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const CardIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
      <rect x="2" y="5" width="20" height="14" rx="3" ry="3" fill="#707070"/>
      <rect x="2" y="9" width="20" height="2" fill="#fff"/>
      <rect x="2" y="13" width="7" height="2" fill="#fff"/>
    </svg>
  )
}

export default function Dashboard() {
  const router = useRouter()
  const { user } = useUser()
  const userData = useQuery(api.users.getByUserId, user ? { userId: user.id } : "skip")

  useEffect(() => {
    if (!userData) {
      // If user data is still loading, do nothing
      redirect("/sign-in")
    }

    if (!userData.hasActivePlan) {
      // Redirect to payment page if no active plan
      router.push("/payment");
    }
  }, [userData, router]);

  // You can add a loading state here
  if (!userData) {
    return <div>Loading...</div>; // or a spinner
  }

  const handleBillingButton = async () => {
    const url = process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL!

    if (url) {
      router.push(url + "?prefilled_email=" + userData?.email)
    } else {
      throw new Error("Failed to edit payment details")
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 relative">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Overview</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="absolute top-4 right-4">
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="View subscription details"
                  labelIcon={<CardIcon />}
                  onClick={handleBillingButton}
                />
                <UserButton.Action label="manageAccount" />
              </UserButton.MenuItems>
            </UserButton>
          </div>
        </header>
        <div className="px-8 py-8 font-dmsans font-medium">
          <p className="text-2xl">Welcome back, {userData.name}!</p>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
