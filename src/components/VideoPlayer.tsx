'use client';
import { VideoMetadata } from "@/types/Video";

interface Props { video: VideoMetadata; }
export const VideoPlayer = ({ video }: Props) => {
  return <div>Playing video: {video.title}</div>;
};

export default VideoPlayer;
