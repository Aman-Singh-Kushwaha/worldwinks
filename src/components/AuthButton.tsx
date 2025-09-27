"use client";
import { walletAuth } from "@/auth/wallet";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";
import { useMiniKit } from "@worldcoin/minikit-js/minikit-provider";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

export const AuthButton = () => {
  const [isPending, setIsPending] = useState(false);
  const { isInstalled } = useMiniKit();

  const onClick = useCallback(async () => {
    if (!isInstalled || isPending) {
      return;
    }
    setIsPending(true);
    try {
      await walletAuth();
    } catch (error) {
      console.error("Wallet authentication button error", error);
      toast.error("Login failed. Please try again.");
      setIsPending(false);
      return;
    }

    setIsPending(false);
  }, [isInstalled, isPending]);

  return (
      <Button
        onClick={onClick}
        disabled={isPending}
        className="w-full"
        variant="primary"
      >
        {isPending ? "Logging in..." : "Sign in"}
      </Button>
  );
};
