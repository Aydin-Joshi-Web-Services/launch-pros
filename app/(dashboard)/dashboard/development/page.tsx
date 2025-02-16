"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  GitBranch,
  FileCode,
  Search,
  ChevronLeft,
  Folder,
} from "lucide-react";
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

// Import Prism components from shadcn/ui
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const [fileLoading, setFileLoading] = useState(false);

  const fetchRepo = async () => {
    if (!owner || !repo) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSelectedFile(null);
      setFileContent(null);
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents`
      );

      if (!response.ok) {
        throw new Error("Repository not found or private");
      }

      const data = await response.json();
      setContent(data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const fetchFileContent = async (item: any) => {
    if (item.type === "dir") {
      // Fetch the contents of the folder and update the content state
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/contents/${item.path}`
        );
        const data = await response.json();
        setContent(data); // Update state with new directory contents
      } catch (err) {
      } finally {
        setLoading(false);
      }
    } else {
      // Handle file selection
      try {
        setFileLoading(true);
        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/contents/${item.path}`
        );
        const data = await response.json();
        const decodedContent = atob(data.content);
        setFileContent(decodedContent);
        setSelectedFile(item);
      } catch (err) {
      } finally {
        setFileLoading(false);
      }
    }
  };

  const CardIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="16"
        height="16"
      >
        <rect x="2" y="5" width="20" height="14" rx="3" ry="3" fill="#707070" />
        <rect x="2" y="9" width="20" height="2" fill="#fff" />
        <rect x="2" y="13" width="7" height="2" fill="#fff" />
      </svg>
    );
  };

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
            <UserButton />
          </div>
        </header>
        <div className="w-full min-h-screen p-8 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                GitHub Repository Viewer{" "}
                <Badge className="text-xs bg-[#d5ff31] text-black hover:bg-[#d5ff31] ml-1">
                  Beta
                </Badge>
              </CardTitle>
              <CardDescription>
                Only works with public repositories currently.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Your GitHub Username"
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <Input
                    placeholder="SaaS Repository Name"
                    value={repo}
                    onChange={(e) => setRepo(e.target.value)}
                  />
                </div>
                <Button
                  onClick={fetchRepo}
                  disabled={loading || !owner || !repo}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Search className="h-4 w-4 mr-2" />
                  )}
                  View Repo
                </Button>
              </div>

              {error && (
                <div className="mt-4 p-4 bg-red-50 text-red-500 rounded-lg">
                  {error}
                </div>
              )}
            </CardContent>
          </Card>

          {content && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center space-x-2">
                  <GitBranch className="h-5 w-5" />
                  <CardTitle className="text-lg">
                    {owner}/{repo}
                  </CardTitle>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={`https://github.com/${owner}/${repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on GitHub
                  </a>
                </Button>
              </CardHeader>
              <CardContent>
                {selectedFile ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedFile(null)}
                      >
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Back to files
                      </Button>
                      <span className="text-sm text-gray-500">
                        {selectedFile.path}
                      </span>
                    </div>
                    {fileLoading ? (
                      <div className="flex justify-center p-4">
                        <Loader2 className="h-6 w-6 animate-spin" />
                      </div>
                    ) : (
                      <pre
                        className={cn(
                          "p-4 rounded-lg bg-gray-50 overflow-x-auto",
                          "text-sm font-mono"
                        )}
                      >
                        <SyntaxHighlighter
                          language="javascript"
                          style={dracula}
                        >
                          {fileContent}
                        </SyntaxHighlighter>
                      </pre>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {Array.isArray(content) &&
                      content.map((item: any) => (
                        <button
                          key={item.path}
                          className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded w-full text-left"
                          onClick={() => fetchFileContent(item)}
                        >
                          {item.type === "dir" ? (
                            <Folder className="h-4 w-4 text-lime-500 font-bold" />
                          ) : (
                            <FileCode className="h-4 w-4" />
                          )}
                          <span>{item.name}</span>
                        </button>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
