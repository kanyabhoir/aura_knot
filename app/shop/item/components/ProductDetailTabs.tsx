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
    <div className="mt-12 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
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
          Shipping & Return
        </button>
      </div>

      <div className="mt-6 text-neutral-600 text-sm leading-relaxed space-y-4">
        {tab === "description" && (
          <>
            <p>{description}</p>
            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">
                Key Features
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                {keyFeatures.map((f, i) => (
                  <li key={i}>{f}</li>
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
