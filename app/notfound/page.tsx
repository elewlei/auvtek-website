// app/notfound/page.tsx
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Home, AlertTriangle } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4">
      <div className="text-center max-w-md mx-auto">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="w-32 h-32 bg-destructive/10 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-16 h-16 text-destructive" />
            </div>
            <div className="absolute -top-2 -right-2 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">4</span>
            </div>
            <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">4</span>
            </div>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-4xl font-bold text-primary mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. 
          Let&apos;s get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleGoBack}
            variant="outline"
            className="flex items-center gap-2"
          >
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            Go Back
          </Button>
          <Button
            onClick={handleGoHome}
            className="flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Go to Homepage
          </Button>
        </div>

        {/* Additional Help */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">
            Still having trouble?
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="/contact" 
              className="text-sm text-primary hover:underline"
            >
              Contact Support
            </a>
            <span className="text-border">•</span>
            <a 
              href="/solutions" 
              className="text-sm text-primary hover:underline"
            >
              Browse Solutions
            </a>
            <span className="text-border">•</span>
            <a 
              href="/products" 
              className="text-sm text-primary hover:underline"
            >
              View Products
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}