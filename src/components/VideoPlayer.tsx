'use client';
import { VideoMetadata } from "@/types/Video";
import TipButton from "./TipButton";
import { useEffect, useState, lazy, Suspense } from "react";
import { retrieveBlob } from "@/lib/walrusUtils";
import { useInView } from 'react-intersection-observer';
import { useSession } from "next-auth/react";
import { incrementView } from "@/lib/storageUtils";

// Lazy load ReactPlayer
const ReactPlayer = lazy(() => import('react-player'));

interface Props { video: VideoMetadata; }

export const VideoPlayer = ({ video }: Props) => {
  const [url, setUrl] = useState('');
  const { data: session } = useSession();
  const { ref, inView } = useInView({
    threshold: 0.5, // Trigger when 50% of the player is visible
  });

  useEffect(() => {
    let objectUrl: string;
    if (video.blobId) {
      retrieveBlob(video.blobId)
        .then(blob => {
          objectUrl = URL.createObjectURL(blob);
          setUrl(objectUrl);
        })
        .catch(err => console.error("Failed to retrieve blob", err));
    }
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [video.blobId]);

  useEffect(() => {
    if (inView && session?.user.walletAddress) {
      // This is a client-side view increment, it won't be persisted on Walrus yet.
      incrementView(session.user.walletAddress, video.id);
    }
  }, [inView, session?.user.walletAddress, video.id]);

  return (
    <div ref={ref} className="border border-gray-800 rounded-lg p-4 my-8 w-full max-w-md mx-auto shadow-lg bg-gray-900/30">
      <div className="relative aspect-video bg-black rounded-md overflow-hidden mb-4">
        {url ? (
          <Suspense fallback={<div className="w-full h-full flex items-center justify-center">
            <p className="text-white">Loading player...</p>
          </div>}>
            <ReactPlayer 
              src={url}
              playing={inView}
              width="100%"
              height="100%"
              controls
              muted
              loop
            />
          </Suspense>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-white">Loading video...</p>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg">{video.title}</h3>
          <p className="text-sm text-gray-400">Creator: {video.creatorWallet.slice(0, 6)}...{video.creatorWallet.slice(-4)}</p>
          <p className="text-sm text-gray-400">Views: {video.views}</p>
        </div>
        <TipButton creatorWallet={video.creatorWallet} videoId={video.id} />
      </div>
    </div>
  );
};

export default VideoPlayer;
