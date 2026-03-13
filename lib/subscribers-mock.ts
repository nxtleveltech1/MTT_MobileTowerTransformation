export const subscribers = [
  {
    msisdn: "+234 801 234 5678",
    imsi: "621301234567890",
    imei: "353456789012345",
    status: "active",
    plan: "Premium",
    technology: "5G",
    tower: "NG-LAG-001",
    dataUsed: "45.2 GB",
    lastSeen: "2 min ago",
  },
  {
    msisdn: "+234 802 345 6789",
    imsi: "621302345678901",
    imei: "353456789012346",
    status: "active",
    plan: "Business",
    technology: "LTE",
    tower: "NG-LAG-002",
    dataUsed: "128.5 GB",
    lastSeen: "Just now",
  },
  {
    msisdn: "+234 803 456 7890",
    imsi: "621303456789012",
    imei: "353456789012347",
    status: "inactive",
    plan: "Basic",
    technology: "3G",
    tower: "NG-ABJ-015",
    dataUsed: "2.1 GB",
    lastSeen: "3 days ago",
  },
  {
    msisdn: "+234 804 567 8901",
    imsi: "621304567890123",
    imei: "353456789012348",
    status: "active",
    plan: "Unlimited",
    technology: "5G",
    tower: "NG-PH-008",
    dataUsed: "312.8 GB",
    lastSeen: "5 min ago",
  },
  {
    msisdn: "+234 805 678 9012",
    imsi: "621305678901234",
    imei: "353456789012349",
    status: "roaming",
    plan: "Premium",
    technology: "LTE",
    tower: "GH-ACC-001",
    dataUsed: "8.9 GB",
    lastSeen: "1 hour ago",
  },
  {
    msisdn: "+234 806 789 0123",
    imsi: "621306789012345",
    imei: "353456789012350",
    status: "suspended",
    plan: "Basic",
    technology: "LTE",
    tower: "NG-KAN-023",
    dataUsed: "0 GB",
    lastSeen: "30 days ago",
  },
] as const

export type Subscriber = (typeof subscribers)[number]

export function slugToMsisdn(slug: string): string {
  return decodeURIComponent(slug).replace(/-/g, " ")
}

export function msisdnToSlug(msisdn: string): string {
  return encodeURIComponent(msisdn.replace(/\s/g, "-"))
}
