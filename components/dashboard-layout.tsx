"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Shield, LayoutDashboard, FolderOpen, Search, BarChart3, Settings, LogOut, Palette, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/cases",
      label: "Cases",
      icon: FolderOpen,
    },
    {
      href: "/search",
      label: "Search",
      icon: Search,
    },
    {
      href: "/analysis",
      label: "Analysis",
      icon: BarChart3,
    },
    {
      href: "/design-system",
      label: "Design System",
      icon: Palette,
    },
    {
      href: "/settings",
      label: "Settings",
      icon: Settings,
    },
  ]

  const NavItems = () => (
    <>
      {routes.map((route) => {
        const Icon = route.icon
        return (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-muted",
              pathname === route.href ? "bg-muted font-medium" : "text-muted-foreground",
            )}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Icon className="h-4 w-4" />
            {route.label}
          </Link>
        )
      })}
    </>
  )

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            <span className="text-xl font-bold">CaseWell</span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  <NavItems />
                </nav>
              </SheetContent>
            </Sheet>
            <Button variant="ghost" size="icon" className="hidden md:inline-flex">
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Logout</span>
            </Button>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 flex-col border-r bg-muted/40 md:flex">
          <nav className="grid gap-2 p-4 text-sm">
            <NavItems />
          </nav>
        </aside>
        <main className="flex-1 overflow-x-hidden">{children}</main>
      </div>
    </div>
  )
}

