import { Video } from "@prisma/client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

type VideoCardProps = {
  video: Video;
  syncId: string;
};

const VideoCard = ({ video, syncId }: VideoCardProps) => {
  return (
    <Card className="w-80 flex flex-col">
      <CardHeader className="w-80">
        <CardTitle>{video.title}</CardTitle>
        <CardDescription>{video.description}</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto">
        <Link href={`/${syncId}/videos/${video.id}`} className="w-full">
          <Button className="w-full flex flex-row items-center gap-2">
            <Play size={16} />
            Wiedergeben
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default VideoCard;
