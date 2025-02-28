import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentCases } from "@/components/recent-cases"
import { ActivityFeed } from "@/components/activity-feed"
import { DashboardWidgets } from "@/components/dashboard-widgets"

export const metadata: Metadata = {
  title: "Dashboard | CaseWell",
  description: "CaseWell OSINT investigation dashboard",
}

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardStats />
        </div>
        <DashboardWidgets />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <RecentCases className="col-span-4" />
          <ActivityFeed className="col-span-3" />
        </div>
      </div>
    </DashboardLayout>
  )
}

