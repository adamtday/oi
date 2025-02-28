"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface FigmaComponentPreviewProps {
  figmaFileUrl: string
  nodeId?: string
}

export function FigmaComponentPreview({ figmaFileUrl, nodeId }: FigmaComponentPreviewProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Extract the file key from the Figma URL
  const getFileKey = (url: string) => {
    const match = url.match(/file\/([^/]+)/)
    return match ? match[1] : null
  }

  const fileKey = getFileKey(figmaFileUrl)
  const embedUrl = fileKey
    ? `https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/${fileKey}${nodeId ? `?node-id=${nodeId}` : ""}`
    : null

  useEffect(() => {
    if (!fileKey) {
      setError("Invalid Figma URL. Please provide a valid Figma file URL.")
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }, [fileKey])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Figma Component Preview</CardTitle>
        <CardDescription>View and reference your Figma components</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex h-96 items-center justify-center">
            <p className="text-muted-foreground">Loading Figma preview...</p>
          </div>
        ) : error ? (
          <div className="flex h-96 items-center justify-center">
            <p className="text-destructive">{error}</p>
          </div>
        ) : embedUrl ? (
          <div className="h-[600px] w-full overflow-hidden rounded-md border">
            <iframe src={embedUrl} className="h-full w-full" allowFullScreen />
          </div>
        ) : null}

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={() => window.open(figmaFileUrl, "_blank")}>
            Open in Figma
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

