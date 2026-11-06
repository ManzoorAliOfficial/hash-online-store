import ProductCard from "../Common/ProductCard";
import { useStore } from "../../context/StoreContext";
export default function WishlistGrid() {
  const { products, wishlist } = useStore();
  const saved = products.filter((product) => wishlist.includes(product.id));
  return (
    <div className="grid grid-cols-4 gap-[17px] max-[980px]:grid-cols-3 max-[700px]:grid-cols-2 max-[430px]:grid-cols-1">
      {saved.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}
