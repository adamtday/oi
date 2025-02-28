"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Upload, BarChart2, Users } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
  { name: "Jun", value: 700 },
]

export function DashboardWidgets() {
  const widgets = [
    {
      title: "Quick Search",
      description: "Perform a rapid OSINT search",
      icon: Search,
      link: "/search",
      color: "bg-blue-500",
    },
    {
      title: "Bulk Import",
      description: "Import multiple data points",
      icon: Upload,
      link: "/search?tab=bulk",
      color: "bg-green-500",
    },
    {
      title: "Analysis",
      description: "View detailed case analytics",
      icon: BarChart2,
      link: "/analysis",
      color: "bg-purple-500",
    },
    {
      title: "Team Management",
      description: "Manage your investigation teams",
      icon: Users,
      link: "/teams",
      color: "bg-orange-500",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {widgets.map((widget, index) => (
          <motion.div
            key={widget.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{widget.title}</CardTitle>
                <widget.icon className={`h-4 w-4 text-muted-foreground ${widget.color} text-white rounded-full p-1`} />
              </CardHeader>
              <CardContent>
                <CardDescription>{widget.description}</CardDescription>
                <div className="mt-4">
                  <Button asChild>
                    <Link href={widget.link}>Go to {widget.title}</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Case Activity</CardTitle>
            <CardDescription>Overview of case activities over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest actions taken on cases</CardDescription>
          </CardHeader>
          <CardContent>
            <motion.ul className="space-y-4">
              {[
                { action: "Case updated", case: "CASE-2024-001", user: "Alex Johnson" },
                { action: "New evidence added", case: "CASE-2024-003", user: "Sarah Williams" },
                { action: "Case status changed", case: "CASE-2024-002", user: "Michael Brown" },
                { action: "Comment added", case: "CASE-2024-005", user: "Emily Davis" },
              ].map((activity, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.case}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{activity.user}</span>
                </motion.li>
              ))}
            </motion.ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

