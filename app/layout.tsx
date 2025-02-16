import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "../components/providers/ConvexClientProvider";
import SyncUserWithConvex from "@/components/SyncUserWithConvex";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const clashgrotesk = localFont({
  src: "../public/fonts/clash-grotesk.woff2",
  style: "normal",
  display: "swap",
  variable: "--font-clashgrotesk",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const dmsans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dmsans",
});

export const metadata: Metadata = {
  title: "SaaS Management for Developers | LaunchPro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.variable} ${dmsans.variable} ${clashgrotesk.variable}`} suppressHydrationWarning>
        <body className="min-h-screen">
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <ConvexClientProvider>
              <SyncUserWithConvex />

        <main className="mt-18 mb-18">
        {children}
        </main>
      </ConvexClientProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}