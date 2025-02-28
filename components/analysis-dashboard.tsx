"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export function AnalysisDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-2xl font-medium">Analysis Dashboard</h3>
          <p className="text-sm text-muted-foreground">Visualize and analyze data from your investigations</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Case" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cases</SelectItem>
              <SelectItem value="case-001">Financial Investigation</SelectItem>
              <SelectItem value="case-002">Background Check</SelectItem>
              <SelectItem value="case-003">Digital Footprint</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export</Button>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="connections">Connections</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="geolocation">Geolocation</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Data Points</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,284</div>
                <p className="text-xs text-muted-foreground">+24% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Connections Found</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">342</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Sources Used</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">+3 new sources</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Analysis Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87%</div>
                <p className="text-xs text-muted-foreground">+5% from last analysis</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Data Sources Distribution</CardTitle>
                <CardDescription>Breakdown of information by source type</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center text-muted-foreground">[Data Sources Chart Placeholder]</div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Information Timeline</CardTitle>
                <CardDescription>Data collection over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center text-muted-foreground">[Timeline Chart Placeholder]</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="connections" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Network Connections</CardTitle>
              <CardDescription>Visualize relationships between entities</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px]">
              <div className="flex h-full items-center justify-center">
                <div className="text-center text-muted-foreground">[Network Graph Placeholder]</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="timeline" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Event Timeline</CardTitle>
              <CardDescription>Chronological view of events and activities</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px]">
              <div className="flex h-full items-center justify-center">
                <div className="text-center text-muted-foreground">[Timeline Visualization Placeholder]</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="geolocation" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>Map view of locations and activities</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px]">
              <div className="flex h-full items-center justify-center">
                <div className="text-center text-muted-foreground">[Map Visualization Placeholder]</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

