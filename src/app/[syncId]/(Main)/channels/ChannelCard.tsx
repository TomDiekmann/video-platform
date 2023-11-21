"use client";

import { Channel } from "@prisma/client";
import React, { useId } from "react";
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
import { FileVideo, ListVideo } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

type ChannelCardProps = {
  channel: any;
  syncId: string;
};

function GridPattern({ width, height, x, y, squares, ...props }: any) {
  let patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]: any) => (
            <rect
              strokeWidth="0"
              key={`${x}-${y}`}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}

function ResourcePattern({ mouseX, mouseY, ...gridProps }: any) {
  let maskImage = useMotionTemplate`radial-gradient(180px at ${mouseX}px ${mouseY}px, white, transparent)`;
  let style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0  transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50">
        <GridPattern
          width={72}
          height={56}
          x="50%"
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/[0.02] stroke-black/5 dark:fill-white/1 dark:stroke-white/2.5"
          {...gridProps}
        />
      </div>
      <motion.div
        className="absolute inset-0  bg-gradient-to-r from-[#d7dded] to-[#dfe3fb] opacity-0 transition duration-300 group-hover:opacity-100 dark:from-[#20242e] dark:to-[#2f2834]"
        style={style}
      />
      <motion.div
        className="absolute inset-0  opacity-0 mix-blend-overlay transition duration-300 group-hover:opacity-100"
        style={style}
      >
        <GridPattern
          width={72}
          height={56}
          x="50%"
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/50 stroke-black/70 dark:fill-white/2.5 dark:stroke-white/10"
          {...gridProps}
        />
      </motion.div>
    </div>
  );
}

const ChannelCard = ({ channel, syncId }: ChannelCardProps) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const patterns = [
    {
      y: 16,
      squares: [
        [0, 1],
        [1, 3],
      ],
    },
    {
      y: -6,
      squares: [
        [-1, 2],
        [1, 3],
      ],
    },
    {
      y: 32,
      squares: [
        [0, 2],
        [1, 4],
      ],
    },
    {
      y: 22,
      squares: [[0, 1]],
    },
  ];

  return (
    <Card className="w-80" key={channel.id}>
      <div
        className="w-full h-28 object-cover bg-gray-100 group relative flex"
        onMouseMove={onMouseMove}
      >
        <ResourcePattern
          {...patterns[Math.floor(Math.random() * patterns.length)]}
          mouseX={mouseX}
          mouseY={mouseY}
        />
      </div>
      <CardHeader className="relative">
        <CardTitle className="truncate pb-1">{channel.title}</CardTitle>
        <CardDescription>{channel.description}</CardDescription>
        <CardDescription className="flex flex-row gap-4 items-center">
          <div className="flex flex-row gap-2 items-center">
            <ListVideo size={16} />
            {channel.playlists.length}{" "}
            {channel.playlists.length === 1 ? "Playlist" : "Playlists"}
          </div>
          <div className="flex flex-row gap-2 items-center">
            <FileVideo size={16} />
            {channel.playlists.reduce(
              (accumulator: any, playlist: any) =>
                accumulator + playlist.videos.length,
              0
            )}{" "}
            {channel.playlists.reduce(
              (accumulator: any, playlist: any) =>
                accumulator + playlist.videos.length,
              0
            ) === 1
              ? "Video"
              : "Videos"}
          </div>
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Link href={`/${syncId}/channels/${channel.id}`} className="w-full">
          <Button className="w-full flex flex-row items-center gap-2">
            Ansehen
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ChannelCard;
