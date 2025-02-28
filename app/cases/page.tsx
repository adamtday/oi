import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import { CasesList } from "@/components/cases-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { CaseFolderMenu } from "@/components/case-folder-menu"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Cases | CaseWell",
  description: "Manage your OSINT investigation cases",
}

export default function CasesPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Cases</h2>
          <div className="flex items-center space-x-2">
            <CaseFolderMenu />
            <Button asChild>
              <Link href="/cases/new">
                <Plus className="mr-2 h-4 w-4" />
                New Case
              </Link>
            </Button>
          </div>
        </div>
        <CasesList />
      </div>
    </DashboardLayout>
  )
}

