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

  const displayCategories = categories.slice(0, 8);

  return (
    <section
      id="categories"
      aria-label="Shop by category"
      className="mx-auto mb-[76px] max-w-[1120px] max-[900px]:mx-[5%] max-[600px]:mx-4 max-[600px]:mb-[52px]"
    >
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold tracking-[.14em] text-[#2563eb]">
            <Sparkles size={13} className="text-[#2563eb]" />
            <span>BROWSE COLLECTIONS</span>
          </div>
          <h2 className="mt-1.5 text-[28px] font-bold tracking-[-.05em] text-[#071a3d] max-[600px]:text-2xl">
            Shop by category
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#71809a]">
            Explore authentic tech and accessories curated for modern lifestyles.
          </p>
        </div>

        <Link
          className="flex shrink-0 cursor-pointer items-center gap-1.5 text-xs font-bold text-[#2563eb] transition hover:text-[#174a93]"
          to="/products"
        >
          <span>All products</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Grid: 2 cols mobile, 3 on md, 4 on lg (max 8 tiles) */}
      <div className="grid grid-cols-2 gap-3.5 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {displayCategories.map((catName) => {
          const key = String(catName || "").toLowerCase();
          const Icon = categoryIcons[key] || Tag;
          const count = products.filter(
            (p) => (p.category || "").toLowerCase() === key,
          ).length;

          return (
            <Link
              key={catName}
              to={`/products?category=${encodeURIComponent(catName)}`}
              className="group flex flex-col justify-between rounded-2xl border border-[#e5ecf6] bg-white p-5 shadow-[0_4px_16px_rgba(23,35,59,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-[#2563eb] hover:shadow-[0_12px_28px_rgba(37,99,235,0.09)]"
            >
              <div className="flex items-center justify-between">
                <div className="grid size-12 place-items-center rounded-xl bg-[#eff4ff] text-[#2563eb] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#2563eb] group-hover:text-white">
                  <Icon size={22} />
                </div>
                <span className="grid size-7 place-items-center rounded-full bg-[#f4f7fc] text-[#9ba8bc] transition-all duration-300 group-hover:translate-x-0.5 group-hover:bg-[#eff4ff] group-hover:text-[#2563eb]">
                  <ArrowRight size={14} />
                </span>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-bold text-[#17233b] transition-colors group-hover:text-[#2563eb]">
                  {catName}
                </h3>
                <span className="mt-0.5 block text-xs font-medium text-[#71809a]">
                  {count} {count === 1 ? "product" : "products"}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
