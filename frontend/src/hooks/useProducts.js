import { useStore } from "../context/StoreContext";
export default function useProducts() {
  const { products, setProducts } = useStore();
  return { products, setProducts };
}
