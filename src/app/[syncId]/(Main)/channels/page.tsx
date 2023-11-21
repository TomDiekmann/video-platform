import prisma from "@/lib/prismadb";
import ChannelCard from "./ChannelCard";

export const revalidate = 0;

export default async function Channels({
  params,
}: {
  params: {
    syncId: string;
  };
}) {
  const channels = await prisma.channel.findMany({
    include: {
      playlists: {
        include: {
          videos: true,
        },
      },
    },
  });

  const sortedChannels = channels.sort((a, b) => {
    if (a.title < b.title) return -1;
    else if (a.title > b.title) return 1;
    else return 0;
  });

  const uniqueFirstLettersOfChannels = sortedChannels
    .map((channel) => channel.title[0])
    .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <div className="w-full h-full p-4 flex flex-col gap-4">
      <span className="text-3xl font-semibold">Channels</span>
      <div className="flex flex-row gap-4">
        <div className="flex-grow flex flex-col gap-8">
          {uniqueFirstLettersOfChannels.map((letter) => (
            <div key={letter} className="flex flex-col gap-2">
              <div className="flex flex-row gap-4 items-center w-full">
                <span className="text-2xl font-semibold">{letter}</span>
                <div className="flex-1 h-0.5 bg-gray-300 dark:bg-gray-700"></div>
              </div>

              {sortedChannels
                .filter((channel) => channel.title[0] === letter)
                .map((channel) => (
                  <ChannelCard
                    key={channel.id}
                    channel={channel}
                    syncId={params.syncId}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
