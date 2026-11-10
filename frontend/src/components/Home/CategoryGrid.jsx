import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import {
  Smartphone,
  Headphones,
  Laptop,
  Watch,
  Gamepad2,
  Cable,
  Tag,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Sparkles,
} from "lucide-react";
import { useStore } from "../../context/StoreContext";

const categoryMeta = {
  phones: {
    icon: Smartphone,
    desc: "Flagship & budget phones",
  },
  audio: {
    icon: Headphones,
    desc: "Earbuds, headphones & sound",
  },
  laptops: {
    icon: Laptop,
    desc: "Work, study & creative laptops",
  },
  wearables: {
    icon: Watch,
    desc: "Smartwatches & fitness bands",
  },
  gaming: {
    icon: Gamepad2,
    desc: "Controllers & gaming gear",
  },
  accessories: {
    icon: Cable,
    desc: "Cables, chargers & essentials",
  },
};

export default function CategoryGrid() {
  const { categories = [], products = [] } = useStore();
  const railRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const isInteractingRef = useRef(false);
  const pauseTimeoutRef = useRef(null);

  // Fallback if categories is empty
  const baseCategories =
    categories.length > 0
      ? categories
      : ["Phones", "Audio", "Laptops", "Wearables", "Gaming", "Accessories"];

  // Duplicate categories to create a seamless infinite loop
  const sliderItems = [...baseCategories, ...baseCategories];

  // Silky-smooth auto-scroll animation via requestAnimationFrame
  useEffect(() => {
    let animationFrameId;
    let lastTime = performance.now();

    const step = (time) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      const rail = railRef.current;
      const shouldScroll =
        !isHovered &&
        !isPaused &&
        !isInteractingRef.current &&
        typeof window !== "undefined" &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (shouldScroll && rail) {
        // Continuous smooth speed (~38 pixels per second)
        rail.scrollLeft += 38 * delta;

        // Reset scroll position seamlessly at the exact halfway point
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
  }, [isHovered, isPaused]);

  // Smooth manual left/right step navigation
  const handleScroll = (direction) => {
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
      aria-label="Shop by category"
      className="mx-auto mb-[76px] max-w-[1120px] max-[900px]:mx-[5%] max-[600px]:mx-4 max-[600px]:mb-[52px]"
    >
      {/* Section Header */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold tracking-[.14em] text-[#2563eb]">
            <Sparkles size={13} className="text-[#2563eb]" />
            <span>BROWSE COLLECTIONS</span>
          </div>
          <h2 className="mt-1.5 text-[28px] font-bold tracking-[-.05em] text-[#071a3d] max-[600px]:text-2xl">
            Shop by category
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#71809a]">
            Explore authentic tech and lifestyle essentials across verified categories.
          </p>
        </div>

        {/* Navigation & Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleScroll("left")}
            className="grid size-9 cursor-pointer place-items-center rounded-full border border-[#dfe6f0] bg-white text-[#25416c] shadow-2xs transition-all duration-200 hover:border-[#2563eb] hover:bg-[#2563eb] hover:text-white hover:scale-105 active:scale-95"
            aria-label="Previous categories"
            title="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => handleScroll("right")}
            className="grid size-9 cursor-pointer place-items-center rounded-full border border-[#dfe6f0] bg-white text-[#25416c] shadow-2xs transition-all duration-200 hover:border-[#2563eb] hover:bg-[#2563eb] hover:text-white hover:scale-105 active:scale-95"
            aria-label="Next categories"
            title="Scroll right"
          >
            <ChevronRight size={18} />
          </button>
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            className="grid size-9 cursor-pointer place-items-center rounded-full border border-[#dfe6f0] bg-white text-[#25416c] shadow-2xs transition-all duration-200 hover:border-[#2563eb] hover:bg-[#eff4ff] hover:text-[#2563eb] active:scale-95"
            aria-label={isPaused ? "Play auto slider" : "Pause auto slider"}
            title={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
          >
            {isPaused ? <Play size={14} className="ml-0.5" /> : <Pause size={14} />}
          </button>
          <Link
            className="ml-2 hidden sm:inline-flex shrink-0 cursor-pointer items-center gap-1.5 text-xs font-bold text-[#2563eb] transition hover:text-[#174a93]"
            to="/products"
          >
            <span>All products</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Slider Viewport with Ambient Edge Fade Masks */}
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
          }, 2400);
        }}
      >
        {/* Left edge fade gradient mask */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-8 sm:w-16 bg-gradient-to-r from-[#f5f8fd] to-transparent"
          aria-hidden="true"
        />

        {/* Right edge fade gradient mask */}
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-8 sm:w-16 bg-gradient-to-l from-[#f5f8fd] to-transparent"
          aria-hidden="true"
        />

        {/* Scrolling Track */}
        <div
          ref={railRef}
          role="region"
          aria-label="Category Carousel"
          className="flex gap-4 overflow-x-auto py-2 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {sliderItems.map((catName, index) => {
            const key = String(catName || "").toLowerCase();
            const meta = categoryMeta[key] || {
              icon: Tag,
              desc: "Genuine tech essentials",
            };
            const Icon = meta.icon;

            const productCount = products.filter(
              (p) => (p.category || "").toLowerCase() === key,
            ).length;

            return (
              <Link
                key={`${catName}-${index}`}
                to={`/products?category=${encodeURIComponent(catName)}`}
                className="group relative flex w-[235px] sm:w-[260px] shrink-0 flex-col justify-between rounded-2xl border border-[#e5ecf6] bg-white p-5 shadow-[0_4px_16px_rgba(23,35,59,0.03)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#2563eb]/50 hover:shadow-[0_16px_32px_rgba(37,99,235,0.08)] active:scale-98"
              >
                {/* Top Row: Icon & Count Badge */}
                <div className="flex items-center justify-between">
                  <div className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-[#eff4ff] to-[#dbeafe] text-[#2563eb] shadow-2xs transition-all duration-300 group-hover:scale-105 group-hover:bg-[#2563eb] group-hover:text-white">
                    <Icon size={22} />
                  </div>

                  <span className="rounded-full bg-[#f4f7fc] px-2.5 py-1 text-xs font-bold text-[#52617a] transition-colors group-hover:bg-[#eff4ff] group-hover:text-[#2563eb]">
                    {productCount} {productCount === 1 ? "item" : "items"}
                  </span>
                </div>

                {/* Middle Info: Name & Subtitle */}
                <div className="mt-4">
                  <h3 className="text-[15px] font-bold text-[#071a3d] tracking-[-0.02em] transition-colors group-hover:text-[#2563eb]">
                    {catName}
                  </h3>
                  <p className="mt-1 text-xs text-[#71809a] leading-relaxed line-clamp-1">
                    {meta.desc}
                  </p>
                </div>

                {/* Bottom Row: CTA with animated arrow */}
                <div className="mt-4 flex items-center justify-between border-t border-[#f0f4fa] pt-3 text-xs font-semibold text-[#64748b] transition-colors group-hover:text-[#2563eb]">
                  <span>Explore items</span>
                  <span className="grid size-6 place-items-center rounded-full bg-[#f4f7fc] transition-all duration-200 group-hover:translate-x-1 group-hover:bg-[#eff4ff] group-hover:text-[#2563eb]">
                    <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
