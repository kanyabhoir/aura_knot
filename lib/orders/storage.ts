import type { PaymentMethodId } from "@/lib/cart/paymentTypes";

export type StoredOrderLine = {
  id: string;
  title: string;
  image: string;
  price: number;
  oldPrice: number;
  qty: number;
  onSale: boolean;
};

export type StoredOrder = {
  id: string;
  createdAt: string;
  pin: string;
  items: StoredOrderLine[];
  subtotal: number;
  mrpSubtotal: number;
  couponDiscount: number;
  couponCode: string | null;
  delivery: number;
  total: number;
  paymentMethod: PaymentMethodId;
};

const ORDERS_KEY = "kannya-orders-v1";

export function saveOrder(order: StoredOrder): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    const map: Record<string, StoredOrder> = raw ? JSON.parse(raw) : {};
    map[order.id] = order;
    localStorage.setItem(ORDERS_KEY, JSON.stringify(map));
  } catch {
    /* ignore */
  }
}

export function getOrder(id: string): StoredOrder | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (!raw) return null;
    const map: Record<string, StoredOrder> = JSON.parse(raw);
    return map[id] ?? null;
  } catch {
    return null;
  }
}

export function paymentMethodLabel(method: PaymentMethodId): string {
  switch (method) {
    case "gpay":
      return "G Pay";
    case "phonepe":
      return "PhonePe";
    case "upi":
      return "UPI";
    case "cod":
      return "Cash On Delivery";
    default:
      return method;
  }
}
