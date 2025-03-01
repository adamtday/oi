"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Download, Clock } from "lucide-react"

// Define audit log action types
const AUDIT_ACTIONS = [
  "Case Created",
  "Case Updated",
  "Case Deleted",
  "Case Status Changed",
  "Case Assigned",
  "Team Created",
  "Team Updated",
  "Team Deleted",
  "User Added",
  "User Removed",
  "Search Performed",
  "Login",
  "Logout",
] as const

type AuditAction = typeof AUDIT_ACTIONS[number]

// Define audit log entry type
interface AuditLogEntry {
  id: string
  timestamp: string
  user: {
    id: string
    name: string
    avatar?: string
  }
  action: AuditAction
  details: string
  resourceType: "Case" | "Team" | "User" | "Search" | "System"
  resourceId?: string
}

// Mock audit log data
const mockAuditLogs: AuditLogEntry[] = [
  {
    id: "log-001",
    timestamp: "2023-06-15T14:32:45Z",
    user: {
      id: "user-001",
      name: "John Doe",
    },
    action: "Case Created",
    details: "Created case 'Suspicious Network Activity'",
    resourceType: "Case",
    resourceId: "case-001",
  },
  {
    id: "log-002",
    timestamp: "2023-06-15T15:10:22Z",
    user: {
      id: "user-002",
      name: "Jane Smith",
    },
    action: "Case Status Changed",
    details: "Changed status from 'Open' to 'In Progress'",
    resourceType: "Case",
    resourceId: "case-001",
  },
  {
    id: "log-003",
    timestamp: "2023-06-15T16:45:12Z",
    user: {
      id: "user-003",
      name: "Mike Johnson",
    },
    action: "Search Performed",
    details: "Searched for IP address '192.168.1.1'",
    resourceType: "Search",
  },
  {
    id: "log-004",
    timestamp: "2023-06-16T09:22:18Z",
    user: {
      id: "user-001",
      name: "John Doe",
    },
    action: "Team Created",
    details: "Created team 'Alpha Team'",
    resourceType: "Team",
    resourceId: "team-001",
  },
  {
    id: "log-005",
    timestamp: "2023-06-16T10:15:33Z",
    user: {
      id: "user-002",
      name: "Jane Smith",
    },
    action: "User Added",
    details: "Added user 'Mike Johnson' to team 'Alpha Team'",
    resourceType: "Team",
    resourceId: "team-001",
  },
  {
    id: "log-006",
    timestamp: "2023-06-16T11:30:45Z",
    user: {
      id: "user-003",
      name: "Mike Johnson",
    },
    action: "Case Assigned",
    details: "Assigned case 'Suspicious Network Activity' to 'Jane Smith'",
    resourceType: "Case",
    resourceId: "case-001",
  },
  {
    id: "log-007",
    timestamp: "2023-06-16T13:45:22Z",
    user: {
      id: "user-002",
      name: "Jane Smith",
    },
    action: "Case Updated",
    details: "Updated case details for 'Suspicious Network Activity'",
    resourceType: "Case",
    resourceId: "case-001",
  },
]

interface AuditLogProps {
  initialLogs?: AuditLogEntry[]
}

export function AuditLog({ initialLogs = mockAuditLogs }: AuditLogProps) {
  const [logs, setLogs] = useState<AuditLogEntry[]>(initialLogs)
  const [searchTerm, setSearchTerm] = useState("")
  const [actionFilter, setActionFilter] = useState<string>("all")
  const [resourceFilter, setResourceFilter] = useState<string>("all")
  const [dateFilter, setDateFilter] = useState<string>("all")

  // Filter logs based on search term and filters
  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesAction = actionFilter === "all" || log.action === actionFilter
    const matchesResource = resourceFilter === "all" || log.resourceType === resourceFilter
    
    // Simple date filtering
    let matchesDate = true
    if (dateFilter === "today") {
      const today = new Date().toISOString().split("T")[0]
      matchesDate = log.timestamp.startsWith(today)
    } else if (dateFilter === "yesterday") {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0]
      matchesDate = log.timestamp.startsWith(yesterday)
    } else if (dateFilter === "thisWeek") {
      const oneWeekAgo = new Date(Date.now() - 7 * 86400000).toISOString()
      matchesDate = log.timestamp >= oneWeekAgo
    }
    
    return matchesSearch && matchesAction && matchesResource && matchesDate
  })

  // Format timestamp to readable format
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
  }

  // Get badge color based on action
  const getActionBadgeColor = (action: AuditAction) => {
    if (action.includes("Created")) return "bg-green-100 text-green-800 border-green-300"
    if (action.includes("Updated") || action.includes("Changed")) return "bg-blue-100 text-blue-800 border-blue-300"
    if (action.includes("Deleted")) return "bg-red-100 text-red-800 border-red-300"
    if (action.includes("Assigned") || action.includes("Added")) return "bg-purple-100 text-purple-800 border-purple-300"
    if (action.includes("Removed")) return "bg-orange-100 text-orange-800 border-orange-300"
    if (action.includes("Search")) return "bg-yellow-100 text-yellow-800 border-yellow-300"
    if (action.includes("Login")) return "bg-teal-100 text-teal-800 border-teal-300"
    if (action.includes("Logout")) return "bg-gray-100 text-gray-800 border-gray-300"
    return "bg-gray-100 text-gray-800 border-gray-300"
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Audit Log</CardTitle>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search audit logs..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                {AUDIT_ACTIONS.map(action => (
                  <SelectItem key={action} value={action}>{action}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={resourceFilter} onValueChange={setResourceFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by resource" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Resources</SelectItem>
                <SelectItem value="Case">Cases</SelectItem>
                <SelectItem value="Team">Teams</SelectItem>
                <SelectItem value="User">Users</SelectItem>
                <SelectItem value="Search">Searches</SelectItem>
                <SelectItem value="System">System</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="thisWeek">This Week</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Timestamp</TableHead>
                <TableHead className="w-[150px]">User</TableHead>
                <TableHead className="w-[150px]">Action</TableHead>
                <TableHead>Details</TableHead>
                <TableHead className="w-[100px]">Resource</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    No audit logs found matching your filters
                  </TableCell>
                </TableRow>
              ) : (
                filteredLogs.map(log => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-xs">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                        {formatTimestamp(log.timestamp)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={log.user.avatar} alt={log.user.name} />
                          <AvatarFallback className="text-xs">{getInitials(log.user.name)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{log.user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getActionBadgeColor(log.action)}>
                        {log.action}
                      </Badge>
                    </TableCell>
                    <TableCell>{log.details}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {log.resourceType}
                        {log.resourceId ? ` #${log.resourceId.split('-')[1]}` : ''}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
} 