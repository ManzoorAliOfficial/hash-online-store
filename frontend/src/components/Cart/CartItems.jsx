import CartItem from "./CartItem";
import { useStore } from "../../context/StoreContext";
export default function CartItems() {
  const { cart } = useStore();
  return (
    <div className="rounded-xl border border-[#e4eaf3] bg-white px-5 shadow-[0_8px_24px_rgba(16,36,73,.04)] max-[600px]:px-3">
      {cart.map((item) => (
        <CartItem item={item} key={item.id} />
      ))}
    </div>
  );
}
