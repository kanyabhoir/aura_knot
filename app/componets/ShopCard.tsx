"use client";

import Image from "next/image";
import { ReactNode } from "react";

type ShopCardProps = {
  image: string;
  title: ReactNode;
  description: string;
  titleSize?: string;
};

const ShopCard = ({
  image,
  title,
  description,
  titleSize = "text-3xl",
}: ShopCardProps) => {
  return (
    <div className="relative h-full overflow-hidden rounded-xl group">
      <Image
        src={image}
        alt="Shop card image"
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-125"
        priority={false}
      />

      <div className="absolute inset-x-3 bottom-4 md:top-1/2 md:-translate-y-1/2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg p-4">
        <p className="text-white/90 text-sm mb-1">{description}</p>

        <h2 className={`text-white font-bold leading-snug ${titleSize}`}>
          {title}
        </h2>

        <button
          type="button"
          className="mt-3 inline-flex items-center gap-2 bg-[#CFFF00] px-3 py-2 rounded-md text-black text-sm font-medium hover:bg-[#b8e600] transition"
        >
          Shop Now
          <Image
            src="/images/ForwardArrow.png"
            alt="Arrow"
            width={18}
            height={18}
          />
        </button>
      </div>
    </div>
  );
};

export default ShopCard;
