"use client"

import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import { Search, MoreHorizontal, Users, Smartphone, Signal, TrendingUp, UserPlus, UserMinus } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const subscribers = [
  {
    msisdn: "+234 801 234 5678",
    imsi: "621301234567890",
    imei: "353456789012345",
    status: "active",
    plan: "Premium",
    technology: "5G",
    tower: "NG-LAG-001",
    dataUsed: "45.2 GB",
    lastSeen: "2 min ago",
  },
  {
    msisdn: "+234 802 345 6789",
    imsi: "621302345678901",
    imei: "353456789012346",
    status: "active",
    plan: "Business",
    technology: "LTE",
    tower: "NG-LAG-002",
    dataUsed: "128.5 GB",
    lastSeen: "Just now",
  },
  {
    msisdn: "+234 803 456 7890",
    imsi: "621303456789012",
    imei: "353456789012347",
    status: "inactive",
    plan: "Basic",
    technology: "3G",
    tower: "NG-ABJ-015",
    dataUsed: "2.1 GB",
    lastSeen: "3 days ago",
  },
  {
    msisdn: "+234 804 567 8901",
    imsi: "621304567890123",
    imei: "353456789012348",
    status: "active",
    plan: "Unlimited",
    technology: "5G",
    tower: "NG-PH-008",
    dataUsed: "312.8 GB",
    lastSeen: "5 min ago",
  },
  {
    msisdn: "+234 805 678 9012",
    imsi: "621305678901234",
    imei: "353456789012349",
    status: "roaming",
    plan: "Premium",
    technology: "LTE",
    tower: "GH-ACC-001",
    dataUsed: "8.9 GB",
    lastSeen: "1 hour ago",
  },
  {
    msisdn: "+234 806 789 0123",
    imsi: "621306789012345",
    imei: "353456789012350",
    status: "suspended",
    plan: "Basic",
    technology: "LTE",
    tower: "NG-KAN-023",
    dataUsed: "0 GB",
    lastSeen: "30 days ago",
  },
]

const planDistribution = [
  { name: "Premium", value: 35, color: "oklch(0.7 0.15 160)" },
  { name: "Business", value: 28, color: "oklch(0.7 0.15 250)" },
  { name: "Unlimited", value: 22, color: "oklch(0.75 0.15 80)" },
  { name: "Basic", value: 15, color: "oklch(0.65 0.2 30)" },
]

const deviceTypes = [
  { name: "iPhone", value: 42 },
  { name: "Samsung", value: 28 },
  { name: "Xiaomi", value: 12 },
  { name: "Tecno", value: 8 },
  { name: "Others", value: 10 },
]

const dailyActivations = [
  { day: "Mon", activations: 2840, deactivations: 420 },
  { day: "Tue", activations: 3120, deactivations: 380 },
  { day: "Wed", activations: 2950, deactivations: 410 },
  { day: "Thu", activations: 3200, deactivations: 350 },
  { day: "Fri", activations: 3580, deactivations: 290 },
  { day: "Sat", activations: 4200, deactivations: 180 },
  { day: "Sun", activations: 3800, deactivations: 220 },
]

const statusConfig = {
  active: { color: "bg-success", label: "Active" },
  inactive: { color: "bg-muted-foreground", label: "Inactive" },
  roaming: { color: "bg-info", label: "Roaming" },
  suspended: { color: "bg-destructive", label: "Suspended" },
}

export default function SubscribersPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredSubscribers = subscribers.filter((sub) => {
    const matchesSearch =
      sub.msisdn.includes(search) ||
      sub.imsi.includes(search) ||
      sub.tower.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || sub.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <>
      <Header title="Subscriber Management" subtitle="Monitor and manage subscriber activity" />
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="bg-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Subscribers</p>
                    <p className="text-2xl font-bold text-foreground">8.4M</p>
                    <p className="text-xs text-success">+2.3% this month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/20">
                    <Signal className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active Now</p>
                    <p className="text-2xl font-bold text-foreground">4.2M</p>
                    <p className="text-xs text-muted-foreground">50% of total</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-2/20">
                    <UserPlus className="h-6 w-6 text-chart-2" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">New Today</p>
                    <p className="text-2xl font-bold text-foreground">3,842</p>
                    <p className="text-xs text-success">+12% vs yesterday</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/20">
                    <TrendingUp className="h-6 w-6 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. ARPU</p>
                    <p className="text-2xl font-bold text-foreground">$12.50</p>
                    <p className="text-xs text-success">+5.2% this month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="list" className="space-y-6">
            <TabsList className="bg-secondary">
              <TabsTrigger value="list">Subscriber List</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="list">
              {/* Subscriber Table */}
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Subscribers</CardTitle>
                  <CardDescription>View and manage individual subscriber accounts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex flex-col gap-4 sm:flex-row">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search by MSISDN, IMSI, or Tower ID..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9 bg-secondary"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full sm:w-40 bg-secondary">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="roaming">Roaming</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="rounded-lg border border-border">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-border hover:bg-transparent">
                          <TableHead className="text-muted-foreground">MSISDN</TableHead>
                          <TableHead className="text-muted-foreground">IMSI</TableHead>
                          <TableHead className="text-muted-foreground">Plan</TableHead>
                          <TableHead className="text-muted-foreground">Technology</TableHead>
                          <TableHead className="text-muted-foreground">Tower</TableHead>
                          <TableHead className="text-muted-foreground">Data Used</TableHead>
                          <TableHead className="text-muted-foreground">Last Seen</TableHead>
                          <TableHead className="text-muted-foreground">Status</TableHead>
                          <TableHead className="text-muted-foreground w-10"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredSubscribers.map((sub) => (
                          <TableRow key={sub.msisdn} className="border-border">
                            <TableCell className="font-medium text-foreground font-mono text-sm">
                              {sub.msisdn}
                            </TableCell>
                            <TableCell className="text-muted-foreground font-mono text-xs">
                              {sub.imsi}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="text-xs">
                                {sub.plan}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-foreground">{sub.technology}</TableCell>
                            <TableCell className="text-foreground">{sub.tower}</TableCell>
                            <TableCell className="text-foreground">{sub.dataUsed}</TableCell>
                            <TableCell className="text-muted-foreground">{sub.lastSeen}</TableCell>
                            <TableCell>
                              <Badge
                                className={cn(
                                  statusConfig[sub.status as keyof typeof statusConfig].color,
                                  "text-foreground"
                                )}
                              >
                                {statusConfig[sub.status as keyof typeof statusConfig].label}
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
                                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                                  <DropdownMenuItem>View CDRs</DropdownMenuItem>
                                  <DropdownMenuItem>View Location History</DropdownMenuItem>
                                  <DropdownMenuItem>Suspend Account</DropdownMenuItem>
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
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Plan Distribution */}
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">Plan Distribution</CardTitle>
                    <CardDescription>Subscribers by plan type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[280px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={planDistribution}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={100}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {planDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "oklch(0.12 0 0)",
                              border: "1px solid oklch(0.22 0 0)",
                              borderRadius: "8px",
                              color: "oklch(0.95 0 0)",
                            }}
                            formatter={(value: number) => [`${value}%`, "Share"]}
                          />
                          <Legend
                            formatter={(value) => (
                              <span style={{ color: "oklch(0.95 0 0)" }}>{value}</span>
                            )}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Device Types */}
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">Device Distribution</CardTitle>
                    <CardDescription>Top device manufacturers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[280px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={deviceTypes} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0 0)" />
                          <XAxis type="number" stroke="oklch(0.6 0 0)" fontSize={12} />
                          <YAxis
                            dataKey="name"
                            type="category"
                            stroke="oklch(0.6 0 0)"
                            fontSize={12}
                            width={60}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "oklch(0.12 0 0)",
                              border: "1px solid oklch(0.22 0 0)",
                              borderRadius: "8px",
                              color: "oklch(0.95 0 0)",
                            }}
                            formatter={(value: number) => [`${value}%`, "Share"]}
                          />
                          <Bar dataKey="value" fill="oklch(0.7 0.15 160)" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Daily Activations */}
                <Card className="bg-card lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-foreground">Daily Activations & Deactivations</CardTitle>
                    <CardDescription>Weekly subscriber movement trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[280px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={dailyActivations}>
                          <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0 0)" />
                          <XAxis dataKey="day" stroke="oklch(0.6 0 0)" fontSize={12} />
                          <YAxis stroke="oklch(0.6 0 0)" fontSize={12} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "oklch(0.12 0 0)",
                              border: "1px solid oklch(0.22 0 0)",
                              borderRadius: "8px",
                              color: "oklch(0.95 0 0)",
                            }}
                          />
                          <Legend
                            formatter={(value) => (
                              <span style={{ color: "oklch(0.95 0 0)" }}>{value}</span>
                            )}
                          />
                          <Bar
                            dataKey="activations"
                            name="Activations"
                            fill="oklch(0.7 0.15 160)"
                            radius={[4, 4, 0, 0]}
                          />
                          <Bar
                            dataKey="deactivations"
                            name="Deactivations"
                            fill="oklch(0.65 0.2 30)"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
