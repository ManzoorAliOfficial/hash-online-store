import { useState, useMemo } from "react";
import { Link } from "react-router";
import { ArrowRight, Flame, Sparkles, Clock } from "lucide-react";
import ProductGrid from "../Products/ProductGrid";
import { useStore } from "../../context/StoreContext";

const tabs = [
  {
    id: "bestsellers",
    label: "Best Sellers",
    icon: Flame,
    eyebrow: "CUSTOMER FAVORITES",
    subtitle: "Top-rated tech and gadgets loved by our community across Pakistan.",
  },
  {
    id: "handpicked",
    label: "Handpicked",
    icon: Sparkles,
    eyebrow: "CURATED SELECTION",
    subtitle: "Thoughtful tech and useful essentials hand-selected for quality.",
  },
  {
    id: "arrivals",
    label: "New Arrivals",
    icon: Clock,
    eyebrow: "JUST LANDED",
    subtitle: "The latest models and newly stocked arrivals, ready to dispatch.",
  },
];

export default function ProductShowcase() {
  const { products } = useStore();
  const [activeTab, setActiveTab] = useState("bestsellers");

  const bestSellers = useMemo(
    () =>
      [...products]
        .sort((a, b) => Number(b.reviews || 0) - Number(a.reviews || 0))
        .slice(0, 8),
    [products],
  );

  const handpicked = useMemo(() => products.slice(0, 8), [products]);

  const newArrivals = useMemo(
    () =>
      [...products]
        .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
        .slice(0, 8),
    [products],
  );

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  const displayedProducts =
    activeTab === "bestsellers"
      ? bestSellers
      : activeTab === "handpicked"
        ? handpicked
        : newArrivals;

  return (
    <section
      aria-label="Featured tech collections"
      className="mx-auto mb-[76px] max-w-[1120px] max-[900px]:mx-[5%] max-[600px]:mx-4 max-[600px]:mb-[52px]"
    >
      <div className="mb-7">
        {/* Header with Title and View All Link */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-[10px] font-extrabold tracking-[.14em] text-[#2563eb]">
              {currentTab.eyebrow}
            </span>
            <h2 className="mt-2 text-[27px] font-bold leading-tight tracking-[-.05em] text-[#071a3d] max-[600px]:text-2xl">
              Featured tech collections
            </h2>
            <p className="mt-1.5 max-w-[480px] text-sm leading-6 text-[#71809a] max-[600px]:text-xs">
              {currentTab.subtitle}
            </p>
          </div>

          <Link
            className="flex shrink-0 cursor-pointer items-center gap-1.5 text-xs font-bold text-[#2563eb] transition hover:text-[#174a93]"
            to="/products"
          >
            <span>View all products</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Tab Pills */}
        <div className="mt-6 flex flex-wrap items-center gap-2 border-b border-[#e4eaf3] pb-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all duration-150 ${
                  isActive
                    ? "bg-[#2563eb] text-white shadow-xs"
                    : "bg-white text-[#43536c] border border-[#e4eaf3] hover:border-[#cbd9f1] hover:bg-[#f1f5fc] hover:text-[#17233b]"
                }`}
              >
                <Icon
                  size={14}
                  className={isActive ? "text-white" : "text-[#2563eb]"}
                />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <ProductGrid products={displayedProducts} />
      </div>
    </section>
  );
}
