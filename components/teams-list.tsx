"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, UserPlus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const mockTeams = [
  {
    id: 1,
    name: "Alpha Team",
    description: "Specialized in financial investigations",
    members: [
      { name: "John Doe", avatar: "/avatars/john-doe.jpg" },
      { name: "Jane Smith", avatar: "/avatars/jane-smith.jpg" },
      { name: "Bob Johnson", avatar: "/avatars/bob-johnson.jpg" },
    ],
  },
  {
    id: 2,
    name: "Beta Squad",
    description: "Focused on cybercrime investigations",
    members: [
      { name: "Alice Williams", avatar: "/avatars/alice-williams.jpg" },
      { name: "Charlie Brown", avatar: "/avatars/charlie-brown.jpg" },
    ],
  },
  {
    id: 3,
    name: "Gamma Unit",
    description: "Handles international cases",
    members: [
      { name: "David Lee", avatar: "/avatars/david-lee.jpg" },
      { name: "Eva Garcia", avatar: "/avatars/eva-garcia.jpg" },
      { name: "Frank White", avatar: "/avatars/frank-white.jpg" },
      { name: "Grace Kim", avatar: "/avatars/grace-kim.jpg" },
    ],
  },
]

export function TeamsList() {
  const [teams, setTeams] = useState(mockTeams)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {teams.map((team) => (
        <Card key={team.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{team.name}</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>Edit Team</DropdownMenuItem>
                <DropdownMenuItem>Manage Members</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Delete Team</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <CardDescription>{team.description}</CardDescription>
            <div className="mt-4">
              <h4 className="text-sm font-medium">Members</h4>
              <div className="flex -space-x-2 overflow-hidden mt-2">
                {team.members.map((member, index) => (
                  <Avatar key={index} className="inline-block border-2 border-background">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                ))}
                <Button size="icon" variant="outline" className="rounded-full">
                  <UserPlus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <Badge variant="secondary">{team.members.length} members</Badge>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

