import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import { TeamsList } from "@/components/teams-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { NewTeamModal } from "@/components/new-team-modal"

export const metadata: Metadata = {
  title: "Teams | CaseWell",
  description: "Manage your investigation teams",
}

export default function TeamsPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Teams</h2>
          <NewTeamModal>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Team
            </Button>
          </NewTeamModal>
        </div>
        <TeamsList />
      </div>
    </DashboardLayout>
  )
}

