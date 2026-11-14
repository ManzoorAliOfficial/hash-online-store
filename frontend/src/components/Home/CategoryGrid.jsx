import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BatteryCharging,
  Cable,
  Headphones,
  ShieldCheck,
  Smartphone,
  Speaker,
  TabletSmartphone,
  Watch,
  Zap,
} from "lucide-react";
import { Link } from "react-router";
import { useStore } from "../../context/StoreContext";
import { isMobileAccessory } from "../../utils/homeCatalog";
import Reveal from "../Common/Reveal";

const GAP = 16; // gap-4
const SPEED = 36; // px per second

const categoryCards = [
  {
    label: "Earbuds & audio",
    icon: Headphones,
    matches: (product) => product.category === "Audio",
    imagePattern: /earbud|airpods|earphone|headphone|speaker/i,
    query: "category=Audio",
  },
  {
    label: "Chargers",
    icon: Zap,
    matches: (product) =>
      product.category === "Accessories" && /charg/i.test(product.name || ""),
    imagePattern: /charg|adapter/i,
    query: "category=Accessories&search=charg",
  },
  {
    label: "USB accessories",
    icon: Cable,
    matches: (product) =>
      product.category === "Accessories" && /usb/i.test(product.name || ""),
    imagePattern: /usb|cable/i,
    query: "category=Accessories&search=usb",
  },
  {
    label: "Power banks",
    icon: BatteryCharging,
    matches: (product) =>
      product.category === "Accessories" && /power/i.test(product.name || ""),
    imagePattern: /powercore|powerbank|power bank/i,
    query: "category=Accessories&search=power",
  },
  {
    label: "Smart watches & wearables",
    icon: Watch,
    matches: (product) => product.category === "Wearables",
    imagePattern: /watch|wearable|fitness/i,
    query: "category=Wearables",
  },
  {
    label: "Phone cases",
    icon: TabletSmartphone,
    matches: (product) =>
      product.category === "Accessories" &&
      /case|cover|pouch/i.test(product.name || ""),
    imagePattern: /case|cover|pouch/i,
    query: "category=Accessories&search=case",
  },
  {
    label: "Screen protectors",
    icon: ShieldCheck,
    matches: (product) =>
      product.category === "Accessories" &&
      /screen|protector|glass|tempered/i.test(product.name || ""),
    imagePattern: /screen|protector|glass|tempered/i,
    query: "category=Accessories&search=screen",
  },
  {
    label: "Speakers",
    icon: Speaker,
    matches: (product) =>
      product.category === "Audio" &&
      /speaker|soundbar|boom/i.test(product.name || ""),
    imagePattern: /speaker|soundbar|boom/i,
    query: "category=Audio&search=speaker",
  },
  {
    label: "Mobile accessories",
    icon: Smartphone,
    matches: isMobileAccessory,
    query: "collection=mobile-accessories",
  },
];

function optimizedThumbnail(image) {
  try {
    const url = new URL(image);
    if (url.hostname === "images.unsplash.com") {
      url.searchParams.set("auto", "format");
      url.searchParams.set("fit", "crop");
      url.searchParams.set("w", "320");
      url.searchParams.set("h", "320");
      url.searchParams.set("q", "75");
    }
    return url.href;
  } catch {
    return image;
  }
}

function CategoryVisual({ image, Icon }) {
  const [failed, setFailed] = useState(false);

  return (
    <span className="grid size-full place-items-center text-[#2563eb]">
      {image && !failed ? (
        <img
          src={optimizedThumbnail(image)}
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
          onError={() => setFailed(true)}
          className="size-full rounded-full object-contain p-3 transition-transform duration-500 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      ) : (
        <Icon size={34} aria-hidden="true" />
      )}
    </span>
  );
}

function CategoryCard({ item, clone = false }) {
  const { label, icon, query, image } = item;

  return (
    <Link
      to={`/products?${query}`}
      data-category-card
      data-clone={clone ? "true" : undefined}
      aria-hidden={clone || undefined}
      tabIndex={clone ? -1 : undefined}
      className="group flex w-full flex-col items-center gap-2.5 focus-visible:outline-none"
    >
      <span className="relative block aspect-square w-full overflow-hidden rounded-full bg-[#f3f5f8] p-[7px] ring-2 ring-transparent transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-[#edf1f6] group-hover:ring-[#2563eb]/40 group-hover:shadow-[0_12px_28px_-14px_rgba(37,99,235,.5)] group-focus-visible:ring-brand/60 motion-reduce:transition-none">
        <CategoryVisual key={image || label} image={image} Icon={icon} />
      </span>
      <span className="line-clamp-2 w-full text-center text-xs font-bold leading-4 text-[#102449] transition-colors group-hover:text-[#2563eb] sm:text-sm">
        {label}
      </span>
    </Link>
  );
}

// 2px smaller than before at every breakpoint
const cardWidth =
  "w-[102px] shrink-0 sm:w-[122px] md:w-[138px] lg:w-[158px]";

export default function CategoryGrid() {
  const { products = [] } = useStore();
  const rail = useRef(null);
  const setWidth = useRef(0); // width of ONE set of cards (incl. trailing gap)
  const [hasOverflow, setHasOverflow] = useState(false);
  const [autoScrollPaused, setAutoScrollPaused] = useState(false);

  const items = useMemo(
    () =>
      categoryCards
        .map((card) => {
          const matchingProducts = products.filter(card.matches);
          const imageProduct =
            matchingProducts.find(
              (product) =>
                product.image && card.imagePattern?.test(product.name || ""),
            ) || matchingProducts.find((product) => product.image);

          return {
            ...card,
            count: matchingProducts.length,
            image: imageProduct?.image || "",
          };
        })
        .filter((card) => card.count > 0),
    [products],
  );

  const scroll = (direction) => {
    const element = rail.current;
    if (!element) return;
    const card = element.querySelector("[data-category-card]");
    const step = (card?.getBoundingClientRect().width || 138) + GAP;
    element.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  // Measure one set of cards to know if the rail overflows
  useEffect(() => {
    const element = rail.current;
    if (!element) return undefined;

    const measure = () => {
      const originals = element.querySelectorAll(
        "[data-category-card]:not([data-clone])",
      );
      if (!originals.length) {
        setWidth.current = 0;
        setHasOverflow(false);
        return;
      }
      const first = originals[0].getBoundingClientRect();
      const last = originals[originals.length - 1].getBoundingClientRect();
      const width = last.right - first.left + GAP;
      setWidth.current = width;
      setHasOverflow(width - GAP > element.clientWidth + 1);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [items.length]);

  // Continuous, seamless auto scroll
  useEffect(() => {
    const element = rail.current;
    if (
      !element ||
      !hasOverflow ||
      autoScrollPaused ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }

    let frame = 0;
    let last = performance.now();
    let position = element.scrollLeft;

    const tick = (now) => {
      const delta = Math.min(now - last, 64);
      last = now;
      position += (SPEED * delta) / 1000;
      const loopAt = setWidth.current;
      if (loopAt > 0 && position >= loopAt) position -= loopAt;
      element.scrollLeft = position;
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [autoScrollPaused, hasOverflow, items.length]);

  // Keep manual scrolling inside the looped range
  const handleScroll = () => {
    const element = rail.current;
    const loopAt = setWidth.current;
    if (!element || !hasOverflow || !loopAt) return;
    if (element.scrollLeft >= loopAt) element.scrollLeft -= loopAt;
    else if (element.scrollLeft <= 0) element.scrollLeft += loopAt;
  };

  return (
    <section
      id="home-categories"
      aria-labelledby="home-categories-heading"
      className="scroll-mt-28"
    >
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#2563eb]">
            ✦ &nbsp;Explore by category
          </p>
          <h2
            id="home-categories-heading"
            className="mt-1 text-xl font-semibold tracking-tight text-[#102449] sm:text-2xl"
          >
            Shop by category
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {hasOverflow && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll(-1)}
                aria-label="Scroll categories left"
                className="grid size-8 place-items-center rounded-full border border-[#dce5f3] bg-white text-[#52617a] hover:border-[#2563eb] hover:text-[#2563eb]"
              >
                <ArrowLeft size={15} />
              </button>
              <button
                type="button"
                onClick={() => scroll(1)}
                aria-label="Scroll categories right"
                className="grid size-8 place-items-center rounded-full border border-[#dce5f3] bg-white text-[#52617a] hover:border-[#2563eb] hover:text-[#2563eb]"
              >
                <ArrowRight size={15} />
              </button>
            </div>
          )}
        </div>
      </div>

      <div
        ref={rail}
        onScroll={handleScroll}
        className="no-scrollbar flex gap-4 overflow-x-auto px-2 pb-5 pt-3"
        aria-label="Mobile accessory categories"
        onMouseEnter={() => setAutoScrollPaused(true)}
        onMouseLeave={() => setAutoScrollPaused(false)}
        onFocus={() => setAutoScrollPaused(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setAutoScrollPaused(false);
          }
        }}
        onPointerDown={() => setAutoScrollPaused(true)}
        onPointerUp={() => setAutoScrollPaused(false)}
        onPointerCancel={() => setAutoScrollPaused(false)}
      >
        {items.map((item, index) => (
          <Reveal as="div" index={index} key={item.label} className={cardWidth}>
            <CategoryCard item={item} />
          </Reveal>
        ))}

        {/* Duplicate set for seamless infinite loop (only when overflowing) */}
        {hasOverflow &&
          items.map((item) => (
            <div key={`clone-${item.label}`} className={cardWidth}>
              <CategoryCard item={item} clone />
            </div>
          ))}

        {!items.length && (
          <p className="rounded-xl border border-dashed border-[#dbe3ef] px-4 py-5 text-xs text-[#64748b]">
            Mobile accessory categories will appear as products are added.
          </p>
        )}
      </div>
    </section>
  );
}
