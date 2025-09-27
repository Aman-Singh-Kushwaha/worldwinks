'use client';
import UploadForm from '@/components/UploadForm';
import { useSession } from 'next-auth/react';
import { AuthButton } from '@/components/AuthButton';

export default function UploadPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <main className="flex min-h-screen flex-col items-center justify-center p-24"><p>Loading...</p></main>;
  }

  if (!session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-2xl font-bold mb-4">Please sign in to upload</h1>
        <AuthButton />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8 text-center">Upload Video</h1>
        <UploadForm />
      </div>
    </main>
  );
}