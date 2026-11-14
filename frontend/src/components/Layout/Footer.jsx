import { Link } from "react-router";
import { useState } from "react";
import { ArrowRight, Mail, Phone } from "lucide-react";
import storeLogo from "../../assets/icons/Store.svg";

import Container from "./Container";
import { useStore } from "../../context/StoreContext";
import { normalizePkNumber, DEFAULT_WHATSAPP_NUMBER } from "../../utils/whatsapp";

// Fallback links used when the store settings don't define one. Replace with your real pages.
const DEFAULT_SOCIAL_URLS = {
  facebook: "https://www.facebook.com/",
  instagram: "https://www.instagram.com/",
  tiktok: "https://www.tiktok.com/",
};

const safeSocialUrl = (value) => {
  try {
    const url = new URL(String(value || "").trim());
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : "";
  } catch {
    return "";
  }
};

function BrandIcon({ name, className = "" }) {
  if (name === "instagram")
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
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
  if (name === "facebook")
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M13.5 22v-8.2h2.8l.5-3.3h-3.3V8.4c0-.9.4-1.7 1.8-1.7h1.6V3.8S15.1 3.5 13.9 3.5c-2.6 0-4.3 1.6-4.3 4.4v2.6H6.8v3.3h2.8V22h3.9Z"
        />
      </svg>
    );
  if (name === "tiktok") {
    const note =
      "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07Z";
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
        <g transform="translate(3.6 3.6) scale(.7)">
          <path fill="#25F4EE" transform="translate(-.9 -.9)" d={note} />
          <path fill="#FE2C55" transform="translate(.9 .9)" d={note} />
          <path fill="#fff" d={note} />
        </g>
      </svg>
    );
  }
  return null;
}

// Shared styles so every column looks identical.
const headingClass = "text-sm font-semibold tracking-wide text-white";
const linkClass =
  "text-sm text-[#cad8f3] transition-colors hover:text-white focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-sm";

const exploreLinks = [
  { label: "Shop all products", to: "/products" },
  { label: "Wishlist", to: "/wishlist" },
  { label: "Track an order", to: "/orders" },
  { label: "My account", to: "/profile" },
];

const companyLinks = [
  { label: "About us", to: "/about" },
  { label: "Contact us", to: "/contact" },
  { label: "Terms of use", to: "/terms" },
];

function LinkColumn({ title, links }) {
  return (
    <nav aria-label={title}>
      <h2 className={headingClass}>{title}</h2>
      <ul className="mt-3 flex flex-col gap-2">
        {links.map((item) => (
          <li key={item.label}>
            <Link className={linkClass} to={item.to}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Footer() {
  const { subscribe, settings } = useStore();
  const [message, setMessage] = useState("");

  const submit = (event) => {
    event.preventDefault();
    const value = new FormData(event.currentTarget).get("email");
    subscribe(value);
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
  const contactNumber = phone || (whatsappDigits ? `+${whatsappDigits}` : "");
  const contactNumberHref = phone ? `tel:${phone}` : whatsappUrl;

  // Brand-coloured buttons. Replace the DEFAULT_SOCIAL_URLS above with your real
  // pages, or set facebookUrl / instagramUrl / tiktokUrl in your store settings.
  const socialLinks = [
    { name: "WhatsApp", href: whatsappUrl, icon: "whatsapp", bg: "bg-[#25D366]" },
    {
      name: "Facebook",
      href: safeSocialUrl(settings.facebookUrl || DEFAULT_SOCIAL_URLS.facebook),
      icon: "facebook",
      bg: "bg-[#1877F2]",
    },
    {
      name: "Instagram",
      href: safeSocialUrl(settings.instagramUrl || DEFAULT_SOCIAL_URLS.instagram),
      icon: "instagram",
      bg: "bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285AEB_90%)]",
    },
    {
      name: "TikTok",
      href: safeSocialUrl(settings.tiktokUrl || DEFAULT_SOCIAL_URLS.tiktok),
      icon: "tiktok",
      bg: "bg-black ring-1 ring-white/25",
    },
    {
      name: "X (Twitter)",
      href: safeSocialUrl(settings.twitterUrl),
      icon: "twitter",
      bg: "bg-black ring-1 ring-white/25",
    },
    {
      name: "LinkedIn",
      href: safeSocialUrl(settings.linkedinUrl),
      icon: "linkedin",
      bg: "bg-[#0A66C2]",
    },
  ].filter((item) => item.href);

  return (
    <footer id="footer" className="relative mt-16 bg-[#102449] text-[#eaf1ff]">
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-10 w-full"
        viewBox="0 0 1440 40"
        preserveAspectRatio="none"
      >
        <path
          fill="#f5f8fd"
          d="M0 0h1440v14c-122-8-196-10-290-2-171 15-256 31-438 23C535 29 397 5 267 13 151 20 82 35 0 33V0Z"
        />
      </svg>

      <Container className="grid grid-cols-2 gap-x-6 gap-y-8 pb-10 pt-16 lg:grid-cols-[1.3fr_.75fr_.75fr_1.3fr] lg:gap-x-12 lg:pt-14">
        {/* Brand + social */}
        <div className="col-span-2 lg:col-span-1">
          <Link className="inline-flex" to="/" aria-label="Hash Online Store home">
            <img
              className="h-9 w-auto brightness-0 invert"
              src={storeLogo}
              alt="Hash Online Store"
            />
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#cad8f3]">
            Mobile accessories. Clear details. Helpful support.
          </p>
          {socialLinks.length > 0 && (
            <ul className="mt-5 flex items-center gap-2" aria-label="Social media">
              {socialLinks.map((item) => (
                <li key={item.name}>
                  <a
                    className={`inline-flex size-9 items-center justify-center rounded-full text-white shadow-sm transition hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${item.bg}`}
                    href={item.href}
                    aria-label={item.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BrandIcon name={item.icon} className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <LinkColumn title="Explore" links={exploreLinks} />
        <LinkColumn title="Company" links={companyLinks} />

        {/* Contact + newsletter */}
        <div className="col-span-2 lg:col-span-1">
          <h2 className={headingClass}>Contact</h2>
          <div className="mt-3 flex flex-col gap-2">
            {contactNumber && (
              <a className={`${linkClass} inline-flex items-center gap-2`} href={contactNumberHref}>
                <Phone size={14} className="shrink-0" aria-hidden="true" />
                {contactNumber}
              </a>
            )}
            {email && (
              <a className={`${linkClass} inline-flex items-center gap-2 break-all`} href={`mailto:${email}`}>
                <Mail size={14} className="shrink-0" aria-hidden="true" />
                {email}
              </a>
            )}
          </div>

          <h2 className={`${headingClass} mt-6`}>Stay in the loop</h2>
          <form
            className="mt-3 flex w-full max-w-sm items-center rounded-full border border-white/20 bg-white/10 p-1 transition focus-within:border-[#93c5fd] focus-within:ring-2 focus-within:ring-[#93c5fd]/20"
            onSubmit={submit}
          >
            <input
              className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-[#a9b9d3]"
              name="email"
              type="email"
              required
              aria-label="Email address"
              placeholder="Your email address"
            />
            <button
              type="submit"
              className="grid size-8 shrink-0 place-items-center rounded-full bg-[#2563eb] text-white transition hover:bg-[#1d4ed8] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label="Subscribe"
            >
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          </form>
          <p className="mt-2 min-h-4 text-xs font-semibold text-[#86efac]" role="status">
            {message}
          </p>
        </div>
      </Container>

      {/* Bottom bar: right padding keeps text clear of the floating WhatsApp button */}
      <div className="bg-[#2563eb] py-3 text-white">
        <Container className="flex flex-col items-center gap-1 text-center text-xs sm:flex-row sm:justify-between sm:text-left md:pr-20">
          <span>© 2026 Hash Online Store. All rights reserved.</span>
          <span className="text-white/80">Payment at checkout: Cash on Delivery</span>
        </Container>
      </div>
    </footer>
  );
}