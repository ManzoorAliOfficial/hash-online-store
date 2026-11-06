import { Link } from "react-router";
import { useState } from "react";
import { ArrowRight, Mail, Phone } from "lucide-react";
import storeLogo from "../../assets/icons/hash-online-store-wordmark.svg";
import { useStore } from "../../context/StoreContext";

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
  const whatsappNumber = String(settings.whatsappNumber || "").replace(
    /\D/g,
    "",
  );

  // Social platforms only. Email and phone are shown as contact lines below.
  const socialLinks = [
    {
      name: "WhatsApp",
      href: whatsappNumber
        ? "https://wa.me/" + whatsappNumber
        : "https://www.whatsapp.com/",
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

  return (
    <footer
      id="footer"
      className="mt-auto bg-[#f7f9fc] px-[max(calc((100vw-1120px)/2),5%)] pt-[43px] text-[#728097] max-[600px]:px-4"
    >
      <div className="grid grid-cols-[1.3fr_.8fr_.9fr_1.2fr] gap-[35px] pb-8 max-[800px]:grid-cols-2 max-[600px]:grid-cols-1">
        <div>
          <Link
            className="inline-flex"
            to="/"
            aria-label="Hash Online Store home"
          >
            <img
              className="h-9 w-auto"
              src={storeLogo}
              alt="Hash Online Store"
            />
          </Link>
          <p className="mt-4 text-[10px] leading-[1.7]">
            Quality Products. Fast Delivery.
            <br />
            Trusted Shopping.
          </p>

          <div className="mt-6">
            <b className="text-xs text-[#24324c]">Follow us</b>

            <ul
              className="mt-3 flex flex-wrap gap-2"
              aria-label="Social media"
            >
              {socialLinks.map((item) => (
                <li key={item.name}>
                  <a
                    className="group relative inline-flex size-9 items-center justify-center rounded-lg border border-[#e3e8f0] bg-white text-[#52617a] transition duration-200 hover:-translate-y-0.5 hover:border-[#102449] hover:bg-[#102449] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
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
              <ul className="mt-4 flex flex-col gap-2 text-[11px]">
                {email && (
                  <li>
                    <a
                      className="inline-flex items-center gap-2 text-[#52617a] transition hover:text-[#2563eb]"
                      href={"mailto:" + email}
                    >
                      <Mail size={14} className="shrink-0 text-[#8a96a8]" />
                      {email}
                    </a>
                  </li>
                )}
                {phone && (
                  <li>
                    <a
                      className="inline-flex items-center gap-2 text-[#52617a] transition hover:text-[#2563eb]"
                      href={"tel:" + phone}
                    >
                      <Phone size={14} className="shrink-0 text-[#8a96a8]" />
                      {phone}
                    </a>
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>
        <div className="flex flex-col items-start gap-[11px] text-[11px]">
          <b className="text-xs text-[#24324c]">Explore</b>
          <Link className="transition hover:text-[#2563eb]" to="/products">
            All products
          </Link>
          <a className="transition hover:text-[#2563eb]" href="/#categories">
            Categories
          </a>
          <Link className="transition hover:text-[#2563eb]" to="/about">
            About us
          </Link>
        </div>
        <div className="flex flex-col items-start gap-[11px] text-[11px]">
          <b className="text-xs text-[#24324c]">Customer care</b>
          <Link className="transition hover:text-[#2563eb]" to="/orders">
            Track an order
          </Link>
          <Link className="transition hover:text-[#2563eb]" to="/contact">
            Contact us
          </Link>
          <Link className="transition hover:text-[#2563eb]" to="/login">
            My account
          </Link>
          <Link className="transition hover:text-[#2563eb]" to="/terms">
            Terms & Conditions
          </Link>
        </div>
        <div>
          <b className="text-xs text-[#24324c]">Stay in the loop</b>
          <p className="mt-3 text-[10px] leading-[1.7]">
            New arrivals and good finds, occasionally.
          </p>
          <form
            className="mt-3 flex w-full rounded-md border border-[#e3e8f0] bg-white p-1 focus-within:border-[#2563eb]"
            onSubmit={submit}
          >
            <input
              className="min-w-0 flex-1 border-0 bg-transparent px-2 py-[7px] text-[10px] text-[#17233b] outline-none placeholder:text-[#9aa6b8]"
              name="email"
              type="email"
              required
              aria-label="Email address"
              placeholder="Your email address"
            />
            <button
              className="grid size-[31px] place-items-center rounded bg-[#2563eb] text-white transition hover:bg-[#174fcc]"
              aria-label="Subscribe"
            >
              <ArrowRight size={15} />
            </button>
          </form>
          {message && (
            <small
              className="mt-2 block text-[10px] font-semibold text-[#16803b]"
              role="status"
            >
              {message}
            </small>
          )}
        </div>
      </div>
      <div className="flex flex-wrap justify-between gap-3 border-t border-[#e9edf3] py-4 text-[9px] text-[#8a96a8]">
        <span>© 2026 Hash Online Store</span>
        <span>Thoughtfully picked. Delivered with care.</span>
        <Link className="hover:text-[#2563eb]" to="/terms">
          Terms & Conditions
        </Link>
      </div>
    </footer>
  );
}