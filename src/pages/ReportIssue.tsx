import { useState } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, MapPin, Upload, Mic, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const categories = [
  { value: "waste", label: "Waste Management" },
  { value: "roads", label: "Roads & Traffic" },
  { value: "lights", label: "Street Lighting" },
  { value: "water", label: "Water & Drainage" },
  { value: "parks", label: "Parks & Recreation" },
  { value: "other", label: "Other" },
];

const priorities = [
  { value: "low", label: "Low Priority" },
  { value: "medium", label: "Medium Priority" },
  { value: "high", label: "High Priority" },
  { value: "urgent", label: "Urgent" },
];

const ReportIssue = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
    location: "",
  });
  const [photos, setPhotos] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = () => {
    // TODO: Implement photo upload from camera/gallery
    toast({
      title: "Photo Upload",
      description: "Photo upload feature will be implemented with file picker",
    });
  };

  const handleLocationCapture = () => {
    // TODO: Implement GPS location capture
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          handleInputChange("location", `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          toast({
            title: "Location Captured",
            description: "Your current location has been added to the report",
          });
        },
        (error) => {
          toast({
            title: "Location Error",
            description: "Unable to capture location. Please enter manually.",
            variant: "destructive",
          });
        }
      );
    }
  };

  const handleVoiceNote = () => {
    setIsRecording(!isRecording);
    // TODO: Implement voice recording
    toast({
      title: isRecording ? "Recording Stopped" : "Recording Started",
      description: isRecording ? "Voice note saved" : "Voice recording started",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit to backend
    console.log("Report submission:", formData);
    toast({
      title: "Report Submitted",
      description: "Your issue has been reported successfully. We'll keep you updated on progress.",
    });
    
    // Reset form
    setFormData({
      title: "",
      description: "",
      category: "",
      priority: "",
      location: "",
    });
    setPhotos([]);
  };

  return (
    <MobileLayout>
      <div className="mobile-container space-y-6 py-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Report an Issue</h1>
          <p className="text-muted-foreground">
            Help improve your community by reporting issues
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Issue Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Issue Title</Label>
                <Input
                  id="title"
                  placeholder="Brief description of the issue"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select issue category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority level" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((priority) => (
                      <SelectItem key={priority.value} value={priority.value}>
                        {priority.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide detailed information about the issue"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={4}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Location or coordinates"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon"
                  onClick={handleLocationCapture}
                >
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Media Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Evidence</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="h-20 flex-col gap-2"
                  onClick={handlePhotoUpload}
                >
                  <Camera className="h-6 w-6" />
                  <span className="text-sm">Camera</span>
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="h-20 flex-col gap-2"
                  onClick={handlePhotoUpload}
                >
                  <Upload className="h-6 w-6" />
                  <span className="text-sm">Gallery</span>
                </Button>
              </div>
              
              <Button 
                type="button" 
                variant="outline" 
                className={`w-full h-12 ${isRecording ? 'border-destructive text-destructive' : ''}`}
                onClick={handleVoiceNote}
              >
                <Mic className="h-4 w-4 mr-2" />
                {isRecording ? "Stop Recording" : "Record Voice Note"}
              </Button>
            </CardContent>
          </Card>

          {/* Submit */}
          <Button 
            type="submit" 
            size="lg" 
            className="w-full bg-gradient-primary"
          >
            <Send className="h-5 w-5 mr-2" />
            Submit Report
          </Button>
        </form>
      </div>
    </MobileLayout>
  );
};

export default ReportIssue;