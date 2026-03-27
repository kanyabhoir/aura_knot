"use client";

import Newsletter from "@/app/components/home/Newsletter";
import Breadcrumbs from "@/app/shop/components/Breadcrumbs";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function OrderConfirmedClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order") ?? "B6CT3";

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            { label: "Order confirmed" },
          ]}
        />

        <div className="mt-8 rounded-3xl bg-neutral-100 border border-neutral-200/80 px-6 py-12 sm:px-12 sm:py-16 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-neutral-200">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-inner">
              <Check className="w-7 h-7 text-green-600 stroke-[3]" />
            </div>
          </div>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-800">
            Thank you
          </p>
          <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-green-600">
            Your order is confirmed!!!
          </h1>
          <p className="mt-4 text-sm sm:text-base text-neutral-600 max-w-md mx-auto leading-relaxed">
            We&apos;ve received your order and will ship in 5–7 business days.
            Your order number is{" "}
            <span className="font-semibold text-neutral-900">#{orderId}</span>
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/order/${encodeURIComponent(orderId)}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C8F04C] px-8 py-3.5 font-semibold text-neutral-900 hover:bg-[#b8df3c] transition-colors"
            >
              View Order
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-8 py-3.5 font-semibold text-[#C8F04C] hover:bg-neutral-800 transition-colors"
            >
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Newsletter />
      </div>
    </div>
  );
}
