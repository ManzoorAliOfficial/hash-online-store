import { useEffect, useState, useMemo } from "react";
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
import { useStore } from "../../context/StoreContext";

const slides = [
  {
    category: "Phones",
    eyebrow: "THE SMARTER WAY TO SHOP",
    badgeText: "Flagship 2026",
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
    ctaLink: "/products?category=Phones",
    ctaText: "Shop phones",
  },
  {
    category: "Audio",
    eyebrow: "SOUND FOR EVERY MOMENT",
    badgeText: "Spatial Audio",
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
    ctaLink: "/products?category=Audio",
    ctaText: "Shop audio",
  },
  {
    category: "Laptops",
    eyebrow: "READY FOR WHAT’S NEXT",
    badgeText: "M2 Performance",
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
    ctaLink: "/products?category=Laptops",
    ctaText: "Shop laptops",
  },
];

export default function Hero() {
  const { products = [] } = useStore();
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [paused, setPaused] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  const slide = slides[active];
  const Icon = slide.icon;

  // Real lowest price in slide's category
  const startingPrice = useMemo(() => {
    const matching = products.filter(
      (p) =>
        (p.category || "").toLowerCase() ===
        (slide.category || "").toLowerCase(),
    );
    if (!matching.length) return "Rs. 19,999";
    const min = Math.min(...matching.map((p) => Number(p.price || 0)));
    return `Rs. ${min.toLocaleString()}`;
  }, [products, slide.category]);

  // Real average rating & review count from products
  const ratingData = useMemo(() => {
    const rated = products.filter(
      (p) => Number(p.reviews || 0) > 0 && Number(p.rating || 0) > 0,
    );
    if (!rated.length) return null;
    const avg =
      rated.reduce((sum, p) => sum + Number(p.rating), 0) / rated.length;
    const totalReviews = rated.reduce(
      (sum, p) => sum + Number(p.reviews || 0),
      0,
    );
    return {
      score: avg.toFixed(1),
      count: totalReviews,
    };
  }, [products]);

  // Real trending products (top 4 by reviews count)
  const trendingProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => Number(b.reviews || 0) - Number(a.reviews || 0))
      .slice(0, 4);
  }, [products]);

  // Auto-rotation (disabled on mobile screens < 600px and prefers-reduced-motion)
  useEffect(() => {
    const isMobile =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 599px)").matches;
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (hovered || focused || paused || isMobile || prefersReducedMotion) {
      return;
    }
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
      className="relative mx-auto mt-8 flex flex-col md:grid md:grid-cols-2 min-h-[480px] max-w-[1200px] overflow-hidden rounded-[22px] border border-[#e2e8f0] bg-white shadow-[0_4px_24px_rgba(15,23,42,0.03)] max-[900px]:mx-[4%] max-[900px]:mt-5 max-[900px]:min-h-[400px] max-[600px]:mx-3 max-[600px]:mt-3 max-[600px]:min-h-0"
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
      {/* Visual Section: order-1 on mobile (<md) so first screen shows the featured product, order-2 on desktop */}
      <div
        className="order-1 md:order-2 relative grid min-h-[300px] place-items-center bg-[radial-gradient(ellipse_at_55%_48%,#d9e7ff_0,#edf3fd_48%,#ffffff_75%)] max-[900px]:min-h-[340px] max-[600px]:min-h-[250px] max-[600px]:py-6"
        key={`visual-${active}`}
      >
        <div className="absolute size-[280px] rounded-full bg-[linear-gradient(145deg,#d4e4ff,#b7d0ff)] blur-[1px] max-[600px]:size-[190px]" />

        {/* Primary Product Image */}
        <div className="absolute z-[1] grid place-items-center drop-shadow-[0_30px_26px_#243c6630]">
          {imageErrors.primary ? (
            <Icon
              className="size-40 -rotate-[9deg] text-[#203d70] max-[600px]:size-28"
              strokeWidth={1.15}
            />
          ) : (
            <img
              className="h-[285px] w-[205px] rounded-[28px] object-cover shadow-[0_30px_26px_#243c6630] max-[600px]:h-[185px] max-[600px]:w-[135px]"
              src={slide.image}
              alt={slide.alt}
              width="205"
              height="285"
              fetchPriority={active === 0 ? "high" : "auto"}
              decoding="async"
              onError={() =>
                setImageErrors((value) => ({ ...value, primary: true }))
              }
            />
          )}
        </div>

        {/* Accent floating cutout image */}
        <div className="absolute bottom-[21%] right-[19%] z-[2] grid place-items-center rotate-[13deg] drop-shadow-[0_18px_15px_#243c6630] max-[600px]:bottom-[16%] max-[600px]:right-[14%]">
          {imageErrors.accent ? (
            <Headphones
              className="size-20 text-[#203d70] max-[600px]:size-14"
              strokeWidth={1.2}
            />
          ) : (
            <img
              className="size-[100px] rounded-full object-cover shadow-lg max-[600px]:size-[64px]"
              src={slide.accent}
              alt={slide.accentAlt}
              width="100"
              height="100"
              loading="lazy"
              decoding="async"
              onError={() =>
                setImageErrors((value) => ({ ...value, accent: true }))
              }
            />
          )}
        </div>

        {/* Badge with starting price */}
        <div className="absolute right-[10%] top-[12%] z-[2] flex items-center gap-2.5 rounded-2xl border border-white/70 bg-white/95 px-3.5 py-2 shadow-[0_12px_24px_rgba(23,35,59,0.12)] backdrop-blur-md max-[600px]:right-[6%] max-[600px]:top-[6%] max-[600px]:px-2.5 max-[600px]:py-1.5">
          <div className="grid size-7 place-items-center rounded-xl bg-[#eff4ff] text-[#2563eb] max-[600px]:size-6">
            <Sparkles size={14} className="max-[600px]:size-3.5" />
          </div>
          <div className="text-left">
            <span className="block text-xs font-extrabold uppercase tracking-wider text-[#2563eb]">
              {slide.badgeText}
            </span>
            <b className="block text-xs font-bold text-[#17233b]">
              From {startingPrice}
            </b>
          </div>
        </div>

        {/* Caption bar */}
        <div className="absolute bottom-[23px] left-[30px] right-[30px] flex justify-between rounded-[10px] bg-[#ffffffd9] px-4 py-2.5 text-xs text-[#66758e] backdrop-blur-[8px] max-[600px]:hidden">
          <span>{slide.label}</span>
          <b className="text-[#243552]">{slide.caption}</b>
        </div>
      </div>

      {/* Text Copy Section: order-2 on mobile, order-1 on desktop */}
      <div
        className="order-2 md:order-1 self-center px-[11%] pb-[60px] pt-[45px] max-[900px]:px-[7%] max-[900px]:py-[40px] max-[600px]:px-[22px] max-[600px]:pb-6 max-[600px]:pt-5"
        key={`copy-${active}`}
        role="group"
        aria-roledescription="slide"
        aria-label={`${active + 1} of ${slides.length}`}
        aria-live={hovered || focused || paused ? "polite" : "off"}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-[#dce5f3] bg-white px-3 py-1 text-xs font-bold text-[#17233b] shadow-2xs">
          <span className="size-2 rounded-full bg-[#16803b] animate-pulse" />
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#2563eb]">
            {slide.eyebrow}
          </span>
          <span className="text-[#c1cbd8]">·</span>
          <span className="text-xs font-semibold text-[#52617a]">
            From {startingPrice}
          </span>
        </div>

        <h1 className="my-3 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-[54px] leading-[1.08] text-[#071a3d]">
          {slide.title}
          <br />
          <em className="not-italic text-[#2563eb]">{slide.highlight}</em>
        </h1>

        <p className="max-w-[410px] text-xs sm:text-sm leading-relaxed text-[#71809a]">
          {slide.description}
        </p>

        {/* CTA Buttons with Category Deep-link and #categories Target */}
        <div className="mt-5 sm:mt-6 flex flex-wrap gap-2.5 sm:gap-3">
          <Link
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-5 py-3 text-xs font-bold text-white shadow-md transition hover:bg-[#1d4ed8] active:scale-95"
            to={slide.ctaLink}
          >
            <span>{slide.ctaText}</span>
            <ArrowRight size={15} />
          </Link>
          <a
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#e1e7f0] bg-white px-5 py-3 text-xs font-bold text-[#20304b] transition hover:border-[#aac4f3] hover:bg-[#f2f6ff] active:scale-95"
            href="#categories"
          >
            Explore categories
          </a>
        </div>

        {/* Customer Rating from real product data */}
        {ratingData && (
          <div className="mt-[22px] flex items-center gap-3 text-xs text-[#61708a]">
            <span className="inline-flex items-center gap-1.5">
              <Star size={14} className="text-[#f5a623]" fill="currentColor" />
              <b className="text-[#17233b]">{ratingData.score}/5</b> customer
              rating
            </span>
            <span className="flex gap-0.5 text-[#f5a623]">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={12} fill="currentColor" />
              ))}
            </span>
            <span className="hidden sm:inline text-[#71809a]">
              ({ratingData.count} reviews)
            </span>
          </div>
        )}

        {/* Trending Chips from real products */}
        {trendingProducts.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-1.5 text-xs text-[#61708a] max-[600px]:mt-3">
            <span className="flex items-center gap-1 font-bold text-[#17233b]">
              <TrendingUp size={13} className="text-[#2563eb]" /> Trending:
            </span>
            {trendingProducts.map((p) => (
              <Link
                key={p.id}
                to={`/products/${p.id}`}
                className="inline-flex cursor-pointer items-center rounded-full border border-[#dce5f3] bg-white/90 px-3 py-0.5 text-xs font-semibold text-[#43536c] transition hover:border-[#2563eb] hover:bg-[#eff4ff] hover:text-[#2563eb]"
              >
                {p.name}
              </Link>
            ))}
          </div>
        )}

        {/* Carousel controls on mobile (below content) */}
        <div className="mt-6 flex md:hidden items-center gap-2 pt-2 border-t border-[#edf2f9]">
          <div
            className="mr-2 flex items-center gap-[5px]"
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
            className="grid size-[30px] cursor-pointer place-items-center rounded-full border border-[#dfe6f0] bg-[#ffffffdb] text-[#25416c] transition hover:bg-[#2563eb] hover:text-white"
            onClick={() => go(-1)}
            aria-label="Previous slide"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            className="grid size-[30px] cursor-pointer place-items-center rounded-full border border-[#dfe6f0] bg-[#ffffffdb] text-[#25416c] transition hover:bg-[#2563eb] hover:text-white"
            onClick={() => go(1)}
            aria-label="Next slide"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Desktop Slider Controls */}
      <div className="hidden md:flex absolute bottom-[22px] left-[11%] z-[4] items-center gap-[7px] max-[900px]:bottom-[17px] max-[900px]:left-[7%]">
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
          className="grid size-[30px] cursor-pointer place-items-center rounded-full border border-[#dfe6f0] bg-[#ffffffdb] text-[#25416c] transition hover:bg-[#2563eb] hover:text-white"
          onClick={() => go(-1)}
          aria-label="Previous slide"
        >
          <ChevronLeft size={17} />
        </button>
        <button
          className="grid size-[30px] cursor-pointer place-items-center rounded-full border border-[#dfe6f0] bg-[#ffffffdb] text-[#25416c] transition hover:bg-[#2563eb] hover:text-white"
          onClick={() => go(1)}
          aria-label="Next slide"
        >
          <ChevronRight size={17} />
        </button>
        <button
          className="grid size-[30px] cursor-pointer place-items-center rounded-full border border-[#dfe6f0] bg-[#ffffffdb] text-[#25416c] transition hover:bg-[#2563eb] hover:text-white"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Play slideshow" : "Pause slideshow"}
        >
          {paused ? <Play size={14} /> : <Pause size={14} />}
        </button>
      </div>
    </section>
  );
}
