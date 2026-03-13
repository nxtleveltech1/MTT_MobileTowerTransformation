"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { User, Bell, Shield, Database, Globe, Key } from "lucide-react"

const VALID_TABS = ["profile", "notifications", "security", "system"] as const

function SettingsContent() {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")
  const defaultTab = tabParam && VALID_TABS.includes(tabParam as (typeof VALID_TABS)[number]) ? tabParam : "profile"

  return (
    <>
      <Header title="Settings" subtitle="Configure your NOC dashboard preferences" />
      <div className="flex-1 overflow-auto p-6">
        <Tabs defaultValue={defaultTab} className="space-y-6">
          <TabsList className="bg-secondary">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="bg-card">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  <CardTitle className="text-foreground">Profile Settings</CardTitle>
                </div>
                <CardDescription>Manage your account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="John Operator" className="bg-secondary" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john@noc.example.com" className="bg-secondary" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select defaultValue="operator">
                      <SelectTrigger className="bg-secondary">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="operator">NOC Operator</SelectItem>
                        <SelectItem value="engineer">Network Engineer</SelectItem>
                        <SelectItem value="manager">NOC Manager</SelectItem>
                        <SelectItem value="admin">Administrator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="region">Primary Region</Label>
                    <Select defaultValue="lagos">
                      <SelectTrigger className="bg-secondary">
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
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="bg-card">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  <CardTitle className="text-foreground">Notification Preferences</CardTitle>
                </div>
                <CardDescription>Configure how you receive alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4">
                    <div>
                      <p className="font-medium text-foreground">Critical Alerts</p>
                      <p className="text-sm text-muted-foreground">Receive immediate notifications for critical issues</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4">
                    <div>
                      <p className="font-medium text-foreground">Warning Alerts</p>
                      <p className="text-sm text-muted-foreground">Get notified about warning-level events</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4">
                    <div>
                      <p className="font-medium text-foreground">Info Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive informational updates</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4">
                    <div>
                      <p className="font-medium text-foreground">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Send alert summaries to your email</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4">
                    <div>
                      <p className="font-medium text-foreground">SMS Alerts</p>
                      <p className="text-sm text-muted-foreground">Receive SMS for critical alerts</p>
                    </div>
                    <Switch />
                  </div>
                </div>
                <Button>Save Preferences</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="bg-card">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <CardTitle className="text-foreground">Security Settings</CardTitle>
                </div>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" className="bg-secondary" />
                  </div>
                  <div />
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" className="bg-secondary" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" className="bg-secondary" />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4">
                    <div>
                      <p className="font-medium text-foreground">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4">
                    <div>
                      <p className="font-medium text-foreground">Session Timeout</p>
                      <p className="text-sm text-muted-foreground">Automatically log out after inactivity</p>
                    </div>
                    <Select defaultValue="30">
                      <SelectTrigger className="w-32 bg-secondary">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button>Update Security</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system">
            <div className="space-y-6">
              <Card className="bg-card">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    <CardTitle className="text-foreground">Display Settings</CardTitle>
                  </div>
                  <CardDescription>Customize your dashboard appearance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Timezone</Label>
                      <Select defaultValue="wat">
                        <SelectTrigger className="bg-secondary">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="wat">West Africa Time (WAT)</SelectItem>
                          <SelectItem value="utc">UTC</SelectItem>
                          <SelectItem value="gmt">GMT</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Date Format</Label>
                      <Select defaultValue="dmy">
                        <SelectTrigger className="bg-secondary">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                          <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                          <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Refresh Rate</Label>
                      <Select defaultValue="5">
                        <SelectTrigger className="bg-secondary">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 seconds</SelectItem>
                          <SelectItem value="10">10 seconds</SelectItem>
                          <SelectItem value="30">30 seconds</SelectItem>
                          <SelectItem value="60">1 minute</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Default Map View</Label>
                      <Select defaultValue="towers">
                        <SelectTrigger className="bg-secondary">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="towers">Tower Locations</SelectItem>
                          <SelectItem value="heatmap">Traffic Heatmap</SelectItem>
                          <SelectItem value="signal">Signal Coverage</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button>Save Display Settings</Button>
                </CardContent>
              </Card>

              <Card className="bg-card">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    <CardTitle className="text-foreground">Data & Export</CardTitle>
                  </div>
                  <CardDescription>Manage data export and retention settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4">
                    <div>
                      <p className="font-medium text-foreground">Export Dashboard Data</p>
                      <p className="text-sm text-muted-foreground">Download current dashboard data as CSV</p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => {
                        const headers = ["Metric", "Value"]
                        const rows = [
                          ["Total Towers", "2,892"],
                          ["Online", "2,847"],
                          ["Coverage", "92.4%"],
                          ["Exported", new Date().toISOString().slice(0, 10)],
                        ]
                        const csv = [headers, ...rows].map((r) => r.join(",")).join("\n")
                        const blob = new Blob([csv], { type: "text/csv" })
                        const url = URL.createObjectURL(blob)
                        const a = document.createElement("a")
                        a.href = url
                        a.download = `mtt-export-${new Date().toISOString().slice(0, 10)}.csv`
                        a.click()
                        URL.revokeObjectURL(url)
                        toast.success("CSV exported")
                      }}
                    >
                      Export CSV
                    </Button>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4">
                    <div>
                      <p className="font-medium text-foreground">Generate Report</p>
                      <p className="text-sm text-muted-foreground">Create a PDF report of network performance</p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => toast.success("Report generated", { description: "PDF download started." })}
                    >
                      Generate PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Key className="h-5 w-5 text-primary" />
                    <CardTitle className="text-foreground">API Access</CardTitle>
                  </div>
                  <CardDescription>Manage API keys for external integrations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4">
                    <div>
                      <p className="font-medium text-foreground">API Key</p>
                      <p className="font-mono text-sm text-muted-foreground">sk_live_••••••••••••••••</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          void navigator.clipboard.writeText("sk_live_xxxxxxxxxxxxxxxx").then(() => toast.success("API key copied"))
                        }}
                      >
                        Copy
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toast.success("API key regenerated", { description: "Use the new key in your integrations." })}
                      >
                        Regenerate
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<div className="flex-1 overflow-auto p-6"><span className="text-muted-foreground">Loading…</span></div>}>
      <SettingsContent />
    </Suspense>
  );
}
