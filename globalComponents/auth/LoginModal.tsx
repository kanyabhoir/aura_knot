"use client";

import { useAuth } from "@/lib/auth/AuthContext";
import { normalizeIndianMobile } from "@/lib/auth/authStorage";
import { ArrowRight, ShieldCheck, Smartphone, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export type LoginModalProps = {
  open: boolean;
  onClose: () => void;
  variant?: "login" | "register";
};

type Step = "phone" | "otp";

function AuthIllustration() {
  return (
    <div className="relative mx-auto flex h-36 w-full max-w-[260px] items-center justify-center">
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#C8F04C]/25 via-emerald-100/40 to-sky-100/50" />
      <Smartphone
        className="relative h-16 w-16 text-neutral-700 drop-shadow-md"
        strokeWidth={1.25}
      />
      <div className="absolute -right-1 top-5 rounded-full bg-emerald-500 p-2.5 shadow-lg ring-4 ring-white">
        <ShieldCheck className="h-7 w-7 text-white" strokeWidth={2} />
      </div>
    </div>
  );
}

function formatTimer(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export default function LoginModal({
  open,
  onClose,
  variant = "login",
}: LoginModalProps) {
  const { user, hydrated, startPhoneLogin, verifyPhoneLogin } = useAuth();
  const [step, setStep] = useState<Step>("phone");
  const [mobileDigits, setMobileDigits] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [phoneDisplay, setPhoneDisplay] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer180] = useState(300);
  const [pending, setPending] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!open) return;
    setStep("phone");
    setMobileDigits("");
    setAgreed(false);
    setPhoneDisplay("");
    setOtp(["", "", "", "", "", ""]);
    setTimer180(300);
    setPending(false);
  }, [open, variant]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  useEffect(() => {
    if (!open || step !== "otp") return;
    const id = window.setInterval(() => {
      setTimer180((t) => (t <= 0 ? 0 : t - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [open, step]);

  useEffect(() => {
    if (hydrated && user && open) {
      onClose();
    }
  }, [hydrated, user, open, onClose]);

  const handleContinue = async () => {
    const combined = `+91 ${mobileDigits}`;
    const norm = normalizeIndianMobile(combined);
    if (!norm) {
      toast.error("Enter a valid 10-digit mobile number.");
      return;
    }
    if (!agreed) {
      toast.error("Please agree to the Terms & Conditions and Privacy Policy.");
      return;
    }
    setPending(true);
    const result = await startPhoneLogin(combined);
    setPending(false);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    setPhoneDisplay(norm);
    setTimer180(300);
    setOtp(["", "", "", "", "", ""]);
    setStep("otp");
    if (result.demoOtp) {
      toast.success(`Demo OTP: ${result.demoOtp}`, { duration: 12_000 });
    } else {
      toast.success("OTP sent to your mobile.");
    }
    window.setTimeout(() => otpRefs.current[0]?.focus(), 100);
  };

  const handleResend = async () => {
    if (timer > 0) return;
    setPending(true);
    const result = await startPhoneLogin(phoneDisplay);
    setPending(false);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    setTimer180(300);
    setOtp(["", "", "", "", "", ""]);
    if (result.demoOtp) {
      toast.success(`New demo OTP: ${result.demoOtp}`, { duration: 12_000 });
    } else {
      toast.success("OTP resent.");
    }
    otpRefs.current[0]?.focus();
  };

  const handleOtpLogin = async () => {
    const code = otp.join("");
    if (code.length !== 6) {
      toast.error("Enter the 6-digit OTP.");
      return;
    }
    setPending(true);
    const result = await verifyPhoneLogin(phoneDisplay, code);
    setPending(false);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    toast.success(variant === "register" ? "Account ready!" : "Welcome back!");
    onClose();
  };

  const onOtpChange = (i: number, val: string) => {
    const d = val.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[i] = d;
    setOtp(next);
    if (d && i < 5) otpRefs.current[i + 1]?.focus();
  };

  const onOtpKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      otpRefs.current[i - 1]?.focus();
    }
  };

  const onOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const paste =
      e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6) ?? "";
    if (paste.length === 6) {
      setOtp(paste.split(""));
      otpRefs.current[5]?.focus();
    }
  };

  if (!open) return null;

  const title = step === "otp" ? "Verify OTP" : variant === "register" ? "Register" : "Login";
  const showWelcome = step === "phone";

  return (
    <>
      <Toaster position="top-center" />
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-[0_24px_80px_-12px_rgba(0,0,0,0.35)]">
          <div className="flex items-start justify-between border-b border-neutral-200 px-6 pt-5 pb-4">
            <div>
              <h2
                id="auth-modal-title"
                className="text-lg font-bold text-neutral-900 sm:text-xl"
              >
                {title}
              </h2>
              {step === "otp" && (
                <p className="mt-1 text-sm text-neutral-500">
                  Sent to {phoneDisplay}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="px-6 pb-8 pt-6">
            <AuthIllustration />

            {showWelcome && (
              <p className="mt-6 text-center text-lg font-semibold text-neutral-900">
                {variant === "register" ? (
                  <>
                    Join{" "}
                    <span className="text-[#C8F04C]">KANNYA</span>
                    <span className="font-normal">&apos;s art</span>
                  </>
                ) : (
                  <>
                    Welcome to{" "}
                    <span className="text-[#C8F04C]">KANNYA</span>
                    <span className="font-normal">&apos;s art</span>
                  </>
                )}
              </p>
            )}

            {step === "phone" && (
              <div className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="auth-mobile"
                    className="text-sm font-medium text-neutral-800"
                  >
                    Mobile Number*
                  </label>
                  <div className="mt-1.5 flex overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm focus-within:ring-2 focus-within:ring-[#C8F04C]/40 focus-within:border-[#C8F04C]">
                    <span className="flex items-center border-r border-neutral-200 bg-neutral-50 px-3 text-sm font-medium text-neutral-600">
                      +91
                    </span>
                    <input
                      id="auth-mobile"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel"
                      maxLength={10}
                      placeholder="Enter mobile number"
                      value={mobileDigits}
                      onChange={(e) =>
                        setMobileDigits(
                          e.target.value.replace(/\D/g, "").slice(0, 10)
                        )
                      }
                      className="min-w-0 flex-1 px-3 py-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
                    />
                  </div>
                </div>

                <label className="flex cursor-pointer items-start gap-3 text-sm text-neutral-600">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-neutral-300 text-[#C8F04C] focus:ring-[#C8F04C]"
                  />
                  <span>
                    By Signing In, I agree to{" "}
                    <Link
                      href="/contact-us"
                      className="underline text-neutral-900 hover:text-[#C8F04C]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Terms &amp; Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/contact-us"
                      className="underline text-neutral-900 hover:text-[#C8F04C]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Privacy Policy
                    </Link>
                  </span>
                </label>

                <button
                  type="button"
                  disabled={
                    pending ||
                    mobileDigits.length !== 10 ||
                    !agreed
                  }
                  onClick={handleContinue}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#C8F04C] py-3.5 text-sm font-bold text-neutral-900 shadow-sm transition-colors hover:bg-[#d4f25f] disabled:cursor-not-allowed disabled:opacity-45"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {step === "otp" && (
              <div className="mt-6 space-y-5">
                <div>
                  <p className="text-sm font-medium text-neutral-800">OTP*</p>
                  <div
                    className="mt-2 flex justify-center gap-2 sm:gap-2.5"
                    onPaste={onOtpPaste}
                  >
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => {
                          otpRefs.current[i] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => onOtpChange(i, e.target.value)}
                        onKeyDown={(e) => onOtpKeyDown(i, e)}
                        className="h-12 w-10 rounded-lg border-2 border-[#C8F04C] bg-neutral-900 text-center text-lg font-bold text-[#C8F04C] shadow-inner focus:outline-none focus:ring-2 focus:ring-[#C8F04C]/50 sm:h-14 sm:w-11"
                        aria-label={`Digit ${i + 1}`}
                      />
                    ))}
                  </div>
                  <p className="mt-3 text-center text-sm text-neutral-500">
                    Resend OTP in :{" "}
                    <span className="font-bold text-neutral-900 tabular-nums">
                      {formatTimer(timer)}s
                    </span>
                  </p>
                  <button
                    type="button"
                    disabled={timer > 0 || pending}
                    onClick={handleResend}
                    className="mx-auto mt-1 block text-xs font-semibold text-[#C8F04C] hover:underline disabled:cursor-not-allowed disabled:opacity-40 disabled:no-underline"
                  >
                    Resend OTP
                  </button>
                </div>

                <button
                  type="button"
                  disabled={pending || otp.join("").length !== 6}
                  onClick={handleOtpLogin}
                  className="flex w-full items-center gap-2 rounded-xl bg-[#C8F04C] py-3.5 text-sm font-bold text-neutral-900 text-center justify-center shadow-sm transition-colors hover:bg-[#d4f25f] disabled:cursor-not-allowed disabled:opacity-45"
                >
                  {variant === "register" ? "Create account" : "Login"}
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep("phone");
                    setTimer180(300);
                  }}
                  className="w-full text-center text-sm font-medium text-neutral-500 hover:text-neutral-800"
                >
                  ← Change number
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
