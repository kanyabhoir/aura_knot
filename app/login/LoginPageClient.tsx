"use client";

import LoginModal from "@/globalComponents/auth/LoginModal";
import { useAuth } from "@/lib/auth/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPageClient() {
  const { user, hydrated } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (hydrated && user) {
      router.replace("/");
    }
  }, [hydrated, user, router]);

  if (!hydrated || user) {
    return (
      <main className="min-h-[50vh] bg-white flex items-center justify-center">
        <p className="text-sm text-neutral-400">Loading…</p>
      </main>
    );
  }

  return (
    <LoginModal
      open={open}
      onClose={() => {
        setOpen(false);
        router.push("/");
      }}
      variant="login"
    />
  );
}
