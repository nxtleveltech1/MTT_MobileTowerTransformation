"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Radio, Signal, Wifi, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

const towers = [
  {
    id: "NG-LAG-001",
    name: "Lagos Island Central",
    status: "online",
    technology: "5G NR",
    prb: 78,
    users: 1247,
    throughput: "2.4 Gbps",
  },
  {
    id: "NG-LAG-002",
    name: "Victoria Island",
    status: "online",
    technology: "LTE-A",
    prb: 92,
    users: 2103,
    throughput: "1.8 Gbps",
  },
  {
    id: "NG-ABJ-015",
    name: "Abuja Central",
    status: "warning",
    technology: "LTE-A",
    prb: 95,
    users: 1856,
    throughput: "1.2 Gbps",
  },
  {
    id: "NG-LAG-042",
    name: "Ikeja GRA",
    status: "offline",
    technology: "5G NR",
    prb: 0,
    users: 0,
    throughput: "0 Mbps",
  },
  {
    id: "NG-PH-008",
    name: "Port Harcourt Marina",
    status: "online",
    technology: "LTE",
    prb: 65,
    users: 943,
    throughput: "890 Mbps",
  },
]

const statusConfig = {
  online: { color: "bg-success", label: "Online" },
  warning: { color: "bg-warning", label: "Warning" },
  offline: { color: "bg-destructive", label: "Offline" },
}

export function TowerStatus() {
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Tower Status</CardTitle>
        <CardDescription>Real-time base station monitoring</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {towers.map((tower) => (
            <div
              key={tower.id}
              className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-3"
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg",
                    tower.status === "online"
                      ? "bg-success/20"
                      : tower.status === "warning"
                      ? "bg-warning/20"
                      : "bg-destructive/20"
                  )}
                >
                  {tower.status === "offline" ? (
                    <AlertTriangle
                      className={cn(
                        "h-5 w-5",
                        tower.status === "offline" && "text-destructive"
                      )}
                    />
                  ) : (
                    <Radio
                      className={cn(
                        "h-5 w-5",
                        tower.status === "online"
                          ? "text-success"
                          : "text-warning"
                      )}
                    />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">
                      {tower.id}
                    </span>
                    <Badge
                      variant="outline"
                      className="text-xs"
                    >
                      {tower.technology}
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {tower.name}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="hidden text-right md:block">
                  <div className="text-sm text-muted-foreground">PRB Usage</div>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={tower.prb}
                      className={cn(
                        "h-2 w-20",
                        tower.prb > 90 && "[&>div]:bg-destructive",
                        tower.prb > 80 && tower.prb <= 90 && "[&>div]:bg-warning"
                      )}
                    />
                    <span className="text-sm font-medium text-foreground">
                      {tower.prb}%
                    </span>
                  </div>
                </div>

                <div className="hidden text-right md:block">
                  <div className="text-sm text-muted-foreground">Users</div>
                  <div className="flex items-center gap-1 text-foreground">
                    <Wifi className="h-3 w-3" />
                    <span className="text-sm font-medium">
                      {tower.users.toLocaleString("en-US")}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Throughput</div>
                  <div className="flex items-center gap-1 text-foreground">
                    <Signal className="h-3 w-3" />
                    <span className="text-sm font-medium">{tower.throughput}</span>
                  </div>
                </div>

                <Badge
                  className={cn(
                    "w-20 justify-center",
                    statusConfig[tower.status as keyof typeof statusConfig].color,
                    "text-foreground"
                  )}
                >
                  {statusConfig[tower.status as keyof typeof statusConfig].label}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
