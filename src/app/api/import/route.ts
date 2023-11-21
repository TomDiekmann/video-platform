import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { channels } = await request.json();

  await prisma.video.deleteMany();
  await prisma.channel.deleteMany();

  await Promise.all(
    channels.map(async (channel: any) =>
      prisma.channel.create({
        data: {
          title: channel.title,
          description: channel.description || "",
          playlists: {
            create: channel.playlists
              ? channel.playlists.map((playlist: any) => ({
                  title: playlist.title,
                  description: playlist.description || "",
                  videos: {
                    create: playlist.videos
                      ? playlist.videos.map((video: any) => ({
                          title: video.title,
                          description: video.description || "",
                          url: video.url,
                        }))
                      : [],
                  },
                }))
              : [],
          },
        },
      })
    )
  );

  const result = await prisma.channel.findMany({});

  return NextResponse.json(result);
}
