"use client"

import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Line,
  LineChart,
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, CheckCircle, AlertTriangle, Target, Gauge, Timer, Wifi } from "lucide-react"

const kpiData = [
  {
    name: "Call Setup Success Rate",
    value: 99.2,
    target: 99.0,
    trend: "up",
    unit: "%",
    status: "good",
  },
  {
    name: "Call Drop Rate",
    value: 0.8,
    target: 1.0,
    trend: "down",
    unit: "%",
    status: "good",
  },
  {
    name: "Handover Success Rate",
    value: 98.5,
    target: 98.0,
    trend: "up",
    unit: "%",
    status: "good",
  },
  {
    name: "RRC Setup Success Rate",
    value: 99.4,
    target: 99.0,
    trend: "up",
    unit: "%",
    status: "good",
  },
  {
    name: "E-RAB Setup Success Rate",
    value: 98.8,
    target: 99.0,
    trend: "down",
    unit: "%",
    status: "warning",
  },
  {
    name: "Average Latency",
    value: 18.5,
    target: 20.0,
    trend: "down",
    unit: "ms",
    status: "good",
  },
  {
    name: "Avg. DL Throughput",
    value: 85.2,
    target: 80.0,
    trend: "up",
    unit: "Mbps",
    status: "good",
  },
  {
    name: "Avg. UL Throughput",
    value: 32.8,
    target: 30.0,
    trend: "up",
    unit: "Mbps",
    status: "good",
  },
]

const hourlyPerformance = [
  { time: "00:00", callSuccess: 99.5, dropRate: 0.5, latency: 15 },
  { time: "02:00", callSuccess: 99.6, dropRate: 0.4, latency: 14 },
  { time: "04:00", callSuccess: 99.7, dropRate: 0.3, latency: 12 },
  { time: "06:00", callSuccess: 99.4, dropRate: 0.6, latency: 16 },
  { time: "08:00", callSuccess: 99.0, dropRate: 1.0, latency: 22 },
  { time: "10:00", callSuccess: 98.8, dropRate: 1.2, latency: 25 },
  { time: "12:00", callSuccess: 98.6, dropRate: 1.4, latency: 28 },
  { time: "14:00", callSuccess: 98.9, dropRate: 1.1, latency: 24 },
  { time: "16:00", callSuccess: 98.7, dropRate: 1.3, latency: 26 },
  { time: "18:00", callSuccess: 98.5, dropRate: 1.5, latency: 30 },
  { time: "20:00", callSuccess: 99.0, dropRate: 1.0, latency: 22 },
  { time: "22:00", callSuccess: 99.3, dropRate: 0.7, latency: 18 },
]

const regionPerformance = [
  { region: "Lagos", callSuccess: 99.2, handover: 98.8, latency: 16 },
  { region: "Abuja", callSuccess: 99.0, handover: 98.5, latency: 18 },
  { region: "Rivers", callSuccess: 98.8, handover: 98.2, latency: 20 },
  { region: "Kano", callSuccess: 98.5, handover: 97.8, latency: 22 },
  { region: "Oyo", callSuccess: 98.9, handover: 98.4, latency: 19 },
  { region: "Enugu", callSuccess: 99.1, handover: 98.6, latency: 17 },
]

const slaMetrics = [
  { name: "Network Availability", current: 99.95, target: 99.9, status: "met" },
  { name: "Voice Quality (MOS)", current: 4.2, target: 4.0, status: "met" },
  { name: "Data Session Success", current: 98.5, target: 99.0, status: "breach" },
  { name: "SMS Delivery Rate", current: 99.8, target: 99.5, status: "met" },
  { name: "Avg Response Time", current: 18, target: 20, status: "met" },
]

export default function PerformancePage() {
  const [timeRange, setTimeRange] = useState("24h")

  return (
    <>
      <Header title="Network Performance" subtitle="KPIs, SLAs, and quality metrics" />
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-6">
          {/* KPI Summary Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {kpiData.slice(0, 4).map((kpi) => (
              <Card key={kpi.name} className="bg-card">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{kpi.name}</span>
                    {kpi.status === "good" ? (
                      <CheckCircle className="h-4 w-4 text-success" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-warning" />
                    )}
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-foreground">{kpi.value}</span>
                      <span className="text-sm text-muted-foreground">{kpi.unit}</span>
                    </div>
                    <div
                      className={cn(
                        "flex items-center text-xs",
                        kpi.status === "good" ? "text-success" : "text-warning"
                      )}
                    >
                      {kpi.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      <span>Target: {kpi.target}{kpi.unit}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <div className="flex items-center justify-between">
              <TabsList className="bg-secondary">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="kpis">All KPIs</TabsTrigger>
                <TabsTrigger value="sla">SLA Compliance</TabsTrigger>
              </TabsList>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32 bg-secondary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24h</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Call Success & Drop Rate */}
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">Call Performance</CardTitle>
                    <CardDescription>Success rate and drop rate over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={hourlyPerformance}>
                          <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0 0)" />
                          <XAxis dataKey="time" stroke="oklch(0.6 0 0)" fontSize={12} />
                          <YAxis
                            yAxisId="left"
                            stroke="oklch(0.6 0 0)"
                            fontSize={12}
                            domain={[96, 100]}
                          />
                          <YAxis
                            yAxisId="right"
                            orientation="right"
                            stroke="oklch(0.6 0 0)"
                            fontSize={12}
                            domain={[0, 2]}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "oklch(0.12 0 0)",
                              border: "1px solid oklch(0.22 0 0)",
                              borderRadius: "8px",
                              color: "oklch(0.95 0 0)",
                            }}
                          />
                          <Legend />
                          <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="callSuccess"
                            name="Call Success %"
                            stroke="oklch(0.7 0.15 160)"
                            strokeWidth={2}
                            dot={false}
                          />
                          <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="dropRate"
                            name="Drop Rate %"
                            stroke="oklch(0.65 0.2 30)"
                            strokeWidth={2}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Latency */}
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">Network Latency</CardTitle>
                    <CardDescription>End-to-end latency measurements (ms)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={hourlyPerformance}>
                          <defs>
                            <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="oklch(0.7 0.15 250)" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="oklch(0.7 0.15 250)" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0 0)" />
                          <XAxis dataKey="time" stroke="oklch(0.6 0 0)" fontSize={12} />
                          <YAxis stroke="oklch(0.6 0 0)" fontSize={12} unit="ms" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "oklch(0.12 0 0)",
                              border: "1px solid oklch(0.22 0 0)",
                              borderRadius: "8px",
                              color: "oklch(0.95 0 0)",
                            }}
                            formatter={(value: number) => [`${value}ms`, "Latency"]}
                          />
                          <Area
                            type="monotone"
                            dataKey="latency"
                            stroke="oklch(0.7 0.15 250)"
                            fillOpacity={1}
                            fill="url(#colorLatency)"
                            strokeWidth={2}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Regional Performance */}
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Regional Performance Comparison</CardTitle>
                  <CardDescription>Key metrics by region</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={regionPerformance}>
                        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0 0)" />
                        <XAxis dataKey="region" stroke="oklch(0.6 0 0)" fontSize={12} />
                        <YAxis stroke="oklch(0.6 0 0)" fontSize={12} domain={[95, 100]} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "oklch(0.12 0 0)",
                            border: "1px solid oklch(0.22 0 0)",
                            borderRadius: "8px",
                            color: "oklch(0.95 0 0)",
                          }}
                        />
                        <Legend />
                        <Bar
                          dataKey="callSuccess"
                          name="Call Success %"
                          fill="oklch(0.7 0.15 160)"
                          radius={[4, 4, 0, 0]}
                        />
                        <Bar
                          dataKey="handover"
                          name="Handover Success %"
                          fill="oklch(0.7 0.15 250)"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="kpis">
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">All Key Performance Indicators</CardTitle>
                  <CardDescription>Complete list of network KPIs with targets</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {kpiData.map((kpi) => (
                      <div
                        key={kpi.name}
                        className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={cn(
                              "flex h-10 w-10 items-center justify-center rounded-lg",
                              kpi.status === "good" ? "bg-success/20" : "bg-warning/20"
                            )}
                          >
                            {kpi.status === "good" ? (
                              <CheckCircle className="h-5 w-5 text-success" />
                            ) : (
                              <AlertTriangle className="h-5 w-5 text-warning" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{kpi.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Target: {kpi.target}
                              {kpi.unit}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-foreground">
                            {kpi.value}
                            <span className="text-sm text-muted-foreground">{kpi.unit}</span>
                          </p>
                          <div
                            className={cn(
                              "flex items-center justify-end text-xs",
                              kpi.trend === "up" ? "text-success" : "text-destructive"
                            )}
                          >
                            {kpi.trend === "up" ? (
                              <TrendingUp className="h-3 w-3 mr-1" />
                            ) : (
                              <TrendingDown className="h-3 w-3 mr-1" />
                            )}
                            <span>vs target</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sla">
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">SLA Compliance Dashboard</CardTitle>
                  <CardDescription>Service Level Agreement metrics and compliance status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {slaMetrics.map((metric) => (
                      <div key={metric.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground">{metric.name}</span>
                            <Badge
                              className={cn(
                                metric.status === "met" ? "bg-success" : "bg-destructive",
                                "text-foreground"
                              )}
                            >
                              {metric.status === "met" ? "SLA Met" : "SLA Breach"}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-bold text-foreground">{metric.current}</span>
                            <span className="text-sm text-muted-foreground"> / {metric.target}</span>
                          </div>
                        </div>
                        <Progress
                          value={Math.min((metric.current / metric.target) * 100, 100)}
                          className={cn(
                            "h-3",
                            metric.status === "met" ? "[&>div]:bg-success" : "[&>div]:bg-destructive"
                          )}
                        />
                      </div>
                    ))}
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
