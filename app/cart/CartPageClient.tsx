"use client";

import Newsletter from "@/app/components/home/Newsletter";
import Breadcrumbs from "@/app/shop/components/Breadcrumbs";
import { type CartLine, useCart } from "@/lib/cart/CartContext";
import {
  ArrowRight,
  MapPin,
  Minus,
  Plus,
  Tag,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import type { PaymentMethodId } from "@/lib/cart/paymentTypes";
import { saveOrder } from "@/lib/orders/storage";
import PaymentMethodDrawer from "./components/PaymentMethodDrawer";

const FREE_DELIVERY_MIN = 499;
const DELIVERY_CHARGE = 20;

const VALID_COUPONS: Record<string, { label: string; percent: number }> = {
  KANNYA10: { label: "10% off order", percent: 10 },
  KANN10: { label: "10% off order", percent: 10 },
};

const LISTED_OFFERS: {
  id: string;
  code: string;
  description: string;
  applyOnly?: "info";
}[] = [
  { id: "list-1", code: "KANNYA10", description: "10% OFF your first order" },
  {
    id: "list-2",
    code: "SHIP499",
    description: "Free delivery on orders above ₹499",
    applyOnly: "info",
  },
];

function money(n: number) {
  return `₹${n.toFixed(2)}`;
}

function generateOrderId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 5; i++) {
    s += chars[Math.floor(Math.random() * chars.length)];
  }
  return s;
}

function CartLineRow({
  line,
  onInc,
  onDec,
  onRemove,
}: {
  line: CartLine;
  onInc: () => void;
  onDec: () => void;
  onRemove: () => void;
}) {
  const lineTotal = line.price * line.qty;
  const mrpTotal = line.oldPrice * line.qty;
  const saved = Math.max(0, mrpTotal - lineTotal);

  return (
    <div className="relative flex gap-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
      {line.onSale && (
        <span className="absolute right-14 top-3 rounded-full bg-green-500 px-2.5 py-0.5 text-xs font-medium text-white">
          Sale
        </span>
      )}
      <Link
        href={`/shop/item/${line.id}`}
        className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 overflow-hidden rounded-xl bg-neutral-100"
      >
        <Image
          src={line.image}
          alt={line.title}
          fill
          className="object-cover"
          sizes="112px"
        />
      </Link>
      <div className="min-w-0 flex-1 pr-10">
        <Link
          href={`/shop/item/${line.id}`}
          className="font-bold text-neutral-900 hover:text-[#C8F04C] transition-colors line-clamp-2"
        >
          {line.title}
        </Link>
        <p className="mt-1 text-lg font-semibold text-neutral-900">
          {money(lineTotal)}
        </p>
        {saved > 0 && (
          <p className="text-sm text-green-600 font-medium">
            You saved {money(saved)}
          </p>
        )}
        <p className="text-xs text-neutral-500 mt-0.5">
          MRP {money(mrpTotal)} (incl. of all taxes)
        </p>
        <div className="mt-3 inline-flex items-center rounded-full border border-neutral-200">
          <button
            type="button"
            onClick={onDec}
            className="p-2 rounded-l-full hover:bg-neutral-50"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-4 text-sm font-medium tabular-nums">
            {line.qty}
          </span>
          <button
            type="button"
            onClick={onInc}
            className="p-2 rounded-r-full hover:bg-neutral-50"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full border border-red-100 bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
        aria-label="Remove from cart"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function CartPageClient() {
  const router = useRouter();
  const { items, hydrated, setQty, removeItem, clearCart } = useCart();
  const [couponInput, setCouponInput] = useState("KANNYA10");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    percent: number;
  } | null>(null);
  const [pin, setPin] = useState("421365");
  const [paymentOpen, setPaymentOpen] = useState(false);

  const subtotal = useMemo(
    () => items.reduce((s, x) => s + x.price * x.qty, 0),
    [items]
  );

  const mrpSubtotal = useMemo(
    () => items.reduce((s, x) => s + x.oldPrice * x.qty, 0),
    [items]
  );

  const couponDiscount = appliedCoupon
    ? (subtotal * appliedCoupon.percent) / 100
    : 0;

  const afterCoupon = subtotal - couponDiscount;
  const delivery =
    items.length === 0 ? 0 : afterCoupon >= FREE_DELIVERY_MIN ? 0 : DELIVERY_CHARGE;
  const total = afterCoupon + delivery;

  const applyCoupon = (raw: string) => {
    const code = raw.trim().toUpperCase();
    const def = VALID_COUPONS[code];
    if (!def) {
      toast.error("Invalid coupon code");
      return;
    }
    setAppliedCoupon({ code, percent: def.percent });
    setCouponInput(code);
    toast.success("Coupon applied!");
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    toast.success("Coupon removed");
  };

  const handleListedApply = (code: string) => {
    if (code === "SHIP499") {
      toast("Add more items for free delivery — orders over ₹499 ship free.");
      return;
    }
    applyCoupon(code);
  };

  const handlePlaceOrder = useCallback(
    (method: PaymentMethodId) => {
      const orderId = generateOrderId();
      saveOrder({
        id: orderId,
        createdAt: new Date().toISOString(),
        pin,
        items: items.map((l) => ({
          id: l.id,
          title: l.title,
          image: l.image,
          price: l.price,
          oldPrice: l.oldPrice,
          qty: l.qty,
          onSale: l.onSale,
        })),
        subtotal,
        mrpSubtotal,
        couponDiscount,
        couponCode: appliedCoupon?.code ?? null,
        delivery,
        total,
        paymentMethod: method,
      });
      clearCart();
      setPaymentOpen(false);
      router.push(`/order/confirmed?order=${encodeURIComponent(orderId)}`);
    },
    [
      appliedCoupon?.code,
      clearCart,
      couponDiscount,
      delivery,
      items,
      mrpSubtotal,
      pin,
      router,
      subtotal,
      total,
    ]
  );

  if (!hydrated) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center text-neutral-500">
        Loading cart…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Toaster position="top-center" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Cart" },
          ]}
        />

        <h1 className="mt-6 text-3xl font-bold text-neutral-900">My Cart</h1>

        {items.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-neutral-200 bg-white p-12 text-center shadow-sm">
            <p className="text-neutral-600">Your cart is empty.</p>
            <Link
              href="/shop"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#C8F04C] px-6 py-3 font-semibold text-neutral-900 hover:bg-[#b8df3c] transition-colors"
            >
              Continue shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              {items.map((line) => (
                <CartLineRow
                  key={line.id}
                  line={line}
                  onInc={() => setQty(line.id, line.qty + 1)}
                  onDec={() =>
                    line.qty > 1
                      ? setQty(line.id, line.qty - 1)
                      : removeItem(line.id)
                  }
                  onRemove={() => removeItem(line.id)}
                />
              ))}
            </div>

            <div className="space-y-4 lg:col-span-1">
              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <h2 className="font-bold text-neutral-900 mb-3">Address</h2>
                <div className="flex items-start gap-2 text-sm text-neutral-700">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-neutral-500" />
                  <div className="flex-1">
                    <p>Delivery to: {pin}</p>
                    <button
                      type="button"
                      onClick={() => {
                        const next = window.prompt("Enter PIN code", pin);
                        if (next && next.trim()) setPin(next.trim());
                      }}
                      className="mt-1 text-sm font-medium text-[#C8F04C] hover:underline"
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <h2 className="font-bold text-neutral-900 mb-3">Coupon Code</h2>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="E.g. PH100"
                    className="flex-1 rounded-xl border border-neutral-200 px-3 py-2 text-sm uppercase"
                  />
                  {!appliedCoupon ? (
                    <button
                      type="button"
                      onClick={() => applyCoupon(couponInput)}
                      className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
                    >
                      Apply
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                    >
                      Remove
                    </button>
                  )}
                </div>
                {appliedCoupon && (
                  <p className="mt-2 text-sm font-medium text-green-600">
                    Coupon applied!
                  </p>
                )}
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-bold text-neutral-900">Coupons &amp; Offers</h2>
                  <button type="button" className="text-sm text-[#C8F04C] font-medium">
                    See All
                  </button>
                </div>
                <ul className="space-y-2">
                  {LISTED_OFFERS.map((o) => (
                    <li
                      key={o.id}
                      className="flex items-center justify-between gap-2 rounded-xl bg-neutral-50 px-3 py-2 text-sm"
                    >
                      <span className="flex items-center gap-2 text-neutral-700">
                        <Tag className="w-4 h-4 text-[#C8F04C] shrink-0" />
                        {o.description}
                      </span>
                      {o.applyOnly === "info" ? (
                        <span className="text-xs text-neutral-500">Info</span>
                      ) : appliedCoupon?.code === o.code ? (
                        <span className="text-xs font-medium text-green-600">
                          Applied
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleListedApply(o.code)}
                          className="text-xs font-semibold text-[#C8F04C] hover:underline"
                        >
                          Apply
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm space-y-3">
                <div className="flex justify-between text-sm text-neutral-600">
                  <span>Sub Total</span>
                  <span className="font-medium text-neutral-900">
                    {money(subtotal)}
                  </span>
                </div>
                {mrpSubtotal > subtotal && (
                  <p className="text-xs text-green-600">
                    You save {money(mrpSubtotal - subtotal)} on MRP
                  </p>
                )}
                {appliedCoupon && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Coupon Discount ({appliedCoupon.code})</span>
                    <span className="font-medium">
                      −{money(couponDiscount)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-neutral-600">
                  <span>Delivery Charges</span>
                  <span className="font-medium text-neutral-900">
                    {delivery === 0 ? "Free" : money(delivery)}
                  </span>
                </div>
                <div className="border-t border-neutral-100 pt-3 flex justify-between items-baseline">
                  <span className="font-bold text-neutral-900">Total</span>
                  <span className="text-xl font-bold text-neutral-900">
                    {money(total)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setPaymentOpen(true)}
                  className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#C8F04C] py-3.5 font-semibold text-neutral-900 hover:bg-[#b8df3c] transition-colors"
                >
                  Check Out {money(total)}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <PaymentMethodDrawer
        open={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        subtotal={subtotal}
        couponDiscount={couponDiscount}
        delivery={delivery}
        total={total}
        couponLabel={appliedCoupon?.code ?? null}
        onPlaceOrder={handlePlaceOrder}
      />

      <div className="mt-8">
        <Newsletter />
      </div>
    </div>
  );
}
