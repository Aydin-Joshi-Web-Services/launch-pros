import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Twitter, Facebook, Linkedin, ArrowRight } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-900">
      <div className="container mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-x-12 gap-y-8">
          {/* Brand Section - 2 columns wide */}
          <div className="lg:col-span-2 space-y-6">
            <Link
              href="/"
              className="flex items-center gap-3 group"
            >
              <div className="relative w-8 h-8">
                <Image
                  src="/logo.svg"
                  alt="Hedge AI Logo"
                  fill
                  className="rounded-lg transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="font-semibold text-xl bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent font-clash">
                Hedge AI
              </span>
            </Link>
            <p className="text-zinc-400 text-sm max-w-sm">
              Your trusted AI companion for hedge fund management. Empowering investors with cutting-edge artificial intelligence solutions.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link href="https://twitter.com" className="text-zinc-500 hover:text-white transition-colors">
                <Twitter size={18} />
              </Link>
              <Link href="https://facebook.com" className="text-zinc-500 hover:text-white transition-colors">
                <Facebook size={18} />
              </Link>
              <Link href="https://linkedin.com" className="text-zinc-500 hover:text-white transition-colors">
                <Linkedin size={18} />
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Features</h3>
            <ul className="space-y-3 text-sm">
              {['AI Trading', 'Smart Portfolio', 'Real Time Analytics', 'Quick Execution'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`} 
                        className="text-zinc-400 hover:text-white flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform">
                      {item}
                    </span>
                    <ArrowRight className="w-3 h-3 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Resources</h3>
            <ul className="space-y-3 text-sm">
              {['Blog', 'Case Studies', 'Documentation', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`}
                        className="text-zinc-400 hover:text-white flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform">
                      {item}
                    </span>
                    <ArrowRight className="w-3 h-3 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Company</h3>
            <ul className="space-y-3 text-sm">
              {['About', 'Careers', 'Contact', 'Investor Relations'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`}
                        className="text-zinc-400 hover:text-white flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform">
                      {item}
                    </span>
                    <ArrowRight className="w-3 h-3 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="text-zinc-400">
                123 Trading Street
                <br />
                New York, NY 10001
              </li>
              <li>
                <Link href="mailto:contact@hedgeai.com" 
                      className="text-zinc-400 hover:text-white transition-colors">
                  contact@hedgeai.com
                </Link>
              </li>
              <li>
                <Link href="tel:+1234567890" 
                      className="text-zinc-400 hover:text-white transition-colors">
                  +1 (234) 567-890
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
          <p>&copy; {new Date().getFullYear()} Hedge AI. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;