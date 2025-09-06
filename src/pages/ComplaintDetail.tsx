import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MobileLayout } from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";
import { ProgressBar } from "@/components/ProgressBar";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  TrendingUp, 
  Heart, 
  Share2, 
  MessageCircle,
  Camera,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data - in production this would come from API
const mockComplaint = {
  id: 1,
  title: "Broken streetlight on Main Street",
  status: "in-progress" as const,
  location: "Main Street, Downtown",
  coordinates: { lat: 40.7128, lng: -74.0060 },
  date: "2024-01-15",
  category: "Street Lighting",
  priority: "high",
  upvotes: 12,
  userUpvoted: false,
  description: "The streetlight has been flickering for weeks and now it's completely out. This creates a safety hazard for pedestrians and drivers, especially during evening hours. The light pole appears to be in good condition, so it's likely an electrical issue.",
  department: "Public Works Department",
  assignedTo: "John Smith - Electrical Team",
  progress: 65,
  timeline: [
    {
      date: "2024-01-15",
      status: "Report Submitted",
      description: "Issue reported by citizen",
      completed: true,
    },
    {
      date: "2024-01-16",
      status: "Under Review", 
      description: "Assigned to Public Works Department",
      completed: true,
    },
    {
      date: "2024-01-18",
      status: "Investigation Started",
      description: "Site inspection completed, electrical issue confirmed",
      completed: true,
    },
    {
      date: "2024-01-22",
      status: "Work in Progress",
      description: "Repair work scheduled, parts ordered",
      completed: false,
    },
    {
      date: "TBD",
      status: "Resolution",
      description: "Issue resolved and tested",
      completed: false,
    },
  ],
  photos: [
    "/placeholder.svg?height=200&width=300",
    "/placeholder.svg?height=200&width=300",
  ],
  updates: [
    {
      date: "2024-01-18",
      message: "Site inspection completed. Electrical issue confirmed. Repair work will begin within 2-3 business days.",
      author: "Public Works Team",
    },
    {
      date: "2024-01-16", 
      message: "Thank you for reporting this issue. We have assigned it to our electrical maintenance team for review.",
      author: "City Administrator",
    },
  ],
};

const ComplaintDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [upvoted, setUpvoted] = useState(mockComplaint.userUpvoted);
  const [upvoteCount, setUpvoteCount] = useState(mockComplaint.upvotes);

  const handleUpvote = () => {
    // TODO: Call API to upvote/downvote
    const newUpvoted = !upvoted;
    setUpvoted(newUpvoted);
    setUpvoteCount(prev => newUpvoted ? prev + 1 : prev - 1);
    
    toast({
      title: newUpvoted ? "Upvoted!" : "Upvote removed",
      description: newUpvoted 
        ? "Your support has been added to this issue" 
        : "Your upvote has been removed",
    });
  };

  const handleShare = () => {
    // TODO: Implement sharing functionality
    if (navigator.share) {
      navigator.share({
        title: mockComplaint.title,
        text: mockComplaint.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "The link has been copied to your clipboard",
      });
    }
  };

  const formatDate = (dateString: string) => {
    if (dateString === "TBD") return dateString;
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
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link to="/complaints">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold leading-tight">Issue Details</h1>
          </div>
          <Button variant="ghost" size="icon" onClick={handleShare}>
            <Share2 className="h-5 w-5" />
          </Button>
        </div>

        {/* Main Info */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-lg font-semibold leading-tight flex-1">
                {mockComplaint.title}
              </h2>
              <StatusBadge status={mockComplaint.status} />
            </div>

            <p className="text-muted-foreground">
              {mockComplaint.description}
            </p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{mockComplaint.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{formatDate(mockComplaint.date)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <span className="text-xs bg-accent px-2 py-1 rounded">
                  {mockComplaint.category}
                </span>
                <span className={`text-xs font-medium ${getPriorityColor(mockComplaint.priority)}`}>
                  {mockComplaint.priority.toUpperCase()}
                </span>
              </div>
              
              <Button
                variant={upvoted ? "default" : "outline"}
                size="sm"
                onClick={handleUpvote}
                className="flex items-center gap-2"
              >
                <Heart className={`h-4 w-4 ${upvoted ? 'fill-current' : ''}`} />
                <span>{upvoteCount}</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ProgressBar progress={mockComplaint.progress} showPercentage />
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Assigned to:</span>
                <span className="font-medium">{mockComplaint.assignedTo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Department:</span>
                <span className="font-medium">{mockComplaint.department}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockComplaint.timeline.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <div className="relative">
                    <div className={`w-3 h-3 rounded-full border-2 ${
                      item.completed 
                        ? 'bg-success border-success' 
                        : 'bg-background border-muted-foreground'
                    }`} />
                    {index < mockComplaint.timeline.length - 1 && (
                      <div className="absolute top-3 left-1.5 w-px h-6 bg-border" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{item.status}</h4>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(item.date)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Photos */}
        {mockComplaint.photos.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Photos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {mockComplaint.photos.map((photo, index) => (
                  <div key={index} className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <img
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Updates */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Updates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockComplaint.updates.map((update, index) => (
                <div key={index} className="p-3 bg-accent/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-sm">{update.author}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(update.date)}
                    </span>
                  </div>
                  <p className="text-sm">{update.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default ComplaintDetail;