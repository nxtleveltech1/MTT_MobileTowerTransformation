import type { TowerLocation } from "@/components/coverage/coverage-map"

function offset(id: string, baseLat: number, baseLng: number): [number, number] {
  const h = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0)
  const latOff = ((h % 31) - 15) * 0.0008
  const lngOff = ((h % 23) - 11) * 0.0008
  return [baseLat + latOff, baseLng + lngOff]
}

function tower(
  id: string,
  name: string,
  baseLat: number,
  baseLng: number,
  status: "online" | "warning" | "offline",
  users: number,
  signal: number
): TowerLocation {
  const [lat, lng] = offset(id, baseLat, baseLng)
  return { id, name, lat, lng, status, users, signal }
}

export const towerLocations: TowerLocation[] = [
  // Gauteng - Johannesburg area
  tower("ZA-JHB-001", "Johannesburg CBD", -26.2041, 28.0473, "online", 2847, 95),
  tower("ZA-JHB-002", "Sandton Central", -26.1076, 28.0567, "online", 3201, 92),
  tower("ZA-JHB-003", "Rosebank", -26.1453, 28.0412, "online", 1856, 94),
  tower("ZA-JHB-004", "Braamfontein", -26.1992, 28.0346, "online", 1243, 88),
  tower("ZA-JHB-005", "Soweto Orlando", -26.2485, 27.854, "offline", 0, 0),
  tower("ZA-JHB-006", "Soweto Diepkloof", -26.2356, 27.9012, "warning", 892, 68),
  tower("ZA-JHB-007", "Midrand North", -26.0089, 28.1234, "online", 2156, 91),
  tower("ZA-JHB-008", "Randburg", -26.0945, 28.0012, "online", 1678, 89),
  tower("ZA-JHB-009", "Roodepoort", -26.1625, 27.8723, "online", 1432, 87),
  tower("ZA-JHB-010", "Germiston", -26.2189, 28.1678, "online", 1123, 90),
  tower("ZA-JHB-011", "Benoni", -26.1885, 28.3201, "warning", 987, 74),
  tower("ZA-JHB-012", "Springs", -26.2545, 28.4456, "online", 756, 86),
  tower("ZA-JHB-013", "Kempton Park", -26.1056, 28.2312, "online", 1890, 93),
  tower("ZA-JHB-014", "Edenvale", -26.1401, 28.1523, "online", 1345, 92),
  tower("ZA-JHB-015", "Boksburg", -26.2112, 28.2598, "online", 1678, 88),
  // Gauteng - Pretoria area
  tower("ZA-PTA-001", "Pretoria Central", -25.7479, 28.2293, "warning", 1532, 72),
  tower("ZA-PTA-002", "Hatfield", -25.7423, 28.2312, "online", 2134, 91),
  tower("ZA-PTA-003", "Arcadia", -25.7398, 28.2123, "online", 987, 89),
  tower("ZA-PTA-004", "Centurion", -25.8603, 28.1891, "online", 2456, 94),
  tower("ZA-PTA-005", "Soshanguve", -25.5234, 28.0789, "warning", 1123, 71),
  tower("ZA-PTA-006", "Mamelodi", -25.7012, 28.3456, "online", 1876, 85),
  tower("ZA-PTA-007", "Menlyn", -25.7823, 28.2678, "online", 1987, 92),
  tower("ZA-PTA-008", "Brooklyn", -25.7545, 28.2412, "online", 1234, 88),
  tower("ZA-PTA-009", "Silverton", -25.7123, 28.2789, "online", 876, 86),
  tower("ZA-PTA-010", "Wonderboom", -25.6891, 28.2012, "online", 654, 84),
  // Western Cape - Cape Town area
  tower("ZA-CPT-001", "Cape Town CBD", -33.9249, 18.4241, "warning", 2156, 78),
  tower("ZA-CPT-002", "Sea Point", -33.9123, 18.3891, "online", 1876, 92),
  tower("ZA-CPT-003", "Camps Bay", -33.9567, 18.3789, "online", 1234, 88),
  tower("ZA-CPT-004", "Observatory", -33.9345, 18.4456, "online", 987, 89),
  tower("ZA-CPT-005", "Woodstock", -33.9234, 18.4567, "online", 1456, 92),
  tower("ZA-CPT-006", "Khayelitsha", -34.0456, 18.6789, "warning", 2345, 69),
  tower("ZA-CPT-007", "Mitchells Plain", -34.0567, 18.6123, "online", 1987, 85),
  tower("ZA-CPT-008", "Bellville", -33.9012, 18.6234, "online", 2134, 91),
  tower("ZA-CPT-009", "Stellenbosch", -33.9345, 18.8601, "online", 1234, 94),
  tower("ZA-CPT-010", "Paarl", -33.7345, 18.9567, "online", 876, 90),
  tower("ZA-CPT-011", "Worcester", -33.6456, 19.4456, "online", 654, 87),
  tower("ZA-CPT-012", "George", -33.9567, 22.4589, "online", 987, 89),
  tower("ZA-CPT-013", "Knysna", -34.0345, 23.0456, "online", 543, 86),
  tower("ZA-CPT-014", "Mossel Bay", -34.1789, 22.1456, "online", 432, 88),
  tower("ZA-CPT-015", "Saldanha", -33.0123, 17.9456, "online", 321, 82),
  // KwaZulu-Natal - Durban area
  tower("ZA-DBN-001", "Durban Harbour", -29.8587, 31.0218, "online", 1943, 88),
  tower("ZA-DBN-002", "Umhlanga", -29.7234, 31.0891, "online", 2456, 93),
  tower("ZA-DBN-003", "Berea", -29.8567, 31.0234, "online", 1678, 89),
  tower("ZA-DBN-004", "Pietermaritzburg", -29.6012, 30.3789, "online", 1234, 87),
  tower("ZA-DBN-005", "Newcastle", -27.7567, 29.9234, "online", 876, 85),
  tower("ZA-DBN-006", "Ladysmith", -28.5567, 29.7789, "warning", 654, 72),
  tower("ZA-DBN-007", "Richards Bay", -28.7789, 32.0456, "online", 543, 86),
  tower("ZA-DBN-008", "Empangeni", -28.7456, 31.9012, "online", 432, 84),
  tower("ZA-DBN-009", "Ballito", -29.5345, 31.2123, "online", 987, 91),
  tower("ZA-DBN-010", "Scottburgh", -30.2789, 30.7567, "online", 321, 83),
  // Eastern Cape
  tower("ZA-PE-001", "Gqeberha Central", -33.9608, 25.6022, "online", 654, 94),
  tower("ZA-PE-002", "Gqeberha North", -33.8901, 25.5678, "online", 543, 86),
  tower("ZA-PE-003", "East London", -33.0156, 27.9012, "online", 987, 88),
  tower("ZA-PE-004", "Grahamstown", -33.3012, 26.5234, "online", 432, 85),
  tower("ZA-PE-005", "Port Alfred", -33.6012, 26.8901, "online", 321, 82),
  tower("ZA-PE-006", "Uitenhage", -33.7567, 25.4012, "online", 654, 87),
  tower("ZA-PE-007", "Despatch", -33.8012, 25.4456, "warning", 234, 71),
  tower("ZA-PE-008", "Graaff-Reinet", -32.2512, 24.5456, "online", 198, 76),
  tower("ZA-PE-009", "Mthatha", -31.5891, 28.7845, "online", 543, 84),
  tower("ZA-PE-010", "Queenstown", -31.9012, 26.8789, "online", 432, 83),
  // Free State
  tower("ZA-BFN-001", "Bloemfontein Central", -29.1167, 26.2167, "online", 876, 90),
  tower("ZA-BFN-002", "Bloemfontein West", -29.1234, 26.1789, "online", 654, 88),
  tower("ZA-BFN-003", "Welkom", -27.9789, 26.7345, "online", 543, 86),
  tower("ZA-BFN-004", "Kroonstad", -27.6456, 27.2345, "online", 432, 84),
  tower("ZA-BFN-005", "Bethlehem", -28.2345, 28.3012, "online", 321, 85),
  tower("ZA-BFN-006", "Sasolburg", -26.8123, 27.8234, "online", 876, 89),
  tower("ZA-BFN-007", "Virginia", -28.1012, 26.8678, "online", 234, 82),
  tower("ZA-BFN-008", "Parys", -26.9012, 27.4567, "online", 198, 81),
  // Limpopo
  tower("ZA-POL-001", "Polokwane Central", -23.8962, 29.4486, "online", 987, 89),
  tower("ZA-POL-002", "Tzaneen", -23.8234, 30.1567, "online", 432, 86),
  tower("ZA-POL-003", "Lephalale", -23.6789, 27.7456, "online", 321, 84),
  tower("ZA-POL-004", "Mokopane", -24.1891, 29.0123, "online", 543, 86),
  tower("ZA-POL-005", "Louis Trichardt", -23.0456, 29.9012, "online", 432, 85),
  tower("ZA-POL-006", "Giyani", -23.3012, 30.7123, "warning", 654, 73),
  tower("ZA-POL-007", "Thohoyandou", -22.9456, 30.4789, "online", 876, 87),
  tower("ZA-POL-008", "Hoedspruit", -24.3456, 31.0456, "online", 198, 82),
  // Mpumalanga
  tower("ZA-NEL-001", "Nelspruit", -25.4744, 30.9703, "online", 1234, 91),
  tower("ZA-NEL-002", "Witbank", -25.8789, 29.2234, "online", 876, 88),
  tower("ZA-NEL-003", "Middleburg", -25.7678, 29.4678, "online", 543, 86),
  tower("ZA-NEL-004", "Secunda", -26.5123, 29.2012, "online", 654, 87),
  tower("ZA-NEL-005", "Barberton", -25.7891, 31.0456, "online", 321, 84),
  tower("ZA-NEL-006", "White River", -25.3234, 31.0123, "online", 432, 85),
  tower("ZA-NEL-007", "Kruger Gate", -24.9891, 31.4789, "warning", 198, 68),
  // North West
  tower("ZA-RSB-001", "Rustenburg", -25.6545, 27.2456, "online", 1234, 90),
  tower("ZA-RSB-002", "Potchefstroom", -26.7123, 27.1012, "online", 876, 88),
  tower("ZA-RSB-003", "Klerksdorp", -26.8678, 26.6678, "online", 654, 86),
  tower("ZA-RSB-004", "Brits", -25.6345, 27.7789, "online", 543, 87),
  tower("ZA-RSB-005", "Lichtenburg", -26.1567, 26.1567, "online", 321, 83),
  tower("ZA-RSB-006", "Mahikeng", -25.8678, 25.6456, "online", 432, 84),
  tower("ZA-RSB-007", "Zeerust", -25.5345, 26.0789, "online", 198, 81),
  // Northern Cape
  tower("ZA-KIM-001", "Kimberley", -28.7345, 24.7567, "online", 876, 88),
  tower("ZA-KIM-002", "Upington", -28.4567, 21.2345, "online", 543, 84),
  tower("ZA-KIM-003", "Springbok", -29.6678, 17.8891, "online", 198, 79),
  tower("ZA-KIM-004", "Kuruman", -27.4567, 23.4323, "online", 321, 82),
  tower("ZA-KIM-005", "De Aar", -30.6456, 24.0123, "online", 234, 80),
  tower("ZA-KIM-006", "Calvinia", -31.4789, 19.7767, "online", 156, 76),
]
