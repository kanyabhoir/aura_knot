"use client";

import PublicHome from "./components/home/PublicHome";
import { useAuth } from "@/lib/auth/AuthContext";

export default function HomePage() {
  const { hydrated } = useAuth();

  if (!hydrated) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-sm text-neutral-400">Loading…</p>
      </main>
    );
  }

  return <PublicHome />;
}
