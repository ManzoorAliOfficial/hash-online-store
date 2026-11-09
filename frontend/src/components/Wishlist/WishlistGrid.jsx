import ProductCard from "../Common/ProductCard";
import { useStore } from "../../context/StoreContext";

export default function WishlistGrid() {
  const { products, wishlist } = useStore();
  const saved = products.filter((product) => wishlist.includes(product.id));

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
      {saved.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}
