"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Start fade out animation after 2 seconds
    const fadeTimer = setTimeout(() => {
      setIsAnimating(true);
    }, 2000);

    // Remove from DOM after animation completes
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-1000 ${
        isAnimating ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center justify-center gap-6">
        {/* Logo with animation */}
        <div
          className={`transition-all duration-1000 ${
            isAnimating
              ? "scale-90 opacity-0"
              : "scale-100 opacity-100 animate-pulse"
          }`}
        >
          <Image
            src="/header/Logo.svg"
            alt="Aura Knot Logo"
            width={150}
            height={30}
            className="object-contain"
            priority
          />
        </div>

        {/* Loading spinner */}
        <div
          className={`transition-opacity duration-500 ${
            isAnimating ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-4 border-[#CFFF00] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;

