"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FolderOpen, Search, Clock, Users } from "lucide-react"
import { motion } from "framer-motion"

export function DashboardStats() {
  const stats = [
    {
      title: "Active Cases",
      value: 12,
      change: "+2 from last month",
      icon: FolderOpen,
    },
    {
      title: "Searches Today",
      value: 24,
      change: "+5 from yesterday",
      icon: Search,
    },
    {
      title: "Hours Saved",
      value: 128,
      change: "+22% from last month",
      icon: Clock,
    },
    {
      title: "Team Members",
      value: 5,
      change: "+1 new this month",
      icon: Users,
    },
  ]

  return (
    <>
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              >
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </>
  )
}

