export interface VideoMetadata {
  id: string;
  blobId: string; // video blob
  title: string;
  creatorWallet: string;
  uploadAt: number;
  views: number;
  metadataBlobId: string; // self
}

export interface Tip {
  videoId: string;
  tipperWallet: string;
  amount: number;
  txHash: string;
  tippedAt: number;
  tipBlobId?: string; // self
}
