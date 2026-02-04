// components/Header.tsx
import React from 'react';
import Link from 'next/link'; // 改为 Next.js 的 Link

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">OceanTech</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link 
              href="/products" 
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Products
            </Link>
            <Link 
              href="/about" 
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}