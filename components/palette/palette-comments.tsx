"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { X } from "lucide-react"
import { NodeData, EdgeData, Comment } from "./palette-types"

interface PaletteCommentsProps {
  caseId?: string
  selectedNode: NodeData | null
  selectedEdge: EdgeData | null
  onClose: () => void
}

export function PaletteComments({
  caseId,
  selectedNode,
  selectedEdge,
  onClose
}: PaletteCommentsProps) {
  const [newComment, setNewComment] = useState("")
  
  // Mock comments data
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "comment-1",
      userId: "user-1",
      userName: "Alex Johnson",
      userAvatar: "/avatars/alex-johnson.jpg",
      text: "This node appears to be connected to multiple financial transactions. We should investigate further.",
      timestamp: "2023-06-15T14:30:00Z",
      targetId: "node-1",
      targetType: "node"
    },
    {
      id: "comment-2",
      userId: "user-2",
      userName: "Sarah Williams",
      userAvatar: "/avatars/sarah-williams.jpg",
      text: "I've cross-referenced this with our database and found additional connections.",
      timestamp: "2023-06-15T15:45:00Z",
      targetId: "edge-1",
      targetType: "edge"
    },
    {
      id: "comment-3",
      userId: "user-1",
      userName: "Alex Johnson",
      userAvatar: "/avatars/alex-johnson.jpg",
      text: "The ownership percentage seems to have changed recently. Previous records show 35%.",
      timestamp: "2023-06-16T09:15:00Z",
      targetId: "edge-1",
      targetType: "edge"
    }
  ])
  
  // Filter comments for selected node or edge
  const filteredComments = comments.filter(comment => {
    if (selectedNode) {
      return comment.targetId === selectedNode.id && comment.targetType === "node"
    }
    if (selectedEdge) {
      return comment.targetId === selectedEdge.id && comment.targetType === "edge"
    }
    return true // Show all if nothing selected
  })
  
  // Handle adding a new comment
  const handleAddComment = () => {
    if (!newComment.trim()) return
    
    const targetId = selectedNode ? selectedNode.id : selectedEdge ? selectedEdge.id : undefined
    const targetType = selectedNode ? "node" : selectedEdge ? "edge" : undefined
    
    const comment: Comment = {
      id: `comment-${Date.now()}`,
      userId: "current-user", // In a real app, this would be the current user's ID
      userName: "Current User", // In a real app, this would be the current user's name
      userAvatar: "/avatars/current-user.jpg", // In a real app, this would be the current user's avatar
      text: newComment,
      timestamp: new Date().toISOString(),
      targetId,
      targetType: targetType as "node" | "edge" | undefined
    }
    
    setComments(prev => [comment, ...prev])
    setNewComment("")
  }
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }
  
  return (
    <div className="w-80 border-l bg-background flex flex-col h-full">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Comments
          {selectedNode && <span className="ml-2 text-sm text-muted-foreground">on node</span>}
          {selectedEdge && <span className="ml-2 text-sm text-muted-foreground">on connection</span>}
        </h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="p-4 border-b">
        <Textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[100px] resize-none"
        />
        <div className="mt-2 flex justify-end">
          <Button 
            onClick={handleAddComment}
            disabled={!newComment.trim()}
          >
            Add Comment
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        {filteredComments.length > 0 ? (
          <div className="space-y-4">
            {filteredComments.map(comment => (
              <div key={comment.id} className="space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.userAvatar} alt={comment.userName} />
                      <AvatarFallback>{comment.userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">{comment.userName}</div>
                      <div className="text-xs text-muted-foreground">{formatDate(comment.timestamp)}</div>
                    </div>
                  </div>
                  {comment.targetType && (
                    <Badge variant="outline" className="text-xs">
                      {comment.targetType === "node" ? "Node" : "Connection"}
                    </Badge>
                  )}
                </div>
                <p className="text-sm pl-10">{comment.text}</p>
                <Separator className="mt-2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center space-y-2">
              <p className="text-muted-foreground">
                {selectedNode || selectedEdge ? 
                  "No comments on this item yet" : 
                  "Select a node or connection to view its comments"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 