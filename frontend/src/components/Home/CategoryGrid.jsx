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

const categoryIcons = {
  phones: Smartphone,
  audio: Headphones,
  laptops: Laptop,
  wearables: Watch,
  gaming: Gamepad2,
  accessories: Cable,
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
        // Calm, premium speed (32 pixels per second)
        rail.scrollLeft += 32 * delta;

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
    const distance = 240;

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
      className="mx-auto mb-12 sm:mb-14 max-w-[1120px] max-[900px]:mx-[5%] max-[600px]:mx-4 max-[600px]:mb-10"
    >
      {/* Compact Section Header */}
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold tracking-[.14em] text-[#2563eb]">
            <Sparkles size={12} className="text-[#2563eb]" />
            <span>EXPLORE BY CATEGORY</span>
          </div>
          <h2 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-[#071a3d]">
            Shop by category
          </h2>
        </div>

        {/* Navigation & Controls */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => handleScroll("left")}
            className="grid size-8 cursor-pointer place-items-center rounded-full border border-[#dfe6f0] bg-white text-[#25416c] shadow-2xs transition-all duration-150 hover:border-[#2563eb] hover:bg-[#2563eb] hover:text-white active:scale-95"
            aria-label="Previous categories"
            title="Scroll left"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => handleScroll("right")}
            className="grid size-8 cursor-pointer place-items-center rounded-full border border-[#dfe6f0] bg-white text-[#25416c] shadow-2xs transition-all duration-150 hover:border-[#2563eb] hover:bg-[#2563eb] hover:text-white active:scale-95"
            aria-label="Next categories"
            title="Scroll right"
          >
            <ChevronRight size={16} />
          </button>
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            className="grid size-8 cursor-pointer place-items-center rounded-full border border-[#dfe6f0] bg-white text-[#25416c] shadow-2xs transition-all duration-150 hover:border-[#2563eb] hover:bg-[#eff4ff] hover:text-[#2563eb] active:scale-95"
            aria-label={isPaused ? "Play auto slider" : "Pause auto slider"}
            title={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
          >
            {isPaused ? <Play size={13} className="ml-0.5" /> : <Pause size={13} />}
          </button>
          <Link
            className="ml-2 hidden sm:inline-flex shrink-0 cursor-pointer items-center gap-1 text-xs font-bold text-[#2563eb] transition hover:text-[#174a93]"
            to="/products"
          >
            <span>All products</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* Slider Viewport with Ambient Edge Fade Masks */}
      <div
        className="relative overflow-hidden rounded-xl"
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
          className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-8 sm:w-14 bg-gradient-to-r from-[#f5f8fd] to-transparent"
          aria-hidden="true"
        />

        {/* Right edge fade gradient mask */}
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-8 sm:w-14 bg-gradient-to-l from-[#f5f8fd] to-transparent"
          aria-hidden="true"
        />

        {/* Scrolling Track */}
        <div
          ref={railRef}
          role="region"
          aria-label="Category Carousel"
          className="flex gap-3 overflow-x-auto py-1 px-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {sliderItems.map((catName, index) => {
            const key = String(catName || "").toLowerCase();
            const Icon = categoryIcons[key] || Tag;

            const productCount = products.filter(
              (p) => (p.category || "").toLowerCase() === key,
            ).length;

            return (
              <Link
                key={`${catName}-${index}`}
                to={`/products?category=${encodeURIComponent(catName)}`}
                className="group relative flex w-[205px] sm:w-[230px] shrink-0 items-center gap-3 rounded-xl border border-[#e2e8f0] bg-white p-3 shadow-[0_2px_8px_rgba(15,23,42,0.02)] transition-all duration-200 hover:-translate-y-1 hover:border-[#2563eb]/50 hover:bg-white hover:shadow-[0_8px_20px_rgba(37,99,235,0.08)] active:scale-98"
              >
                {/* Icon Container */}
                <div className="grid size-11 shrink-0 place-items-center rounded-lg bg-[#eff4ff] text-[#2563eb] transition-all duration-200 group-hover:scale-105 group-hover:bg-[#2563eb] group-hover:text-white">
                  <Icon size={20} />
                </div>

                {/* Category Info */}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-bold text-[#071a3d] transition-colors group-hover:text-[#2563eb]">
                    {catName}
                  </h3>
                  <span className="block truncate text-xs text-[#71809a]">
                    {productCount} {productCount === 1 ? "item" : "items"}
                  </span>
                </div>

                {/* Subtle right arrow */}
                <ArrowRight
                  size={14}
                  className="shrink-0 text-[#94a3b8] transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#2563eb]"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
