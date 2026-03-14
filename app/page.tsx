"use client";

import Image from "next/image";
import { useState } from "react";
export default function HomePage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      {/* <OfferBanner />
      <CurrentProductSection />
      <HeroSection /> */}
      <div> hello dada mi home page</div>
      <div className="p-6">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-[#CFFF00] text-black rounded-md hover:bg-[#b8e600] transition"
        >
          Open Modal
        </button>

        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-white rounded-lg p-6 w-[90%] max-w-sm relative">
              {/* Close button */}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-black"
              >
                ✕
              </button>

              <h2 className="text-lg font-semibold mb-2">Modal Title</h2>
              <hr className="border-t border-[#CAD5E2]" />

              <Image
                src="/images/guide.png"
                alt="My image"
                width={300}
                height={200}
              />
              <h2 className="text-[24px] font-semibold mb-2 text-[#051B2C]">
                Welcome to
              </h2>
              <p className="text-gray-600 mb-4">
                This modal opened when you clicked the button.
              </p>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-3 py-2 bg-[#CFFF00] text-black rounded-md hover:bg-[#b8e600]"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
