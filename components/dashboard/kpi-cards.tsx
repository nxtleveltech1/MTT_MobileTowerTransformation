"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Radio, Users, Activity, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

const kpis = [
  {
    title: "Active Towers",
    value: "2,847",
    change: "+12",
    trend: "up",
    icon: Radio,
    subtitle: "of 2,892 total",
  },
  {
    title: "Connected Subscribers",
    value: "4.2M",
    change: "+2.3%",
    trend: "up",
    icon: Users,
    subtitle: "Last 24 hours",
  },
  {
    title: "Network Throughput",
    value: "847 Gbps",
    change: "+5.8%",
    trend: "up",
    icon: Activity,
    subtitle: "Current aggregate",
  },
  {
    title: "Active Alerts",
    value: "23",
    change: "-8",
    trend: "down",
    icon: AlertTriangle,
    subtitle: "7 critical, 16 warning",
  },
]

export function KpiCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => (
        <Card key={kpi.title} className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {kpi.title}
            </CardTitle>
            <kpi.icon className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
            <div className="flex items-center gap-2 text-xs">
              <span
                className={cn(
                  "flex items-center gap-1",
                  kpi.trend === "up" && kpi.title !== "Active Alerts"
                    ? "text-success"
                    : kpi.trend === "down" && kpi.title === "Active Alerts"
                    ? "text-success"
                    : "text-destructive"
                )}
              >
                {kpi.trend === "up" ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {kpi.change}
              </span>
              <span className="text-muted-foreground">{kpi.subtitle}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
