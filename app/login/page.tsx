import type { Metadata } from "next"
import Link from "next/link"
import { LoginForm } from "@/components/login-form"
import { Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "Login | CaseWell",
  description: "Login to your CaseWell account",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <Link href="/" className="mb-8 flex items-center gap-2">
          <Shield className="h-6 w-6" />
          <span className="text-xl font-bold">CaseWell</span>
        </Link>
        <div className="w-full max-w-md space-y-8 rounded-lg border bg-card p-6 shadow-sm">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-muted-foreground">Enter your credentials to access your account</p>
          </div>
          <LoginForm />
          <div className="text-center text-sm">
            <p>
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-medium text-primary underline-offset-4 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

