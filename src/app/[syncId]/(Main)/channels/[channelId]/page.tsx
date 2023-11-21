import React from "react";
import prisma from "@/lib/prismadb";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ListVideo } from "lucide-react";
import VideoCard from "./VideoCard";

export const revalidate = 0;

const Channel = async ({
  params,
}: {
  params: {
    channelId: string;
    syncId: string;
  };
}) => {
  const channel = await prisma.channel.findUnique({
    where: {
      id: params.channelId,
    },
    include: {
      playlists: {
        include: {
          videos: true,
        },
      },
    },
  });

  return !channel ? (
    notFound()
  ) : (
    <div className="flex flex-col gap-4">
      <span className="text-3xl font-semibold">{channel.title}</span>
      <span className="text-lg">{channel.description}</span>
      <div className="flex flex-col gap-4 mt-4">
        {channel.playlists.map((playlist) => (
          <div key={playlist.id} className="flex flex-col gap-4">
            <div className="flex flex-row gap-4 items-center">
              <ListVideo size={24} className="text-blue-900" />
              <span className="text-xl font-semibold">{playlist.title}</span>
            </div>
            <div className="flex flex-row gap-4 max-w-full overflow-auto">
              {playlist.videos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  syncId={params.syncId}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Channel;
