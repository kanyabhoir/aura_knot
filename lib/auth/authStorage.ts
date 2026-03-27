/** Demo auth: browser-only. Replace with a real API / SMS provider when ready. */

export type AuthUser = {
  name: string;
  email: string;
  phone?: string;
};

type Account = AuthUser & { password: string };

const ACCOUNTS_KEY = "kannya-accounts-v1";
const SESSION_KEY = "kannya-auth-session-v1";
const OTP_PENDING_KEY = "kannya-otp-pending";

function readAccounts(): Account[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Account[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAccounts(accounts: Account[]) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

/** Display format e.g. +91 9876543210; validates 10-digit Indian mobile */
export function normalizeIndianMobile(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  let ten: string;
  if (digits.length === 10) {
    ten = digits;
  } else if (digits.length === 12 && digits.startsWith("91")) {
    ten = digits.slice(2);
  } else if (digits.length === 11 && digits.startsWith("0")) {
    ten = digits.slice(1);
  } else {
    return null;
  }
  if (!/^[6-9]\d{9}$/.test(ten)) {
    return null;
  }
  return `+91 ${ten}`;
}

function phoneKey(display: string): string {
  return display.replace(/\s/g, "");
}

function syntheticEmailFromPhone(display: string): string {
  const ten = display.replace(/\D/g, "").slice(-10);
  return `phone-${ten}@kannya.local`;
}

export function registerAccount(
  name: string,
  email: string,
  password: string
): { ok: true; user: AuthUser } | { ok: false; error: string } {
  const normEmail = email.trim().toLowerCase();
  if (!name.trim() || !normEmail) {
    return { ok: false, error: "Please fill in all fields." };
  }
  if (password.length < 6) {
    return { ok: false, error: "Password must be at least 6 characters." };
  }
  const accounts = readAccounts();
  if (accounts.some((a) => a.email.toLowerCase() === normEmail)) {
    return { ok: false, error: "An account with this email already exists." };
  }
  accounts.push({
    name: name.trim(),
    email: normEmail,
    password,
  });
  writeAccounts(accounts);
  const user = { name: name.trim(), email: normEmail };
  localStorage.setItem(SESSION_KEY, JSON.stringify({ email: normEmail }));
  return { ok: true, user };
}

export function loginAccount(
  email: string,
  password: string
): { ok: true; user: AuthUser } | { ok: false; error: string } {
  const normEmail = email.trim().toLowerCase();
  const accounts = readAccounts();
  const match = accounts.find(
    (a) => a.email.toLowerCase() === normEmail && a.password === password
  );
  if (!match) {
    return { ok: false, error: "Invalid email or password." };
  }
  const user: AuthUser = {
    name: match.name,
    email: match.email,
    phone: match.phone,
  };
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ email: match.email, phone: match.phone })
  );
  return { ok: true, user };
}

type OtpPending = {
  phoneDisplay: string;
  code: string;
  expiresAt: number;
};

function readOtpPending(): OtpPending | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(OTP_PENDING_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as OtpPending;
    if (!p?.phoneDisplay || !p?.code || !p?.expiresAt) return null;
    return p;
  } catch {
    return null;
  }
}

/** Start or refresh OTP for SMS (demo: code stored in sessionStorage). */
export function startPhoneOtp(
  phoneDisplay: string
):
  | { ok: true; demoOtp?: string }
  | { ok: false; error: string } {
  const norm = normalizeIndianMobile(phoneDisplay);
  if (!norm) {
    return { ok: false, error: "Enter a valid 10-digit Indian mobile number." };
  }
  const code = String(Math.floor(100000 + Math.random() * 900000));
  const payload: OtpPending = {
    phoneDisplay: norm,
    code,
    expiresAt: Date.now() + 5 * 60 * 1000,
  };
  sessionStorage.setItem(OTP_PENDING_KEY, JSON.stringify(payload));
  const showDemoOtp =
    typeof process !== "undefined" &&
    (process.env.NODE_ENV === "development" ||
      process.env.NEXT_PUBLIC_SHOW_DEMO_OTP === "true");
  return { ok: true, ...(showDemoOtp ? { demoOtp: code } : {}) };
}

export function verifyPhoneOtp(
  phoneDisplay: string,
  otp: string
): { ok: true; user: AuthUser } | { ok: false; error: string } {
  const norm = normalizeIndianMobile(phoneDisplay);
  if (!norm) {
    return { ok: false, error: "Invalid phone number." };
  }
  const pending = readOtpPending();
  if (!pending) {
    return { ok: false, error: "Request a new OTP first." };
  }
  if (pending.phoneDisplay !== norm) {
    return { ok: false, error: "Phone number does not match OTP request." };
  }
  if (Date.now() > pending.expiresAt) {
    sessionStorage.removeItem(OTP_PENDING_KEY);
    return { ok: false, error: "OTP expired. Please resend." };
  }
  const entered = otp.replace(/\D/g, "");
  if (entered.length !== 6 || entered !== pending.code) {
    return { ok: false, error: "Invalid OTP. Please try again." };
  }
  sessionStorage.removeItem(OTP_PENDING_KEY);

  const syntheticEmail = syntheticEmailFromPhone(norm);
  const accounts = readAccounts();
  let match = accounts.find(
    (a) =>
      a.phone === norm ||
      phoneKey(a.phone ?? "") === phoneKey(norm) ||
      a.email.toLowerCase() === syntheticEmail.toLowerCase()
  );
  if (!match) {
    const ten = norm.replace(/\D/g, "").slice(-10);
    match = {
      name: `User ${ten.slice(-4)}`,
      email: syntheticEmail,
      password: "__otp_only__",
      phone: norm,
    };
    accounts.push(match);
    writeAccounts(accounts);
  } else if (!match.phone) {
    match = { ...match, phone: norm };
    const idx = accounts.findIndex((a) => a.email === match!.email);
    if (idx >= 0) accounts[idx] = match;
    writeAccounts(accounts);
  }

  const user: AuthUser = {
    name: match.name,
    email: match.email,
    phone: match.phone ?? norm,
  };
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ email: match.email, phone: user.phone })
  );
  return { ok: true, user };
}

export function readSessionUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as { email?: string; phone?: string };
    const accounts = readAccounts();

    if (session?.email) {
      const acc = accounts.find(
        (a) => a.email.toLowerCase() === session.email!.toLowerCase()
      );
      if (acc) {
        return {
          name: acc.name,
          email: acc.email,
          phone: acc.phone ?? session.phone,
        };
      }
    }
    if (session?.phone) {
      const acc = accounts.find((a) => a.phone === session.phone);
      if (acc) {
        return { name: acc.name, email: acc.email, phone: acc.phone };
      }
    }
    return null;
  } catch {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
  try {
    sessionStorage.removeItem(OTP_PENDING_KEY);
  } catch {
    /* ignore */
  }
}
