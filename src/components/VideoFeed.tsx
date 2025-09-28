'use client';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { getFeed } from '@/lib/storageUtils';
import VideoPlayer from './VideoPlayer';
import { VideoMetadata } from '@/types/Video';
import Link from 'next/link';

const VideoFeed = () => {
  const { data: session } = useSession();
  const wallet = session?.user.walletAddress;

  const { data: videos, isLoading } = useQuery<VideoMetadata[]>({
    queryKey: ['videos', wallet],
    queryFn: () => getFeed(wallet!),
    enabled: !!wallet,
  });

  if (isLoading) {
    return <div className="text-center p-10">Loading feed...</div>;
  }

  if (!videos || videos.length === 0) {
    return (
      <div className="text-center p-10 mt-20">
        <p className="mb-4 text-lg">No videos in your feed yet.</p>
        <Link href="/upload" className="text-violet-500 hover:underline font-semibold">
          Upload the first video!
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-4">
      {videos.map(video => (
        <VideoPlayer key={video.id} video={video} />
      ))}
    </div>
  );
};

export default VideoFeed;