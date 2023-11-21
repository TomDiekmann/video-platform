"use client";

import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useRef } from "react";
import ReactPlayer from "react-player";

type VideoPlayerProps = {
  videoUrl: string;
  videoId: string;
};

const VideoPlayer = ({ videoUrl, videoId }: VideoPlayerProps) => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const time = searchParams.get("t");

  const VideoPlayerRef = useRef<ReactPlayer>(null);

  const jumpToTime = () => {
    // @ts-ignore
    VideoPlayerRef.current.seekTo(
      // @ts-ignore
      VideoPlayerRef.current.getDuration() * time
    );
  };

  const saveTimeInLocalStorage = () => {
    const currentSavedTimes = JSON.parse(
      localStorage.getItem("savedTimes") || "{}"
    );

    //Filter out current video
    const newSavedTimesWithoutCurrentVideo = Object.keys(
      currentSavedTimes
    ).reduce((acc, key) => {
      if (key !== videoId) {
        // @ts-ignore
        acc[key] = currentSavedTimes[key];
      }

      return acc;
    }, {});

    // @ts-ignore
    const currentTime = VideoPlayerRef.current.getCurrentTime();

    // @ts-ignore
    const relationalTime = currentTime / VideoPlayerRef.current.getDuration();

    if (relationalTime < 0.95 && relationalTime > 0.05) {
      const newSavedTimes = {
        [videoId]: relationalTime,
        ...newSavedTimesWithoutCurrentVideo,
      };

      localStorage.setItem("savedTimes", JSON.stringify(newSavedTimes));
    } else {
      localStorage.setItem(
        "savedTimes",
        JSON.stringify(newSavedTimesWithoutCurrentVideo)
      );
    }
  };

  return (
    <div className="w-screen h-screen bg-black relative group pointer-events-none">
      <div className="absolute top-0 right-0 p-4   bg-gray-600/75 pointer-events-auto z-10">
        <div
          className="flex-row text-white flex cursor-pointer"
          onClick={(e) => {
            router.back();
            saveTimeInLocalStorage();
          }}
        >
          <X className="w-6 h-6" />
          <span>Wiedergabe beenden</span>
        </div>
      </div>
      <div className="pointer-events-auto w-screen h-screen">
        <ReactPlayer
          url={videoUrl}
          controls
          width={"100vw"}
          height={"100vh"}
          playing
          ref={VideoPlayerRef}
          onStart={jumpToTime}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
