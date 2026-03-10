"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, AlertCircle, Info, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

const alerts = [
  {
    id: 1,
    severity: "critical",
    message: "Tower NG-LAG-042 offline - No heartbeat detected",
    tower: "NG-LAG-042",
    time: "2 min ago",
    category: "Equipment",
  },
  {
    id: 2,
    severity: "critical",
    message: "Power failure at site NG-KAN-023",
    tower: "NG-KAN-023",
    time: "5 min ago",
    category: "Power",
  },
  {
    id: 3,
    severity: "warning",
    message: "High PRB utilization (95%) at NG-ABJ-015",
    tower: "NG-ABJ-015",
    time: "15 min ago",
    category: "Capacity",
  },
  {
    id: 4,
    severity: "warning",
    message: "Elevated packet loss on backhaul link",
    tower: "NG-LAG-089",
    time: "23 min ago",
    category: "Transport",
  },
  {
    id: 5,
    severity: "info",
    message: "Scheduled maintenance window starting",
    tower: "NG-PH-001",
    time: "1 hour ago",
    category: "Maintenance",
  },
]

const severityConfig = {
  critical: {
    icon: AlertTriangle,
    color: "text-destructive",
    bg: "bg-destructive/10",
    badge: "bg-destructive",
  },
  warning: {
    icon: AlertCircle,
    color: "text-warning",
    bg: "bg-warning/10",
    badge: "bg-warning",
  },
  info: {
    icon: Info,
    color: "text-info",
    bg: "bg-info/10",
    badge: "bg-info",
  },
}

export function AlertsPanel() {
  return (
    <Card className="bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-foreground">Active Alerts</CardTitle>
          <CardDescription>Network events requiring attention</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          View All
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert) => {
            const config = severityConfig[alert.severity as keyof typeof severityConfig]
            const Icon = config.icon
            return (
              <div
                key={alert.id}
                className={cn(
                  "flex items-start gap-3 rounded-lg border border-border p-3",
                  config.bg
                )}
              >
                <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", config.color)} />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-foreground">
                    {alert.message}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{alert.tower}</span>
                    <span>•</span>
                    <span>{alert.time}</span>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={cn("shrink-0 text-xs", config.badge, "text-foreground border-0")}
                >
                  {alert.category}
                </Badge>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
