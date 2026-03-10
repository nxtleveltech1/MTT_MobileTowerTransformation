import { Signal } from "lucide-react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="mb-8 flex items-center gap-2">
        <Signal className="h-8 w-8 text-primary" />
        <span className="text-xl font-semibold text-foreground">CellTower Monitor</span>
      </div>
      {children}
    </div>
  )
}
