import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Laptop,
  Headphones,
  Gamepad2,
  Watch,
  Cable,
  Sparkles,
} from "lucide-react";
import { useStore } from "../../context/StoreContext";

const categoryMeta = {
  Phones: {
    icon: Smartphone,
    detail: "Latest smartphones & deals",
    tag: "Trending",
  },
  Laptops: {
    icon: Laptop,
    detail: "Work, study & creator PCs",
    tag: "Top Rated",
  },
  Audio: {
    icon: Headphones,
    detail: "Headphones, earbuds & sound",
    tag: "Bestseller",
  },
  Gaming: {
    icon: Gamepad2,
    detail: "Consoles, controllers & gear",
    tag: "Popular",
  },
  Wearables: {
    icon: Watch,
    detail: "Smart watches & fitness",
    tag: "New Gen",
  },
  Accessories: {
    icon: Cable,
    detail: "Power, chargers & cables",
    tag: "Essentials",
  },
};

export default function Categories() {
  const { categories: storeCategories } = useStore();
  const railRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const pauseTimeoutRef = useRef(null);
  const isInteractingRef = useRef(false);

  const categories = (
    storeCategories?.length
      ? storeCategories
      : ["Phones", "Laptops", "Audio", "Gaming", "Wearables", "Accessories"]
  ).map((name) => {
    const meta = categoryMeta[name] || {
      icon: Sparkles,
      detail: `Quality ${name.toLowerCase()} & essentials`,
      tag: "Featured",
    };
    return {
      name,
      icon: meta.icon,
      detail: meta.detail,
      tag: meta.tag,
    };
  });

  // Buttery smooth, frame-rate independent auto-scroll animation
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let animationFrameId;
    let lastTimestamp = performance.now();

    const step = (timestamp) => {
      const delta = (timestamp - lastTimestamp) / 1000; // in seconds
      lastTimestamp = timestamp;

      const shouldScroll =
        !isHovered &&
        !isInteractingRef.current &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (shouldScroll && rail) {
        // Smooth 38 pixels per second
        rail.scrollLeft += 38 * delta;

        // Seamless loop when halfway through duplicated cards
        const halfWidth = rail.scrollWidth / 2;
        if (halfWidth > 0 && rail.scrollLeft >= halfWidth) {
          rail.scrollLeft -= halfWidth;
        }
      }

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered]);

  const handleManualScroll = (direction) => {
    if (!railRef.current) return;
    isInteractingRef.current = true;
    const distance = 280;

    railRef.current.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });

    clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, 2800);
  };

  return (
    <section
      id="categories"
      className="mx-auto mb-[76px] max-w-[1200px] max-[900px]:mx-[5%] max-[600px]:mx-4 max-[600px]:mb-[52px]"
      aria-label="Product categories"
    >
      <div className="mb-6 flex items-end justify-between max-[600px]:items-start max-[600px]:gap-2.5">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold tracking-[.14em] text-[#2563eb]">
            <Sparkles size={13} className="text-[#2563eb]" />
            <span>SHOP YOUR WAY</span>
          </div>
          <h2 className="mt-1.5 text-[27px] font-bold leading-tight tracking-[-.05em] text-[#071a3d] max-[600px]:text-2xl">
            Shop by category
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleManualScroll("left")}
            className="grid size-8.5 cursor-pointer place-items-center rounded-full border border-[#dfe6f0] bg-white text-[#25416c] shadow-2xs transition-all duration-200 hover:border-[#2563eb] hover:bg-[#2563eb] hover:text-white hover:scale-105 active:scale-95"
            aria-label="Previous categories"
          >
            <ChevronLeft size={17} />
          </button>
          <button
            type="button"
            onClick={() => handleManualScroll("right")}
            className="grid size-8.5 cursor-pointer place-items-center rounded-full border border-[#dfe6f0] bg-white text-[#25416c] shadow-2xs transition-all duration-200 hover:border-[#2563eb] hover:bg-[#2563eb] hover:text-white hover:scale-105 active:scale-95"
            aria-label="Next categories"
          >
            <ChevronRight size={17} />
          </button>
          <Link
            className="ml-1.5 flex shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap text-xs font-bold text-[#2563eb] transition hover:text-[#174a93]"
            to="/products"
          >
            <span>All products</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Relative wrapper with gradient edge masks */}
      <div
        className="relative overflow-hidden rounded-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => {
          isInteractingRef.current = true;
        }}
        onTouchEnd={() => {
          clearTimeout(pauseTimeoutRef.current);
          pauseTimeoutRef.current = setTimeout(() => {
            isInteractingRef.current = false;
          }, 2500);
        }}
      >
        {/* Soft edge blur masks for desktop */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-10 bg-gradient-to-r from-[#f5f8fd] to-transparent max-[600px]:w-4" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-10 bg-gradient-to-l from-[#f5f8fd] to-transparent max-[600px]:w-4" />

        {/* Scrolling Rail */}
        <div
          ref={railRef}
          className="no-scrollbar flex gap-4 overflow-x-auto py-2 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* Render duplicate set for seamless infinite auto-scroll */}
          {[...categories, ...categories].map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link
                key={`${cat.name}-${idx}`}
                className="group relative flex min-h-[86px] w-[270px] shrink-0 cursor-pointer items-center gap-3.5 rounded-2xl border border-[#e5ecf6] bg-white p-4 shadow-[0_4px_16px_rgba(23,35,59,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-[#2563eb] hover:shadow-[0_12px_28px_rgba(37,99,235,0.12)] max-[600px]:w-[240px] max-[600px]:p-3.5"
                to={`/products?category=${encodeURIComponent(cat.name)}`}
              >
                {/* Icon box with hover transition */}
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#eff4ff] text-[#2563eb] shadow-2xs transition-all duration-300 group-hover:scale-105 group-hover:bg-[#2563eb] group-hover:text-white max-[600px]:size-10">
                  <Icon size={22} className="transition-transform duration-300" />
                </span>

                {/* Text content */}
                <div className="flex flex-1 flex-col min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <b className="truncate text-sm font-bold text-[#17233b] transition-colors group-hover:text-[#2563eb] max-[600px]:text-[13px]">
                      {cat.name}
                    </b>
                    <span className="shrink-0 rounded-full bg-[#eff4ff] px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-[#2563eb] transition-colors group-hover:bg-[#2563eb] group-hover:text-white">
                      {cat.tag}
                    </span>
                  </div>
                  <small className="mt-0.5 truncate text-[11px] text-[#71809a] max-[600px]:text-[10px]">
                    {cat.detail}
                  </small>
                </div>

                {/* Arrow hint with slide-in animation */}
                <span className="grid size-6.5 shrink-0 place-items-center rounded-full bg-[#f4f7fc] text-[#9ba8bc] transition-all duration-300 group-hover:translate-x-0.5 group-hover:bg-[#eff4ff] group-hover:text-[#2563eb]">
                  <ArrowRight size={13} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
