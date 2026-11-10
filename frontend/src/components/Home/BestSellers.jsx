import { useMemo } from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import ProductGrid from "../Products/ProductGrid";
import { useStore } from "../../context/StoreContext";

export default function BestSellers() {
  const { products = [] } = useStore();

  // Top 4 customer favorites sorted by review count and rating
  const bestSellers = useMemo(() => {
    return [...products]
      .sort((a, b) => Number(b.reviews || 0) - Number(a.reviews || 0))
      .slice(0, 4);
  }, [products]);

  return (
    <section
      aria-label="Best Sellers"
      className="mx-auto mb-[60px] max-w-[1120px] max-[900px]:mx-[5%] max-[600px]:mx-4 max-[600px]:mb-[44px]"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-[.14em] text-[#2563eb]">
            CUSTOMER FAVORITES
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-[-0.03em] text-[#071a3d]">
            Best Sellers
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

      <ProductGrid products={bestSellers} />
    </section>
  );
}
