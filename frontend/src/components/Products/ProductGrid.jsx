import ProductCard from "../Common/ProductCard";
import Reveal from "../Common/Reveal";
import Skeleton from "../Common/Skeleton";
import { useStore } from "../../context/StoreContext";

export default function ProductGrid({ products, viewMode = "grid" }) {
  const { products: allProducts } = useStore();
  const items = products ?? allProducts;

  if (!items || items.length === 0) {
    return <Skeleton count={8} type={viewMode === "list" ? "row" : "grid"} />;
  }

  if (viewMode === "list") {
    return (
      <div className="flex w-full flex-col gap-3">
        {items.map((product, index) => (
          <Reveal className="w-full" key={product.id} index={index}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-2 gap-3 sm:gap-4 md:grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
      {items.map((product, index) => (
        <Reveal className="min-w-0" key={product.id} index={index}>
          <ProductCard product={product} />
        </Reveal>
      ))}
    </div>
  );
}
