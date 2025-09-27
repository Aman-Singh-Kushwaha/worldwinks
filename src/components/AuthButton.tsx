"use client";
import { walletAuth } from "@/auth/wallet";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";
import { useMiniKit } from "@worldcoin/minikit-js/minikit-provider";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const AuthButton = () => {
  const [isPending, setIsPending] = useState(false);
  const { isInstalled } = useMiniKit();
  const router = useRouter();

  const onClick = useCallback(async () => {
    if (!isInstalled || isPending) {
      return;
    }
    setIsPending(true);
    try {
      const signInResponse = await walletAuth();
      if (signInResponse?.ok) {
        router.refresh();
      } else {
        throw new Error(signInResponse?.error || "Unknown sign-in error");
      }
    } catch (error) {
      console.error("Wallet authentication button error", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setIsPending(false);
    }
  }, [isInstalled, isPending, router]);

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
