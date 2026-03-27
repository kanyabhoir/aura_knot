import { Suspense } from "react";
import OrderConfirmedClient from "./OrderConfirmedClient";

function OrderConfirmedFallback() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center text-neutral-500">
      Loading…
    </div>
  );
}

export default function OrderConfirmedPage() {
  return (
    <Suspense fallback={<OrderConfirmedFallback />}>
      <OrderConfirmedClient />
    </Suspense>
  );
}
