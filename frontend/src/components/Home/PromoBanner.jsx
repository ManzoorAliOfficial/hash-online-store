import { useState } from "react";
import { ArrowRight, Tag, Copy, Check, Sparkles, Star } from "lucide-react";
import { Link } from "react-router";
import { PRIMARY_OFFER } from "../../constants/offers";

export default function PromoBanner() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PRIMARY_OFFER.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section
      aria-label="Promotional campaign"
      className="relative mx-auto mb-[75px] flex min-h-[310px] max-w-[1120px] items-center justify-between overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-[#0c2352] via-[#15366e] to-[#0a1c40] px-8 py-10 text-white shadow-[0_20px_50px_rgba(16,36,73,0.14)] sm:px-12 sm:py-12 max-[900px]:mx-[5%] max-[600px]:mx-4 max-[600px]:mb-[52px] max-[600px]:p-6"
    >
      {/* Decorative ambient background glows */}
      <div className="pointer-events-none absolute -left-16 -top-16 size-64 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 right-16 size-64 rounded-full bg-sky-400/20 blur-3xl" />

      {/* Left copy & CTA content */}
      <div className="relative z-10 max-w-[540px]">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-xs font-extrabold tracking-[.14em] text-[#a9c6ff] backdrop-blur-md">
          <Sparkles size={13} className="text-[#60a5fa]" />
          <span>SPECIAL PROMOTIONAL OFFER</span>
        </div>

        <h2 className="my-3 text-3xl font-extrabold leading-tight tracking-[-0.04em] text-white sm:text-4xl max-[600px]:text-2xl">
          Upgrade your everyday setup.
        </h2>

        <p className="text-xs leading-relaxed text-[#d1ddf4] sm:text-sm">
          Discover handpicked audio, wearables and creator essentials with
          verified brand warranty and express nationwide delivery.
        </p>

        {/* Real Coupon Callout with 1-Click Copy */}
        <div className="my-5 flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3.5 py-1.5 backdrop-blur-md">
            <Tag size={14} className="text-[#a9c6ff]" />
            <span className="text-xs font-medium text-[#d1ddf4]">
              Use code:
            </span>
            <code className="font-mono text-xs font-extrabold tracking-wider text-white">
              {PRIMARY_OFFER.code}
            </code>
            <button
              type="button"
              onClick={handleCopy}
              className="ml-1 inline-flex cursor-pointer items-center gap-1 rounded-lg bg-white/20 px-2.5 py-1 text-xs font-bold text-white transition hover:bg-white hover:text-[#0c2352] active:scale-95"
              aria-label="Copy coupon code"
            >
              {copied ? (
                <>
                  <Check size={12} className="text-[#4ade80]" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={12} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <span className="text-xs font-semibold text-[#a9c6ff]">
            {PRIMARY_OFFER.fullOfferText}
          </span>
        </div>

        <Link
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-bold text-[#0c2352] shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f1f5fc] hover:shadow-lg active:scale-98"
          to="/products"
        >
          <span>Explore Collection</span>
          <ArrowRight size={15} />
        </Link>
      </div>

      {/* Right side: Modern High-Res Product Cutout Showcase */}
      <div className="relative hidden w-[42%] items-center justify-center lg:flex">
        {/* Soft radial aura */}
        <div className="pointer-events-none absolute size-56 rounded-full bg-blue-400/25 blur-3xl" />

        {/* Main Headphones Card */}
        <div className="relative z-10 -rotate-6 transition-all duration-300 hover:rotate-0 hover:scale-105">
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=85"
            alt="Noise Canceling Headphones"
            width="192"
            height="192"
            loading="lazy"
            decoding="async"
            className="size-48 rounded-2xl object-cover shadow-[0_25px_40px_rgba(0,0,0,0.38)] ring-1 ring-white/20"
          />
          <div className="absolute -bottom-3 -right-3 flex items-center gap-1.5 rounded-xl border border-white/40 bg-white/95 px-3 py-1.5 text-xs font-bold text-[#17233b] shadow-md backdrop-blur-md">
            <Star size={13} className="text-[#f5a623] fill-[#f5a623]" />
            <span>4.9 · Premium Sound</span>
          </div>
        </div>

        {/* Floating Accent Earbuds Card */}
        <div className="absolute -bottom-3 right-4 z-20 rotate-12 transition-all duration-300 hover:rotate-6 hover:scale-105">
          <img
            src="https://images.unsplash.com/photo-1733556046403-2d090cf359a3?auto=format&fit=crop&w=400&h=400&q=85"
            alt="AirPods Pro 2"
            width="112"
            height="112"
            loading="lazy"
            decoding="async"
            className="size-28 rounded-2xl object-cover shadow-[0_20px_30px_rgba(0,0,0,0.38)] ring-1 ring-white/20"
          />
        </div>
      </div>
    </section>
  );
}
