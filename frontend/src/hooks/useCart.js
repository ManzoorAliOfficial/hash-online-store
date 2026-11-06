import { useStore } from "../context/StoreContext";
export default function useCart() {
  const { cart, products, addToCart, setQty, removeFromCart } = useStore();
  const count = cart.reduce((n, x) => n + x.qty, 0);
  const total = cart.reduce(
    (n, x) => n + (products.find((p) => p.id === x.id)?.price || 0) * x.qty,
    0,
  );
  return { cart, count, total, addToCart, setQty, removeFromCart };
}
