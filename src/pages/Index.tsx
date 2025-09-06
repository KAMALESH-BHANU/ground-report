import { MobileLayout } from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, AlertTriangle, CheckCircle, Clock, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { StatusBadge } from "@/components/StatusBadge";

const Index = () => {
  // Mock data - in production this would come from your backend
  const recentIssues = [
    {
      id: 1,
      title: "Broken streetlight on Main St",
      status: "in-progress" as const,
      location: "Main Street, Downtown",
      date: "2 days ago",
      upvotes: 12,
    },
    {
      id: 2,
      title: "Pothole on Oak Avenue",
      status: "pending" as const,
      location: "Oak Avenue, Block 5",
      date: "1 week ago",
      upvotes: 8,
    },
    {
      id: 3,
      title: "Overflowing garbage bin",
      status: "resolved" as const,
      location: "Park Plaza",
      date: "3 days ago",
      upvotes: 15,
    },
  ];

  const stats = [
    { label: "Pending", count: 23, icon: Clock, color: "text-warning" },
    { label: "In Progress", count: 12, icon: AlertTriangle, color: "text-primary" },
    { label: "Resolved", count: 156, icon: CheckCircle, color: "text-success" },
  ];

  return (
    <MobileLayout>
      <div className="mobile-container space-y-6 py-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            CivicReport
          </h1>
          <p className="text-muted-foreground">
            Report issues, track progress, improve your community
          </p>
        </div>

        {/* Quick Action */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-3">Report an Issue</h2>
            <p className="text-muted-foreground mb-6">
              Spotted something that needs attention? Let us know!
            </p>
            <Link to="/report">
              <Button size="lg" className="w-full bg-gradient-primary hover:opacity-90">
                <MapPin className="mr-2 h-5 w-5" />
                Report Issue
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="text-center">
              <CardContent className="p-4">
                <stat.icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                <div className="text-2xl font-bold">{stat.count}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Issues */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Recent Issues</CardTitle>
              <Link to="/complaints">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentIssues.map((issue) => (
              <div key={issue.id} className="flex gap-3 p-3 rounded-lg bg-accent/50">
                <div className="flex-1 space-y-1">
                  <h3 className="font-medium leading-tight">{issue.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{issue.location}</span>
                    <span>•</span>
                    <span>{issue.date}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <StatusBadge status={issue.status} />
                    <div className="flex items-center gap-1 text-sm">
                      <TrendingUp className="h-3 w-3" />
                      <span>{issue.upvotes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default Index;
