"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import { cn } from "@/lib/utils"
import "leaflet/dist/leaflet.css"

const SOUTH_AFRICA_CENTER: [number, number] = [-29.0, 24.0]
const DEFAULT_ZOOM = 5

const statusColors = {
  online: "hsl(var(--success))",
  warning: "hsl(var(--warning))",
  offline: "hsl(var(--destructive))",
}

function createStatusIcon(status: keyof typeof statusColors) {
  const color = statusColors[status]
  return L.divIcon({
    className: "tower-marker",
    html: `
      <div style="
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: ${color};
        border: 2px solid ${color};
        box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  })
}

export type TowerLocation = {
  id: string
  name: string
  lat: number
  lng: number
  status: "online" | "warning" | "offline"
  users: number
  signal: number
}

type CoverageMapProps = {
  towers: TowerLocation[]
  onTowerSelect: (tower: TowerLocation | null) => void
}

export function CoverageMap({ towers, onTowerSelect }: CoverageMapProps) {
  return (
    <MapContainer
      center={SOUTH_AFRICA_CENTER}
      zoom={DEFAULT_ZOOM}
      className="h-full w-full rounded-lg z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {towers.map((tower) => (
        <Marker
          key={tower.id}
          position={[tower.lat, tower.lng]}
          icon={createStatusIcon(tower.status)}
          eventHandlers={{
            click: () => onTowerSelect(tower),
          }}
        >
          <Popup>
            <div className="min-w-[180px] p-1">
              <div className="font-medium text-sm">{tower.name}</div>
              <div className="text-xs text-muted-foreground mt-1">{tower.id}</div>
              <div className="flex items-center gap-2 mt-2 text-xs">
                <span
                  className={cn(
                    "inline-block w-2 h-2 rounded-full",
                    tower.status === "online" && "bg-success",
                    tower.status === "warning" && "bg-warning",
                    tower.status === "offline" && "bg-destructive"
                  )}
                />
                {tower.status}
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                {tower.users.toLocaleString()} users · {tower.signal}% signal
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
