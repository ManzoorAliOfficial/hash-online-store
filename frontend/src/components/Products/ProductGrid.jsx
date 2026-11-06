import ProductCard from "../Common/ProductCard";
import Reveal from "../Common/Reveal";
import { useStore } from "../../context/StoreContext";

export default function ProductGrid({ products }) {
  const { products: allProducts } = useStore();
  const items = products ?? allProducts;
  return (
    <div className="mx-auto grid w-full max-w-[1120px] grid-cols-4 gap-4 max-[1100px]:grid-cols-3 max-[768px]:grid-cols-2 max-[460px]:grid-cols-1">
      {items.map((product) => (
        <Reveal className="min-w-0" key={product.id}>
          <ProductCard product={product} />
        </Reveal>
      ))}
    </div>
  );
}
