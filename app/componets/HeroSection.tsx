"use client";

import Image from "next/image";

const features = [
  {
    img: "/images/Delivery.png",
    title: "PAN India Delivery",
    desc: "For all orders over ₹120",
  },
  {
    img: "/images/ExclusiveDeals.png",
    title: "Exclusive Deals",
    desc: "Grab Massive Discounts",
  },
  {
    img: "/images/CardPayment.png",
    title: "Safe Payments",
    desc: "100% secure payment",
  },
  {
    img: "/images/Support.png",
    title: "Quality Support",
    desc: "Dedicated 24/7 support",
  },
];

export default function HeroSection() {
  return (
    <div className="w-full bg-[#1F1F27] text-white py-4 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Mobile: grid | Desktop: flex */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:flex md:items-center md:justify-between">

          {features.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 md:px-4"
            >
              <Image
                src={item.img}
                alt={item.title}
                width={36}
                height={36}
                className="shrink-0"
              />

              <div className="flex flex-col text-xs sm:text-sm leading-tight">
                <span className="font-semibold text-[#CFFF00]">
                  {item.title}
                </span>
                <span className="text-gray-200">
                  {item.desc}
                </span>
              </div>

              {/* Divider only on desktop */}
              {index !== features.length - 1 && (
                <div className="hidden md:block h-10 w-px bg-[#CFFF00] ml-4" />
              )}
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
