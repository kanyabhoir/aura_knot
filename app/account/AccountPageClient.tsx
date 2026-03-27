"use client";

import { useAuth } from "@/lib/auth/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AccountPageClient() {
  const { user, hydrated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !user) {
      router.replace("/");
    }
  }, [hydrated, user, router]);

  if (!hydrated || !user) {
    return (
      <main className="min-h-[40vh] bg-white flex items-center justify-center">
        <p className="text-sm text-neutral-400">Loading…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white py-10 px-4 sm:px-6">
      <div className="max-w-lg mx-auto rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-neutral-900">Your account</h1>
        <p className="mt-2 text-sm text-neutral-600">
          Signed in on this browser. This is a demo profile stored locally.
        </p>
        <dl className="mt-8 space-y-3 text-sm">
          <div>
            <dt className="font-medium text-neutral-500">Name</dt>
            <dd className="mt-0.5 text-neutral-900">{user.name}</dd>
          </div>
          {user.phone && (
            <div>
              <dt className="font-medium text-neutral-500">Mobile</dt>
              <dd className="mt-0.5 text-neutral-900">{user.phone}</dd>
            </div>
          )}
          <div>
            <dt className="font-medium text-neutral-500">Email</dt>
            <dd className="mt-0.5 text-neutral-900 break-all">
              {user.email.endsWith("@kannya.local")
                ? "— (signed in with mobile)"
                : user.email}
            </dd>
          </div>
        </dl>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/shop"
            className="inline-flex rounded-lg bg-[#C8F04C] px-4 py-2.5 text-sm font-semibold text-neutral-900 hover:bg-[#d4f25f]"
          >
            Continue shopping
          </Link>
          <button
            type="button"
            onClick={() => {
              logout();
              router.replace("/");
            }}
            className="inline-flex rounded-lg border border-neutral-200 px-4 py-2.5 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
          >
            Log out
          </button>
        </div>
      </div>
    </main>
  );
}
