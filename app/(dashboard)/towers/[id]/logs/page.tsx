"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { towers } from "@/lib/towers-mock"
import { ChevronRight } from "lucide-react"

const mockLogs = [
  { time: "2025-03-13 14:32:01", level: "INFO", message: "Heartbeat OK" },
  { time: "2025-03-13 14:31:31", level: "INFO", message: "Heartbeat OK" },
  { time: "2025-03-13 14:30:58", level: "WARN", message: "PRB usage above 85%" },
  { time: "2025-03-13 14:30:01", level: "INFO", message: "Heartbeat OK" },
  { time: "2025-03-13 14:29:31", level: "INFO", message: "Heartbeat OK" },
  { time: "2025-03-13 14:28:02", level: "INFO", message: "Config sync completed" },
  { time: "2025-03-13 14:27:01", level: "INFO", message: "Heartbeat OK" },
  { time: "2025-03-13 14:26:15", level: "INFO", message: "Backhaul link stable" },
]

export default function TowerLogsPage() {
  const params = useParams()
  const id = typeof params.id === "string" ? decodeURIComponent(params.id) : ""
  const tower = towers.find((t) => t.id === id)

  if (!tower) {
    return (
      <>
        <Header title="Tower not found" />
        <div className="flex-1 overflow-auto p-6">
          <p className="text-muted-foreground">No tower found with ID: {id}</p>
          <Button variant="outline" className="mt-4" asChild>
            <Link href="/towers">Back to Towers</Link>
          </Button>
        </div>
      </>
    )
  }

  return (
    <>
      <Header title={`Logs — ${tower.id}`} subtitle={tower.name} />
      <div className="flex-1 overflow-auto p-6">
        <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/towers" className="hover:text-foreground">Towers</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href={`/towers/${encodeURIComponent(tower.id)}`} className="hover:text-foreground">{tower.id}</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Logs</span>
        </div>

        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Recent log entries</CardTitle>
            <CardDescription>System and heartbeat logs for this tower</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground w-40">Time</TableHead>
                    <TableHead className="text-muted-foreground w-24">Level</TableHead>
                    <TableHead className="text-muted-foreground">Message</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockLogs.map((log, i) => (
                    <TableRow key={i} className="border-border">
                      <TableCell className="font-mono text-sm text-muted-foreground">{log.time}</TableCell>
                      <TableCell>
                        <span className={log.level === "WARN" ? "text-warning" : "text-foreground"}>{log.level}</span>
                      </TableCell>
                      <TableCell className="text-foreground">{log.message}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
