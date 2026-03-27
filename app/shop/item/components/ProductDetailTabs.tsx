"use client";

import { useState } from "react";

type TabId = "description" | "shipping";

type ProductDetailTabsProps = {
  description: string;
  shippingReturn: string;
  keyFeatures: string[];
};

export default function ProductDetailTabs({
  description,
  shippingReturn,
  keyFeatures,
}: ProductDetailTabsProps) {
  const [tab, setTab] = useState<TabId>("description");

  return (
    <div className="mt-12 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex gap-8 border-b border-neutral-200">
        <button
          type="button"
          onClick={() => setTab("description")}
          className={`pb-3 text-sm font-semibold transition-colors ${
            tab === "description"
              ? "text-neutral-900 border-b-2 border-neutral-900 -mb-px"
              : "text-neutral-500 hover:text-neutral-800"
          }`}
        >
          Product Description
        </button>
        <button
          type="button"
          onClick={() => setTab("shipping")}
          className={`pb-3 text-sm font-semibold transition-colors ${
            tab === "shipping"
              ? "text-neutral-900 border-b-2 border-neutral-900 -mb-px"
              : "text-neutral-500 hover:text-neutral-800"
          }`}
        >
          Shipping &amp; Return
        </button>
      </div>

      <div className="mt-6 text-sm leading-relaxed text-neutral-600 space-y-5">
        {tab === "description" && (
          <>
            <p>{description}</p>
            <div>
              <h3 className="mb-3 font-semibold text-neutral-900">
                Key Features
              </h3>
              <ul className="list-none space-y-2">
                {keyFeatures.map((f, i) => (
                  <li key={i} className="flex gap-2.5 text-neutral-600">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#C8F04C]" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
        {tab === "shipping" && <p>{shippingReturn}</p>}
      </div>
    </div>
  );
}
