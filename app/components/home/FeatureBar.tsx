"use client";

import {
  Headset,
  ShieldCheck,
  Tag,
  Truck,
} from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "PAN India Delivery",
    desc: "For orders over ₹400",
  },
  {
    icon: Tag,
    title: "Exclusive Deals",
    desc: "Grab Massive Discounts",
  },
  {
    icon: ShieldCheck,
    title: "Safe Payments",
    desc: "100% secure payment",
  },
  {
    icon: Headset,
    title: "Quality Support",
    desc: "Dedicated 24/7 support",
  },
];

export default function FeatureBar() {
  return (
    <section className="w-full bg-neutral-900 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex items-center gap-4 p-4 rounded-lg border border-white/10 hover:border-[#CFFF00]/30 transition-colors"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white/20 text-[#CFFF00]">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-[#CFFF00]">{title}</p>
                <p className="text-sm text-neutral-300">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
