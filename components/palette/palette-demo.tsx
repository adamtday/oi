"use client"

import { useState } from "react"
import { PaletteCanvas } from "./palette-canvas"
import { TestComponent } from "./test-component"
import { Button } from "@/components/ui/button"
import { TooltipProvider } from "@/components/ui/tooltip"
import { NodeData, EdgeData, CanvasState } from "./palette-types"

// Sample demo data
const DEMO_NODES: NodeData[] = [
  {
    id: "node-1",
    type: "person",
    label: "John Smith",
    position: { x: 100, y: 100 },
    data: {
      avatar: "/avatars/john-smith.jpg",
      details: {
        age: 42,
        occupation: "CEO",
        location: "New York"
      }
    }
  },
  {
    id: "node-2",
    type: "organization",
    label: "Acme Corp",
    position: { x: 400, y: 100 },
    data: {
      details: {
        industry: "Technology",
        founded: 2005,
        employees: 500
      }
    }
  },
  {
    id: "node-3",
    type: "financial",
    label: "Bank Account",
    position: { x: 700, y: 100 },
    data: {
      details: {
        accountType: "Business",
        balance: "$2.5M",
        institution: "First National Bank"
      }
    }
  },
  {
    id: "node-4",
    type: "person",
    label: "Jane Doe",
    position: { x: 100, y: 300 },
    data: {
      avatar: "/avatars/jane-doe.jpg",
      details: {
        age: 38,
        occupation: "CFO",
        location: "Boston"
      }
    }
  },
  {
    id: "node-5",
    type: "location",
    label: "Headquarters",
    position: { x: 400, y: 300 },
    data: {
      details: {
        address: "123 Tech Blvd, San Francisco",
        type: "Office Building",
        size: "50,000 sq ft"
      }
    }
  },
  {
    id: "node-6",
    type: "device",
    label: "Company Server",
    position: { x: 700, y: 300 },
    data: {
      details: {
        ipAddress: "192.168.1.100",
        os: "Linux",
        lastAccessed: "2023-06-15"
      }
    }
  }
]

// Sample initial edges
const initialEdges: EdgeData[] = [
  {
    id: "edge-1",
    source: "node-1",
    target: "node-2",
    type: "ownership",
    label: "Owns 75%",
    data: {
      since: "2015-03-12",
      proof: "Document #A-12345"
    }
  },
  {
    id: "edge-2",
    source: "node-2",
    target: "node-3",
    type: "ownership",
    label: "Controls",
    data: {
      notes: "Primary funding source"
    }
  },
  {
    id: "edge-3",
    source: "node-1",
    target: "node-4",
    type: "relationship",
    label: "Business Associate",
    data: {
      duration: "10 years",
      strength: "Strong"
    }
  },
  {
    id: "edge-4",
    source: "node-4",
    target: "node-5",
    type: "ownership",
    label: "Registered Owner",
    data: {
      notes: "Suspected proxy ownership"
    }
  },
  {
    id: "edge-5",
    source: "node-1",
    target: "node-6",
    type: "ownership",
    label: "Primary Device",
    data: {
      usage: "Daily",
      verified: true
    }
  },
  {
    id: "edge-6",
    source: "node-1",
    target: "node-5",
    type: "location",
    label: "Frequent Visitor",
    data: {
      frequency: "Monthly",
      lastVisit: "2023-01-15"
    }
  },
  {
    id: "edge-7",
    source: "node-1",
    target: "node-7",
    type: "relationship",
    label: "Signatory",
    data: {
      role: "Primary Beneficiary"
    }
  },
  {
    id: "edge-8",
    source: "node-2",
    target: "node-7",
    type: "relationship",
    label: "Referenced In",
    data: {
      section: "Article 3.2"
    }
  },
  {
    id: "edge-9",
    source: "node-2",
    target: "node-5",
    type: "ownership",
    label: "Financed Purchase",
    data: {
      amount: "$2.8M",
      date: "2017-11-05"
    }
  }
]

export function PaletteDemo() {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    nodes: DEMO_NODES,
    edges: initialEdges,
    viewSettings: {
      zoom: 1,
      pan: { x: 0, y: 0 }
    }
  })
  
  const [readOnly, setReadOnly] = useState(false)
  
  const handleSave = (state: CanvasState) => {
    setCanvasState(state)
    console.log("Canvas state saved:", state)
  }
  
  const handleReset = () => {
    setCanvasState({
      nodes: DEMO_NODES,
      edges: initialEdges,
      viewSettings: {
        zoom: 1,
        pan: { x: 0, y: 0 }
      }
    })
  }
  
  return (
    <TooltipProvider>
      <div className="relative h-full flex flex-col">
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setReadOnly(!readOnly)}
          >
            {readOnly ? "Edit Mode" : "Read-only Mode"}
          </Button>
          <Button 
            variant="outline" 
            onClick={handleReset}
          >
            Reset Demo
          </Button>
        </div>
        
        {/* Test component to check if changes are being picked up */}
        <TestComponent />
        
        <div className="flex-1">
          <PaletteCanvas 
            initialState={canvasState}
            onSave={handleSave}
            readOnly={readOnly}
          />
        </div>
      </div>
    </TooltipProvider>
  )
} 