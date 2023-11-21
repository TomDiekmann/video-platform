import React from "react";
import VideoPlayer from "./VideoPlayer";
import prisma from "@/lib/prismadb";
import { notFound } from "next/navigation";
import SyncedVideoPlayer from "./SyncedVideoPlayer";

export const revalidate = 0;

const Video = async ({
  params,
}: {
  params: {
    videoId: string;
    syncId: string;
  };
}) => {
  const video = await prisma.video.findUnique({
    where: {
      id: params.videoId,
    },
  });

  return !video ? (
    notFound()
  ) : params.syncId == "local" ? (
    <VideoPlayer videoUrl={video?.url} videoId={params.videoId} />
  ) : (
    <SyncedVideoPlayer
      videoUrl={video?.url}
      videoId={params.videoId}
      syncId={params.syncId}
    />
  );
};

export default Video;
