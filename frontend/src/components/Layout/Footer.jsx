import { Link } from "react-router";
import { useState } from "react";
import {
  ArrowRight,
  Mail,
  Phone,
  ArrowUp,
} from "lucide-react";
import storeLogo from "../../assets/icons/hash-online-store-wordmark.svg";
import { useStore } from "../../context/StoreContext";
import { normalizePkNumber, DEFAULT_WHATSAPP_NUMBER } from "../../utils/whatsapp";

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
          <Link
            className="inline-block py-1 text-[#52617a] transition hover:text-[#2563eb]"
            to="/products"
          >
            Categories
          </Link>
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
        </div>
      </div>
    </footer>
  );
}
