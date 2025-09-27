'use client';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { getFeed } from '@/lib/storageUtils';
import VideoPlayer from './VideoPlayer';
import { VideoMetadata } from '@/types/Video';

const VideoFeed = () => {
  const { data: session } = useSession();
  const wallet = (session as any)?.wallet;

  const { data: videos } = useQuery<VideoMetadata[]>({
    queryKey: ['videos', wallet],
    queryFn: () => getFeed(wallet!),
    enabled: !!wallet,
  });

  return (
    <div className="feed">
      {videos?.map(video => (
        <VideoPlayer key={video.id} video={video} />
      ))}
    </div>
  );
};

export default VideoFeed;
