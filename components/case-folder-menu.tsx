"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FolderOpen, Star, Share2, Clock } from "lucide-react"

export function CaseFolderMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Case Folders</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Case Folders</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Clock className="mr-2 h-4 w-4" />
          <span>Recent</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Star className="mr-2 h-4 w-4" />
          <span>Favorites</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Share2 className="mr-2 h-4 w-4" />
          <span>Shared</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <FolderOpen className="mr-2 h-4 w-4" />
          <span>All Cases</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

