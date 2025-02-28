"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Globe,
  User,
  Building,
  FileText,
  Mail,
  Phone,
  Plus,
  Trash2,
  Wallet,
  AtSign,
  Hash,
  AlertCircle,
} from "lucide-react"
import { BulkImport } from "./bulk-import"
import { NewFolderModal } from "./new-folder-modal"
import { motion } from "framer-motion"

interface SearchInput {
  type: string
  value: string
  error?: string
}

const inputTypes = {
  email: { icon: Mail, cost: 1, placeholder: "john@example.com" },
  wallet: { icon: Wallet, cost: 2, placeholder: "0x1234...5678" },
  phone: { icon: Phone, cost: 1, placeholder: "+1 (555) 123-4567" },
  username: { icon: AtSign, cost: 1, placeholder: "johndoe" },
  ip: { icon: Globe, cost: 2, placeholder: "192.168.1.1" },
  domain: { icon: Globe, cost: 2, placeholder: "example.com" },
  hash: { icon: Hash, cost: 3, placeholder: "5f4dcc3b5aa765d61d8327deb882cf99" },
} as const

export function SearchInterface() {
  const [searchInputs, setSearchInputs] = useState<SearchInput[]>([{ type: "", value: "" }])
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [folder, setFolder] = useState("")
  const [analysisMethod, setAnalysisMethod] = useState<"standard" | "palette">("standard")

  const handleAddInput = () => {
    setSearchInputs([...searchInputs, { type: "", value: "" }])
  }

  const handleRemoveInput = (index: number) => {
    const newInputs = [...searchInputs]
    newInputs.splice(index, 1)
    setSearchInputs(newInputs)
  }

  const handleInputChange = (index: number, field: "type" | "value", value: string) => {
    const newInputs = [...searchInputs]
    newInputs[index][field] = value
    newInputs[index].error = undefined // Clear error when input changes
    setSearchInputs(newInputs)
  }

  const validateInputs = () => {
    const newInputs = searchInputs.map((input) => {
      if (!input.type) {
        return { ...input, error: "Please select an input type" }
      }
      if (!input.value) {
        return { ...input, error: "Please enter a value" }
      }
      // Add more specific validation based on input type if needed
      return input
    })
    setSearchInputs(newInputs)
    return newInputs.every((input) => !input.error)
  }

  const handleSearch = () => {
    if (!validateInputs()) return

    setIsSearching(true)
    setSearchResults([])

    // Simulate search delay
    setTimeout(() => {
      // Mock search results
      const mockResults = [
        {
          type: "person",
          title: "John Smith",
          subtitle: "New York, USA",
          details: "Age: 42, Occupation: Software Engineer",
          source: "Public Records Database",
        },
        {
          type: "website",
          title: "smithtech.com",
          subtitle: "Corporate website",
          details: "Registered: 2015-03-12, IP: 192.168.1.1",
          source: "WHOIS Database",
        },
        {
          type: "email",
          title: "john.smith@example.com",
          subtitle: "Personal email",
          details: "Found in 3 data breaches",
          source: "Email Database",
        },
      ]

      setSearchResults(mockResults)
      setIsSearching(false)
    }, 1500)
  }

  const getTotalCost = () => {
    return searchInputs.reduce((total, input) => {
      return total + (inputTypes[input.type as keyof typeof inputTypes]?.cost || 0)
    }, 0)
  }

  const isSearchDisabled = searchInputs.every((input) => !input.type || !input.value)

  return (
    <div className="space-y-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>New Investigation</CardTitle>
          <CardDescription>The next generation of investigation</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="advanced">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="advanced">Advanced Search</TabsTrigger>
              <TabsTrigger value="bulk">Bulk Import</TabsTrigger>
            </TabsList>
            <TabsContent value="advanced" className="space-y-4 pt-4">
              <div className="space-y-4">
                {searchInputs.map((input, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2"
                  >
                    <Select value={input.type} onValueChange={(value) => handleInputChange(index, "type", value)}>
                      <SelectTrigger className="w-full sm:w-[200px]">
                        <SelectValue placeholder="Select input type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(inputTypes).map(([key, { icon: Icon, cost }]) => (
                          <SelectItem key={key} value={key}>
                            <div className="flex items-center">
                              <Icon className="mr-2 h-4 w-4" />
                              <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                              <span className="ml-auto text-muted-foreground">{cost} credits</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="flex-1 relative w-full">
                      <Input
                        placeholder={
                          input.type
                            ? inputTypes[input.type as keyof typeof inputTypes]?.placeholder
                            : "Enter your target info"
                        }
                        value={input.value}
                        onChange={(e) => handleInputChange(index, "value", e.target.value)}
                        className={input.error ? "border-red-500" : ""}
                      />
                      {input.type && inputTypes[input.type as keyof typeof inputTypes]?.icon && (
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                          {React.createElement(inputTypes[input.type as keyof typeof inputTypes].icon, {
                            className: "h-4 w-4 text-muted-foreground",
                          })}
                        </div>
                      )}
                      {input.error && (
                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        </div>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemoveInput(index)}
                      disabled={searchInputs.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {/* This line was causing the error */}
                {searchInputs.some((input) => input.error) && (
                  <p className="text-sm text-red-500 mt-1">{searchInputs.find((input) => input.error)?.error}</p>
                )}
                <Button onClick={handleAddInput} variant="secondary" className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Add Input
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Folder Name</Label>
                <div className="flex items-center space-x-2">
                  <Select value={folder} onValueChange={setFolder}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select or create a folder" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="folder1">Folder One</SelectItem>
                      <SelectItem value="folder2">Folder Two</SelectItem>
                    </SelectContent>
                  </Select>
                  <NewFolderModal />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Analysis Method</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 rounded-md border p-4">
                    <Checkbox
                      id="standard"
                      checked={analysisMethod === "standard"}
                      onCheckedChange={() => setAnalysisMethod("standard")}
                    />
                    <div className="flex-1">
                      <Label htmlFor="standard" className="font-medium">
                        Standard Analysis
                      </Label>
                      <p className="text-sm text-muted-foreground">Basic data correlation and pattern recognition</p>
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">3 tokens</div>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-4">
                    <Checkbox
                      id="palette"
                      checked={analysisMethod === "palette"}
                      onCheckedChange={() => setAnalysisMethod("palette")}
                    />
                    <div className="flex-1">
                      <Label htmlFor="palette" className="font-medium">
                        Palette Analysis
                      </Label>
                      <p className="text-sm text-muted-foreground">Advanced AI-driven analysis with deeper insights</p>
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">5 tokens</div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="bulk" className="pt-4">
              <BulkImport />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-center justify-between">
            <div className="text-sm font-medium">
              Total Cost: <span className="text-primary">{getTotalCost()} credits</span>
            </div>
            <Button onClick={handleSearch} disabled={isSearchDisabled || isSearching}>
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </div>
        </CardFooter>
      </Card>

      {searchResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
            <CardDescription>Found {searchResults.length} results for your search</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {searchResults.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start gap-4 rounded-lg border p-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    {result.type === "person" && <User className="h-5 w-5" />}
                    {result.type === "website" && <Globe className="h-5 w-5" />}
                    {result.type === "company" && <Building className="h-5 w-5" />}
                    {result.type === "document" && <FileText className="h-5 w-5" />}
                    {result.type === "email" && <Mail className="h-5 w-5" />}
                    {result.type === "phone" && <Phone className="h-5 w-5" />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{result.title}</h4>
                      <span className="text-xs text-muted-foreground">{result.source}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{result.subtitle}</p>
                    <p className="text-sm">{result.details}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Load More Results
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

