"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Radio,
  Activity,
  MapPin,
  Users,
  Bell,
  Settings,
  ChevronLeft,
  Signal,
  Gauge,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "Towers", href: "/towers", icon: Radio },
  { name: "Traffic", href: "/traffic", icon: Activity },
  { name: "Coverage Map", href: "/coverage", icon: MapPin },
  { name: "Subscribers", href: "/subscribers", icon: Users },
  { name: "Alerts", href: "/alerts", icon: Bell },
  { name: "Performance", href: "/performance", icon: Gauge },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-border bg-sidebar transition-all duration-300",
        collapsed ? "w-16" : "w-[248px]"
      )}
    >
      <div className="flex min-h-16 items-center justify-between border-b border-border px-4 py-3">
        {!collapsed && (
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <Signal className="h-6 w-6 shrink-0 text-primary" />
            <div className="flex min-w-0 flex-col">
              <span className="text-lg font-semibold text-sidebar-foreground leading-tight">MTT</span>
              <span className="text-xs text-muted-foreground leading-tight">Mobile Tower Transformation</span>
            </div>
          </div>
        )}
        {collapsed && <Signal className="mx-auto h-6 w-6 text-primary" />}
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-8 w-8", collapsed && "mx-auto")}
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform",
              collapsed && "rotate-180"
            )}
          />
        </Button>
      </div>

      <nav className="flex-1 space-y-1 p-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? item.name : undefined}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-border p-2 space-y-1">
        <div className={cn("flex items-center gap-2 px-3 py-2", collapsed && "justify-center px-0")}>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-8 w-8 rounded-lg border border-sidebar-border",
                rootBox: "relative z-50",
                cardBox: "z-[100]",
                card: "z-[100]",
                popoverCard: "z-[100]",
              },
              variables: {
                colorPrimary: "oklch(0.7 0.15 160)",
                colorBackground: "oklch(0.12 0 0)",
                colorText: "oklch(0.95 0 0)",
                colorTextSecondary: "oklch(0.6 0 0)",
                borderRadius: "0.5rem",
              },
            }}
          />
          {!collapsed && (
            <span className="text-sm text-sidebar-foreground truncate">Account</span>
          )}
        </div>
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent",
            collapsed && "justify-center px-2"
          )}
        >
          <Settings className="h-5 w-5 shrink-0" />
          {!collapsed && <span>Settings</span>}
        </Link>
      </div>
    </aside>
  )
}
