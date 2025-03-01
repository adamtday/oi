"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  MoreHorizontal, 
  Search, 
  Grid, 
  List, 
  Kanban, 
  Filter, 
  Clock, 
  Calendar, 
  User as UserIcon, 
  Tag, 
  AlertTriangle 
} from "lucide-react"
import Link from "next/link"
import { CaseKanbanView } from "@/components/case-kanban-view"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { hasPermission, PERMISSIONS, User } from "@/lib/auth-types"

// Define the case status types
const CASE_STATUSES = ["Open", "In Progress", "Pending", "Closed", "Escalated"] as const
type CaseStatus = typeof CASE_STATUSES[number]

// Define the case priority types
const CASE_PRIORITIES = ["Low", "Medium", "High", "Critical"] as const
type CasePriority = typeof CASE_PRIORITIES[number]

// Define the case type
interface Case {
  id: string
  title: string
  status: CaseStatus
  created: string
  lastUpdated: string
  priority: CasePriority
  assignedTo: string
  description?: string
  dueDate?: string
  tags?: string[]
  team?: string
}

// Mock user data
const currentUser: User = {
  id: "user-001",
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  role: "Manager",
  teams: ["team-001"],
  lastActive: "2024-02-26T10:30:00Z"
}

// Enhanced mock cases data
const cases: Case[] = [
  {
    id: "CASE-2024-001",
    title: "Financial Investigation - XYZ Corp",
    status: "In Progress",
    created: "2024-02-15",
    lastUpdated: "2024-02-26",
    priority: "High",
    assignedTo: "Alex Johnson",
    description: "Investigation into suspicious financial activities at XYZ Corporation.",
    dueDate: "2024-03-15",
    tags: ["financial", "corporate", "fraud"],
    team: "Alpha Team"
  },
  {
    id: "CASE-2024-002",
    title: "Background Check - John Doe",
    status: "Open",
    created: "2024-02-18",
    lastUpdated: "2024-02-25",
    priority: "Medium",
    assignedTo: "Sarah Williams",
    description: "Comprehensive background check for employment verification.",
    dueDate: "2024-03-10",
    tags: ["background", "employment", "verification"],
    team: "Beta Squad"
  },
  {
    id: "CASE-2024-003",
    title: "Digital Footprint Analysis",
    status: "Open",
    created: "2024-02-20",
    lastUpdated: "2024-02-24",
    priority: "Low",
    assignedTo: "Michael Brown",
    description: "Analysis of subject's online presence and digital activities.",
    tags: ["digital", "online", "social media"],
    team: "Gamma Unit"
  },
  {
    id: "CASE-2024-004",
    title: "Social Media Investigation",
    status: "Closed",
    created: "2024-02-10",
    lastUpdated: "2024-02-22",
    priority: "Medium",
    assignedTo: "Emily Davis",
    description: "Investigation of subject's social media accounts and connections.",
    tags: ["social media", "connections", "online"],
    team: "Beta Squad"
  },
  {
    id: "CASE-2024-005",
    title: "Asset Tracing - ABC Holdings",
    status: "Pending",
    created: "2024-02-05",
    lastUpdated: "2024-02-21",
    priority: "Critical",
    assignedTo: "David Wilson",
    description: "Tracing hidden assets and financial flows related to ABC Holdings.",
    dueDate: "2024-03-01",
    tags: ["assets", "financial", "corporate"],
    team: "Alpha Team"
  },
  {
    id: "CASE-2024-006",
    title: "Cryptocurrency Transaction Analysis",
    status: "In Progress",
    created: "2024-02-12",
    lastUpdated: "2024-02-23",
    priority: "High",
    assignedTo: "Alex Johnson",
    description: "Analysis of suspicious cryptocurrency transactions and wallet activities.",
    dueDate: "2024-03-20",
    tags: ["crypto", "blockchain", "financial"],
    team: "Gamma Unit"
  },
  {
    id: "CASE-2024-007",
    title: "Corporate Due Diligence",
    status: "Escalated",
    created: "2024-02-08",
    lastUpdated: "2024-02-27",
    priority: "Critical",
    assignedTo: "Sarah Williams",
    description: "Comprehensive due diligence investigation for potential acquisition.",
    dueDate: "2024-03-05",
    tags: ["corporate", "due diligence", "acquisition"],
    team: "Alpha Team"
  },
]

type ViewMode = "card" | "table" | "kanban"

export function CasesList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<ViewMode>("card")
  const [sortBy, setSortBy] = useState<keyof Case>("lastUpdated")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [teamFilter, setTeamFilter] = useState<string>("all")
  const [assigneeFilter, setAssigneeFilter] = useState<string>("all")

  // Get unique teams from cases
  const teams = Array.from(new Set(cases.map(c => c.team).filter(Boolean))) as string[]
  
  // Get unique assignees from cases
  const assignees = Array.from(new Set(cases.map(c => c.assignedTo)))

  // Apply filters to cases
  const filteredCases = cases.filter(
    (caseItem) => {
      // Search filter
      const matchesSearch = 
        caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        caseItem.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        caseItem.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (caseItem.description && caseItem.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (caseItem.tags && caseItem.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
      
      // Status filter
      const matchesStatus = statusFilter === "all" || caseItem.status === statusFilter
      
      // Priority filter
      const matchesPriority = priorityFilter === "all" || caseItem.priority === priorityFilter
      
      // Team filter
      const matchesTeam = teamFilter === "all" || caseItem.team === teamFilter
      
      // Assignee filter
      const matchesAssignee = assigneeFilter === "all" || caseItem.assignedTo === assigneeFilter
      
      return matchesSearch && matchesStatus && matchesPriority && matchesTeam && matchesAssignee
    }
  )

  // Sort filtered cases
  const sortedCases = [...filteredCases].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1
    if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1
    return 0
  })

  const handleSort = (column: keyof Case) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("asc")
    }
  }

  // Handle case update (for Kanban view)
  const handleCaseUpdate = (caseId: string, updates: Partial<Case>) => {
    // In a real application, this would update the case in the database
    console.log(`Updating case ${caseId} with:`, updates)
    // For demo purposes, we could update the local state
    // setCases(cases.map(c => c.id === caseId ? {...c, ...updates} : c))
  }

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
  }

  // Get color for status
  const getStatusColor = (status: CaseStatus) => {
    switch (status) {
      case "Open":
        return "border-blue-500 text-blue-500"
      case "In Progress":
        return "border-purple-500 text-purple-500"
      case "Pending":
        return "border-yellow-500 text-yellow-500"
      case "Closed":
        return "border-green-500 text-green-500"
      case "Escalated":
        return "border-red-500 text-red-500"
      default:
        return "border-gray-500 text-gray-500"
    }
  }

  // Get color for priority
  const getPriorityColor = (priority: CasePriority) => {
    switch (priority) {
      case "Critical":
        return "border-red-500 text-red-500"
      case "High":
        return "border-orange-500 text-orange-500"
      case "Medium":
        return "border-yellow-500 text-yellow-500"
      case "Low":
        return "border-green-500 text-green-500"
      default:
        return "border-gray-500 text-gray-500"
    }
  }

  // Check if user has permission to perform actions
  const canEditCase = hasPermission(currentUser, PERMISSIONS.EDIT_CASE)
  const canDeleteCase = hasPermission(currentUser, PERMISSIONS.DELETE_CASE)
  const canAssignCase = hasPermission(currentUser, PERMISSIONS.ASSIGN_CASE)
  const canChangeStatus = hasPermission(currentUser, PERMISSIONS.CHANGE_CASE_STATUS)

  return (
    <div className="space-y-4">
      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
          <TabsList>
            <TabsTrigger value="all">All Cases</TabsTrigger>
            <TabsTrigger value="my">My Cases</TabsTrigger>
            <TabsTrigger value="team">Team Cases</TabsTrigger>
            <TabsTrigger value="recent">Recently Updated</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "table" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("table")}
              title="Table View"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === "card" ? "default" : "outline"} 
              size="icon" 
              onClick={() => setViewMode("card")}
              title="Card View"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === "kanban" ? "default" : "outline"} 
              size="icon" 
              onClick={() => setViewMode("kanban")}
              title="Kanban View"
            >
              <Kanban className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search cases by title, ID, description, tags..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {CASE_STATUSES.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                {CASE_PRIORITIES.map(priority => (
                  <SelectItem key={priority} value={priority}>{priority}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={teamFilter} onValueChange={setTeamFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teams</SelectItem>
                {teams.map(team => (
                  <SelectItem key={team} value={team}>{team}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Assignee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Assignees</SelectItem>
                {assignees.map(assignee => (
                  <SelectItem key={assignee} value={assignee}>{assignee}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          {viewMode === "kanban" ? (
            <CaseKanbanView cases={sortedCases} onCaseUpdate={handleCaseUpdate} />
          ) : viewMode === "table" ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Case ID</TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("title")}>
                      Title {sortBy === "title" && (sortOrder === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                      Status {sortBy === "status" && (sortOrder === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("priority")}>
                      Priority {sortBy === "priority" && (sortOrder === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("lastUpdated")}>
                      Last Updated {sortBy === "lastUpdated" && (sortOrder === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedCases.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                        No cases found matching your filters
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedCases.map((caseItem) => (
                      <TableRow key={caseItem.id}>
                        <TableCell className="font-medium">{caseItem.id}</TableCell>
                        <TableCell>
                          <div className="font-medium">{caseItem.title}</div>
                          {caseItem.description && (
                            <div className="text-sm text-muted-foreground line-clamp-1">{caseItem.description}</div>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getStatusColor(caseItem.status)}
                          >
                            {caseItem.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getPriorityColor(caseItem.priority)}
                          >
                            {caseItem.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={`/avatars/${caseItem.assignedTo.toLowerCase().replace(' ', '-')}.jpg`} alt={caseItem.assignedTo} />
                              <AvatarFallback className="text-xs">{getInitials(caseItem.assignedTo)}</AvatarFallback>
                            </Avatar>
                            <span>{caseItem.assignedTo}</span>
                          </div>
                        </TableCell>
                        <TableCell>{caseItem.team}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                            {caseItem.lastUpdated}
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem asChild>
                                <Link href={`/cases/${caseItem.id}`}>View details</Link>
                              </DropdownMenuItem>
                              {canEditCase && <DropdownMenuItem>Edit case</DropdownMenuItem>}
                              {canChangeStatus && (
                                <DropdownMenuItem>Change status</DropdownMenuItem>
                              )}
                              {canAssignCase && (
                                <DropdownMenuItem>Reassign case</DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              {canDeleteCase && (
                                <DropdownMenuItem className="text-red-600">Archive case</DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sortedCases.length === 0 ? (
                <div className="col-span-full text-center py-6 text-muted-foreground">
                  No cases found matching your filters
                </div>
              ) : (
                sortedCases.map((caseItem) => (
                  <Card key={caseItem.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base">{caseItem.title}</CardTitle>
                          <div className="text-xs text-muted-foreground mt-1">{caseItem.id}</div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link href={`/cases/${caseItem.id}`}>View details</Link>
                            </DropdownMenuItem>
                            {canEditCase && <DropdownMenuItem>Edit case</DropdownMenuItem>}
                            {canChangeStatus && (
                              <DropdownMenuItem>Change status</DropdownMenuItem>
                            )}
                            {canAssignCase && (
                              <DropdownMenuItem>Reassign case</DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            {canDeleteCase && (
                              <DropdownMenuItem className="text-red-600">Archive case</DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {caseItem.description && (
                          <p className="text-sm line-clamp-2">{caseItem.description}</p>
                        )}
                        
                        <div className="flex flex-wrap gap-1 mt-2">
                          {caseItem.tags?.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-1">
                            <Tag className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">Status:</span>
                          </div>
                          <div className="text-right">
                            <Badge
                              variant="outline"
                              className={getStatusColor(caseItem.status)}
                            >
                              {caseItem.status}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">Priority:</span>
                          </div>
                          <div className="text-right">
                            <Badge
                              variant="outline"
                              className={getPriorityColor(caseItem.priority)}
                            >
                              {caseItem.priority}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <UserIcon className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">Assigned:</span>
                          </div>
                          <div className="flex items-center justify-end gap-1">
                            <Avatar className="h-5 w-5">
                              <AvatarImage src={`/avatars/${caseItem.assignedTo.toLowerCase().replace(' ', '-')}.jpg`} alt={caseItem.assignedTo} />
                              <AvatarFallback className="text-xs">{getInitials(caseItem.assignedTo)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm truncate">{caseItem.assignedTo}</span>
                          </div>
                          
                          {caseItem.team && (
                            <>
                              <div className="flex items-center gap-1">
                                <UserIcon className="h-3 w-3 text-muted-foreground" />
                                <span className="text-muted-foreground">Team:</span>
                              </div>
                              <div className="text-right">
                                {caseItem.team}
                              </div>
                            </>
                          )}
                          
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">Updated:</span>
                          </div>
                          <div className="text-right">
                            {caseItem.lastUpdated}
                          </div>
                          
                          {caseItem.dueDate && (
                            <>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3 text-muted-foreground" />
                                <span className="text-muted-foreground">Due:</span>
                              </div>
                              <div className="text-right text-red-500">
                                {caseItem.dueDate}
                              </div>
                            </>
                          )}
                        </div>
                        
                        <Button asChild variant="outline" className="w-full mt-2">
                          <Link href={`/cases/${caseItem.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="my" className="mt-0">
          <div className="rounded-md border p-8 text-center">
            <h3 className="text-lg font-medium mb-2">My Assigned Cases</h3>
            <p className="text-muted-foreground">
              This tab will show cases assigned specifically to you.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="team" className="mt-0">
          <div className="rounded-md border p-8 text-center">
            <h3 className="text-lg font-medium mb-2">Team Cases</h3>
            <p className="text-muted-foreground">
              This tab will show cases assigned to your team.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="recent" className="mt-0">
          <div className="rounded-md border p-8 text-center">
            <h3 className="text-lg font-medium mb-2">Recently Updated Cases</h3>
            <p className="text-muted-foreground">
              This tab will show cases that have been updated in the last 7 days.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

