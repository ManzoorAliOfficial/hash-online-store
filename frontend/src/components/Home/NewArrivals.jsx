import { useMemo } from "react";
import { Link } from "react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import ProductGrid from "../Products/ProductGrid";
import { useStore } from "../../context/StoreContext";

export default function NewArrivals() {
  const { products = [] } = useStore();

  // 4 latest newly stocked arrivals
  const newArrivals = useMemo(() => {
    return [...products]
      .slice(-4)
      .reverse()
      .map((p) => ({ ...p, badge: "New" }));
  }, [products]);

  return (
    <section
      aria-label="New Arrivals"
      className="mx-auto mb-[60px] max-w-[1120px] max-[900px]:mx-[5%] max-[600px]:mx-4 max-[600px]:mb-[44px]"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-[.14em] text-[#2563eb]">
            JUST LANDED
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-[-0.03em] text-[#071a3d]">
            New Arrivals
          </h2>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#2563eb] transition hover:text-[#174a93] hover:underline"
        >
          <span>View all</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      <ProductGrid products={newArrivals} />
    </section>
  );
}
