"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Bot,
  ChartLine,
  LineChart,
  Newspaper,
  Timer
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const features = [
  {
    name: "AI Trading",
    description: "Advanced algorithms for automated trading",
    icon: ChartLine,
    href: "/features/ai-trading"
  },
  {
    name: "Smart Portfolio",
    description: "AI-powered portfolio management",
    icon: Bot,
    href: "/features/smart-portfolio"
  },
  {
    name: "Real-time Analytics",
    description: "Live market analysis and insights",
    icon: LineChart,
    href: "/features/analytics"
  },
  {
    name: "Quick Execution",
    description: "Fast and reliable trade execution",
    icon: Timer,
    href: "/features/quick-execution"
  },
];

const resources = [
  {
    name: "Case Studies",
    description: "How we've helped others grow",
    icon: BookOpen,
    href: "/resources/case-studies"
  },
  {
    name: "Blog",
    description: "Latest insights and updates",
    icon: Newspaper,
    href: "/resources/blog"
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [hoveredLink, setHoveredLink] = useState(null);

  const links = [
    { name: "Features", hash: "/features", dropdownItems: features },
    { name: "Resources", hash: "/resources", dropdownItems: resources },
    { name: "FAQ", hash: "/faq" },
    { name: "Investments", hash: "/investments" },
    { name: "About Us", hash: "/about" },
    { name: "Contact", hash: "/contact" },
  ];

  const isLinkActive = (hash: string) => {
    if (hash === pathname) return true;
    if (hash === "/features" && pathname.startsWith("/features/")) return true;
    if (hash === "/resources" && pathname.startsWith("/resources/")) return true;
    return false;
  };

  const Dropdown = ({ items }: { items: any }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: '100%' }}
      className="mt-2 w-80 bg-gray-900 rounded-xl shadow-xl border border-gray-800 overflow-hidden z-[999]"
    >
      <div className="relative grid grid-cols-1 gap-2 p-4">
        {items.map((item: any) => (
          <Link href={item.href} key={item.name}>
            <motion.div
              whileHover={{ x: 4 }}
              className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <div className="mt-1 p-2 bg-gray-800 rounded-lg">
                <item.icon className="w-4 h-4 text-gray-200" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-200">{item.name}</h3>
                <p className="text-xs text-gray-400">{item.description}</p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );

  return (
    <header className="relative backdrop-blur-md border-b bg-slate-950 border-gray-800">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-8 h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Hedge AI Logo"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="font-medium text-xl text-white font-clash">LaunchPro</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          {links.map((link) => (
            <div
              key={link.name}
              className="relative"
              onMouseEnter={() => setHoveredLink(link.name)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <Link
                href={link.hash}
                className={`text-sm px-4 py-2 rounded-lg transition-all duration-200 ${
                  isLinkActive(link.hash)
                    ? "text-white font-medium bg-gray-800"
                    : "text-white hover:text-gray-200 hover:bg-gray-800/50"
                }`}
              >
                {link.name}
              </Link>
              <AnimatePresence>
                {hoveredLink === link.name && link.dropdownItems && (
                  <Dropdown items={link.dropdownItems} />
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Waitlist Button */}
        <Button
          className="rounded-lg text-sm bg-white text-black hover:bg-gray-200 transition-colors"
        asChild>
          <Link href="/sign-up">
          Sign up
          </Link>
        </Button>
      </nav>
    </header>
  );
}