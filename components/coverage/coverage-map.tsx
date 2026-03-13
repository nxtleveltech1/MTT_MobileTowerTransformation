"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

const SOUTH_AFRICA_CENTER: [number, number] = [-29.0, 24.0]
const DEFAULT_ZOOM = 5

const statusColors: Record<string, { fill: string; ring: string }> = {
  online: { fill: "#22c55e", ring: "#16a34a" },
  warning: { fill: "#eab308", ring: "#ca8a04" },
  offline: { fill: "#ef4444", ring: "#dc2626" },
}

function createStatusIcon(status: keyof typeof statusColors) {
  const { fill, ring } = statusColors[status] ?? statusColors.online
  return L.divIcon({
    className: "tower-marker",
    html: `
      <div style="
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: ${fill};
        border: 3px solid ${ring};
        box-shadow: 0 2px 8px rgba(0,0,0,0.4), 0 0 0 2px rgba(255,255,255,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
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
            <div style={{ minWidth: 200, padding: 8 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{tower.name}</div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>{tower.id}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8, fontSize: 12 }}>
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor:
                      tower.status === "online"
                        ? "#22c55e"
                        : tower.status === "warning"
                          ? "#eab308"
                          : "#ef4444",
                  }}
                />
                <span style={{ textTransform: "capitalize" }}>{tower.status}</span>
              </div>
              <div style={{ marginTop: 8, fontSize: 12, color: "#94a3b8" }}>
                {tower.users.toLocaleString()} users · {tower.signal}% signal
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
