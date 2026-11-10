import { useMemo } from "react";
import { Link } from "react-router";
import { ArrowRight, Flame } from "lucide-react";
import ProductGrid from "../Products/ProductGrid";
import { useStore } from "../../context/StoreContext";

export default function DealsRow() {
  const { products = [] } = useStore();

  const deals = useMemo(() => {
    return products
      .filter((p) => Number(p.oldPrice || 0) > Number(p.price || 0))
      .sort((a, b) => {
        const discA = Number(a.oldPrice) - Number(a.price);
        const discB = Number(b.oldPrice) - Number(b.price);
        return discB - discA;
      })
      .slice(0, 4);
  }, [products]);

  if (!deals || deals.length === 0) return null;

  return (
    <section
      aria-label="Limited-time deals"
      className="mx-auto mb-[76px] max-w-[1120px] max-[900px]:mx-[5%] max-[600px]:mx-4 max-[600px]:mb-[52px]"
    >
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold tracking-[.14em] text-[#f97316]">
            <Flame size={14} className="text-[#f97316]" />
            <span>SPECIAL DISCOUNTS</span>
          </div>
          <h2 className="mt-1.5 text-[28px] font-bold tracking-[-.05em] text-[#071a3d] max-[600px]:text-2xl">
            Limited-time deals
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#71809a]">
            Top products at reduced prices. Grab yours while stock lasts.
          </p>
        </div>

        <Link
          className="flex shrink-0 cursor-pointer items-center gap-1.5 text-xs font-bold text-[#2563eb] transition hover:text-[#174a93]"
          to="/products"
        >
          <span>View all deals</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      <ProductGrid products={deals} />
    </section>
  );
}
