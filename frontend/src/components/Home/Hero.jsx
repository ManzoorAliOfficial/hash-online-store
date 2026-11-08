import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Laptop,
  Pause,
  Play,
  Smartphone,
  Star,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router";
const slides = [
  {
    eyebrow: "THE SMARTER WAY TO SHOP",
    badgeText: "Flagship 2026",
    startingPrice: "Rs. 79,999",
    title: "Good finds.",
    highlight: "Better living.",
    description:
      "Discover trusted tech and everyday essentials, chosen to make daily life a little easier.",
    image:
      "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=900&h=1000&q=85",
    accent:
      "https://images.unsplash.com/photo-1733556046403-2d090cf359a3?auto=format&fit=crop&w=700&h=700&q=85",
    alt: "Featured smartphone",
    accentAlt: "Wireless earbuds",
    icon: Smartphone,
    label: "Featured this week",
    caption: "Technology that moves with you",
  },
  {
    eyebrow: "SOUND FOR EVERY MOMENT",
    badgeText: "Spatial Audio",
    startingPrice: "Rs. 19,999",
    title: "Listen closer.",
    highlight: "Tune everything out.",
    description:
      "Find your focus with comfortable audio gear and clear, immersive sound.",
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&h=1000&q=85",
    accent:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=700&h=700&q=85",
    alt: "Premium headphones",
    accentAlt: "Portable Bluetooth speaker",
    icon: Headphones,
    label: "Audio favorites",
    caption: "Your sound, your space",
  },
  {
    eyebrow: "READY FOR WHAT’S NEXT",
    badgeText: "M2 Performance",
    startingPrice: "Rs. 149,999",
    title: "Make room for",
    highlight: "a better workflow.",
    description:
      "Power through work, study and creative projects with thoughtfully selected tech.",
    image:
      "https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?auto=format&fit=crop&w=900&h=1000&q=85",
    accent:
      "https://images.unsplash.com/photo-1624096104992-9b4fa3a279dd?auto=format&fit=crop&w=700&h=700&q=85",
    alt: "Laptop for work and study",
    accentAlt: "Smart watch",
    icon: Laptop,
    label: "Work and create",
    caption: "Tools for your everyday",
  },
];
export default function Hero() {
  const [active, setActive] = useState(0),
    [hovered, setHovered] = useState(false),
    [focused, setFocused] = useState(false),
    [paused, setPaused] = useState(false),
    [imageErrors, setImageErrors] = useState({});
  const slide = slides[active];
  const Icon = slide.icon;
  useEffect(() => {
    if (
      hovered ||
      focused ||
      paused ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const timer = window.setInterval(
      () => setActive((i) => (i + 1) % slides.length),
      6000,
    );
    return () => window.clearInterval(timer);
  }, [hovered, focused, paused]);
  const go = (step) =>
    setActive((i) => (i + step + slides.length) % slides.length);
  return (
    <section
      className="relative mx-auto mt-8 grid min-h-[480px] max-w-[1200px] grid-cols-2 overflow-hidden rounded-[22px] border border-[#e2e8f0] bg-white shadow-[0_4px_24px_rgba(15,23,42,0.03)] max-[900px]:mx-[4%] max-[900px]:mt-5 max-[900px]:min-h-[400px] max-[600px]:mx-3 max-[600px]:mt-3 max-[600px]:grid-cols-1 max-[600px]:min-h-0"
      aria-roledescription="carousel"
      aria-label="Featured products"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
    >
      <div
        className="self-center px-[11%] pb-[55px] pt-[68px] max-[900px]:px-[7%] max-[900px]:py-[45px] max-[600px]:px-[25px] max-[600px]:pb-2.5 max-[600px]:pt-[38px]"
        key={`copy-${active}`}
        role="group"
        aria-roledescription="slide"
        aria-label={`${active + 1} of ${slides.length}`}
        aria-live={hovered || focused || paused ? "polite" : "off"}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-[#dce5f3] bg-white px-3 py-1 text-[11px] font-bold text-[#17233b] shadow-2xs">
          <span className="size-2 rounded-full bg-[#16803b] animate-pulse" />
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#2563eb]">
            {slide.eyebrow}
          </span>
          <span className="text-[#c1cbd8]">·</span>
          <span className="text-xs font-semibold text-[#52617a]">
            From {slide.startingPrice}
          </span>
        </div>
        <h1 className="my-4 text-[clamp(44px,5vw,66px)] leading-[1.02] tracking-[-.06em] max-[600px]:text-[43px]">
          {slide.title}
          <br />
          <em className="not-italic text-[#2563eb]">{slide.highlight}</em>
        </h1>
        <p className="max-w-[410px] text-sm leading-7 text-[#71809a] max-[600px]:text-[13px]">
          {slide.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#2563eb] px-[17px] py-[13px] text-xs font-bold text-white transition hover:-translate-y-px hover:bg-[#174a93] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#94b8ff]"
            to="/products"
          >
            Shop products <ArrowRight size={16} />
          </Link>
          <a
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#e1e7f0] bg-white px-[17px] py-[13px] text-xs font-bold text-[#20304b] transition hover:-translate-y-px hover:border-[#aac4f3] hover:bg-[#f2f6ff] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#94b8ff]"
            href="#categories"
          >
            Explore categories
          </a>
        </div>
        <div className="mt-[26px] flex items-center gap-3 text-[11px] text-[#61708a]">
          <span className="inline-flex items-center gap-1.5">
            <Star size={14} fill="currentColor" />
            <b className="text-[#17233b]">4.9/5</b> customer rating
          </span>
          <span className="flex gap-0.5 text-[#f5a623]">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} size={12} fill="currentColor" />
            ))}
          </span>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-1.5 text-[11px] text-[#61708a] max-[600px]:mt-3">
          <span className="flex items-center gap-1 font-bold text-[#17233b]">
            <TrendingUp size={13} className="text-[#2563eb]" /> Trending:
          </span>
          {[
            { label: "AirPods Pro 2", to: "/products/p2" },
            { label: "iPhone 15 Pro", to: "/products?search=iPhone" },
            { label: "MacBook Air", to: "/products?search=MacBook" },
            { label: "Smart Watches", to: "/products?category=Wearables" },
          ].map((chip) => (
            <Link
              key={chip.label}
              to={chip.to}
              className="inline-flex cursor-pointer items-center rounded-full border border-[#dce5f3] bg-white/90 px-2.5 py-0.5 text-[10px] font-semibold text-[#43536c] transition hover:border-[#2563eb] hover:bg-[#eff4ff] hover:text-[#2563eb]"
            >
              {chip.label}
            </Link>
          ))}
        </div>
      </div>
      <div
        className="relative grid min-h-[420px] place-items-center bg-[radial-gradient(ellipse_at_55%_48%,#d9e7ff_0,#edf3fd_48%,#ffffff_75%)] max-[900px]:min-h-[360px] max-[600px]:min-h-[280px] max-[600px]:pb-[27px]"
        key={`visual-${active}`}
      >
        <div className="absolute size-[280px] rounded-full bg-[linear-gradient(145deg,#d4e4ff,#b7d0ff)] blur-[1px] max-[600px]:size-[210px]" />
        <div className="absolute z-[1] grid place-items-center drop-shadow-[0_30px_26px_#243c6630]">
          {imageErrors.primary ? (
            <Icon
              className="size-40 -rotate-[9deg] text-[#203d70] max-[600px]:size-28"
              strokeWidth={1.15}
            />
          ) : (
            <img
              className="h-[285px] w-[205px] rounded-[28px] object-cover shadow-[0_30px_26px_#243c6630] max-[600px]:h-[190px] max-[600px]:w-[140px]"
              src={slide.image}
              alt={slide.alt}
              fetchPriority="high"
              decoding="async"
              onError={() =>
                setImageErrors((value) => ({ ...value, primary: true }))
              }
            />
          )}
        </div>
        <div className="absolute bottom-[21%] right-[19%] z-[2] grid place-items-center rotate-[13deg] drop-shadow-[0_18px_15px_#243c6630] max-[600px]:bottom-[20%] max-[600px]:right-[18%]">
          {imageErrors.accent ? (
            <Headphones
              className="size-20 text-[#203d70] max-[600px]:size-14"
              strokeWidth={1.2}
            />
          ) : (
            <img
              className="size-[100px] rounded-full object-cover shadow-lg max-[600px]:size-[68px]"
              src={slide.accent}
              alt={slide.accentAlt}
              loading="lazy"
              decoding="async"
              onError={() =>
                setImageErrors((value) => ({ ...value, accent: true }))
              }
            />
          )}
        </div>
        <div className="absolute right-[10%] top-[12%] z-[2] flex items-center gap-2.5 rounded-2xl border border-white/70 bg-white/95 px-3.5 py-2 shadow-[0_12px_24px_rgba(23,35,59,0.12)] backdrop-blur-md max-[600px]:right-[6%] max-[600px]:top-[8%] max-[600px]:px-2.5 max-[600px]:py-1.5">
          <div className="grid size-7 place-items-center rounded-xl bg-[#eff4ff] text-[#2563eb] max-[600px]:size-6">
            <Sparkles size={14} className="max-[600px]:size-3.5" />
          </div>
          <div className="text-left">
            <span className="block text-[9px] font-extrabold uppercase tracking-wider text-[#2563eb] max-[600px]:text-[8px]">
              {slide.badgeText}
            </span>
            <b className="block text-[11px] font-bold text-[#17233b] max-[600px]:text-[10px]">
              From {slide.startingPrice}
            </b>
          </div>
        </div>
        <div className="absolute bottom-[23px] left-[30px] right-[30px] flex justify-between rounded-[10px] bg-[#ffffffd9] px-4 py-3 text-[11px] text-[#66758e] backdrop-blur-[8px] max-[600px]:bottom-[42px]">
          <span>{slide.label}</span>
          <b className="text-[#243552]">{slide.caption}</b>
        </div>
      </div>
      <div className="absolute bottom-[22px] left-[11%] z-[4] flex items-center gap-[7px] max-[900px]:bottom-[17px] max-[900px]:left-[7%] max-[600px]:bottom-[13px] max-[600px]:left-[25px]">
        <div
          className="mr-1.5 flex items-center gap-[5px]"
          role="group"
          aria-label="Choose featured slide"
        >
          {slides.map((item, index) => (
            <button
              key={item.eyebrow}
              className={`size-[7px] cursor-pointer rounded-full border-0 bg-[#a9b9d3] p-0 transition-[width,background] ${index === active ? "w-5 rounded-[5px] bg-[#2563eb]" : ""}`}
              aria-label={`Show slide ${index + 1}: ${item.eyebrow}`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
        <button
          className="grid size-[30px] cursor-pointer place-items-center rounded-full border border-[#dfe6f0] bg-[#ffffffdb] text-[#25416c] transition hover:bg-[#2563eb] hover:text-white max-[600px]:size-[27px]"
          onClick={() => go(-1)}
          aria-label="Previous slide"
        >
          <ChevronLeft size={17} />
        </button>
        <button
          className="grid size-[30px] cursor-pointer place-items-center rounded-full border border-[#dfe6f0] bg-[#ffffffdb] text-[#25416c] transition hover:bg-[#2563eb] hover:text-white max-[600px]:size-[27px]"
          onClick={() => go(1)}
          aria-label="Next slide"
        >
          <ChevronRight size={17} />
        </button>
        <button
          className="grid size-[30px] cursor-pointer place-items-center rounded-full border border-[#dfe6f0] bg-[#ffffffdb] text-[#25416c] transition hover:bg-[#2563eb] hover:text-white max-[600px]:size-[27px]"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Play slideshow" : "Pause slideshow"}
        >
          {paused ? <Play size={14} /> : <Pause size={14} />}
        </button>
      </div>
    </section>
  );
}
