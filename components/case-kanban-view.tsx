"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Clock, AlertCircle } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
}

interface CaseKanbanViewProps {
  cases: Case[]
  onCaseUpdate: (caseId: string, updates: Partial<Case>) => void
}

export function CaseKanbanView({ cases, onCaseUpdate }: CaseKanbanViewProps) {
  // Group cases by status
  const casesByStatus = CASE_STATUSES.reduce((acc, status) => {
    acc[status] = cases.filter(c => c.status === status)
    return acc
  }, {} as Record<CaseStatus, Case[]>)

  // Handle drag and drop
  const [draggingId, setDraggingId] = useState<string | null>(null)

  const handleDragStart = (caseId: string) => {
    setDraggingId(caseId)
  }

  const handleDragEnd = () => {
    setDraggingId(null)
  }

  const handleDrop = (status: CaseStatus) => {
    if (draggingId) {
      onCaseUpdate(draggingId, { status })
    }
  }

  // Get color for status
  const getStatusColor = (status: CaseStatus) => {
    switch (status) {
      case "Open":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "In Progress":
        return "bg-purple-100 text-purple-800 border-purple-300"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "Closed":
        return "bg-green-100 text-green-800 border-green-300"
      case "Escalated":
        return "bg-red-100 text-red-800 border-red-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
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

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {CASE_STATUSES.map(status => (
        <div 
          key={status}
          className="flex-shrink-0 w-80"
          onDragOver={e => e.preventDefault()}
          onDrop={() => handleDrop(status)}
        >
          <div className={`p-2 rounded-t-md ${getStatusColor(status)}`}>
            <h3 className="font-medium px-2">{status}</h3>
            <div className="text-xs px-2">{casesByStatus[status]?.length || 0} cases</div>
          </div>
          <div className="bg-muted/40 rounded-b-md p-2 min-h-[500px]">
            {casesByStatus[status]?.map(caseItem => (
              <motion.div
                key={caseItem.id}
                draggable
                onDragStart={() => handleDragStart(caseItem.id)}
                onDragEnd={handleDragEnd}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="mb-2"
              >
                <Card className="shadow-sm hover:shadow cursor-grab active:cursor-grabbing">
                  <CardHeader className="p-3 pb-0">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-sm font-medium">{caseItem.title}</CardTitle>
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
                    </div>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="text-xs text-muted-foreground mb-2">{caseItem.id}</div>
                    {caseItem.description && (
                      <p className="text-sm mb-2 line-clamp-2">{caseItem.description}</p>
                    )}
                    <div className="flex justify-between items-center mb-2">
                      <Badge
                        variant="outline"
                        className={getPriorityColor(caseItem.priority)}
                      >
                        {caseItem.priority}
                      </Badge>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {caseItem.lastUpdated}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={`/avatars/${caseItem.assignedTo.toLowerCase().replace(' ', '-')}.jpg`} alt={caseItem.assignedTo} />
                        <AvatarFallback className="text-xs">{getInitials(caseItem.assignedTo)}</AvatarFallback>
                      </Avatar>
                      {caseItem.dueDate && (
                        <div className="flex items-center text-xs">
                          <AlertCircle className="h-3 w-3 mr-1 text-red-500" />
                          Due: {caseItem.dueDate}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
} 