import type { Metadata } from "next"
import Link from "next/link"
import { RegisterForm } from "@/components/register-form"
import { Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "Register | CaseWell",
  description: "Create a new CaseWell account",
}

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <Link href="/" className="mb-8 flex items-center gap-2">
          <Shield className="h-6 w-6" />
          <span className="text-xl font-bold">CaseWell</span>
        </Link>
        <div className="w-full max-w-md space-y-8 rounded-lg border bg-card p-6 shadow-sm">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Register</h1>
            <p className="text-muted-foreground">Create a new account to get started</p>
          </div>
          <RegisterForm />
          <div className="text-center text-sm">
            <p>
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-primary underline-offset-4 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

