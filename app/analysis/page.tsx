import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import { AnalysisDashboard } from "@/components/analysis-dashboard"

export const metadata: Metadata = {
  title: "Analysis | CaseWell",
  description: "Analyze OSINT investigation data",
}

export default function AnalysisPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Analysis</h2>
        </div>
        <AnalysisDashboard />
      </div>
    </DashboardLayout>
  )
}

