"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Upload, X } from "lucide-react"

export function BulkImport() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [uploadedData, setUploadedData] = useState<any[]>([])

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setSelectedFiles((prevFiles) => [...prevFiles, ...files])
  }

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }

  const handleUpload = () => {
    // Simulate file processing and data extraction
    const mockData = selectedFiles.flatMap((file) => [
      { type: "Email", value: "john@example.com", status: "Valid" },
      { type: "Phone", value: "+1 555-1234", status: "Valid" },
      { type: "Wallet", value: "0x1234...5678", status: "Invalid" },
    ])
    setUploadedData(mockData)
  }

  return (
    <div className="space-y-4">
      <div className="border rounded-md p-4">
        <Label
          htmlFor="bulk-upload"
          className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-md cursor-pointer"
        >
          <div className="flex flex-col items-center">
            <Upload className="h-12 w-12 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
            <p className="text-xs text-muted-foreground">CSV, PDF, or TXT (max 10MB)</p>
          </div>
        </Label>
        <Input type="file" id="bulk-upload" className="hidden" onChange={handleFileSelect} multiple />
      </div>
      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Selected Files:</h3>
          <ul className="space-y-1">
            {selectedFiles.map((file, index) => (
              <li key={index} className="flex items-center justify-between">
                <span>{file.name}</span>
                <Button variant="ghost" size="sm" onClick={() => handleRemoveFile(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
          <Button onClick={handleUpload}>Process Files</Button>
        </div>
      )}
      {uploadedData.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Uploaded Data:</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {uploadedData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.value}</TableCell>
                  <TableCell>{item.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

