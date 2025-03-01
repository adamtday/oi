// Node types
export const NODE_TYPES = [
  'person',
  'organization',
  'location',
  'device',
  'financial',
  'document',
  'event',
  'digital',
  'custom'
] as const

export type NodeType = typeof NODE_TYPES[number]

// Edge types
export const EDGE_TYPES = [
  'relationship',
  'ownership',
  'transaction',
  'communication',
  'travel',
  'access',
  'employment',
  'location',
  'custom'
] as const

export type EdgeType = typeof EDGE_TYPES[number]

// Position type
export interface Position {
  x: number
  y: number
}

// Node data
export interface NodeData {
  id: string
  type: NodeType
  label: string
  position: Position
  data: Record<string, any>
}

// Edge data
export interface EdgeData {
  id: string
  source: string
  target: string
  type: EdgeType
  label: string
  data: Record<string, any>
}

// Comment type
export interface Comment {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  text: string
  timestamp: string
  targetId?: string // Node or edge ID
  targetType?: 'node' | 'edge'
  replies?: Comment[]
}

// User type for collaboration
export interface PaletteUser {
  id: string
  name: string
  avatar?: string
  role?: string
  lastActive?: string
}

// Canvas history entry
export interface HistoryEntry {
  id: string
  timestamp: string
  userId: string
  userName: string
  action: 'create' | 'update' | 'delete'
  targetType: 'node' | 'edge' | 'canvas'
  targetId?: string
  details?: string
}

// Search result
export interface SearchResult {
  id: string
  type: 'node' | 'edge'
  label: string
  matchField: string
  matchText: string
  nodeType?: NodeType
  edgeType?: EdgeType
}

// Filter options
export interface FilterOptions {
  nodeTypes?: NodeType[]
  edgeTypes?: EdgeType[]
  users?: string[]
  dateRange?: {
    start?: string
    end?: string
  }
  searchText?: string
}

// Canvas view settings
export interface ViewSettings {
  showLabels: boolean
  showEdgeLabels: boolean
  showImages: boolean
  theme: 'light' | 'dark' | 'system'
  layout: 'free' | 'force' | 'hierarchical' | 'circular'
}

// Canvas state for saving/loading
export interface CanvasState {
  nodes: NodeData[]
  edges: EdgeData[]
  viewSettings: ViewSettings
  lastModified: string
  modifiedBy: string
} 