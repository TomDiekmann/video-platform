"use client";

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
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const VideosResumeList = ({ videos }: { videos: any[] }) => {
  const [savedVideoTimes, setSavedVideoTimes] = React.useState({});

  const getSavedVideoTimes = () => {
    return JSON.parse(localStorage.getItem("savedTimes") || "{}");
  };

  React.useEffect(() => {
    const savedTimes = getSavedVideoTimes();

    setSavedVideoTimes(savedTimes);
  }, []);

  return (
    <div className="flex flex-row gap-4">
      {Object.keys(savedVideoTimes).length > 0 ? (
        Object.keys(savedVideoTimes)
          .slice(0, 5)
          .map((videoId) => {
            const video = videos.find((video) => video.id === videoId);

            if (!video) return <></>;

            return (
              <Card className="w-80 relative" key={videoId}>
                <CardHeader>
                  <CardDescription>
                    {video.playlists[0].channel.title}
                  </CardDescription>
                  <CardTitle className="truncate">{video.title}</CardTitle>
                  <CardDescription>{video.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link
                    href={`/videos/${video.id}?t=${
                      getSavedVideoTimes()[videoId]
                    } 
				  `}
                    className="w-full"
                  >
                    <Button className="w-full flex flex-row items-center gap-2">
                      <Play size={16} />
                      Fortsetzen
                    </Button>
                  </Link>
                </CardFooter>
                <div className="absolute bottom-0 w-80 h-2 bg-gray-100 rounded-b-lg">
                  <div
                    className="bg-primary h-full rounded-b-lg"
                    style={{
                      width: `${getSavedVideoTimes()[videoId] * 100}%`,
                    }}
                  ></div>
                </div>
              </Card>
            );
          })
      ) : (
        <span className="text-lg">Keine Videos gefunden</span>
      )}
    </div>
  );
};

export default VideosResumeList;
