"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // TODO: integrate with newsletter API
      setEmail("");
    }
  };

  return (
    <section className="relative overflow-hidden py-16 px-4 sm:px-6">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(135deg, #86efac 0%, #67e8f9 30%, #fde047 60%, #c4b5fd 100%)",
        }}
      />
      <div className="max-w-2xl mx-auto text-center relative z-0">
        <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-md">
          SUBSCRIBE AND GET
        </h2>
        <p className="mt-2 text-xl sm:text-2xl font-bold text-white/95 drop-shadow">
          20% Off on your first purchase.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address..."
            className="flex-1 rounded-lg border border-white/30 bg-white/90 px-4 py-3 text-neutral-900 placeholder:text-neutral-500 focus:border-[#CFFF00] focus:outline-none focus:ring-2 focus:ring-[#CFFF00]"
            required
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#CFFF00] px-6 py-3 font-medium text-neutral-900 hover:bg-[#b8e600] transition-colors"
          >
            Subscribe
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </section>
  );
}
