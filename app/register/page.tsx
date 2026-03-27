import type { Metadata } from "next";
import RegisterPageClient from "./RegisterPageClient";

export const metadata: Metadata = {
  title: "Register | KANNYA.art",
  description: "Create your KANNYA.art account",
};

export default function RegisterPage() {
  return <RegisterPageClient />;
}
