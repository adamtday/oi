import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface RecentCasesProps {
  className?: string
}

export function RecentCases({ className }: RecentCasesProps) {
  const recentCases = [
    {
      id: "CASE-2024-001",
      title: "Financial Investigation - XYZ Corp",
      status: "Active",
      lastUpdated: "2 hours ago",
      priority: "High",
    },
    {
      id: "CASE-2024-002",
      title: "Background Check - John Doe",
      status: "Active",
      lastUpdated: "5 hours ago",
      priority: "Medium",
    },
    {
      id: "CASE-2024-003",
      title: "Digital Footprint Analysis",
      status: "Active",
      lastUpdated: "1 day ago",
      priority: "Low",
    },
    {
      id: "CASE-2024-004",
      title: "Social Media Investigation",
      status: "Completed",
      lastUpdated: "2 days ago",
      priority: "Medium",
    },
    {
      id: "CASE-2024-005",
      title: "Asset Tracing - ABC Holdings",
      status: "On Hold",
      lastUpdated: "3 days ago",
      priority: "High",
    },
  ]

  return (
    <Card className={cn("col-span-4", className)}>
      <CardHeader>
        <CardTitle>Recent Cases</CardTitle>
        <CardDescription>
          You have {recentCases.filter((c) => c.status === "Active").length} active cases
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentCases.map((caseItem) => (
            <div key={caseItem.id} className="flex items-center justify-between space-x-4">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{caseItem.title}</p>
                <p className="text-sm text-muted-foreground">{caseItem.id}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    caseItem.status === "Active" ? "default" : caseItem.status === "Completed" ? "outline" : "secondary"
                  }
                >
                  {caseItem.status}
                </Badge>
                <Badge
                  variant="outline"
                  className={
                    caseItem.priority === "High"
                      ? "border-red-500 text-red-500"
                      : caseItem.priority === "Medium"
                        ? "border-yellow-500 text-yellow-500"
                        : "border-green-500 text-green-500"
                  }
                >
                  {caseItem.priority}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

