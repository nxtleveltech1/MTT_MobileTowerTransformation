"use client"

import dynamic from "next/dynamic"
import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Signal, Users, Zap, Layers, MapPin, Radio } from "lucide-react"
import type { TowerLocation } from "@/components/coverage/coverage-map"
import { towerLocations } from "@/lib/mock-towers"

const CoverageMap = dynamic(
  () => import("@/components/coverage/coverage-map").then((m) => m.CoverageMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[500px] items-center justify-center rounded-lg border border-border bg-secondary/30">
        <span className="text-sm text-muted-foreground">Loading map…</span>
      </div>
    ),
  }
)

const regionStats = [
  { region: "Gauteng", towers: 892, coverage: 98, users: "2.1M" },
  { region: "Western Cape", towers: 486, coverage: 95, users: "1.2M" },
  { region: "KwaZulu-Natal", towers: 424, coverage: 88, users: "920K" },
  { region: "Eastern Cape", towers: 298, coverage: 82, users: "580K" },
  { region: "Free State", towers: 187, coverage: 85, users: "420K" },
  { region: "Limpopo", towers: 176, coverage: 89, users: "380K" },
]

const totalTowers = towerLocations.length
const totalUsers = towerLocations.reduce((s, t) => s + t.users, 0)

const statusColors = {
  online: "bg-success",
  warning: "bg-warning",
  offline: "bg-destructive",
}

export default function CoveragePage() {
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [mapLayer, setMapLayer] = useState("towers")
  const [selectedTower, setSelectedTower] = useState<TowerLocation | null>(null)

  return (
    <>
      <Header title="Coverage Map" subtitle="Geographic network coverage visualization" />
      <div className="flex-1 overflow-auto p-6">
        <div className="grid gap-6 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <Card className="bg-card h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-foreground">Network Coverage</CardTitle>
                  <CardDescription>Interactive map of tower locations and signal coverage — South Africa</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={mapLayer} onValueChange={setMapLayer}>
                    <SelectTrigger className="w-40 bg-secondary">
                      <Layers className="mr-2 h-4 w-4" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="towers">Tower Locations</SelectItem>
                      <SelectItem value="heatmap">Traffic Heatmap</SelectItem>
                      <SelectItem value="signal">Signal Strength</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger className="w-36 bg-secondary">
                      <MapPin className="mr-2 h-4 w-4" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Regions</SelectItem>
                      <SelectItem value="gauteng">Gauteng</SelectItem>
                      <SelectItem value="western-cape">Western Cape</SelectItem>
                      <SelectItem value="kwazulu-natal">KwaZulu-Natal</SelectItem>
                      <SelectItem value="eastern-cape">Eastern Cape</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative h-[500px] rounded-lg border border-border overflow-hidden">
                  <CoverageMap
                    towers={towerLocations}
                    onTowerSelect={setSelectedTower}
                  />

                  <div className="absolute bottom-4 left-4 z-[1000] flex items-center gap-5 rounded-lg border border-border bg-card/95 px-4 py-3 backdrop-blur">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-green-600 bg-green-500 shadow-sm" />
                      <span className="text-sm font-medium text-foreground">Online</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-amber-600 bg-amber-500 shadow-sm" />
                      <span className="text-sm font-medium text-foreground">Warning</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-red-600 bg-red-500 shadow-sm" />
                      <span className="text-sm font-medium text-foreground">Offline</span>
                    </div>
                  </div>

                  {selectedTower && (
                    <div className="absolute right-4 bottom-4 z-[1000] w-64 rounded-lg border border-border bg-card/95 p-4 backdrop-blur">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-medium text-foreground">{selectedTower.id}</span>
                        <Badge className={cn(statusColors[selectedTower.status as keyof typeof statusColors], "text-foreground")}>
                          {selectedTower.status}
                        </Badge>
                      </div>
                      <p className="mb-3 text-sm text-muted-foreground">{selectedTower.name}</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Users className="h-3 w-3" />
                          <span>{selectedTower.users.toLocaleString("en-US")} users</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Signal className="h-3 w-3" />
                          <span>{selectedTower.signal}% signal</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-foreground text-base">Coverage Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Towers</span>
                  <span className="font-bold text-foreground">{totalTowers.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Coverage Area</span>
                  <span className="font-bold text-foreground">92.4%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Active Users</span>
                  <span className="font-bold text-foreground">
                    {totalUsers >= 1_000_000 ? `${(totalUsers / 1_000_000).toFixed(1)}M` : totalUsers.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Avg Signal</span>
                  <span className="font-bold text-foreground">-78 dBm</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-foreground text-base">By Region</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {regionStats.map((region) => (
                    <div
                      key={region.region}
                      className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-2"
                    >
                      <div>
                        <p className="font-medium text-foreground text-sm">{region.region}</p>
                        <p className="text-xs text-muted-foreground">{region.towers} towers</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-foreground text-sm">{region.coverage}%</p>
                        <p className="text-xs text-muted-foreground">{region.users}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-foreground text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Zap className="mr-2 h-4 w-4" />
                  Run Coverage Analysis
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Radio className="mr-2 h-4 w-4" />
                  Plan New Tower
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Signal className="mr-2 h-4 w-4" />
                  Signal Optimization
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
