import type { Metadata } from "next";
import "./globals.css";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { MiniKitProvider } from "@worldcoin/minikit-js/minikit-provider";
import Providers from "@/components/Providers";
import { headers } from 'next/headers';
import { Toaster } from 'react-hot-toast';

export const dynamic = "force-dynamic";
export const runtime = 'edge'; // Add this line

export const metadata: Metadata = {
  title: "WorldWinks",
  description: "A mini-app for short videos",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get the session before rendering
  const session = await auth();
  
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Providers>
          <SessionProvider session={session}>
            <MiniKitProvider props={{ appId: process.env.NEXT_PUBLIC_WORLD_APP_ID! }}>
              <Toaster />
              {children}
            </MiniKitProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
