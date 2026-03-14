"use client";

import { Facebook, Instagram, Linkedin, MapPin, Twitter } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "X" },
];

export default function AnnouncementBar() {
  return (
    <div className="bg-neutral-200 text-neutral-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-2 py-2">
        <div className="flex items-center gap-3">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <Link
              key={label}
              href={href}
              aria-label={label}
              className="text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <Icon className="w-4 h-4" />
            </Link>
          ))}
        </div>
        <p className="font-medium text-center flex-1 min-w-[140px]">
          Summer sale discount 50% off
        </p>
        <div className="flex items-center gap-2 text-neutral-600">
          <MapPin className="w-4 h-4 shrink-0" />
          <span>Delivering To</span>
          <a href="tel:07208508263" className="font-medium hover:underline">
            072085 08263
          </a>
        </div>
      </div>
    </div>
  );
}
