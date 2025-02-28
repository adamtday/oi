import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FigmaComponentPreview } from "@/components/figma-component-preview"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const metadata: Metadata = {
  title: "Design System | CaseWell",
  description: "CaseWell design system and component library",
}

export default function DesignSystemPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Design System</h2>
        </div>

        <Tabs defaultValue="components">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
            <TabsTrigger value="figma">Figma</TabsTrigger>
          </TabsList>

          <TabsContent value="components" className="space-y-4 pt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Buttons</CardTitle>
                  <CardDescription>Button component variants</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Button>Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm">Small</Button>
                    <Button>Default</Button>
                    <Button size="lg">Large</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Badges</CardTitle>
                  <CardDescription>Badge component variants</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Inputs</CardTitle>
                  <CardDescription>Input component variants</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="default-input">Default</Label>
                    <Input id="default-input" placeholder="Default input" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="disabled-input">Disabled</Label>
                    <Input id="disabled-input" placeholder="Disabled input" disabled />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="colors" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Color Palette</CardTitle>
                <CardDescription>Application color tokens</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2">
                    <div className="h-16 rounded-md bg-primary"></div>
                    <p className="text-sm font-medium">Primary</p>
                    <p className="text-xs text-muted-foreground">--primary</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-md bg-secondary"></div>
                    <p className="text-sm font-medium">Secondary</p>
                    <p className="text-xs text-muted-foreground">--secondary</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-md bg-accent"></div>
                    <p className="text-sm font-medium">Accent</p>
                    <p className="text-xs text-muted-foreground">--accent</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-md bg-muted"></div>
                    <p className="text-sm font-medium">Muted</p>
                    <p className="text-xs text-muted-foreground">--muted</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-md bg-destructive"></div>
                    <p className="text-sm font-medium">Destructive</p>
                    <p className="text-xs text-muted-foreground">--destructive</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-md border bg-background"></div>
                    <p className="text-sm font-medium">Background</p>
                    <p className="text-xs text-muted-foreground">--background</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="typography" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Typography</CardTitle>
                <CardDescription>Text styles and headings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold">Heading 1</h1>
                  <p className="text-sm text-muted-foreground">text-4xl font-bold</p>
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold">Heading 2</h2>
                  <p className="text-sm text-muted-foreground">text-3xl font-bold</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Heading 3</h3>
                  <p className="text-sm text-muted-foreground">text-2xl font-bold</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-bold">Heading 4</h4>
                  <p className="text-sm text-muted-foreground">text-xl font-bold</p>
                </div>
                <div className="space-y-2">
                  <p className="text-base">Body text (base)</p>
                  <p className="text-sm text-muted-foreground">text-base</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm">Small text</p>
                  <p className="text-sm text-muted-foreground">text-sm</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs">Extra small text</p>
                  <p className="text-sm text-muted-foreground">text-xs</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="figma" className="pt-4">
            <FigmaComponentPreview figmaFileUrl="https://www.figma.com/file/your-figma-file-id/CaseWell-Design-System" />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

