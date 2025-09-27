'use client';
import { Button } from '@worldcoin/mini-apps-ui-kit-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  creatorWallet: string;
  videoId: string;
}

export default function TipButton({ creatorWallet, videoId }: Props) {
  const [isTipping, setIsTipping] = useState(false);

  const handleTip = async () => {
    setIsTipping(true);
    toast('Tipping... (Not implemented yet)');
    console.log(`Tipping creator ${creatorWallet} for video ${videoId}`);
    // TODO: Implement actual tipping logic from PLAN.md (Step 4.6)
    // const tx = await useMiniKit().transferTokens({ to: creatorWallet, amount });
    // ...
    setIsTipping(false);
  };

  return (
    <Button onClick={handleTip} disabled={isTipping} variant="secondary">
      {isTipping ? 'Tipping...' : 'Tip 0.01 WLD'}
    </Button>
  );
}
