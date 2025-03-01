"use client"

import { 
  Plus, 
  Minus, 
  Maximize, 
  Minimize, 
  PanelLeft, 
  MessageSquare 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface PaletteControlsProps {
  zoom: number
  onZoomIn: () => void
  onZoomOut: () => void
  onZoomReset: () => void
  onToggleSidebar: () => void
  showSidebar: boolean
  onToggleComments: () => void
  showComments: boolean
}

export function PaletteControls({
  zoom,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  onToggleSidebar,
  showSidebar,
  onToggleComments,
  showComments
}: PaletteControlsProps) {
  return (
    <div className="absolute bottom-4 left-4 flex flex-col space-y-2 bg-background/80 backdrop-blur-sm p-1 rounded-lg border shadow-sm">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={onZoomIn} aria-label="Zoom In">
              <Plus className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Zoom In</p>
          </TooltipContent>
        </Tooltip>
      
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={onZoomOut} aria-label="Zoom Out">
              <Minus className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Zoom Out</p>
          </TooltipContent>
        </Tooltip>
      
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={onZoomReset} aria-label="Reset Zoom">
              {zoom > 1 ? (
                <Minimize className="h-4 w-4" />
              ) : (
                <Maximize className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Reset Zoom</p>
          </TooltipContent>
        </Tooltip>
      
        <div className="border-t my-1"></div>
      
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onToggleSidebar}
              className={showSidebar ? "bg-muted" : ""}
              aria-label={showSidebar ? "Hide Sidebar" : "Show Sidebar"}
            >
              <PanelLeft className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{showSidebar ? "Hide Sidebar" : "Show Sidebar"}</p>
          </TooltipContent>
        </Tooltip>
      
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onToggleComments}
              className={showComments ? "bg-muted" : ""}
              aria-label={showComments ? "Hide Comments" : "Show Comments"}
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{showComments ? "Hide Comments" : "Show Comments"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <div className="text-xs text-center font-mono mt-1">
        {Math.round(zoom * 100)}%
      </div>
    </div>
  )
} 