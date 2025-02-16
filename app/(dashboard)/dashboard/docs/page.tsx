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
import handleBillingButton from "@/hooks/use-portal";
import { UserButton } from "@clerk/nextjs";

function Page() {
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
                  <BreadcrumbPage>Development</BreadcrumbPage>
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
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center p-6 bg-white font-dmsans">
            <h1 className="text-4xl font-bold  mb-4">Feature Coming Soon</h1>
            <p className="text-lg">
              We&apos;re working hard to get this feature shipped out. Stay
              tuned for updates!
            </p>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Page;
