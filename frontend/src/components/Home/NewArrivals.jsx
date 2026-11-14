import { useMemo } from "react";
import { Sparkles } from "lucide-react";
import { Link } from "react-router";
import { useStore } from "../../context/StoreContext";
import { getAccessoryCollectionProducts } from "../../utils/homeCatalog";
import ProductCard from "../Common/ProductCard";
import AccessoriesLink from "../Common/AccessoriesLink";

export default function NewArrivals() {
  const { products = [] } = useStore();
  const items = useMemo(
    () => getAccessoryCollectionProducts(products, "new-arrivals-accessories"),
    [products],
  );
  const visible = items.slice(0, 4);
  if (!items.length) return null;
  return <section aria-labelledby="home-new-heading">
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4 sm:mb-8">
      <div><p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-[#2563eb]"><Sparkles size={14} /> Just added to the store</p><h2 id="home-new-heading" className="mt-2 text-2xl font-semibold tracking-tight text-[#0f2347] sm:text-3xl"><Link to="/products?collection=new-arrivals-accessories" className="rounded-sm transition-colors hover:text-[#2563eb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]">New accessories</Link></h2><p className="mt-2 text-sm text-[#64748b]">Recently added items from the current accessory catalog.</p></div>
    </div>
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
      {visible.map((product) => <div key={product.id} className="min-w-0"><ProductCard product={product} /></div>)}
    </div>
    <AccessoriesLink
      collection="new-arrivals-accessories"
      totalCount={items.length}
      visibleCount={visible.length}
    />
  </section>;
}
