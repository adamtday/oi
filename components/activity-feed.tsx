import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface ActivityFeedProps {
  className?: string
}

export function ActivityFeed({ className }: ActivityFeedProps) {
  const activities = [
    {
      user: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "AJ",
      },
      action: "added a new search result to",
      target: "Financial Investigation - XYZ Corp",
      time: "2 hours ago",
    },
    {
      user: {
        name: "Sarah Williams",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "SW",
      },
      action: "created a new case",
      target: "Background Check - John Doe",
      time: "5 hours ago",
    },
    {
      user: {
        name: "Michael Brown",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "MB",
      },
      action: "updated the status of",
      target: "Social Media Investigation",
      time: "1 day ago",
    },
    {
      user: {
        name: "Emily Davis",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "ED",
      },
      action: "added a comment to",
      target: "Asset Tracing - ABC Holdings",
      time: "2 days ago",
    },
    {
      user: {
        name: "David Wilson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "DW",
      },
      action: "shared a report from",
      target: "Digital Footprint Analysis",
      time: "3 days ago",
    },
  ]

  return (
    <Card className={cn("col-span-3", className)}>
      <CardHeader>
        <CardTitle>Activity</CardTitle>
        <CardDescription>Recent activity from your team</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                <AvatarFallback>{activity.user.initials}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.user.name}</span> {activity.action}{" "}
                  <span className="font-medium">{activity.target}</span>
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

