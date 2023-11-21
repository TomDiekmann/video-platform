import prisma from "@/lib/prismadb";
import VideosResumeList from "./VideosResumeList";
import ChannelCard from "./channels/ChannelCard";

export default async function Home({
  params,
}: {
  params: {
    syncId: string;
  };
}) {
  const videosData = prisma.video.findMany({
    include: {
      playlists: {
        include: {
          channel: true,
        },
      },
    },
  });

  const channelsData = prisma.channel.findMany({
    include: {
      playlists: {
        include: {
          videos: true,
        },
      },
    },
  });

  const [videos, channels] = await Promise.all([videosData, channelsData]);

  return (
    <div className="flex flex-col gap-8 p-4">
      <div className="flex flex-col gap-4">
        <span className="text-3xl font-semibold">Empfohlene Channels</span>
        <div className="flex flex-row gap-4">
          {channels.slice(0, 5).map((channel) => (
            <ChannelCard
              key={channel.id}
              channel={channel}
              syncId={params.syncId}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <span className="text-3xl font-semibold">Videos fortsetzen</span>
        <VideosResumeList videos={videos} />
      </div>
    </div>
  );
}
