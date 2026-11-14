import { Link } from "react-router";
import Container from "../Layout/Container";
import {
  ArrowLeft,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import storeMark from "../../assets/icons/hash-online-store-mark.svg";

const contentMap = {
  login: {
    eyebrow: "WELCOME BACK",
    title: "Sign in to your account",
    subtitle:
      "Access your saved addresses, track pending orders, and manage your wishlist.",
    heroBadge: "CUSTOMER PORTAL",
    heroTitle: "Shopping, made simple.",
    heroDesc:
      "Welcome back to Hash Online Store. Experience genuine tech and rapid delivery across Pakistan.",
  },
  register: {
    eyebrow: "NEW CUSTOMER",
    title: "Create an account",
    subtitle:
      "Join Hash Online Store for faster checkout, order status updates, and exclusive discounts.",
    heroBadge: "EXCLUSIVE ACCESS",
    heroTitle: "Good finds start right here.",
    heroDesc:
      "Create an account today and join thousands of tech lovers enjoying verified products and reliable service.",
  },
  forgot: {
    eyebrow: "ACCOUNT SUPPORT",
    title: "Forgot password?",
    subtitle:
      "Password recovery is not connected in this frontend demo. Contact store support for help.",
    heroBadge: "SECURE RECOVERY",
    heroTitle: "Account recovery made simple.",
    heroDesc:
      "Regain quick and safe access to your orders, addresses, and Hash Online Store account profile.",
  },
};

export default function AccountWrapper({ mode = "login", children }) {
  const current = contentMap[mode] || contentMap.login;

  return (
    <Container as="main" className="min-h-[55vh] py-12 max-[600px]:py-7">
      <div className="grid min-h-[620px] grid-cols-[1fr_1.2fr] overflow-hidden rounded-3xl border border-[#e4eaf3] bg-white shadow-[0_20px_50px_rgba(16,36,73,.08)] max-[900px]:grid-cols-1">
        {/* Left Column: Brand Hero & Trust Showcase */}
        <section className="relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#091b42] via-[#0f2e69] to-[#07173b] p-8 text-white sm:p-10 lg:p-12 max-[900px]:min-h-[300px]">
          <div className="pointer-events-none absolute -left-20 -top-20 size-72 rounded-full bg-[#2563eb]/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 size-72 rounded-full bg-[#3b82f6]/20 blur-3xl" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-extrabold tracking-[0.14em] text-[#a9c6ff] backdrop-blur-md">
              <Sparkles size={13} className="text-[#60a5fa]" />
              <span>{current.heroBadge}</span>
            </div>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-[-0.04em] text-white sm:text-4xl max-[600px]:text-2xl">
              {current.heroTitle}
            </h2>

            <p className="mt-3 max-w-[360px] text-xs leading-relaxed text-[#cad8f3] sm:text-sm">
              {current.heroDesc}
            </p>
          </div>

          <div className="relative z-10 my-7 space-y-3">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-xs transition hover:bg-white/10">
              <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#2563eb]/40 text-[#93c5fd]">
                <Truck size={17} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">
                  Express Pakistan-Wide Delivery
                </h4>
                <p className="text-[11px] text-[#a9c6ff]">
                  Order status appears in your account. Live courier tracking requires store integration.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-xs transition hover:bg-white/10">
              <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#2563eb]/40 text-[#93c5fd]">
                <ShieldCheck size={17} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">
                  100% Genuine & Authentic Tech
                </h4>
                <p className="text-[11px] text-[#a9c6ff]">
                  Verified imports with official product warranty
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-xs transition hover:bg-white/10">
              <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#2563eb]/40 text-[#93c5fd]">
                <RotateCcw size={17} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">
                  7-Day Easy Return Guarantee
                </h4>
                <p className="text-[11px] text-[#a9c6ff]">
                  Hassle-free returns and replacement support
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10 space-y-4 border-t border-white/10 pt-4">
            <div className="flex items-center gap-2 text-xs">
              <div className="flex text-[#f59e0b]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <span className="font-semibold text-[#cad8f3]">
                Demo storefront · sample catalog ratings
              </span>
            </div>

            <Link
              to="/"
              className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-bold text-[#a9c6ff] transition hover:text-white"
            >
              <ArrowLeft size={14} /> Return to storefront
            </Link>
          </div>
        </section>

        {/* Right Column: Form Area */}
        <section className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#17233b] hover:opacity-90"
            >
              <img
                className="size-7 object-contain"
                src={storeMark}
                alt="Hash Store"
              />
              <span>Hash Online Store</span>
              <span className="rounded-md bg-[#eff4ff] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-[#2563eb]">
                Official
              </span>
            </Link>

            <div className="mt-4">
              <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#2563eb]">
                {current.eyebrow}
              </span>
              <h1 className="mt-1 text-2xl font-extrabold tracking-[-0.03em] text-[#071a3d] sm:text-3xl">
                {current.title}
              </h1>
              <p className="mt-1.5 text-xs text-[#71809a] sm:text-sm">
                {current.subtitle}
              </p>
            </div>
          </div>

          {children}
        </section>
      </div>
    </Container>
  );
}
