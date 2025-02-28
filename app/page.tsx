import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, Shield, Database, FileText, Users, BarChart3 } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            <span className="text-xl font-bold">CaseWell</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
              Dashboard
            </Link>
            <Link href="/cases" className="text-sm font-medium transition-colors hover:text-primary">
              Cases
            </Link>
            <Link href="/search" className="text-sm font-medium transition-colors hover:text-primary">
              Search
            </Link>
            <Link href="/analysis" className="text-sm font-medium transition-colors hover:text-primary">
              Analysis
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Advanced OSINT Investigations
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    CaseWell provides powerful tools for open-source intelligence gathering, analysis, and case
                    management.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button size="lg" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="/demo">
                    <Button size="lg" variant="outline" className="w-full">
                      View Demo
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-[350px] rounded-lg bg-muted p-4 shadow-lg">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Search className="h-24 w-24 text-muted-foreground/50" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 rounded-md bg-background p-4 shadow">
                    <div className="space-y-2">
                      <div className="h-2 w-3/4 rounded bg-muted-foreground/20"></div>
                      <div className="h-2 w-1/2 rounded bg-muted-foreground/20"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Powerful tools designed for professional investigators and researchers
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Database className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Case Management</h3>
                <p className="text-center text-muted-foreground">
                  Organize your investigations with our comprehensive case management system
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Search className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Advanced Search</h3>
                <p className="text-center text-muted-foreground">
                  Search across multiple sources with our powerful search engine
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <FileText className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Report Generation</h3>
                <p className="text-center text-muted-foreground">
                  Create professional reports with our customizable templates
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Users className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Collaboration</h3>
                <p className="text-center text-muted-foreground">
                  Work together with your team on complex investigations
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <BarChart3 className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Data Visualization</h3>
                <p className="text-center text-muted-foreground">
                  Visualize connections and patterns with interactive charts
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Shield className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Secure Platform</h3>
                <p className="text-center text-muted-foreground">
                  Enterprise-grade security to protect sensitive investigation data
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2024 CaseWell. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

