"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { NodeData, Position } from "./palette-types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
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

interface PaletteNodeProps {
  node: NodeData
  selected: boolean
  onClick: () => void
  onDrag: (position: Position) => void
  readOnly?: boolean
}

export function PaletteNode({ 
  node, 
  selected, 
  onClick, 
  onDrag,
  readOnly = false 
}: PaletteNodeProps) {
  const nodeRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 })
  const [nodePosition, setNodePosition] = useState<Position>(node.position)
  
  // Update position when node.position changes
  useEffect(() => {
    setNodePosition(node.position)
  }, [node.position])
  
  // Handle mouse down for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (readOnly) return
    e.stopPropagation()
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
  }
  
  // Handle mouse move for dragging
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.stopPropagation()
    const dx = e.clientX - dragStart.x
    const dy = e.clientY - dragStart.y
    const newPosition = {
      x: nodePosition.x + dx,
      y: nodePosition.y + dy
    }
    setNodePosition(newPosition)
    setDragStart({ x: e.clientX, y: e.clientY })
    onDrag(newPosition)
  }
  
  // Handle mouse up for dragging
  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.stopPropagation()
    setIsDragging(false)
  }
  
  // Handle click
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClick()
  }
  
  // Get node icon based on type
  const getNodeIcon = () => {
    switch (node.type) {
      case 'person':
        return <User className="h-5 w-5" />
      case 'organization':
        return <Building2 className="h-5 w-5" />
      case 'location':
        return <MapPin className="h-5 w-5" />
      case 'device':
        return <Smartphone className="h-5 w-5" />
      case 'financial':
        return <Banknote className="h-5 w-5" />
      case 'document':
        return <FileText className="h-5 w-5" />
      case 'event':
        return <Calendar className="h-5 w-5" />
      case 'digital':
        return <Globe className="h-5 w-5" />
      default:
        return <Box className="h-5 w-5" />
    }
  }
  
  // Get node color based on type
  const getNodeColor = () => {
    switch (node.type) {
      case 'person':
        return 'bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
      case 'organization':
        return 'bg-purple-100 border-purple-500 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
      case 'location':
        return 'bg-green-100 border-green-500 text-green-700 dark:bg-green-950 dark:text-green-300'
      case 'device':
        return 'bg-gray-100 border-gray-500 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
      case 'financial':
        return 'bg-yellow-100 border-yellow-500 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300'
      case 'document':
        return 'bg-orange-100 border-orange-500 text-orange-700 dark:bg-orange-950 dark:text-orange-300'
      case 'event':
        return 'bg-red-100 border-red-500 text-red-700 dark:bg-red-950 dark:text-red-300'
      case 'digital':
        return 'bg-cyan-100 border-cyan-500 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300'
      default:
        return 'bg-slate-100 border-slate-500 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
    }
  }
  
  // Determine if node has an image
  const hasImage = node.type === 'person' && node.data?.image
  
  return (
    <motion.div
      ref={nodeRef}
      className={`absolute cursor-pointer select-none ${isDragging ? 'z-50' : 'z-10'}`}
      style={{
        left: nodePosition.x,
        top: nodePosition.y,
        touchAction: 'none'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div 
        className={`
          flex flex-col items-center p-2 rounded-lg border-2 shadow-md
          ${getNodeColor()}
          ${selected ? 'ring-2 ring-offset-2 ring-blue-500 dark:ring-blue-400' : ''}
          ${isDragging ? 'shadow-lg' : ''}
        `}
        style={{ minWidth: '120px', maxWidth: '180px' }}
      >
        {/* Node Header */}
        <div className="flex items-center justify-center w-full mb-1">
          {hasImage ? (
            <Avatar className="h-12 w-12 border-2 border-white dark:border-gray-800">
              <AvatarImage src={node.data.image} alt={node.label} />
              <AvatarFallback>{node.label.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          ) : (
            <div className={`
              flex items-center justify-center h-12 w-12 rounded-full 
              bg-white dark:bg-gray-800 text-current
            `}>
              {getNodeIcon()}
            </div>
          )}
        </div>
        
        {/* Node Label */}
        <div className="text-center font-medium truncate w-full">
          {node.label}
        </div>
        
        {/* Node Details (if selected) */}
        {selected && node.data && (
          <div className="mt-2 text-xs text-center w-full">
            {node.data.role && (
              <div className="font-semibold">{node.data.role}</div>
            )}
            {node.data.details && (
              <div className="mt-1 opacity-80">{node.data.details}</div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
} 