'use client';
import { AuthButton } from "@/components/AuthButton";
import VideoFeed from "@/components/VideoFeed";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <main className="flex min-h-screen flex-col items-center justify-center p-24"><p>Loading...</p></main>;
  }

  if (session) {
    return (
      <main>
        <VideoFeed />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to WorldWinks</h1>
      <p className="mb-8">A mini-app for short videos.</p>
      <AuthButton />
    </main>
  );
}
