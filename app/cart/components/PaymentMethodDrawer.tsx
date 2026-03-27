"use client";

import type { PaymentMethodId } from "@/lib/cart/paymentTypes";
import { ArrowRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export type { PaymentMethodId } from "@/lib/cart/paymentTypes";

type PaymentMethodDrawerProps = {
  open: boolean;
  onClose: () => void;
  subtotal: number;
  couponDiscount: number;
  delivery: number;
  total: number;
  couponLabel: string | null;
  onPlaceOrder: (method: PaymentMethodId) => void;
};

function money(n: number) {
  return `₹${n.toFixed(2)}`;
}

const ONLINE_OPTIONS: { id: Exclude<PaymentMethodId, "cod">; label: string }[] =
  [
    { id: "gpay", label: "G Pay" },
    { id: "phonepe", label: "PhonePe" },
    { id: "upi", label: "UPI" },
  ];

export default function PaymentMethodDrawer({
  open,
  onClose,
  subtotal,
  couponDiscount,
  delivery,
  total,
  couponLabel,
  onPlaceOrder,
}: PaymentMethodDrawerProps) {
  const [method, setMethod] = useState<PaymentMethodId>("phonepe");

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handlePlace = useCallback(() => {
    onPlaceOrder(method);
  }, [method, onPlaceOrder]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-black/50 transition-opacity"
        aria-label="Close"
        onClick={onClose}
      />
      <div
        className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl animate-[drawerIn_0.28s_ease-out_forwards]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-drawer-title"
      >
        <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
          <h2
            id="payment-drawer-title"
            className="text-lg font-bold text-neutral-900"
          >
            Select Payment Method
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-neutral-500 hover:bg-neutral-100"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-3">
            Online Payment
          </p>
          <div className="space-y-2">
            {ONLINE_OPTIONS.map((opt) => (
              <label
                key={opt.id}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
                  method === opt.id
                    ? "border-[#C8F04C] bg-[#C8F04C]/10"
                    : "border-neutral-200 hover:border-neutral-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={method === opt.id}
                  onChange={() => setMethod(opt.id)}
                  className="text-[#C8F04C] focus:ring-[#C8F04C]"
                />
                <span className="font-medium text-neutral-900">{opt.label}</span>
              </label>
            ))}
          </div>

          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 mt-8 mb-3">
            Offline Payment
          </p>
          <label
            className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
              method === "cod"
                ? "border-[#C8F04C] bg-[#C8F04C]/10"
                : "border-neutral-200 hover:border-neutral-300"
            }`}
          >
            <input
              type="radio"
              name="payment"
              checked={method === "cod"}
              onChange={() => setMethod("cod")}
              className="text-[#C8F04C] focus:ring-[#C8F04C]"
            />
            <span className="font-medium text-neutral-900">Cash On Delivery</span>
          </label>
        </div>

        <div className="border-t border-neutral-100 bg-neutral-50 px-5 py-5 space-y-3">
          <div className="rounded-2xl bg-white border border-neutral-200 p-4 space-y-2 text-sm">
            <div className="flex justify-between text-neutral-600">
              <span>Sub Total</span>
              <span className="font-medium text-neutral-900">
                {money(subtotal)}
              </span>
            </div>
            {couponDiscount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Coupon Discount</span>
                <span className="font-medium">
                  −{money(couponDiscount)}
                  {couponLabel && (
                    <span className="text-neutral-400 font-normal text-xs ml-1">
                      ({couponLabel})
                    </span>
                  )}
                </span>
              </div>
            )}
            <div className="flex justify-between text-neutral-600">
              <span>Delivery Charges</span>
              <span className="font-medium text-neutral-900">
                {delivery === 0 ? "Free" : money(delivery)}
              </span>
            </div>
            <div className="border-t border-neutral-100 pt-2 flex justify-between">
              <span className="font-bold text-neutral-900">Total</span>
              <span className="font-bold text-neutral-900">{money(total)}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={handlePlace}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#C8F04C] py-3.5 font-semibold text-neutral-900 hover:bg-[#b8df3c] transition-colors"
          >
            Place Order
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
