import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import ProductGrid from "../Products/ProductGrid";
import { useStore } from "../../context/StoreContext";
export default function FeaturedProducts() {
  const { products } = useStore();
  const featured = products.slice(0, 30);
  return (
    <section className="mb-[76px] bg-[#f8fafd] px-[max(calc((100vw-1120px)/2),5%)] py-11 max-[900px]:px-[5%] max-[600px]:mb-[52px] max-[600px]:px-4 max-[600px]:py-[35px]">
      <div className="mx-auto mb-6 flex flex-wrap max-w-[1120px] items-end justify-between gap-3">
        <div>
          <span className="text-[10px] font-extrabold tracking-[.14em] text-[#2563eb]">
            HAND-PICKED FOR YOU
          </span>
          <h2 className="mt-2 text-[27px] font-bold leading-tight tracking-[-.05em] text-[#071a3d] max-[600px]:text-2xl">
            Featured products
          </h2>
          <p className="mt-2 max-w-[410px] text-sm leading-7 text-[#71809a] max-[600px]:text-[11px]">
            Thoughtful tech and useful essentials, ready for your everyday.
          </p>
        </div>
        <Link
          className="flex shrink-0 items-center gap-[7px] whitespace-nowrap pb-[5px] text-[11px] font-bold text-[#2563eb] max-[600px]:text-[10px]"
          to="/products"
        >
          View collection <ArrowRight size={14} />
        </Link>
      </div>
      <ProductGrid products={featured} />
    </section>
  );
}
