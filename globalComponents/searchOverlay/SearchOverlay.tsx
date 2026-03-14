"use client";

import { ArrowLeft, Search, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const SUGGESTIONS = [
  "Woolen Pockets",
  "Floral Quilling Wall Frame",
  "Paper Quilling Greeting Card Set",
  "Handmade Character Sketch",
  "Wool Toys",
  "Penguin Wool Organizer",
  "Bird Embroidered Phone Case",
  "Minimal Line Art Frame",
  "Mandala Quilling Artwork",
] as const;

type SearchOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [selectedSearches, setSelectedSearches] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = SUGGESTIONS.filter(
    (s) =>
      !selectedSearches.includes(s) &&
      (searchValue === "" ||
        s.toLowerCase().includes(searchValue.toLowerCase()))
  );

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setSearchValue("");
      document.body.style.overflow = "hidden";
    } else {
      setSelectedSearches([]);
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const addTag = useCallback((tag: string) => {
    setSelectedSearches((prev) =>
      prev.includes(tag) ? prev : [...prev, tag]
    );
  }, []);

  const removeTag = useCallback((tag: string) => {
    setSelectedSearches((prev) => prev.filter((t) => t !== tag));
  }, []);

  const clearAll = useCallback(() => {
    setSelectedSearches([]);
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      className="fixed inset-0 z-[100] flex justify-center"
      onKeyDown={handleKeyDown}
    >
      {/* Dark background overlay */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity duration-300"
        onClick={handleBackdropClick}
      />

      {/* Search container - centered white card */}
      <div className="relative z-10 w-full max-w-2xl mx-4 mt-6 sm:mt-10 animate-[fadeSlideIn_0.3s_ease-out_forwards]">
        <div className="rounded-2xl bg-white shadow-xl overflow-hidden">
          {/* Search input bar */}
          <div className="flex items-center gap-2 p-4 border-b border-neutral-100">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close search"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="search"
                placeholder="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-3 pl-4 pr-11 text-base placeholder:text-neutral-400 focus:border-[#CFFF00] focus:outline-none focus:ring-2 focus:ring-[#CFFF00]/30 transition-shadow"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
            </div>
          </div>

          {/* Selected tags + Clear all */}
          <div className="px-4 pt-4">
            {(selectedSearches.length > 0 && (
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="flex flex-wrap gap-2 flex-1 min-w-0">
                  {selectedSearches.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 border border-neutral-200 px-3 py-1.5 text-sm text-neutral-800 transition-all duration-200 hover:border-neutral-300"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        aria-label={`Remove ${tag}`}
                        className="rounded-full p-0.5 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-800 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={clearAll}
                  className="shrink-0 rounded-lg bg-red-400 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-500 transition-colors"
                >
                  Clear all
                </button>
              </div>
            )) || null}
          </div>

          {/* Suggested Searches */}
          <div className="px-4 pb-6">
            <h3 className="text-sm font-semibold text-neutral-800 mb-3">
              Suggested Searches
            </h3>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => addTag(suggestion)}
                  className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-700 hover:bg-[#CFFF00]/20 hover:border-[#CFFF00]/40 transition-colors duration-200"
                >
                  {suggestion}
                </button>
              ))}
              {suggestions.length === 0 && (
                <p className="text-sm text-neutral-500 py-2">
                  No more suggestions. Try typing in the search bar.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
