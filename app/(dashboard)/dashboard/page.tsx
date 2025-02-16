"use client";

import CardIcon from "@/components/CardIcon";
import { AppSidebar } from "@/components/Sidebar/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { api } from "@/convex/_generated/api";
import handleBillingButton from "@/hooks/use-portal";
import { UserButton, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const { user } = useUser();

  // Get user data and platforms
  const userData = useQuery(
    api.users.getByUserId,
    user ? { userId: user.id } : "skip"
  );
  const convexUser = useQuery(
    api.users.getByUserId,
    user ? { userId: user.id } : "skip"
  );
  const platforms = useQuery(
    api.platforms.by_owner_id,
    convexUser ? { ownerId: convexUser._id } : "skip"
  );

  const [hasCheckedData, setHasCheckedData] = useState(false);

  useEffect(() => {
    if (!userData || hasCheckedData) return;

    // Mark that the data check has occurred
    setHasCheckedData(true);

    if (!userData.hasActivePlan) {
      // Redirect to payment page if no active plan
      router.push("/payment");
      return;
    }

    // Check if platforms data has loaded and user has no platforms
    if (platforms !== undefined && platforms.length === 0) {
      // Redirect to onboarding if no platforms exist
      router.push("/dashboard/onboarding");
      return;
    }
  }, [userData, platforms, router, hasCheckedData]);

  // Loading state while checking user data and platforms
  if (!userData || platforms === undefined) {
    return <div>Loading...</div>; // or a spinner
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
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
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
  );
}
