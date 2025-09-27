import type { VideoMetadata, Tip } from '@/types/Video';

export const getVideos = (wallet: string): VideoMetadata[] => {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(`videos_${wallet}`) || '[]');
}

export const saveVideo = (wallet: string, video: VideoMetadata): void => {
  if (typeof window === 'undefined') return;
  const videos = getVideos(wallet);
  videos.unshift(video);
  localStorage.setItem(`videos_${wallet}`, JSON.stringify(videos.slice(0, 100)));
};

export const saveTip = (wallet: string, tip: Tip): void => {
  if (typeof window === 'undefined') return;
  const tips = JSON.parse(localStorage.getItem(`tips_${wallet}`) || '[]');
  tips.push(tip);
  localStorage.setItem(`tips_${wallet}`, JSON.stringify(tips));
};

export const getFeed = (wallet: string, limit = 20): VideoMetadata[] => {
  return getVideos(wallet).sort((a, b) => b.uploadAt - a.uploadAt).slice(0, limit);
}

export const incrementView = (wallet: string, videoId: string): void => {
  if (typeof window === 'undefined') return;
  const videos = getVideos(wallet);
  const videoIndex = videos.findIndex(v => v.id === videoId);
  if (videoIndex > -1) {
    videos[videoIndex].views++;
    localStorage.setItem(`videos_${wallet}`, JSON.stringify(videos));
  }
};
