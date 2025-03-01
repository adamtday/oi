"use client"

// @ts-nocheck - Temporarily disable TypeScript checking for this file
// See README.md for long-term solutions to TypeScript configuration issues

/// <reference path="./palette-canvas.d.ts" />

import * as React from "react"
import { motion } from "framer-motion"
import * as Icons from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PaletteNode } from "@/components/palette/palette-node"
import { PaletteEdge } from "@/components/palette/palette-edge"
import { PaletteToolbar } from "@/components/palette/palette-toolbar"
import { PaletteSidebar } from "@/components/palette/palette-sidebar"
import { PaletteControls } from "@/components/palette/palette-controls"
import { PaletteComments } from "@/components/palette/palette-comments"
import { 
  NodeType, 
  EdgeType, 
  NodeData, 
  EdgeData, 
  Position, 
  CanvasState, 
  ViewSettings,
  PaletteUser
} from "@/components/palette/palette-types"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"

interface PaletteCanvasProps {
  initialState?: CanvasState
  readOnly?: boolean
  onSave?: (state: CanvasState) => void
  caseId?: string
}

interface PaletteNodeProps {
  node: NodeData
  selected: boolean
  onClick: () => void
  onDrag?: (position: Position) => void
  readOnly?: boolean
}

// Define event types
type DivMouseEvent = React.MouseEvent<HTMLDivElement>
type InputChangeEvent = React.ChangeEvent<HTMLInputElement>

export function PaletteCanvas({ 
  initialState, 
  readOnly = false, 
  onSave, 
  caseId 
}: PaletteCanvasProps) {
  console.log("PaletteCanvas component rendered - TEST CHANGE");
  
  const canvasRef = React.useRef<HTMLDivElement>(null)
  const [nodes, setNodes] = React.useState<NodeData[]>(initialState?.nodes || DEMO_NODES)
  const [edges, setEdges] = React.useState<EdgeData[]>(initialState?.edges || DEMO_EDGES)
  const [selectedNodeId, setSelectedNodeId] = React.useState<string | null>(null)
  const [selectedEdgeId, setSelectedEdgeId] = React.useState<string | null>(null)
  const [zoom, setZoom] = React.useState(1)
  const [position, setPosition] = React.useState<Position>({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = React.useState(false)
  const [startDragPosition, setStartDragPosition] = React.useState<Position>({ x: 0, y: 0 })
  const [showSidebar, setShowSidebar] = React.useState(true)
  const [showComments, setShowComments] = React.useState(false)
  const [activeUsers] = React.useState<PaletteUser[]>([
    { id: "user1", name: "Alex Johnson", avatar: "/avatars/alex-johnson.jpg" },
    { id: "user2", name: "Sarah Williams", avatar: "/avatars/sarah-williams.jpg" }
  ])
  const [isConnecting, setIsConnecting] = React.useState(false)
  const [connectionSource, setConnectionSource] = React.useState<string | null>(null)
  const [showNodeDialog, setShowNodeDialog] = React.useState(false)
  const [showEdgeDialog, setShowEdgeDialog] = React.useState(false)
  const [newNodeData, setNewNodeData] = React.useState<Partial<NodeData>>({})
  const [newEdgeData, setNewEdgeData] = React.useState<Partial<EdgeData>>({})
  
  // Center the graph on initial load
  React.useEffect(() => {
    if (canvasRef.current && nodes.length > 0) {
      // Calculate the center of all nodes
      const totalNodes = nodes.length;
      const sumX = nodes.reduce((sum, node) => sum + node.position.x, 0);
      const sumY = nodes.reduce((sum, node) => sum + node.position.y, 0);
      
      const centerX = sumX / totalNodes;
      const centerY = sumY / totalNodes;
      
      // Get the canvas dimensions
      const canvasWidth = canvasRef.current.clientWidth;
      const canvasHeight = canvasRef.current.clientHeight;
      
      // Set position to center the graph
      setPosition({
        x: (canvasWidth / 2) - centerX,
        y: (canvasHeight / 2) - centerY
      });
    }
  }, [nodes]);
  
  // Handle canvas drag
  const handleCanvasMouseDown = React.useCallback((e: DivMouseEvent) => {
    // Only start dragging on left mouse button (0)
    if (e.button !== 0) return
    
    // Prevent default behavior to avoid text selection during drag
    e.preventDefault()
    
    setIsDragging(true)
    setStartDragPosition({ x: e.clientX, y: e.clientY })
  }, [])
  
  const handleCanvasMouseMove = React.useCallback((e: DivMouseEvent) => {
    if (!isDragging) return
    
    // Calculate the distance moved
    const dx = e.clientX - startDragPosition.x
    const dy = e.clientY - startDragPosition.y
    
    // Update the position
    setPosition((prev: Position) => ({ 
      x: prev.x + dx, 
      y: prev.y + dy 
    }))
    
    // Update the start position for the next move event
    setStartDragPosition({ x: e.clientX, y: e.clientY })
  }, [isDragging, startDragPosition])
  
  const handleCanvasMouseUp = React.useCallback(() => {
    setIsDragging(false)
  }, [])
  
  // Handle zoom
  const handleZoomIn = React.useCallback(() => {
    setZoom((prev: number) => Math.min(prev + 0.1, 2))
  }, [])
  
  const handleZoomOut = React.useCallback(() => {
    setZoom((prev: number) => Math.max(prev - 0.1, 0.5))
  }, [])
  
  const handleZoomReset = React.useCallback(() => {
    setZoom(1)
    
    // Center the graph when resetting zoom
    if (canvasRef.current && nodes.length > 0) {
      const totalNodes = nodes.length;
      const sumX = nodes.reduce((sum, node) => sum + node.position.x, 0);
      const sumY = nodes.reduce((sum, node) => sum + node.position.y, 0);
      
      const centerX = sumX / totalNodes;
      const centerY = sumY / totalNodes;
      
      const canvasWidth = canvasRef.current.clientWidth;
      const canvasHeight = canvasRef.current.clientHeight;
      
      setPosition({
        x: (canvasWidth / 2) - centerX,
        y: (canvasHeight / 2) - centerY
      });
    }
  }, [nodes])
  
  // Handle node selection
  const handleNodeClick = React.useCallback((nodeId: string) => {
    if (isConnecting) {
      // If we're connecting and already have a source, create an edge
      if (connectionSource && connectionSource !== nodeId) {
        const newEdge: EdgeData = {
          id: `edge-${Date.now()}`,
          source: connectionSource,
          target: nodeId,
          type: 'relationship',
          label: 'Connected to',
          data: {}
        }
        setEdges((prev: EdgeData[]) => [...prev, newEdge])
        setIsConnecting(false)
        setConnectionSource(null)
        return
      }
      
      // Start connection from this node
      setConnectionSource(nodeId)
      return
    }
    
    setSelectedNodeId((prev: string | null) => prev === nodeId ? null : nodeId)
    setSelectedEdgeId(null)
  }, [isConnecting, connectionSource])
  
  // Handle edge selection
  const handleEdgeClick = React.useCallback((edgeId: string) => {
    setSelectedEdgeId((prev: string | null) => prev === edgeId ? null : edgeId)
    setSelectedNodeId(null)
  }, [])
  
  // Handle node position update
  const handleNodePositionChange = React.useCallback((nodeId: string, position: Position) => {
    setNodes((prev: NodeData[]) => 
      prev.map((node: NodeData) => 
        node.id === nodeId 
          ? { ...node, position } 
          : node
      )
    )
  }, [])
  
  // Handle adding a new node
  const handleAddNode = React.useCallback((type: NodeType, position: Position) => {
    setNodes((prev: NodeData[]) => [...prev, {
      id: `node-${Date.now()}`,
      type,
      label: `New ${type}`,
      position,
      data: {}
    }])
  }, [])
  
  // Handle saving the canvas
  const handleSave = React.useCallback(() => {
    if (onSave) {
      onSave({
        nodes,
        edges,
        viewSettings: {
          showLabels: true,
          showEdgeLabels: true,
          showImages: true,
          theme: 'light',
          layout: 'free',
          pan: position,
          zoom
        } as ViewSettings,
        lastModified: new Date().toISOString(),
        modifiedBy: 'current-user' // TODO: Get from auth context
      })
    }
  }, [nodes, edges, onSave, position, zoom])
  
  // Handle deleting selected elements
  const handleDelete = React.useCallback(() => {
    if (selectedNodeId) {
      setNodes((prev: NodeData[]) => prev.filter((node: NodeData) => node.id !== selectedNodeId))
      // Also delete any connected edges
      setEdges((prev: EdgeData[]) => 
        prev.filter((edge: EdgeData) => 
          edge.source !== selectedNodeId && edge.target !== selectedNodeId
        )
      )
      setSelectedNodeId(null)
    }
    
    if (selectedEdgeId) {
      setEdges((prev: EdgeData[]) => prev.filter((edge: EdgeData) => edge.id !== selectedEdgeId))
      setSelectedEdgeId(null)
    }
  }, [selectedNodeId, selectedEdgeId])
  
  // Handle keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (readOnly) return
      
      // Delete key
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedNodeId || selectedEdgeId) {
          handleDelete()
        }
      }
      
      // Escape key
      if (e.key === 'Escape') {
        setSelectedNodeId(null)
        setSelectedEdgeId(null)
        setIsConnecting(false)
        setConnectionSource(null)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [readOnly, selectedNodeId, selectedEdgeId, handleDelete])
  
  // Get selected node
  const selectedNode = selectedNodeId 
    ? nodes.find((node: NodeData) => node.id === selectedNodeId) || null
    : null
  
  // Get selected edge
  const selectedEdge = selectedEdgeId 
    ? edges.find((edge: EdgeData) => edge.id === selectedEdgeId) || null
    : null
  
  // Toggle sidebar
  const toggleSidebar = React.useCallback(() => {
    setShowSidebar((prev: boolean) => !prev)
  }, [])
  
  // Toggle comments
  const toggleComments = React.useCallback(() => {
    setShowComments((prev: boolean) => !prev)
  }, [])

  // Update input handlers
  const handleNodeLabelChange = (e: InputChangeEvent) => 
    setNewNodeData({ ...newNodeData, label: e.target.value })

  const handleEdgeLabelChange = (e: InputChangeEvent) => 
    setNewEdgeData({ ...newEdgeData, label: e.target.value })

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-background">
      {/* Left Sidebar */}
      {showSidebar && (
        <div className="w-80 border-r border-border bg-card">
          <PaletteSidebar 
            caseId={caseId}
            selectedNode={selectedNode}
            selectedEdge={selectedEdge}
            onNodeUpdate={(id, data) => setNodes((prev: NodeData[]) => 
              prev.map((node: NodeData) => 
                node.id === id 
                  ? { ...node, ...data } 
                  : node
              )
            )}
            onEdgeUpdate={(id, data) => setEdges((prev: EdgeData[]) => 
              prev.map((edge: EdgeData) => 
                edge.id === id 
                  ? { ...edge, ...data } 
                  : edge
              )
            )}
            onDeleteNode={handleDelete}
            onDeleteEdge={handleDelete}
          />
        </div>
      )}
      
      {/* Main Canvas */}
      <div className="flex-1 flex flex-col h-full relative">
        {/* Toolbar */}
        <div className="border-b border-border bg-card p-2">
          <PaletteToolbar 
            onSave={handleSave}
            onAddNode={handleAddNode}
            readOnly={readOnly}
          />
        </div>
        
        {/* Canvas */}
        <div 
          ref={canvasRef}
          className="flex-1 relative overflow-hidden bg-slate-900 dark:bg-slate-950"
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
          onMouseLeave={handleCanvasMouseUp}
          style={{ 
            cursor: isDragging ? 'grabbing' : 'grab',
            touchAction: 'none' // Prevent touch scrolling to improve mobile experience
          }}
        >
          {/* Canvas Content */}
          <motion.div
            className="absolute"
            style={{ 
              x: position.x, 
              y: position.y, 
              scale: zoom,
              transformOrigin: '0 0'
            }}
          >
            {/* Render Edges */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {edges.map((edge: EdgeData) => (
                <PaletteEdge
                  key={edge.id}
                  edge={edge}
                  nodes={nodes}
                  selected={edge.id === selectedEdgeId}
                  onClick={() => handleEdgeClick(edge.id)}
                />
              ))}
            </svg>
            
            {/* Render Nodes */}
            {nodes.map((node: NodeData) => (
              <PaletteNode
                key={node.id}
                node={node}
                selected={node.id === selectedNodeId}
                onClick={() => handleNodeClick(node.id)}
                onDrag={(position) => handleNodePositionChange(node.id, position)}
                readOnly={readOnly}
              />
            ))}
          </motion.div>
          
          {/* Canvas Controls */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2 bg-card rounded-lg shadow-lg p-2">
            <PaletteControls
              zoom={zoom}
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              onZoomReset={handleZoomReset}
              onToggleSidebar={toggleSidebar}
              showSidebar={showSidebar}
              onToggleComments={toggleComments}
              showComments={showComments}
            />
          </div>
          
          {/* Active Users */}
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-card rounded-lg shadow-lg p-2">
            <div className="flex -space-x-2">
              {activeUsers.map((user: PaletteUser) => (
                <Tooltip key={user.id}>
                  <TooltipTrigger asChild>
                    <Avatar className="h-8 w-8 border-2 border-background ring-2 ring-primary">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        {user.name.split(' ').map((n: string) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{user.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
            <Badge variant="secondary" className="ml-2">
              {activeUsers.length} active
            </Badge>
          </div>
        </div>
      </div>
      
      {/* Comments Panel */}
      {showComments && (
        <div className="w-80 border-l border-border bg-card">
          <PaletteComments
            caseId={caseId}
            selectedNode={selectedNode}
            selectedEdge={selectedEdge}
            onClose={() => setShowComments(false)}
          />
        </div>
      )}
      
      {/* Connection indicator */}
      {isConnecting && connectionSource && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg">
          Click on another node to connect
        </div>
      )}
      
      {/* Node edit dialog */}
      <Dialog open={showNodeDialog} onOpenChange={setShowNodeDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Node</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="node-label" className="text-right">
                Label
              </Label>
              <Input
                id="node-label"
                value={newNodeData.label || ""}
                onChange={handleNodeLabelChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="node-type" className="text-right">
                Type
              </Label>
              <Select
                value={newNodeData.type}
                onValueChange={(value: NodeType) => 
                  setNewNodeData({ ...newNodeData, type: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="person">Person</SelectItem>
                  <SelectItem value="organization">Organization</SelectItem>
                  <SelectItem value="location">Location</SelectItem>
                  <SelectItem value="device">Device</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                  <SelectItem value="document">Document</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                  <SelectItem value="digital">Digital</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowNodeDialog(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={() => {
                if (selectedNode && newNodeData.label) {
                  setNodes((prev: NodeData[]) => 
                    prev.map((node: NodeData) => 
                      node.id === selectedNode.id 
                        ? { 
                            ...node, 
                            label: newNodeData.label || node.label,
                            type: newNodeData.type as NodeType || node.type
                          } 
                        : node
                    )
                  )
                  setShowNodeDialog(false)
                }
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edge edit dialog */}
      <Dialog open={showEdgeDialog} onOpenChange={setShowEdgeDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Connection</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edge-label" className="text-right">
                Label
              </Label>
              <Input
                id="edge-label"
                value={newEdgeData.label || ""}
                onChange={handleEdgeLabelChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edge-type" className="text-right">
                Type
              </Label>
              <Select
                value={newEdgeData.type}
                onValueChange={(value: EdgeType) => 
                  setNewEdgeData({ ...newEdgeData, type: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relationship">Relationship</SelectItem>
                  <SelectItem value="ownership">Ownership</SelectItem>
                  <SelectItem value="transaction">Transaction</SelectItem>
                  <SelectItem value="communication">Communication</SelectItem>
                  <SelectItem value="association">Association</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowEdgeDialog(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={() => {
                if (selectedEdge && newEdgeData.label) {
                  setEdges((prev: EdgeData[]) => 
                    prev.map((edge: EdgeData) => 
                      edge.id === selectedEdge.id 
                        ? { 
                            ...edge, 
                            label: newEdgeData.label || edge.label,
                            type: newEdgeData.type as EdgeType || edge.type
                          } 
                        : edge
                    )
                  )
                  setShowEdgeDialog(false)
                }
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Demo data
const DEMO_NODES: NodeData[] = [
  {
    id: 'person-1',
    type: 'person',
    label: 'John Doe',
    position: { x: 300, y: 200 },
    data: {
      role: 'Suspect',
      details: 'Primary person of interest',
      image: '/avatars/john-doe.jpg'
    }
  },
  {
    id: 'person-2',
    type: 'person',
    label: 'Jane Smith',
    position: { x: 600, y: 200 },
    data: {
      role: 'Associate',
      details: 'Known associate of John Doe',
      image: '/avatars/jane-smith.jpg'
    }
  },
  {
    id: 'organization-1',
    type: 'organization',
    label: 'XYZ Corporation',
    position: { x: 450, y: 400 },
    data: {
      type: 'Company',
      details: 'Shell company used for transactions'
    }
  },
  {
    id: 'financial-1',
    type: 'financial',
    label: 'Bank Account #12345',
    position: { x: 200, y: 400 },
    data: {
      type: 'Bank Account',
      details: 'Offshore account in Cayman Islands'
    }
  },
  {
    id: 'location-1',
    type: 'location',
    label: 'New York Office',
    position: { x: 700, y: 400 },
    data: {
      address: '123 Wall St, New York, NY',
      details: 'Main office location'
    }
  }
]

const DEMO_EDGES: EdgeData[] = [
  {
    id: 'edge-1',
    source: 'person-1',
    target: 'person-2',
    type: 'relationship',
    label: 'Business Partner',
    data: {
      strength: 'Strong',
      details: 'Long-term business relationship'
    }
  },
  {
    id: 'edge-2',
    source: 'person-1',
    target: 'organization-1',
    type: 'ownership',
    label: 'CEO',
    data: {
      percentage: '51%',
      details: 'Majority shareholder'
    }
  },
  {
    id: 'edge-3',
    source: 'person-2',
    target: 'organization-1',
    type: 'employment',
    label: 'CFO',
    data: {
      details: 'Handles financial operations'
    }
  },
  {
    id: 'edge-4',
    source: 'person-1',
    target: 'financial-1',
    type: 'access',
    label: 'Account Holder',
    data: {
      details: 'Primary account holder'
    }
  },
  {
    id: 'edge-5',
    source: 'organization-1',
    target: 'location-1',
    type: 'location',
    label: 'Headquarters',
    data: {
      details: 'Main business location'
    }
  }
] 