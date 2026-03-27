import { Suspense } from "react";
import OrderViewClient from "./OrderViewClient";

function Fallback() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center text-neutral-500">
      Loading…
    </div>
  );
}

export default function OrderDetailPage() {
  return (
    <Suspense fallback={<Fallback />}>
      <OrderViewClient />
    </Suspense>
  );
}
