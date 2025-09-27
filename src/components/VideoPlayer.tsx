'use client';
import { VideoMetadata } from "@/types/Video";
import TipButton from "./TipButton";

interface Props { video: VideoMetadata; }

export const VideoPlayer = ({ video }: Props) => {
  // TODO: Implement actual video playback from PLAN.md (Step 4.5)
  // const [url, setUrl] = useState('');
  // useEffect(() => {
  //   retrieveBlob(video.blobId).then(blob => setUrl(URL.createObjectURL(blob)));
  // }, [video.blobId]);

  return (
    <div className="border rounded-lg p-4 my-4 w-full max-w-lg mx-auto">
      <div className="aspect-w-9 aspect-h-16 bg-gray-800 rounded-md flex items-center justify-center mb-4 h-96">
        {/* <ReactPlayer url={url} playing={inView} width="100%" height="auto" /> */}
        <p className="text-white">Video player for &quot;{video.title}&quot;</p>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold">{video.title}</h3>
          <p className="text-sm text-gray-400">Creator: {video.creatorWallet.slice(0, 6)}...{video.creatorWallet.slice(-4)}</p>
          <p className="text-sm text-gray-400">Views: {video.views}</p>
        </div>
        <TipButton creatorWallet={video.creatorWallet} videoId={video.id} />
      </div>
    </div>
  );
};

export default VideoPlayer;