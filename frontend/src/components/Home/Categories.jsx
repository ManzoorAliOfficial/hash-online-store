import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  Smartphone,
  Laptop,
  Headphones,
  Gamepad2,
  Watch,
  Cable,
} from "lucide-react";
const categories = [
  [Smartphone, "Phones", "Explore smartphones"],
  [Laptop, "Laptops", "Work and creativity"],
  [Headphones, "Audio", "Sound for every day"],
  [Gamepad2, "Gaming", "Play your way"],
  [Watch, "Wearables", "Stay connected"],
  [Cable, "Accessories", "Useful essentials"],
];
function CategoryCards() {
  return categories.map(([Icon, name, detail]) => (
    <Link
      className="flex min-h-[78px] w-[clamp(205px,22vw,260px)] shrink-0 items-center gap-[13px] rounded-xl border border-[#edf0f5] bg-white p-[17px] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_#1b31520d] max-[600px]:gap-2 max-[600px]:p-[11px]"
      to={`/products?category=${encodeURIComponent(name)}`}
      key={name}
    >
      <span className="grid size-12 place-items-center rounded-[10px] bg-[#f1f5fc] text-[#2563eb] max-[600px]:size-[39px]">
        <Icon size={22} />
      </span>
      <span className="grid flex-1 gap-1">
        <b className="text-sm max-[600px]:text-[13px]">{name}</b>
        <small className="text-[11px] text-[#8491a5] max-[600px]:text-[9px]">
          {detail}
        </small>
      </span>
      <ArrowRight className="text-[#9ba8bc]" size={15} />
    </Link>
  ));
}
export default function Categories() {
  const railRef = useRef(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;
    const timer = window.setInterval(() => {
      const rail = railRef.current;
      if (!rail) return;
      rail.scrollLeft += 0.55;
      if (rail.scrollLeft >= rail.scrollWidth / 2) rail.scrollLeft = 0;
    }, 16);
    return () => window.clearInterval(timer);
  }, [paused]);
  return (
    <section
      id="categories"
      className="mx-auto mb-[76px] max-w-[1200px] max-[900px]:mx-[5%] max-[600px]:mx-4 max-[600px]:mb-[52px]"
    >
      <div className="mb-6 flex items-end justify-between max-[600px]:items-start max-[600px]:gap-2.5">
        <div>
          <span className="text-[10px] font-extrabold tracking-[.14em] text-[#2563eb]">
            SHOP YOUR WAY
          </span>
          <h2 className="mt-2 text-[27px] font-bold leading-tight tracking-[-.05em] text-[#071a3d] max-[600px]:text-2xl">
            Shop by category
          </h2>
        </div>
        <Link
          className="flex shrink-0 items-center gap-[7px] whitespace-nowrap pb-[5px] text-[11px] font-bold text-[#2563eb] max-[600px]:text-[10px]"
          to="/products"
        >
          All products <ArrowRight size={14} />
        </Link>
      </div>
      <div
        ref={railRef}
        className="overflow-x-hidden motion-reduce:overflow-x-auto"
        aria-label="Shop by category"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <div className="flex w-max gap-[14px] pr-[14px]">
          <CategoryCards />
          <span className="contents" aria-hidden="true">
            <CategoryCards />
          </span>
        </div>
      </div>
    </section>
  );
}
