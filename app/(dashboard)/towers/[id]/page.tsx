"use client"

import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { towers, type Tower } from "@/lib/towers-mock"
import { cn } from "@/lib/utils"
import { ChevronRight, MapPin, Battery, Thermometer, FileText } from "lucide-react"

const statusConfig: Record<string, { color: string; label: string }> = {
  online: { color: "bg-success", label: "Online" },
  warning: { color: "bg-warning", label: "Warning" },
  offline: { color: "bg-destructive", label: "Offline" },
}

export default function TowerDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = typeof params.id === "string" ? decodeURIComponent(params.id) : ""
  const tower = towers.find((t) => t.id === id) as Tower | undefined

  if (!tower) {
    return (
      <>
        <Header title="Tower not found" />
        <div className="flex-1 overflow-auto p-6">
          <p className="text-muted-foreground">No tower found with ID: {id}</p>
          <Button variant="outline" className="mt-4" asChild>
            <Link href="/towers">Back to Towers</Link>
          </Button>
        </div>
      </>
    )
  }

  const config = statusConfig[tower.status] ?? statusConfig.online

  return (
    <>
      <Header
        title={tower.id}
        subtitle={tower.name}
      />
      <div className="flex-1 overflow-auto p-6">
        <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/towers" className="hover:text-foreground">Towers</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{tower.id}</span>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="bg-card lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-foreground">Overview</CardTitle>
              <CardDescription>Status and key metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status</span>
                <Badge className={cn(config.color, "text-foreground")}>{config.label}</Badge>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4">
                  <span className="text-sm text-muted-foreground">Technology</span>
                  <Badge variant="outline">{tower.technology}</Badge>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4">
                  <span className="text-sm text-muted-foreground">Region</span>
                  <span className="font-medium text-foreground">{tower.region}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4">
                  <span className="text-sm text-muted-foreground">Active users</span>
                  <span className="font-medium text-foreground">{tower.users.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4">
                  <span className="text-sm text-muted-foreground">Throughput</span>
                  <span className="font-medium text-foreground">{tower.throughput}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">PRB usage</span>
                  <span className="text-foreground">{tower.prb}%</span>
                </div>
                <Progress
                  value={tower.prb}
                  className={cn(
                    "h-2",
                    tower.prb > 90 && "[&>div]:bg-destructive",
                    tower.prb > 80 && tower.prb <= 90 && "[&>div]:bg-warning"
                  )}
                />
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary/30 p-3 text-sm">
                <Battery className={cn("h-4 w-4", tower.power > 80 ? "text-success" : tower.power > 50 ? "text-warning" : "text-destructive")} />
                <span className="text-muted-foreground">Power:</span>
                <span className="font-medium text-foreground">{tower.power}%</span>
                <Thermometer className="ml-4 h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Temp:</span>
                <span className="font-medium text-foreground">{tower.temp}°C</span>
              </div>
              <p className="text-xs text-muted-foreground">Last update: {tower.lastUpdate}</p>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-foreground text-base">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href={`/coverage?tower=${encodeURIComponent(tower.id)}`}>
                    <MapPin className="mr-2 h-4 w-4" />
                    View on Map
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href={`/towers/${encodeURIComponent(tower.id)}/logs`}>
                    <FileText className="mr-2 h-4 w-4" />
                    View Logs
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-foreground text-base">Location</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>Lat: {tower.lat}</p>
                <p>Lng: {tower.lng}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
