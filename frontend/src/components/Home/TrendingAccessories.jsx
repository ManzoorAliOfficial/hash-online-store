import { TrendingUp } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router";
import { useStore } from "../../context/StoreContext";
import { getAccessoryCollectionProducts } from "../../utils/homeCatalog";
import ProductCard from "../Common/ProductCard";
import Reveal from "../Common/Reveal";
import AccessoriesLink from "../Common/AccessoriesLink";

export default function TrendingAccessories() {
  const { products = [], orders = [] } = useStore();
  const items = useMemo(() => {
    return getAccessoryCollectionProducts(products, "trending-accessories", orders);
  }, [products, orders]);
  const visible = items.slice(0, 6);

  if (!items.length) return null;

  return (
    <section aria-labelledby="home-trending-heading">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#2563eb]">
            <TrendingUp size={13} /> Popular right now
          </p>
          <h2
            id="home-trending-heading"
            className="mt-2 text-2xl font-semibold tracking-tight text-[#0f2347] sm:text-3xl"
          >
            <Link to="/products?collection=trending-accessories" className="rounded-sm transition-colors hover:text-[#2563eb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]">
              Trending accessories
            </Link>
          </h2>
          <p className="mt-2 text-sm text-[#64748b]">
            Explore audio, charging and power products from the current catalog.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
        {visible.map((product, index) => (
          <Reveal
            key={product.id}
            variant="fade-up"
            delay={60}
            index={index}
            className="min-w-0"
          >
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
      <AccessoriesLink
        collection="trending-accessories"
        totalCount={items.length}
        visibleCount={visible.length}
      />
    </section>
  );
}
