"use client"

import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { useState } from "react"
import { ArrowUpRight, ArrowDownRight, Activity, Phone, MessageSquare, Cpu } from "lucide-react"

const hourlyData = [
  { time: "00:00", data: 120, voice: 45, sms: 12, iot: 8 },
  { time: "01:00", data: 95, voice: 35, sms: 8, iot: 7 },
  { time: "02:00", data: 80, voice: 28, sms: 5, iot: 6 },
  { time: "03:00", data: 60, voice: 20, sms: 3, iot: 5 },
  { time: "04:00", data: 55, voice: 18, sms: 4, iot: 5 },
  { time: "05:00", data: 75, voice: 25, sms: 8, iot: 6 },
  { time: "06:00", data: 150, voice: 55, sms: 15, iot: 10 },
  { time: "07:00", data: 280, voice: 120, sms: 35, iot: 18 },
  { time: "08:00", data: 420, voice: 180, sms: 52, iot: 25 },
  { time: "09:00", data: 520, voice: 220, sms: 65, iot: 32 },
  { time: "10:00", data: 580, voice: 245, sms: 72, iot: 38 },
  { time: "11:00", data: 620, voice: 260, sms: 78, iot: 42 },
  { time: "12:00", data: 680, voice: 280, sms: 85, iot: 45 },
  { time: "13:00", data: 650, voice: 265, sms: 80, iot: 43 },
  { time: "14:00", data: 590, voice: 250, sms: 75, iot: 40 },
  { time: "15:00", data: 610, voice: 255, sms: 77, iot: 41 },
  { time: "16:00", data: 680, voice: 285, sms: 88, iot: 46 },
  { time: "17:00", data: 750, voice: 320, sms: 95, iot: 52 },
  { time: "18:00", data: 820, voice: 350, sms: 105, iot: 58 },
  { time: "19:00", data: 780, voice: 330, sms: 98, iot: 55 },
  { time: "20:00", data: 680, voice: 290, sms: 85, iot: 48 },
  { time: "21:00", data: 520, voice: 220, sms: 65, iot: 38 },
  { time: "22:00", data: 350, voice: 150, sms: 42, iot: 25 },
  { time: "23:00", data: 220, voice: 85, sms: 25, iot: 15 },
]

const weeklyData = [
  { day: "Mon", data: 12500, voice: 4800, sms: 1200, iot: 850 },
  { day: "Tue", data: 13200, voice: 5100, sms: 1350, iot: 920 },
  { day: "Wed", data: 14100, voice: 5400, sms: 1420, iot: 980 },
  { day: "Thu", data: 13800, voice: 5200, sms: 1380, iot: 950 },
  { day: "Fri", data: 15200, voice: 5800, sms: 1520, iot: 1050 },
  { day: "Sat", data: 16800, voice: 4200, sms: 1680, iot: 1150 },
  { day: "Sun", data: 15500, voice: 3800, sms: 1550, iot: 1080 },
]

const regionData = [
  { region: "Lagos", traffic: 28500 },
  { region: "Abuja", traffic: 18200 },
  { region: "Rivers", traffic: 12800 },
  { region: "Kano", traffic: 11500 },
  { region: "Oyo", traffic: 9800 },
  { region: "Enugu", traffic: 7500 },
  { region: "Delta", traffic: 6200 },
  { region: "Kaduna", traffic: 5800 },
]

const latencyData = [
  { time: "00:00", p50: 12, p95: 35, p99: 85 },
  { time: "04:00", p50: 10, p95: 28, p99: 65 },
  { time: "08:00", p50: 18, p95: 52, p99: 120 },
  { time: "12:00", p50: 22, p95: 65, p99: 145 },
  { time: "16:00", p50: 25, p95: 72, p99: 165 },
  { time: "20:00", p50: 20, p95: 58, p99: 130 },
]

export default function TrafficPage() {
  const [timeRange, setTimeRange] = useState("24h")

  return (
    <>
      <Header title="Traffic Analytics" subtitle="Network traffic patterns and analysis" />
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-6">
          {/* Traffic Type Summary */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="bg-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-1/20">
                    <Activity className="h-6 w-6 text-chart-1" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Data Traffic</p>
                    <p className="text-2xl font-bold text-foreground">847 Gbps</p>
                    <div className="flex items-center text-xs text-success">
                      <ArrowUpRight className="h-3 w-3" />
                      <span>+5.8% vs yesterday</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-2/20">
                    <Phone className="h-6 w-6 text-chart-2" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Voice (VoLTE)</p>
                    <p className="text-2xl font-bold text-foreground">285K calls</p>
                    <div className="flex items-center text-xs text-success">
                      <ArrowUpRight className="h-3 w-3" />
                      <span>+2.3% vs yesterday</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-3/20">
                    <MessageSquare className="h-6 w-6 text-chart-3" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">SMS Messages</p>
                    <p className="text-2xl font-bold text-foreground">4.2M</p>
                    <div className="flex items-center text-xs text-destructive">
                      <ArrowDownRight className="h-3 w-3" />
                      <span>-1.2% vs yesterday</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-4/20">
                    <Cpu className="h-6 w-6 text-chart-4" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">IoT/M2M</p>
                    <p className="text-2xl font-bold text-foreground">1.8M devices</p>
                    <div className="flex items-center text-xs text-success">
                      <ArrowUpRight className="h-3 w-3" />
                      <span>+8.5% vs yesterday</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Traffic Chart */}
          <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-foreground">Traffic by Service Type</CardTitle>
                <CardDescription>Breakdown of network usage over time</CardDescription>
              </div>
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
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="stacked" className="space-y-4">
                <TabsList className="bg-secondary">
                  <TabsTrigger value="stacked">Stacked</TabsTrigger>
                  <TabsTrigger value="line">Line</TabsTrigger>
                </TabsList>
                <TabsContent value="stacked">
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={timeRange === "24h" ? hourlyData : weeklyData}>
                        <defs>
                          <linearGradient id="colorData" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="oklch(0.7 0.15 160)" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="oklch(0.7 0.15 160)" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorVoice" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="oklch(0.7 0.15 250)" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="oklch(0.7 0.15 250)" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorSms" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="oklch(0.75 0.15 80)" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="oklch(0.75 0.15 80)" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorIot" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="oklch(0.65 0.2 30)" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="oklch(0.65 0.2 30)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0 0)" />
                        <XAxis
                          dataKey={timeRange === "24h" ? "time" : "day"}
                          stroke="oklch(0.6 0 0)"
                          fontSize={12}
                        />
                        <YAxis stroke="oklch(0.6 0 0)" fontSize={12} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "oklch(0.12 0 0)",
                            border: "1px solid oklch(0.22 0 0)",
                            borderRadius: "8px",
                            color: "oklch(0.95 0 0)",
                          }}
                        />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="data"
                          name="Data"
                          stackId="1"
                          stroke="oklch(0.7 0.15 160)"
                          fill="url(#colorData)"
                          strokeWidth={2}
                        />
                        <Area
                          type="monotone"
                          dataKey="voice"
                          name="Voice"
                          stackId="1"
                          stroke="oklch(0.7 0.15 250)"
                          fill="url(#colorVoice)"
                          strokeWidth={2}
                        />
                        <Area
                          type="monotone"
                          dataKey="sms"
                          name="SMS"
                          stackId="1"
                          stroke="oklch(0.75 0.15 80)"
                          fill="url(#colorSms)"
                          strokeWidth={2}
                        />
                        <Area
                          type="monotone"
                          dataKey="iot"
                          name="IoT"
                          stackId="1"
                          stroke="oklch(0.65 0.2 30)"
                          fill="url(#colorIot)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                <TabsContent value="line">
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={timeRange === "24h" ? hourlyData : weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0 0)" />
                        <XAxis
                          dataKey={timeRange === "24h" ? "time" : "day"}
                          stroke="oklch(0.6 0 0)"
                          fontSize={12}
                        />
                        <YAxis stroke="oklch(0.6 0 0)" fontSize={12} />
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
                          type="monotone"
                          dataKey="data"
                          name="Data"
                          stroke="oklch(0.7 0.15 160)"
                          strokeWidth={2}
                          dot={false}
                        />
                        <Line
                          type="monotone"
                          dataKey="voice"
                          name="Voice"
                          stroke="oklch(0.7 0.15 250)"
                          strokeWidth={2}
                          dot={false}
                        />
                        <Line
                          type="monotone"
                          dataKey="sms"
                          name="SMS"
                          stroke="oklch(0.75 0.15 80)"
                          strokeWidth={2}
                          dot={false}
                        />
                        <Line
                          type="monotone"
                          dataKey="iot"
                          name="IoT"
                          stroke="oklch(0.65 0.2 30)"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Regional Traffic */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Traffic by Region</CardTitle>
                <CardDescription>Network usage distribution across regions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={regionData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0 0)" />
                      <XAxis type="number" stroke="oklch(0.6 0 0)" fontSize={12} />
                      <YAxis
                        dataKey="region"
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
                        formatter={(value: number) => [`${value.toLocaleString("en-US")} Gbps`, "Traffic"]}
                      />
                      <Bar dataKey="traffic" fill="oklch(0.7 0.15 160)" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Latency Distribution */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Latency Percentiles</CardTitle>
                <CardDescription>Network latency distribution (P50, P95, P99)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={latencyData}>
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
                        formatter={(value: number) => [`${value}ms`, ""]}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="p50"
                        name="P50"
                        stroke="oklch(0.7 0.15 160)"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="p95"
                        name="P95"
                        stroke="oklch(0.75 0.15 80)"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="p99"
                        name="P99"
                        stroke="oklch(0.65 0.2 30)"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
