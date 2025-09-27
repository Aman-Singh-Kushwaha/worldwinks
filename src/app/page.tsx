import { AuthButton } from "@/components/AuthButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to WorldWinks</h1>
      <p className="mb-8">A mini-app for short videos.</p>
      <AuthButton />
    </main>
  );
}
