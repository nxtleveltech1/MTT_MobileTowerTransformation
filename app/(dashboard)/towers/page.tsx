"use client"

import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Filter, MoreHorizontal, Radio, MapPin, Signal, Battery, Thermometer } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

const towers = [
  {
    id: "NG-LAG-001",
    name: "Lagos Island Central",
    region: "Lagos",
    status: "online",
    technology: "5G NR",
    prb: 78,
    users: 1247,
    throughput: "2.4 Gbps",
    lat: 6.4541,
    lng: 3.3947,
    power: 92,
    temp: 42,
    lastUpdate: "2 sec ago",
  },
  {
    id: "NG-LAG-002",
    name: "Victoria Island",
    region: "Lagos",
    status: "online",
    technology: "LTE-A",
    prb: 92,
    users: 2103,
    throughput: "1.8 Gbps",
    lat: 6.4281,
    lng: 3.4219,
    power: 88,
    temp: 45,
    lastUpdate: "5 sec ago",
  },
  {
    id: "NG-ABJ-015",
    name: "Abuja Central",
    region: "Abuja",
    status: "warning",
    technology: "LTE-A",
    prb: 95,
    users: 1856,
    throughput: "1.2 Gbps",
    lat: 9.0765,
    lng: 7.3986,
    power: 85,
    temp: 52,
    lastUpdate: "3 sec ago",
  },
  {
    id: "NG-LAG-042",
    name: "Ikeja GRA",
    region: "Lagos",
    status: "offline",
    technology: "5G NR",
    prb: 0,
    users: 0,
    throughput: "0 Mbps",
    lat: 6.5935,
    lng: 3.3453,
    power: 0,
    temp: 28,
    lastUpdate: "15 min ago",
  },
  {
    id: "NG-PH-008",
    name: "Port Harcourt Marina",
    region: "Rivers",
    status: "online",
    technology: "LTE",
    prb: 65,
    users: 943,
    throughput: "890 Mbps",
    lat: 4.7747,
    lng: 7.0134,
    power: 95,
    temp: 38,
    lastUpdate: "1 sec ago",
  },
  {
    id: "NG-KAN-023",
    name: "Kano Central",
    region: "Kano",
    status: "warning",
    technology: "LTE-A",
    prb: 88,
    users: 1532,
    throughput: "1.1 Gbps",
    lat: 12.0022,
    lng: 8.5919,
    power: 45,
    temp: 48,
    lastUpdate: "8 sec ago",
  },
  {
    id: "NG-IBD-012",
    name: "Ibadan North",
    region: "Oyo",
    status: "online",
    technology: "LTE",
    prb: 72,
    users: 876,
    throughput: "720 Mbps",
    lat: 7.3964,
    lng: 3.9050,
    power: 91,
    temp: 40,
    lastUpdate: "4 sec ago",
  },
  {
    id: "NG-ENU-005",
    name: "Enugu Central",
    region: "Enugu",
    status: "online",
    technology: "5G NR",
    prb: 58,
    users: 654,
    throughput: "1.9 Gbps",
    lat: 6.4402,
    lng: 7.4942,
    power: 97,
    temp: 35,
    lastUpdate: "2 sec ago",
  },
]

const statusConfig = {
  online: { color: "bg-success", label: "Online" },
  warning: { color: "bg-warning", label: "Warning" },
  offline: { color: "bg-destructive", label: "Offline" },
}

export default function TowersPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [regionFilter, setRegionFilter] = useState("all")

  const filteredTowers = towers.filter((tower) => {
    const matchesSearch =
      tower.id.toLowerCase().includes(search.toLowerCase()) ||
      tower.name.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || tower.status === statusFilter
    const matchesRegion = regionFilter === "all" || tower.region === regionFilter
    return matchesSearch && matchesStatus && matchesRegion
  })

  const regions = [...new Set(towers.map((t) => t.region))]

  return (
    <>
      <Header title="Tower Management" subtitle="Monitor and manage all base stations" />
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="bg-card">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Towers</p>
                    <p className="text-2xl font-bold text-foreground">2,892</p>
                  </div>
                  <Radio className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Online</p>
                    <p className="text-2xl font-bold text-success">2,847</p>
                  </div>
                  <Signal className="h-8 w-8 text-success" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Warning</p>
                    <p className="text-2xl font-bold text-warning">32</p>
                  </div>
                  <Battery className="h-8 w-8 text-warning" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Offline</p>
                    <p className="text-2xl font-bold text-destructive">13</p>
                  </div>
                  <Thermometer className="h-8 w-8 text-destructive" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">Tower List</CardTitle>
              <CardDescription>All registered base stations in the network</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by Tower ID or name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 bg-secondary"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-40 bg-secondary">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={regionFilter} onValueChange={setRegionFilter}>
                  <SelectTrigger className="w-full sm:w-40 bg-secondary">
                    <MapPin className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    {regions.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-lg border border-border">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                      <TableHead className="text-muted-foreground">Tower ID</TableHead>
                      <TableHead className="text-muted-foreground">Name</TableHead>
                      <TableHead className="text-muted-foreground">Region</TableHead>
                      <TableHead className="text-muted-foreground">Technology</TableHead>
                      <TableHead className="text-muted-foreground">PRB Usage</TableHead>
                      <TableHead className="text-muted-foreground">Users</TableHead>
                      <TableHead className="text-muted-foreground">Throughput</TableHead>
                      <TableHead className="text-muted-foreground">Power</TableHead>
                      <TableHead className="text-muted-foreground">Status</TableHead>
                      <TableHead className="text-muted-foreground w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTowers.map((tower) => (
                      <TableRow key={tower.id} className="border-border">
                        <TableCell className="font-medium text-foreground">
                          {tower.id}
                        </TableCell>
                        <TableCell className="text-foreground">{tower.name}</TableCell>
                        <TableCell className="text-muted-foreground">{tower.region}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {tower.technology}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={tower.prb}
                              className={cn(
                                "h-2 w-16",
                                tower.prb > 90 && "[&>div]:bg-destructive",
                                tower.prb > 80 && tower.prb <= 90 && "[&>div]:bg-warning"
                              )}
                            />
                            <span className="text-sm text-foreground">{tower.prb}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-foreground">
                          {tower.users.toLocaleString("en-US")}
                        </TableCell>
                        <TableCell className="text-foreground">{tower.throughput}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Battery
                              className={cn(
                                "h-4 w-4",
                                tower.power > 80
                                  ? "text-success"
                                  : tower.power > 50
                                  ? "text-warning"
                                  : "text-destructive"
                              )}
                            />
                            <span className="text-sm text-foreground">{tower.power}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={cn(
                              statusConfig[tower.status as keyof typeof statusConfig].color,
                              "text-foreground"
                            )}
                          >
                            {statusConfig[tower.status as keyof typeof statusConfig].label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>View on Map</DropdownMenuItem>
                              <DropdownMenuItem>Run Diagnostics</DropdownMenuItem>
                              <DropdownMenuItem>View Logs</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
