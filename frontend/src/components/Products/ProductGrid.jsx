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
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-3">
        {items.map((product) => (
          <Reveal className="w-full" key={product.id}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
    );
  }

  return (
    <div className="mx-auto grid w-full max-w-[1120px] grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
      {items.map((product) => (
        <Reveal className="min-w-0" key={product.id}>
          <ProductCard product={product} />
        </Reveal>
      ))}
    </div>
  );
}
