"use client"

import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"
import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { subscribers, slugToMsisdn, type Subscriber } from "@/lib/subscribers-mock"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

const VALID_TABS = ["profile", "cdrs", "location"] as const

const statusConfig: Record<string, { color: string; label: string }> = {
  active: { color: "bg-success", label: "Active" },
  inactive: { color: "bg-muted-foreground", label: "Inactive" },
  roaming: { color: "bg-info", label: "Roaming" },
  suspended: { color: "bg-destructive", label: "Suspended" },
}

const mockCdrs = [
  { time: "2025-03-13 14:30", type: "Data", duration: "—", volume: "1.2 GB" },
  { time: "2025-03-13 14:15", type: "Voice", duration: "3:42", volume: "—" },
  { time: "2025-03-13 13:58", type: "Data", duration: "—", volume: "450 MB" },
  { time: "2025-03-13 12:20", type: "SMS", duration: "—", volume: "—" },
]

const mockLocations = [
  { time: "2025-03-13 14:32", lat: 6.4541, lng: 3.3947, tower: "NG-LAG-001" },
  { time: "2025-03-13 14:00", lat: 6.4281, lng: 3.4219, tower: "NG-LAG-002" },
  { time: "2025-03-13 13:30", lat: 6.4541, lng: 3.3947, tower: "NG-LAG-001" },
]

export default function SubscriberDetailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const slug = typeof params.msisdn === "string" ? params.msisdn : ""
  const msisdn = slugToMsisdn(slug)
  const tabParam = searchParams.get("tab")
  const defaultTab = tabParam && VALID_TABS.includes(tabParam as (typeof VALID_TABS)[number]) ? tabParam : "profile"

  const subscriber = subscribers.find((s) => s.msisdn === msisdn) as Subscriber | undefined

  if (!subscriber) {
    return (
      <>
        <Header title="Subscriber not found" />
        <div className="flex-1 overflow-auto p-6">
          <p className="text-muted-foreground">No subscriber found for: {msisdn}</p>
          <Button variant="outline" className="mt-4" asChild>
            <Link href="/subscribers">Back to Subscribers</Link>
          </Button>
        </div>
      </>
    )
  }

  const config = statusConfig[subscriber.status] ?? statusConfig.active

  return (
    <>
      <Header title={subscriber.msisdn} subtitle="Subscriber details" />
      <div className="flex-1 overflow-auto p-6">
        <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/subscribers" className="hover:text-foreground">Subscribers</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-mono">{subscriber.msisdn}</span>
        </div>

        <Tabs defaultValue={defaultTab} className="space-y-6">
          <TabsList className="bg-secondary">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="cdrs">CDRs</TabsTrigger>
            <TabsTrigger value="location">Location History</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Profile</CardTitle>
                <CardDescription>Account and network info</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4">
                  <span className="text-muted-foreground">Status</span>
                  <Badge className={cn(config.color, "text-foreground")}>{config.label}</Badge>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-border bg-secondary/30 p-4">
                    <p className="text-xs text-muted-foreground">IMSI</p>
                    <p className="font-mono text-sm text-foreground">{subscriber.imsi}</p>
                  </div>
                  <div className="rounded-lg border border-border bg-secondary/30 p-4">
                    <p className="text-xs text-muted-foreground">IMEI</p>
                    <p className="font-mono text-sm text-foreground">{subscriber.imei}</p>
                  </div>
                  <div className="rounded-lg border border-border bg-secondary/30 p-4">
                    <p className="text-xs text-muted-foreground">Plan</p>
                    <p className="font-medium text-foreground">{subscriber.plan}</p>
                  </div>
                  <div className="rounded-lg border border-border bg-secondary/30 p-4">
                    <p className="text-xs text-muted-foreground">Technology</p>
                    <p className="font-medium text-foreground">{subscriber.technology}</p>
                  </div>
                  <div className="rounded-lg border border-border bg-secondary/30 p-4">
                    <p className="text-xs text-muted-foreground">Current tower</p>
                    <p className="font-medium text-foreground">{subscriber.tower}</p>
                  </div>
                  <div className="rounded-lg border border-border bg-secondary/30 p-4">
                    <p className="text-xs text-muted-foreground">Data used</p>
                    <p className="font-medium text-foreground">{subscriber.dataUsed}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Last seen: {subscriber.lastSeen}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cdrs">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Call detail records</CardTitle>
                <CardDescription>Recent session and usage records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-border">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border hover:bg-transparent">
                        <TableHead className="text-muted-foreground">Time</TableHead>
                        <TableHead className="text-muted-foreground">Type</TableHead>
                        <TableHead className="text-muted-foreground">Duration</TableHead>
                        <TableHead className="text-muted-foreground">Volume</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockCdrs.map((row, i) => (
                        <TableRow key={i} className="border-border">
                          <TableCell className="text-foreground">{row.time}</TableCell>
                          <TableCell className="text-foreground">{row.type}</TableCell>
                          <TableCell className="text-muted-foreground">{row.duration}</TableCell>
                          <TableCell className="text-muted-foreground">{row.volume}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="location">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Location history</CardTitle>
                <CardDescription>Recent tower attachments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-border">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border hover:bg-transparent">
                        <TableHead className="text-muted-foreground">Time</TableHead>
                        <TableHead className="text-muted-foreground">Tower</TableHead>
                        <TableHead className="text-muted-foreground">Lat</TableHead>
                        <TableHead className="text-muted-foreground">Lng</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockLocations.map((row, i) => (
                        <TableRow key={i} className="border-border">
                          <TableCell className="text-foreground">{row.time}</TableCell>
                          <TableCell className="text-foreground">{row.tower}</TableCell>
                          <TableCell className="font-mono text-sm text-muted-foreground">{row.lat}</TableCell>
                          <TableCell className="font-mono text-sm text-muted-foreground">{row.lng}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
