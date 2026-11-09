import { Link } from "react-router";
import { useState } from "react";
import {
  ArrowRight,
  Mail,
  Phone,
  Banknote,
  ShieldCheck,
  Truck,
  Package,
  Zap,
  ArrowUp,
} from "lucide-react";
import storeLogo from "../../assets/icons/hash-online-store-wordmark.svg";
import { useStore } from "../../context/StoreContext";
import { normalizePkNumber, DEFAULT_WHATSAPP_NUMBER } from "../../utils/whatsapp";

function VisaLogo({ className = "h-3 w-auto" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 36 12"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.28 1.15L11.75 11.23H9.42L11.95 1.15H14.28ZM24.49 7.42C24.5 4.6 20.6 4.45 20.63 3.25C20.64 2.88 20.99 2.48 21.78 2.37C22.17 2.32 23.27 2.27 24.5 2.84L24.93 0.84C24.34 0.63 23.59 0.44 22.65 0.44C19.98 0.44 18.09 1.86 18.07 3.88C18.05 5.38 19.39 6.22 20.41 6.72C21.46 7.23 21.81 7.57 21.8 8.03C21.79 8.74 20.95 9.05 20.18 9.06C18.94 9.07 18.22 8.71 17.65 8.44L17.2 10.53C17.78 10.8 18.84 11.03 19.94 11.05C22.77 11.05 24.48 9.66 24.49 7.42ZM31.69 11.23H33.72L32.06 1.15H30.18C29.74 1.15 29.38 1.4 29.21 1.81L24.96 11.23H27.41L27.9 9.87H30.9L31.18 11.23H31.69ZM28.58 7.96L29.83 4.54L30.55 7.96H28.58ZM7.92 1.15L5.7 8.03L5.46 6.84C5.07 5.51 3.84 4.07 2.49 3.37L4.54 11.22H7.01L10.68 1.15H7.92Z"
        fill="#1434CB"
      />
      <path
        d="M3.73 1.15H0.14L0.1 1.34C2.89 2.05 4.73 3.77 5.48 5.76L4.69 1.76C4.55 1.25 4.19 1.16 3.73 1.15Z"
        fill="#F9A51A"
      />
    </svg>
  );
}

function MastercardLogo({ className = "h-3.5 w-auto" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 16"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="7" cy="8" r="6" fill="#EB001B" />
      <circle cx="15" cy="8" r="6" fill="#F79E1B" fillOpacity="0.9" />
      <path
        d="M11 3.55C12.23 4.67 13 6.24 13 8C13 9.76 12.23 11.33 11 12.45C9.77 11.33 9 9.76 9 8C9 6.24 9.77 4.67 11 3.55Z"
        fill="#FF5F00"
      />
    </svg>
  );
}

function BrandIcon({ name, className = "" }) {
  if (name === "instagram")
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle
          cx="12"
          cy="12"
          r="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="17.5" cy="6.7" r="1.2" fill="currentColor" />
      </svg>
    );
  if (name === "whatsapp")
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M20.5 11.8a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.3-4.7a8.5 8.5 0 1 1 16.2-4Zm-8.5-7a6.9 6.9 0 0 0-5.9 10.5l.2.3-.8 2.7 2.8-.7.3.2A6.9 6.9 0 1 0 12 4.8Zm3.9 9.9c-.2-.1-1.3-.7-1.5-.8-.2-.1-.4-.1-.5.1l-.7.8c-.1.2-.3.2-.5.1a6.2 6.2 0 0 1-1.8-1.1 6.8 6.8 0 0 1-1.2-1.5c-.1-.2 0-.3.1-.4l.4-.5.2-.4v-.4l-.7-1.6c-.2-.4-.4-.4-.5-.4H9c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.1.9 2.2a8 8 0 0 0 3.1 3c1.2.5 1.7.6 2.3.5.4-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1-.1 0-.3-.1-.5-.2Z"
        />
      </svg>
    );
  if (name === "twitter")
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M18.9 1.2h3.7l-8.1 9.2L24 22.9h-7.4l-5.8-7.6-6.6 7.6H.5l8.6-9.8L0 1.2h7.6l5.2 6.9 6.1-6.9Zm-1.3 19.5h2L6.5 3.2H4.3l13.3 17.5Z"
        />
      </svg>
    );
  if (name === "linkedin")
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.55V9h3.57v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0h.01Z"
        />
      </svg>
    );
  return null;
}

export default function Footer() {
  const { subscribe, settings } = useStore();
  const [message, setMessage] = useState("");
  const submit = (event) => {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get("email");
    subscribe(email);
    event.currentTarget.reset();
    setMessage("Subscribed in this browser demo.");
  };
  const phone = String(settings.supportPhone || "").trim();
  const email = String(settings.supportEmail || "").trim();
  const whatsappDigits = normalizePkNumber(
    settings.whatsappNumber || DEFAULT_WHATSAPP_NUMBER
  );
  const whatsappUrl = whatsappDigits
    ? `https://wa.me/${whatsappDigits}`
    : "https://wa.me/923013858980";

  // Social platforms only. Email and phone are shown as contact lines below.
  const socialLinks = [
    {
      name: "WhatsApp",
      href: whatsappUrl,
      icon: "whatsapp",
    },
    {
      name: "Instagram",
      href: settings.instagramUrl || "https://www.instagram.com/",
      icon: "instagram",
    },
    {
      name: "X (Twitter)",
      href: settings.twitterUrl || "https://x.com/",
      icon: "twitter",
    },
    {
      name: "LinkedIn",
      href: settings.linkedinUrl || "https://www.linkedin.com/",
      icon: "linkedin",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="footer"
      className="mt-auto border-t border-[#e2e8f0] bg-[#f5f8fd] px-4 pt-10 pb-4 text-[#728097] sm:px-6 sm:pt-11 lg:px-[max(calc((100vw-1120px)/2),5%)]"
    >
      {/* Main Grid:
          - Mobile (< 640px): 2 columns. Brand spans 2 cols. Explore (col 1) & Customer care (col 2) sit side-by-side. Newsletter spans 2 cols.
          - Tablet (640px - 1024px): 2x2 grid.
          - Desktop (1024px+): 4 columns.
      */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-9 pb-8 sm:gap-8 lg:grid-cols-[1.3fr_.8fr_.9fr_1.2fr] lg:gap-[35px]">
        {/* Col 1: Brand Info */}
        <div className="col-span-2 sm:col-span-1 lg:col-span-1">
          <Link
            className="inline-flex"
            to="/"
            aria-label="Hash Online Store home"
          >
            <img
              className="h-8 sm:h-9 w-auto"
              src={storeLogo}
              alt="Hash Online Store"
            />
          </Link>
          <p className="mt-3 sm:mt-4 text-xs sm:text-[11px] leading-relaxed text-[#627187]">
            Quality Products. Fast Delivery.
            <br />
            Trusted Shopping.
          </p>

          <div className="mt-5 sm:mt-6">
            <span className="block text-xs font-bold uppercase tracking-wider text-[#102449]">
              Follow us
            </span>

            <ul
              className="mt-3 flex flex-wrap gap-2"
              aria-label="Social media"
            >
              {socialLinks.map((item) => (
                <li key={item.name}>
                  <a
                    className="group relative inline-flex size-9 cursor-pointer items-center justify-center rounded-lg border border-[#e3e8f0] bg-white text-[#52617a] transition duration-200 hover:-translate-y-0.5 hover:border-[#102449] hover:bg-[#102449] hover:text-white active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                    href={item.href}
                    aria-label={item.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BrandIcon name={item.icon} className="size-4" />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-[#102449] px-2 py-1 text-[10px] font-medium text-white opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
                    >
                      {item.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {(email || phone) && (
              <ul className="mt-4 flex flex-col gap-1.5 text-xs sm:text-[11px]">
                {email && (
                  <li>
                    <a
                      className="inline-flex items-center gap-2 py-1 text-[#52617a] transition hover:text-[#2563eb]"
                      href={"mailto:" + email}
                    >
                      <Mail size={14} className="shrink-0 text-[#8a96a8]" />
                      <span className="break-all">{email}</span>
                    </a>
                  </li>
                )}
                {phone && (
                  <li>
                    <a
                      className="inline-flex items-center gap-2 py-1 text-[#52617a] transition hover:text-[#2563eb]"
                      href={"tel:" + phone}
                    >
                      <Phone size={14} className="shrink-0 text-[#8a96a8]" />
                      <span>{phone}</span>
                    </a>
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>

        {/* Col 2: Explore */}
        <div className="col-span-1 flex flex-col items-start gap-2.5 text-xs sm:text-[11px]">
          <span className="block text-xs font-bold uppercase tracking-wider text-[#102449]">
            Explore
          </span>
          <Link
            className="inline-block py-1 text-[#52617a] transition hover:text-[#2563eb]"
            to="/products"
          >
            All products
          </Link>
          <a
            className="inline-block py-1 text-[#52617a] transition hover:text-[#2563eb]"
            href="/#categories"
          >
            Categories
          </a>
          <Link
            className="inline-block py-1 text-[#52617a] transition hover:text-[#2563eb]"
            to="/about"
          >
            About us
          </Link>
        </div>

        {/* Col 3: Customer care */}
        <div className="col-span-1 flex flex-col items-start gap-2.5 text-xs sm:text-[11px]">
          <span className="block text-xs font-bold uppercase tracking-wider text-[#102449]">
            Customer care
          </span>
          <Link
            className="inline-block py-1 text-[#52617a] transition hover:text-[#2563eb]"
            to="/orders"
          >
            Track an order
          </Link>
          <Link
            className="inline-block py-1 text-[#52617a] transition hover:text-[#2563eb]"
            to="/contact"
          >
            Contact us
          </Link>
          <Link
            className="inline-block py-1 text-[#52617a] transition hover:text-[#2563eb]"
            to="/login"
          >
            My account
          </Link>
          <Link
            className="inline-block py-1 text-[#52617a] transition hover:text-[#2563eb]"
            to="/terms"
          >
            Terms & Conditions
          </Link>
        </div>

        {/* Col 4: Newsletter */}
        <div className="col-span-2 sm:col-span-1 lg:col-span-1">
          <span className="block text-xs font-bold uppercase tracking-wider text-[#102449]">
            Stay in the loop
          </span>
          <p className="mt-2.5 text-xs sm:text-[11px] leading-relaxed text-[#627187]">
            New arrivals and good finds, occasionally.
          </p>
          <form
            className="mt-3 flex w-full items-center rounded-lg border border-[#e3e8f0] bg-white p-1 shadow-2xs transition focus-within:border-[#2563eb] focus-within:ring-2 focus-within:ring-[#2563eb]/10"
            onSubmit={submit}
          >
            <input
              className="min-w-0 flex-1 border-0 bg-transparent px-3 py-2 text-xs sm:text-[11px] text-[#17233b] outline-none placeholder:text-[#9aa6b8]"
              name="email"
              type="email"
              required
              aria-label="Email address"
              placeholder="Your email address"
            />
            <button
              className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-md bg-[#2563eb] text-white transition hover:bg-[#174fcc] active:scale-95"
              aria-label="Subscribe"
            >
              <ArrowRight size={15} />
            </button>
          </form>
          {message && (
            <small
              className="mt-2 block text-xs font-semibold text-[#16803b]"
              role="status"
            >
              {message}
            </small>
          )}
        </div>
      </div>

      {/* Verified Trust & Payment Partners Bar */}
      <div className="border-t border-[#e9edf3] py-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-xs sm:text-[11px]">
          {/* Payment Methods */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2.5">
            <span className="font-semibold text-[#17233b] shrink-0">
              Payment Methods:
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-2.5 py-1 text-xs sm:text-[11px] font-medium text-[#1e293b] shadow-2xs transition hover:border-[#cbd5e1]">
                <Banknote size={14} className="text-[#16803b] shrink-0" />
                <span>Cash on Delivery</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-2.5 py-1 text-xs sm:text-[11px] font-medium text-[#1e293b] shadow-2xs transition hover:border-[#cbd5e1]">
                <VisaLogo className="h-3 w-auto shrink-0" />
                <span>Visa</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-2.5 py-1 text-xs sm:text-[11px] font-medium text-[#1e293b] shadow-2xs transition hover:border-[#cbd5e1]">
                <MastercardLogo className="h-3.5 w-auto shrink-0" />
                <span>Mastercard</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#dbeafe] bg-[#f0f7ff] px-2.5 py-1 text-xs sm:text-[11px] font-medium text-[#1d4ed8] shadow-2xs transition hover:border-[#bfdbfe]">
                <ShieldCheck size={14} className="text-[#2563eb] shrink-0" />
                <span>256-Bit SSL Secured</span>
              </span>
            </div>
          </div>

          {/* Courier Partners */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2.5">
            <span className="font-semibold text-[#17233b] shrink-0">
              Courier Partners:
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-2.5 py-1 text-xs sm:text-[11px] font-medium text-[#1e293b] shadow-2xs transition hover:border-[#cbd5e1]">
                <Truck size={14} className="text-[#dc2626] shrink-0" />
                <span>TCS Express</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-2.5 py-1 text-xs sm:text-[11px] font-medium text-[#1e293b] shadow-2xs transition hover:border-[#cbd5e1]">
                <Package size={14} className="text-[#d97706] shrink-0" />
                <span>Trax Logistics</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-2.5 py-1 text-xs sm:text-[11px] font-medium text-[#1e293b] shadow-2xs transition hover:border-[#cbd5e1]">
                <Zap size={14} className="text-[#ca8a04] shrink-0" />
                <span>Leopard Courier</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="flex flex-col items-center justify-between gap-3 border-t border-[#e9edf3] py-4 text-center sm:flex-row sm:text-left text-xs sm:text-[10px] text-[#8a96a8]">
        <span>© 2026 Hash Online Store. All rights reserved.</span>
        <span className="hidden md:inline">
          Thoughtfully picked. Delivered with care.
        </span>
        <div className="flex items-center gap-4">
          <Link className="transition hover:text-[#2563eb]" to="/terms">
            Terms & Conditions
          </Link>
          <span className="text-[#cbd5e1]" aria-hidden="true">
            •
          </span>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 font-medium text-[#52617a] transition hover:text-[#2563eb] cursor-pointer"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={12} className="stroke-[2.5]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
