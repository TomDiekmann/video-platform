"use client";

import { authAsUser } from "@/lib/auth";
import useAuthToken from "@/lib/useAuthToken";
import React, { use, useEffect } from "react";

const SyncedVideoPlayer = ({
  videoId,
  videoUrl,
  syncId,
}: {
  videoUrl: string;
  videoId: string;
  syncId: string;
}) => {
  const token = useAuthToken(authAsUser);

  useEffect(() => {
    if (token) {
      fetch(`https://overtevr.cs.upb.de/api/screen/${syncId}/content`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: `{"content":{"paused":true,"startPosition":0,"type":"controlled-video","url":"${videoUrl}"}}`,
      });
    }
  }, [token]);

  return <div>SyncedVideoPlayer</div>;
};

export default SyncedVideoPlayer;
