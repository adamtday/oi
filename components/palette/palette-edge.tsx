"use client"

import { useMemo } from "react"
import { EdgeData, NodeData } from "./palette-types"

interface PaletteEdgeProps {
  edge: EdgeData
  nodes: NodeData[]
  selected: boolean
  onClick: () => void
}

export function PaletteEdge({ edge, nodes, selected, onClick }: PaletteEdgeProps) {
  // Find source and target nodes
  const sourceNode = useMemo(() => nodes.find(n => n.id === edge.source), [nodes, edge.source])
  const targetNode = useMemo(() => nodes.find(n => n.id === edge.target), [nodes, edge.target])
  
  // If either node is missing, don't render the edge
  if (!sourceNode || !targetNode) {
    return null
  }
  
  // Calculate edge path
  const path = useMemo(() => {
    // Node dimensions (approximate)
    const nodeWidth = 120
    const nodeHeight = 80
    
    // Calculate center points of nodes
    const sourceX = sourceNode.position.x + nodeWidth / 2
    const sourceY = sourceNode.position.y + nodeHeight / 2
    const targetX = targetNode.position.x + nodeWidth / 2
    const targetY = targetNode.position.y + nodeHeight / 2
    
    // Calculate direction vector
    const dx = targetX - sourceX
    const dy = targetY - sourceY
    const length = Math.sqrt(dx * dx + dy * dy)
    
    // Normalize direction vector
    const ndx = dx / length
    const ndy = dy / length
    
    // Calculate edge start and end points (offset from node centers)
    const startX = sourceX + ndx * (nodeWidth / 2)
    const startY = sourceY + ndy * (nodeHeight / 2)
    const endX = targetX - ndx * (nodeWidth / 2)
    const endY = targetY - ndy * (nodeHeight / 2)
    
    // Calculate control points for curved edge
    const controlPointOffset = 50
    const controlX1 = startX + ndx * controlPointOffset
    const controlY1 = startY + ndy * controlPointOffset
    const controlX2 = endX - ndx * controlPointOffset
    const controlY2 = endY - ndy * controlPointOffset
    
    // Calculate midpoint for label
    const midX = (startX + endX) / 2
    const midY = (startY + endY) / 2
    
    return {
      path: `M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`,
      labelPosition: { x: midX, y: midY }
    }
  }, [sourceNode.position, targetNode.position])
  
  // Get edge color based on type
  const getEdgeColor = () => {
    switch (edge.type) {
      case 'relationship':
        return 'stroke-blue-500'
      case 'ownership':
        return 'stroke-purple-500'
      case 'transaction':
        return 'stroke-green-500'
      case 'communication':
        return 'stroke-yellow-500'
      case 'travel':
        return 'stroke-orange-500'
      case 'access':
        return 'stroke-red-500'
      case 'employment':
        return 'stroke-pink-500'
      case 'location':
        return 'stroke-cyan-500'
      default:
        return 'stroke-gray-500'
    }
  }
  
  // Handle edge click
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClick()
  }
  
  return (
    <g className="palette-edge" onClick={handleClick}>
      {/* Edge Path */}
      <path
        d={path.path}
        fill="none"
        className={`
          ${getEdgeColor()}
          ${selected ? 'stroke-[3px]' : 'stroke-[2px]'}
          transition-all duration-200
        `}
        markerEnd="url(#arrowhead)"
      />
      
      {/* Edge Label */}
      <foreignObject
        x={path.labelPosition.x - 50}
        y={path.labelPosition.y - 15}
        width={100}
        height={30}
        className="overflow-visible pointer-events-none"
      >
        <div 
          className={`
            px-2 py-1 rounded-md text-xs font-medium text-center
            ${selected ? 'bg-blue-100 dark:bg-blue-900' : 'bg-white/80 dark:bg-gray-800/80'}
            ${selected ? 'ring-2 ring-blue-500' : ''}
            shadow-sm backdrop-blur-sm
          `}
        >
          {edge.label}
        </div>
      </foreignObject>
      
      {/* Invisible wider path for easier clicking */}
      <path
        d={path.path}
        fill="none"
        stroke="transparent"
        strokeWidth={10}
        className="cursor-pointer"
        onClick={handleClick}
      />
    </g>
  )
} 