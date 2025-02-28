import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Share2 } from "lucide-react"

// Mock function to fetch case details
const getCaseDetails = (id: string) => {
  const cases = [
    {
      id: "CASE-2024-001",
      title: "Financial Investigation - XYZ Corp",
      status: "Active",
      created: "2024-02-15",
      lastUpdated: "2024-02-26",
      priority: "High",
      assignedTo: "Alex Johnson",
      description: "Investigating potential financial irregularities at XYZ Corp.",
      findings: [
        { id: "F1", title: "Suspicious transactions identified", date: "2024-02-20" },
        { id: "F2", title: "Undisclosed offshore accounts found", date: "2024-02-23" },
      ],
    },
    // Add more mock cases as needed
  ]

  return cases.find((c) => c.id === id)
}

export default function CaseDetailsPage({ params }: { params: { id: string } }) {
  const caseDetails = getCaseDetails(params.id)

  if (!caseDetails) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{caseDetails.title}</h1>
        <Button variant="outline">
          <Share2 className="mr-2 h-4 w-4" />
          Share Case
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Case Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-2 text-sm">
              <dt className="font-medium">Status:</dt>
              <dd>
                <Badge variant={caseDetails.status === "Active" ? "default" : "secondary"}>{caseDetails.status}</Badge>
              </dd>
              <dt className="font-medium">Priority:</dt>
              <dd>
                <Badge
                  variant="outline"
                  className={
                    caseDetails.priority === "High"
                      ? "border-red-500 text-red-500"
                      : caseDetails.priority === "Medium"
                        ? "border-yellow-500 text-yellow-500"
                        : "border-green-500 text-green-500"
                  }
                >
                  {caseDetails.priority}
                </Badge>
              </dd>
              <dt className="font-medium">Assigned To:</dt>
              <dd>{caseDetails.assignedTo}</dd>
              <dt className="font-medium">Created:</dt>
              <dd>{caseDetails.created}</dd>
              <dt className="font-medium">Last Updated:</dt>
              <dd>{caseDetails.lastUpdated}</dd>
            </dl>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Case Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{caseDetails.description}</p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="findings" className="mt-6">
        <TabsList>
          <TabsTrigger value="findings">Findings</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        <TabsContent value="findings">
          <Card>
            <CardHeader>
              <CardTitle>Latest Findings</CardTitle>
              <CardDescription>Recent discoveries in the investigation</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {caseDetails.findings.map((finding) => (
                  <li key={finding.id} className="flex items-center justify-between border-b pb-2">
                    <span>{finding.title}</span>
                    <span className="text-sm text-muted-foreground">{finding.date}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>Case Timeline</CardTitle>
              <CardDescription>Chronological events of the investigation</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add timeline component here */}
              <p>Timeline content to be implemented</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Case Documents</CardTitle>
              <CardDescription>Related files and documents</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add document list component here */}
              <p>Document list to be implemented</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

