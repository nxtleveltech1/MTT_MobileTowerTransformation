"use client"

import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle,
  Search,
  Bell,
  BellOff,
  Clock,
  MapPin,
  Zap,
  Server,
  Radio,
  Thermometer,
} from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const alerts = [
  {
    id: 1,
    severity: "critical",
    title: "Tower Offline",
    message: "Tower NG-LAG-042 has stopped sending heartbeats. Last communication 15 minutes ago.",
    tower: "NG-LAG-042",
    category: "Equipment",
    time: "2 min ago",
    status: "open",
  },
  {
    id: 2,
    severity: "critical",
    title: "Power Failure",
    message: "Primary power supply failed at site NG-KAN-023. Running on battery backup.",
    tower: "NG-KAN-023",
    category: "Power",
    time: "5 min ago",
    status: "open",
  },
  {
    id: 3,
    severity: "critical",
    title: "Backhaul Link Down",
    message: "S1 interface connection lost to core network from NG-PH-015.",
    tower: "NG-PH-015",
    category: "Transport",
    time: "8 min ago",
    status: "acknowledged",
  },
  {
    id: 4,
    severity: "warning",
    title: "High PRB Utilization",
    message: "Physical Resource Block usage at 95% capacity. Performance degradation expected.",
    tower: "NG-ABJ-015",
    category: "Capacity",
    time: "15 min ago",
    status: "open",
  },
  {
    id: 5,
    severity: "warning",
    title: "Elevated Temperature",
    message: "Equipment cabinet temperature reached 52°C, above normal threshold of 45°C.",
    tower: "NG-LAG-089",
    category: "Environment",
    time: "23 min ago",
    status: "acknowledged",
  },
  {
    id: 6,
    severity: "warning",
    title: "High Packet Loss",
    message: "Backhaul link experiencing 3.2% packet loss, exceeding 1% threshold.",
    tower: "NG-IBD-012",
    category: "Transport",
    time: "45 min ago",
    status: "open",
  },
  {
    id: 7,
    severity: "info",
    title: "Maintenance Window Started",
    message: "Scheduled maintenance window has begun for sector upgrade.",
    tower: "NG-PH-001",
    category: "Maintenance",
    time: "1 hour ago",
    status: "open",
  },
  {
    id: 8,
    severity: "info",
    title: "Software Update Available",
    message: "New firmware version 4.2.1 available for eNodeB equipment.",
    tower: "Network-wide",
    category: "Software",
    time: "2 hours ago",
    status: "open",
  },
  {
    id: 9,
    severity: "resolved",
    title: "RRC Connection Failures",
    message: "High RRC connection failure rate normalized after parameter adjustment.",
    tower: "NG-LAG-001",
    category: "Radio",
    time: "3 hours ago",
    status: "resolved",
  },
  {
    id: 10,
    severity: "resolved",
    title: "Generator Fuel Low",
    message: "Fuel tank refilled. Generator fuel level restored to 95%.",
    tower: "NG-ENU-005",
    category: "Power",
    time: "5 hours ago",
    status: "resolved",
  },
]

const severityConfig = {
  critical: {
    icon: AlertTriangle,
    color: "text-destructive",
    bg: "bg-destructive/10",
    badge: "bg-destructive",
    border: "border-destructive/50",
  },
  warning: {
    icon: AlertCircle,
    color: "text-warning",
    bg: "bg-warning/10",
    badge: "bg-warning",
    border: "border-warning/50",
  },
  info: {
    icon: Info,
    color: "text-info",
    bg: "bg-info/10",
    badge: "bg-info",
    border: "border-info/50",
  },
  resolved: {
    icon: CheckCircle,
    color: "text-success",
    bg: "bg-success/10",
    badge: "bg-success",
    border: "border-success/50",
  },
}

const categoryIcons = {
  Equipment: Server,
  Power: Zap,
  Transport: Radio,
  Capacity: AlertCircle,
  Environment: Thermometer,
  Maintenance: Clock,
  Software: Info,
  Radio: Radio,
}

const alertRules = [
  { id: 1, name: "Tower Offline Alert", category: "Equipment", threshold: "No heartbeat > 5 min", enabled: true },
  { id: 2, name: "PRB High Utilization", category: "Capacity", threshold: "> 90%", enabled: true },
  { id: 3, name: "Temperature Warning", category: "Environment", threshold: "> 45°C", enabled: true },
  { id: 4, name: "Packet Loss Alert", category: "Transport", threshold: "> 1%", enabled: true },
  { id: 5, name: "Low Battery Alert", category: "Power", threshold: "< 20%", enabled: true },
  { id: 6, name: "Low Fuel Alert", category: "Power", threshold: "< 25%", enabled: false },
  { id: 7, name: "High Handover Failure", category: "Radio", threshold: "> 5%", enabled: true },
]

export default function AlertsPage() {
  const [search, setSearch] = useState("")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [rules, setRules] = useState(alertRules)

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      alert.title.toLowerCase().includes(search.toLowerCase()) ||
      alert.tower.toLowerCase().includes(search.toLowerCase())
    const matchesSeverity = severityFilter === "all" || alert.severity === severityFilter
    const matchesCategory = categoryFilter === "all" || alert.category === categoryFilter
    return matchesSearch && matchesSeverity && matchesCategory
  })

  const toggleRule = (id: number) => {
    setRules(rules.map((rule) => (rule.id === id ? { ...rule, enabled: !rule.enabled } : rule)))
  }

  const criticalCount = alerts.filter((a) => a.severity === "critical" && a.status !== "resolved").length
  const warningCount = alerts.filter((a) => a.severity === "warning" && a.status !== "resolved").length
  const infoCount = alerts.filter((a) => a.severity === "info" && a.status !== "resolved").length

  return (
    <>
      <Header title="Alerts & Notifications" subtitle="Network alerts and monitoring rules" />
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-6">
          {/* Alert Summary */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="bg-card border-l-4 border-l-destructive">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Critical</p>
                    <p className="text-3xl font-bold text-destructive">{criticalCount}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-destructive" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-l-4 border-l-warning">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Warning</p>
                    <p className="text-3xl font-bold text-warning">{warningCount}</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-warning" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-l-4 border-l-info">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Info</p>
                    <p className="text-3xl font-bold text-info">{infoCount}</p>
                  </div>
                  <Info className="h-8 w-8 text-info" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-l-4 border-l-success">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Resolved Today</p>
                    <p className="text-3xl font-bold text-success">
                      {alerts.filter((a) => a.status === "resolved").length}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-success" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="alerts" className="space-y-6">
            <TabsList className="bg-secondary">
              <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
              <TabsTrigger value="rules">Alert Rules</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="alerts">
              <Card className="bg-card">
                <CardHeader>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <CardTitle className="text-foreground">Active Alerts</CardTitle>
                      <CardDescription>Real-time network alerts requiring attention</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Bell className="mr-2 h-4 w-4" />
                        Acknowledge All
                      </Button>
                      <Button variant="outline" size="sm">
                        <BellOff className="mr-2 h-4 w-4" />
                        Mute 1 Hour
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex flex-col gap-4 sm:flex-row">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search alerts..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9 bg-secondary"
                      />
                    </div>
                    <Select value={severityFilter} onValueChange={setSeverityFilter}>
                      <SelectTrigger className="w-full sm:w-36 bg-secondary">
                        <SelectValue placeholder="Severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Severity</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="info">Info</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-full sm:w-36 bg-secondary">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="Equipment">Equipment</SelectItem>
                        <SelectItem value="Power">Power</SelectItem>
                        <SelectItem value="Transport">Transport</SelectItem>
                        <SelectItem value="Capacity">Capacity</SelectItem>
                        <SelectItem value="Environment">Environment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    {filteredAlerts.map((alert) => {
                      const config = severityConfig[alert.severity as keyof typeof severityConfig]
                      const Icon = config.icon
                      const CategoryIcon =
                        categoryIcons[alert.category as keyof typeof categoryIcons] || Info

                      return (
                        <div
                          key={alert.id}
                          className={cn(
                            "flex items-start gap-4 rounded-lg border p-4 transition-all hover:bg-secondary/50",
                            config.bg,
                            config.border
                          )}
                        >
                          <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", config.color)} />
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-foreground">{alert.title}</span>
                              {alert.status === "acknowledged" && (
                                <Badge variant="outline" className="text-xs">
                                  Acknowledged
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{alert.message}</p>
                            <div className="flex items-center gap-4 pt-1 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {alert.tower}
                              </span>
                              <span className="flex items-center gap-1">
                                <CategoryIcon className="h-3 w-3" />
                                {alert.category}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {alert.time}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {alert.status !== "resolved" && (
                              <>
                                <Button variant="outline" size="sm">
                                  Acknowledge
                                </Button>
                                <Button variant="default" size="sm">
                                  Resolve
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rules">
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Alert Rules</CardTitle>
                  <CardDescription>Configure thresholds and notification rules</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {rules.map((rule) => {
                      const CategoryIcon =
                        categoryIcons[rule.category as keyof typeof categoryIcons] || Info
                      return (
                        <div
                          key={rule.id}
                          className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                              <CategoryIcon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{rule.name}</p>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>{rule.category}</span>
                                <span>•</span>
                                <span>Threshold: {rule.threshold}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Switch
                                id={`rule-${rule.id}`}
                                checked={rule.enabled}
                                onCheckedChange={() => toggleRule(rule.id)}
                              />
                              <Label htmlFor={`rule-${rule.id}`} className="text-sm text-muted-foreground">
                                {rule.enabled ? "Enabled" : "Disabled"}
                              </Label>
                            </div>
                            <Button variant="outline" size="sm">
                              Configure
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Alert History</CardTitle>
                  <CardDescription>Past alerts and resolution timeline</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {alerts
                      .filter((a) => a.status === "resolved")
                      .map((alert) => {
                        const config = severityConfig.resolved
                        const Icon = config.icon
                        return (
                          <div
                            key={alert.id}
                            className={cn(
                              "flex items-start gap-4 rounded-lg border p-4",
                              config.bg,
                              config.border
                            )}
                          >
                            <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", config.color)} />
                            <div className="flex-1 space-y-1">
                              <span className="font-medium text-foreground">{alert.title}</span>
                              <p className="text-sm text-muted-foreground">{alert.message}</p>
                              <div className="flex items-center gap-4 pt-1 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {alert.tower}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  Resolved {alert.time}
                                </span>
                              </div>
                            </div>
                            <Badge className="bg-success text-foreground">Resolved</Badge>
                          </div>
                        )
                      })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
