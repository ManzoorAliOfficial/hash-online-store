import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import ProductGrid from "../Products/ProductGrid";
import { useStore } from "../../context/StoreContext";
export default function NewArrivals() {
  const { products } = useStore();
  const arrivals = [...products]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 30);
  return (
    <section className="mx-auto mb-[76px] max-w-[1120px] max-[900px]:mx-[5%] max-[600px]:mx-4 max-[600px]:mb-[52px]">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="text-[10px] font-extrabold tracking-[.14em] text-[#2563eb]">
            JUST LANDED
          </span>
          <h2 className="mt-2 text-[27px] font-bold leading-tight tracking-[-.05em] text-[#071a3d] max-[600px]:text-2xl">
            New arrivals
          </h2>
        </div>
        <Link
          className="flex shrink-0 items-center gap-[7px] whitespace-nowrap pb-[5px] text-[11px] font-bold text-[#2563eb] max-[600px]:text-[10px]"
          to="/products"
        >
          Discover more <ArrowRight size={14} />
        </Link>
      </div>
      <ProductGrid products={arrivals} />
    </section>
  );
}
