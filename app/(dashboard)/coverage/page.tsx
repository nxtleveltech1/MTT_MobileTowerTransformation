"use client"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Radio, Signal, Users, Zap, Layers, MapPin, ZoomIn, ZoomOut, Maximize2 } from "lucide-react"

// Mock tower data with coordinates for Nigeria
const towerLocations = [
  { id: "NG-LAG-001", name: "Lagos Island", lat: 6.45, lng: 3.39, status: "online", users: 1247, signal: 95 },
  { id: "NG-LAG-002", name: "Victoria Island", lat: 6.43, lng: 3.42, status: "online", users: 2103, signal: 92 },
  { id: "NG-LAG-042", name: "Ikeja", lat: 6.59, lng: 3.35, status: "offline", users: 0, signal: 0 },
  { id: "NG-ABJ-015", name: "Abuja Central", lat: 9.08, lng: 7.40, status: "warning", users: 1856, signal: 78 },
  { id: "NG-PH-008", name: "Port Harcourt", lat: 4.77, lng: 7.01, status: "online", users: 943, signal: 88 },
  { id: "NG-KAN-023", name: "Kano", lat: 12.00, lng: 8.59, status: "warning", users: 1532, signal: 72 },
  { id: "NG-IBD-012", name: "Ibadan", lat: 7.40, lng: 3.91, status: "online", users: 876, signal: 90 },
  { id: "NG-ENU-005", name: "Enugu", lat: 6.44, lng: 7.49, status: "online", users: 654, signal: 94 },
]

const regionStats = [
  { region: "Lagos", towers: 342, coverage: 98, users: "1.2M" },
  { region: "Abuja", towers: 186, coverage: 95, users: "680K" },
  { region: "Rivers", towers: 124, coverage: 88, users: "420K" },
  { region: "Kano", towers: 98, coverage: 82, users: "380K" },
  { region: "Oyo", towers: 87, coverage: 85, users: "320K" },
  { region: "Enugu", towers: 76, coverage: 89, users: "280K" },
]

const statusColors = {
  online: "bg-success",
  warning: "bg-warning",
  offline: "bg-destructive",
}

export default function CoveragePage() {
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [mapLayer, setMapLayer] = useState("towers")
  const [selectedTower, setSelectedTower] = useState<typeof towerLocations[0] | null>(null)

  return (
    <>
      <Header title="Coverage Map" subtitle="Geographic network coverage visualization" />
      <div className="flex-1 overflow-auto p-6">
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Map View - Takes 3 columns */}
          <div className="lg:col-span-3">
            <Card className="bg-card h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-foreground">Network Coverage</CardTitle>
                  <CardDescription>Interactive map of tower locations and signal coverage</CardDescription>
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
                      <SelectItem value="lagos">Lagos</SelectItem>
                      <SelectItem value="abuja">Abuja</SelectItem>
                      <SelectItem value="rivers">Rivers</SelectItem>
                      <SelectItem value="kano">Kano</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                {/* Simplified Map Visualization */}
                <div className="relative h-[500px] rounded-lg border border-border bg-secondary/30 overflow-hidden">
                  {/* Map Controls */}
                  <div className="absolute right-4 top-4 z-10 flex flex-col gap-2">
                    <Button variant="outline" size="icon" className="bg-card">
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="bg-card">
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="bg-card">
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Grid overlay for map effect */}
                  <div className="absolute inset-0 opacity-20">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                  </div>

                  {/* Nigeria outline placeholder with tower markers */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative h-[400px] w-[500px]">
                      {/* Simple Nigeria shape */}
                      <svg viewBox="0 0 200 180" className="h-full w-full opacity-30">
                        <path
                          d="M60,20 L140,15 L170,50 L180,100 L160,150 L120,170 L80,165 L40,140 L30,100 L40,50 Z"
                          fill="oklch(0.7 0.15 160)"
                          stroke="oklch(0.7 0.15 160)"
                          strokeWidth="2"
                        />
                      </svg>

                      {/* Tower markers positioned roughly over map */}
                      {towerLocations.map((tower, index) => {
                        // Simple positioning based on index for demo
                        const positions = [
                          { left: "25%", top: "60%" }, // Lagos
                          { left: "28%", top: "58%" }, // Victoria Island
                          { left: "30%", top: "52%" }, // Ikeja
                          { left: "55%", top: "30%" }, // Abuja
                          { left: "45%", top: "75%" }, // Port Harcourt
                          { left: "60%", top: "15%" }, // Kano
                          { left: "30%", top: "45%" }, // Ibadan
                          { left: "50%", top: "55%" }, // Enugu
                        ]
                        const pos = positions[index] || { left: "50%", top: "50%" }
                        
                        return (
                          <button
                            key={tower.id}
                            className={cn(
                              "absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-all hover:scale-125 cursor-pointer",
                              tower.status === "online" && "bg-success/20 ring-2 ring-success",
                              tower.status === "warning" && "bg-warning/20 ring-2 ring-warning animate-pulse",
                              tower.status === "offline" && "bg-destructive/20 ring-2 ring-destructive",
                              selectedTower?.id === tower.id && "scale-125 ring-4"
                            )}
                            style={{ left: pos.left, top: pos.top }}
                            onClick={() => setSelectedTower(tower)}
                          >
                            <Radio
                              className={cn(
                                "h-4 w-4",
                                tower.status === "online" && "text-success",
                                tower.status === "warning" && "text-warning",
                                tower.status === "offline" && "text-destructive"
                              )}
                            />
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-4 rounded-lg bg-card/90 p-3 backdrop-blur">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-success" />
                      <span className="text-xs text-foreground">Online</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-warning" />
                      <span className="text-xs text-foreground">Warning</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-destructive" />
                      <span className="text-xs text-foreground">Offline</span>
                    </div>
                  </div>

                  {/* Selected Tower Info */}
                  {selectedTower && (
                    <div className="absolute right-4 bottom-4 w-64 rounded-lg bg-card/95 p-4 backdrop-blur border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-foreground">{selectedTower.id}</span>
                        <Badge className={cn(statusColors[selectedTower.status as keyof typeof statusColors], "text-foreground")}>
                          {selectedTower.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{selectedTower.name}</p>
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

          {/* Sidebar Stats */}
          <div className="space-y-6">
            {/* Coverage Summary */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-foreground text-base">Coverage Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Towers</span>
                  <span className="font-bold text-foreground">2,892</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Coverage Area</span>
                  <span className="font-bold text-foreground">92.4%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Active Users</span>
                  <span className="font-bold text-foreground">4.2M</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Avg Signal</span>
                  <span className="font-bold text-foreground">-78 dBm</span>
                </div>
              </CardContent>
            </Card>

            {/* Region Stats */}
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

            {/* Quick Actions */}
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
