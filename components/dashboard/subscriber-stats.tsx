"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts"

const serviceData = [
  { name: "Data", value: 62, color: "oklch(0.7 0.15 160)" },
  { name: "Voice (VoLTE)", value: 18, color: "oklch(0.7 0.15 250)" },
  { name: "SMS", value: 8, color: "oklch(0.75 0.15 80)" },
  { name: "IoT/M2M", value: 12, color: "oklch(0.65 0.2 30)" },
]

const technologyData = [
  { name: "5G NR", value: 35, color: "oklch(0.7 0.15 160)" },
  { name: "LTE-A", value: 42, color: "oklch(0.7 0.15 250)" },
  { name: "LTE", value: 18, color: "oklch(0.75 0.15 80)" },
  { name: "3G", value: 5, color: "oklch(0.65 0.2 30)" },
]

export function SubscriberStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Traffic by Service</CardTitle>
          <CardDescription>Distribution of network usage by service type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={serviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {serviceData.map((entry, index) => (
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

      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Subscribers by Technology</CardTitle>
          <CardDescription>Connected users across network generations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={technologyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {technologyData.map((entry, index) => (
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
    </div>
  )
}
