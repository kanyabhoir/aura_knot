import type { Metadata } from "next";
import LoginPageClient from "./LoginPageClient";

export const metadata: Metadata = {
  title: "Log in | KANNYA.art",
  description: "Sign in to your KANNYA.art account",
};

export default function LoginPage() {
  return <LoginPageClient />;
}
