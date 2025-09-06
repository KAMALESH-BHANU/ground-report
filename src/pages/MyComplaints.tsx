import { useState } from "react";
import { Link } from "react-router-dom";
import { MobileLayout } from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/StatusBadge";
import { MapPin, Calendar, TrendingUp, Search, Filter } from "lucide-react";

// Mock data - in production this would come from your backend
const mockComplaints = [
  {
    id: 1,
    title: "Broken streetlight on Main Street",
    status: "in-progress" as const,
    location: "Main Street, Downtown",
    date: "2024-01-15",
    category: "Street Lighting",
    priority: "high",
    upvotes: 12,
    description: "The streetlight has been flickering for weeks and now it's completely out.",
  },
  {
    id: 2,
    title: "Large pothole on Oak Avenue",
    status: "pending" as const,
    location: "Oak Avenue, Block 5",
    date: "2024-01-10",
    category: "Roads & Traffic",
    priority: "medium",
    upvotes: 8,
    description: "Deep pothole causing damage to vehicles and creating safety hazard.",
  },
  {
    id: 3,
    title: "Overflowing garbage bins",
    status: "resolved" as const,
    location: "Park Plaza",
    date: "2024-01-05",
    category: "Waste Management",
    priority: "low",
    upvotes: 15,
    description: "Garbage bins in the park area are consistently overflowing.",
  },
  {
    id: 4,
    title: "Broken water main",
    status: "in-progress" as const,
    location: "Elm Street",
    date: "2024-01-20",
    category: "Water & Drainage",
    priority: "urgent",
    upvotes: 25,
    description: "Water main break causing flooding and service disruption.",
  },
  {
    id: 5,
    title: "Damaged playground equipment",
    status: "pending" as const,
    location: "City Park",
    date: "2024-01-18",
    category: "Parks & Recreation",
    priority: "medium",
    upvotes: 6,
    description: "Swing set has broken chains, safety concern for children.",
  },
];

const MyComplaints = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredComplaints = mockComplaints.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || complaint.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-destructive';
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <MobileLayout>
      <div className="mobile-container space-y-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">My Reports</h1>
            <p className="text-muted-foreground">
              Track your submitted issues
            </p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search your reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {showFilters && (
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-warning">
                {mockComplaints.filter(c => c.status === 'pending').length}
              </div>
              <div className="text-xs text-muted-foreground">Pending</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">
                {mockComplaints.filter(c => c.status === 'in-progress').length}
              </div>
              <div className="text-xs text-muted-foreground">In Progress</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-success">
                {mockComplaints.filter(c => c.status === 'resolved').length}
              </div>
              <div className="text-xs text-muted-foreground">Resolved</div>
            </CardContent>
          </Card>
        </div>

        {/* Complaints List */}
        <div className="space-y-4">
          {filteredComplaints.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No reports found matching your criteria.</p>
              </CardContent>
            </Card>
          ) : (
            filteredComplaints.map((complaint) => (
              <Link key={complaint.id} to={`/complaints/${complaint.id}`}>
                <Card className="hover:shadow-medium transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-semibold leading-tight flex-1">
                          {complaint.title}
                        </h3>
                        <StatusBadge status={complaint.status} />
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {complaint.description}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate">{complaint.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(complaint.date)}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-xs bg-accent px-2 py-1 rounded">
                            {complaint.category}
                          </span>
                          <span className={`text-xs font-medium ${getPriorityColor(complaint.priority)}`}>
                            {complaint.priority.toUpperCase()}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-1 text-sm">
                          <TrendingUp className="h-3 w-3" />
                          <span>{complaint.upvotes}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default MyComplaints;