"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const trafficData = [
  { time: "00:00", uplink: 120, downlink: 340, voice: 45 },
  { time: "02:00", uplink: 80, downlink: 220, voice: 30 },
  { time: "04:00", uplink: 60, downlink: 180, voice: 20 },
  { time: "06:00", uplink: 150, downlink: 380, voice: 55 },
  { time: "08:00", uplink: 280, downlink: 620, voice: 120 },
  { time: "10:00", uplink: 350, downlink: 780, voice: 140 },
  { time: "12:00", uplink: 420, downlink: 890, voice: 160 },
  { time: "14:00", uplink: 380, downlink: 820, voice: 145 },
  { time: "16:00", uplink: 450, downlink: 920, voice: 170 },
  { time: "18:00", uplink: 520, downlink: 1100, voice: 190 },
  { time: "20:00", uplink: 480, downlink: 980, voice: 165 },
  { time: "22:00", uplink: 320, downlink: 680, voice: 95 },
]

export function TrafficChart() {
  return (
    <Card className="col-span-2 bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Network Traffic</CardTitle>
        <CardDescription>Real-time uplink/downlink throughput (Gbps)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trafficData}>
              <defs>
                <linearGradient id="colorDownlink" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.7 0.15 160)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.7 0.15 160)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorUplink" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.7 0.15 250)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.7 0.15 250)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorVoice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.75 0.15 80)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.75 0.15 80)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0 0)" />
              <XAxis
                dataKey="time"
                stroke="oklch(0.6 0 0)"
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                stroke="oklch(0.6 0 0)"
                fontSize={12}
                tickLine={false}
                tickFormatter={(value) => `${value}`}
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
              <Area
                type="monotone"
                dataKey="downlink"
                name="Downlink"
                stroke="oklch(0.7 0.15 160)"
                fillOpacity={1}
                fill="url(#colorDownlink)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="uplink"
                name="Uplink"
                stroke="oklch(0.7 0.15 250)"
                fillOpacity={1}
                fill="url(#colorUplink)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="voice"
                name="Voice (VoLTE)"
                stroke="oklch(0.75 0.15 80)"
                fillOpacity={1}
                fill="url(#colorVoice)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
