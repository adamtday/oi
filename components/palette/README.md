# Palette: Collaborative Canvas for OSINT Investigations

Palette is a powerful visual analysis tool designed for OSINT (Open Source Intelligence) investigations. It provides a collaborative canvas where investigators can map relationships, connections, and data points to visualize complex networks and information.

## Features

- **Interactive Canvas**: Drag and drop nodes to create visual maps of entities and their relationships
- **Multiple Node Types**: Support for various entity types including people, organizations, locations, devices, financial accounts, and more
- **Relationship Mapping**: Create connections between nodes with different relationship types
- **Collaborative Editing**: Real-time collaboration capabilities for team investigations
- **Case Integration**: Seamlessly integrates with the case management system
- **History Tracking**: View and restore previous versions of the canvas
- **Export/Import**: Share or save your analysis in various formats

## Components

The Palette feature consists of several key components:

- **PaletteCanvas**: The main component that integrates all other components and manages the canvas state
- **PaletteNode**: Represents individual entities on the canvas
- **PaletteEdge**: Visualizes connections between nodes
- **PaletteToolbar**: Provides tools for interacting with the canvas
- **PaletteControls**: Zoom, pan, and other canvas controls
- **PaletteComments**: Allows investigators to add notes and comments to the canvas

## Usage

### Basic Usage

```tsx
import { PaletteCanvas } from "@/components/palette/palette-canvas"

export default function MyPage() {
  return (
    <div className="h-screen">
      <PaletteCanvas />
    </div>
  )
}
```

### With Initial State and Save Handler

```tsx
import { PaletteCanvas } from "@/components/palette/palette-canvas"
import { CanvasState } from "@/components/palette/palette-types"

export default function MyPage() {
  const initialState: CanvasState = {
    nodes: [...],
    edges: [...],
    viewSettings: { zoom: 1, pan: { x: 0, y: 0 } }
  }
  
  const handleSave = (state: CanvasState) => {
    // Save state to database or API
    saveToDatabase(state)
  }
  
  return (
    <div className="h-screen">
      <PaletteCanvas 
        initialState={initialState}
        onSave={handleSave}
      />
    </div>
  )
}
```

### Read-Only Mode

```tsx
<PaletteCanvas readOnly={true} />
```

## Data Structure

The Palette feature uses the following data structures:

### Node

```typescript
interface NodeData {
  id: string
  type: NodeType // 'person', 'organization', etc.
  label: string
  position: Position
  data: Record<string, any>
}
```

### Edge

```typescript
interface EdgeData {
  id: string
  source: string // Node ID
  target: string // Node ID
  type: EdgeType // 'relationship', 'ownership', etc.
  label: string
  data: Record<string, any>
}
```

### Canvas State

```typescript
interface CanvasState {
  nodes: NodeData[]
  edges: EdgeData[]
  viewSettings: {
    zoom: number
    pan: Position
  }
}
```

## Future Enhancements

- Advanced filtering and search capabilities
- AI-assisted relationship suggestions
- Integration with external data sources
- Timeline visualization
- Geospatial mapping integration
- Advanced analytics and metrics 