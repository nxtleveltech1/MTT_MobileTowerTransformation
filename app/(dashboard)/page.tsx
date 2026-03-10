import { Header } from "@/components/dashboard/header"
import { KpiCards } from "@/components/dashboard/kpi-cards"
import { TrafficChart } from "@/components/dashboard/traffic-chart"
import { TowerStatus } from "@/components/dashboard/tower-status"
import { AlertsPanel } from "@/components/dashboard/alerts-panel"
import { SubscriberStats } from "@/components/dashboard/subscriber-stats"

export default function DashboardPage() {
  return (
    <>
      <Header
        title="Network Overview"
        subtitle="Real-time monitoring and analytics"
      />
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-6">
          <KpiCards />
          
          <div className="grid gap-6 lg:grid-cols-3">
            <TrafficChart />
            <AlertsPanel />
          </div>

          <TowerStatus />

          <SubscriberStats />
        </div>
      </div>
    </>
  )
}
