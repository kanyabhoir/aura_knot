import type { Metadata } from "next";
import AccountPageClient from "./AccountPageClient";

export const metadata: Metadata = {
  title: "Account | KANNYA.art",
  description: "Your KANNYA.art account",
};

export default function AccountPage() {
  return <AccountPageClient />;
}
