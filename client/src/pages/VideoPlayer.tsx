import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Video } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaTelegram } from "react-icons/fa";
import { AlertCircle } from "lucide-react";

export default function VideoPlayer() {
  const params = useParams();
  const videoId = params.id;

  const { data: video, isLoading, error } = useQuery<Video>({
    queryKey: ["/api/videos", videoId],
    enabled: !!videoId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-20 pb-12 px-4">
        <div className="max-w-5xl mx-auto space-y-6">
          <Skeleton className="w-full aspect-video rounded-xl" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="min-h-screen bg-background pt-20 pb-12 px-4 flex items-center justify-center">
        <Card className="p-8 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-destructive" />
          <h2 className="text-2xl font-bold mb-2">Video Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The video you're looking for doesn't exist or has been removed.
          </p>
          <Button data-testid="button-telegram" variant="default" asChild>
            <a 
              href="https://t.me/kalyatoofan" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <FaTelegram className="w-5 h-5" />
              Upload via Telegram
            </a>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="max-w-5xl mx-auto px-4 md:px-6 space-y-8">
        {/* Video Player Section */}
        <div className="relative">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl bg-black">
            <video
              data-testid="video-player"
              controls
              className="w-full h-full"
              controlsList="nodownload"
              preload="metadata"
            >
              <source src={video.cloudinaryUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Quality Badge */}
            <Badge 
              data-testid={`badge-quality-${video.quality}`}
              className="absolute top-4 right-4 bg-primary/90 text-primary-foreground px-4 py-2 text-sm font-bold backdrop-blur-sm"
            >
              {video.quality}
            </Badge>
          </div>
        </div>

        {/* Video Metadata Section */}
        <div className="space-y-4">
          <h1 
            data-testid="text-video-title"
            className="text-2xl md:text-3xl font-bold text-foreground"
          >
            {video.title}
          </h1>
          <p 
            data-testid="text-video-description"
            className="text-base text-muted-foreground leading-relaxed whitespace-pre-wrap max-w-prose"
          >
            {video.description}
          </p>
        </div>

        {/* Owner Welcome Message */}
        <Card 
          data-testid="card-owner-message"
          className="mt-12 mx-auto max-w-md bg-card/80 backdrop-blur-sm border-2 animate-gradient-border"
        >
          <div className="p-6 text-center space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Welcome to KalyaPlayer
            </h3>
            <p className="text-sm text-muted-foreground">
              Upload your videos easily through our Telegram bot
            </p>
            <Button 
              data-testid="button-telegram-owner"
              variant="default" 
              size="default"
              asChild
              className="w-full"
            >
              <a 
                href="https://t.me/kalyatoofan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <FaTelegram className="w-5 h-5" />
                Join on Telegram
              </a>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
