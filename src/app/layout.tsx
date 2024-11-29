import type { FC } from "react";

import Link from "next/link";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/providers/theme-provider";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased scroll-smooth bg-background font-sans text-foreground transition-all duration-500`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Link href="#main-content" className="sr-only focus:not-sr-only">
            Skip to main content
          </Link>
          <main className="min-h-screen flex flex-col">
            <div id="main-content" className="flex-1">
              {children}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default Layout;
