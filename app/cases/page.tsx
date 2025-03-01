import { Metadata } from "next"
import { CasesList } from "@/components/cases-list"
import { AuditLog } from "@/components/audit-log"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { hasPermission, PERMISSIONS, User, UserRole } from "@/lib/auth-types"
import DashboardLayout from "@/components/dashboard-layout"

export const metadata: Metadata = {
  title: "Cases | ClearWell OSINT Platform",
  description: "Manage your OSINT investigation cases",
}

// Mock current user - in a real app, this would come from an auth context
const currentUser: User = {
  id: "user-001",
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  role: "Manager" as UserRole,
  teams: ["team-001"],
  lastActive: "2024-02-26T10:30:00Z"
}

export default function CasesPage() {
  // Check if user has permission to create cases
  const canCreateCase = hasPermission(currentUser, PERMISSIONS.CREATE_CASE)
  
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Case Management</h1>
            <p className="text-muted-foreground">
              Manage and track your investigation cases
            </p>
          </div>
          {canCreateCase && (
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              <span>Create Case</span>
            </Button>
          )}
        </div>
        
        <Tabs defaultValue="cases" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-3">
            <TabsTrigger value="cases">Cases</TabsTrigger>
            <TabsTrigger value="audit">Audit Log</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="cases" className="mt-6">
            <CasesList />
          </TabsContent>
          
          <TabsContent value="audit" className="mt-6">
            <AuditLog />
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-6">
            <div className="rounded-md border p-8 text-center">
              <h3 className="text-lg font-medium mb-2">Case Analytics</h3>
              <p className="text-muted-foreground">
                Case analytics and reporting features will be available here.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

