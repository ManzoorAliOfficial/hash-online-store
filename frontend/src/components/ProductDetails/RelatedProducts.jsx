import ProductGrid from "../Products/ProductGrid";
import { useStore } from "../../context/StoreContext";
export default function RelatedProducts({ product }) {
  const { products } = useStore();
  const related = products
    .filter(
      (item) =>
        item.id !== product?.id &&
        (!product?.category || item.category === product.category),
    )
    .slice(0, 4);
  return (
    <section className="mt-[76px] w-full max-[600px]:mt-[52px]">
      <div className="mb-6">
        <div>
          <span className="text-[10px] font-extrabold tracking-[.14em] text-[#2563eb]">
            MORE TO EXPLORE
          </span>
          <h2 className="mt-2 text-[30px] font-bold tracking-[-.05em] text-[#071a3d]">
            Related products
          </h2>
        </div>
      </div>
      <ProductGrid
        products={
          related.length
            ? related
            : products.filter((item) => item.id !== product?.id).slice(0, 4)
        }
      />
    </section>
  );
}
