import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Twitter,
} from "lucide-react";
import Link from "next/link";

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "X" },
];

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <span className="text-xl font-bold text-[#CFFF00]">KANNYA</span>
            <p className="mt-3 text-sm text-neutral-400">
              Thank you for reaching out — your love for handmade art means a
              lot to us!
            </p>
          </div>

          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Quick links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-[#CFFF00] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-[#CFFF00] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#CFFF00] transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#CFFF00] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#CFFF00] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-[#CFFF00] transition-colors">
                  Return & Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Our Products
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop?category=wool" className="hover:text-[#CFFF00] transition-colors">
                  Woolen Products
                </Link>
              </li>
              <li>
                <Link href="/shop?category=quilling" className="hover:text-[#CFFF00] transition-colors">
                  Quilling Arts
                </Link>
              </li>
              <li>
                <Link href="/shop?category=sketches" className="hover:text-[#CFFF00] transition-colors">
                  Sketches
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="tel:+917028875272"
                  className="flex items-center gap-2 hover:text-[#CFFF00] transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  +91 7028875272
                </a>
              </li>
              <li>
                <a
                  href="mailto:kannyabhoi@gmail.com"
                  className="flex items-center gap-2 hover:text-[#CFFF00] transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  kannyabhoi@gmail.com
                </a>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-neutral-400 hover:text-[#CFFF00] transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <p className="text-center text-sm text-neutral-500">
            © 2025 kannya&apos;s art. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
