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
import { MoreHorizontal, Search, Grid, List } from "lucide-react"
import Link from "next/link"

const cases = [
  {
    id: "CASE-2024-001",
    title: "Financial Investigation - XYZ Corp",
    status: "Active",
    created: "2024-02-15",
    lastUpdated: "2024-02-26",
    priority: "High",
    assignedTo: "Alex Johnson",
  },
  {
    id: "CASE-2024-002",
    title: "Background Check - John Doe",
    status: "Active",
    created: "2024-02-18",
    lastUpdated: "2024-02-25",
    priority: "Medium",
    assignedTo: "Sarah Williams",
  },
  {
    id: "CASE-2024-003",
    title: "Digital Footprint Analysis",
    status: "Active",
    created: "2024-02-20",
    lastUpdated: "2024-02-24",
    priority: "Low",
    assignedTo: "Michael Brown",
  },
  {
    id: "CASE-2024-004",
    title: "Social Media Investigation",
    status: "Completed",
    created: "2024-02-10",
    lastUpdated: "2024-02-22",
    priority: "Medium",
    assignedTo: "Emily Davis",
  },
  {
    id: "CASE-2024-005",
    title: "Asset Tracing - ABC Holdings",
    status: "On Hold",
    created: "2024-02-05",
    lastUpdated: "2024-02-21",
    priority: "High",
    assignedTo: "David Wilson",
  },
]

export function CasesList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"card" | "table">("card")
  const [sortBy, setSortBy] = useState<"title" | "status" | "priority" | "lastUpdated">("lastUpdated")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const filteredCases = cases.filter(
    (caseItem) =>
      caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const sortedCases = [...filteredCases].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1
    if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1
    return 0
  })

  const handleSort = (column: "title" | "status" | "priority" | "lastUpdated") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("asc")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search cases..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "table" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("table")}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button variant={viewMode === "card" ? "default" : "outline"} size="icon" onClick={() => setViewMode("card")}>
            <Grid className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {viewMode === "table" ? (
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
                <TableHead className="cursor-pointer" onClick={() => handleSort("lastUpdated")}>
                  Last Updated {sortBy === "lastUpdated" && (sortOrder === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedCases.map((caseItem) => (
                <TableRow key={caseItem.id}>
                  <TableCell className="font-medium">{caseItem.id}</TableCell>
                  <TableCell>{caseItem.title}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        caseItem.status === "Active"
                          ? "border-green-500 text-green-500"
                          : caseItem.status === "Completed"
                            ? "border-blue-500 text-blue-500"
                            : "border-yellow-500 text-yellow-500"
                      }
                    >
                      {caseItem.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>{caseItem.assignedTo}</TableCell>
                  <TableCell>{caseItem.lastUpdated}</TableCell>
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
                        <DropdownMenuItem>Edit case</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Archive case</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedCases.map((caseItem) => (
            <Card key={caseItem.id}>
              <CardHeader>
                <CardTitle>{caseItem.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Status:</span>
                    <Badge
                      variant="outline"
                      className={
                        caseItem.status === "Active"
                          ? "border-green-500 text-green-500"
                          : caseItem.status === "Completed"
                            ? "border-blue-500 text-blue-500"
                            : "border-yellow-500 text-yellow-500"
                      }
                    >
                      {caseItem.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Priority:</span>
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
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Assigned To:</span>
                    <span className="text-sm">{caseItem.assignedTo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Last Updated:</span>
                    <span className="text-sm">{caseItem.lastUpdated}</span>
                  </div>
                  <Button asChild variant="outline" className="w-full mt-4">
                    <Link href={`/cases/${caseItem.id}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

