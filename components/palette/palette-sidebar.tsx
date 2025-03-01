"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { NodeData, EdgeData, NodeType, EdgeType } from "./palette-types"

interface PaletteSidebarProps {
  caseId?: string
  selectedNode: NodeData | null
  selectedEdge: EdgeData | null
  onNodeUpdate: (id: string, data: Partial<NodeData>) => void
  onEdgeUpdate: (id: string, data: Partial<EdgeData>) => void
  onDeleteNode: (id: string) => void
  onDeleteEdge: (id: string) => void
}

export function PaletteSidebar({
  caseId,
  selectedNode,
  selectedEdge,
  onNodeUpdate,
  onEdgeUpdate,
  onDeleteNode,
  onDeleteEdge
}: PaletteSidebarProps) {
  const [activeTab, setActiveTab] = useState("details")
  
  // Handle node label change
  const handleNodeLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedNode) return
    onNodeUpdate(selectedNode.id, { label: e.target.value })
  }
  
  // Handle node type change
  const handleNodeTypeChange = (value: NodeType) => {
    if (!selectedNode) return
    onNodeUpdate(selectedNode.id, { type: value })
  }
  
  // Handle edge label change
  const handleEdgeLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedEdge) return
    onEdgeUpdate(selectedEdge.id, { label: e.target.value })
  }
  
  // Handle edge type change
  const handleEdgeTypeChange = (value: EdgeType) => {
    if (!selectedEdge) return
    onEdgeUpdate(selectedEdge.id, { type: value })
  }
  
  // Handle delete node
  const handleDeleteNode = () => {
    if (!selectedNode) return
    onDeleteNode(selectedNode.id)
  }
  
  // Handle delete edge
  const handleDeleteEdge = () => {
    if (!selectedEdge) return
    onDeleteEdge(selectedEdge.id)
  }
  
  return (
    <div className="w-80 border-r bg-background flex flex-col h-full">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">
          {selectedNode ? "Node Details" : selectedEdge ? "Edge Details" : "Palette Inspector"}
        </h3>
        <p className="text-sm text-muted-foreground">
          {selectedNode ? "Edit node properties" : selectedEdge ? "Edit connection properties" : "Select a node or edge to edit"}
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="border-b px-4">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
        </div>
        
        <div className="flex-1 overflow-auto p-4">
          <TabsContent value="details" className="mt-0 h-full">
            {selectedNode && (
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Node Properties</CardTitle>
                    <CardDescription>Basic information about this node</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="node-label">Label</Label>
                      <Input 
                        id="node-label" 
                        value={selectedNode.label} 
                        onChange={handleNodeLabelChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="node-type">Type</Label>
                      <Select 
                        value={selectedNode.type} 
                        onValueChange={handleNodeTypeChange}
                      >
                        <SelectTrigger id="node-type">
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
                    
                    <div className="space-y-2">
                      <Label htmlFor="node-id">ID</Label>
                      <Input id="node-id" value={selectedNode.id} readOnly />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="destructive" 
                      onClick={handleDeleteNode}
                    >
                      Delete Node
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}
            
            {selectedEdge && (
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Connection Properties</CardTitle>
                    <CardDescription>Basic information about this connection</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="edge-label">Label</Label>
                      <Input 
                        id="edge-label" 
                        value={selectedEdge.label} 
                        onChange={handleEdgeLabelChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="edge-type">Type</Label>
                      <Select 
                        value={selectedEdge.type} 
                        onValueChange={handleEdgeTypeChange}
                      >
                        <SelectTrigger id="edge-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="relationship">Relationship</SelectItem>
                          <SelectItem value="ownership">Ownership</SelectItem>
                          <SelectItem value="transaction">Transaction</SelectItem>
                          <SelectItem value="communication">Communication</SelectItem>
                          <SelectItem value="travel">Travel</SelectItem>
                          <SelectItem value="access">Access</SelectItem>
                          <SelectItem value="employment">Employment</SelectItem>
                          <SelectItem value="location">Location</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="edge-source">Source</Label>
                      <Input id="edge-source" value={selectedEdge.source} readOnly />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="edge-target">Target</Label>
                      <Input id="edge-target" value={selectedEdge.target} readOnly />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="edge-id">ID</Label>
                      <Input id="edge-id" value={selectedEdge.id} readOnly />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="destructive" 
                      onClick={handleDeleteEdge}
                    >
                      Delete Connection
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}
            
            {!selectedNode && !selectedEdge && (
              <div className="h-full flex items-center justify-center">
                <div className="text-center space-y-2">
                  <p className="text-muted-foreground">
                    Select a node or connection to view and edit its details
                  </p>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="data" className="mt-0 h-full">
            {(selectedNode || selectedEdge) ? (
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Custom Data</CardTitle>
                    <CardDescription>Additional data for this {selectedNode ? "node" : "connection"}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea 
                      className="min-h-[200px] font-mono text-sm"
                      value={JSON.stringify(selectedNode ? selectedNode.data : selectedEdge?.data, null, 2)}
                      readOnly
                    />
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center space-y-2">
                  <p className="text-muted-foreground">
                    Select a node or connection to view its data
                  </p>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="history" className="mt-0 h-full">
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>History</CardTitle>
                  <CardDescription>Recent changes to this {selectedNode ? "node" : selectedEdge ? "connection" : "canvas"}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Mock history entries */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>AJ</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">Alex Johnson</span>
                        </div>
                        <Badge variant="outline" className="text-xs">1 hour ago</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {selectedNode ? "Updated node label" : selectedEdge ? "Changed connection type" : "Added new node"}
                      </p>
                      <Separator />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>SW</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">Sarah Williams</span>
                        </div>
                        <Badge variant="outline" className="text-xs">3 hours ago</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {selectedNode ? "Added node to canvas" : selectedEdge ? "Created connection" : "Rearranged nodes"}
                      </p>
                      <Separator />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
} 