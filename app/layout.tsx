import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const clashgrotesk = localFont({
  src: "../public/fonts/clash-grotesk.woff2",
  style: "normal",
  display: "swap",
  variable: "--font-clashgrotesk"
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
})

const dmsans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dmsans"
}) 

export const metadata: Metadata = {
  title: "SaaS Management for Solopreneuers | LaunchPros",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en" className={`${inter.variable} ${dmsans.variable} ${clashgrotesk.variable}`}>
      <body
      >
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
