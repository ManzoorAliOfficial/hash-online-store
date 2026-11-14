import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { useStore } from "../../context/StoreContext";

const knownBrands = ["Apple", "Samsung", "Sony", "ASUS", "HP", "Lenovo", "Google", "JBL", "Redmi"];

export default function BrandsRow() {
  const { products = [] } = useStore();
  const brands = knownBrands.filter((brand) => products.some((product) => product.name.toLowerCase().includes(brand.toLowerCase())));
  if (!brands.length) return null;

  return (
    <section aria-labelledby="home-brands-heading" className="border-y border-[#e1e8f2] py-7 sm:py-8">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div><p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#64748b]">Brands in our collection</p><h2 id="home-brands-heading" className="mt-1 text-lg font-semibold tracking-tight text-[#0f2347] sm:text-xl">Shop the names you know</h2></div>
        <Link to="/products" className="inline-flex items-center gap-1 text-xs font-semibold text-[#2563eb]">All products <ArrowUpRight size={14} /></Link>
      </div>
      <div className="no-scrollbar flex items-center gap-3 overflow-x-auto pb-1 sm:justify-between sm:gap-4">
        {brands.map((brand) => <Link key={brand} to={`/products?search=${encodeURIComponent(brand)}`} className="grid min-h-[54px] min-w-[112px] shrink-0 place-items-center rounded-xl border border-[#e4eaf3] bg-white px-5 text-sm font-bold tracking-tight text-[#43536c] transition hover:border-[#b9cdf4] hover:text-[#2563eb] hover:shadow-[0_8px_24px_-18px_rgba(37,99,235,.4)] sm:min-w-[124px] sm:text-base">{brand}</Link>)}
      </div>
    </section>
  );
}
