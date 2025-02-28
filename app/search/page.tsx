import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import { SearchInterface } from "@/components/search-interface"

export const metadata: Metadata = {
  title: "Search | CaseWell",
  description: "Advanced OSINT search capabilities",
}

export default function SearchPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Search</h2>
        </div>
        <SearchInterface />
      </div>
    </DashboardLayout>
  )
}

