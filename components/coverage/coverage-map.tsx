"use client"

import { useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap, CircleMarker } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

const SOUTH_AFRICA_CENTER: [number, number] = [-29.0, 24.0]
const DEFAULT_ZOOM = 5

const statusColors: Record<string, { fill: string; ring: string }> = {
  online: { fill: "#22c55e", ring: "#16a34a" },
  warning: { fill: "#eab308", ring: "#ca8a04" },
  offline: { fill: "#ef4444", ring: "#dc2626" },
}

function getSignalColor(signal: number): { fill: string; ring: string } {
  if (signal >= 80) return { fill: "#22c55e", ring: "#16a34a" }
  if (signal >= 50) return { fill: "#eab308", ring: "#ca8a04" }
  return { fill: "#ef4444", ring: "#dc2626" }
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

function createSignalIcon(signal: number) {
  const { fill, ring } = getSignalColor(signal)
  return L.divIcon({
    className: "tower-marker",
    html: `
      <div style="
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: ${fill};
        border: 3px solid ${ring};
        box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 10px;
        font-weight: bold;
      ">${signal}%</div>
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

type MapLayer = "towers" | "heatmap" | "signal"

type CoverageMapProps = {
  towers: TowerLocation[]
  onTowerSelect: (tower: TowerLocation | null) => void
  layer?: MapLayer
  highlightTowerId?: string | null
}

function HeatmapLayer({ towers, onTowerSelect }: { towers: TowerLocation[]; onTowerSelect: (t: TowerLocation | null) => void }) {
  const maxUsers = Math.max(...towers.map((t) => t.users), 1)
  return (
    <>
      {towers.map((tower) => {
        const intensity = tower.users / maxUsers
        const radius = 8 + intensity * 24
        const opacity = 0.2 + intensity * 0.5
        return (
          <CircleMarker
            key={tower.id}
            center={[tower.lat, tower.lng]}
            radius={radius}
            pathOptions={{
              fillColor: "#22c55e",
              color: "#16a34a",
              weight: 1,
              fillOpacity: opacity,
              opacity: 0.8,
            }}
            eventHandlers={{
              click: () => onTowerSelect(tower),
            }}
          />
        )
      })}
    </>
  )
}

function HighlightTower({ tower, towers }: { tower: string | null; towers: TowerLocation[] }) {
  const map = useMap()
  useEffect(() => {
    if (!tower) return
    const t = towers.find((x) => x.id === tower)
    if (t) map.flyTo([t.lat, t.lng], 12, { duration: 0.5 })
  }, [map, tower, towers])
  return null
}

export function CoverageMap({ towers, onTowerSelect, layer = "towers", highlightTowerId = null }: CoverageMapProps) {
  const showMarkers = layer === "towers" || layer === "signal"
  const showHeat = layer === "heatmap"

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
      {showHeat && <HeatmapLayer towers={towers} onTowerSelect={onTowerSelect} />}
      {highlightTowerId && <HighlightTower tower={highlightTowerId} towers={towers} />}
      {showMarkers &&
        towers.map((tower) => (
          <Marker
            key={tower.id}
            position={[tower.lat, tower.lng]}
            icon={layer === "signal" ? createSignalIcon(tower.signal) : createStatusIcon(tower.status)}
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
