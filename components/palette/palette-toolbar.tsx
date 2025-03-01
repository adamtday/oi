"use client"

import { useState } from "react"
import { 
  Plus, 
  Save, 
  Share2, 
  History, 
  Download, 
  Upload, 
  Search, 
  Filter, 
  User, 
  Building2, 
  MapPin, 
  Smartphone, 
  Banknote, 
  FileText, 
  Calendar, 
  Globe, 
  Box 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { NodeType, Position } from "./palette-types"

interface PaletteToolbarProps {
  onSave: () => void
  onAddNode: (type: NodeType, position: Position) => void
  readOnly?: boolean
}

export function PaletteToolbar({ onSave, onAddNode, readOnly = false }: PaletteToolbarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  
  // Handle add node
  const handleAddNode = (type: NodeType) => {
    // Add node to center of visible canvas
    const canvasWidth = window.innerWidth
    const canvasHeight = window.innerHeight
    const position = {
      x: canvasWidth / 2 - 60, // Half node width
      y: canvasHeight / 2 - 40  // Half node height
    }
    onAddNode(type, position)
  }
  
  // Get icon for node type
  const getNodeTypeIcon = (type: NodeType) => {
    switch (type) {
      case 'person':
        return <User className="h-4 w-4 mr-2" />
      case 'organization':
        return <Building2 className="h-4 w-4 mr-2" />
      case 'location':
        return <MapPin className="h-4 w-4 mr-2" />
      case 'device':
        return <Smartphone className="h-4 w-4 mr-2" />
      case 'financial':
        return <Banknote className="h-4 w-4 mr-2" />
      case 'document':
        return <FileText className="h-4 w-4 mr-2" />
      case 'event':
        return <Calendar className="h-4 w-4 mr-2" />
      case 'digital':
        return <Globe className="h-4 w-4 mr-2" />
      default:
        return <Box className="h-4 w-4 mr-2" />
    }
  }
  
  return (
    <div className="flex items-center justify-between p-2 border-b bg-background">
      {/* Left Section */}
      <div className="flex items-center space-x-2">
        {!readOnly && (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Node
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem onClick={() => handleAddNode('person')}>
                        {getNodeTypeIcon('person')}
                        <span>Person</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAddNode('organization')}>
                        {getNodeTypeIcon('organization')}
                        <span>Organization</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAddNode('location')}>
                        {getNodeTypeIcon('location')}
                        <span>Location</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAddNode('device')}>
                        {getNodeTypeIcon('device')}
                        <span>Device</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAddNode('financial')}>
                        {getNodeTypeIcon('financial')}
                        <span>Financial</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAddNode('document')}>
                        {getNodeTypeIcon('document')}
                        <span>Document</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAddNode('event')}>
                        {getNodeTypeIcon('event')}
                        <span>Event</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAddNode('digital')}>
                        {getNodeTypeIcon('digital')}
                        <span>Digital</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAddNode('custom')}>
                        {getNodeTypeIcon('custom')}
                        <span>Custom</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add a new node to the canvas</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" onClick={onSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Save the current canvas state</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        )}
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share this canvas with others</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                <History className="h-4 w-4 mr-2" />
                History
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View canvas history and changes</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      {/* Center Section - Title */}
      <div className="flex-1 text-center">
        <h2 className="text-lg font-semibold">Palette Canvas</h2>
      </div>
      
      {/* Right Section */}
      <div className="flex items-center space-x-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search canvas..."
            className="h-9 w-[200px] rounded-md border border-input bg-background px-8 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Filter nodes and connections</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Export canvas as image or data</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {!readOnly && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Import data into canvas</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  )
} 