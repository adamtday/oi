import { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import { PaletteDemo } from "@/components/palette/palette-demo"

export const metadata: Metadata = {
  title: "Palette | ClearWell OSINT",
  description: "Collaborative canvas for mapping relationships and connections in OSINT investigations",
}

export default function PalettePage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h1 className="text-2xl font-bold">Palette</h1>
            <p className="text-muted-foreground">
              Collaborative canvas for mapping relationships and connections
            </p>
          </div>
        </div>
        
        <div className="flex-1 overflow-hidden">
          <PaletteDemo />
        </div>
      </div>
    </DashboardLayout>
  )
} 