"use client";

import Newsletter from "@/app/components/home/Newsletter";
import Breadcrumbs from "@/app/shop/components/Breadcrumbs";
import {
  getOrder,
  paymentMethodLabel,
  type StoredOrder,
} from "@/lib/orders/storage";
import { ArrowLeft, MapPin, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function money(n: number) {
  return `₹${n.toFixed(2)}`;
}

export default function OrderViewClient() {
  const params = useParams();
  const orderId = decodeURIComponent((params.orderId as string) ?? "");
  const [order, setOrder] = useState<StoredOrder | null | undefined>(undefined);

  useEffect(() => {
    if (!orderId) {
      setOrder(null);
      return;
    }
    setOrder(getOrder(orderId));
  }, [orderId]);

  if (order === undefined) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center text-neutral-500">
        Loading order…
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <Package className="w-14 h-14 mx-auto text-neutral-300" />
          <h1 className="mt-4 text-xl font-bold text-neutral-900">
            Order not found
          </h1>
          <p className="mt-2 text-neutral-600 text-sm">
            We couldn&apos;t find this order. It may have been placed on another
            device or the link is incorrect.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#C8F04C] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to shop
          </Link>
        </div>
      </div>
    );
  }

  const placed = new Date(order.createdAt);

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            { label: `Order #${order.id}` },
          ]}
        />

        <div className="mt-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
              Order #{order.id}
            </h1>
            <p className="mt-1 text-sm text-neutral-500">
              Placed on{" "}
              {placed.toLocaleDateString(undefined, {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}{" "}
              · {placed.toLocaleTimeString(undefined, { timeStyle: "short" })}
            </p>
          </div>
          <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 w-fit">
            Confirmed
          </span>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="w-4 h-4 shrink-0 text-neutral-500 mt-0.5" />
              <div>
                <p className="font-semibold text-neutral-900">Delivery</p>
                <p className="text-neutral-600 mt-0.5">
                  PIN {order.pin}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <p className="font-semibold text-neutral-900 text-sm">Payment</p>
            <p className="text-neutral-600 mt-0.5 text-sm">
              {paymentMethodLabel(order.paymentMethod)}
            </p>
            <p className="text-xs text-neutral-400 mt-2">
              Ships in 5–7 business days
            </p>
          </div>
        </div>

        <h2 className="mt-10 text-lg font-bold text-neutral-900">
          Items ordered
        </h2>
        <ul className="mt-4 space-y-4">
          {order.items.map((line) => {
            const lineTotal = line.price * line.qty;
            const mrpTotal = line.oldPrice * line.qty;
            const saved = Math.max(0, mrpTotal - lineTotal);
            return (
              <li
                key={`${order.id}-${line.id}`}
                className="relative flex gap-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm"
              >
                {line.onSale && (
                  <span className="absolute right-3 top-3 rounded-full bg-green-500 px-2 py-0.5 text-xs font-medium text-white">
                    Sale
                  </span>
                )}
                <Link
                  href={`/shop/item/${line.id}`}
                  className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-neutral-100"
                >
                  <Image
                    src={line.image}
                    alt={line.title}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </Link>
                <div className="min-w-0 flex-1 pr-16">
                  <Link
                    href={`/shop/item/${line.id}`}
                    className="font-semibold text-neutral-900 hover:text-[#C8F04C] line-clamp-2"
                  >
                    {line.title}
                  </Link>
                  <p className="text-sm text-neutral-500 mt-1">Qty {line.qty}</p>
                  <p className="mt-1 text-base font-semibold text-neutral-900">
                    {money(lineTotal)}
                  </p>
                  {saved > 0 && (
                    <p className="text-xs text-green-600 font-medium">
                      You saved {money(saved)}
                    </p>
                  )}
                  <p className="text-xs text-neutral-400 mt-0.5">
                    MRP {money(mrpTotal)} (incl. taxes)
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm max-w-md ml-auto space-y-2 text-sm">
          <div className="flex justify-between text-neutral-600">
            <span>Sub Total</span>
            <span className="font-medium text-neutral-900">
              {money(order.subtotal)}
            </span>
          </div>
          {order.mrpSubtotal > order.subtotal && (
            <p className="text-xs text-green-600">
              Saved {money(order.mrpSubtotal - order.subtotal)} on MRP
            </p>
          )}
          {order.couponDiscount > 0 && order.couponCode && (
            <div className="flex justify-between text-green-600">
              <span>Coupon ({order.couponCode})</span>
              <span className="font-medium">−{money(order.couponDiscount)}</span>
            </div>
          )}
          <div className="flex justify-between text-neutral-600">
            <span>Delivery</span>
            <span className="font-medium text-neutral-900">
              {order.delivery === 0 ? "Free" : money(order.delivery)}
            </span>
          </div>
          <div className="border-t border-neutral-100 pt-3 flex justify-between">
            <span className="font-bold text-neutral-900">Total paid</span>
            <span className="font-bold text-neutral-900">{money(order.total)}</span>
          </div>
        </div>

        <Link
          href="/shop"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-[#C8F04C]"
        >
          <ArrowLeft className="w-4 h-4" />
          Continue shopping
        </Link>
      </div>

      <div className="mt-8">
        <Newsletter />
      </div>
    </div>
  );
}
